"use strict";

class InputFilter {
	static Float = true;
	static Int = false;
	static Signed = true;
	static Unsigned = false;
	static numbers = Array.from('0123456789');
	
	constructor (Element, allowFloat = true, allowSigned = true, callbackFn = undefined) {
		this.Element = Element;
		this.allowFloat = allowFloat;
		this.allowSigned = allowSigned;
		this.callbackFn = callbackFn;
		this.currentValue = this.Element.value;
		
		// Bind 'this' context to these functions:
		this.validate = this.validate.bind(this);
		this.onBlur = this.onBlur.bind(this);
		
		// Bind element context to the callback function:
		if (this.callbackFn != undefined) {
			this.callbackFn = this.callbackFn.bind(this.Element);
		}
		
		// Event listeners:
		this.Element.addEventListener('input', this.validate);
		this.Element.addEventListener('blur', this.onBlur);
	}
	
	validate () {
		let decimal_point_still_allowed = this.allowFloat ? true : false;
		let valid = true;
		
		let candidate = this.Element.value.toString();
		for (let i = 0; i < candidate.length; i++) {
			// Numbers are always allowed:
			if (InputFilter.numbers.includes(candidate[i])) {
				continue;
			}
			
			// Negative sign is allowed as the first character if this is a signed value:
			else if (candidate[i] == '-' && i == 0) {
				if (this.allowSigned) {
					continue;
				}
				else {
					valid = false;
				}
			}
			
			// One decimal point is allowed if this is a floating point value:
			else if (candidate[i] == '.') {
				if (decimal_point_still_allowed) {
					decimal_point_still_allowed = false;
					continue;
				}
				else {
					valid = false;
				}
			}
			
			// No other characters are valid in numbers:
			else {
				valid = false;
			}
			
			if (!valid) {
				break;
			}
		}
		
		// Keep new candidate value if valid, otherwise roll back to the last good value:
		if (valid) {
			this.currentValue = this.Element.value;
			if (this.callbackFn != undefined) {
				this.callbackFn();
			}
		}
		else {
			this.Element.value = this.currentValue;
		}
	}

	onBlur () {
		// Trim off trailing decimal points and zeroes:
		if (this.Element.value.includes('.')) {
			let trimLength = 0;
			while (this.Element.value[this.Element.value.length - (trimLength + 1)] == '0') {
				trimLength++;	
			}
			this.Element.value = this.Element.value.substring(0, this.Element.value.length - trimLength);
		}
		if (this.Element.value[this.Element.value.length - 1] == '.') {
			this.Element.value = this.Element.value.substring(0, this.Element.value.length - 1);
		}
		
		// Trim off leading zeroes:
		let lead_in = this.Element.value[0] == '-' ? '-' : '';
		let start_at = this.Element.value[0] == '-' ? 1 : 0;
		while (this.Element.value[start_at] == '0' && this.Element.value[start_at + 1] != '.') {
			this.Element.value = lead_in + this.Element.value.substring(start_at + 1);
		}
		
		// Completely empty numbers are zero:
		if (this.Element.value == '' || this.Element.value == '-' || this.Element.value == '.') {
			this.Element.value = 0;
		}
	}
}
