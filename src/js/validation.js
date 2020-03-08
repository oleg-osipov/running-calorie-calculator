export default function validateInputData() {
  //VALIDATION
  //inputs

  const age = document.getElementById('age');
  const weight = document.getElementById('height');
  const height = document.getElementById('weight');
  const runningSpeed = document.getElementById('rangeSlider');
  const metValue = document.getElementById('metValue');
  const exerciseDuration = document.getElementById('duration');
  const marathonRunning = document.getElementById('marathonRunning');

  //Buttons
  //const calculateButton = document.getElementById('calcButton');

  //Fields to validate as an array
  const inputsToValidateArr = [age, weight, height, metValue, exerciseDuration];

  //Add eventListener to botton "COMPUTE"
  //calculateButton.addEventListener('click', validateForm);

  //Inactive fields when option "Running marathon" is on
  const inactiveFieldsArr = [
    runningSpeed.parentElement.parentElement,
    metValue.parentElement.parentElement,
    exerciseDuration.parentElement.parentElement
  ];

  //Add eventListener to checkbox - marathonRunning
  marathonRunning.addEventListener('input', checkOptionRunningMarathon);

  //Add eventListener to all input fields
  function observeInputs() {
    inputsToValidateArr.forEach(input => {
      input.addEventListener('focusout', function(e) {
        validateField(e.target);
      });
    });
  }
  //Disable some input fields when option "Running marathon" is on
  function checkOptionRunningMarathon() {
    switch (marathonRunning.checked) {
      case true: {
        //disable inputs
        inactiveFieldsArr.forEach(function(elem) {
          //disable input fields
          elem.classList.add('disabled');
          elem.children[0].querySelector('input').setAttribute('disabled', '');
        });
        return true;
      }
      case false: {
        //enable inputs if they are disabled
        inactiveFieldsArr.forEach(function(elem) {
          //enable input fields
          elem.classList.remove('disabled');
          elem.children[0].querySelector('input').removeAttribute('disabled');
        });
        return false;
      }
    }
  }

  function validateForm() {
    let valid = true;
    if (checkOptionRunningMarathon()) {
      for (let i = 0; i < inputsToValidateArr.length - 2; i++) {
        validateField(inputsToValidateArr[i]);
        if (validateField(inputsToValidateArr[i]) !== true) {
          valid = false;
          return valid;
        }
      }
    } else {
      inputsToValidateArr.forEach(element => {
        validateField(element);
        if (validateField(element) !== true) {
          valid = false;
          return valid;
        }
      });
    }
    return valid;
  }

  function validateField(inputField) {
    //check if empty
    if (checkIfEmpty(inputField)) return false;

    //check if it contains only numbers
    if (checkIfOnlyNumbers(inputField)) return true;
    return true;
  }

  function checkIfEmpty(inputField) {
    if (fieldIsEmpty(inputField.value.trim())) {
      //set field invalide
      const errorMessage = `"${inputField.name}" can't be empty`;
      setInvalid(inputField, errorMessage);
      return true;
    } else {
      //set field valide
      setValid(inputField);
      return false;
    }
  }

  //check if the field contains only numbers
  function checkIfOnlyNumbers(inputField) {
    const regExpMetFieldOnly = /^[0-9]+.[1-9]{0,1}$/;
    const regExp = /^[0-9]*$/;
    const errorMessage = `"${inputField.name}" must contain only a number`;

    const valueAsNumber = Math.floor(inputField.value);

    if (regExp.test(inputField.value)) {
      setValid(inputField);
      return true;
    } else {
      if (
        inputField.id === 'metValue' &&
        regExpMetFieldOnly.test(inputField.value)
      ) {
        setValid(inputField);
        return true;
      } else {
        setInvalid(inputField, errorMessage);
        return false;
      }
    }
  }

  //check if field is empty and not "0"
  function fieldIsEmpty(value) {
    const regExpZero = /^[0]*$/;

    if (value === '' || regExpZero.test(value)) return true;
    else return false;
  }

  //set field to valid
  function setValid(field) {
    deleteErrorMessage(field);
    if (field.classList.contains('invalid')) {
      field.classList.remove('invalid');
    } else return;
  }

  //set field to invalid
  function setInvalid(field, messsage) {
    createErrorMessage(field, messsage);
    if (field.classList.contains('invalid')) {
      return;
    } else {
      field.classList.add('invalid');
    }
  }

  //create error message
  function createErrorMessage(field, errorMessage) {
    //create a span element with error mesagge
    const elementErrorMessage = document.createElement('span');
    elementErrorMessage.className = `validation-error--${field.id}`;
    elementErrorMessage.textContent = `${errorMessage}`;

    deleteErrorMessage(field);
    field.nextElementSibling.nextElementSibling.appendChild(
      elementErrorMessage
    );
  }

  //delete error message
  function deleteErrorMessage(field) {
    field.nextElementSibling.nextElementSibling.innerHTML = '';
  }
  observeInputs();
  // return validateForm;
  return validateForm;
}
