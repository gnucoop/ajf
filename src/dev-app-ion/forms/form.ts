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

export const formSchema: any = {
  choicesOrigins: [
    {
      type: 'fixed',
      name: 'animals',
      choicesType: 'string',
      choices: [
        {
          value: 'dog',
          label: 'Dog'
        },
        {
          value: 'cat',
          label: 'Cat'
        }
      ]
    },
    {
      type: 'fixed',
      name: 'mchoice2',
      choicesType: 'string',
      choices: [
        {
          value: 'option1',
          label: 'Option1'
        },
        {
          value: 'option2',
          label: 'Option2'
        },
        {
          value: 'option3',
          label: 'Option3'
        },
        {
          value: 'option4',
          label: 'Option4'
        },
        {
          value: 'option5',
          label: 'Option5'
        }
      ]
    },
    {
      type: 'fixed',
      name: 'mchoice3',
      choicesType: 'string',
      choices: [
        {
          value: 'option1',
          label: 'Option1'
        },
        {
          value: 'option2',
          label: 'Option2'
        },
        {
          value: 'option3',
          label: 'Option3'
        },
        {
          value: 'option4',
          label: 'Option4'
        },
        {
          value: 'option5',
          label: 'Option5'
        },
        {
          value: 'option6',
          label: 'Option6'
        },
        {
          value: 'option7',
          label: 'Option7'
        },
        {
          value: 'option8',
          label: 'Option8'
        },
        {
          value: 'option9',
          label: 'Option9'
        },
        {
          value: 'option10',
          label: 'Option10'
        },
        {
          value: 'option11',
          label: 'Option11'
        },
        {
          value: 'option12',
          label: 'Option12'
        },
        {
          value: 'option13',
          label: 'Option13'
        },
        {
          value: 'option14',
          label: 'Option14'
        },
        {
          value: 'option15',
          label: 'Option15'
        }
      ]
    },
    {
      type: 'fixed',
      name: 'schoice',
      choicesType: 'string',
      choices: [
        {
          value: 'option1',
          label: 'Option1'
        },
        {
          value: 'option2',
          label: 'Option2'
        },
        {
          value: 'option3',
          label: 'Option3'
        }
      ]
    }
  ],
  nodes: [
    {
      parent: 0,
      id: 1,
      name: 'information',
      label: 'General fields',
      nodeType: 3,
      nodes: [
        {
          parent: 1,
          id: 1001,
          name: 'number',
          label: '64-bit floating point number',
          nodeType: 0,
          fieldType: 2,
          validation: {
            notEmpty: true
          }
        },
        {
          parent: 1001,
          id: 1002,
          name: 'number',
          label: 'A number with the added constraint of being an integer',
          nodeType: 0,
          fieldType: 2,
          validation: {
            conditions: [
              {
                'condition': 'isInt(number)',
                'clientValidation': true,
                'errorMessage': 'The field value must be an integer.'
              },
              {
                'condition': 'number < 150',
                'clientValidation': true,
                'errorMessage': 'minore di 150'
              }
            ]
          }
        },
        {
          parent: 1002,
          id: 1003,
          name: 'string',
          label: 'Free text response',
          nodeType: 0,
          fieldType: 0
        },
        {
          parent: 1003,
          id: 1004,
          name: 'boolean',
          label: 'Boolean answer (a checkbox)',
          nodeType: 0,
          fieldType: 3
        },
        {
          parent: 1004,
          id: 1005,
          name: 'empty',
          label: '',
          nodeType: 0,
          fieldType: 7,
          HTML: 'Inserts an HTML note in the form'
        },
        {
          parent: 1005,
          id: 1006,
          name: 'date input',
          label: 'A date',
          nodeType: 0,
          fieldType: 9
        },
        {
          parent: 1006,
          id: 1007,
          name: 'time',
          label: 'Time',
          nodeType: 0,
          fieldType: 10
        },
        {
          parent: 1007,
          id: 1008,
          name: 'barcode',
          label: 'Barcode',
          nodeType: 0,
          fieldType: 13
        }
      ]
    },
    {
      parent: 1,
      id: 2,
      name: 'choice',
      label: 'Choice Fileds',
      nodeType: 3,
      nodes: [
        {
          parent: 2,
          id: 2001,
          name: 'singlechoice',
          label: 'Single choice answer',
          nodeType: 0,
          fieldType: 4,
          choicesOriginRef: 'schoice'
        },
        {
          parent: 2001,
          id: 2002,
          name: 'multiplechoice',
          label: 'Multiple choice answer 6 options',
          nodeType: 0,
          fieldType: 5,
          choicesOriginRef: 'mchoice2'
        },
        {
          parent: 2002,
          id: 2003,
          name: 'multiplechoice',
          label: 'Multiple choice answer more than 6 options',
          nodeType: 0,
          fieldType: 5,
          choicesOriginRef: 'mchoice3'
        }
      ]
    },
    {
      parent: 2,
      id: 3,
      name: 'relevant',
      label: 'Hiiden fileds with Relevant',
      nodeType: 3,
      nodes: [
        {
          parent: 3,
          id: 3001,
          name: 'pet_type',
          label: 'Do you have a cat or a dog?',
          nodeType: 0,
          fieldType: 4,
          choicesOriginRef: 'animals'
        },
        {
          parent: 3001,
          id: 3002,
          name: 'cat_name',
          label: 'Name of your cat:',
          nodeType: 0,
          fieldType: 0,
          'visibility': {
            'condition': 'pet_type === \'cat\''
          }
        },
        {
          parent: 3002,
          id: 3003,
          name: 'dog_name',
          label: 'Name of your dog:',
          nodeType: 0,
          fieldType: 0,
          'visibility': {
            'condition': 'pet_type === \'dog\''
          }
        }
      ]
    },
    {
      parent: 3,
      id: 4,
      name: 'calculation',
      label: 'Calculation fields',
      nodeType: 3,
      nodes: [
        {
          parent: 4,
          id: 4001,
          name: 'amount',
          label: 'Price of your meal:',
          nodeType: 0,
          fieldType: 2,
          validation: {
            notEmpty: true
          }
        },
        {
          parent: 4001,
          id: 4002,
          name: 'tip',
          label: '5% tip is:',
          nodeType: 0,
          fieldType: 6,
          formula: {
            formula: 'amount*0.05'
          }
        },
        {
          parent: 4002,
          id: 4003,
          name: 'total',
          label: 'Total is:',
          nodeType: 0,
          fieldType: 6,
          formula: {
            formula: 'amount + tip'
          }
        }
      ]
    },
    {
      parent: 4,
      id: 5,
      name: 'repeat',
      label: 'Multiple Slide',
      nodeType: 4,
      nodes: [
        {
          parent: 5,
          id: 5001,
          name: name,
          label: 'Child\'s name',
          nodeType: 0,
          fieldType: 0
        },
        {
          parent: 5001,
          id: 5002,
          name: 'birthweight',
          label: 'Child\'s birthweight',
          nodeType: 0,
          fieldType: 2
        }
      ]
    }
  ]
};
