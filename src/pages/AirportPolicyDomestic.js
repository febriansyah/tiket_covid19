import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = 'https://api.tiketsafe.com/api/v1/';

class AirportPolicyDomestic extends React.Component{
	constructor(props){
	   super(props);
	   this.goBack = this.goBack.bind(this);
	}
	goBack(){
	    this.props.history.goBack();
	}
	componentDidMount() {
		 window.readmoreFade();
		 window.activeAccordion();
		 window.popupSlider();
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps, 'nextProps');
		if (nextProps.match.params && nextProps.match.params.airportCode) {
			this.getAirportDetail(nextProps.match.params.airportCode)
		}
	}

	getAirportDetail(airportCode) {
		axios({
			method: 'get',
			url: proxyurl + apiUrl + `airports?airportCode=${airportCode}`,
			headers: { "Access-Control-Allow-Origin": "*" }
		})
		.then(res => {
			console.log(res, 'res');
			
		})
	}

	render() {
		console.log('aiport domestic');
		
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
			    </section>

			    <section id="section_tabs_list">
			    	<div id="tnc-accodion">
				    	<div className="items">
			              <div className="page">
							<span>Bali Airport</span>
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


			              </div>{/* end.content */}
			            </div>

			            <div className="items">
			              <div className="page">
							<span>Balikpapan Airport</span>
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


			              </div>{/* end.content */}
			            </div>

			            <div className="items">
			              <div className="page">
							<span>Bangka Belitung Airport</span>
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


			              </div>{/* end.content */}
			            </div>

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
export default AirportPolicyDomestic;