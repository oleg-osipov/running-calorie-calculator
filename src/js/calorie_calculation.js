import validateInputData from './validation.js';
import { rangeSliderInstance } from './range_slider.js';
import { displayCalculationResults } from './showup_results.js';

export default function processData() {
  const form = document.getElementById('calcForm');
  const calculateButton = document.getElementById('calcButton');
  const saveButton = document.getElementById('saveButton');
  const clearButton = document.getElementById('clearButton');

  const validateForm = validateInputData();
  let calculationResult = '';

  //EventListener on load
  document.addEventListener('DOMContentLoaded', event => {
    LocalStorage.showData();
  });

  //FORM EVENT HANDLER
  form.addEventListener('click', event => {
    //Prevent default
    //event.preventDefault();

    switch (event.target.id) {
      case calculateButton.id: {
        if (validateForm() === true) {
          calculationResult = calculateCalories();
          activateButtonStore();
          scrollIntoView(document.querySelector('.information-section'));
        }
        break;
      }
      case saveButton.id: {
        if (validateForm() === true) {
          LocalStorage.addData(calculationResult);
          LocalStorage.showData();
          // scrollIntoView(document.querySelector('.information-section'));
        }
        break;
      }
      case clearButton.id: {
        resetForm();
        break;
      }
    }
  });

  class Runner {
    constructor(
      gender,
      age,
      height,
      weight,
      runningSpeed,
      metValue,
      excersizeDuration,
      value1,
      value2,
      value3,
      value4
    ) {
      this.gender = gender; //  checked=true - man / checked=false - woman
      this.age = parseInt(age);
      this.height = parseInt(height);
      this.weight = parseInt(weight);
      this.runningSpeed = parseFloat(runningSpeed);
      this.metValue = parseFloat(metValue);
      this.excersizeDuration = parseInt(excersizeDuration);
      // value1...value4 are used in The Revised Harris-Benedict Equation
      this.value1 = value1;
      this.value2 = value2;
      this.value3 = value3;
      this.value4 = value4;
    }

    //BMR - calories needed for 1 prerson/day
    calculateBMR() {
      const BMRvalue =
        this.value1 +
        this.value2 * this.weight +
        this.value3 * this.height -
        this.value4 * this.age;
      return BMRvalue;
    }

    //Calories needed for running a certain amount of time with a certain speed
    exercise() {
      let BMR = this.calculateBMR();

      //Speed
      const runningSpeed = this.runningSpeed;

      //Time
      const excersizeDuration = this.excersizeDuration;

      //Estimated distance
      let estimatedDistance = runningSpeed * (excersizeDuration / 60);

      //Estimated total MET value
      let estimatedTotalMETvalue = this.metValue * (excersizeDuration / 60);

      //Amount of calories burned
      let spentEnergie =
        Math.round((BMR * this.metValue) / 24) * (this.excersizeDuration / 60);

      return {
        'BMR-value': `${Math.round(BMR)}kcal`,
        'Estimated distance': `${estimatedDistance.toFixed(3)}km`,
        'Burned energie': `${Math.round(spentEnergie)}kcal`,
        'MET(total)': `${estimatedTotalMETvalue.toFixed(2)}mets`
      };
    }

    //Calories needed to complete a marathon whith a running speed ~15km/h
    runMarathon() {
      let BMR = this.calculateBMR();

      //MET value for marathon running
      const marathonMetValue = 13.3;

      const convertedWeightToLbs = this.weight * 2.2046;

      const weight = this.weight;

      //Marathon distance [miles]
      const marathonDistanceMiles = 26.22;

      //Marathon distance [km]
      const marathonDistanceKm = 42.195;

      //Average speed km/h
      const marathonAverageSpeed = 14.2;

      //Estimated time
      let estimatedTime = (marathonDistanceKm / marathonAverageSpeed) * 60;

      //Estimated total MET value
      let estimatedTotalMETvalueMarathon =
        marathonMetValue * (marathonDistanceKm / marathonAverageSpeed);

      //Energy Expenditure
      // (MET x body weight in kg x 3.5) / 200
      //const caloriesBurnedPerMinut;
      const spentEnergie = Math.round(
        ((BMR * marathonMetValue) / 24) * (estimatedTime / 60)
      );
      return {
        'BMR-value': `${Math.round(BMR)}kcal`,
        'Estimated time': `${estimatedTime.toFixed(2)}min`,
        'Burned energie': `${Math.round(spentEnergie)}kcal`,
        'MET(total)': `${estimatedTotalMETvalueMarathon.toFixed(2)}mets`
      };
    }
  }

  //There are 2 formulae used to calculate BMR, in [kcal / 24hrs] for men and women respectively:
  // The Revised Harris-Benedict Equation
  // Men BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age in years)
  // Women BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age in years)

  //Calculation
  function calculateCalories() {
    let value1;
    let value2;
    let value3;
    let value4;

    //formula values for men and women respectively
    switch (form.gendersToggleCheckbox.checked) {
      case true: {
        //MEN
        value1 = 88.362;
        value2 = 13.397;
        value3 = 4.799;
        value4 = 5.677;
        break;
      }
      case false: {
        //WOMEN
        value1 = 447.593;
        value2 = 9.247;
        value3 = 3.098;
        value4 = 4.33;
        break;
      }
    }

    const athlete = new Runner(
      form.gendersToggleCheckbox.checked,
      form.age.value,
      form.height.value,
      form.weight.value,
      form.querySelector('.range-slider--value').innerText,
      form.metValue.value,
      form.duration.value,
      value1,
      value2,
      value3,
      value4
    );

    //do calculation
    form.marathonRunning.checked === true
      ? (calculationResult = athlete.runMarathon())
      : (calculationResult = athlete.exercise());

    return displayCalculationResults(calculationResult);
  }

  //Set attribute "enable" to saveButton
  function activateButtonStore() {
    saveButton.disabled = false;
  }

  class LocalStorage {
    static getData() {
      let records;
      if (localStorage.getItem('record') === null) {
        records = [];
      } else {
        records = JSON.parse(localStorage.getItem('record'));
      }
      return records;
    }

    static showData() {
      const records = LocalStorage.getData();
      const calcResults = document.querySelector('.calculated-results-saved');

      //clear all data
      while (calcResults.firstChild) {
        calcResults.removeChild(calcResults.firstChild);
      }

      //hide  container if localStorage is empty
      if (Array.isArray(records) && !records.length) {
        calcResults.style.visibility = 'hidden';
      } else {
        calcResults.style.visibility = 'visible';
      }

      //list of records - container
      const listOfElements = document.createElement('div');
      listOfElements.className = 'list neumorphic-list';

      let dataItems = '';
      //Info item
      records.forEach(record => {
        for (const [key, value] of Object.entries(record)) {
          dataItems += `<p>${key}: ${value};`;
        }

        //record container
        const recordContainer = document.createElement('div');
        recordContainer.className = 'record-container';

        const recordElement = document.createElement('div');
        recordElement.className = 'record neumorphic-record';

        //SVG icon
        const deleteIcon = document.createElement('i');
        deleteIcon.id = 'deleteRecord';
        //Create svg element
        const svgElement = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg'
        );
        svgElement.classList.add('icon');

        const useElem = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'use'
        );

        //The id of the symbol element in svg-sprite file is the same as the value for xlink:href
        useElem.setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'xlink:href',
          `#icon_sprite_icon-trash-bin`
        );
        svgElement.appendChild(useElem);
        deleteIcon.appendChild(svgElement);

        recordElement.innerHTML = dataItems;
        //recordElement.appendChild(deleteIcon);

        recordContainer.appendChild(recordElement);
        recordContainer.appendChild(deleteIcon);

        //reset variable for next record
        dataItems = '';

        listOfElements.appendChild(recordContainer);
      });

      calcResults.appendChild(listOfElements);

      //Add evenrListener on dataList
      calcResults.querySelectorAll('.icon').forEach((elem, index) => {
        elem.addEventListener('click', event => {
          if (
            event.target === elem ||
            event.target === elem.firstElementChild
          ) {
            LocalStorage.deleteData(index, elem.parentElement.parentElement);
          } else {
            console.log('Somthing went wrong...');
          }
        });
      });
    }

    static addData(newRecord) {
      const records = LocalStorage.getData();
      if (!records.length) {
        records.push(newRecord);
      } else {
        records.forEach((record, index, records) => {
          if (JSON.stringify(record) === JSON.stringify(newRecord)) {
            records.splice(index, 1);
            return records;
          }
        });
        records.push(newRecord);
      }

      localStorage.setItem('record', JSON.stringify(records));
    }

    static deleteData(index, record) {
      const records = LocalStorage.getData();
      record.remove();
      records.splice(index, 1);

      localStorage.setItem('record', JSON.stringify(records));
    }
  }

  //Clear&reset data
  function resetForm() {
    form.querySelectorAll('input').forEach(field => {
      switch (field.id) {
        case 'age':
        case 'height':
        case 'weight':
        case 'duration': {
          field.value = '';
          if (field.classList.contains('invalid')) {
            field.classList.remove('invalid');
            //remove errorMessage
            field.nextElementSibling.nextElementSibling.innerHTML = '';
          }
          break;
        }
        //set checkbox in unchecked state & gender "female" active as default
        case 'gendersToggleCheckbox': {
          if (field.checked) {
            field.checked = false;
            field.parentElement.nextElementSibling
              .querySelector('.female')
              .classList.add('active');
            field.parentElement.previousElementSibling
              .querySelector('.male')
              .classList.remove('active');
          }
          break;
        }
        //set checkbox in unchecked state
        case 'marathonRunning': {
          if (field.checked) {
            field.checked = false;
            form
              .querySelectorAll('.section--exercise .data-unit')
              .forEach(element => {
                element.classList.remove('disabled');
                //delete attribute "disabled" from inputs
                element.children[0]
                  .querySelector('input')
                  .removeAttribute('disabled');
              });
          }
          break;
        }

        case 'rangeSlider': {
          field.value = 0;
          //reset rangeSlider
          rangeSliderInstance();
        }
      }
    });
  }

  function scrollIntoView(element) {
    // Scroll into view
    element.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
  }
}
