var app = app || {};
app.main = (function(window,document) {
  var _skyConditions, _weatherConditions;
  var self = {
    handleWeatherUpdate: function(metar) {
      _skyConditions = metar.metar.conditions.skyConditions;
      _weatherConditions = metar.metar.conditions.weatherConditions;

      console.log(metar);

      for (var i = 0; i < _skyConditions.length; i++) {
        switch(_skyConditions[i].coverage) {
          case "Sky clear":
          case "No significant clouds":
          case "Clear":
            break;

          case "Few clouds":
          case "Scattered clouds":
          case "Broken clouds":
            break;

          case "Overcast":
            break;

          case "Vertical Visibility":
            break;
        }
      };

      for (var i = 0; i < _weatherConditions.length; i++) {
        switch(_weatherConditions[i].phenomenon) {
          case "Drizzle":
          case "Rain":

          case "Mist":
          case "Spray":
            break;

          case "Snow":

          case "Snow grains":
            break;

          case "Hail":
          case "Ice pellets":
          case "Ice crystals":
          case "Small hail":
            break;

          case "Fog":
            break;

          case "Dust/sand whirls":
          case "Dust storm":
          case "Haze":
          case "Smoke/fumes":
          case "Sand" :
          case "Sand storm":
          case "Volcanic ash":
          case "Widespread dust":
            break;

          case "Funnel cloud":
            break;

          case "Squalls":
            break;

          case "Unknown precipitation":
            break;
        }
      };
    }
  };

  return self;
})(this,this.document);

$(document).ready(function() {
  var debugMetar = {"request":{"url":"https://api.flightstats.com/flex/weather/rest/v1/json/metar/EWR","airport":{"requestedCode":"EWR","fsCode":"EWR"},"codeType":{}},"metar":{"report":"KEWR 221551Z 23007KT 6SM BR BKN008 OVC041 11/09 A3014 RMK AO2 RAE49 SLP206 CIG 007V010 P0002 T01060094","reportTime":"2013-11-22T15:51:00.000Z","weatherStationIcao":"KEWR","tags":[{"key":"Freezing","value":"3"},{"key":"Instrumentation","value":"VFR"},{"key":"Prevailing Conditions","value":"Cloudy"}],"conditions":{"wind":{"direction":230,"directionIsVariable":false,"speedKnots":"7.00"},"visibility":{"miles":"6.00","lessThan":false,"cavok":false},"weatherConditions":[{"phenomenon":"Mist","intensity":"Moderate"}],"skyConditions":[{"coverage":"Broken clouds","base":800},{"coverage":"Overcast","base":4100}],"pressureInchesHg":"30.14"},"temperatureCelsius":"10.60","dewPointCelsius":"9.40","runwayVisualRanges":[],"obscurations":[],"noSignificantChange":false},"appendix":{"airports":[{"fs":"EWR","iata":"EWR","icao":"KEWR","faa":"EWR","name":"Newark Liberty International Airport","street1":"Building 1, Conrad Road","street2":"","city":"Newark","cityCode":"EWR","stateCode":"NJ","postalCode":"07114","countryCode":"US","countryName":"United States","regionName":"North America","timeZoneRegionName":"America/New_York","weatherZone":"NJZ006","localTime":"2013-11-22T11:35:32.988","utcOffsetHours":-5.0,"latitude":40.689071,"longitude":-74.178753,"elevationFeet":18,"classification":1,"active":true,"delayIndexUrl":"https://api.flightstats.com/flex/delayindex/rest/v1/json/airports/EWR?codeType=fs"}]}};
  app.main.handleWeatherUpdate(debugMetar);
});

/*

weatherConditions:

"Drizzle"
"Rain"
"Mist"
"Spray"

"Snow"
"Snow grains"

"Hail"
"Ice pellets"
"Ice crystals"
"Small hail"

"Fog"

"Dust/sand whirls"
"Dust storm"
"Haze"
"Smoke/fumes"
"Sand" 
"Sand storm"
"Volcanic ash"
"Widespread dust"

"Funnel cloud"

"Squalls"

"Unknown precipitation"


skyConditions: 

"Sky clear"
"No significant clouds"
"Clear"

"Few clouds",
"Scattered clouds"
"Broken clouds"

"Overcast"

"Vertical Visibility"

*/












