import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class AirlinePolicy extends Component{
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
	render(){
		return(
			<div id="middle-content" className="homePage">
			  <div className="wrapper">
			    <div className="rows">
<<<<<<< HEAD
			    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
=======
			    	<button onClick={() => this.props.history.goBack()} className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></button>
>>>>>>> dadf617c0539624ae22a3864b67dabf00c403830
			    </div>
			    <div className="rows">
					<div className="main_title_top">
						<h3>Airline Policy</h3>
					</div>
				</div>{/* end.rows */}


			    <section id="section_innernya">
			    	<div className="rows">
					  <div className="search_row">
					    <input type="text" id="searchTrigger_airlines" className="search_input trigger_slider_search" data-slider="popup_search_airplane_policy" name="" placeholder="Search Airline" />
					  </div>
					</div>{/* end.rows */}
					<div className="rows">
						<div className="block_policy full_block">
						  <div className="caption_policy">
							<div className="detail-text-project">
							    <h3>Airlines Ticketing Guideline and Policy</h3>
				          		<span className="blue_rounded_txt no_marg">Published 29 April 2020</span>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...</p>
								<p className="read-more"><span className="linkBlue button-readmore">Read More..</span></p>
						    </div>{/*><!--end.detail-text-project-->*/}
						  </div>
						</div>{/* end.block_policy */}
				    </div>{/* end.rows */}
			    </section>

			    <section id="section_tabs_list">
			    	<div id="tnc-accodion">
				    	<div className="items">
			              <div className="page">
			              	<img src="assets/images/air_canada_1.png" className="icon_airline" />
							<span>Air Canada</span>
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
			              	<img src="assets/images/air_new_zealand_1.png" className="icon_airline" />
							<span>Air New Zealand</span>
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
			              	<img src="assets/images/ana_1.png" className="icon_airline" />
							<span>All Nippon Airways</span>
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
export default AirlinePolicy;