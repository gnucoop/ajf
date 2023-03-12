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
  Ident,
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
    return {type: TokenType.Ident, text: m[0]};
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
  switch (typeof formula) {
    case 'string':
      if (formula.startsWith('js:')) {
        return formula.slice(3).trim();
      }
      break;
    case 'number':
    case 'boolean':
      formula = String(formula);
      break;
    default:
      throw new Error('formula is not a string');
  }
  return parseExpression(tokenize(formula).reverse(), TokenType.END).js;
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

interface ParsingResult {
  js: string;
  vars: string[];
}

// parseExpression parses the first expression in revToks
// and returns its JavaScript/ajf translation.
// revToks is reversed, the first token of the expression being at index length-1;
// this way, tokens can be consumed efficiently with revToks.pop().
// After the expression, the function expects to find the token expectedEnd.
function parseExpression(revToks: Token[], expectedEnd: TokenType): ParsingResult {
  if (
    expectedEnd !== TokenType.END &&
    expectedEnd !== TokenType.RParen &&
    expectedEnd !== TokenType.Comma &&
    expectedEnd !== TokenType.RBracket
  ) {
    throw new Error('invalid expectedEnd');
  }

  let js = '';
  const vars: string[] = [];
  while (true) {
    // Expression.
    let tok = revToks.pop() as Token;
    let next: Token;
    switch (tok.type) {
      case TokenType.Ident:
        next = revToks[revToks.length - 1];
        if (next.type === TokenType.LParen) {
          const func = parseFunctionCall(tok.text, revToks);
          js += func.js;
          vars.push(...func.vars);
        } else if (next.type === TokenType.LBracket) {
          consume(revToks, TokenType.LBracket);
          const index = parseExpression(revToks, TokenType.RBracket);
          consume(revToks, TokenType.RBracket);
          js += `${tok.text}[${index.js}]`;
          vars.push(tok.text, ...index.vars);
        } else {
          js += tok.text;
          vars.push(tok.text);
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
        const paren = parseExpression(revToks, TokenType.RParen);
        consume(revToks, TokenType.RParen);
        js += '(' + paren.js + ')';
        vars.push(...paren.vars);
        break;
      case TokenType.LBracket:
        const list = parseList(revToks, TokenType.RBracket);
        consume(revToks, TokenType.RBracket);
        js += '[' + list.js + ']';
        vars.push(...list.vars);
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
      return {js, vars};
    }

    // Operator.
    tok = revToks.pop() as Token;
    if (tok.type >= TokenType.Plus && tok.type <= TokenType.GreaterOrEq) {
      js += ' ' + tok.text + ' ';
      continue;
    }
    switch (tok.type) {
      case TokenType.Ident:
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
function parseList(revToks: Token[], expectedEnd: TokenType): ParsingResult {
  if (expectedEnd !== TokenType.Comma && expectedEnd !== TokenType.RBracket) {
    throw new Error('invalid expectedEnd');
  }
  let js = '';
  const vars: string[] = [];
  let next = revToks[revToks.length - 1];
  if (next.type === TokenType.RParen || next.type === TokenType.RBracket) {
    // empty list
    return {js, vars};
  }
  while (true) {
    const elem = parseExpression(revToks, expectedEnd);
    js += elem.js;
    vars.push(...elem.vars);
    next = revToks[revToks.length - 1];
    if (next.type === TokenType.RParen || next.type === TokenType.RBracket) {
      return {js, vars};
    }
    consume(revToks, TokenType.Comma);
    js += ', ';
  }
}

// parseFunctionCall parses a function call expression.
// The list of supported functions is in
//   projects/core/models/utils/expression-utils.ts
// The function name has already been scanned.
function parseFunctionCall(name: string, revToks: Token[]): ParsingResult {
  const args = functionArgs[name];
  if (args) {
    return parseFunctionWithArgs(name, revToks, args);
  }
  if (name === 'IF_THEN_ELSE') {
    consume(revToks, TokenType.LParen);
    const cond = parseExpression(revToks, TokenType.Comma);
    let js = '(' + cond.js + ' ? ';
    const vars = cond.vars;
    consume(revToks, TokenType.Comma);
    const then = parseExpression(revToks, TokenType.Comma);
    js += then.js + ' : ';
    vars.push(...then.vars);
    consume(revToks, TokenType.Comma);
    const otherwise = parseExpression(revToks, TokenType.Comma);
    js += otherwise.js + ')';
    vars.push(...otherwise.vars);
    consume(revToks, TokenType.RParen);
    return {js, vars};
  }
  throw new Error('unsupported function: ' + name);
}

/*
  Parses a function call expression.
  args tells how many arguments the function takes and their type.
  For example, the indicator function
    SUM(forms[0], $age, $gender = "male")
  can be parsed with
    parseFunctionWithArgs('SUM', revToks, ['arg', 'field', 'formula?'])
  resulting in the following JavaScript:
    SUM(forms[0], 'age', "gender === \"male\"")
*/
function parseFunctionWithArgs(name: string, revToks: Token[], args: string[]): ParsingResult {
  consume(revToks, TokenType.LParen);
  let argsJs = '';
  const allVars: string[] = [];
  let formulaVars: string[] = [];
  for (let i = 0; i < args.length; i++) {
    let argType = args[i];
    if (argType.endsWith('?') && revToks[revToks.length-1].type === TokenType.RParen) {
      break;
    }
    if (argType.endsWith('?')) {
      argType = argType.slice(0, -1);
    }
    if (i !== 0) {
      consume(revToks, TokenType.Comma);
      argsJs += ', ';
    }
    const firstArgTok = revToks[revToks.length - 1];
    const arg = parseExpression(revToks, TokenType.Comma);
    allVars.push(...arg.vars);
    if (argType === 'formula') {
      formulaVars.push(...arg.vars);
      arg.js = quote(arg.js);
    } else if (argType === 'field' && firstArgTok.type === TokenType.Name && isIdentifier(arg.js)) {
      arg.js = `'${arg.js}'`;
    }
    argsJs += arg.js;
  }
  consume(revToks, TokenType.RParen);

  const varsSet = new Set(formulaVars);
  if (name === 'MAP') {
    varsSet.delete('elem');
  } else if (name === 'OP') {
    varsSet.delete('elemA');
    varsSet.delete('elemB');
  }
  if (varsSet.size === 0) {
    return {js: `${name}(${argsJs})`, vars: allVars};
  }
  return {js: `${name}.call({${[...varsSet].join(', ')}}, ${argsJs})`, vars: allVars};
}

function isIdentifier(js: string): boolean {
  return /^[a-zA-Z_]\w*$/.test(js);
}

function quote(s: string): string {
  if (typeof(s) !== 'string') {
    throw new Error('quote argument is not a string');
  }
  return JSON.stringify(s);
}

const functionArgs: {[name: string]: string[]} = {
  SUM: ["arg", "field", "formula?"],
  MEAN: ["arg", "field", "formula?"],
  MAX: ["arg", "field", "formula?"],
  MEDIAN: ["arg", "field", "formula?"],
  MODE: ["arg", "field", "formula?"],
  COUNT_FORMS: ["arg", "field"],
  COUNT_REPS: ["arg", "field"],
  ALL_VALUES_OF: ["arg", "field", "formula?"],
  PERCENT: ["arg", "arg"],
  LAST: ["arg", "field", "arg?"],
  MAP: ["arg", "formula"],
  INCLUDES: ["arg", "arg"],
  FILTER_BY: ["arg", "formula"],
  APPLY: ["arg", "field", "formula"],
  GET_AGE: ["arg"],
  LEN: ["arg"],
  CONCAT: ["arg", "arg"],
  REMOVE_DUPLICATES: ["arg"],
  CONSOLE_LOG: ["arg"],
  JOIN_FORMS: ["arg", "arg", "field", "field?"],
  JOIN_REPEATING_SLIDES: ["arg", "arg", "field", "field", "field", "field?"],
  FROM_REPS: ["arg", "formula"],
  OP: ["arg", "arg", "formula"],
  GET_LABELS: ["arg", "arg"],
  APPLY_LABELS: ["arg", "arg", "arg"],
  BUILD_DATASET: ["arg", "arg?"],
  ROUND: ["arg"],
  IS_BEFORE: ["arg", "arg"],
  IS_AFTER: ["arg", "arg"],
  IS_WITHIN_INTERVAL: ["arg", "arg", "arg"],
  COMPARE_DATE: ["arg", "arg", "arg", "arg?"],
  TODAY: [],
};
