console.log('Loading data...');

let table;

//const xPosAxis1 = 20; // px
//const xPosAxis2 = 500; // px

// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, 1000);
  background(0,105,148);

  // count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('current_city'));

  let city = table.getColumn('current_city');
  let lat = table.getColumn('Latitude');
  let lng = table.getColumn('Longitude');

  console.log(city);
    
  for (let i = 0; i < table.getRowCount(); i++) {
    let mapLng = map(lng[i],-180,180, 0, windowWidth);
    let mapLat = map (lat[i],-90,90, 2000, 0);

    fill('green');
    noStroke();
    ellipse(mapLng, mapLat,10);
  
    //position = i*200+80;
    
    drawName(city[i], mapLng, mapLat); 
  }

  function drawName(city, mapLng, mapLat) {
    fill('black');
    let label = `${city}`;
    text(label, mapLng + 10, mapLat + 5);
  
  }


}