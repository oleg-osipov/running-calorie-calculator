export default function toggleSwitch() {
  //HANDLE CHECKBOX - GENDER
  //toogle buttton - genders
  const checkboxGenders = document.getElementById('gendersToggleCheckbox');
  const genderSymbolFemale = document.querySelector('.gender--symbol.female');
  const genderSymbolMale = document.querySelector('.gender--symbol.male');

  //event listener on checkbox
  checkboxGenders.addEventListener('change', heilightActiveGenderSymbol, false);

  function heilightActiveGenderSymbol(event) {
    const checkBox = event.target;
    if (checkBox.checked) {
      genderSymbolFemale.classList.remove('active');
      genderSymbolMale.classList.add('active');
    } else {
      genderSymbolFemale.classList.add('active');
      genderSymbolMale.classList.remove('active');
    }
  }
}

export const copyToggleSwitch = toggleSwitch();
