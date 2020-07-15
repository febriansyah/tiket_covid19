import React, {Component} from 'react';

class Home extends React.Component{
	render(){
		return(

			<div id="middle-content" class="homePage">
				<div class="wrapper">
					<div class="rows">
						<a href="#" class="back_button"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
					</div>{/* end.rows */}
					<div class="rows">
						<div class="main_title_top">
							<h3>Travel Guidelines</h3>
						</div>
					</div>{/* end.rows */}

					<section id="section_maps">
						<div class="rows">
						  <div class="search_row">
						    <input type="text" class="search_input" name="" placeholder="Going anywhere ?" />
						  </div>
						</div>{/* end.rows */}
						<div class="rows">
						  <div class="main_title">
						    <h3>COVID-19 Travel Advisory Level</h3>
						  </div>
						  <div class="frame_peta">
						    <img src="assets/images/peta.png" />
						  </div>
						  <div class="legend_info">
						    <div class="row_legend">
						      <div class="circle_l green_c"></div>
						      <span>Allowed, travel with safety precautions</span>
						    </div>{/* end.row_legend */}
						    <div class="row_legend">
						      <div class="circle_l yellow_c"></div>
						      <span>Partially prohibited, check local policy</span>
						    </div>{/* end.row_legend */}
						    <div class="row_legend">
						      <div class="circle_l red_c"></div>
						      <span>Prohibited, avoid non-essential travel</span>
						    </div>{/* end.row_legend */}
						  </div>{/* end.legend_info */}
						</div>{/* end.rows */}
					</section>

					<section id="section_regulation">
						<div class="rows">
						  <div class="main_title">
						    <h3>Regulation & Policy</h3>
						  </div>
						</div>
						<div class="rows">
						  <div class="list_policy">
						    <div class="block_policy">
						      <div class="icon_policy">
						        <img src="assets/images/icon_airlines_polic.png" />
						      </div>
						      <div class="caption_policy">
						        <h3>Airline Policy</h3>
						        <p>Latest information on airline service and policy.</p>
						      </div>
						    </div>

						    <div class="block_policy">
						      <div class="icon_policy">
						        <img src="assets/images/icon_airport_policy.png" />
						      </div>
						      <div class="caption_policy">
						        <h3>Airport Policy</h3>
						        <p>Latest information on airport travel regulations & policy.</p>
						      </div>
						    </div>

						    <div class="block_policy">
						      <div class="icon_policy">
						        <img src="assets/images/icon_how_to_buy_tic.png" />
						      </div>
						      <div class="caption_policy">
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