export default function rangeSlider() {
  const rangeSliderBar = document.getElementById('rangeSlider');
  const metValue = document.getElementById('metValue');
  const sliderValueInfo = document.querySelector('.range-slider--value');

  //running speed km/h:MET-value
  const runningSpeedAndMetValue = {
    ' 6.4': 6,
    ' 8': 8.3,
    ' 8.4': 9,
    ' 9.7': 9.8,
    ' 10.8': 10.5,
    ' 11.3': 11,
    ' 12.1': 11.5,
    ' 12.9': 11.8,
    ' 13.8': 12.3,
    ' 14.5': 12.8,
    ' 16.1': 14.5,
    ' 17.7': 16,
    ' 19.3': 19,
    ' 20.9': 19.8,
    ' 22.5': 23
  };

  //Object into Array
  const convertObjectToArray = function(obj) {
    const newArray = [];

    for (let key in obj) {
      newArray.push([key, obj[key]]);
    }
    return newArray;
  };
  const runningSpeedArray = convertObjectToArray(runningSpeedAndMetValue);

  //set max value to range-slider
  rangeSliderBar.setAttribute('max', runningSpeedArray.length - 1);

  //display start value in info-fild
  sliderValueInfo.innerHTML = runningSpeedArray[0][0];

  //display start value in MET-input-fild
  metValue.value = runningSpeedArray[0][1];

  //add eventListener to the slider
  rangeSliderBar.addEventListener('input', displayCurrentValue);

  //display current values in the runningSpeed and MET filds
  function displayCurrentValue(event) {
    sliderValueInfo.innerHTML =
      runningSpeedArray[parseInt(event.target.value)][0];
    metValue.value = runningSpeedArray[parseInt(event.target.value)][1];
  }
}
const rangeSliderInstance = rangeSlider;
export { rangeSliderInstance };
