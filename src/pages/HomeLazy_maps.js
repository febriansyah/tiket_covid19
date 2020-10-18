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
import $ from 'jquery'; 

import axios from 'axios';

import PopupCountry from './PopupCountry';

import Maps from './Maps';

// am4core.useTheme(am4themes_animated);

const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'
const dataLayer = window.dataLayer || [];


class HomeLazy extends React.Component {

	constructor(props){
		super(props)
		this.state = {
		  defaultLangnya: langnya == langDef ? langnya : 'id',
		  openPopup: false,
		  dataEssential:[]
		};
	}
		
	componentWillUnmount() {
		// if (this.chart) {
		// 	this.chart.dispose();
		// }
		
	}
	componentDidMount(){
		this.getEssential();
		//console.log("masuk")	
	}

	getEssential = () => {
		let essentialItems = [];
		axios({
			method: 'get',
			url:'https://api.tiketsafe.com/api/v1/information/covid-essential',
			headers: {
				"Access-Control-Allow-Origin": "*",
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		})
		.then(res => {
				essentialItems = res.data.data;
				console.log(essentialItems,'lalala')
				
				this.setState({dataEssential:essentialItems});
				//console.log(this.state.dataEssential)
			
		})
		.catch(err => {
			//this.setState({ loading: false });
		})

	}

	AirlinePolicyGtm = () => {
		dataLayer.push({'event': 'click','eventCategory' : 'viewAirlinePolicy', 'eventLabel' : 'flight' });
	}

	AirportPolicyGtm = () => {
		dataLayer.push({'event': 'click','eventCategory' : ' viewAirportPolicy', 'eventLabel' : 'flight' });
	}

	TicketingPolicyGtm = () => {
		dataLayer.push({'event': 'click','eventCategory' : ' viewTicketingPolicy', 'eventLabel' : 'flight' });
	}
	popupShow = () => {
      $("#popup_search").removeClass("hide");
      setTimeout(function() {
          $("#popup_search").addClass("actived");
        }, 500);
    }


	render() {
		// console.log(this.state, 'home');

		const {
	      defaultLangnya, openPopup, dataEssential
	    } = this.state;

		return (
			<div id="middle-content" className="homePage">
				<div className="top_section">
					<div className="wrapper">
					<div className="rows">
						<br /><br />
					</div>{/* end.rows */}
					<div className="rows">
						<div className="main_title_top">
							<h3>{defaultLangnya == 'id' ? 'Petunjuk Perjalanan' : 'Travel Guidelines'}</h3>
						</div>
					</div>{/* end.rows */}

					<section id="section_maps">
					<div className="rows homeMaps">
						  <div className="search_row">
						    <input type="text" id="searchTrigger" className="search_input"   name="" placeholder={defaultLangnya == 'id' ? 'Mau ke mana?' : 'Going anywhere?'} />
						    <div onClick={this.popupShow} className="overlay_trigger trigger_slider_search" data-slider="popup_search"></div>
						  </div>
						</div>{/* end.rows */}
						<div className="rows">
							<div className="relative">
								<Maps
									parentName='Home'
									title={defaultLangnya == 'id' ? 'Level Kewaspadaan COVID-19' : 'COVID-19 Travel Advisory Level'}
									readyMap={true}
									{...this.props}
								/>
									<div className="zoom_abs_desktop">
									<div className="box"><img src="/assets/images/plus.png" /></div>
									<div className="box"><img src="/assets/images/minus.png" /></div>
								</div>
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
					</div>{/* end.wrapper */}
				</div>{/* end.top_section */}

				<div className="bottom_section">
					<div className="wrapper">
					<section id="section_regulation">
						<div className="rows">
						  <div className="main_title">
						    <h3>{defaultLangnya == 'id' ? 'Peraturan & Kebijakan' : 'Regulation & Policy'}</h3>
						  </div>
						</div>
						<div className="rows">
						  <div className="list_policy">
						  	<div className="row-list">
						  		<div className="cols3">
								    <div className="block_policy">
								      <Link to="/AirlinePolicy" onClick={this.AirlinePolicyGtm} >
									      <div className="icon_policy">
									        <img src="/assets/images/icon_airlines_polic.png" alt='airline_logo' />
									      </div>
									      <div className="caption_policy">
									        <h3>{defaultLangnya == 'id' ? 'Kebijakan Maskapai' : 'Airline Policy'}</h3>
									        <p>{defaultLangnya == 'id' ? 'Informasi terbaru mengenai layanan dan kebijakan maskapai.' : 'Latest information on airline service and policy.'}</p>
									      </div>
								      </Link>
								    </div>
						    	</div>{/* end.cols3 */}

						  		<div className="cols3">
								    <div className="block_policy">
										<Link to="/AirportPolicyDomestic" onClick={this.AirportPolicyGtm} >
									      <div className="icon_policy">
									        <img src="/assets/images/icon_airport_policy.png" alt='airport_logo' />
									      </div>
									      <div className="caption_policy">
									        <h3>{defaultLangnya == 'id' ? 'Kebijakan Bandara' : 'Airport Policy'}</h3>
									        <p>{defaultLangnya == 'id' ? 'Kebijakan terbaru mengenai regulasi dan kebijakan perjalanan bandara.' : 'Latest information on airport travel regulations & policy.'}</p>
									      </div>
								      </Link>
								    </div>
						    	</div>{/* end.cols3 */}

						  		<div className="cols3">
								    <div className="block_policy">
										<Link to="/TicketingPolicy/Flights" onClick={this.TicketingPolicyGtm} >
									      <div className="icon_policy">
									        <img src="/assets/images/icon_how_to_buy_tic.png" alt='ticket_logo' />
									      </div>
									      <div className="caption_policy">
									        <h3>{defaultLangnya == 'id' ? 'Kebijakan Tiket' : 'Ticketing Policy'}</h3>
									        <p>{defaultLangnya == 'id' ? 'Informasi terbaru tentang cara pembelian, refund, dan reschedule.' : 'Latest information on how to purchase, refund, and reschedule'}</p>
									      </div>
								      	</Link>
								    </div>
						    	</div>{/* end.cols3 */}
						    </div>{/* end.row-list */}
						  </div>
						</div>
					</section>

					<section id="section_before_go" className="hide">
						<div className="rows">
						  <div className="main_title">
						    <h3>{defaultLangnya == 'id' ? 'Know Before You Go' : 'Know Before You Go'}</h3>
						  </div>
						</div>
						<div className="rows">
						  <div className="list_policy">
						  	<div className="row-list">
						  		<div className="cols3">
								    <div className="block_policy">
								      <Link to="/" >
									      <div className="icon_policy">
									        <img src="/assets/images/icon_check_all.png" alt='check_all' />
									      </div>
									      <div className="caption_policy">
									        <h3>{defaultLangnya == 'id' ? 'Check All The Requirements Before You Fly' : 'Check All The Requirements Before You Fly'}</h3>
									        <p>{defaultLangnya == 'id' ? 'Latest travel requirements from the government of your origin destination.' : 'Latest travel requirements from the government of your origin destination.'}</p>
									      </div>
								      </Link>
								    </div>
						    	</div>{/* end.cols3 */}
						    </div>{/* end.row-list */}
						  </div>
						</div>
					</section>

					<section id="section_essential">
						<div className="rows">
						  <div className="main_title">
						    <h3>{defaultLangnya == 'id' ? 'COVID-19 Essentials' : 'COVID-19 Essentials'}</h3>
						  </div>
						</div>
						<div className="rows">
						  <div className="list_policy">
						  	<div className="row-list">

						  		{dataEssential.map((itemE, k) => (
						  			<div className="cols3"  key={k}>
									    <div className="block_policy">
									      <a href={itemE.landingPageURL}  >
										      <div className="icon_policy">
										        <img src={itemE.iconURL} alt='covid_test' />
										      </div>
										      <div className="caption_policy">
										        <h3>{defaultLangnya == 'id' ? 'Take COVID-19 Test' : 'Take COVID-19 Test'}</h3>
										        <p>{itemE.summary}</p>
										      </div>
									      </a>
									    </div>
							    	</div>
								))}
						    </div>{/* end.row-list */}
						  </div>
						</div>
					</section>
				</div>{/* end.wrapper */}
			</div>{/* end.bottom */}

			<PopupCountry
				visible={openPopup}
				onClose={() => this.setState({ openPopup: false })}
			/>
			</div>

        	
		)
	}
}
export default HomeLazy;