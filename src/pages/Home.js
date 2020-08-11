import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
  } from "react-router-dom";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import Maps from './Maps';

// am4core.useTheme(am4themes_animated);

const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
		  defaultLangnya: langnya == langDef ? langnya : 'id'
		};
	}
	// componentDidMount() {
	// 	let props = this.props;
	// 	var chart = am4core.create("chartdiv", am4maps.MapChart);

	// 	chart.geodata = am4geodata_worldLow;
	// 	chart.projection = new am4maps.projections.Miller();
	// 	chart.homeZoomLevel = 0;
	// 	chart.homeGeoPoint = { longitude: 10, latitude: 52 };
		
	// 	let groupData = [
	// 	  {
	// 		"name": "EU member before 2004",
	// 		"color": "#0bae54",
	// 		"data": [
	// 			{
	// 				"title": "Indonesia",
	// 				"id": "ID",
	// 				"customData": "1973"
	// 			}
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Joined at 2004",
	// 		"color": "#fedd00",
	// 		"data": [
	// 			{
	// 				"title": "Rusia",
	// 				"id": "RU",
	// 				"customData": "2004",
	// 				"groupId": "2004"
	// 			}
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Joined at 2007",
	// 		"color": "#e52424",
	// 		"data": [
	// 		  	{
	// 				"title": "China",
	// 				"id": "CN",
	// 				"customData": "2007",
	// 				"groupId": "2004"
	// 		  	}
	// 		]
	// 	  },
	// 	  {
	// 		"name": "Joined at 2013",
	// 		"color": chart.colors.getIndex(4),
	// 		"data": [
	// 		  {
	// 			"title": "Croatia",
	// 			"id": "HR",
	// 			"customData": "2013"
	// 		  }
	// 		]
	// 	  }
	// 	];
		
	// 	// This array will be populated with country IDs to exclude from the world series
	// 	let excludedCountries = ["AQ"];
		
	// 	// Create a series for each group, and populate the above array
	// 	groupData.forEach(function(group) {
	// 	  let series = chart.series.push(new am4maps.MapPolygonSeries());
<<<<<<< HEAD

	// 	  series.name = group.name;
	// 	  series.useGeodata = true;

	// 	  let includedCountries = [];

	// 	  group.data.forEach(function(country) {
	// 		includedCountries.push(country.id);
	// 		excludedCountries.push(country.id);
	// 	  });

	// 	  series.include = includedCountries;
	// 	  series.fill = am4core.color(group.color);
		  
	// 	  // By creating a hover state and setting setStateOnChildren to true, when we
	// 	  // hover over the series itself, it will trigger the hover SpriteState of all
	// 	  // its countries (provided those countries have a hover SpriteState, too!).
	// 	  series.setStateOnChildren = true;
	// 	  series.calculateVisualCenter = true;
	// 	  // Country shape properties & behaviors
	// 	  let mapPolygonTemplate = series.mapPolygons.template;
	// 	  // Instead of our custom title, we could also use {name} which comes from geodata  
	// 	  mapPolygonTemplate.fill = am4core.color(group.color);
	// 	  mapPolygonTemplate.fillOpacity = 0.8;
	// 	  mapPolygonTemplate.nonScalingStroke = true;
	// 	  mapPolygonTemplate.tooltipPosition = "fixed"
		
	// 	  mapPolygonTemplate.events.on("over", function(event) {
	// 		series.mapPolygons.each(function(mapPolygon) {
	// 		  mapPolygon.isHover = true;
	// 		})
	// 		event.target.isHover = false;
	// 		event.target.isHover = true;
	// 	  })
	// 	//   mapPolygonTemplate.events.on("hit", function(event) {
	// 	// 	series.mapPolygons.each(function(mapPolygon) {
	// 	// 	  var data=event.target.dataItem.dataContext;
	// 	// 	  //console.log(JSON.parse(data.customData));
	// 	// 	  console.log(JSON.parse(JSON.stringify(data.name)));
	// 	// 	})
	// 	//   })
	// 	mapPolygonTemplate.events.on("hit", function(event) {
	// 		series.mapPolygons.each(function(mapPolygon) {
	// 		//   console.log(mapPolygon, 'mapPolygon');
	// 		})

	// 		let data = event.target.dataItem.dataContext;
	// 		console.log(data, 'data', props);

	// 		props.history.push({ pathname: '/SearchResult', state: { data } });
		  
	// 	  })

	// 	  mapPolygonTemplate.events.on("out", function(event) {
	// 		series.mapPolygons.each(function(mapPolygon) {
	// 		  mapPolygon.isHover = false;
	// 		})
	// 	  })
		
	// 	  // States  
	// 	  let hoverState = mapPolygonTemplate.states.create("hover");
	// 	  hoverState.properties.fill = am4core.color("#CC0000");
		
	// 	  // Tooltip
	// 	  mapPolygonTemplate.tooltipText = "{title} joined EU at {customData}"; // enables tooltip
	// 	  // series.tooltip.getFillFromObject = false; // prevents default colorization, which would make all tooltips red on hover
	// 	  // series.tooltip.background.fill = am4core.color(group.color);
		
	// 	  // MapPolygonSeries will mutate the data assigned to it, 
	// 	  // we make and provide a copy of the original data array to leave it untouched.
	// 	  // (This method of copying works only for simple objects, e.g. it will not work
	// 	  //  as predictably for deep copying custom Classes.)
	// 	  series.data = JSON.parse(JSON.stringify(group.data));
	// 	});
		
	// 	// The rest of the world.
	// 	let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
	// 	let worldSeriesName = "world";
	// 	worldSeries.name = worldSeriesName;
	// 	worldSeries.useGeodata = true;
	// 	worldSeries.exclude = excludedCountries;
	// 	worldSeries.fillOpacity = 0.8;
	// 	worldSeries.hiddenInLegend = true;
	// 	worldSeries.mapPolygons.template.nonScalingStroke = true;
		
		
	// 	// // Create map polygon series
	// 	// let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
	// 	// polygonSeries.useGeodata = true;
	// 	// polygonSeries.states.create("hover").properties.fill = am4core.color("#367B25");
	// 	// let polygonTemplate = polygonSeries.mapPolygons.template;
	// 	// polygonTemplate.tooltipText = "{name}";
	// 	// var namanya = "{name}";
		
	// 	// //polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
	// 	// polygonSeries.mapPolygons.template.nonScalingStroke = true;
	// 	// polygonSeries.events.on("hit", function(ev) {
	// 	//   console.log(ev.target.dataItem.dataContext);
	// 	//   ev.target.chart.zoomToMapObject(ev.target);
	// 	// })
		
	// 	// polygonSeries.exclude = ["AQ"];
		
		
	// 	// chart.zoomControl = new am4maps.ZoomControl();
		
		
	// 	//polygonTemplate.fill = chart.colors.getIndex(0);
		
	// 	// Create hover state and set alternative fill color
	// 	// let hs = polygonTemplate.states.create("hover");
	// 	// hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);
		
		
	// 	// Add line bullets
	// 	let cities = chart.series.push(new am4maps.MapImageSeries());
	// 	cities.mapImages.template.nonScaling = true;
		
	// 	let city = cities.mapImages.template.createChild(am4core.Circle);
	// 	city.radius = 6;
	// 	city.fill = chart.colors.getIndex(0).brighten(-0.2);
	// 	city.strokeWidth = 2;
	// 	city.stroke = am4core.color("#fff");
		
	// 	function addCity(coords, title) {
	// 		let city = cities.mapImages.create();
	// 		city.latitude = coords.latitude;
	// 		city.longitude = coords.longitude;
	// 		city.tooltipText = title;
	// 		return city;
	// 	}
		
	// 	let paris = addCity({ "latitude": 	-6.986421, "longitude": 110.121544 }, "Paris");
	// 	let toronto = addCity({ "latitude": 	22.302711, "longitude": 	114.177216 }, "Toronto");
		
		
	// 	// Add lines
	// 	let lineSeries = chart.series.push(new am4maps.MapArcSeries());
	// 	lineSeries.mapLines.template.line.strokeWidth = 2;
	// 	lineSeries.mapLines.template.line.strokeOpacity = 0.5;
	// 	lineSeries.mapLines.template.line.stroke = city.fill;
	// 	lineSeries.mapLines.template.line.nonScalingStroke = true;
	// 	lineSeries.mapLines.template.line.strokeDasharray = "1,1";
	// 	lineSeries.zIndex = 10;
		
	// 	let shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
	// 	shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
	// 	shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
	// 	shadowLineSeries.mapLines.template.shortestDistance = false;
	// 	shadowLineSeries.zIndex = 5;
		
	// 	function addLine(from, to) {
	// 		let line = lineSeries.mapLines.create();
	// 		line.imagesToConnect = [from, to];
	// 		line.line.controlPointDistance = -0.3;
		
	// 		let shadowLine = shadowLineSeries.mapLines.create();
	// 		shadowLine.imagesToConnect = [from, to];
		
	// 		return line;
	// 	}
		
	// 	addLine(paris, toronto);
		
		
	// 	// Add plane
	// 	let plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
	// 	plane.position = 0;
	// 	plane.width = 48;
	// 	plane.height = 48;
		
	// 	plane.adapter.add("scale", function(scale, target) {
	// 		return 0.5 * (1 - (Math.abs(0.5 - target.position)));
	// 	})
		
	// 	let planeImage = plane.createChild(am4core.Sprite);
	// 	planeImage.scale = 0.08;
	// 	planeImage.horizontalCenter = "middle";
	// 	planeImage.verticalCenter = "middle";
	// 	planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
	// 	planeImage.fill = "#0079D8";
	// 	planeImage.strokeOpacity = 0;
		
	// 	let shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
	// 	shadowPlane.position = 0;
	// 	shadowPlane.width = 48;
	// 	shadowPlane.height = 48;
		
	// 	let shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
	// 	shadowPlaneImage.scale = 0.05;
	// 	shadowPlaneImage.horizontalCenter = "middle";
	// 	shadowPlaneImage.verticalCenter = "middle";
	// 	shadowPlaneImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
	// 	shadowPlaneImage.fill = am4core.color("#000");
	// 	shadowPlaneImage.strokeOpacity = 0;
		
	// 	shadowPlane.adapter.add("scale", function(scale, target) {
	// 		target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
	// 		return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
	// 	})
		
	// 	// Plane animation
	// 	let currentLine = 0;
	// 	let direction = 1;
	// 	function flyPlane() {
		
	// 		// Get current line to attach plane to
	// 		plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
	// 		plane.parent = lineSeries;
	// 		shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
	// 		shadowPlane.parent = shadowLineSeries;
	// 		shadowPlaneImage.rotation = planeImage.rotation;
		
	// 		// Set up animation
	// 		let from, to;
	// 		let numLines = lineSeries.mapLines.length;
	// 		if (direction == 1) {
	// 			from = 0
	// 			to = 1;
	// 			if (planeImage.rotation != 0) {
	// 				planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
	// 				return;
	// 			}
	// 		}
	// 		else {
	// 			from = 1;
	// 			to = 0;
	// 			if (planeImage.rotation != 180) {
	// 				planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
	// 				return;
	// 			}
	// 		}
		
	// 		// Start the animation
	// 		let animation = plane.animate({
	// 			from: from,
	// 			to: to,
	// 			property: "position"
	// 		}, 5000, am4core.ease.sinInOut);
	// 		animation.events.on("animationended", flyPlane)
	
	// 		shadowPlane.animate({
	// 			from: from,
	// 			to: to,
	// 			property: "position"
	// 		}, 5000, am4core.ease.sinInOut);
		
	// 		currentLine += direction;
	// 		if (currentLine < 0) {
	// 			currentLine = 0;
	// 			direction = 1;
	// 		}
	// 		else if ((currentLine + 1) > numLines) {
	// 			currentLine = numLines - 1;
	// 			direction = -1;
	// 		}
		
	// 	}
		
	// 	// Go!
	// 	flyPlane();
	// 	window.popupSlider();
	// }
		
	componentWillUnmount() {
		// if (this.chart) {
		// 	this.chart.dispose();
		// }
	}
=======
>>>>>>> affb20941b5aceda06cef6580d0f2b59738f7064

	// 	  series.name = group.name;
	// 	  series.useGeodata = true;

	// 	  let includedCountries = [];

	// 	  group.data.forEach(function(country) {
	// 		includedCountries.push(country.id);
	// 		excludedCountries.push(country.id);
	// 	  });

	// 	  series.include = includedCountries;
	// 	  series.fill = am4core.color(group.color);
		  
	// 	  // By creating a hover state and setting setStateOnChildren to true, when we
	// 	  // hover over the series itself, it will trigger the hover SpriteState of all
	// 	  // its countries (provided those countries have a hover SpriteState, too!).
	// 	  series.setStateOnChildren = true;
	// 	  series.calculateVisualCenter = true;
	// 	  // Country shape properties & behaviors
	// 	  let mapPolygonTemplate = series.mapPolygons.template;
	// 	  // Instead of our custom title, we could also use {name} which comes from geodata  
	// 	  mapPolygonTemplate.fill = am4core.color(group.color);
	// 	  mapPolygonTemplate.fillOpacity = 0.8;
	// 	  mapPolygonTemplate.nonScalingStroke = true;
	// 	  mapPolygonTemplate.tooltipPosition = "fixed"
		
	// 	  mapPolygonTemplate.events.on("over", function(event) {
	// 		series.mapPolygons.each(function(mapPolygon) {
	// 		  mapPolygon.isHover = true;
	// 		})
	// 		event.target.isHover = false;
	// 		event.target.isHover = true;
	// 	  })
	// 	//   mapPolygonTemplate.events.on("hit", function(event) {
	// 	// 	series.mapPolygons.each(function(mapPolygon) {
	// 	// 	  var data=event.target.dataItem.dataContext;
	// 	// 	  //console.log(JSON.parse(data.customData));
	// 	// 	  console.log(JSON.parse(JSON.stringify(data.name)));
	// 	// 	})
	// 	//   })
	// 	mapPolygonTemplate.events.on("hit", function(event) {
	// 		series.mapPolygons.each(function(mapPolygon) {
	// 		//   console.log(mapPolygon, 'mapPolygon');
	// 		})

	// 		let data = event.target.dataItem.dataContext;
	// 		console.log(data, 'data', props);

	// 		props.history.push({ pathname: '/SearchResult', state: { data } });
		  
	// 	  })

	// 	  mapPolygonTemplate.events.on("out", function(event) {
	// 		series.mapPolygons.each(function(mapPolygon) {
	// 		  mapPolygon.isHover = false;
	// 		})
	// 	  })
		
	// 	  // States  
	// 	  let hoverState = mapPolygonTemplate.states.create("hover");
	// 	  hoverState.properties.fill = am4core.color("#CC0000");
		
	// 	  // Tooltip
	// 	  mapPolygonTemplate.tooltipText = "{title} joined EU at {customData}"; // enables tooltip
	// 	  // series.tooltip.getFillFromObject = false; // prevents default colorization, which would make all tooltips red on hover
	// 	  // series.tooltip.background.fill = am4core.color(group.color);
		
	// 	  // MapPolygonSeries will mutate the data assigned to it, 
	// 	  // we make and provide a copy of the original data array to leave it untouched.
	// 	  // (This method of copying works only for simple objects, e.g. it will not work
	// 	  //  as predictably for deep copying custom Classes.)
	// 	  series.data = JSON.parse(JSON.stringify(group.data));
	// 	});
		
	// 	// The rest of the world.
	// 	let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
	// 	let worldSeriesName = "world";
	// 	worldSeries.name = worldSeriesName;
	// 	worldSeries.useGeodata = true;
	// 	worldSeries.exclude = excludedCountries;
	// 	worldSeries.fillOpacity = 0.8;
	// 	worldSeries.hiddenInLegend = true;
	// 	worldSeries.mapPolygons.template.nonScalingStroke = true;
		
		
	// 	// // Create map polygon series
	// 	// let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
	// 	// polygonSeries.useGeodata = true;
	// 	// polygonSeries.states.create("hover").properties.fill = am4core.color("#367B25");
	// 	// let polygonTemplate = polygonSeries.mapPolygons.template;
	// 	// polygonTemplate.tooltipText = "{name}";
	// 	// var namanya = "{name}";
		
	// 	// //polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
	// 	// polygonSeries.mapPolygons.template.nonScalingStroke = true;
	// 	// polygonSeries.events.on("hit", function(ev) {
	// 	//   console.log(ev.target.dataItem.dataContext);
	// 	//   ev.target.chart.zoomToMapObject(ev.target);
	// 	// })
		
	// 	// polygonSeries.exclude = ["AQ"];
		
		
	// 	// chart.zoomControl = new am4maps.ZoomControl();
		
		
	// 	//polygonTemplate.fill = chart.colors.getIndex(0);
		
	// 	// Create hover state and set alternative fill color
	// 	// let hs = polygonTemplate.states.create("hover");
	// 	// hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);
		
		
	// 	// Add line bullets
	// 	let cities = chart.series.push(new am4maps.MapImageSeries());
	// 	cities.mapImages.template.nonScaling = true;
		
	// 	let city = cities.mapImages.template.createChild(am4core.Circle);
	// 	city.radius = 6;
	// 	city.fill = chart.colors.getIndex(0).brighten(-0.2);
	// 	city.strokeWidth = 2;
	// 	city.stroke = am4core.color("#fff");
		
	// 	function addCity(coords, title) {
	// 		let city = cities.mapImages.create();
	// 		city.latitude = coords.latitude;
	// 		city.longitude = coords.longitude;
	// 		city.tooltipText = title;
	// 		return city;
	// 	}
		
	// 	let paris = addCity({ "latitude": 	-6.986421, "longitude": 110.121544 }, "Paris");
	// 	let toronto = addCity({ "latitude": 	22.302711, "longitude": 	114.177216 }, "Toronto");
		
		
	// 	// Add lines
	// 	let lineSeries = chart.series.push(new am4maps.MapArcSeries());
	// 	lineSeries.mapLines.template.line.strokeWidth = 2;
	// 	lineSeries.mapLines.template.line.strokeOpacity = 0.5;
	// 	lineSeries.mapLines.template.line.stroke = city.fill;
	// 	lineSeries.mapLines.template.line.nonScalingStroke = true;
	// 	lineSeries.mapLines.template.line.strokeDasharray = "1,1";
	// 	lineSeries.zIndex = 10;
		
	// 	let shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
	// 	shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
	// 	shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
	// 	shadowLineSeries.mapLines.template.shortestDistance = false;
	// 	shadowLineSeries.zIndex = 5;
		
	// 	function addLine(from, to) {
	// 		let line = lineSeries.mapLines.create();
	// 		line.imagesToConnect = [from, to];
	// 		line.line.controlPointDistance = -0.3;
		
	// 		let shadowLine = shadowLineSeries.mapLines.create();
	// 		shadowLine.imagesToConnect = [from, to];
		
	// 		return line;
	// 	}
		
	// 	addLine(paris, toronto);
		
		
	// 	// Add plane
	// 	let plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
	// 	plane.position = 0;
	// 	plane.width = 48;
	// 	plane.height = 48;
		
	// 	plane.adapter.add("scale", function(scale, target) {
	// 		return 0.5 * (1 - (Math.abs(0.5 - target.position)));
	// 	})
		
	// 	let planeImage = plane.createChild(am4core.Sprite);
	// 	planeImage.scale = 0.08;
	// 	planeImage.horizontalCenter = "middle";
	// 	planeImage.verticalCenter = "middle";
	// 	planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
	// 	planeImage.fill = "#0079D8";
	// 	planeImage.strokeOpacity = 0;
		
	// 	let shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
	// 	shadowPlane.position = 0;
	// 	shadowPlane.width = 48;
	// 	shadowPlane.height = 48;
		
	// 	let shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
	// 	shadowPlaneImage.scale = 0.05;
	// 	shadowPlaneImage.horizontalCenter = "middle";
	// 	shadowPlaneImage.verticalCenter = "middle";
	// 	shadowPlaneImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
	// 	shadowPlaneImage.fill = am4core.color("#000");
	// 	shadowPlaneImage.strokeOpacity = 0;
		
	// 	shadowPlane.adapter.add("scale", function(scale, target) {
	// 		target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
	// 		return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
	// 	})
		
	// 	// Plane animation
	// 	let currentLine = 0;
	// 	let direction = 1;
	// 	function flyPlane() {
		
	// 		// Get current line to attach plane to
	// 		plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
	// 		plane.parent = lineSeries;
	// 		shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
	// 		shadowPlane.parent = shadowLineSeries;
	// 		shadowPlaneImage.rotation = planeImage.rotation;
		
	// 		// Set up animation
	// 		let from, to;
	// 		let numLines = lineSeries.mapLines.length;
	// 		if (direction == 1) {
	// 			from = 0
	// 			to = 1;
	// 			if (planeImage.rotation != 0) {
	// 				planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
	// 				return;
	// 			}
	// 		}
	// 		else {
	// 			from = 1;
	// 			to = 0;
	// 			if (planeImage.rotation != 180) {
	// 				planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
	// 				return;
	// 			}
	// 		}
		
	// 		// Start the animation
	// 		let animation = plane.animate({
	// 			from: from,
	// 			to: to,
	// 			property: "position"
	// 		}, 5000, am4core.ease.sinInOut);
	// 		animation.events.on("animationended", flyPlane)
	
	// 		shadowPlane.animate({
	// 			from: from,
	// 			to: to,
	// 			property: "position"
	// 		}, 5000, am4core.ease.sinInOut);
		
	// 		currentLine += direction;
	// 		if (currentLine < 0) {
	// 			currentLine = 0;
	// 			direction = 1;
	// 		}
	// 		else if ((currentLine + 1) > numLines) {
	// 			currentLine = numLines - 1;
	// 			direction = -1;
	// 		}
		
	// 	}
		
	// 	// Go!
	// 	flyPlane();
	// 	window.popupSlider();
	// }
		
	
	render() {
		// console.log(this.props, 'home');
		const {
	      defaultLangnya
	    } = this.state;

		return (
			<div id="middle-content" className="homePage">
				<div className="wrapper">
					<div className="rows">
						<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
					</div>{/* end.rows */}
					<div className="rows">
						<div className="main_title_top">
							<h3>{defaultLangnya == 'id' ? 'Petunjuk Perjalanan' : 'Travel Guidelines'}</h3>
						</div>
					</div>{/* end.rows */}

					<section id="section_maps">
						<div className="rows">
						  <div className="search_row">
						    <input type="text" id="searchTrigger" className="search_input"   name="" placeholder={defaultLangnya == 'id' ? 'Mau ke mana?' : 'Going anywhere?'} />
						    <div className="overlay_trigger trigger_slider_search" data-slider="popup_search"></div>
						  </div>
						</div>{/* end.rows */}
						<div className="rows">
							<div className="relative">
								<Maps
									parentName='Home'
									title={defaultLangnya == 'id' ? 'Level Kewaspadaan COVID-19' : 'COVID-19 Travel Advisory Level'}
									{...this.props}
								/>
								<div className="zoom_abs">
									<img src="assets/images/icon_zoom.png" />
									<span>Zoom</span>
								</div>
						  	</div>
						  <div className="legend_info">
						    <div className="row_legend">
						      <div className="circle_l green_c"></div>
						      <span>{defaultLangnya == 'id' ? 'Kunjungi dengan tindakan pencegahan' : 'Allowed, travel with safety precautions'}</span>
						    </div>{/* end.row_legend */}
						    <div className="row_legend">
						      <div className="circle_l yellow_c"></div>
						      <span>{defaultLangnya == 'id' ? 'Kunjungi dengan kewaspadaan ekstra' : 'Partially prohibited, check local policy'}</span>
						    </div>{/* end.row_legend */}
						    <div className="row_legend">
						      <div className="circle_l red_c"></div>
						      <span>{defaultLangnya == 'id' ? 'Hindari bila tidak berkepentingan' : 'Prohibited, avoid non-essential travel'}</span>
						    </div>{/* end.row_legend */}
						  </div>{/* end.legend_info */}
						</div>{/* end.rows */}
					</section>

					<section id="section_regulation">
						<div className="rows">
						  <div className="main_title">
						    <h3>{defaultLangnya == 'id' ? 'Peraturan & Kebijakan' : 'Regulation & Policy'}</h3>
						  </div>
						</div>
						<div className="rows">
						  <div className="list_policy">
						    <div className="block_policy">

						      <Link to="/AirlinePolicy">
							      <div className="icon_policy">
							        <img src="assets/images/icon_airlines_polic.png" alt='airline_logo' />
							      </div>
							      <div className="caption_policy">
							        <h3>{defaultLangnya == 'id' ? 'Kebijakan Maskapai' : 'Airline Policy'}</h3>
							        <p>{defaultLangnya == 'id' ? 'Informasi terbaru mengenai layanan dan kebijakan maskapai.' : 'Latest information on airline service and policy.'}</p>
							      </div>
						      </Link>
						    </div>

						    <div className="block_policy">
								<Link to="/AirportPolicyDomestic">
							      <div className="icon_policy">
							        <img src="assets/images/icon_airport_policy.png" alt='airport_logo' />
							      </div>
							      <div className="caption_policy">
							        <h3>{defaultLangnya == 'id' ? 'Kebijakan Bandara' : 'Airport Policy'}</h3>
							        <p>{defaultLangnya == 'id' ? 'Kebijakan terbaru mengenai regulasi dan kebijakan perjalanan bandara.' : 'Latest information on airport travel regulations & policy.'}</p>
							      </div>
						      </Link>
						    </div>

						    <div className="block_policy">
								<Link to="/TicketingPolicy/Flights">
							      <div className="icon_policy">
							        <img src="assets/images/icon_how_to_buy_tic.png" alt='ticket_logo' />
							      </div>
							      <div className="caption_policy">
							        <h3>{defaultLangnya == 'id' ? 'Kebijakan Tiket' : 'Ticketing Policy'}</h3>
							        <p>{defaultLangnya == 'id' ? 'Informasi terbaru tentang cara pembelian, refund, dan reschedule.' : 'Latest information on how to purchase, refund, and reschedule'}</p>
							      </div>
						      	</Link>
						    </div>
						  </div>
						</div>
					</section>

				</div>{/* end.wrapper */}
			</div>
		)
	}
}
export default Home;