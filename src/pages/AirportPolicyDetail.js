import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StickyShare from './StickyShare';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = 'https://api.tiketsafe.com/api/v1/';
const headers = { "Access-Control-Allow-Origin": "*" };

class AirportPolicyDetail extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			dataItem: null,
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
			url: proxyurl + apiUrl + `airport?airportCode=${airportCode}`,
			headers
		})
		.then(res => {
			console.log(res, 'res airport by code');
			if (res.data.status === 'success') {
				this.setState({ dataItem: res.data.data });
			}
		})
	}

	render() {
		console.log(this.props, 'airport detail');
		
		return(
			<div id="middle-content" className="homePage">
			  <div className="wrapper">
			    <div className="rows">
			    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
			    </div>
			    <div className="rows">
					<div className="main_title_top">
						<h3>Airport Policy</h3>
					</div>
				</div>{/* end.rows */}

			    <section id="section_innernya">
			    	<div className="rows">
					  <div className="search_row">
					    <input type="text" id="searchTrigger_airlines" className="search_input" name="" placeholder="Search airport or cities" />
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
								<h3>Important</h3>
								<p>The terms and conditions informed on this page are fluctuative and are subject to change without prior notice. The applicable policy will still follow the airline regulations when the request is submitted.</p><br />
								<h3>Refund</h3>
								<p>Refund conditions are subject to change without prior notice and follow based on the terms and conditions of the airline.</p>
								<p>Ticket Purchase Date: On / before 15 March 2020.<br/>
								Flight Period: 24 January - 31 August 2020.<br/>
								Routes: All routes.<br/>
								Refund Rules: Full refund.</p>
								<p>Ticket Purchase Date: 5 March - 31 August 2020.<br/>
								Flight Period: -<br/>
								Routes: All routes.<br/>
								Refund Rules: As per normal regulation.</p>
								<p>Based on information that we received, the refund process will take longer than usual. Therefore, we suggest you to do an Open Ticket and enjoy the convenience and excellence with the options offered in accordance with the provisions of the ticket issuance date and flight date as above.</p>
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