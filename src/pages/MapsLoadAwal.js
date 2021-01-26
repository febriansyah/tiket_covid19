import React, { useEffect, useState, useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import { color } from '../components/color';
import { sendEventGTM } from '../utils/gtm';

const apiUrl = 'https://api.tiketsafe.com/api/v2/';
const headers = { "Access-Control-Allow-Origin": "*" };

am4core.useTheme(am4themes_animated);

const host = 'https://tiketsafe.com';

const MapsLoadAwal = (props) => {
    const {
        parentName,
        title,
        countryCode,
        homeZoomLevel,
        countryName,
        latitude,
        longitude
    } = props;

    const history = useHistory();

    const [listWorldMap, setListWorldMap] = useState(JSON.parse(localStorage.getItem('request:worlds-maps')) || []);
    const [loading, setLoading] = useState(true);

    // console.log(listWorldMap, 'listWorldMap');

    useEffect(() => {
        if (listWorldMap.length === 0 || parentName === 'Home') {
            getCountryStatus();
        }
    }, [])

    const getCountryStatus = () => {
      

        axios.get('https://api.tiketsafe.com/api/v2/country-status')
  .then(function (res) {
      
            // console.log(res, 'res country status');

            let remapWorldMap = [];

            localStorage.removeItem('request:worlds-maps');
            
            if (res.data.status === 'success' && Array.isArray(res.data.data)) {
                res.data.data.map((e) => {
                    remapWorldMap.push({
                        "name": "Info Covid-19",
                        "color": e.status === 1 ? color.green : e.status === 2 ? color.red : color.yellow,
                        "data": [{
                            id: e.id,
                            latitude: e.latitude,
                            longitude: e.longitude,
                            title: e.title,
                            color: e.status === 1 ? color.green : e.status === 2 ? color.red : color.yellow
                        }]
                    })     
                })
            }

            setListWorldMap(remapWorldMap);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
        })
    }

    useEffect(() => {

        am4core.options.onlyShowOnViewport=true;
        am4core.options.queue=false;
        let chart = am4core.create("chart", am4maps.MapChart);
        
        //let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        chart.geodata = am4geodata_worldLow;
        chart.projection = new am4maps.projections.Miller();
		chart.homeZoomLevel = homeZoomLevel;
        chart.homeGeoPoint = { longitude, latitude };
        chart.logo.disabled = true;
        
        // This array will be populated with country IDs to exclude from the world series
        let excludedCountries = [];
        
        // Create a series for each group, and populate the above array
        listWorldMap.forEach(function(group) {
            let series = chart.series.push(new am4maps.MapPolygonSeries());
  
            series.name = group.name;
            series.useGeodata = true;
  
            let includedCountries = [];
  
            if (group.data) {
                group.data.forEach(function(country) {
                    includedCountries.push(country.id);
                    excludedCountries.push(country.id);
                });
            }
  
            series.include = includedCountries;
            series.minBulletDistance = 20;
            series.fill = am4core.color(group.color);
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
        

            mapPolygonTemplate.events.on("hit", function(event) {
            let data = event.target.dataItem.dataContext;
            sendEventGTM({'event': 'click', 'eventCategory': 'chooseDestination', 'eventLabel:': 'flight'});
            history.push({ pathname: '/SearchResult/' + data.id });
            })
  
            mapPolygonTemplate.events.on("out", function(event) {
              series.mapPolygons.each(function(mapPolygon) {
                mapPolygon.isHover = false;
              })
            })
          
            // States  
            let hoverState = mapPolygonTemplate.states.create("hover");
            hoverState.properties.fill = am4core.color("#0064D2");
          
            // Tooltip
            // mapPolygonTemplate.tooltipText = "{title} confirmed = {confirmed}"; 
            // enables tooltip
            // series.tooltip.getFillFromObject = false; // prevents default colorization, which would make all tooltips red on hover
            // series.tooltip.background.fill = am4core.color(group.color);
          
            // MapPolygonSeries will mutate the data assigned to it, 
            // we make and provide a copy of the original data array to leave it untouched.
            // (This method of copying works only for simple objects, e.g. it will not work
            //  as predictably for deep copying custom Classes.)
            series.data = group.data && JSON.parse(JSON.stringify(group.data));
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
          
          
   
        let cities = chart.series.push(new am4maps.MapImageSeries());
        cities.mapImages.template.nonScaling = true;
        
        let city = cities.mapImages.template.createChild(am4core.Circle);
        city.radius = 6;
        city.fill = chart.colors.getIndex(0).brighten(-0.2);
        city.strokeWidth = 2;
        city.stroke = am4core.color("#fff");
          
        function addCity(coords, title) {
              let city = cities.mapImages.create();
              city.latitude = coords.latitude;
              city.longitude = coords.longitude;
              city.tooltipText = title;
              return city;
        }
          
        if (parentName === 'Search') addCity({ latitude, longitude }, countryName );
        //window.popupSlider();
        
    }, [
        listWorldMap,
        latitude
    ])
 
    return (
        <>
            <div className="main_title titleMaps" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3>{title}</h3>
            </div>
            <div className="frame_peta">
                <div id='chart' style={{maxWidth: '100%', height: '250px'}} />
            </div>
            	
					
        </>
    )
}

MapsLoadAwal.propTypes = {
    homeZoomLevel: PropTypes.number,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
};
  
MapsLoadAwal.defaultProps = {
    homeZoomLevel: 0,
    latitude: 52,
    longitude: 11,
};

export default MapsLoadAwal;