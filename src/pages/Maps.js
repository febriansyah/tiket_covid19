import React, { useEffect, useState, useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = 'https://api.tiketsafe.com/api/v1/';
const headers = {
    "Access-Control-Allow-Origin": "*"
}

am4core.useTheme(am4themes_animated);

let listWorldMap = [];

const Maps = (props) => {
    const history = useHistory();
    const { homeZoomLevel } = props;

    const [listAllowedCountry, setListAllowedCountry] = useState([]);
    const [listEntryProhibited, setListEntryProhibited] = useState([]);
    const [listPartiallyProhibited, setListPartiallyProhibited] = useState([]);

    const [covid_world_timeline, set_covid_world_timeline] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: proxyurl + 'https://covid.amcharts.com/data/js/world_timeline.js',
            headers
        })
        .then(res => {
            let data = res.data.replace(/\s/g, '').split('=')[1];
            let arrData = JSON.parse(data);
            let result = [];
            
            if (Array.isArray(arrData)) {
                result = arrData[arrData.length - 1];
            }

            set_covid_world_timeline(result);
        })
    }, [])

    useEffect(() => {
        if (covid_world_timeline) {
            getCountryStatus('1');
            getCountryStatus('2');
            getCountryStatus('3');
        }
    }, [covid_world_timeline])

    const getCountryStatus = (n) => {
        axios({
            type: 'get',
            url: proxyurl + apiUrl + `country-status?status=${n}`,
            headers
        })
        .then(res => {
            if (res.data.status === 'success' && Array.isArray(res.data.data)) {
                covid_world_timeline.list.map((i) => {
                    res.data.data.map((e) => {
                        if (i.id === e.id) {
                            listWorldMap.push({
                                ...e,
                                ...i,
                                color: n === '1' ? '#02ac32' : n === '2' ? '#fedd00' : '#e20019'
                            });
                        }
                    })
                })
                
                if (n === '1') {
                    setListAllowedCountry(res.data.data);
                } else if (n === '2') {
                    setListEntryProhibited(res.data.data);
                } else if (n === '3') {
                    setListPartiallyProhibited(res.data.data);
                }
            }
        })
    }

    useLayoutEffect(() => {
        let chart = am4core.create("chart", am4maps.MapChart);

        chart.geodata = am4geodata_worldLow;
		chart.projection = new am4maps.projections.Miller();
		chart.homeZoomLevel = homeZoomLevel;
        chart.homeGeoPoint = { longitude: 10, latitude: 52 };

        let listData = [];

        listWorldMap.forEach((e) => {
            listData.push({
                "name": "Info Covid-19",
                "color": e.color,
                "data": [e]
              })
        })

        console.log(listData, 'listData');
        
        // This array will be populated with country IDs to exclude from the world series
        let excludedCountries = [];
        
        // Create a series for each group, and populate the above array
        listData.forEach(function(group) {
            let series = chart.series.push(new am4maps.MapPolygonSeries());
  
            series.name = group.name;
            series.useGeodata = true;
  
            let includedCountries = [];
  
            group.data.forEach(function(country) {
              includedCountries.push(country.id);
              excludedCountries.push(country.id);
            });
  
            series.include = includedCountries;
            series.fill = am4core.color(group.color);
            
            // By creating a hover state and setting setStateOnChildren to true, when we
            // hover over the series itself, it will trigger the hover SpriteState of all
            // its countries (provided those countries have a hover SpriteState, too!).
            series.setStateOnChildren = true;
            series.calculateVisualCenter = true;
            // Country shape properties & behaviors
            let mapPolygonTemplate = series.mapPolygons.template;
            // Instead of our custom title, we could also use {name} which comes from geodata  
            mapPolygonTemplate.fill = am4core.color(group.color);
            mapPolygonTemplate.fillOpacity = 0.8;
            mapPolygonTemplate.nonScalingStroke = true;
            mapPolygonTemplate.tooltipPosition = "fixed"
          
            mapPolygonTemplate.events.on("over", function(event) {
              series.mapPolygons.each(function(mapPolygon) {
                mapPolygon.isHover = true;
              })
              event.target.isHover = false;
              event.target.isHover = true;
            })
          //   mapPolygonTemplate.events.on("hit", function(event) {
          // 	series.mapPolygons.each(function(mapPolygon) {
          // 	  var data=event.target.dataItem.dataContext;
          // 	  //console.log(JSON.parse(data.customData));
          // 	  console.log(JSON.parse(JSON.stringify(data.name)));
          // 	})
          //   })
          mapPolygonTemplate.events.on("hit", function(event) {
              series.mapPolygons.each(function(mapPolygon) {
              //   console.log(mapPolygon, 'mapPolygon');
              })
  
              let data = event.target.dataItem.dataContext;
              console.log(data, 'data', props);
  
              history.push({ pathname: '/SearchResult', state: { data } });
            
            })
  
            mapPolygonTemplate.events.on("out", function(event) {
              series.mapPolygons.each(function(mapPolygon) {
                mapPolygon.isHover = false;
              })
            })
          
            // States  
            let hoverState = mapPolygonTemplate.states.create("hover");
            hoverState.properties.fill = am4core.color("#CC0000");
          
            // Tooltip
            mapPolygonTemplate.tooltipText = "{title} confirmed = {confirmed}"; // enables tooltip
            // series.tooltip.getFillFromObject = false; // prevents default colorization, which would make all tooltips red on hover
            // series.tooltip.background.fill = am4core.color(group.color);
          
            // MapPolygonSeries will mutate the data assigned to it, 
            // we make and provide a copy of the original data array to leave it untouched.
            // (This method of copying works only for simple objects, e.g. it will not work
            //  as predictably for deep copying custom Classes.)
            series.data = JSON.parse(JSON.stringify(group.data));
          });
          
          // The rest of the world.
          let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
          let worldSeriesName = "world";
          worldSeries.name = worldSeriesName;
          worldSeries.useGeodata = true;
          worldSeries.exclude = excludedCountries;
          worldSeries.fillOpacity = 0.8;
          worldSeries.hiddenInLegend = true;
          worldSeries.mapPolygons.template.nonScalingStroke = true;
          
          
          // // Create map polygon series
          // let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
          // polygonSeries.useGeodata = true;
          // polygonSeries.states.create("hover").properties.fill = am4core.color("#367B25");
          // let polygonTemplate = polygonSeries.mapPolygons.template;
          // polygonTemplate.tooltipText = "{name}";
          // var namanya = "{name}";
          
          // //polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
          // polygonSeries.mapPolygons.template.nonScalingStroke = true;
          // polygonSeries.events.on("hit", function(ev) {
          //   console.log(ev.target.dataItem.dataContext);
          //   ev.target.chart.zoomToMapObject(ev.target);
          // })
          
          // polygonSeries.exclude = ["AQ"];
          
          
          // chart.zoomControl = new am4maps.ZoomControl();
          
          
          //polygonTemplate.fill = chart.colors.getIndex(0);
          
          // Create hover state and set alternative fill color
          // let hs = polygonTemplate.states.create("hover");
          // hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);
          
          
          // Add line bullets
          let cities = chart.series.push(new am4maps.MapImageSeries());
          cities.mapImages.template.nonScaling = true;
          
          let city = cities.mapImages.template.createChild(am4core.Circle);
          city.radius = 6;
          city.fill = chart.colors.getIndex(0).brighten(-0.2);
          city.strokeWidth = 2;
          city.stroke = am4core.color("#fff");
          
          function addCity(coords, title) {
            //   let city = cities.mapImages.create();
            //   city.latitude = coords.latitude;
            //   city.longitude = coords.longitude;
            //   city.tooltipText = title;
            //   return city;
          }
          
          let chine = addCity({ "latitude": 35.0000, "longitude": 103.0000 }, "Chine");
          let jakarta = addCity({ "latitude": -6.200000, "longitude": 106.816666 }, "Jakarta");
          
          // Add lines
          let lineSeries = chart.series.push(new am4maps.MapArcSeries());
          lineSeries.mapLines.template.line.strokeWidth = 2;
          lineSeries.mapLines.template.line.strokeOpacity = 0.5;
          lineSeries.mapLines.template.line.stroke = city.fill;
          lineSeries.mapLines.template.line.nonScalingStroke = true;
          lineSeries.mapLines.template.line.strokeDasharray = "1,1";
          lineSeries.zIndex = 10;
          
          let shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
          shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
          shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
          shadowLineSeries.mapLines.template.shortestDistance = false;
          shadowLineSeries.zIndex = 5;
          
          function addLine(from, to) {
            //   let line = lineSeries.mapLines.create();
            //   line.imagesToConnect = [from, to];
            //   line.line.controlPointDistance = -0.3;
          
            //   let shadowLine = shadowLineSeries.mapLines.create();
            //   shadowLine.imagesToConnect = [from, to];
          
            //   return line;
          }
          
          addLine(chine, jakarta);
          
          
          // Add plane
        //   let plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
        //   plane.position = 0;
        //   plane.width = 48;
        //   plane.height = 48;
          
        //   plane.adapter.add("scale", function(scale, target) {
        //       return 0.5 * (1 - (Math.abs(0.5 - target.position)));
        //   })
          
        //   let planeImage = plane.createChild(am4core.Sprite);
        //   planeImage.scale = 0.08;
        //   planeImage.horizontalCenter = "middle";
        //   planeImage.verticalCenter = "middle";
        //   planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
        //   planeImage.fill = "#0079D8";
        //   planeImage.strokeOpacity = 0;
          
        //   let shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
        //   shadowPlane.position = 0;
        //   shadowPlane.width = 48;
        //   shadowPlane.height = 48;
          
        //   let shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
        //   shadowPlaneImage.scale = 0.05;
        //   shadowPlaneImage.horizontalCenter = "middle";
        //   shadowPlaneImage.verticalCenter = "middle";
        //   shadowPlaneImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
        //   shadowPlaneImage.fill = am4core.color("#000");
        //   shadowPlaneImage.strokeOpacity = 0;
          
        //   shadowPlane.adapter.add("scale", function(scale, target) {
        //       target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
        //       return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
        //   })
          
          // Plane animation
          let currentLine = 0;
          let direction = 1;

          function flyPlane() {
            //   plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
            //   plane.parent = lineSeries;
            //   shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
            //   shadowPlane.parent = shadowLineSeries;
            //   shadowPlaneImage.rotation = planeImage.rotation;
          
            //   // Set up animation
            //   let from, to;
            //   let numLines = lineSeries.mapLines.length;
            //   if (direction == 1) {
            //       from = 0
            //       to = 1;
            //       if (planeImage.rotation != 0) {
            //           planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            //           return;
            //       }
            //   }
            //   else {
            //       from = 1;
            //       to = 0;
            //       if (planeImage.rotation != 180) {
            //           planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
            //           return;
            //       }
            //   }
          
            //   // Start the animation
            //   let animation = plane.animate({
            //       from: from,
            //       to: to,
            //       property: "position"
            //   }, 5000, am4core.ease.sinInOut);
            //   animation.events.on("animationended", flyPlane)
      
            //   shadowPlane.animate({
            //       from: from,
            //       to: to,
            //       property: "position"
            //   }, 5000, am4core.ease.sinInOut);
          
            //   currentLine += direction;
            //   if (currentLine < 0) {
            //       currentLine = 0;
            //       direction = 1;
            //   }
            //   else if ((currentLine + 1) > numLines) {
            //       currentLine = numLines - 1;
            //       direction = -1;
            //   }
          }
          
          flyPlane();

          if (typeof window.popupSlider !== 'undefined') {
              window.popupSlider();
          }
    }, [
        listAllowedCountry,
        listEntryProhibited,
        listPartiallyProhibited
    ])

    useEffect(() => {
        return () => {
            listWorldMap = [];
        }
    }, [])

    return (
        <div id='chart' style={{maxWidth: '100%', height: '250px'}} />
    )
}

Maps.propTypes = {
    homeZoomLevel: PropTypes.number,
};
  
Maps.defaultProps = {
    homeZoomLevel: 1.7,
};

export default Maps;