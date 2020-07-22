import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery'; 
import axios from 'axios';

class AirportPolicyInternational extends React.Component{

	constructor(props){
		super(props)
		this.state = {
		  list_data_airport: [], 
		  load_aju_error: false,
		  loaded: false,
		  count_item: 0,
		};
	}
	componentWillMount() {
		this._listData();
	}
	
	_listData = async () => {

		const proxyurl = "https://cors-anywhere.herokuapp.com/";
			axios({
				method: 'get',
				url: proxyurl+'https://api.tiketsafe.com/api/v1/airports?lang=id&flightype=2&page=1',
				headers: {
					"Access-Control-Allow-Origin": "*"
				}
			})
			.then(response => {
				this.setState({list_data_airport: response.data.data})
				console.log('Done with Ajax call');
				$(".halBefore-kuis").fadeOut();
				window.activeAccordion();

			});

	}

	RenderAirportList (list_data_airport){
		return  list_data_airport.map((value, i)=>

			<div className="items" key={i}>
			  <div className="page">
				<span>{value.airportName}</span>
			  </div>
			  <div className="content">
			    <h3>Important</h3>
			    <p>The terms and conditions informed on this page are fluctuative and are subject to change without prior notice. The applicable policy will still follow the airline regulations when the request is submitted.</p><br />
			    <h3>Refund</h3>
				<p>Refund conditions are subject to change without prior notice and follow based on the terms and conditions of the airline.</p>
				<p>
				Ticket Purchase Date: On / before 15 March 2020.<br/>
				Flight Period: 24 January - 31 August 2020.<br/>
				Routes: All routes.<br/>
				Refund Rules: Full refund.</p>

				<p>
				Ticket Purchase Date: 5 March - 31 August 2020.<br/>
				Flight Period: -<br/>
				Routes: All routes.<br/>
				Refund Rules: As per normal regulation.</p>
				<p>
				Based on information that we received, the refund process will take longer than usual. Therefore, we suggest you to do an Open Ticket and enjoy the convenience and excellence with the options offered in accordance with the provisions of the ticket issuance date and flight date as above.</p>


			  </div>
			</div>
		)
		
				
	}
	componentDidMount() {
		
		window.readmoreFade();
		window.popupSlider();
	}

	render(){
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
					    <input type="text" id="searchTrigger_airlines" className="search_input trigger_slider_search" data-slider="popup_search_airport_policy" name="" placeholder="Search airport or cities" />
					  </div>
					</div>{/* end.rows */}
					<div className="rows">
						<div className="tabs_main_menu">
							<Link to="/AirportPolicyDomestic" className="tabs_menu">
								<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
								<span>Domestic</span>
							</Link>
							<Link to="" className="tabs_menu active">
							<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
								<span>International</span>
							</Link>
						</div>
				    </div>{/* end.rows */}
			    </section>

			    <section id="section_tabs_list">
			    	<div id="tnc-accodion">
						<div className="halBefore-kuis">
						  <div className="box-loading2">
						      <div className="spinner">
						      <div className="bounce1"></div>
						      <div className="bounce2"></div>
						      <div className="bounce3"></div>
						    </div>
						  </div>
						</div>
				    	{this.RenderAirportList(this.state.list_data_airport)}
			    	</div>{/* end.tnc-accodion */}
			      
			    </section>
			    <div className="rows">
			    	<div className="button_bottom">
			    		<button type="button" className="share_bt"><img className="icon_bt" src="assets/images/icon_share.png" /> <span>Share</span></button>
			    	</div>
			    </div>{/* end.rows */}
			  </div>{/* end.wrapper */}
			</div>

		)
	}
}
export default AirportPolicyInternational;