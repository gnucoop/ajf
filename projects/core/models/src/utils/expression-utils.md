# Xlsreport indicators and functions

This file documents the scripting language that can be used inside xlsreport to define indicators and
lists all the functions that are available in the language.

`ALL_VALUES_OF(forms, $field)`  
Returns an array containing all the values that the specified field takes in the forms.
The values are converted to strings.

`COUNT_FORMS(forms, $expression?)`  
Returns the number of forms for which expression evaluates to true,
for the form itself or for any of its repetitions.

`COUNT_REPS(forms, $expression?)`  
Counts the forms and all of their repetitions for which the expression evaluates to true.

`COUNT_FORMS_UNIQUE(forms, $field, $expression?)`  
TODO: rename to COUNT_UNIQUE_VALUES
Counts the different values that the specified field takes in the forms (and their repetitions).

`LAST(forms, $expression, dateField = "created_at")`  
Evaluates the expression in the last form by date.

`SUM(forms, $field, $expression?)`  
Aggregates and sums the values of the specified field.
An optional expression can be added to filter which forms to take for the sum.

`MEAN(forms, $field, $expression?)`  
Computes the mean of the values of the specified field.
An optional expression can be added to filter which forms to take for the sum.

`MAX(forms, $field, $expression?)`  
Computes the max value of the field.
An optional expression can be added to filter which forms to take for the sum.

`MEDIAN(forms, $field, $expression?)`  
Computes the median value of the field.
An optional expression can be added to filter which forms to take for the sum.

`MODE(forms, $field, $expression?)`  
Computes the mode value of the field.
An optional expression can be added to filter which forms to take for the sum.
