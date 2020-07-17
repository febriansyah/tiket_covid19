import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SearchResult extends React.Component{
	constructor(props){
	   super(props);
	   this.goBack = this.goBack.bind(this);
	}
	goBack(){
	    this.props.history.goBack();
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
			    <div className="block_info alert_warning hide">
			      <img src="assets/images/icon_alert_warning.png" className="icon_alert" />
			      <span>Partially prohibited, check local policy</span>
			    </div>


			    <div className="block_info alert_danger hide">
			      <img src="assets/images/icon_alert_danger.png" className="icon_alert" />
			      <span>Prohibited, avoid non-essential travel</span>
			    </div>

			    <div className="block_info alert_safe">
			      <img src="assets/images/icon_alert_safe.png" className="icon_alert" />
			      <span>Allowed, travel with safety precautions</span>
			    </div>

			    <section id="section_maps">
			      <div className="rows">
			        <div className="block_shadow">
			          <h3>Singapore</h3>
						<div className="block_info_notif hide">
							<span>Notify when then prohibition is lifted</span>
						</div>
			        </div>
			      </div>
			      <div className="rows">
			        <div className="frame_peta">
			          <img src="assets/images/peta.png" />
			        </div>
			        
			      </div>
			    </section>

			    <section id="section_result_maps">
			      <div className="rows">
			        <div className="inner_section tabs_title">
			          <div className="left">
			            <h4>COVID-19 Cases in Singapore</h4>
			            <p className="green">No new cases in Singapore for 1 day</p>
			          </div>
			          <div className="right">
			            <a href="#" className="arrow_up"><i className="fa fa-angle-up" aria-hidden="true"></i></a>
			          </div>
			        </div>
			      </div>
			      <div className="rows">
			        <div className="block_shadow infodetail_cause">
			          <div className="row-list">
			            <div className="cols4">
			              <div className="info_cause">
			                <span className="growth red">+111</span>
			                <h4 className="number_cause">24,064</h4>
			                <p>Active Cases</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			                <span className="growth green">0</span>
			                <h4 className="number_cause">58,253</h4>
			                <p>Total</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			                <span className="growth red">+11</span>
			                <h4 className="number_cause">24,064</h4>
			                <p>Recoveries</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			                <span className="growth green">+0</span>
			                <h4 className="number_cause">253</h4>
			                <p>Deaths</p>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			      <div className="rows">
			        <div className="important_things">
			          <h3 className="mediumFont">Important Things to Know</h3>
			          <p>List of requirements to fulfill and regulations to follow.</p>
			          <span className="blue_rounded_txt">Published 29 April 2020</span>
			        </div>
			      </div>
			      <div className="rows">
					<div className="block_policy full_block">
					  <div className="caption_policy">

						<div className="detail-text-project">

						    <h3>Entry Restrictions</h3>
						    <p><strong>1. Passengers traveling as short-term visitors are not allowed to transit or enter Singapore.</strong></p><br />
						    <p>- This does not apply to returning residents of Singapore (Singapore Citizens, Permanent Residents or passengers with a Long-Term.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<p className="read-more"><span className="linkBlue button-readmore">Read More..</span></p>
						    

					    </div>{/*><!--end.detail-text-project-->*/}
					  </div>
					</div>{/* end.block_policy */}

					<div className="block_policy full_block">
					  <div className="caption_policy">
					    <h3>Entry Restrictions Exemptions</h3>
					    <p>Social distancing and enhanced precautions recommeded.</p>
					  </div>
					</div>{/* end.block_policy */}

					<div className="block_policy full_block">
					  <div className="caption_policy">

						<div className="detail-text-project">
						    <h3>Additional Entry Requirements</h3>
						    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...</p>
						    <p className="read-more"><span className="linkBlue button-readmore">Read More..</span></p>
					    </div>{/*><!--end.detail-text-project-->*/}
					  </div>
					</div>{/* end.block_policy */}

					<div className="block_policy full_block">
					  <div className="caption_policy">

						<div className="detail-text-project">
						    <h3>Quarantine Policy</h3>
						    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...</p>
							<p className="read-more"><span className="linkBlue button-readmore">Read More..</span></p>
					    </div>{/*><!--end.detail-text-project-->*/}
					  </div>
					</div>{/* end.block_policy */}

					<div className="block_policy full_block">
					  <div className="caption_policy">

						<div className="detail-text-project">
						    <h3>Visa Policy</h3>
						    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...</p>
							<p className="read-more"><span className="linkBlue button-readmore">Read More..</span></p>
					    </div>{/*><!--end.detail-text-project-->*/}
					  </div>
					</div>{/* end.block_policy */}

					<div className="block_policy full_block">
					  <div className="caption_policy">

						<div className="detail-text-project">
						    <h3>Transit Policy</h3>
						    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...</p>
						    <p className="read-more"><span className="linkBlue button-readmore">Read More..</span></p>
					    </div>{/*><!--end.detail-text-project-->*/}
					  </div>
					</div>{/* end.block_policy */}

			      </div>{/* end.rows */}
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
export default SearchResult;