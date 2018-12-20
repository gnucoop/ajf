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

export const form = {
  'choicesOrigins': [
      {
          'type': 'fixed',
          'choicesType': 'string',
          'name': 'wash_emergency_status',
          'choices': [
              {
                  'label': 'Emergency',
                  'value': 'Emergency'
              },
              {
                  'label': 'Post-emergency',
                  'value': 'Post-emergency'
              }
          ]
      },
      {
          'type': 'fixed',
          'choicesType': 'string',
          'name': 'wash_watertrucking_treatment',
          'choices': [
              {
                  'label': 'chlorinated',
                  'value': 'chlorinated'
              },
              {
                  'label': 'unchlorinated',
                  'value': 'unchlorinated'
              }
          ]
      },
      {
          'type': 'fixed',
          'choicesType': 'string',
          'name': 'wash_borehole_treatment',
          'choices': [
              {
                  'label': 'chlorinated',
                  'value': 'chlorinated'
              },
              {
                  'label': 'unchlorinated',
                  'value': 'unchlorinated'
              }
          ]
      },
      {
          'type': 'fixed',
          'choicesType': 'string',
          'name': 'wash_spring_treatment',
          'choices': [
              {
                  'label': 'chlorinated',
                  'value': 'chlorinated'
              },
              {
                  'label': 'unchlorinated',
                  'value': 'unchlorinated'
              }
          ]
      },
      {
          'type': 'fixed',
          'choicesType': 'string',
          'name': 'wash_other_treatment',
          'choices': [
              {
                  'label': 'chlorinated',
                  'value': 'chlorinated'
              },
              {
                  'label': 'unchlorinated',
                  'value': 'unchlorinated'
              }
          ]
      },
      {
          'type': 'fixed',
          'choicesType': 'string',
          'name': 'wash_surfacewater_treatment',
          'choices': [
              {
                  'label': 'chlorinated',
                  'value': 'chlorinated'
              },
              {
                  'label': 'unchlorinated',
                  'value': 'unchlorinated'
              }
          ]
      }
  ],
  'nodes': [
      {
          'id': 1,
          'name': 'wash_emergency_status_group',
          'label': '',
          'visibility': {
              'condition': 'true'
          },
          'conditionalBranches': [
              {
                  'condition': 'wash_emergency_status == \'Post-emergency\''
              },
              {
                  'condition': 'wash_emergency_status == \'Emergency\''
              }
          ],
          'parent': 0,
          'parentNode': 0,
          'nodeType': 3,
          'nodes': [
              {
                  'name': 'wash_emergency_status',
                  'id': 101,
                  'parent': 1,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'fieldType': 4,
                  'choicesOriginRef': 'wash_emergency_status',
                  'hasChoices': true,
                  'validation': {
                      'notEmpty': true
                  },
                  'label': 'Emergency Status'
              }
          ]
      },
      {
          'id': 2,
          'parent': 1,
          'name': '',
          'label': 'Demographics',
          'visibility': {
              'condition': 'true'
          },
          'parentNode': 0,
          'nodeType': 3,
          'nodes': [
              {
                  'name': 'wash_refugee_pop',
                  'id': 201,
                  'parent': 2,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'small',
                  'label': 'Refugee Population (use UNHCR figure,'
                    + ' if not already automatically filled in)'
              },
              {
                  'name': 'wash_refugee_hh',
                  'id': 202,
                  'parent': 201,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': 'wash_refugee_pop > wash_refugee_hh',
                              'clientValidation': true,
                              'errorMessage':
                                'Please enter a number lower than the Refugee Population'
                          },
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'small',
                  'label': 'Number of Refugee Households (use UNHCR'
                    + ' figure, if not already automatically filled in)'
              },
              {
                  'name': 'wash_host_pop',
                  'id': 203,
                  'parent': 202,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'small',
                  'label': 'Number of Host Population served by same water sources as Refugees'
              }
          ]
      },
      {
          'id': 3,
          'parent': 2,
          'name': '',
          'label': 'Water Supply',
          'visibility': {
              'condition': 'true'
          },
          'parentNode': 0,
          'nodeType': 3,
          'nodes': [
              {
                  'name': 'wash_openspring_num',
                  'id': 301,
                  'parent': 3,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'small',
                  'label': 'Number of functional springs / open wells'
              },
              {
                  'name': 'wash_openspring_volume',
                  'id': 302,
                  'parent': 301,
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 0,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '!wash_openspring_volume || wash_openspring_num > 0',
                              'clientValidation': true,
                              'errorMessage': 'Please enter a value in \'Number'
                                + ' of functional springs / open wells\''
                          }
                      ]
                  },
                  'visibility': {
                      'condition': 'wash_openspring_num > 0'
                  },
                  'size': 'small',
                  'label': 'Cumulative Volume produced by'
                    + ' the springs / open wells daily [m<sup>3</sup>]'
              },
              {
                  'name': 'wash_handpump_num',
                  'id': 303,
                  'parent': 302,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'small',
                  'label': 'Number of functional handpumps'
              },
              {
                  'name': 'wash_handpump_volume',
                  'id': 304,
                  'parent': 303,
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '!wash_handpump_volume || wash_handpump_num > 0',
                              'clientValidation': true,
                              'errorMessage':
                                'Please enter a value in \'Number of functional handpumps\''
                          }
                      ]
                  },
                  'visibility': {
                      'condition': 'wash_handpump_num > 0'
                  },
                  'size': 'small',
                  'label': 'Cumulative Volume produced by handpumps daily [m<sup>3</sup>]'
              },
              {
                  'name': 'wash_watertrucking_volume',
                  'id': 305,
                  'parent': 304,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 0,
                  'validation': {
                      'minValue': 1
                  },
                  'condition': 'true',
                  'size': 'smaller',
                  'label': 'Cumulative Volume produced by water trucking daily [m<sup>3</sup>]'
              },
              {
                  'name': 'wash_watertrucking_treatment',
                  'id': 306,
                  'parent': 305,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 4,
                  'choicesOriginRef': 'wash_watertrucking_treatment',
                  'forceNarrow': true,
                  'hasChoices': true,
                  'default': 'unchlorinated',
                  'validation': {
                      'minValue': 1
                  },
                  'size': 'smaller',
                  'label': 'Water trucking Treatment'
              },
              {
                  'name': 'wash_borehole_num',
                  'id': 307,
                  'parent': 306,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'smaller',
                  'label': 'Number of functional boreholes (motorized pump)'
              },
              {
                  'name': 'wash_borehole_volume',
                  'id': 308,
                  'parent': 307,
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 0,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '!wash_borehole_volume || wash_borehole_num > 0',
                              'clientValidation': true,
                              'errorMessage': 'Please enter a value in '
                                + '\'Number of functional boreholes (motorized pump)\''
                          }
                      ]
                  },
                  'visibility': {
                      'condition': 'wash_borehole_num > 0'
                  },
                  'size': 'smaller',
                  'label': 'Cumulative Volume produced by'
                    + ' boreholes (motorized pump) daily [m<sup>3</sup>]'
              },
              {
                  'name': 'wash_borehole_treatment',
                  'id': 309,
                  'parent': 308,
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 4,
                  'choicesOriginRef': 'wash_borehole_treatment',
                  'forceNarrow': true,
                  'hasChoices': true,
                  'validation': {
                      'minValue': 1
                  },
                  'visibility': {
                      'condition': 'wash_borehole_num > 0'
                  },
                  'size': 'smaller',
                  'label': 'Boreholes Treatment'
              },
              {
                  'name': 'wash_surfacewater_num',
                  'id': 310,
                  'parent': 309,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'smaller',
                  'label': 'Number of functional surface water sources (Lake, River)'
              },
              {
                  'name': 'wash_surfacewater_volume',
                  'id': 311,
                  'parent': 310,
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 0,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '!wash_surfacewater_volume ||'
                                + ' wash_surfacewater_num > 0',
                              'clientValidation': true,
                              'errorMessage': 'Please enter a value in \'Number of'
                                + ' functional surface water sources (Lake, River)\''
                          }
                      ]
                  },
                  'visibility': {
                      'condition': 'wash_surfacewater_num > 0'
                  },
                  'size': 'smaller',
                  'label': 'Cumulative Volume produced by surface water daily [m<sup>3</sup>] '
              },
              {
                  'name': 'wash_surfacewater_treatment',
                  'id': 312,
                  'parent': 311,
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 4,
                  'hasChoices': true,
                  'validation': {
                      'minValue': 1
                  },
                  'choicesOriginRef': 'wash_surfacewater_treatment',
                  'visibility': {
                      'condition': 'wash_surfacewater_num > 0'
                  },
                  'size': 'smaller',
                  'label': 'Surface Water Treatment'
              },
              {
                  'name': 'wash_spring_num',
                  'id': 313,
                  'parent': 312,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'smaller',
                  'label': 'Number of functional springs (connected to pipe network)'
              },
              {
                  'name': 'wash_spring_volume',
                  'id': 314,
                  'parent': 313,
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 0,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '!wash_spring_volume || wash_spring_num > 0',
                              'clientValidation': true,
                              'errorMessage': 'Please enter a value in \'Number of'
                                + ' functional springs (connected to pipe network)\''
                          }
                      ]
                  },
                  'visibility': {
                      'condition': 'wash_spring_num > 0'
                  },
                  'size': 'smaller',
                  'label': 'Cumulative Volume produced by springs daily [m<sup>3</sup>]'
              },
              {
                  'name': 'wash_spring_treatment',
                  'id': 315,
                  'parent': 314,
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 4,
                  'choicesOriginRef': 'wash_spring_treatment',
                  'forceNarrow': true,
                  'hasChoices': true,
                  'validation': {
                      'minValue': 1
                  },
                  'visibility': {
                      'condition': 'wash_spring_num > 0'
                  },
                  'size': 'smaller',
                  'label': 'Springs Treatment'
              },
              {
                  'name': 'wash_other_num',
                  'id': 316,
                  'parent': 315,
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'smaller',
                  'label': 'Number of other functional water sources'
              },
              {
                  'name': 'wash_other_volume',
                  'id': 317,
                  'parent': 316,
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 0,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '!wash_other_volume || wash_other_num > 0',
                              'clientValidation': true,
                              'errorMessage': 'Please enter a value in \'Number'
                                + ' of functional water sources\''
                          }
                      ]
                  },
                  'visibility': {
                      'condition': 'wash_other_num > 0'
                  },
                  'size': 'smaller',
                  'label': 'Cumulative volume produced by the other'
                    + ' water sources daily [m<sup>3</sup>]'
              },
              {
                  'name': 'wash_other_treatment',
                  'id': 318,
                  'parent': 317,
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 4,
                  'choicesOriginRef': 'wash_other_treatment',
                  'forceNarrow': true,
                  'hasChoices': true,
                  'validation': {
                      'minValue': 1
                  },
                  'visibility': {
                      'condition': 'wash_other_num > 0'
                  },
                  'size': 'smaller',
                  'label': 'Other water sources Treatment'
              },
              {
                  'name': 'wash_taps',
                  'id': 319,
                  'parent': 318,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'label': 'Total number of taps (household, tapstands…)'
              },
              {
                  'name': 'wash_pot_water',
                  'id': 320,
                  'parent': 319,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': '((wash_other_treatment == \'chlorinated\' &&'
                        + ' wash_other_volume ? wash_other_volume : 0) +'
                        + ' (wash_surfacewater_treatment == \'chlorinated\' &&'
                        + ' wash_surfacewater_volume ? wash_surfacewater_volume : 0) +'
                        + ' (wash_watertrucking_treatment == \'chlorinated\' &&'
                        + ' wash_watertrucking_volume ? wash_watertrucking_volume : 0) +'
                        + ' (wash_borehole_volume ? wash_borehole_volume : 0) +'
                        + ' (wash_handpump_volume ? wash_handpump_volume : 0) +'
                        + ' (wash_openspring_volume ? wash_openspring_volume : 0)) /'
                        + ' ((wash_refugee_pop ? wash_refugee_pop : 0) +'
                        + ' (wash_host_pop ? wash_host_pop : 0)) * 1000'
                  },
                  'label': 'Average number of litres of potable water produced'
                        + ' per person per day:'
              },
              {
                  'name': 'wash_pers_pump',
                  'id': 321,
                  'parent': 320,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': '(wash_refugee_pop+wash_host_pop)/'
                        + '(wash_openspring_num+wash_handpump_num)'
                  },
                  'label': 'Number of persons per usable handpump/well/spring '
              },
              {
                  'name': 'wash_pers_tap',
                  'id': 322,
                  'parent': 321,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': '(wash_refugee_pop+wash_host_pop)/wash_taps'
                  },
                  'label': ' Number of persons per usable water tap:'
              },
              {
                  'name': 'wash_FRC_0001',
                  'id': 323,
                  'parent': 322,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'label': ' Total number of FRC tests measuring 0-0.1mg/L and Turbidity <5NTU:'
              },
              {
                  'name': 'wash_FRC_0220',
                  'id': 324,
                  'parent': 323,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'label': 'Total number of FRC tests measuring 0.2-2.0mg/L and Turbidity <5NTU:'
              },
              {
                  'name': 'wash_FRC_g20',
                  'id': 325,
                  'parent': 324,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'label': ' Total number of FRC tests measuring'
                        + ' greater than 2mg/L and Turbidity <5NTU:'
              },
              {
                  'name': 'wash_turbidity',
                  'id': 326,
                  'parent': 325,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'label': ' Total number of tests measuring Turbidity >5NTU:'
              },
              {
                  'name': 'wash_FC_0',
                  'id': 327,
                  'parent': 326,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'label': ' Total number of FC tests indicating 0 CFU/100ml:'
              },
              {
                  'name': 'wash_FC_over0',
                  'id': 328,
                  'parent': 327,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'label': ' Total number of FC tests indicating greater than 0 CFU/100ml:'
              },
              {
                  'name': 'wash_water_quality_chlorinated',
                  'id': 329,
                  'parent': 328,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': 'wash_FRC_0220/(wash_FRC_0001+wash_FRC_0220+'
                        + 'wash_FRC_g20+wash_turbidity)*100'
                  },
                  'percent': 1,
                  'label': ' % of water quality tests at chlorinated water locations'
                        + ' with FRC in the range 0.2-2mg/L and turbidity <5NTU:'
              },
              {
                  'name': 'wash_water_quality_non_chlorinated',
                  'id': 330,
                  'parent': 329,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': 'wash_FC_0/(wash_FC_0+wash_FC_over0)*100'
                  },
                  'percent': 1,
                  'label': ' % of water quality tests at non chlorinated water'
                        + ' collection locations with 0 CFU/100ml::'
              }
          ]
      },
      {
          'id': 4,
          'parent': 3,
          'name': '',
          'label': 'Sanitation and Hygiene',
          'visibility': {
              'condition': 'true'
          },
          'parentNode': 0,
          'nodeType': 3,
          'nodes': [
              {
                  'name': 'wash_communal_latrine',
                  'id': 401,
                  'parent': 4,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'smaller',
                  'label': ' Total number of communal latrine/toilet stances:'
              },
              {
                  'name': 'wash_hh_latrine',
                  'id': 402,
                  'parent': 401,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'smaller',
                  'label': ' Total number of household latrine/toilet stances:'
              },
              {
                  'name': 'wash_showers',
                  'id': 403,
                  'parent': 402,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'size': 'smaller',
                  'label': ' Total number of bathing shelter/shower stances:'
              },
              {
                  'name': 'wash_promoters',
                  'id': 404,
                  'parent': 403,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'label': ' Total number of Hygiene Promoters:'
              },
              {
                  'name': 'wash_pp_latrine',
                  'id': 405,
                  'parent': 404,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': 'wash_refugee_pop/(wash_communal_latrine+wash_hh_latrine)'
                  },
                  'validation': {
                      'minValue': 1
                  },
                  'label': ' Number of persons per latrine/toilet:'
              },
              {
                  'name': 'wash_per_hh_latrine',
                  'id': 406,
                  'parent': 405,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': '(wash_hh_latrine/wash_refugee_hh)*100'
                  },
                  'percent': 1,
                  'label': ' % HHs with household or shared-family latrine/toilet:'
              },
              {
                  'name': 'wash_pp_bath',
                  'id': 407,
                  'parent': 406,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': 'wash_refugee_pop/wash_showers'
                  },
                  'label': ' Number of persons per bathing shelter/shower: '
              },
              {
                  'name': 'wash_pp_promoter',
                  'id': 408,
                  'parent': 407,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': 'wash_refugee_pop/wash_promoters'
                  },
                  'label': ' Number of persons per hygiene promoter:  '
              }
          ]
      },
      {
          'id': 5,
          'parent': 1,
          'name': '',
          'label': 'Emergency',
          'visibility': {
              'condition': 'true'
          },
          'parentNode': 1,
          'nodeType': 3,
          'nodes': [
              {
                  'name': 'wash_em_water_volume',
                  'id': 501,
                  'parent': 5,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'label': 'Total volume of potable water produced daily [m3]:'
              },
              {
                  'name': 'wash_em_latrines',
                  'id': 502,
                  'parent': 501,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'label': 'Total number of latrine stances (communal and household):'
              },
              {
                  'name': 'wash_em_showers',
                  'id': 503,
                  'parent': 502,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 2,
                  'validation': {
                      'minValue': 1,
                      'conditions': [
                          {
                              'condition': '/^[+]?[0-9]+$/.test($value)',
                              'clientValidation': true,
                              'errorMessage': 'Only Integers allowed'
                          }
                      ]
                  },
                  'label': ' Total number of bathing shelter/shower stances:'
              },
              {
                  'name': 'wash_em_pot_water',
                  'id': 504,
                  'parent': 503,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': 'wash_em_water_volume/wash_refugee_pop*1000'
                  },
                  'label': 'Average number of litres of potable water produced per person per day'
              },
              {
                  'name': 'wash_em_pp_latrine',
                  'id': 505,
                  'parent': 504,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': 'wash_refugee_pop/wash_em_latrines'
                  },
                  'label': 'Number of persons per latrine/toilet'
              },
              {
                  'name': 'wash_em_pp_bath',
                  'id': 506,
                  'parent': 505,
                  'visibility': {
                      'condition': 'true'
                  },
                  'parentNode': 0,
                  'nodeType': 0,
                  'conditionalBranches': [
                      {
                          'condition': 'true'
                      }
                  ],
                  'fieldType': 6,
                  'formula': {
                      'formula': 'wash_refugee_pop/wash_em_showers'
                  },
                  'label': 'Number of persons per bathing shelter/shower'
              }
          ]
      }
  ]
};
