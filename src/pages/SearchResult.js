import React, {Component} from 'react';

class SearchResult extends React.Component{
	render(){
		return(
			<div id="middle-content" class="homePage">
			  <div class="wrapper">
			    <div class="rows">
			      <a href="#" class="back_button"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
			    </div>
			    <div class="block_info alert_warning">
			      <img src="assets/images/icon_alert_warning.png" class="icon_alert" />
			      <span>Partially prohibited, check local policy</span>
			    </div>

			    <section id="section_maps">
			      <div class="rows">
			        <div class="block_shadow">
			          <h3>Singapore</h3>
			        </div>
			      </div>
			      <div class="rows">
			        <div class="frame_peta">
			          <img src="assets/images/peta.png" />
			        </div>
			        
			      </div>
			    </section>

			    <section id="section_result_maps">
			      <div class="rows">
			        <div class="inner_section tabs_title">
			          <div class="left">
			            <h4>COVID-19 Cases in Singapore</h4>
			            <p class="green">No new cases in Singapore for 1 day</p>
			          </div>
			          <div class="right">
			            <a href="#" class="arrow_up"><i class="fa fa-angle-up" aria-hidden="true"></i></a>
			          </div>
			        </div>
			      </div>
			      <div class="rows">
			        <div class="block_shadow infodetail_cause">
			          <div class="row-list">
			            <div class="cols4">
			              <div class="info_cause">
			                <span class="growth red">+111</span>
			                <h4 class="number_cause">24,064</h4>
			                <p>Active Cases</p>
			              </div>
			            </div>
			            <div class="cols4">
			              <div class="info_cause">
			                <span class="growth green">0</span>
			                <h4 class="number_cause">58,253</h4>
			                <p>Total</p>
			              </div>
			            </div>
			            <div class="cols4">
			              <div class="info_cause">
			                <span class="growth red">+11</span>
			                <h4 class="number_cause">24,064</h4>
			                <p>Recoveries</p>
			              </div>
			            </div>
			            <div class="cols4">
			              <div class="info_cause">
			                <span class="growth green">+0</span>
			                <h4 class="number_cause">253</h4>
			                <p>Deaths</p>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			      <div class="rows">
			        <div class="important_things">
			          <h3 class="mediumFont">Important Things to Know</h3>
			          <p>List of requirements to fulfill and regulations to follow.</p>
			          <span class="blue_rounded_txt">Published 29 April 2020</span>
			        </div>
			      </div>
			      <div class="rows">
			      </div>
			    </section>
			  </div>
			</div>
		)
	}
}
export default SearchResult;