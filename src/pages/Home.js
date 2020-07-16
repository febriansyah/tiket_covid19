import React, {Component} from 'react';

class Home extends React.Component{
	render(){
		return(

			<div id="middle-content" className="homePage">
				<div className="wrapper">
					<div className="rows">
						<a href="#" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></a>
					</div>{/* end.rows */}
					<div className="rows">
						<div className="main_title_top">
							<h3>Travel Guidelines</h3>
						</div>
					</div>{/* end.rows */}

					<section id="section_maps">
						<div className="rows">
						  <div className="search_row">
						    <input type="text" id="searchTrigger" className="search_input" name="" placeholder="Going anywhere ?" />
						  </div>
						</div>{/* end.rows */}
						<div className="rows">
						  <div className="main_title">
						    <h3>COVID-19 Travel Advisory Level</h3>
						  </div>
						  <div className="frame_peta">
						    <img src="assets/images/peta.png" />
						  </div>
						  <div className="legend_info">
						    <div className="row_legend">
						      <div className="circle_l green_c"></div>
						      <span>Allowed, travel with safety precautions</span>
						    </div>{/* end.row_legend */}
						    <div className="row_legend">
						      <div className="circle_l yellow_c"></div>
						      <span>Partially prohibited, check local policy</span>
						    </div>{/* end.row_legend */}
						    <div className="row_legend">
						      <div className="circle_l red_c"></div>
						      <span>Prohibited, avoid non-essential travel</span>
						    </div>{/* end.row_legend */}
						  </div>{/* end.legend_info */}
						</div>{/* end.rows */}
					</section>

					<section id="section_regulation">
						<div className="rows">
						  <div className="main_title">
						    <h3>Regulation & Policy</h3>
						  </div>
						</div>
						<div className="rows">
						  <div className="list_policy">
						    <div className="block_policy">
						      <div className="icon_policy">
						        <img src="assets/images/icon_airlines_polic.png" />
						      </div>
						      <div className="caption_policy">
						        <h3>Airline Policy</h3>
						        <p>Latest information on airline service and policy.</p>
						      </div>
						    </div>

						    <div className="block_policy">
						      <div className="icon_policy">
						        <img src="assets/images/icon_airport_policy.png" />
						      </div>
						      <div className="caption_policy">
						        <h3>Airport Policy</h3>
						        <p>Latest information on airport travel regulations & policy.</p>
						      </div>
						    </div>

						    <div className="block_policy">
						      <div className="icon_policy">
						        <img src="assets/images/icon_how_to_buy_tic.png" />
						      </div>
						      <div className="caption_policy">
						        <h3>Ticketing Policy</h3>
						        <p>Latest information on how to purchase, refund, and reschedule</p>
						      </div>
						    </div>
						  </div>
						</div>
					</section>

				</div>{/* end.wrapper */}
			</div>
		)
	}
}
export default Home;