import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StickyShare from './StickyShare';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = 'https://api.tiketsafe.com/api/v1/';
const headers = { "Access-Control-Allow-Origin": "*" };
const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'

class AirportPolicyDetail extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			dataItem: null,
			defaultLangnya: langnya == langDef ? langnya : 'id',
		};

		this.goBack = this.goBack.bind(this);
	}

	goBack() {
		this.props.history.goBack();
	}

	componentDidMount() {
		if (this.props.location.state && this.props.location.state.airportCode) {
			this.getAirportDetail(this.props.location.state.airportCode);
		}

		window.activeAccordion();
		window.readmoreFade();
		window.popupSlider();
	}
	
	getAirportDetail(airportCode) {
		axios({
			method: 'get',
			url:apiUrl + `airport?lang=`+this.state.defaultLangnya+`&airportCode=${airportCode}`,
			headers
		})
		.then(res => {
			console.log(`airport?lang=`+this.state.defaultLangnya+`&airportCode=${airportCode}`, 'res airport by code');
			if (res.data.status === 'success') {
				this.setState({ dataItem: res.data.data });
			}
		})
	}

	render() {
		const {
	      defaultLangnya
	    } = this.state;
		console.log(this.props, 'airport detail');
		
		return(
			<div id="middle-content" className="homePage">
			  <div className="wrapper">
			    <div className="rows">
			    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
			    </div>
			    <div className="rows">
					<div className="main_title_top">
						<h3>{defaultLangnya == 'id' ? 'Kebijakan Bandara' : 'Airport Policy'}</h3>
					</div>
				</div>{/* end.rows */}

			    <section id="section_innernya">
			    	<div className="rows">
					  <div className="search_row">
					    <input type="text" id="searchTrigger_airlines" className="search_input" name="" placeholder={defaultLangnya == 'id' ? 'Cari bandara atau kota' : 'Search airports or cities'} />
					    <div className="overlay_trigger trigger_slider_search" data-slider="popup_search_airport_policy"></div>
					  </div>
					</div>{/* end.rows */}
					<div className="rows hide">
						<div className="tabs_main_menu">
							<Link to="" className="tabs_menu active">
								<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
								<span>Domestic</span>
							</Link>
							<Link to="/AirportPolicyInternational" className="tabs_menu">
							<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
								<span>International</span>
							</Link>
						</div>
				    </div>{/* end.rows */}

					<div className="halBefore-kuis hide">
						<div className="box-loading2">
							<div className="spinner">
								<div className="bounce1"></div>
								<div className="bounce2"></div>
								<div className="bounce3"></div>
							</div>
						</div>
					</div>
			    </section>

			    <section id="section_tabs_list">
			    	<div id="tnc-accodion">
						<div className="items">
							<div className="page active">
								<span>{this.state.dataItem && this.state.dataItem.airportName}</span>
							</div>
							<div className="content active">
								<p>{this.state.dataItem && this.state.dataItem.generalRequirements}</p>
							</div>
						</div>
			    	</div>{/* end.tnc-accodion */}
			      
			    </section>
			    <StickyShare />
			  </div>{/* end.wrapper */}
			</div>

		)
	}
}

export default AirportPolicyDetail;