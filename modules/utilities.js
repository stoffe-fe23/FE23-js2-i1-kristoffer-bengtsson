/*
    Generic tools functions. 
*/


//////////////////////////////////////////////////////////////////////////////////////////////////////
// Set content of the matching HTML element if it exists, otherwise create it. 
export function setHTMLElement(elementType, elementText, parentElement, cssClass, attributes, allowHTML) {
    let selector = '';
    if ((getIsValidObject(attributes) && getIsValidText(attributes.id))) {
        selector = `#${attributes.id}`;
    }
    else if (getIsValidArray(cssClass)) {
        selector = `${elementType}.${cssClass.join(".")}`;
    }
    else if (getIsValidText(cssClass)) {
        selector = `${elementType}.${cssClass}`;
    }
    else {
        selector = elementType;
    }

    let targetElement = parentElement.querySelector(selector);
    if (getIsValidObject(targetElement, 0)) {
        setElementContent(targetElement, elementText, allowHTML);
    }
    else {
        targetElement = createHTMLElement(elementType, elementText, parentElement, cssClass, attributes, allowHTML);
    }

    return targetElement;
}



//////////////////////////////////////////////////////////////////////////////////////////////////////
// Create and return a new DOM element with text content, optionally appending it to a parent element.
//  * elementText can either be a string holding the content of the tag or the ALT of an img tag, or an array of strings 
//    with the options for UL, OL and SELECT tags. In the latter case the string can also be formated like: value|textlabel|optgroup
//  * elementClass can ba a string or an array of strings. 
//  * The elementAttributes parameter can be an object with a property for each attribute to set on the HTML element. 
// Set CSS "white-space: pre-wrap;" on element if allowHTML is true and you wish to keep newlines displayed like innerText. 
export function createHTMLElement(elementType, elementText, parentElement = null, elementClass = '', elementAttributes = null, allowHTML = false) {
    const newElement = document.createElement(elementType);

    elementType = elementType.toLowerCase();

    // Set any attributes on the element
    if (getIsValidObject(elementAttributes, 1)) {
        for (const attributeName in elementAttributes) {
            newElement.setAttribute(attributeName, elementAttributes[attributeName]);
        }
    }

    // Set CSS class(es) on the element
    addClassToElement(newElement, elementClass);

    // Set content of element, if specified
    if (getIsValidArray(elementText)) {
        // If type is a list and text is an array, build list items
        if ((elementType == 'ul') || (elementType == 'ol')) {
            for (const listItemText of elementText) {
                const newListItem = document.createElement("li");
                setElementContent(newListItem, listItemText, allowHTML);
                newElement.appendChild(newListItem);
            }
        }
        // If type is a select form element and text is an array, build select option list
        else if (elementType == 'select') {
            for (const optionItemText of elementText) {
                const [optValue, optLabel, optGroup] = optionItemText.split('|');
                const newOptionItem = document.createElement("option");

                setElementContent(newOptionItem, (optLabel ?? optValue), allowHTML);
                newOptionItem.value = optValue;

                if (optGroup !== undefined) {
                    let optionGroup = newElement.querySelector(`optgroup[label="${optGroup}"]`);
                    if ((optionGroup === undefined) || (optionGroup === null)) {
                        optionGroup = document.createElement("optgroup");
                        optionGroup.label = optGroup;
                        newElement.appendChild(optionGroup);
                    }
                    optionGroup.appendChild(newOptionItem);
                }
                else {
                    newElement.appendChild(newOptionItem);
                }
            }
        }
        else {
            setElementContent(newElement, elementText[0], allowHTML);
        }
    }
    else if (getIsValidText(elementText, 1)) {
        if (elementType == 'img') {
            newElement.alt = elementText;
        }
        else {
            setElementContent(newElement, elementText, allowHTML);
        }
    }


    // Append to parent, if set
    if ((parentElement !== undefined) && (parentElement !== null)) {
        parentElement.appendChild(newElement);
    }
    return newElement;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
// Sets the content of an element as text or HTML depending on the allowHTML parameter. 
export function setElementContent(element, content, allowHTML) {
    if (allowHTML) {
        element.innerHTML = content;
    }
    else {
        element.innerText = content;
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
// Add CSS class(es) to a DOM element
export function addClassToElement(targetElement, classesToAdd) {
    if ((targetElement !== undefined) && (targetElement !== null)) {
        if (classesToAdd.length > 0) {
            if (Array.isArray(classesToAdd)) {
                targetElement.classList.add(...classesToAdd);
            }
            else if (getIsValidText(classesToAdd)) {
                targetElement.classList.add(classesToAdd);
            }
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////
// Utility to determine if a text variable has been set and assigned a value.
export function getIsValidText(text, lengthLimit = 1) {
    return ((text !== undefined) && (text !== null) && (text.length !== undefined) && (text.length >= lengthLimit));
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
// Kontrollera om angiven parameter är ett giltigt nummer
export function getIsValidNumber(number) {
    return (number !== undefined) && (number !== null) && !isNaN(number);
}


///////////////////////////////////////////////////////////////////////////////////////////
// Utility to determine if a variable is an array with content
export function getIsValidArray(arr, lengthLimit = 1) {
    return ((arr !== undefined) && (arr !== null) && (Array.isArray(arr)) && (arr.length !== undefined) && (arr.length >= lengthLimit));
}


///////////////////////////////////////////////////////////////////////////////////////////
//  Utility to determine if a variable is an object with properties set
export function getIsValidObject(obj, requiredProperties = 1) {
    return ((obj !== undefined) && (obj !== null) && (typeof obj == "object") && (Object.keys(obj).length >= requiredProperties));
}