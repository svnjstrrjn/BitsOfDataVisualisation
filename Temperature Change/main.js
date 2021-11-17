async function readJson(path) {
  const response = await fetch(path);
  const data = await response.json();
  return data;
}

async function init() {
  // json file generated with https://csvjson.com/csv2json
  const data = await readJson('future_cities_data.json');
  let sourceData = data.map((d) => {
    return {
      cityName: d['current_city'],
      annualMeanTemperature: d['Annual_Mean_Temperature'],
      annualMeanTemperatureFuture: d['future_Annual_Mean_Temperature'],
    };
  });

  console.log('sourceData: ', sourceData);

  const Xdisplacement = 155;
  const circlesXcoordinate = 150;
  const circlesYcoordinate = 100;
  const dataValueScaling = 2;

  // Create canvas
  const svg = d3 // Variable linking to D3 library
    .select('#d3') // Selects ID from html file
    .append('svg') // Creates svg
    .attr("width", sourceData.length * Xdisplacement) // Width of svg
    .attr("height", sourceData.length * Xdisplacement); // Height of svg

  // enters data into function
  const circlesAnnual = svg.selectAll('circlesAnnual').data(sourceData).enter();
  const circlesFuture = svg.selectAll('circlesFuture').data(sourceData).enter();
  const textLabel = svg.selectAll('textLabel').data(sourceData).enter();
  const textLabelY = svg.selectAll('textLabel').data(sourceData).enter();
  const lines = svg.selectAll('lines').data(sourceData).enter();


//draw lines between the cold and warm circles 
lines
.append('line')
.style("stroke", 'purple')
.style("stroke-width", 4)
.attr("x1", circlesXcoordinate)
.attr("y1",(value,index) => {
  return index * Xdisplacement + circlesYcoordinate ;
 })
.attr("x2", (value,index) => {
  return index * Xdisplacement + circlesXcoordinate;
 })
.attr("y2",circlesYcoordinate);
 
  // Creates circles for future annual mean temperature
  circlesAnnual
    .append('circle')
    .attr('cx', circlesXcoordinate)
    .attr('cy', (value, index) => {
      return index * Xdisplacement + circlesYcoordinate;
    })
    .attr('r', (value, index) => {
      return value.annualMeanTemperatureFuture * dataValueScaling;
    })
    .attr('id', 'colorSecondary');

  // Creates circles for annual mean temperature
  circlesFuture
    .append('circle')
    .attr('cx', (value, index) => {
      return index * Xdisplacement + circlesXcoordinate;
    })
    .attr('cy', circlesYcoordinate)
    .attr('r', (value, index) => {
      return value.annualMeanTemperature * dataValueScaling;
    })
    .attr('id', 'colorMain');

  // Create text labels
  textLabel
    .append('text')
    .attr('x', (value, index) => {
      return index * Xdisplacement + circlesXcoordinate;
    })
    .attr('y', circlesYcoordinate)
    .attr('id', 'colorSecondary')
    .text((value, index) => {
      return value.cityName;
    })

    textLabelY
    .append('text')
    .attr('y', (value, index) => {
      return index * Xdisplacement + circlesYcoordinate;
    })
    .attr('x', circlesXcoordinate)
    .attr('id', 'colorMain')
    .text((value, index) => {
      return value.cityName;
    })
}


init();