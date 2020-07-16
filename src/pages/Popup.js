import React, {Component} from 'react';

class Popup extends React.Component{
	render(){
		return(
			<div >
				<div id="popup_confirmasi" className="popup_slider hide">
					<div className="bg_popup"></div>
					<div className="content_slide_btm">
					    <div className="box_popup_search_auto">
					    	<div className="inner_popup">
					    		<h3>You will get a notification</h3>
					    		<p>We will send an email when the destination is open for visitors.</p>
					    		<div className="form_row">
						    		<div className="form_group">
						    			<button className="block_blue_bt" type="submit" >Ok </button>
						    		</div>
					    		</div> {/* end.form_row */}
					    	</div> {/* end.inner_popup */}
					    </div> {/* end.box_popup_search_auto */}
					</div> {/* end.content_slide_btm */}
				</div> {/* end.popup_slider */}

				<div id="popup_email" className="popup_slider hide">
					<div className="bg_popup"></div>
					<div className="content_slide_btm">
					    <div className="box_popup_search_auto">
					    	<div className="button_close_popup"><i class="fa fa-times" aria-hidden="true"></i></div>
					    	<div className="inner_popup">
					    		<h3>Enter Email Address</h3>
					    		<p>Notifications about the status of your destination will be sent to this email.</p>
					    		<div className="form_row">
						    		<div className="form_group">
						    			<input type="email" className="input_form" placeholder="Email" />
						    			<span className="erorr_help">Enter an email address.</span>
						    		</div>
					    		</div> {/* end.form_row */}

					    		<div className="form_row">
						    		<div className="form_group">
						    			<button className="block_blue_bt" type="submit" >Save </button>
						    		</div>
					    		</div> {/* end.form_row */}
					    	</div> {/* end.inner_popup */}
					    </div> {/* end.box_popup_search_auto */}
					</div> {/* end.content_slide_btm */}
				</div> {/* end.popup_slider */}


				<div id="popup_search" className="popup_slider hide">
					<div className="bg_popup"></div>
					<div className="content_slide_btm">
				    	<div className="line_half"></div>
				    	<div className="box_popup_search">
				    		<div className="rows">
						        <div className="main_title_top">
						          <h3>Going Anywhere?</h3>
						        </div>
						    </div>{/* end.rows */}
						    <div className="rows">
						        <div className="search_row">
						          <input type="text" className="search_input" name="" placeholder="Search cities or airports" />
						        </div>
						    </div> {/* end.rows */}
						    <div className="rows">
							    <div className="main_title grey_title hide">
						          <h3>Popular Destinations</h3>
						        </div>
						        <div className="list_noneResult">
						        	<div className="icon_noneResult">
						        		<img src="assets/images/no_result.png" />
						        	</div>
						        	<div className="caption_noneResult">
						        		<h3>Let’s use another keyword</h3>
						        		<p>This keyword has no result. Change your keyword and try again.</p>
						        	</div>
						        </div>{/* end.list_noneResult */}
						        <div className="list_autocomplete hide">
						          <div className="row_result_autocomplete">
						            <img src="assets/images/icon_general_city.png" className="icon_city" />
						            <span>Singapore, Singapore</span>
						          </div>
						          <div className="row_result_autocomplete">
						            <img src="assets/images/icon_general_city.png" className="icon_city" />
						            <span>Jakarta, Indonesia</span>
						          </div>
						          <div className="row_result_autocomplete">
						            <img src="assets/images/icon_general_city.png" className="icon_city" />
						            <span>Bali, Indonesia</span>
						          </div>
						          <div className="row_result_autocomplete">
						            <img src="assets/images/icon_general_city.png" className="icon_city" />
						            <span>Kuala Lumpur, Malaysia</span>
						          </div>
						          <div className="row_result_autocomplete">
						            <img src="assets/images/icon_general_city.png" className="icon_city" />
						            <span>Surabaya, Indonesia</span>
						          </div>
						          <div className="row_result_autocomplete">
						            <img src="assets/images/icon_general_city.png" className="icon_city" />
						            <span>Surabaya, Indonesia</span>
						          </div>
						        </div> {/* end.list_autocomplete */}
						    </div> {/* end.rows */}
				    	</div> {/* end.box_popup_search_auto */}
				    </div> {/* end.content_slide_btm */}
				</div>
			</div>

		)
	}
}
export default Popup;