import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class TicketingPolicyFlights extends React.Component{
	constructor(props){
	   super(props);
	   this.goBack = this.goBack.bind(this);
	}
	goBack(){
	    this.props.history.goBack();
	}

	componentDidMount() {
		 window.activeAccordion();
	}
	render(){
		return(
			<div id="middle-content" className="homePage">
			  <div className="wrapper">
			    <div className="rows">
			    <button onClick={this.goBack} className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></button>
			    </div>
			    <div className="rows">
					<div className="main_title_top">
						<h3>Ticketing Policy</h3>
					</div>
				</div>{/* end.rows */}


			    <section id="section_innernya">
					<div className="rows">
						<div className="tabs_main_menu overflow_tabs">
							<Link to="" className="tabs_menu active">
								<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
								<span>Flights</span>
							</Link>
							<Link to="" className="tabs_menu">
							<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
								<span>Hotels</span>
							</Link>
							<Link to="" className="tabs_menu">
							<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
								<span>Trains</span>
							</Link>
							<Link to="" className="tabs_menu">
							<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
								<span>To Do and Events</span>
							</Link>
						</div>
				    </div>{/* end.rows */}
			    </section>

			    <section id="section_tabs_list">
			    	<div id="tnc-accodion">
				    	<div className="items">
			              <div className="page">
							<span>Important Info</span>
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
							<span>Refund</span>
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
							<span>Reschedule</span>
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
export default TicketingPolicyFlights;