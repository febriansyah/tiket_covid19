import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StickyShare from './StickyShare';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = 'https://api.tiketsafe.com/api/v1/';
const headers = { "Access-Control-Allow-Origin": "*"};

class AirlinePolicyDetail extends Component{
	constructor(props) {
	   super(props);
	   this.state = {
			dataItem: null
	   }

	   this.goBack = this.goBack.bind(this);
	}

	goBack() {
	    this.props.history.goBack();
	}

	componentDidMount() {
		window.readmoreFade();
		window.activeAccordion();
		window.popupSlider();

		this.getAirlineDetail(this.props.location.state.serial);
	}

	getAirlineDetail(serial) {
		axios({
			method: 'get',
			url: proxyurl + apiUrl + `airline?lang=id&airlineSerial=${serial}`,
			headers
		})
		.then(res => {
			if (res.data.status === 'success') {
				this.setState({ dataItem: res.data.data });
			}
			
		})
	}

	render() {
		console.log(this.props, 'airline detail', this.state);
		const { dataItem } = this.state;
		
		return(
			<div id="middle-content" className="homePage">
			  <div className="wrapper">
			    <div className="rows">
			    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
			    </div>

			    <div className="rows">
					<div className="main_title_top">
						<h3>Airline Policy</h3>
					</div>
				</div>{/* end.rows */}

			    <section id="section_innernya">
			    	<div className="rows">
					  <div className="search_row">
					    <input type="text" id="searchTrigger_airlines" className="search_input" name="" placeholder="Search Airline" />
					    <div className="overlay_trigger trigger_slider_search" data-slider="popup_search_airplane_policy"></div>
					  </div>
					</div>{/* end.rows */}
			    </section>

			    <section id="section_tabs_list">
			    	<div id="tnc-accodion">
				    	<div className="items">
			              <div className="page active">
			              	<img src={dataItem && dataItem.imageURL} className="icon_airline" alt='airline_logo' />
							<span>{dataItem && dataItem.airlinesName}</span>
			              </div>

			              <div className="content active">
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


			              </div>{/* end.content */}
			            </div>
			    	</div>{/* end.tnc-accodion */}
			    </section>
			    <StickyShare />
			  </div>{/* end.wrapper */}
			</div>
		)
	}
}

export default AirlinePolicyDetail;