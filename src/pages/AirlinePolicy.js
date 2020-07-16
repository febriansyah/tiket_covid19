import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class AirlinePolicy extends React.Component{
	render(){
		return(
			<div id="middle-content" className="homePage">
			  <div className="wrapper">
			    <div className="rows">
			      <a href="#" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></a>
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
					  </div>
					</div>{/* end.rows */}
					<div className="rows">
						<div className="block_policy full_block">
						  <div className="caption_policy">
						    <h3>Airlines Ticketing Guideline and Policy</h3>
			          		<span className="blue_rounded_txt no_marg">Published 29 April 2020</span>
						    <p>If you have any flights affected by the travel restrictions or COVID-19 pandemic, you can request a refund or reschedule. Find all information about special handling guidelines and policies for international flights below.</p>

						    <span className="linkBlue">Read more</span>
						  </div>
						</div>{/* end.block_policy */}
				    </div>{/* end.rows */}
			    </section>

			    <section id="section_tabs_list">

			      
			      
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