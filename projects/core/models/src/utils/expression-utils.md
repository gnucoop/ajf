# Xlsreport indicators and functions

This file documents the scripting language that can be used inside xlsreport to define indicators and
lists all the functions that are available in the language.

## Utilities

`CONSOLE_LOG(val)`  
Logs val to the console and returns it.

`EVALUATE(condition, then, otherwise)`  
Renamed to IF.

`IF(condition, then, otherwise)`  
If the condition is true, evaluates and returns then, otherwise otherwise.

## Forms manipulation functions

`BUILD_DATASET(forms, schema?)`  
Returns a processed copy of forms, in which the fields belonging to repeating slides
are better structured to be used in formulas.

`ALL_VALUES_OF(forms, $field, expression?)`  
Returns an array containing all the values that the specified field takes in the forms.
The values are converted to strings.
An optional expression can be added to filter which forms to consider in the computation.

`FIRST(forms, expression, dateField = $created_at)`  
Evaluates the expression in the first form by date.

`LAST(forms, expression, dateField = $created_at)`  
Evaluates the expression in the last form by date.

`FILTER_BY(forms, expression)`  
Returns a copy of forms and its repetitions, keeping only the ones for which expression evaluates to true.

`JOIN_FORMS(formsA, formsB, $fieldA, $fieldB?)`  
Performs a left join of formsA and formsB.  
For example, `JOIN_FORMS(anagraphic, medical, $personId)` returns a copy the anagraphic data forms,
possibly agumented with the medical data, where there's a correspondence by personId.

`JOIN_REPEATING_SLIDES(formsA, formsB, $fieldA, $fieldB, $subfieldA, $subfieldB?)`  
Performs a left join of formsA and formsB, like JOIN_FORMS.  
In addition, for each matching pair of formA and formB, their repeating slides are also joined.

`APPLY(forms, $field, expression)`  
For each form in forms, the specified field is set with the value given by the evaluation of expression.
The form's fields can be used inside expression.

`APPLY_LABELS(forms, schema, fields)`  
Returns a clone of forms, where the specified fields are replaced by the corresponding labels,
as defined by the choice origins in schema.

`FROM_REPS(form | forms, expression)`  
Returns the array obtained by evaluating expression for every repetition of every input form.

`GET_LABELS(schema, values)`  
Given an array of values, returns the corresponding array of labels,
as specified by the choices origin in schema.

## Counting and math functions

`COUNT_FORMS(forms, expression?)`  
Returns the number of forms for which expression evaluates to true,
for the form itself or for any of its repetitions.

`COUNT_REPS(forms, expression?)`  
Counts the forms and all of their repetitions for which the expression evaluates to true.

`COUNT_FORMS_UNIQUE`  
Deprecated. Use LEN(ALL_VALUES_OF).

`PERCENT(a, b)`  
Returns the percentage of a/b as string. Example: PERCENT(3, 10) = "30%"

`PERCENTAGE_CHANGE(a, b)`  
Returns the percentage change between a value and his reference value b as number.
Example 1: PERCENTAGE_CHANGE(3, 10) = -70
Example 2: PERCENTAGE_CHANGE("3%", "10%") = -70

`ROUND(num, digits?)`  
Rounds num to the specified number of digits after the point (or zero).

`SUM(forms, $field, expression?)`  
Aggregates and sums the values of the specified field.
An optional expression can be added to filter which forms to consider in the computation.

`MEAN(forms, $field, expression?)`  
Computes the mean of the values of the specified field.
An optional expression can be added to filter which forms to consider in the computation.

`MAX(forms, $field, expression?)`  
Computes the max value of the field.
An optional expression can be added to filter which forms to consider in the computation.

`MEDIAN(forms, $field, expression?)`  
Computes the median value of the field.
An optional expression can be added to filter which forms to consider in the computation.

`MODE(forms, $field, expression?)`  
Computes the mode value of the field.
An optional expression can be added to filter which forms to consider in the computation.

## Array manipulation functions

`LEN(data)`  
If data is a form with repetitions, returns the number of repetitions;
If data is an array, returns its length;
Otherwise returns 0.

`ISIN(arr, elem)`  
Deprecated. Use INCLUDES

`INCLUDES(arr, elem)`  
Tells if arr includes elem.

`CONCAT(a, b)`  
Array concatenation.

`REMOVE_DUPLICATES(arr)`  
Removes duplicate elements from an array.

`REPEAT(forms, array, function, $field, expression?)`  
Deprecated. Use MAP.

`MAP(array, expression)`  
Evaluates the expression for each element of the array and returns the array of results.
The current element can be accessed with the keyword elem.  
Example 1: `MAP(dates, COUNT_FORMS(progetti, IS_BEFORE($dino_created_at, elem)))`  
Example 2: `MAP(genderValues, SUM(accoglienze, $field1, $gender = elem))`

`OP(arrayA, arrayB, expression)`  
Applies the operation defined by expression for every pair of elements of arrayA and arrayB,
returning the array of results. The current elements are identified by elemA and elemB.  
For example, `OP([1, 2, 3], [10, 20, 30], elemA + elemB)` returns `[11, 22, 33]`.

## Date functions

Dates are strings in the format 2000-12-31.

`TODAY()`  
Returns today's date.

`ADD_DAYS(date, days)`  
Returns the date obtained by adding days to date.

`DAYS_DIFF(a, b)`  
Returns the difference in days (a - b) between the two dates.

`IS_BEFORE(date, dateToCompare)`  
Returns true if date is before dateToCompare.

`IS_AFTER(date, dateToCompare)`  
Returns true if date is after dateToCompare.

`IS_WITHIN_INTERVAL(date, dateStart, dateEnd)`  
Returns true if date is between dateStart and dateEnd.

`COMPARE_DATE(date, dateStart, dateEnd, labels?)`  
Compares date with an interval.
Returns '-1' (or the first element of labels) if date is before dateStart,
'0' (or the second element) if date is between dateStart and dateEnd,
'1' (or the third element) if date is after dateEnd.

`GET_AGE(dob, when = TODAY())`  
Computes the age of a person in the moment "when", given their date of birth "dob".
The second argument can be omitted and defaults to TODAY().
