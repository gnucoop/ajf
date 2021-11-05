/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

const enum TokenType {
  END,
  LParen,
  RParen,
  LBracket,
  RBracket,
  Comma,

  // Binary operators from Plus to GreaterOrEq have the same representation
  // in indicator formulas and JavaScript and don't need a translation.
  Plus,
  Minus,
  Mul,
  Div,
  Less,
  LessOrEq,
  Greater,
  GreaterOrEq,

  Equal,
  NotEqual,
  Not,
  String,
  Number,
  Indent,
  Name, // The name of a field: an identifier starting with $
}

interface Token {
  type: TokenType;
  text: string;
}

// firstToken returns the first token in s.
// s must not begin with whitespace characters.
function firstToken(s: string): Token {
  if (s.length === 0) {
    return {type: TokenType.END, text: ''};
  }
  let m: RegExpMatchArray | null;
  const c = s.charAt(0);
  switch (c) {
    case '(':
      return {type: TokenType.LParen, text: '('};
    case ')':
      return {type: TokenType.RParen, text: ')'};
    case '[':
      return {type: TokenType.LBracket, text: '['};
    case ']':
      return {type: TokenType.RBracket, text: ']'};
    case ',':
      return {type: TokenType.Comma, text: ','};
    case '+':
      return {type: TokenType.Plus, text: '+'};
    case '-':
      return {type: TokenType.Minus, text: '-'};
    case '*':
      return {type: TokenType.Mul, text: '*'};
    case '/':
      return {type: TokenType.Div, text: '/'};
    case '<':
      if (s.length > 1 && s.charAt(1) === '=') {
        return {type: TokenType.LessOrEq, text: '<='};
      }
      return {type: TokenType.Less, text: '<'};
    case '>':
      if (s.length > 1 && s.charAt(1) === '=') {
        return {type: TokenType.GreaterOrEq, text: '>='};
      }
      return {type: TokenType.Greater, text: '>'};
    case '=':
      return {type: TokenType.Equal, text: '='};
    case '!':
      if (s.length > 1 && s.charAt(1) === '=') {
        return {type: TokenType.NotEqual, text: '!='};
      }
      return {type: TokenType.Not, text: '!'};
    case '$':
      m = s.match(/^\$[a-zA-Z_]\w*/);
      if (m === null) {
        throw new Error('invalid field name in: ' + s);
      }
      return {type: TokenType.Name, text: m[0]};
    case '"':
      m = s.match(/^"(\\\\|\\"|[^"])*"/);
      if (m === null) {
        throw new Error('unterminated string literal in: ' + s);
      }
      return {type: TokenType.String, text: m[0]};
    case "'":
      m = s.match(/^'(\\\\|\\'|[^'])*'/);
      if (m === null) {
        throw new Error('unterminated string literal in: ' + s);
      }
      return {type: TokenType.String, text: m[0]};
  }
  if (c >= '0' && c <= '9') {
    m = s.match(/^\d+(\.\d+)?([eE][\+\-]?\d+)?/);
    if (m === null) {
      throw new Error('impossible');
    }
    return {type: TokenType.Number, text: m[0]};
  }
  m = s.match(/^[a-zA-Z_]\w*/);
  if (m !== null) {
    return {type: TokenType.Indent, text: m[0]};
  }
  if (s.match(/^\s/) !== null) {
    throw new Error('string s has a leading whitespace');
  }
  throw new Error('unrecognized token in: ' + s);
}

function tokenize(s: string): Token[] {
  const toks: Token[] = [];
  while (true) {
    s = s.trim();
    const t = firstToken(s);
    toks.push(t);
    if (t.type === TokenType.END) {
      return toks;
    }
    s = s.slice(t.text.length);
  }
}

export function indicatorToJs(formula: string): string {
  return parseExpression(tokenize(formula).reverse(), TokenType.END);
}

function unexpectedTokenError(tok: Token, rest: Token[]): Error {
  if (tok.type === TokenType.END) {
    return new Error('unexpected end of token stream');
  }
  rest.push(tok);
  return new Error('unexpected token at the start of: ' + printTokens(rest));
}

function printTokens(revToks: Token[]) {
  let s = '';
  while (revToks.length > 0) {
    const tok = revToks.pop() as Token;
    if (tok.type >= TokenType.Plus && tok.type <= TokenType.NotEqual) {
      // binary operators
      s += ' ' + tok.text + ' ';
    } else if (tok.type === TokenType.Comma) {
      s += ', ';
    } else {
      s += tok.text;
    }
  }
  return s;
}

function consume(revToks: Token[], expectedType: TokenType): Token {
  const tok = revToks.pop() as Token;
  if (tok.type !== expectedType) {
    throw unexpectedTokenError(tok, revToks);
  }
  return tok;
}

// parseExpression parses the first expression in revToks
// and returns its JavaScript/ajf translation.
// revToks is reversed, the first token of the expression being at index length-1;
// this way, tokens can be consumed efficiently with revToks.pop().
// After the expression, the function expects to find the token expectedEnd.
function parseExpression(revToks: Token[], expectedEnd: TokenType): string {
  if (
    expectedEnd !== TokenType.END &&
    expectedEnd !== TokenType.RParen &&
    expectedEnd !== TokenType.Comma &&
    expectedEnd !== TokenType.RBracket
  ) {
    throw new Error('invalid expectedEnd');
  }

  let js = '';
  while (true) {
    // Expression.
    let tok = revToks.pop() as Token;
    let next: Token;
    switch (tok.type) {
      case TokenType.Indent:
        next = revToks[revToks.length - 1];
        if (next.type === TokenType.LParen) {
          js += parseFunctionCall(tok.text, revToks);
        } else if (next.type === TokenType.LBracket) {
          consume(revToks, TokenType.LBracket);
          const index = parseExpression(revToks, TokenType.RBracket);
          consume(revToks, TokenType.RBracket);
          js += `${tok.text}[${index}]`;
        } else {
          js += tok.text;
        }
        break;
      case TokenType.Name:
        js += tok.text.slice(1);
        break;
      case TokenType.String:
      case TokenType.Number:
        js += tok.text;
        break;
      case TokenType.Plus:
      case TokenType.Minus:
        next = revToks[revToks.length - 1];
        if (next.type === TokenType.Plus || next.type === TokenType.Minus) {
          throw unexpectedTokenError(revToks.pop() as Token, revToks);
        }
        js += tok.text;
        continue;
      case TokenType.Not:
        js += '!';
        continue;
      case TokenType.LParen:
        js += '(' + parseExpression(revToks, TokenType.RParen) + ')';
        consume(revToks, TokenType.RParen);
        break;
      case TokenType.LBracket:
        js += '[' + parseList(revToks, TokenType.RBracket) + ']';
        consume(revToks, TokenType.RBracket);
        break;
      default:
        throw unexpectedTokenError(tok, revToks);
    }

    // Possible end of expression. expectedEnd can be:
    // END,
    // RParen for expressions between parentheses,
    // Comma for function arguments, in which case we also accept RParen,
    // RBracket for array elements,  in which case we also accept Comma.
    // Note that we don't consume the end token.
    const type = revToks[revToks.length - 1].type;
    if (
      type === expectedEnd ||
      (expectedEnd === TokenType.Comma && type === TokenType.RParen) ||
      (expectedEnd === TokenType.RBracket && type === TokenType.Comma)
    ) {
      return js;
    }

    // Operator.
    tok = revToks.pop() as Token;
    if (tok.type >= TokenType.Plus && tok.type <= TokenType.GreaterOrEq) {
      js += ' ' + tok.text + ' ';
      continue;
    }
    switch (tok.type) {
      case TokenType.Indent:
        if (tok.text === 'AND') {
          js += ' && ';
          break;
        }
        if (tok.text === 'OR') {
          js += ' || ';
          break;
        }
        throw unexpectedTokenError(tok, revToks);
      case TokenType.Equal:
        js += ' === ';
        break;
      case TokenType.NotEqual:
        js += ' !== ';
        break;
      default:
        throw unexpectedTokenError(tok, revToks);
    }
  }
}

// parseList parses a comma-separated list of expressions.
// expectedEnd is Comma for function arguments and RBracket for arrays,
// according to the behavior of parseExpression.
function parseList(revToks: Token[], expectedEnd: TokenType): string {
  if (expectedEnd !== TokenType.Comma && expectedEnd !== TokenType.RBracket) {
    throw new Error('invalid expectedEnd');
  }
  let next = revToks[revToks.length - 1];
  if (next.type === TokenType.RParen || next.type === TokenType.RBracket) {
    // empty list
    return '';
  }
  let js = '';
  while (true) {
    js += parseExpression(revToks, expectedEnd);
    next = revToks[revToks.length - 1];
    if (next.type === TokenType.RParen || next.type === TokenType.RBracket) {
      return js;
    }
    consume(revToks, TokenType.Comma);
    js += ', ';
  }
}

// parseFunctionCall parses a function call expression.
// The list of supported functions is here:
// https://github.com/gnucoop/ajf/blob/master/src/core/models/utils/expression-utils.ts
// The function name has already been scanned.
function parseFunctionCall(name: string, revToks: Token[]): string {
  let js: string;
  switch (name) {
    case 'SUM':
    case 'MEAN':
    case 'MAX':
    case 'MEDIAN':
    case 'MODE':
      return parseMathFunction(name, revToks);
    case 'ALL_VALUES_OF':
      return parseFieldFunction(name, revToks, true, false);
    case 'COUNTFORMS':
      return parseFieldFunction(name, revToks, false, true);
    case 'COUNTFORMS_UNIQUE':
      return parseFieldFunction(name, revToks, true, true);
    case 'INCLUDES':
      consume(revToks, TokenType.LParen);
      js = '(' + parseExpression(revToks, TokenType.Comma) + ').includes(';
      consume(revToks, TokenType.Comma);
      js += parseExpression(revToks, TokenType.Comma) + ')';
      consume(revToks, TokenType.RParen);
      return js;
    case 'PERCENT':
      consume(revToks, TokenType.LParen);
      js = 'PERCENT(' + parseExpression(revToks, TokenType.Comma) + ', ';
      consume(revToks, TokenType.Comma);
      js += parseExpression(revToks, TokenType.Comma) + ')';
      consume(revToks, TokenType.RParen);
      return js;
    case 'LAST':
      return parseLast(revToks);
    case 'REPEAT':
      return parseRepeat(revToks);
    default:
      throw new Error('unsupported function: ' + name);
  }
}

// Parses a function with parameters: form, expression, condition?
function parseMathFunction(name: string, revToks: Token[]): string {
  consume(revToks, TokenType.LParen);
  const form = parseExpression(revToks, TokenType.Comma);
  consume(revToks, TokenType.Comma);
  const exp = parseExpression(revToks, TokenType.Comma);
  const tok = revToks.pop() as Token;
  switch (tok.type) {
    case TokenType.RParen:
      return `${name}(${form}, \`${exp}\`)`;
    case TokenType.Comma:
      const condition = parseExpression(revToks, TokenType.Comma);
      consume(revToks, TokenType.RParen);
      return `${name}(${form}, \`${exp}\`, \`${condition}\`)`;
    default:
      throw unexpectedTokenError(tok, revToks);
  }
}

// Parses a function with parameters: form, fieldName?, condition?
function parseFieldFunction(
  name: string,
  revToks: Token[],
  hasField: boolean,
  canHaveCond: boolean,
): string {
  consume(revToks, TokenType.LParen);
  let js = name + '(' + parseExpression(revToks, TokenType.Comma);
  if (hasField) {
    consume(revToks, TokenType.Comma);
    const fieldName = consume(revToks, TokenType.Name).text.slice(1);
    js += `, \`${fieldName}\``;
  }
  const tok = revToks.pop() as Token;
  if (tok.type === TokenType.RParen) {
    return js + ')';
  }
  if (!canHaveCond || tok.type !== TokenType.Comma) {
    throw unexpectedTokenError(tok, revToks);
  }
  const condition = parseExpression(revToks, TokenType.Comma);
  consume(revToks, TokenType.RParen);
  return js + `, \`${condition}\`)`;
}

// LAST has parameters: form, expression, date?
// where date is a string constant.
function parseLast(revToks: Token[]): string {
  consume(revToks, TokenType.LParen);
  const form = parseExpression(revToks, TokenType.Comma);
  consume(revToks, TokenType.Comma);
  const exp = parseExpression(revToks, TokenType.Comma);
  const tok = revToks.pop() as Token;
  switch (tok.type) {
    case TokenType.RParen:
      return `LAST(${form}, \`${exp}\`)`;
    case TokenType.Comma:
      const date = consume(revToks, TokenType.String).text;
      consume(revToks, TokenType.RParen);
      return `LAST(${form}, \`${exp}\`, ${date})`;
    default:
      throw unexpectedTokenError(tok, revToks);
  }
}

// REPEAT has parameters: form, array, funcIndent, expression, condition?
function parseRepeat(revToks: Token[]): string {
  consume(revToks, TokenType.LParen);
  const form = parseExpression(revToks, TokenType.Comma);
  consume(revToks, TokenType.Comma);
  const array = parseExpression(revToks, TokenType.Comma);
  consume(revToks, TokenType.Comma);
  const funcIdent = consume(revToks, TokenType.Indent).text;
  consume(revToks, TokenType.Comma);
  const exp = parseExpression(revToks, TokenType.Comma);
  const tok = revToks.pop() as Token;
  switch (tok.type) {
    case TokenType.RParen:
      return `REPEAT(${form}, ${array}, ${funcIdent}, \`${exp}\`)`;
    case TokenType.Comma:
      const condition = parseExpression(revToks, TokenType.Comma);
      consume(revToks, TokenType.RParen);
      return `REPEAT(${form}, ${array}, ${funcIdent}, \`${exp}\`, \`${condition}\`)`;
    default:
      throw unexpectedTokenError(tok, revToks);
  }
}
