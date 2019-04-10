export const JSONSCHEMA = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://ajf.gnucoop.org/schemas/v1.json',

    'definitions': {
        'node': {
            '$id': '#node',
            'type': 'object',
            'required': [
                'nodeType',
                'label',
                'id',
                'name',
                'parent'
            ],
            'properties': {
                'nodeType': {
                    '$comment': '#node/properties/nodeType',
                    'type': 'integer',
                    'enum': [ 0, 1, 2, 3, 4]
                },
                'label': {
                    '$comment': '#node/properties/label',
                    'type': 'string',
                    'examples': [
                        'Information'
                    ]
                },
                'id': {
                    '$comment': '#node/properties/id',
                    'type': 'integer'
                },
                'parentNode': {
                    '$comment': '#node/properties/parentNode',
                    'type': 'integer'
                }, 
                'name': {
                    '$comment': '#node/properties/name',
                    'type': 'string',
                    'examples': [
                        'opd_info_group'
                    ]
                },
                'parent': {
                    '$comment': '#node/properties/parent',
                    'type': 'integer'
                },
                'visibility': {
                    '$comment': '#node/properties/visibility',
                    'type': 'object',
                    'required': [
                        'condition'
                    ],
                    'properties': {
                        'condition': {
                            '$comment': '#node/properties/visibility/properties/condition',
                            'type': 'string',
                            'examples': [
                                'true'
                            ]
                        }
                    }
                },
                'warning': {
                    'type': 'object',
                    'properties': {
                        'conditions': {
                            'type': 'array',
                            'items': {
                                'type': 'object',
                                'properties': {
                                    'condition': {
                                        'type': 'string'
                                    },
                                    'warningMessage': {
                                        'type': 'string'
                                    }
                                },
                                'required': ['condition', 'warningMessage'],
                                'additionalProperties': false
                            },
                            'minItems': 1
                        }
                    },
                    'additionalProperties': false
                }
            }
        },
        'containernode': {
            '$id': '#containernode',
            'allOf': [
                { '$ref' : '#node' },
                {
                    'type': 'object',
                    'properties': {
                        'nodeType': {
                            '$comment': '#node/properties/nodeType',
                            'type': 'integer',
                            'enum': [2, 3, 4]
                        },
                        'nodes': {
                            '$comment': '#containernode/properties/nodes',
                            'type': 'array',
                            'items': {
                                'oneOf': [
                                    {'$ref': '#fieldnode'},
                                    {'$ref': '#containernode'}
                                ]
                            }
                        }
                    },
                    'required': [ 'nodes' ]
                }
            ]
        },
        'fieldnode': {
            '$id': '#fieldnode',
            'allOf': [
                { '$ref': '#node' },
                {
                    'type': 'object',
                    'properties': {
                        'nodeType': {
                            '$comment': '#node/properties/nodeType',
                            'type': 'integer',
                            'enum': [0, 1]
                        },
                        'conditionalBranches': {
                            '$comment': '#fieldnode/properties/conditionalBranches',
                            'type': 'array',
                            'items': {
                                '$comment': '#fieldnode/properties/conditionalBranches/items',
                                'type': 'object',
                                'required': [
                                    'condition'
                                ],
                                'properties': {
                                    'condition': {
                                        '$comment': '#fieldnode/properties/conditionalBranches/items/properties/condition',
                                        'type': 'string',
                                        
                                        'examples': [
                                            'true'
                                        ]
                                    },
                                    'conditions': {'$ref': '#conditions' }
                                },
                                'additionalProperties': false
                            }
                        },
                        'choicesOriginRef': {
                            '$comment': '#fieldnode/properties/choicesOriginRef',
                            'type': 'string',
                            'examples': [
                                'opd_patient_status'
                            ]
                        },
                        'validation': {
                            '$comment': '#fieldnode/properties/validation',
                            'type': 'object',
                            'properties': {
                                'notEmpty': {
                                    '$comment': '#fieldnode/properties/validation/properties/notEmpty',
                                    'type': 'boolean'
                                },
                                'maxValue': {
                                    'type': 'number'
                                },
                                'minValue': {
                                    'type': 'number'
                                },
                                'maxDigits': {
                                    'type': 'integer',
                                    'minimum': 1
                                },
                                'minDigits': {
                                    'type': 'integer',
                                    'minimum': 1
                                },
                                'conditions': {'$ref': '#conditions'}
                            },
                            'required': [],
                            'additionalProperties': false
                        },
                        'fieldType': {
                            '$comment': '#fieldnode/properties/fieldType',
                            'type': 'integer',
                            'enum': [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
                        },
                        'hasChoices': {
                            '$comment': '#fieldnode/properties/hasChoices',
                            'type': 'boolean'
                        },
                        'formula': {
                            'type': 'object',
                            'properties': {
                                'formula': {
                                    'type': 'string'
                                }
                            }
                        }
                    },
                    'required': [
                        'fieldType'
                    ]
                }
            ]
        },
        'conditions': {
            '$id': '#conditions',
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'condition': {
                        'type': 'string'
                    },
                    'errorMessage': {
                        'type': 'string'
                    },
                    'clientValidation': {
                        'type': 'boolean'
                    }
                },
                'required': ['condition', 'errorMessage'],
                'additionalProperties': false
            },
            'minItems': 1
        }
    },
    
    'type': 'object',

    'required': [
        'nodes'
    ],

    'properties': {
        'stringIdentifier': {
            '$comment': '#/properties/stringIdentifier',
            'type': 'array',
            'items': {
                '$comment': '#/properties/stringIdentifier/items',
                'type': 'object',
                'required': [
                    'value',
                    'label'
                ],
                'properties': {
                    'value': {
                        '$comment': '#/properties/stringIdentifier/items/properties/value',
                        'type': 'array',
                        'items': {
                            '$comment': '#/properties/stringIdentifier/items/properties/value/items',
                            'type': 'string',  
                            'examples': [
                                'opd_age_group'
                            ]
                        }
                    },
                    'label': {
                        '$comment': '#/properties/stringIdentifier/items/properties/label',
                        'type': 'string',                 
                        'examples': [
                            'Age'
                        ]
                    }
                }
            },
            'additionalProperties': false
        },
        'choicesOrigins': {
            '$comment': '#/properties/choicesOrigins',
            'type': 'array',
            'items': {
                '$comment': '#/properties/choicesOrigins/items',
                'type': 'object',
                'properties': {
                    'choices': {
                        '$comment': '#/properties/choicesOrigins/items/properties/choices',
                        'type': 'array',
                        'items': {
                            '$comment': '#/properties/choicesOrigins/items/properties/choices/items',
                            'type': 'object',
                            'required': [
                                'value',
                                'label'
                            ],
                            'properties': {
                                'value': {
                                    '$comment': '#/properties/choicesOrigins/items/properties/choices/items/properties/value',
                                    'type': 'string',
                                    
                                    'examples': [
                                        'Acetylsalicylic acid (ASA)=Aspirin'
                                    ]
                                },
                                'label': {
                                    '$comment': '#/properties/choicesOrigins/items/properties/choices/items/properties/label',
                                    'type': 'string',
                                    
                                    'examples': [
                                        'Acetylsalicylic acid (ASA)=Aspirin'
                                    ]
                                }
                            }
                        },
                        'minItems': 1
                    },
                    'label': {
                        '$comment': '#/properties/choicesOrigins/items/properties/label',
                        'type': 'string',
                        
                        'examples': [
                            'Generic Drug Name'
                        ]
                    },
                    'name': {
                        '$comment': '#/properties/choicesOrigins/items/properties/name',
                        'type': 'string',
                        
                        'examples': [
                            'opd_inn_name'
                        ]
                    },
                    'choicesType': {
                        '$comment': '#/properties/choicesOrigins/items/properties/choicesType',
                        'type': 'string',
                        
                        'examples': [
                            'string'
                        ]
                    },
                    'type': {
                        '$comment': '#/properties/choicesOrigins/items/properties/type',
                        'type': 'string',
                        'const': 'fixed'
                    }
                },
                'required': [
                    'choices',
                    'name',
                    'type'
                ],
                'additionalProperties': false
            }
        },
        'nodes': {
            '$comment': '#/properties/nodes',
            'type': 'array',
            'items':{ '$ref': '#containernode' }
        },
        'attachmentsOrigins': {
            '$comment': '#/properties/attachmentsOrigins',
            'type': 'array',
            'items': {
                '$comment': '#/properties/attachmentsOrigins/items',
                'type': 'object',
                'required': [
                    'attachments',
                    'name',
                    'type'
                ],
                'properties': {
                    'attachments': {
                        '$comment': '#/properties/attachmentsOrigins/items/properties/attachments',
                        'type': 'array',
                        'items': {
                            '$comment': '#/properties/attachmentsOrigins/items/properties/attachments/items',
                            'type': 'object',
                            'required': [
                                'value',
                                'label',
                                'type'
                            ],
                            'properties': {
                                'value': {
                                    '$comment': '#/properties/attachmentsOrigins/items/properties/attachments/items/properties/value',
                                    'type': 'string',
                                    
                                    'examples': [
                                        'https://drive.google.com/drive/u/0/folders/0BwOelqY6iF-bMm1TU2pzUzMwenM'
                                    ]
                                },
                                'label': {
                                    '$comment': '#/properties/attachmentsOrigins/items/properties/attachments/items/properties/label',
                                    'type': 'string',
                                    
                                    'examples': [
                                        'Clinical Protocol Google DOC'
                                    ]
                                },
                                'type': {
                                    '$comment': '#/properties/attachmentsOrigins/items/properties/attachments/items/properties/type',
                                    'type': 'integer',
                                    'default': 0
                                }
                            }
                        }
                    },
                    'name': {
                        '$comment': '#/properties/attachmentsOrigins/items/properties/name',
                        'type': 'string',
                        
                        'examples': [
                            'opd_clin_prot'
                        ]
                    },
                    'type': {
                        '$comment': '#/properties/attachmentsOrigins/items/properties/type',
                        'type': 'string',
                        
                        'examples': [
                            'fixed'
                        ]
                    }
                }
            }
        }
    },
    'additionalProperties': false
}