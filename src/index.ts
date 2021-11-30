/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import "./style.css";

// This example creates a simple polygon representing the Bermuda Triangle.
// When the user clicks on the polygon an info window opens, showing
// information about the polygon's coordinates.

let map: google.maps.Map;

let infoWindow: google.maps.InfoWindow;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 13,
    center: { lat: 32.1014825, lng: 34.782682 },
    mapTypeId: "terrain",
  });

  // Define the LatLng coordinates for the polygon.
  const triangleCoords: google.maps.LatLngLiteral[] = [
    {
      lng: 34.78620061317322,
      lat: 32.11185278021274,
    },
    {
      lng: 34.819846243056034,
      lat: 32.111125781110424,
    },
    {
      lng: 34.81272229591248,
      lat: 32.07818665188455,
    },
    {
      lng: 34.77100858131287,
      lat: 32.08073204103995,
    },
  ];

  const inner = [
    {
      lng: 34.79529859765573,
      lat: 32.10191656927414,
    },
    {
      lng: 34.783458393437975,
      lat: 32.090723114836706,
    },
    {
      lng: 34.8058756574027,
      lat: 32.0960981777339,
    },
    {
      lng: 34.80354065623373,
      lat: 32.101045544650034,
    },
  ];

  // Construct the polygon.
  const bermudaTriangle = new google.maps.Polygon({
    paths: [triangleCoords, inner],
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    geodesic: true,
    editable: true,
    draggable: true,
  });

  bermudaTriangle.setMap(map);

  // Add a listener for the click event.
  bermudaTriangle.addListener("click", showArrays);

  map.addListener("click", mapClicked);

  infoWindow = new google.maps.InfoWindow();
}

let clickedPos: any = [];

function mapClicked(event: any) {
  let clicked: any = {};
  clicked.lng = event.latLng.lng();
  clicked.lat = event.latLng.lat();
  clickedPos.push(clicked);
  if (clickedPos.length === 4) {
    console.log(clickedPos);
    const bermudaTriangle = new google.maps.Polygon({
      paths: clickedPos,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      geodesic: true,
      editable: true,
      draggable: true,
    });
    bermudaTriangle.setMap(map);
    bermudaTriangle.addListener("click", showArrays);
    clickedPos = [];
  }
}

function showArrays(event: any) {
  // Since this polygon has only one path, we can call getPath() to return the
  // MVCArray of LatLngs.
  // @ts-ignore
  const polygon = this as google.maps.Polygon;
  const vertices = polygon.getPath();

  let contentString =
    "<b>Bermuda Triangle polygon</b><br>" +
    "Clicked location: <br>" +
    event.latLng.lat() +
    "," +
    event.latLng.lng() +
    "<br>";

  // Iterate over the vertices.
  contentString += "{";
  contentString += "<br>";

  let clickedPos2: any = [];
  for (let i = 0; i < vertices.getLength(); i++) {
    const xy = vertices.getAt(i);

    let clicked: any = {};
    clicked.lng = xy.lng();
    clicked.lat = xy.lat();

    clickedPos2.push(clicked);
    contentString += "    ";
    contentString += xy.lat() + "," + xy.lng();
    contentString += "<br>";
  }
  contentString += "}";
  console.log(clickedPos2);
  clickedPos2 = [];

  // Replace the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);

  infoWindow.open(map);
}
export { initMap };
