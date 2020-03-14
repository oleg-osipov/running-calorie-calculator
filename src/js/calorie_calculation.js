import validateInputData from './validation.js';
import { rangeSliderInstance } from './range_slider.js';
import { displayCalculationResults } from './showup_results.js';

export default function processData() {
  const form = document.getElementById('calcForm');
  const calculateButton = document.getElementById('calcButton');
  const saveButton = document.getElementById('saveButton');
  const clearButton = document.getElementById('clearButton');

  const validateForm = validateInputData();

  //FORM EVENT HANDLER
  form.addEventListener('click', event => {
    //Prevent default
    //event.preventDefault();

    switch (event.target.id) {
      case calculateButton.id: {
        if (validateForm() === true) {
          calculateCalories();
          activateButtonStore();
          // displayCalculationResults();
        }
        break;
      }
      case saveButton.id: {
        if (validateForm() === true) {
          storeData();
        }
        break;
      }
      case clearButton.id: {
        resetForm();
        break;
      }
    }
  });

  class Person {
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
      console.log(estimatedTime.toFixed(2) + ' min');

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
        console.log(' men');
        value1 = 88.362;
        value2 = 13.397;
        value3 = 4.799;
        value4 = 5.677;
        break;
      }
      case false: {
        //WOMEN
        console.log(' women');
        value1 = 447.593;
        value2 = 9.247;
        value3 = 3.098;
        value4 = 4.33;
        break;
      }
    }

    const athlete = new Person(
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

    //Run the footrace
    function runMarathon() {
      // console.log(athlete.runMarathon());
      return athlete.runMarathon();
    }

    //exercise
    function exercise() {
      return athlete.exercise();
      // console.log(athlete.exercise());
    }

    //do calculation
    form.marathonRunning.checked === true
      ? displayCalculationResults(runMarathon())
      : displayCalculationResults(exercise());
  }

  //Set attribute "enable" to saveButton
  function activateButtonStore() {
    saveButton.disabled = false;
  }

  //Store data
  function storeData() {
    console.log(' Storing the data...');
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
}
