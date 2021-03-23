# Ajf Forms

Ajf uses a json-based format to describe forms, which is documented here.

The format is relatively low level; while it is possible to write forms as jsons by hand,
we provide a couple of tools that make the creation and maintenance of forms more user-friendly:

- Forms can be easily written in excel following the [xlsform standard](https://github.com/gnucoop/formconv#introduction-to-xlsforms)
  and then converted to ajf forms using the command line utility [formconv](https://github.com/gnucoop/formconv)
  or the online converter <https://formconv.herokuapp.com/>.
- The [form builder](https://dev-mat.ajf.rocks/form-builder) is available,
  which provides a graphical user interface for modifying ajf forms.

<h2 id="basic-syntax">Basic Syntax</h2>

Let's start by describing a simple example form:

	{
		"nodes": [
			{
				"parent": 0,
				"id": 1,
				"name": "slide0",
				"label": "Personal Information",
				"nodeType": 3,
				"nodes": [
					{
						"parent": 1,
						"id": 1001,
						"name": "name",
						"label": "What's your name?",
						"nodeType": 0,
						"fieldType": 0
					},
					{
						"parent": 1001,
						"id": 1002,
						"name": "age",
						"label": "How old are you?",
						"nodeType": 0,
						"fieldType": 2
					}
				]
			},
			{
				"parent": 1,
				"id": 2,
				"name": "slide1",
				"label": "Pet Information",
				"nodeType": 3,
				"nodes": [
					{
						"parent": 2,
						"id": 2001,
						"name": "pet_name",
						"label": "What's your pet's name?",
						"nodeType": 0,
						"fieldType": 0
					},
					{
						"parent": 2001,
						"id": 2002,
						"name": "pet_age",
						"label": "How old is it?",
						"nodeType": 0,
						"fieldType": 2
					}
				]
			}
		]
	}

You are encouraged to see how the above form is rendered by setting its form schema in the [Ajf Demo page](https://dev-app.ajf.rocks/mat-forms).

Ajf forms are composed of "nodes".
Nodes are most commonly slides (with nodeType 3) or fields (with nodeType 0);
other node types are described in the [Node Types section](#node-types).
The example form consists of two slides, each one containing two fields.

Fields also have a type.
In this form, we have text fields (fieldType 0) and numeric fields (fieldType 2);
many other [field types](#field-types) are available, to deal with different user inputs, like dates, files and multiple choice questions.

Every node has a "name" and a "label".
name is used as a string identifier of the node;
label is the text shown to the user when the form is rendered.

Every node also has a numerical "id" and a "parent".
id can be any positive number, as long as it's unique in the form.
parent typically refers to the id of the node immediately above
(this can be different in forms with [conditional branches](#conditional-branches)).
Note that, in the example, node 1002 has node 1001 as parent and not node 1.
The first slide in the form must have parent 0.

<h2 id="form-context">Form Context</h2>

To each form instance is associated a context, which holds the value of the form fields, for the questions that have been answered.
The fields are referenced by name.
For the previous example, a context might be the object `{ pet_name: "Bobby", pet_age: 3 }`.

<h2 id="node-types">Node Types</h2>

The following node types are available:

| type | name              | description  |
|------|-------------------|--------------|
|    0 | AjfField          | a form field |
|    1 | AjfFieldNodeLink  | TODO: what is this? |
|    2 | AjfNodeGroup      | a [group of nodes](#node-groups) |
|    3 | AjfSlide          | a slide      |
|    4 | AjfRepeatingSlide | a [slide which can be repeated](#repeating-slides) |

<h2 id="field-types">Field Types</h2>

The following field types are available:

| type | name           | description  |
|------|----------------|--------------|
|    0 | String         | a text input |
|    1 | Text           | a text area  |
|    2 | Number         | a 64-bit floating-point number |
|    3 | Boolean        | a checkbox, stored as boolean |
|    4 | SingleChoice   | a [single-choice question](#choice-questions) |
|    5 | MultipleChoice | a [multiple-choice question](#choice-questions) |
|    6 | Formula        | a [formula](#formulas) |
|    7 | Empty          | inserts an [HTML note](#html-notes) in the form |
|    8 | Date           | a clickable calendar to select a date |
|    9 | DateInput      | an input to insert a date with an additional dropdown calendar | 
|   10 | Time           | a time in 23:59 format |
|   11 | Table          | a [table](#tables) |
|   12 | Geolocation    | a GPS point  |
|   13 | Barcode        | allows scanning a barcode |
|   14 | File           | allows uploading a file |
|   15 | Image          | allows uploading an image |
|   16 | VideoUrl       | the url of a video |

<h2 id="choice-questions">Choice Questions</h2>

The following form contains a single-choice question (fieldType 4) and a multiple-choice question (fieldType 5):

	{
		"choicesOrigins": [
			{
				"type": "fixed",
				"name": "foods",
				"choicesType": "string",
				"choices": [
					{
						"label": "Pizza",
						"value": "pizza"
					},
					{
						"label": "Pasta",
						"value": "pasta"
					},
					{
						"label": "Sushi",
						"value": "sushi"
					}
				]
			},
			{
				"type": "fixed",
				"name": "yes_no",
				"choicesType": "string",
				"choices": [
					{
						"label": "Yes",
						"value": "yes"
					},
					{
						"label": "No",
						"value": "no"
					}
				]
			}
		],
		"nodes": [
			{
				"parent": 0,
				"id": 1,
				"name": "food_info",
				"label": "Food Information",
				"nodeType": 3,
				"nodes": [
					{
						"parent": 1,
						"id": 1001,
						"name": "hungry",
						"label": "Are you hungry?",
						"nodeType": 0,
						"fieldType": 4,
						"choicesOriginRef": "yes_no"
					},
					{
						"parent": 1001,
						"id": 1002,
						"name": "favorite_foods",
						"label": "Which food(s) do you like?",
						"nodeType": 0,
						"fieldType": 5,
						"choicesOriginRef": "foods"
					}
				]
			}
		]
	}

Again, you can run the form in the [Ajf Demo page](https://dev-app.ajf.rocks/mat-forms).

The lists of values for choice questions are defined in the "choicesOrigins" property of the form.
Every "choices origin" list has a name, which allows it to be referenced in the form fields with the "choicesOriginRef" property.

Each choice has a "label" and a "value".
The label is what the user sees when compiling the form, the value is what gets stored in the form context.

<h2 id="html-notes">HTML Notes</h2>

Fields with type "Empty" (7) allow inserting HTML text snippets in the form:

	{
		"name": "link",
		"label": "",
		"nodeType": 0,
		"fieldType": 7,
		"HTML": "<a href=\"whatever\">foo</a>"
	}

<h2 id="hints">Hints</h2>

Fields can have an associated "hint" property, which can provide the user with additional information on how to fill the field:

	{
		"name": "store_name",
		"label": "What is the name of this store?",
		"nodeType": 0,
		"fieldType": 0,
		"hint": "Look at the signboard"
	}

<h2 id="formulas">Formulas</h2>

Fields of type "formula" (6) can be used to compute values based on other fields.

For example, we can compute the percentage of people that checked-in for an event based on the number of check-ins and the total number of attendees:

	{
		"nodes": [
			{
				"parent": 0,
				"id": 1,
				"name": "check_in_info",
				"label": "Check-in Information",
				"nodeType": 3,
				"nodes": [
					{
						"parent": 1,
						"id": 1001,
						"name": "attendees_total",
						"label": "Number of people registered for the event",
						"nodeType": 0,
						"fieldType": 2
					},
					{
						"parent": 1001,
						"id": 1002,
						"name": "checked_in_num",
						"label": "Number of check-ins",
						"nodeType": 0,
						"fieldType": 2
					},
					{
						"parent": 1002,
						"id": 1003,
						"name": "checked_in_percent",
						"label": "Percentage of people checked-in",
						"nodeType": 0,
						"fieldType": 6,
						"formula": {
							"formula": "checked_in_num/attendees_total*100"
						}
					}
				]
			}
		]
	}

Formulas are written in JavaScript and the fields of the form are referenced by name as if they were variables.

<h2 id="fields-validation">Fields Validation</h2>

It is possible to impose constraints on the values that a field can accept.

In the following example, the "age" field is flagged as mandatory and required to be an integer smaller than 150:

	{
		"name": "age",
		"label": "Your age",
		"nodeType": 0,
		"fieldType": 2,
		"validation": {
			"notEmpty": true,
			"conditions": [
				{
					"condition": "isInt(age) && age < 150",
					"clientValidation": true,
					"errorMessage": "The age must be an integer smaller than 150."
				}
			]
		}
	}

The "validation" object can have the following properties:

	"validation": {
		"forceValue" // Forces the field to have the specified value
		"maxValue"   // Maximum accepted value for a numeric field
		"minValue"   // Minimum accepted value for a numeric field
		"notEmpty"   // If true, providing a value is mandatory
		"maxDigits"  // Maximum number of digits for a numeric field
		"minDigits"  // Minimum number of digits for a numeric field
		"conditions" // List of conditions to be satisfied, as in the example above
	}

<h2 id="visibility-conditions">Visibility Conditions</h2>

It is often desirable to show or hide a field depending on the values of previous fields in the form.
This is achieved using a visibility condition on the field.

In the following form, driver license information is asked only if the user's age is al least 18:

	{
		"nodes": [
			{
				"parent": 0,
				"id": 1,
				"name": "personal_info",
				"label": "Personal Information",
				"nodeType": 3,
				"nodes": [
					{
						"parent": 1,
						"id": 1001,
						"name": "age",
						"label": "Your age",
						"nodeType": 0,
						"fieldType": 2
					},
					{
						"parent": 1001,
						"id": 1002,
						"name": "license_id",
						"label": "Driver license id",
						"nodeType": 0,
						"fieldType": 0,
						"visibility": {
							"condition": "age >= 18"
						}
					}
				]
			}
		]
	}

Visibility conditions can be applied to any ajf node, including slides.

<h2 id="repeating-slides">Repeating Slides</h2>

Repeating slides give the user the possibility to repeat a group of questions:

	{
		"nodes": [
			{
				"parent": 0,
				"id": 1,
				"name": "child_repeat",
				"label": "Answer the following questions for each one of your children",
				"nodeType": 4,
				"maxReps": 20,
				"nodes": [
					{
						"parent": 1,
						"id": 1001,
						"name": "name",
						"label": "Child's name",
						"nodeType": 0,
						"fieldType": 0
					},
					{
						"parent": 1001,
						"id": 1002,
						"name": "age",
						"label": "Child's age",
						"nodeType": 0,
						"fieldType": 2
					}
				]
			}
		]
	}

When specified, "maxReps" defines an upper bound to how many times the slide can be repeated.

The form context will contain the number of times the slide has been repeated.
The values of the repeated fields are stored in the context by appending the slide number to the fields' name.
Specifically, for the previous form, a possible context could be `{ child_repeat: 2, name__0: "Pippo", age__0: 20, name__1: "Pluto", age__1: 10 }`.

<h2 id="choice-filters">Choice Filters</h2>

The list of values for a single- or multiple-choice question can be filtered depending on the answer to previous questions, using the "choicesFilter" property.

In this example, the second question only shows the cities which are relevant, based on the country selected in the first question:

	{
		"choicesOrigins": [
			{
				"type": "fixed",
				"name": "countries",
				"choicesType": "string",
				"choices": [
					{
						"label": "Italy",
						"value": "italy"
					},
					{
						"label": "Germany",
						"value": "germany"
					}
				]
			},
			{
				"type": "fixed",
				"name": "cities",
				"choicesType": "string",
				"choices": [
					{
						"label": "Milan",
						"value": "milan",
						"country": "italy"
					},
					{
						"label": "Rome",
						"value": "rome",
						"country": "italy"
					},
					{
						"label": "Berlin",
						"value": "berlin",
						"country": "germany"
					},
					{
						"label": "Hamburg",
						"value": "hamburg",
						"country": "germany"
					}
				]
			}
		],
		"nodes": [
			{
				"parent": 0,
				"id": 1,
				"name": "slide0",
				"label": "",
				"nodeType": 3,
				"nodes": [
					{
						"parent": 1,
						"id": 1001,
						"name": "user_country",
						"label": "In which country do you live?",
						"nodeType": 0,
						"fieldType": 4,
						"choicesOriginRef": "countries"
					},
					{
						"parent": 1001,
						"id": 1002,
						"name": "user_city",
						"label": "In which city do you live?",
						"nodeType": 0,
						"fieldType": 4,
						"choicesOriginRef": "cities",
						"choicesFilter": {
							"formula": "$choice.country === user_country"
						}
					}
				]
			}
		]
	}
