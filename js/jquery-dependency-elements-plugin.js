/**
* jquery-dependency-elements-plugin.js
* @version: v0.0.1
* @author: Daniel Bastos Pereira
*
* Copyright (c) 2014 Daniel Bastos Pereira (https://github.com/bastdan)
*
* The MIT License (http://www.opensource.org/licenses/mit-license.php)
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

(function ( $ ) {

	// After the page has been loaded
	$(document).ready(function() {
		
		// Search for each object that has a data dependency tag
		$("[data-depends-on]").each(function(index, element){
			
			// Disable the current element
			$(element).prop("disabled", true);
			
			// Gets the target element
			target = $(element).data("depends-on");

			// Check if clearwhendisabled is active for this element
			var clearWhenDisabled = ($(element).data("depends-clearwhendisabled") == true);

			// Treates input
			if($(target).prop("type") == "text") manageInput(target, element, clearWhenDisabled);
			else if($(target).prop("type") == "checkbox") manageCheckbox(target, element, clearWhenDisabled);
			else if ($(target).is("select")) manageSelect(target, element, clearWhenDisabled);

		});
	});

	// Function to manage input validation
	function manageInput(target, element, clearWhenDisabled){
		
		// Binds changes
		$(target).bind("keydown keyup keypress change", function(){

			// Checks if textfield has some data
			$(element).prop("disabled", ($(target).val().length == 0) );
			if (clearWhenDisabled) $(element).val("");

		});

	}

	// Function to manage select option validation
	function manageSelect(target, element, clearWhenDisable) {

		// Bind changes
		$(target).bind("keydown keyup keypress change", function(){

			// Checks if selected value matches lock option
			$(element).prop("disabled", 
				($(target).val() == $(target).data("depends-lockvalue"))
			);
			//if (clearWhenDisabled) $(element).val(""); // TODO: verify

		});

	}

	// Function to manage checkbox validation
	function manageCheckbox(target, element, clearWhenDisable) {

		// Bind changes
		$(target).bind("change", function(){

			// Checks if selected value matches lock option
			$(element).prop("disabled", !($(target).is(':checked')) );
			//if (clearWhenDisabled) $(element).val(""); // TODO: verify

		});

	}


}( jQuery ));
