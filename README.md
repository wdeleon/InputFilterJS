# InputFilterJS
Javascript numeric input filter without using Regex

You can use it with something like:
```
let myFilter = new InputFilter(document.getElementById('filtered'), InputFilter.Float, InputFilter.Signed, callbackFn);
```

The arguments of InputFilter() are the following:
InputFilter(*elementHandle*, *floatAllowed*, *signedAllowed*, *callbackFunction*)

Where the arguments are:

elementHandle: a handle a DOM element, probably an input element you want to monitor and filter

floatAllowed: a boolean value determining whether the number can be a floating point number (when true) or must be an integer (when false).
You can provide one of the built-in constants:
InputFilter.Float - float allowed
InputFilter.Int - integer only

signedAllowed: a boolean value determining whether the number can be signed (when true) or not (when false).
You can provide one of the built-in constants:
InputFilter.Signed - signed allowed
InputFilter.Unsigned - unsigned only

callbackFunction: a function that will be called whenever the numeric input being filtered is validated successfully. Useful for automatically updating other inputs, and so forth.
