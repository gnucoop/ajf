/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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

export const jsonChoicesOrigins = [{
  'type': 'fixed',
  'choicesType': 'string',
  'name': 'test_choices',
  'label': 'Generic Test',
  'choices': [
    {
      'label': 'choice 1',
      'value': 'choice 1'
    },
    {
      'label': 'choice 2',
      'value': 'choice 2'
    }
  ]
}];

export const jsonFieldString = {
  'id': 1,
  'name': 'question_string',
  'label': 'Question string',
  'visibility': { 'condition': 'true' },
  'hasChoices': false,
  'nodeType': 0,
  'conditionalBranches': [{ 'condition': 'true' }],
  'fieldType': 0,
  'validation': { 'notEmpty': true }
};

export const jsonFieldText = {
  'id': 1,
  'name': 'question_text',
  'label': 'Question text',
  'visibility': { 'condition': 'true' },
  'hasChoices': false,
  'nodeType': 0,
  'fieldType': 1,
  'validation': { 'notEmpty': true }
};

export const jsonFieldNumber = {
  'id': 1,
  'name': 'question_number',
  'label': 'Question number',
  'visibility': { 'condition': 'true' },
  'hasChoices': false,
  'nodeType': 0,
  'fieldType': 2,
  'validation': { 'notEmpty': true }
};

export const jsonFieldBoolean = {
  'id': 2,
  'name': 'question_boolean',
  'label': 'Question boolean',
  'visibility': { 'condition': 'true' },
  'hasChoices': false,
  'parent': 1,
  'parentNode': 0,
  'nodeType': 0,
  'fieldType': 3,
  'validation': { 'notEmpty': true }
};

export const jsonFieldSingleChoice = {
  'id': 1,
  'name': 'question_single_choice',
  'label': 'Question single choice',
  'visibility': { 'condition': 'true' },
  'hasChoices': true,
  'nodeType': 0,
  'fieldType': 4,
  'validation': { 'notEmpty': true },
  'choicesOriginRef': 'test_choices'
};

export const jsonFieldMultipleChoice = {
  'id': 1,
  'name': 'question_multiple_choice',
  'label': 'Question multiple choice',
  'visibility': { 'condition': 'true' },
  'hasChoices': true,
  'nodeType': 0,
  'fieldType': 5,
  'validation': { 'notEmpty': true },
  'choicesOriginRef': 'test_choices'

};

export const jsonFieldFormula = {
  'id': 2,
  'name': 'question_formula',
  'label': 'Question formula',
  'visibility': { 'condition': 'true' },
  'hasChoices': false,
  'nodeType': 0,
  'fieldType': 6,
  'formula': {
            'formula': 'sum(1)'
        },
  'editable': false,
  'validation': { 'notEmpty': true }
};

export const jsonFieldEmpty = {
  'id': 1,
  'name': 'question_empty',
  'label': 'Question empty',
  'visibility': { 'condition': 'true' },
  'hasChoices': false,
  'nodeType': 0,
  'fieldType': 7,
  'validation': { 'notEmpty': true },
  'conditionalBranches': { 'condition': 'true'},
  'attachmentOriginRef': 'test_attachment'
};

export const jsonFieldDate = {
  'id': 1,
  'name': 'question_date',
  'label': 'Question date',
  'visibility': { 'condition': 'true' },
  'hasChoices': false,
  'nodeType': 0,
  'fieldType': 9,
  'validation': { 'notEmpty': true }
};

export const jsonForm = {
  'nodes': [{
    'id': 1,
    'name': 'slide_1',
    'label': 'Slide 1',
    'visibility': {'condition': 'true'},
    'hasChoices': false,
    'parent': 0,
    'parentNode': 0,
    'nodeType': 3,
    'validation': {
      'notEmpty': true
    },
    'conditionalBranches': [{'condition': 'true'}],
    'fieldType': 8,
    'nodes': [{
      'id': 2,
      'name': 'question_1',
      'label': 'Question 1',
      'visibility': {'condition': 'true'},
      'hasChoices': false,
      'parent': 1,
      'parentNode': 0,
      'nodeType': 0,
      'fieldType': 2,
      'validation': {
        'notEmpty': true
      }
    }]
  }, {
    'id': 3,
    'name': 'slide_2',
    'label': 'Slide 2',
    'visibility': {'condition': 'true'},
    'hasChoices': false,
    'parent': 1,
    'parentNode': 0,
    'nodeType': 3,
    'validation': {
      'notEmpty': true
    },
    'conditionalBranches': [{'condition': 'true'}],
    'fieldType': 8,
    'nodes': [{
      'id': 4,
      'name': 'question_2',
      'label': 'Question 2',
      'visibility': {'condition': 'true'},
      'hasChoices': false,
      'parent': 3,
      'parentNode': 0,
      'nodeType': 0,
      'fieldType': 1,
      'validation': {
        'notEmpty': true
      }
    }]
  }]
};
