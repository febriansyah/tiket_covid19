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
import PopupCountryProhibited from './PopupCountryProhibited';
import PopupCountryAllowed from './PopupCountryAllowed';
import PopupCountryPartially from './PopupCountryPartially';

import Maps from './Maps';

// am4core.useTheme(am4themes_animated);

const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'
const dataLayer = window.dataLayer || [];
const datagtm = window.gtm || [];


class HomeLazy extends React.Component {

	constructor(props){
		super(props)
		this.state = {
		  defaultLangnya: langnya == langDef ? langnya : 'id',
		  dataEssential: [],
		  countryByStatus: {
			allowed: 0,
			partially: 0,
			prohibited: 0,
		  },
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
		this.getCountryStatus();	
	}

	getCountryStatus() {
        axios({
            type: 'get',
            url:`https://api.tiketsafe.com/api/v2/country-status`,
            headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then(res => {
			const response = res.data;
			let countryByStatus = this.state.countryByStatus;

			if (response && Array.isArray(response.data)) {
				response.data.map((item) => {
					if (item.status === 1) {
						countryByStatus.allowed += 1;
					} else if (item.status === 3) {
						countryByStatus.partially += 1;
					} else if (item.status === 2) {
						countryByStatus.prohibited += 1;
					}
				})

				this.setState({ countryByStatus });
			}
        })
        .catch(err => {
        })
    }

	getEssential = () => {
		let essentialItems = [];
		axios({
			method: 'get',
			url:'https://api.tiketsafe.com/api/v1/information/covid-essential?lang='+this.state.defaultLangnya,
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
		
		dataLayer.push({'event': 'click','eventCategory' : 'AirlinePolicyGtm', 'eventLabel' : 'flight' });
		datagtm.push({'screenName': '','vertical' : 'flight', 'platform' : 'Weblocal'});
		console.log(dataLayer,'ss')
		let kirimGtm= JSON.stringify(Object.assign({}, 
		 {"dataLayer": {'event': 'click','eventCategory' : 'AirlinePolicyGtm', 'eventLabel' : 'flight' }},
		 {"gtm": { "trackingid":dataLayer[0],
				   "vertical":"flight",
				   "platform":"dekstop",
				   "flight":{
					"destinationCity":"",
					"Keyword":"",
					"destinationStatus":"",
					"airline":"",
					"destinationAirport":"",
					"type":""
				   }
				
				},datagtm}));
		

		this.pushGTM(kirimGtm);
		
		
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

	popupShowProhibited = () => {
		$("#popup_prohibited_country").removeClass("hide");
		setTimeout(function() {
			$("#popup_prohibited_country").addClass("actived");
		  }, 500);
	}

	popupShowAllowed = () => {
		$("#popup_allowed_country").removeClass("hide");
		setTimeout(function() {
			$("#popup_allowed_country").addClass("actived");
		  }, 500);
	}

	popupShowPartially = () => {
		$("#popup_partially_country").removeClass("hide");
		setTimeout(function() {
			$("#popup_partially_country").addClass("actived");
		  }, 500);
	}
	pushGTM = (object) => {
	    window.gtm = window.gtm || {};

	    window.gtm = {
	      ...window.gtm,
	      ...object,
	    };
	    console.log("gtmnya",window.gtm)
	  }

	render() {
		console.log(this.state, 'home');

		const {
	      defaultLangnya, dataEssential, countryByStatus
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

					<section id="section_maps_new">
						<div className="rows homeMaps">
						  <div className="search_row">
						    <input type="text" id="searchTrigger" className="search_input"   name="" placeholder={defaultLangnya == 'id' ? 'Mau ke mana?' : 'Going anywhere?'} />
						    <div onClick={this.popupShow} className="overlay_trigger trigger_slider_search" data-slider="popup_search"></div>
						  </div>
						</div>{/* end.rows */}
						<div className="rows">
						  <div className="main_title">
						    <h3>{defaultLangnya == 'id' ? 'Level Kewaspadaan COVID-19' : 'COVID-19 Travel Advisory Level'}</h3>
						  </div>
						</div>

						<div className="rows">
							<div className="list_maps_p">
								<div className="row-list">
									<div className="cols3">
									    <div className="block_policy red_ornamen">
									      {/* <Link to="/AirlinePolicy" onClick={this.AirlinePolicyGtm} > */}
										      <div className="icon_policy">
										        <img src="/assets/images/icon_prohibited.png" alt='airline_logo' />
										      </div>
										      <div className="caption_policy">
										        <h3>{defaultLangnya == 'id' ? 'Dilarang' : 'Prohibited'}</h3>
										        <p>{defaultLangnya == 'id' ? 'Hindari bila tidak penting, ada pembatasan untuk wisatawan tertentu.' : 'Avoid non-essential travel. Restrictions are applied to certain travelers.'}</p>
										        <span className="small_blue">{defaultLangnya == 'id' ? `Lihat ${countryByStatus.prohibited} Negara` : `See ${countryByStatus.prohibited} Countries`}</span>
												<div onClick={this.popupShowProhibited} className="overlay_trigger trigger_slider_search" data-slider="popup_prohibited_country"></div>
										      </div>
									      {/* </Link> */}
									    </div>
							    	</div>{/* end.cols3 */}
									<div className="cols3">
									    <div className="block_policy yellow_ornamen">
									      {/* <Link to="/AirlinePolicy" onClick={this.AirlinePolicyGtm} > */}
										      <div className="icon_policy">
										        <img src="/assets/images/icon_prohibited_partial.png" alt='airline_logo' />
										      </div>
										      <div className="caption_policy">
										        <h3>{defaultLangnya == 'id' ? 'Dilarang Sebagian' : 'Partially Prohibited'}</h3>
										        <p>{defaultLangnya == 'id' ? 'Cek kebijakan lokal dan kunjungi dengan kewaspadaan ekstra. ' : 'Check the local policy and visit with extra caution.'}</p>
										        <span className="small_blue">{defaultLangnya == 'id' ? `Lihat ${countryByStatus.partially} Negara` : `See ${countryByStatus.partially} Countries`}</span>
												<div onClick={this.popupShowPartially} className="overlay_trigger trigger_slider_search" data-slider="popup_partially_country"></div>
										      </div>
									      {/* </Link> */}
									    </div>
							    	</div>{/* end.cols3 */}
							    	<div className="cols3">
									    <div className="block_policy green_ornamen">
									      {/* <Link to="/AirlinePolicy" onClick={this.AirlinePolicyGtm} > */}
										      <div className="icon_policy">
										        <img src="/assets/images/icon_allowed.png" alt='airline_logo' />
										      </div>
										      <div className="caption_policy">
										        <h3>{defaultLangnya == 'id' ? 'Diizinkan' : 'Allowed'}</h3>
										        <p>{defaultLangnya == 'id' ? 'Kunjungi dengan tindakan pencegahan dan ikuti protokol kesehatan. ' : 'Travel with safety precautions and follow health protocols. '}</p>
										        <span className="small_blue">{defaultLangnya == 'id' ? `Lihat ${countryByStatus.allowed} Negara` : `See ${countryByStatus.allowed} Countries`}</span>
												<div onClick={this.popupShowAllowed} className="overlay_trigger trigger_slider_search" data-slider="popup_allowed_country"></div>
										      </div>
									      {/* </Link> */}
									    </div>
							    	</div>{/* end.cols3 */}
								</div>
							</div>
						</div>
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
										        <h3>{itemE.title}</h3>
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

			<PopupCountry />
			<PopupCountryProhibited />
			<PopupCountryAllowed />
			<PopupCountryPartially />
			</div>

        	
		)
	}
}
export default HomeLazy;