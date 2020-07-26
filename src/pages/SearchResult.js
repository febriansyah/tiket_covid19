import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StickyShare from './StickyShare';
import moment from 'moment';
import $ from 'jquery';

import Maps from './Maps';


const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'

class SearchResult extends React.Component{
	constructor(props){
	   super(props);
	   this.state = {
			dataItem: null,
			loading: true,
		  	defaultLangnya: langnya == langDef ? langnya : 'id',
	   };

	   this.goBack = this.goBack.bind(this);
	}

	goBack() {
	    this.props.history.goBack();
	}

	componentDidMount() {
		window.readmoreFade();
		window.popupSlider();

		this.getCountryByCode(this.props.location.state.data.countryCode);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.location.state.data.countryCode !== nextProps.location.state.data.countryCode) {
			$(".halBefore-kuis").fadeIn();
			this.getCountryByCode(nextProps.location.state.data.countryCode);
		}
	}

	getCountryByCode(countryCode) {
		console.log(countryCode, 'cc');
		
		const proxyurl = "https://cors-anywhere.herokuapp.com/";
		const apiUrl = 'https://api.tiketsafe.com/api/v1/';

		axios({
			method: 'get',
			url:apiUrl + 'country?lang='+this.state.defaultLangnya+'&countryCode=${countryCode}',
			headers: {
				"Access-Control-Allow-Origin": "*"
			}
		})
		.then(res => {
			console.log(res, 'country');
			
			let arrData = [];
			if (res.data.status === 'success') {
				if (res.data.data.length > 0) {
					arrData = res.data.data[0];
				}
			}

			this.setState({ dataItem: arrData }, () => {
				$(".halBefore-kuis").fadeOut();
				this.setState({ loading: false });
			})
		})
		.catch(err => {
			console.log(err, 'here');
			this.setState({ loading: false });
		})
	}

	render() {
		// console.log(this.props,  'search result');

		const { dataItem } = this.state;
		const { state } = this.props.location;
		
		let confirmed = 0, deaths = 0, recovered = 0, countryName = '', color = '', labelReadMode = 'Loading..', countryCode, longitude, latitude;
		if (state && state.data) {
			confirmed = state.data.confirmed;
			deaths = state.data.deaths;
			countryCode = state.data.countryCode;
			recovered = state.data.recovered;
			countryName = state.data.title;
			color = state.data.color;
			longitude = state.data.longitude;
			latitude = state.data.latitude;
		}

		if (dataItem) {
			labelReadMode = 'Read More..';
			longitude = parseFloat(dataItem.longitude);
			latitude = parseFloat(dataItem.latitude);
		}

		console.log(dataItem, longitude, 'item');
		
		
		return(
			<div id="middle-content" className="homePage">
			  <div className="wrapper">
			    <div className="rows">
			    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
			    </div>

			    <div className={`block_info alert_warning ${color !== 'yellow' && 'hide'}`}>
			      <img src="assets/images/icon_alert_warning.png" className="icon_alert" alt='alert' />
			      <span>Partially prohibited, check local policy</span>
			    </div>

			    <div className={`block_info alert_danger ${color !== 'red' && 'hide'}`}>
			      <img src="assets/images/icon_alert_danger.png" className="icon_alert" alt='alert' />
			      <span>Prohibited, avoid non-essential travel</span>
			    </div>

			    <div className={`block_info alert_safe ${color !== 'green' && 'hide'}`}>
			      <img src="assets/images/icon_alert_safe.png" className="icon_alert" alt='alert' />
			      <span>Allowed, travel with safety precautions</span>
			    </div>

			    <section id="section_maps">
			      <div className="rows">
			        <div className="block_shadow">
			          <h3>{dataItem && dataItem.countryName ? dataItem.countryName : countryName}</h3>
						<div className={`block_info block_info_notif trigger_slider_search ${color !== 'red' && 'hide'}`} data-slider="popup_email">
							<span>Notify when then prohibition is lifted</span>
						</div>
			        </div>
			      </div>
			      <div className="rows">
			        <div className="frame_peta">
			          {/* <img src="assets/images/peta.png" /> */}
					  <Maps
					  	parentName='Search'
						homeZoomLevel={5}
						countryCode={dataItem && dataItem.countryCode ? dataItem.countryCode : countryCode}
						countryName={dataItem && dataItem.countryName ? dataItem.countryName : countryName}
						longitude={longitude}
						loading={this.state.loading}
						latitude={latitude}
					  	{...this.props}
					  />
			        </div>
			        
			      </div>
			    </section>

				<div className="halBefore-kuis">
					<div className="box-loading2">
						<div className="spinner">
							<div className="bounce1"></div>
							<div className="bounce2"></div>
							<div className="bounce3"></div>
						</div>
					</div>
				</div>

			    <section id="section_result_maps">
			      <div className="rows">
			        <div className="inner_section tabs_title">
			          <div className="left">
			            <h4>COVID-19 Cases in {dataItem && dataItem.countryName ? dataItem.countryName : countryName}</h4>
			            <p className="green">No new cases in {countryName} for 1 day</p>
			          </div>
			          {/* <div className="right">
			            <a href="#" className="arrow_up"><i className="fa fa-angle-up" aria-hidden="true"></i></a>
			          </div> */}
			        </div>
			      </div>
			      <div className="rows">
			        <div className="block_shadow infodetail_cause">
			          <div className="row-list">
			            <div className="cols4">
			              <div className="info_cause">
			                <h4 className="number_cause">{confirmed}</h4>
			                <p>Active Cases</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			                <h4 className="number_cause">{confirmed+ deaths}</h4>
			                <p>Total</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			                <h4 className="number_cause">{recovered}</h4>
			                <p>Recoveries</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			                <h4 className="number_cause">{deaths}</h4>
			                <p>Deaths</p>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>

			      {dataItem && <div className="rows">
			        <div className="important_things">
			          <h3 className="mediumFont">Important Things to Know</h3>
			          <p>List of requirements to fulfill and regulations to follow.</p><br />
			          <span className="blue_rounded_txt">Published {moment(dataItem.updatedTimestamp).format('DD MM YYYY')}</span>
			        </div>
			      </div>}

			      <div className="rows">
					<div className="block_policy full_block">
					  <div className="caption_policy">
						<div className="detail-text-project">
						    <h3>Entry Restrictions</h3>
						    <p><strong>{dataItem && dataItem.entryRestrictionsDesc}</strong></p><br />
							<p className="read-more"><span className="linkBlue button-readmore">{labelReadMode}</span></p>
					    </div>{/*><!--end.detail-text-project-->*/}
					  </div>
					</div>

					<div className="block_policy full_block">
					  <div className="caption_policy">
						<div className="detail-text-project">
							<h3>Entry Restrictions Exemptions</h3>
							<p>{dataItem && dataItem.entryRestrictionsExemptionsDesc}</p><br />
							<p className="read-more"><span className="linkBlue button-readmore">{labelReadMode}</span></p>
						</div>
					  </div>
					</div>

					<div className="block_policy full_block">
					  <div className="caption_policy">
						<div className="detail-text-project">
						    <h3>Additional Entry Requirements</h3>
						    <p>{dataItem && dataItem.additionalEntryRequirementsDesc}</p>
						    <p className="read-more"><span className="linkBlue button-readmore">{labelReadMode}</span></p>
					    </div>{/*><!--end.detail-text-project-->*/}
					  </div>
					</div>

					<div className="block_policy full_block">
					  <div className="caption_policy">
						<div className="detail-text-project">
						    <h3>Quarantine Policy</h3>
						    <p>{dataItem && dataItem.quarantinePolicyDesc}</p><br />
							<p className="read-more"><span className="linkBlue button-readmore">{labelReadMode}</span></p>
					    </div>{/*><!--end.detail-text-project-->*/}
					  </div>
					</div>

					<div className="block_policy full_block">
					  <div className="caption_policy">
						<div className="detail-text-project">
						    <h3>Visa Policy</h3>
						    <p>{dataItem && dataItem.visaPolicyDesc}</p><br />
							<p className="read-more"><span className="linkBlue button-readmore">{labelReadMode}</span></p>
					    </div>{/*><!--end.detail-text-project-->*/}
					  </div>
					</div>

					<div className="block_policy full_block">
					  <div className="caption_policy">
						<div className="detail-text-project">
						    <h3>Transit Policy</h3>
						    <p>{dataItem && dataItem.transitPolicyDesc}</p><br />
						    <p className="read-more"><span className="linkBlue button-readmore">{labelReadMode}</span></p>
					    </div>{/*><!--end.detail-text-project-->*/}
					  </div>
					</div>

			      </div>{/* end.rows */}
			    </section>
			    <StickyShare />
			  </div>{/* end.wrapper */}
			</div>
		)
	}
}

export default SearchResult;