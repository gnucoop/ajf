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

export const formSchema = {
    "stringIdentifier": [{
        "value": [
            "sex"
        ],
        "label": "Gender"
    }],
    "choicesOrigins": [{
            "type": "fixed",
            "choicesType": "string",
            "name": "SEX",
            "choices": [{
                    "label": "Male",
                    "value": "Male"
                },
                {
                    "label": "Female",
                    "value": "Female"
                }
            ]
        },
        {
            "name": "DISTRICT_NAMES",
            "type": "fixed",
            "choices": [{
                    "value": "quelimane",
                    "label": "Quelimane"
                },
                {
                    "value": "nicoadala",
                    "label": "Nicoadala"
                },
                {
                    "value": "namacurra",
                    "label": "Namacurra"
                }
            ]
        },
        {
            "name": "QUELIMANE_COMMUNITY",
            "type": "fixed",
            "choices": [{
                    "value": "eduba",
                    "label": "Eduba"
                },
                {
                    "value": "mazuere",
                    "label": "Mazuere"
                },
                {
                    "value": "navilembo",
                    "label": "Navilembo"
                },
                {
                    "value": "mucor",
                    "label": "Mucor"
                },
                {
                    "value": "nangoela",
                    "label": "Nangoela"
                },
                {
                    "value": "sareva",
                    "label": "Sareva"
                }

            ]
        },
        {
            "name": "NICOADALA_COMMUNITY",
            "type": "fixed",
            "choices": [{
                    "value": "curungu",
                    "label": "Curungu"
                },
                {
                    "value": "25 de jnho",
                    "label": "25 de jnho"
                }, {
                    "value": "supinho",
                    "label": "Supinho"
                },
                {
                    "value": "maningue",
                    "label": "Maningue"
                },
                {
                    "value": "mariebe",
                    "label": "Mariebe"
                },
                {
                    "value": "mucelo-Novo",
                    "label": "Mucelo-Novo"
                }
            ]
        },
        {
            "name":"NAMACURRA_COMMUNITY",
            "type":"fixed",
            "choices":[
                {
                    "value": "cocodane",
                    "label": "Cocodane"
                },
                {
                    "value": "mutange",
                    "label": "Mutange"
                },
                {
                    "value": "muebele",
                    "label": "Muebele"
                },
                {
                    "value": "pida",
                    "label": "Pida"
                },
                {
                    "value": "mixixine",
                    "label": "Mixixine"
                },
                {
                    "value": "furquia",
                    "label": "Furquia"
                }
            ]
        },
        {
            "type": "fixed",
            "choicesType": "string",
            "name": "ECONOMIC_ACTIVITY",
            "choices": [{
                    "label": "Farmer",
                    "value": "farmer"
                },
                {
                    "label": "Trader",
                    "value": "trader"
                },
                {
                    "label": "Fisherman",
                    "value": "fisherman"
                },
                {
                    "label": "Other(specificy)",
                    "value": "other"
                }
            ]
        },
        {
            "type": "fixed",
            "choicesType": "string",
            "name": "PARTITION_500_FROM_0_OVER_2500",
            "choices": [{
                "label": "0-500",
                "value": "0-500"
            }, {
                "label": "501-1000",
                "value": "501-1000"
            }, {
                "label": "1001-1500",
                "value": "1001-1500"
            }, {
                "label": "1501-2000",
                "value": "1501-2000"
            }, {
                "label": "2001-2500",
                "value": "2001-2500"
            }, {
                "label": ">2500",
                "value": ">2500"
            }]
        },
        {
            "type": "fixed",
            "choicesType": "string",
            "name": "PARTITION_200_FROM_0_TO_2500",
            "choices": [{
                "label": "0-200",
                "value": "0-200"
            }, {
                "label": "201-500",
                "value": "201-500"
            }, {
                "label": "501-1000",
                "value": "501-1000"
            }, {
                "label": "1001-1500",
                "value": "1001-1500"
            }, {
                "label": "1501-2000",
                "value": "1501-2000"
            }, {
                "label": "2001-2500",
                "value": "2001-2500"
            }]
        }, {
            "type": "fixed",
            "choicesType": "string",
            "name": "PARTITION_200_FROM_0_OVER_10000",
            "choices": [{
                "label": "0-200",
                "value": "0-200"
            }, {
                "label": "201-500",
                "value": "201-500"
            }, {
                "label": "501-1000",
                "value": "501-1000"
            }, {
                "label": "1001-1500",
                "value": "1001-1500"
            }, {
                "label": "1501-2000",
                "value": "1501-2000"
            }, {
                "label": "2001-5000",
                "value": "2001-5000"
            }, {
                "label": "5001-10000",
                "value": "5001-10000"
            }, {
                "label": "> 10000",
                "value": "> 10000"
            }]
        }, {
            "type": "fixed",
            "choicesType": "string",
            "name": "PARTITION_50_FROM_0_TO_300",
            "choices": [{
                "label": "0-50",
                "value": "0-50"
            }, {
                "label": "51-100",
                "value": "51-100"
            }, {
                "label": "101-150",
                "value": "101-150"
            }, {
                "label": "151-200",
                "value": "151-200"
            }, {
                "label": "201-250",
                "value": "201-250"
            }, {
                "label": "251-300",
                "value": "251-300"
            }, {
                "label": "*300",
                "value": "*300"
            }]
        }, {
            "name": "PARTITION_3_FROM_1_TO_12",
            "type": "fixed",
            "choices": [{
                "label": "from 1 to 3",
                "value": "from_1_to_3"
            }, {
                "label": "from 4 to 6",
                "value": "from_4_to_6"
            }, {
                "label": "from 7 to 9",
                "value": "from_7_to_9"
            }, {
                "label": "from 10 to 12",
                "value": "from_10_to_12"
            }]
        },
        {
            "type": "fixed",
            "choicesType": "string",
            "name": "NUMBER_FROM_1_TO_4",
            "choices": [{
                "label": "1",
                "value": "1"
            }, {
                "label": "2",
                "value": "2"
            }, {
                "label": "3",
                "value": "3"
            }, {
                "label": "4",
                "value": "4"
            }]
        }, {
            "type": "fixed",
            "choicesType": "string",
            "name": "YES_NO",
            "choices": [{
                "label": "Yes",
                "value": "yes"
            }, {
                "label": "No",
                "value": "no"
            }]
        }, {
            "type": "fixed",
            "choicesType": "string",
            "name": "FERTILIZER_PURCHASED_OR_SELF_PRODUCED",
            "choices": [{
                "label": "Purchased",
                "value": "purchased"
            }, {
                "label": "Self-produced fertilizer",
                "value": "Self-produced_fertilizer"
            }]
        }, {
            "type": "fixed",
            "choicesType": "string",
            "name": "PESTICIDIES_PURCHASED_OR_SELF_PRODUCED",
            "choices": [{
                "label": "Purchased",
                "value": "purchased"
            }, {
                "label": "Self-produced pesticides",
                "value": "Self-produced_pesticides"
            }]
        }, {
            "name": "ORGANIC_OR_NOT",
            "type": "fixed",
            "choices": [{
                    "value": "organic",
                    "label": "Organic"
                },
                {
                    "value": "non-organic",
                    "label": "Non-organic"
                }
            ]
        }, {
            "name": "METHOD_OF_CONTROL",
            "type": "fixed",
            "choices": [{
                    "value": "cultural",
                    "label": "Cultural"
                },
                {
                    "value": "biological",
                    "label": "Biological"
                },
                {
                    "value": "mechanical",
                    "label": "Mechanical"
                },
                {
                    "value": "integrated",
                    "label": "Integrated"
                },
                {
                    "value": "other",
                    "label": "Other"
                }
            ]
        }, {
            "name": "PRODUCTION_SHARE",
            "type": "fixed",
            "choices": [{
                    "value": "good_growth",
                    "label": "Good growth"
                },
                {
                    "value": "low_growth",
                    "label": "Low growth"
                },
                {
                    "value": "medium_growth",
                    "label": "Medium growth"
                },
                {
                    "value": "attack_of_curses",
                    "label": "Attack of curses"
                },
                {
                    "value": "excessive_heatstroke",
                    "label": "Excessive heatstroke"
                },
                {
                    "value": "flood",
                    "label": "Flood"
                },
                {
                    "value": "uncontrolled_burning",
                    "label": "Uncontrolled burning"
                }
            ]
        }, {
            "name": "PRODUCTION_PERCENTAGE",
            "type": "fixed",
            "choices": [{
                    "value": "0",
                    "label": "0%"
                },
                {
                    "value": "20",
                    "label": "20%"
                },
                {
                    "value": "40",
                    "label": "40%"
                },
                {
                    "value": "60",
                    "label": "60%"
                },
                {
                    "value": "80",
                    "label": "80%"
                }
            ]
        },
        {
            "name": "MANAGES_TRANSPORT",
            "type": "fixed",
            "choices": [{
                "value": "beneficiary_household_level",
                "label": "Beneficiary (household level)"
            }, {
                "value": "community_member",
                "label": "Community member"
            }, {
                "value": "external_operator",
                "label": "External operator"
            }]
        }, {
            "name": "VALUE_CHAIN",
            "type": "fixed",
            "choices": [{
                "value": "weak",
                "label": "Weak"
            }, {
                "value": "intermediate",
                "label": "Intermediate"
            }, {
                "value": "strong",
                "label": "Strong"
            }]
        }, {
            "name": "MARKETING_PRODUCTS_OSTACLES",
            "type": "fixed",
            "choices": [{
                "value": "storage",
                "label": "Storage"
            }, {
                "value": "transport_to_markets",
                "label": "Transport to markets"
            }, {
                "value": "lack_of_information_on_market_prices",
                "label": "Lack of information on market prices"
            }, {
                "value": "bargaining_with_intermediaries",
                "label": "Bargaining with intermediaries"
            }, {
                "value": "lack_of_direct_contacts_with_retailers",
                "label": "Lack of direct contacts with retailers"
            }, {
                "value": "access_to_credit",
                "label": "Access to Credit"
            }]
        },
        {
            "name": "AGRICULTURAL_PRACTICES",
            "type": "fixed",
            "choices": [{
                "label": "Agriculture Syntropical/Sustainable",
                "value": "agriculture_syntropical_Sustainable"
            }, {
                "label": "Conservation agriculture",
                "value": "conservation_agriculture"
            }, {
                "label": "Traditional agriculture",
                "value": "traditional_agriculture"
            }, {
                "label": "other",
                "value": "Other (specify)"
            }]
        },
        {
            "name": "APPLICATION_VALUE",
            "type": "fixed",
            "choices": [{
                    "label": "Domestic utensils",
                    "value": "domestic_utensils"
                }, {
                    "label": "Seeds",
                    "value": "seeds"
                }, {
                    "label": "School supplies",
                    "value": "school_supplies"
                }, {
                    "label": "Labor payment in the field",
                    "value": "labor_payment_in_the_field"
                }, {
                    "label": "Domestic applicances",
                    "value": "domestic_applicances"
                }, {
                    "label": "Agricultural inputs",
                    "value": "agricultural_inputs"
                }, {
                    "label": "other",
                    "value": "Other (specify)"
                }]
        },
        {
            "name": "OBSTACLES",
            "type": "fixed",
            "choices": [{
                    "label": "Water availability",
                    "value": "water_availability"
                }, {
                    "label": "Seeds availability",
                    "value": "seeds_availability"
                }, {
                    "label": "School supplies",
                    "value": "school_supplies"
                }, {
                    "label": "Seeds quality",
                    "value": "seeds_quality"
                }, {
                    "label": "Fertilizers availability",
                    "value": "fertilizers_availability"
                }, {
                    "label": "Extension of cultivated land",
                    "value": "extension_of_cultivated_land"
                }, {
                    "label": "Credit",
                    "value": "credit"
                }, {
                    "label": "Technologies",
                    "value": "technologies"
                }, {
                    "label": "other",
                    "value": "Other (specify)"
                }]
        }
    ],
    "nodes": [{
        "id": 1,
        "parent": 0,
        "label": "BENEFICIARY",
        "name": "_1",
        "nodeType": 3,
        "nodes": [{
                "fieldType": 2,
                "parent": 1,
                "id": 100,
                "label": "Number of the Beneficiary",
                "name": "1_100",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {},
                "conditionalBranches": [{
                    "condition": "true"
                }]
            }, {
                "id": 101,
                "parent": 100,
                "label": "Name",
                "name": "1_101",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                },
                "conditionalBranches": [{
                    "condition": "true"
                }],
                "fieldType": 0
            }, {
                "id": 102,
                "parent": 101,
                "label": "Surname",
                "name": "1_102",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                },
                "conditionalBranches": [{
                    "condition": "true"
                }],
                "fieldType": 0
            },
            {
                "id": 103,
                "parent": 102,
                "label": "Sex",
                "name": "1_103",
                "choicesOriginRef": "SEX",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                },
                "conditionalBranches": [{
                    "condition": "true"
                }],
                "fieldType": 4
            }, {
                "id": 104,
                "parent": 103,
                "fieldType": 4,
                "label": "Name of the District",
                "name": "_1_104",
                "choicesOriginRef": "DISTRICT_NAMES",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 105,
                "parent": 104,
                "fieldType": 5,
                "label": "From Which community?",
                "name": "1_105",
                "choicesOriginRef": "QUELIMANE_COMMUNITY",
                "visibility": {
                    "condition": "_1_104 === 'quelimane'"
                },
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 106,
                "parent": 105,
                "fieldType": 5,
                "label": "From Which community?",
                "name": "1_106",
                "choicesOriginRef": "NICOADALA_COMMUNITY",
                "visibility": {
                    "condition": "_1_104 === 'nicoadala'"
                },
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 107,
                "parent": 106,
                "fieldType": 5,
                "label": "From Which community?",
                "name": "1_107",
                "choicesOriginRef": "NAMACURRA_COMMUNITY",
                "visibility": {
                    "condition": "_1_104 === 'namacurra'"
                },
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }
        ]
    }, {
        "id": 2,
        "parent": 1,
        "label": "ECONOMIC INDICATORS",
        "name": "_2",
        "nodeType": 3,
        "nodes": [{
                "id": 200,
                "parent": 2,
                "fieldType": 4,
                "label": "Economic Activity",
                "name": "_2_200",
                "choicesOriginRef": "ECONOMIC_ACTIVITY",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 201,
                "parent": 200,
                "fieldType": 0,
                "label": "Other (specificy)",
                "name": "_2_201",
                "visibility": {
                    "condition": "_2_200 == 'other'"
                },
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 202,
                "parent": 201,
                "fieldType": 4,
                "label": "Total monthly income (Meticais) - income received by each household member",
                "name": "_2_202",
                "choicesOriginRef": "PARTITION_500_FROM_0_OVER_2500",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 203,
                "parent": 202,
                "fieldType": 2,
                "label": "Total monthly income from agricultural activity (Meticais)",
                "visibility": {
                    "condition": "_2_200 == 'farmer'"
                },
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 204,
                "parent": 203,
                "fieldType": 4,
                "label": "Total monthly expenditures (Meticais) food, clothing, housing (rent), energy, transport, durable goods, health costs, leisure, and miscellaneous services",
                "name": "_2_204",
                "choicesOriginRef": "PARTITION_200_FROM_0_TO_2500",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 205,
                "parent": 204,
                "fieldType": 2,
                "label": "Number of Family Members",
                "name": "_2_205",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }
        ]
    }, {
        "id": 3,
        "parent": 2,
        "nodeType": 4,
        "label": "FOOD SECURITY INDICATORS -> To be filled for each Family Member",
        "name": "_3",
        "maxReps": 10,
        "parentNode": 0,
        "nodes": [{
            "id": 300,
            "parent": 3,
            "fieldType": 9,
            "name": "_3_300",
            "label": "Date of birth",
            "hasChoices": true,
            "nodeType": 0,
            "validation": {
                "notEmpty": true
            },
            "conditionalBranches": [{
                "condition": "true"
            }]
        }, {
            "id": 301,
            "parent": 300,
            "fieldType": 4,
            "label": "Number of meals consumed per day",
            "name": "_3_301",
            "choicesOriginRef": "NUMBER_FROM_1_TO_4",
            "hasChoices": true,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true
            }
        }, {
            "id": 302,
            "parent": 301,
            "fieldType": 4,
            "label": "Number of fruit and vegetables consumed per day",
            "name": "_3_302",
            "choicesOriginRef": "NUMBER_FROM_1_TO_4",
            "hasChoices": true,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true
            }
        }, {
            "id": 303,
            "parent": 302,
            "fieldType": 0,
            "label": "More (specificy)",
            "name": "_3_303",
            "visibility": {
                "condition": "_3_302 == 'more'"
            },
            "validation": {
                "notEmpty": true
            },
            "hasChoices": true,
            "parentNode": 0,
            "nodeType": 0
        }, {
            "id": 304,
            "parent": 303,
            "fieldType": 7,
            "HTML": "<h1>How many times per day do you consume the following foods in this period?</h1>",
            "name": "_3_304",
            "nodeType": 0
        }, {
            "id": 305,
            "parent": 304,
            "fieldType": 7,
            "HTML": "<h2>Protein:</h2>",
            "nodeType": 0
        }, {
            "id": 306,
            "parent": 305,
            "fieldType": 2,
            "label": "Meat (goat, cow, chicken, fish)",
            "name": "_3_306",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_306 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Meat cannot be negative"
                    },
                    {
                        "condition": "_3_306 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Meat count must be < 6"
                    }
                ]
            }
        }, {
            "id": 307,
            "parent": 306,
            "fieldType": 2,
            "label": "Legumes",
            "name": "_3_307",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_307 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Legumes cannot be negative"
                    },
                    {
                        "condition": "_3_307 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Legumes count must be < 6"
                    }
                ]
            }
        }, {
            "id": 308,
            "parent": 307,
            "fieldType": 7,
            "HTML": "<h2>Vitamins:</h2>",
            "nodeType": 0
        }, {
            "id": 309,
            "parent": 308,
            "fieldType": 2,
            "label": "Fruits",
            "name": "_3_309",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_309 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Fruits cannot be negative"
                    },
                    {
                        "condition": "_3_309 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Fruits count must be < 6"
                    }
                ]
            }
        }, {
            "id": 310,
            "parent": 309,
            "fieldType": 2,
            "label": "Vegetables",
            "name": "_3_310",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_310 >= 0",
                        "clientValidation": true,
                        "errorMessage": "vegetables cannot be negative"
                    },
                    {
                        "condition": "_3_310 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Vegetables count must be < 6"
                    }
                ]
            }
        }, {
            "id": 311,
            "parent": 310,
            "fieldType": 7,
            "HTML": "<h2>Carbohydrates:</h2>",
            "nodeType": 0
        }, {
            "id": 312,
            "parent": 311,
            "fieldType": 2,
            "label": "Rice",
            "name": "_3_312",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_312 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Rice cannot be negative"
                    },
                    {
                        "condition": "_3_312 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Rice count must be < 6"
                    }
                ]
            }
        }, {
            "id": 313,
            "parent": 312,
            "fieldType": 2,
            "label": "Manioc",
            "name": "_3_313",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "diversity_periodically_manioc >= 0",
                        "clientValidation": true,
                        "errorMessage": "Manioc cannot be negative"
                    },
                    {
                        "condition": "diversity_periodically_manioc <= 6",
                        "clientValidation": true,
                        "errorMessage": "Manioc count must be < 6"
                    }
                ]
            }
        }, {
            "id": 314,
            "parent": 313,
            "fieldType": 2,
            "label": "Corn",
            "name": "_3_314",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_314 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Corn cannot be negative"
                    },
                    {
                        "condition": "_3_314 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Corn count must be < 6"
                    }
                ]
            }
        }, {
            "id": 315,
            "parent": 314,
            "fieldType": 2,
            "label": "Potatoes, Yam, Tubers",
            "name": "_3_315",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_315 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Potatoes, Yam, Tubers cannot be negative"
                    },
                    {
                        "condition": "_3_315 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Potatoes, Yam, Tubers counts must be < 6"
                    }
                ]
            }
        }, {
            "id": 316,
            "parent": 315,
            "fieldType": 2,
            "label": "Sorghum, Mapira",
            "name": "_3_316",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_316 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Sorghum, Mapira cannot be negative"
                    },
                    {
                        "condition": "_3_316 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Sorghum, Mapira counts must be < 6"
                    }
                ]
            }
        }, {
            "id": 317,
            "parent": 316,
            "label": "Other (specify)",
            "name": "_3_317",
            "hasChoices": true,
            "nodeType": 0,
            "fieldType": 0
        }, {
            "id": 318,
            "parent": 317,
            "fieldType": 2,
            "name": "_3_318",
            "label": "Count",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "visibility": {
                "condition": "diversity_periodically_name"
            },
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_318 >= 0",
                        "clientValidation": true,
                        "errorMessage": "cannot be negative"
                    },
                    {
                        "condition": "_3_318 <= 6",
                        "clientValidation": true,
                        "errorMessage": "counts must be < 6"
                    }
                ]
            }
        }, {
            "id": 319,
            "parent": 318,
            "fieldType": 7,
            "HTML": "<h1>How many of the following foods have you consumed in the last 24hours?</h1>",
            "name": "_3_319",
            "nodeType": 0
        }, {
            "id": 320,
            "parent": 319,
            "fieldType": 7,
            "HTML": "<h2>Protein:</h2>",
            "nodeType": 0
        }, {
            "id": 321,
            "parent": 320,
            "fieldType": 2,
            "label": "Meat (goat, cow, chicken, fish)",
            "name": "_3_321",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_321 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Meat cannot be negative"
                    },
                    {
                        "condition": "_3_321 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Meat count must be < 6"
                    }
                ]
            }
        }, {
            "id": 322,
            "parent": 321,
            "fieldType": 2,
            "label": "Legumes",
            "name": "_3_322",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_322 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Legumes cannot be negative"
                    },
                    {
                        "condition": "_3_322 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Legumes count must be < 6"
                    }
                ]
            }
        }, {
            "id": 323,
            "parent": 322,
            "fieldType": 7,
            "HTML": "<h2>Vitamins:</h2>",
            "nodeType": 0
        }, {
            "id": 324,
            "parent": 323,
            "fieldType": 2,
            "label": "Fruits",
            "name": "_3_324",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_324 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Fruits cannot be negative"
                    },
                    {
                        "condition": "_3_324 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Fruits count must be < 6"
                    }
                ]
            }
        }, {
            "id": 325,
            "parent": 324,
            "fieldType": 2,
            "label": "Vegetables",
            "name": "_3_325",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_325 >= 0",
                        "clientValidation": true,
                        "errorMessage": "vegetables cannot be negative"
                    },
                    {
                        "condition": "_3_325 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Vegetables count must be < 6"
                    }
                ]
            }
        }, {
            "id": 326,
            "parent": 325,
            "fieldType": 7,
            "HTML": "<h2>Carbohydrates:</h2>",
            "nodeType": 0
        }, {
            "id": 327,
            "parent": 326,
            "fieldType": 2,
            "label": "Rice",
            "name": "_3_327",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_327 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Rice cannot be negative"
                    },
                    {
                        "condition": "_3_327 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Rice count must be < 6"
                    }
                ]
            }
        }, {
            "id": 328,
            "parent": 327,
            "fieldType": 2,
            "label": "Manioc",
            "name": "_3_328",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_328 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Manioc cannot be negative"
                    },
                    {
                        "condition": "_3_328 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Manioc count must be < 6"
                    }
                ]
            }
        }, {
            "id": 329,
            "parent": 328,
            "fieldType": 2,
            "label": "Corn",
            "name": "_3_329",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_329 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Corn cannot be negative"
                    },
                    {
                        "condition": "_3_329 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Corn count must be < 6"
                    }
                ]
            }
        }, {
            "id": 330,
            "parent": 329,
            "fieldType": 2,
            "label": "Potatoes, Yam, Tubers",
            "name": "_3_330",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_330 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Potatoes, Yam, Tubers cannot be negative"
                    },
                    {
                        "condition": "_3_330 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Potatoes, Yam, Tubers counts must be < 6"
                    }
                ]
            }
        }, {
            "id": 331,
            "parent": 330,
            "fieldType": 2,
            "label": "Sorghum, Mapira",
            "name": "_3_331",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_331 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Sorghum, Mapira cannot be negative"
                    },
                    {
                        "condition": "_3_331 <= 6",
                        "clientValidation": true,
                        "errorMessage": "Sorghum, Mapira counts must be < 6"
                    }
                ]
            }
        }, {
            "id": 332,
            "parent": 331,
            "label": "Other (specify)",
            "name": "_3_332",
            "hasChoices": true,
            "nodeType": 0,
            "fieldType": 0
        }, {
            "id": 333,
            "parent": 332,
            "fieldType": 2,
            "name": "_3_333",
            "label": "Count",
            "size": "small",
            "hasChoices": false,
            "parentNode": 0,
            "nodeType": 0,
            "visibility": {
                "condition": "_3_332"
            },
            "validation": {
                "notEmpty": true,
                "maxValue": 6,
                "conditions": [{
                        "condition": "_3_333 >= 0",
                        "clientValidation": true,
                        "errorMessage": "cannot be negative"
                    },
                    {
                        "condition": "_3_333 <= 6",
                        "clientValidation": true,
                        "errorMessage": "counts must be < 6"
                    }
                ]
            }
        }]
    }, {
        "id": 4,
        "parent": 3,
        "label": "FOOD SECURITY INDICATORS",
        "name": "_4",
        "nodeType": 3,
        "nodes": [{
                "id": 400,
                "parent": 4,
                "fieldType": 4,
                "label": "Do you believe that your diet, and that your family members, are adequate for proper physical development and good health?",
                "name": "_4_400",
                "choicesOriginRef": "YES_NO",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 401,
                "parent": 400,
                "fieldType": 1,
                "name": "_4_401",
                "label": "List main weaknessess",
                "validation": {
                    "notEmpty": true
                },
                "visibility": {
                    "condition": "_4_400 == 'no'"
                },
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 402,
                "parent": 401,
                "fieldType": 4,
                "label": "Overall area of production (m2/6 month)",
                "name": "_4_402",
                "choicesOriginRef": "PARTITION_200_FROM_0_OVER_10000",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 403,
                "parent": 402,
                "fieldType": 5,
                "nodeType": 0,
                "name": "_4_403",
                "label": "Agricultural practice (individual fields)",
                "choicesOriginRef": "AGRICULTURAL_PRACTICES",
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 404,
                "parent": 403,
                "fieldType": 0,
                "nodeType": 0,
                "name": "_4_404",
                "visibility": {
                    "condition": "valueInChoice(_4_403, 'other')"
                },
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 405,
                "parent": 404,
                "fieldType": 4,
                "nodeType": 0,
                "name": "_4_405",
                "label": "Overall Food Production (KG/month)",
                "choicesOriginRef": "PARTITION_50_FROM_0_TO_300",
                "validation": {
                    "notEmpty": true
                }
            }
        ]
    }, {
        "id": 5,
        "parent": 4,
        "label": "RESULT 1 - INDICATORS",
        "name": "_5",
        "nodeType": 3,
        "nodes": [{
                "id": 500,
                "parent": 5,
                "fieldType": 3,
                "name": "_5_500",
                "hasChoices": false,
                "label": "Rice",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 501,
                "parent": 500,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_501",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_500 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_501 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 502,
                "parent": 501,
                "fieldType": 3,
                "name": "_5_502",
                "hasChoices": false,
                "label": "Corn",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 503,
                "parent": 502,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_503",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_502 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_503 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 504,
                "parent": 503,
                "fieldType": 3,
                "name": "_5_504",
                "hasChoices": false,
                "label": "Cassava",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 505,
                "parent": 504,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_505",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_504 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_505 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            },
            {
                "id": 506,
                "parent": 505,
                "fieldType": 3,
                "name": "_5_506",
                "hasChoices": false,
                "label": "Sweet Potato",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 507,
                "parent": 506,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_507",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_506 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_507 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 508,
                "parent": 507,
                "fieldType": 3,
                "name": "_5_508",
                "hasChoices": false,
                "label": "Ihame",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 509,
                "parent": 508,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_509",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_508 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_509 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 510,
                "parent": 509,
                "fieldType": 3,
                "name": "_5_510",
                "hasChoices": false,
                "label": "Salad",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 511,
                "parent": 510,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_511",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_510 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_511 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 512,
                "parent": 511,
                "fieldType": 3,
                "name": "_5_512",
                "hasChoices": false,
                "label": "Onion",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 513,
                "parent": 512,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_513",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_512 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_513 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 514,
                "parent": 513,
                "fieldType": 3,
                "name": "_5_514",
                "hasChoices": false,
                "label": "Cabbage",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 515,
                "parent": 514,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_515",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_514 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_515 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 516,
                "parent": 515,
                "fieldType": 3,
                "name": "_5_516",
                "hasChoices": false,
                "label": "Cucumber",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 517,
                "parent": 516,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_517",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_516 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_517 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 518,
                "parent": 517,
                "fieldType": 3,
                "name": "_5_518",
                "hasChoices": false,
                "label": "Orange",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 519,
                "parent": 518,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_519",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_518 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_519 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 520,
                "parent": 519,
                "fieldType": 3,
                "name": "_5_520",
                "hasChoices": false,
                "label": "Pineapple",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 521,
                "parent": 520,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_521",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_520 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_521 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 522,
                "parent": 521,
                "fieldType": 3,
                "name": "_5_522",
                "hasChoices": false,
                "label": "Peanut",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 523,
                "parent": 522,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_523",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_522 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_523 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 524,
                "parent": 523,
                "fieldType": 3,
                "name": "_5_524",
                "hasChoices": false,
                "label": "Sesame",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 525,
                "parent": 524,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_525",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_524 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_525 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 526,
                "parent": 525,
                "fieldType": 3,
                "name": "_5_526",
                "hasChoices": false,
                "label": "Pepper",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 527,
                "parent": 526,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_527",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_526 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_527 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 528,
                "parent": 527,
                "fieldType": 3,
                "name": "_5_528",
                "hasChoices": false,
                "label": "Beans",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 529,
                "parent": 528,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_529",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_528 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_529 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 530,
                "parent": 529,
                "fieldType": 3,
                "name": "_5_530",
                "hasChoices": false,
                "label": "Beet",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 531,
                "parent": 530,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_531",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_530 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_531 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 532,
                "parent": 531,
                "fieldType": 3,
                "name": "_5_532",
                "hasChoices": false,
                "label": "Cashew Nut",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 533,
                "parent": 532,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_533",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_532 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_533 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 534,
                "parent": 533,
                "fieldType": 3,
                "name": "_5_534",
                "hasChoices": false,
                "label": "Carrot",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 535,
                "parent": 534,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_535",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_534 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_535 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 536,
                "parent": 535,
                "fieldType": 3,
                "name": "_5_536",
                "hasChoices": false,
                "label": "Okra",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 537,
                "parent": 536,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_537",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_536 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_537 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 538,
                "parent": 537,
                "fieldType": 3,
                "name": "_5_538",
                "hasChoices": false,
                "label": "Eggplant",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 539,
                "parent": 538,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_539",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_538 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_539 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 540,
                "parent": 539,
                "fieldType": 3,
                "name": "_5_540",
                "hasChoices": false,
                "label": "Mango",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 541,
                "parent": 540,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_541",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_540 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_541 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 542,
                "parent": 541,
                "fieldType": 3,
                "name": "_5_542",
                "hasChoices": false,
                "label": "Pumpkin",
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 543,
                "parent": 542,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_543",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_542 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_543 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            },
            {
                "id": 544,
                "parent": 543,
                "fieldType": 0,
                "label": "Other (specificy)",
                "name": "_5_544",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 545,
                "parent": 544,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_5_545",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_544"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_545 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 546,
                "parent": 545,
                "fieldType": 4,
                "label": "Do you use any irrigation system?",
                "name": "_5_546",
                "choicesOriginRef": "YES_NO",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 547,
                "parent": 546,
                "fieldType": 0,
                "label": "Type of irrigation",
                "name": "_5_547",
                "visibility": {
                    "condition": "_5_546 == 'yes'"
                },
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 548,
                "parent": 547,
                "fieldType": 0,
                "label": "Why",
                "name": "_5_548",
                "visibility": {
                    "condition": "_5_546 == 'no'"
                },
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 5490,
                "parent": 548,
                "fieldType": 4,
                "label": "Do you use your own seeds for farming?",
                "name": "_5_5490",
                "choicesOriginRef": "YES_NO",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 549,
                "parent": 5490,
                "fieldType": 2,
                "label": "Number of seed species used",
                "name": "_5_549",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true,
                    "conditions": [{
                        "condition": "_5_549 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Number cannot be negative"
                    }]
                }
            }, {
                "id": 550,
                "parent": 549,
                "fieldType": 2,
                "label": "Number of seed species buyed",
                "name": "_5_550",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true,
                    "conditions": [{
                        "condition": "_5_550 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Number cannot be negative"
                    }]
                }
            }, {
                "id": 5510,
                "parent": 550,
                "fieldType": 5,
                "label": "What type of fertilizer do you use for farming?",
                "name": "_5_5510",
                "choicesOriginRef": "ORGANIC_OR_NOT",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 551,
                "parent": 5510,
                "fieldType": 4,
                "label": "Do you use compost?",
                "name": "_5_551",
                "choicesOriginRef": "YES_NO",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 553,
                "parent": 551,
                "fieldType": 4,
                "label": "Do you produce your own compost/fertilizer?",
                "name": "_5_553",
                "choicesOriginRef": "YES_NO",
                "visibility": {
                    "condition": "_5_551 == 'yes'"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 554,
                "parent": 553,
                "fieldType": 4,
                "label": "Do you use more fertilizer purchased or self-produced?",
                "name": "_5_554",
                "choicesOriginRef": "FERTILIZER_PURCHASED_OR_SELF_PRODUCED",
                "validation": {
                    "notEmpty": true
                },
                "visibility": {
                    "condition": "_5_551 == 'yes'"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 5550,
                "parent": 554,
                "fieldType": 5,
                "label": "What type of pesticides do you use for farming?",
                "name": "_5_5550",
                "choicesOriginRef": "ORGANIC_OR_NOT",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 555,
                "parent": 5550,
                "fieldType": 4,
                "label": "Do you use pesticides?",
                "name": "_5_555",
                "choicesOriginRef": "YES_NO",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 557,
                "parent": 555,
                "fieldType": 4,
                "label": "Do you produce your own pesticide?",
                "name": "_5_557",
                "choicesOriginRef": "YES_NO",
                "visibility": {
                    "condition": "_5_555 == 'yes'"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 558,
                "parent": 557,
                "fieldType": 4,
                "label": "Do you use more pesticide purchased or self-produced?",
                "name": "_5_558",
                "choicesOriginRef": "PESTICIDIES_PURCHASED_OR_SELF_PRODUCED",
                "visibility": {
                    "condition": "_5_557 == 'yes'"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 559,
                "parent": 558,
                "fieldType": 4,
                "label": "Do you use another type of method of control of the curses and diseases?",
                "name": "_5_559",
                "choicesOriginRef": "YES_NO",
                "visibility": {
                    "condition": "true"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 560,
                "parent": 559,
                "fieldType": 4,
                "label": "Which?",
                "name": "_5_560",
                "choicesOriginRef": "METHOD_OF_CONTROL",
                "visibility": {
                    "condition": "_5_559 == 'yes'"
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 561,
                "parent": 560,
                "fieldType": 0,
                "name": "_5_561",
                "visibility": {
                    "condition": "_5_560 == 'other'"
                },
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 562,
                "parent": 561,
                "fieldType": 0,
                "name": "_5_562",
                "label": "Why?",
                "visibility": {
                    "condition": "_5_559 == 'no'"
                },
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 563,
                "parent": 562,
                "fieldType": 4,
                "label": "How many months per year are you able to produce?",
                "name": "_5_563",
                "choicesOriginRef": "PARTITION_3_FROM_1_TO_12",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 564,
                "parent": 563,
                "fieldType": 2,
                "label": "How many crops do you grow?",
                "name": "_5_564",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true,
                    "conditions": [{
                        "condition": "_5_564 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Number cannot be negative"
                    }]
                }
            }, {
                "id": 565,
                "parent": 564,
                "fieldType": 4,
                "label": "Do you produce organic agricultural products?",
                "name": "_5_565",
                "choicesOriginRef": "YES_NO",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 566,
                "parent": 565,
                "fieldType": 2,
                "label": "Please, specify the percentage of organic on the overall production",
                "name": "_5_566",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_5_565 == 'yes'"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 6,
                    "conditions": [{
                        "condition": "_5_566 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 567,
                "parent": 566,
                "fieldType": 4,
                "label": "Production share for sale",
                "name": "_5_567",
                "choicesOriginRef": "PRODUCTION_PERCENTAGE",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 568,
                "parent": 567,
                "fieldType": 5,
                "nodeType": 0,
                "name": "_5_568",
                "label": "Application of the value of the sale",
                "choicesOriginRef": "APPLICATION_VALUE",
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 569,
                "parent": 567,
                "fieldType": 0,
                "nodeType": 0,
                "name": "_5_569",
                "label": "Please, specify",
                "visibility": {
                    "condition": "valueInChoice(_5_568, 'other')"
                },
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 570,
                "parent": 569,
                "fieldType": 4,
                "nodeType": 0,
                "name": "_5_570",
                "label": "In your daily activity, are you informed about weather conditions, market prices, events and fairs for sale and visibility?",
                "choicesOriginRef": "YES_NO",
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 571,
                "parent": 570,
                "fieldType": 0,
                "nodeType": 0,
                "name": "_5_571",
                "label": "how do you have access to this type of information?",
                "size": "small",
                "validation": {
                    "notEmpty": true
                },
                "visibility": {
                    "condition": "_5_570 == 'yes'"
                }
            },
            {
                "id": 572,
                "parent": 571,
                "fieldType": 5,
                "nodeType": 0,
                "name": "_5_572",
                "label": "What do you think are the biggest obstacles to the productivity of your fields?(Max 3 choices)",
                "choicesOriginRef": "OBSTACLES",
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 573,
                "parent": 572,
                "fieldType": 0,
                "nodeType": 0,
                "name": "_5_573",
                "label": "Please, specify",
                "visibility": {
                    "condition": "valueInChoice(_5_573, 'other')"
                },
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 574,
                "parent": 573,
                "fieldType": 0,
                "nodeType": 0,
                "name": "_5_574",
                "label": "Briefly, explain the main obstacles ticked",
                "validation": {
                    "notEmpty": true
                }
            },
            {
                "id": 575,
                "parent": 574,
                "fieldType": 5,
                "nodeType": 0,
                "name": "_5_575",
                "label": "Which is the situation of the crops of your field?(Max 3 choices)",
                "choicesOriginRef": "PRODUCTION_SHARE",
                "validation": {
                    "notEmpty": true
                }
            }
        ]
    }, {
        "id": 6,
        "parent": 5,
        "label": "RESULT 2 - INDICATORS",
        "name": "_6",
        "nodeType": 3,
        "nodes": [{
                "id": 600,
                "parent": 6,
                "fieldType": 7,
                "HTML": "<h1>What is the percentage of agricultural production that is earmarked for sale on the total production?</h1>",
                "name": "result_2_indicators_text_1",
                "nodeType": 0
            },
            {
                "id": 601,
                "parent": 600,
                "fieldType": 3,
                "name": "_6_601",
                "label": "Rice",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 602,
                "parent": 601,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_602",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_601 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_602 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            },
            {
                "id": 603,
                "parent": 602,
                "fieldType": 3,
                "name": "_6_603",
                "label": "Corn",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 604,
                "parent": 603,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_604",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_603 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_604 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 605,
                "parent": 604,
                "fieldType": 3,
                "name": "_6_605",
                "label": "Cassava",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 606,
                "parent": 605,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_606",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_605 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_606 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 607,
                "parent": 606,
                "fieldType": 3,
                "name": "_6_607",
                "label": "Sweet Potato",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 608,
                "parent": 607,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_608",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_607 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_608 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 609,
                "parent": 608,
                "fieldType": 3,
                "name": "_6_609",
                "label": "Ihame",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 610,
                "parent": 609,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_610",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_609 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_610 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 611,
                "parent": 610,
                "fieldType": 3,
                "name": "_6_611",
                "label": "Salad",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 612,
                "parent": 611,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_612",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_611 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_612 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 613,
                "parent": 612,
                "fieldType": 3,
                "name": "_6_613",
                "label": "Onion",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 614,
                "parent": 613,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_614",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_613 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_614 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 615,
                "parent": 614,
                "fieldType": 3,
                "name": "_6_615",
                "label": "Cabbage",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 616,
                "parent": 615,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_616",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_615 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_616 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 617,
                "parent": 616,
                "fieldType": 3,
                "name": "_6_617",
                "label": "Cucumber",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 618,
                "parent": 617,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_618",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_617 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_618 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 619,
                "parent": 618,
                "fieldType": 3,
                "name": "_6_619",
                "label": "Orange",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 620,
                "parent": 619,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_620",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_619 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_620 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 621,
                "parent": 620,
                "fieldType": 3,
                "name": "_6_621",
                "label": "Pineapple",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 622,
                "parent": 621,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_622",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_621 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_622 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 623,
                "parent": 622,
                "fieldType": 3,
                "name": "_6_623",
                "label": "Peanut",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 624,
                "parent": 623,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_624",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_623 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_624 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 625,
                "parent": 624,
                "fieldType": 3,
                "name": "_6_625",
                "label": "Sesame",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 626,
                "parent": 625,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_626",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_625 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_626 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 627,
                "parent": 626,
                "fieldType": 3,
                "name": "_6_627",
                "label": "Pepper",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 628,
                "parent": 627,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_628",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_627 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_628 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 629,
                "parent": 628,
                "fieldType": 3,
                "name": "_6_629",
                "label": "Beans",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 630,
                "parent": 629,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_630",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_629 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_630 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 631,
                "parent": 630,
                "fieldType": 3,
                "name": "_6_631",
                "label": "Beet",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 632,
                "parent": 631,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_632",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_631 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_632 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 633,
                "parent": 632,
                "fieldType": 3,
                "name": "_6_633",
                "label": "Cashew Nut",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 634,
                "parent": 633,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_634",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_633 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_634 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 635,
                "parent": 634,
                "fieldType": 3,
                "name": "_6_635",
                "label": "Carrot",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 636,
                "parent": 635,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_636",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_635 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_636 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 637,
                "parent": 636,
                "fieldType": 3,
                "name": "_6_637",
                "label": "Okra",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 638,
                "parent": 637,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_638",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_637 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_638 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            },
            {
                "id": 639,
                "parent": 638,
                "fieldType": 3,
                "name": "_6_639",
                "label": "Eggplant",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 640,
                "parent": 639,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_640",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_639 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_640 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 641,
                "parent": 640,
                "fieldType": 3,
                "name": "_6_641",
                "label": "Mango",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 642,
                "parent": 641,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_642",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_641 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_642 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 643,
                "parent": 642,
                "fieldType": 3,
                "name": "_6_643",
                "label": "Pumpkin",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 644,
                "parent": 643,
                "fieldType": 2,
                "label": "Percentage",
                "name": "_6_644",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_643 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_644 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 645,
                "parent": 644,
                "fieldType": 0,
                "label": "Other (specificy)",
                "name": "_6_645",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 646,
                "parent": 645,
                "fieldType": 2,
                "label": "Weight (Kg)",
                "name": "_6_646",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_645"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_646 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            }, {
                "id": 647,
                "parent": 646,
                "fieldType": 2,
                "label": "Overall volume of production sold (KG)",
                "name": "_6_647",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true,
                    "conditions": [{
                        "condition": "_6_647 >= 0",
                        "clientValidation": true,
                        "errorMessage": "cannot be negative"
                    }]
                }
            }, {
                "id": 648,
                "parent": 647,
                "fieldType": 2,
                "label": "How much do you earn monthly from the sale of agricultural products from your field?",
                "name": "_6_648",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true,
                    "conditions": [{
                        "condition": "_6_648 >= 0",
                        "clientValidation": true,
                        "errorMessage": "cannot be negative"
                    }]
                }
            }, {
                "id": 649,
                "parent": 648,
                "fieldType": 7,
                "HTML": "<h1>Price per crop/KG</h1>",
                "name": "_6_649",
                "nodeType": 0
            },
            {
                "id": 650,
                "parent": 649,
                "fieldType": 3,
                "name": "_6_650",
                "label": "Rice",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 651,
                "parent": 650,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_651",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_650 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_651 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            },
            {
                "id": 652,
                "parent": 651,
                "fieldType": 3,
                "name": "_6_652",
                "label": "Corn",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 653,
                "parent": 652,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_653",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_652 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_653 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 654,
                "parent": 653,
                "fieldType": 3,
                "name": "_6_654",
                "label": "Cassava",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 655,
                "parent": 654,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_655",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_654 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_655 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 656,
                "parent": 655,
                "fieldType": 3,
                "name": "_6_656",
                "label": "Sweet Potato",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 657,
                "parent": 656,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_657",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_656 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_657 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 658,
                "parent": 657,
                "fieldType": 3,
                "name": "_6_658",
                "label": "Ihame",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 659,
                "parent": 658,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_659",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_658 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_659 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 660,
                "parent": 659,
                "fieldType": 3,
                "name": "_6_660",
                "label": "Salad",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 661,
                "parent": 600,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_661",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_660 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_661 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 662,
                "parent": 661,
                "fieldType": 3,
                "name": "_6_662",
                "label": "Onion",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 663,
                "parent": 662,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_663",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_662 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_663 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 664,
                "parent": 663,
                "fieldType": 3,
                "name": "_6_664",
                "label": "Cabbage",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 665,
                "parent": 664,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_665",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_664 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_665 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 666,
                "parent": 665,
                "fieldType": 3,
                "name": "_6_666",
                "label": "Cucumber",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 667,
                "parent": 666,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_667",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_666 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_667 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 668,
                "parent": 667,
                "fieldType": 3,
                "name": "_6_668",
                "label": "Orange",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 669,
                "parent": 668,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_669",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_668 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_669 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 670,
                "parent": 669,
                "fieldType": 3,
                "name": "_6_670",
                "label": "Pineapple",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 671,
                "parent": 670,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_671",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_670 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_671 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 672,
                "parent": 671,
                "fieldType": 3,
                "name": "_6_672",
                "label": "Peanut",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 673,
                "parent": 672,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_673",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_672 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_673 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 674,
                "parent": 673,
                "fieldType": 3,
                "name": "_6_674",
                "label": "Sesame",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 675,
                "parent": 674,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_675",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_674 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_675 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 676,
                "parent": 675,
                "fieldType": 3,
                "name": "_6_676",
                "label": "Pepper",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 677,
                "parent": 674,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_677",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_676 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_677 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 678,
                "parent": 677,
                "fieldType": 3,
                "name": "_6_678",
                "label": "Beans",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 679,
                "parent": 678,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_679",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_678 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_679 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 680,
                "parent": 679,
                "fieldType": 3,
                "name": "_6_680",
                "label": "Beet",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 681,
                "parent": 680,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_681",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_680 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_681 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 682,
                "parent": 681,
                "fieldType": 3,
                "name": "_6_682",
                "label": "Cashew Nut",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 683,
                "parent": 682,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_683",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_682 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_683 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 684,
                "parent": 683,
                "fieldType": 3,
                "name": "_6_684",
                "label": "Carrot",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 685,
                "parent": 684,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_685",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_684 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_685 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 686,
                "parent": 685,
                "fieldType": 3,
                "name": "_6_686",
                "label": "Okra",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 687,
                "parent": 686,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_687",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_686 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_687 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            },
            {
                "id": 688,
                "parent": 687,
                "fieldType": 3,
                "name": "_6_688",
                "label": "Eggplant",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 689,
                "parent": 688,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_689",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_688 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_689 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 690,
                "parent": 689,
                "fieldType": 3,
                "name": "_6_690",
                "label": "Mango",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 691,
                "parent": 690,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_691",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_690 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_691 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 692,
                "parent": 691,
                "fieldType": 3,
                "name": "_6_692",
                "label": "Pumpkin",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 693,
                "parent": 692,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_693",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_692 == true"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_693 >= 0",
                        "clientValidation": true,
                        "errorMessage": "percentage cannot be negative"
                    }]
                }
            }, {
                "id": 694,
                "parent": 693,
                "fieldType": 0,
                "label": "Other (specificy)",
                "name": "_6_694",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            },
            {
                "id": 695,
                "parent": 694,
                "fieldType": 2,
                "label": "Meticais/KG Number",
                "name": "_6_695",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "visibility": {
                    "condition": "_6_694"
                },
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_695 >= 0",
                        "clientValidation": true,
                        "errorMessage": "Weight cannot be negative"
                    }]
                }
            },
            {
                "id": 696,
                "parent": 695,
                "fieldType": 4,
                "label": "Availability of storage systems",
                "name": "_6_696",
                "choicesOriginRef": "YES_NO",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 697,
                "parent": 696,
                "fieldType": 0,
                "label": "please specify type/location/distance from cultivated lands",
                "name": "_6_697",
                "visibility": {
                    "condition": "_6_696 == 'yes'"
                },
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 698,
                "parent": 697,
                "fieldType": 2,
                "label": "Percentage of harvest lost during storage",
                "name": "_6_698",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_698 >= 0",
                        "clientValidation": true,
                        "errorMessage": "cannot be negative"
                    }]
                }
            }, {
                "id": 699,
                "parent": 698,
                "fieldType": 2,
                "label": "Percentage of production transported from household to markets",
                "name": "_6_699",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_699 >= 0",
                        "clientValidation": true,
                        "errorMessage": "cannot be negative"
                    }]
                }
            }, {
                "id": 6000,
                "parent": 699,
                "fieldType": 4,
                "label": "Who manages transport to markets?",
                "name": "_6_6000",
                "choicesOriginRef": "MANAGES_TRANSPORT",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 6001,
                "parent": 6000,
                "fieldType": 2,
                "label": "Average delivery times (days) from the producer to retailers ",
                "name": "_6_6001",
                "size": "small",
                "hasChoices": false,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true,
                    "maxValue": 100,
                    "conditions": [{
                        "condition": "_6_6001 >= 0",
                        "clientValidation": true,
                        "errorMessage": "cannot be negative"
                    }]
                }
            }, {
                "id": 6002,
                "parent": 6001,
                "fieldType": 0,
                "label": "What are your sales channels?",
                "name": "_6_6002",
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 6003,
                "parent": 6002,
                "fieldType": 4,
                "label": "Are you satisfied with these channels?",
                "name": "_6_6003",
                "choicesOriginRef": "YES_NO",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 6004,
                "parent": 6003,
                "fieldType": 0,
                "label": "Please, explain briefly why",
                "name": "_6_6004",
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 6005,
                "parent": 6004,
                "fieldType": 4,
                "label": "Do you have any link with cooperatives or associations for marketing purposes?",
                "name": "_6_6005",
                "choicesOriginRef": "YES_NO",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 6006,
                "parent": 6005,
                "fieldType": 0,
                "label": "Please, specify which/location/type of link",
                "name": "_6_6006",
                "visibility": {
                    "condition": "_6_6005 == 'yes'"
                },
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 6007,
                "parent": 6006,
                "fieldType": 4,
                "label": "Are you planning to establish contacts with existing associations and cooperatives for  marketing purposes?",
                "name": "_6_6007",
                "choicesOriginRef": "YES_NO",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 6008,
                "parent": 6007,
                "fieldType": 0,
                "label": "please provide details",
                "name": "_6_6008",
                "visibility": {
                    "condition": "_6_6007 == 'yes'"
                },
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 6009,
                "parent": 6008,
                "fieldType": 4,
                "label": "Do you think this kind of contacts could support your activity?",
                "name": "_6_6009",
                "choicesOriginRef": "YES_NO",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 6010,
                "parent": 6009,
                "fieldType": 0,
                "label": "Please, explain briefly how",
                "name": "_6_6010",
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 6011,
                "parent": 6010,
                "fieldType": 4,
                "label": "How do you perceive your role in the agricultural value chain?",
                "name": "_6_6011",
                "choicesOriginRef": "VALUE_CHAIN",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 6012,
                "parent": 6011,
                "fieldType": 0,
                "label": "Please, explain briefly main constraints and/or strenghts",
                "name": "_6_6012",
                "validation": {
                    "notEmpty": true
                },
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }, {
                "id": 6013,
                "parent": 6012,
                "fieldType": 5,
                "label": "what do you think are the biggest obstacles in marketing your products?",
                "name": "_6_6013",
                "choicesOriginRef": "MARKETING_PRODUCTS_OSTACLES",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0,
                "validation": {
                    "notEmpty": true
                }
            }, {
                "id": 6014,
                "parent": 6013,
                "fieldType": 0,
                "label": "Other(specificy)",
                "name": "_6_6014",
                "hasChoices": true,
                "parentNode": 0,
                "nodeType": 0
            }
        ]
    }]
};
