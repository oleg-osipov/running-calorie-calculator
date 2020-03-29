export function displayCalculationResults(data) {
  //Information Section
  let informationSection = document.querySelector('.information-section');

  while (informationSection.firstChild) {
    informationSection.removeChild(informationSection.firstChild);
  }

  let i;
  for (i in data) {
    //create infoCard container
    const infoCardContainer = document.createElement('div');
    const dataUnitName = i;
    infoCardContainer.className = `col-6 col-xl-3 container--${dataUnitName}`;

    //create infoCard
    const infoCard = document.createElement('div');
    infoCard.className = `neumorphic-info-card ${dataUnitName}`;

    //Icon Container
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';

    //Create icon element
    const iconElement = document.createElement('i');

    //SVG//
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

    const iconNames = {
      'BMR-value': 'icon-calories-day',
      'Estimated distance': 'icon-distance',
      'Estimated time': 'icon-stopwatch',
      'Burned energie': 'icon-calories',
      'MET(total)': 'icon-met-rate'
    };

    //The id of the symbol element in svg-sprite file is the same as the value for xlink:href
    let useHref = `#icon_sprite_${iconNames[i]}`;
    useElem.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      `${useHref}`
    );
    svgElement.appendChild(useElem);

    //Append svgElement into iconElement
    iconElement.appendChild(svgElement);

    //Append icon in iconContainer
    iconContainer.appendChild(iconElement);

    //Append iconContainer into infoCard
    infoCard.appendChild(iconContainer);

    //DATA//
    const dataContainer = document.createElement('div');
    dataContainer.className = 'data-container';

    //data unit
    const dataUnit = document.createElement('div');
    dataUnit.className = 'data-unit';
    const dataContent = document.createElement('span');
    dataContent.textContent = `${data[i]}`;
    dataUnit.appendChild(dataContent);

    //data name
    const dataName = document.createElement('div');
    dataName.className = 'data-name';
    const dataParagraph = document.createElement('p');
    dataParagraph.textContent = `${dataUnitName}`;
    dataName.appendChild(dataParagraph);

    //Append dataName and dataUnit into dataContainer
    dataContainer.appendChild(dataUnit);
    dataContainer.appendChild(dataName);

    //Append data-container into InfoCard
    infoCard.appendChild(dataContainer);

    //Append InfoCard into its Container
    infoCardContainer.appendChild(infoCard);

    //Append InfoCard into its Container
    infoCardContainer.appendChild(infoCard);

    //Append InfoCardContainer into document
    informationSection.appendChild(infoCardContainer);
  }
  return data;
}
