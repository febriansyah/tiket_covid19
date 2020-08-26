import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';
import StickyShare from './StickyShare';
import moment from 'moment';
import $ from 'jquery';
import NumberFormat from 'react-number-format';
import ReadMoreReact from 'read-more-react';
import Maps from './Maps';
import PopupForm from './PopupForm';
import { color } from '../components/color';
import { getColorByStatus } from '../utils/func';

const langnya = window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'
const dataLayer = window.dataLayer || [];
const urlCop = window.location.href;

class SearchResult extends React.Component{
	constructor(props) {
	   super(props);
	   this.state = {
			dataItem: null,
			dataCard: [],
			dataCardPolicy:[],
			dataCardPolicyItem:[],
			loading: true,
			defaultLangnya: langnya == langDef ? langnya : 'id',
			readyDataCard: false,
			valueCopy: urlCop,
		    copied: false,
	   };
	  
	   this.goBack = this.goBack.bind(this);
	}

	goBack() {
	    this.props.history.goBack();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.countryCode !== nextProps.match.params.countryCode) {
			$(".halBefore-kuis").fadeIn();

			this.setState({
				dataItem: null,
				readyDataCard: false
			}, () => {
				this.getCountryByCode(nextProps.match.params.countryCode, nextProps.match.params.kota);
				//this.getarrItems(nextProps.match.params.countryCode);
			})
		}
	}
	
	componentDidMount() {
		// window.popupSlider();

		if (this.state.defaultLangnya == 'id') {
			require('moment/locale/id');
		}
		
		//this.getarrItems(this.props.match.params.countryCode);

		let param = this.props.match.params.kota;
		
		{!!(param) ? this.getCountryByCode(this.props.match.params.countryCode, param):
			this.getCountryByCode(this.props.match.params.countryCode, '');
		}
	}

	getCountryByCode(countryCode, kota) {
		const apiUrl = 'https://api.tiketsafe.com/api/v2/';
		this.props.changeSelectedCountryCode(countryCode);
	
		if (!kota || kota === '') {
			axios.get(apiUrl + 'country?lang='+this.state.defaultLangnya+`&countryCode=${countryCode}`)
			.then(res => {
				//console.log(res.data.data[0].items, 'res country by CODE');
				
				let arrData = [];
				let arrItems = [];
				if (res.data.status === 'success') {
					if (res.data.data.length > 0) {
						arrData = res.data.data[0];
						arrItems = res.data.data[0].items
					}
				}

				this.setState({ dataItem: arrData }, () => {
					this.setState({ dataCard:arrItems });
					$(".halBefore-kuis").fadeOut();
					this.setState({ loading: false });
					this.setState({ dataCardPolicy:[]});
					setTimeout(() => {
						this.setState({ readyDataCard: true });
					}, 500);
				})
			})
			.catch(err => {
				this.setState({ loading: false });
			})
		} else {
			
			axios.get(apiUrl + 'country?lang='+this.state.defaultLangnya+`&countryCode=${countryCode}`+`&airportCode=${kota}`)
			.then(res => {
				// console.log(res.data.data[0].items, 'res country by CITY');
				
				let arrData = [];
				let arrItems = [];

				if (res.data.status === 'success') {
					if (res.data.data.length > 0) {
						arrData = res.data.data[0];
						arrItems = res.data.data[0].airportItems
					}
				}

				this.setState({ dataItem: arrData }, () => {
					//this.setState({ dataCard:arrItems });
					$(".halBefore-kuis").fadeOut();
					this.setState({ loading: false });
				})

				if (arrItems.length > 0) {
					this.setState({ dataCard: [] });
					this.setState({ dataCardPolicy: arrData.provinceCovidCase });
					this.setState({ dataCardPolicyItem: arrItems  });
					this.setState({ loading: false });
				}
			})
			.catch(err => {
				this.setState({ loading: false });
			})
		}
	}

	// getarrItems(countryCode) {
	// 	const apiUrl = 'https://api.tiketsafe.com/api/v2/';
	// 	this.props.changeSelectedCountryCode(countryCode);
	// 	let arrItems = [];

	// 	axios({
	// 		method: 'get',
	// 		url:apiUrl + `country?lang=`+this.state.defaultLangnya+`&countryCode=${countryCode}`,
	// 		headers: {
	// 			"Access-Control-Allow-Origin": "*"
	// 		}
	// 	})
	// 	.then(res => {
	// 		// console.log(res, 'res detail card');
			
	// 		arrItems = res.data.data[0].items;
			
	// 		this.setState({ dataCard: arrItems });

	// 		setTimeout(() => {
	// 			this.setState({ readyDataCard: true });
	// 		}, 1000);
	// 	})
	// 	.catch(err => {
	// 		this.setState({ loading: false });
	// 	})
	// }

	NotifyMeGtm = () => {
		dataLayer.push({'event': 'click','eventCategory' : 'notifyUser', 'eventLabel' : 'flight' });
		console.log(dataLayer)
	}
	onCopy = () => {
	    this.setState({copied: true});
	    $("#linkCopied").fadeIn();
	     setTimeout(function() { 
	      $("#linkCopied").fadeOut();
	    }, 2000);
	  };
	  urlCopy = () => {
	    let urlnya = window.location.href;
	    return urlnya;
	  }
	renderdetailinfo(dataCard, defaultLangnya) {
		return dataCard.map((carding, i) =>
			<Fragment key={i}>
				<div className={`block_policy full_block ${carding.description == '' ? 'hide' : carding.name}`}>
					<div className="caption_policy">
						<div className="detail-text-project">
							<h3>{carding.name}</h3>
							<div>
								{this.state.readyDataCard && <ReadMoreReact
									text={carding.description}
									readMoreText={defaultLangnya == 'id' ? 'Selengkapnya' : 'Read More'}
								/>}
							</div>
						</div>{/*><!--end.detail-text-project-->*/}
					</div>
				</div>
			</Fragment>
		);
	}

	render() {
		// console.log(this.state, 'search result');

		const { dataItem, defaultLangnya, dataCard ,dataCardPolicy,dataCardPolicyItem} = this.state;
 
		const host = 'https://tiketsafe.com';
		
		let confirmed = 0, deaths = 0, recovered = 0, countryName = '', mapsColor = '#FFFFFF', countryCode, longitude, latitude;

		let increaseConfirm = 0, increaseDeaths = 0, increaseRecovered = 0, increaseActived = 0;
			
		if (dataItem) {
			confirmed = dataItem.countryCovidCase.casePositive;
			deaths = dataItem.countryCovidCase.caseDeaths;
			recovered = dataItem.countryCovidCase.caseRecovered;

			increaseConfirm = dataItem.increaseCountryCovidCase.casePositive;
			increaseDeaths = dataItem.increaseCountryCovidCase.caseDeaths;
			increaseRecovered = dataItem.increaseCountryCovidCase.caseRecovered;
			increaseActived = increaseConfirm - increaseRecovered - increaseDeaths;



			if (dataCardPolicy.length !== 0) {
				confirmed = dataCardPolicy.casePositive;
				deaths = dataCardPolicy.caseDeaths;
				recovered = dataCardPolicy.caseRecovered;

				increaseConfirm = dataItem.increaseProvinceCovidCase.casePositive;
				increaseDeaths = dataItem.increaseProvinceCovidCase.caseDeaths;
				increaseRecovered = dataItem.increaseProvinceCovidCase.caseRecovered;
				increaseActived = increaseConfirm - increaseRecovered - increaseDeaths;
			}

			countryName = dataItem.countryName;
			countryCode = dataItem.countryCode;
			longitude = dataItem.longitude;
			latitude = dataItem.latitude;

			mapsColor = getColorByStatus(dataItem.status);

			if (dataCardPolicy.length !== 0) {
				countryName = dataCardPolicy.provinceName;
			}
		}
		
		return (
			<div id="middle-content" className="homePage">

				<div id="linkCopied">
			        <p>{defaultLangnya == 'id' ? 'Link sudah disalin!' : 'Link is copied!'}</p>
			    </div>
			  <div className="wrapper">
			  	{!this.state.loading && (
				  <div className="rows">
			    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
				  </div>
				)}

				
			    <section id="section_maps">
			
				<div className={`block_info alert_warning ${mapsColor != color.yellow && 'hide'}`}>
			      <img src={host+'/assets/images/icon_alert_warning.png'} className="icon_alert" alt='alert' />
			      <span>{defaultLangnya == 'id' ? 'Kunjungi dengan kewaspadaan ekstra' : 'Partially prohibited, check local policy'}</span>
			    </div>

			    <div className={`block_info alert_danger ${mapsColor != color.red && 'hide'}`}>
			      <img src={host+'/assets/images/icon_alert_danger.png'} className="icon_alert" alt='alert' />
			      <span>{defaultLangnya == 'id' ? 'Hindari bila tidak berkepentingan' : 'Prohibited, avoid non-essential travel'}</span>
			    </div>

			    <div className={`block_info alert_safe ${mapsColor != color.green && 'hide'}`}>
			      <img src={host+'/assets/images/icon_alert_safe.png'} className="icon_alert" alt='alert' />
			      <span>{defaultLangnya == 'id' ? 'Kunjungi dengan tindakan pencegahan' : 'Allowed, travel with safety precautions'}</span>
			    </div>

				{!this.state.loading && dataItem &&(
					<div className="rows">
						<div className="block_shadow">
						<h3>{dataItem && dataItem.countryName ? dataItem.countryName : countryName}</h3>
							<div onClick={this.NotifyMeGtm} className={`block_info block_info_notif trigger_slider_search ${mapsColor != color.red && 'hide'}`} data-slider="popup_email">
								<span>{defaultLangnya == 'id' ? 'Beritahu bila larangan sudah dicabut' : 'Notify when then prohibition is lifted'}</span>
							</div>
						</div>
					</div>
				)}

				<div className="rows">
			        <div className="relative">
					{!this.state.loading &&   dataCard && (
						<Maps
							parentName='Search'
							homeZoomLevel={5}
							countryCode={dataItem && dataItem.countryCode ? dataItem.countryCode : countryCode}
							countryName={dataItem && dataItem.countryName ? dataItem.countryName : countryName}
							longitude={parseFloat(longitude)}
							latitude={parseFloat(latitude)}
							loading={this.state.loading}
							{...this.props}
						/>)}
						
						{!this.state.loading && dataItem && (
							<div className="zoom_abs">
								<img src={host+"/assets/images/icon_zoom.png"} />
								<span>Zoom</span>
							</div>
						)}
			        </div>
			      </div>

			    </section>

				{this.state.loading && dataItem && (
					<div className="halBefore-kuis">
						<div className="box-loading2">
							<div className="spinner">
								<div className="bounce1"></div>
								<div className="bounce2"></div>
								<div className="bounce3"></div>
							</div>
						</div>
					</div>
				)}
				
			    <section id="section_result_maps">

				{!this.state.loading &&  dataItem &&  (
			      <div className="rows">
			        <div className="inner_section tabs_title">
			          <div className="left">
			            <h4>{defaultLangnya == 'id' ? 'Kasus COVID-19 di' : 'COVID-19 Cases in'} {countryName}</h4>
			            <p className={`green ${increaseConfirm <= 0 ? '' : 'hide'}`}>No new cases in {countryName} for 1 day</p>
			          </div>
			          {/* <div className="right">
			            <a href="#" className="arrow_up"><i className="fa fa-angle-up" aria-hidden="true"></i></a>
			          </div> */}
			        </div>
			      </div>
				)}

				{!this.state.loading &&  dataItem &&  (
			      <div className="rows">
			        <div className="block_shadow infodetail_cause">
			          <div className="row-list">
			            <div className="cols4">
			              <div className="info_cause">
			              	<span className={`growth ${increaseActived <= 0 ? 'green' : 'red'}`}>
			                	{increaseActived > 0 ? '+' : ''} <NumberFormat value={increaseActived} displayType={'text'} thousandSeparator={true}/>
			                </span>
			                <h4 className="number_cause">
			                	<NumberFormat value={confirmed - recovered - deaths} displayType={'text'} thousandSeparator={true}/>
			                </h4>
			                <p>{defaultLangnya == 'id' ? 'Kasus Aktif' : 'Active Cases'}</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			              	<span className={`growth ${increaseConfirm <= 0 ? 'green' : 'red'}`}>
			                	{increaseConfirm > 0 ? '+' : ''} <NumberFormat value={increaseConfirm} displayType={'text'} thousandSeparator={true}/>
			                </span>

			                <h4 className="number_cause">
			                	<NumberFormat value={confirmed} displayType={'text'} thousandSeparator={true}/>
			                </h4>
			                <p>{defaultLangnya == 'id' ? 'Total' : 'Total'}</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			              	<span className={`growth ${increaseRecovered <= 0 ? 'green' : 'green'}`}>
			                	{increaseRecovered > 0 ? '+' : ''} <NumberFormat value={increaseRecovered} displayType={'text'} thousandSeparator={true}/>
			                </span>
			                <h4 className="number_cause">
			                	<NumberFormat value={recovered} displayType={'text'} thousandSeparator={true}/>
			                </h4>
			                <p>{defaultLangnya == 'id' ? 'Sembuh' : 'Recoveries'}</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			              	<span className={`growth ${increaseDeaths <= 0 ? 'green' : 'red'}`}>
			                	{increaseDeaths > 0 ? '+' : ''} <NumberFormat value={increaseDeaths} displayType={'text'} thousandSeparator={true}/>
			                </span>
			                <h4 className="number_cause">
			                	<NumberFormat value={deaths} displayType={'text'} thousandSeparator={true}/>
			                </h4>
			                <p>{defaultLangnya == 'id' ? 'Meninggal' : 'Deaths'}</p>
			              </div>
			            </div>
			          </div>

						<span className="sourceName hide">{defaultLangnya == 'id' ? 'Data dari' : 'Source data by'} <a href="http://amcharts.com/" target="_blank">AMcharts</a></span>

						<span className="sourceNameRight hide">{defaultLangnya == 'id' ? 'Data 3 hari terakhir' : 'Last 3 days data'}</span>
			        </div>

			      </div>
				)}

				{dataCard && dataItem &&  (
				  <div className="rows">
			        <div className="important_things">
			          <h3 className="mediumFont">{defaultLangnya == 'id' ? 'Hal Penting Untuk Diketahui' : 'Important Things to Know'}</h3>
			          <p><ReadMoreReact
							text={defaultLangnya == 'id' ? 'Informasi di infopage ini dibuat hanya sebagai referensi dan tidak dapat digunakan sebagai rujukan sepenuhnya untuk melakukan perjalanan atau membeli produk. Sobat tiket dianjurkan untuk melakukan pencarian informasi yang komprehensif dari sumber yang dibuat oleh otoritas terkait, melakukan protokol kesehatan yang disarankan, dan cek status COVID-19 di mana pun berada agar tetap aman.' : 'The information on this infopage is made only for reference and cannot be used as a full reference for traveling or purchasing products. t-mates are advised to do information search from sources made by the relevant authorities as well as carrying out the recommended health protocols and check COVID-19 status in the destination.'}
							readMoreText={defaultLangnya == 'id' ? 'Selengkapnya' : 'Read More'}
								/></p><br />
			          <span className="blue_rounded_txt">{defaultLangnya == 'id' ? 'Diterbitkan' : 'Published'} {moment(dataItem.updatedTimestamp).format('DD MMMM YYYY')}</span>
			        </div>
				  </div>
				)}


		        <div className="contSticky">
				{dataCard && dataItem &&
		        	<div className="shareSocmed">
		              <FacebookShareButton url={this.urlCopy()} className="facebookShare" />
			            <TwitterShareButton url={this.urlCopy()}  className="twitterShare" />
			            <WhatsappShareButton url={this.urlCopy()}  className="waShare" />
			            <CopyToClipboard onCopy={this.onCopy} text={this.urlCopy()}>
			              <button className="linkShare"></button>
			            </CopyToClipboard>
				</div> }
					<div className="rows">
					  	{dataCard && dataItem && this.renderdetailinfo(dataCard, defaultLangnya)}

						{dataCardPolicyItem.length > 0 ?
						  	<div>
								{dataCardPolicyItem.map((item, k) => (
								
								<Fragment key={k}>
									<div className={`block_policy full_block ${item.description == '' ? 'hide' : item.name}`}>
										<div className="caption_policy">
											<div className="detail-text-project">
												<h3>{item.name}</h3>
												<div>
													<div dangerouslySetInnerHTML={{ __html: item.description }} />
												</div>
											</div>{/*><!--end.detail-text-project-->*/}
										</div>
									</div>
								</Fragment>
								))}
							</div>
							:
							''
						}
					</div>{/* end.rows */}
				</div>

			    </section>
				<PopupForm selectedCountryCode={countryCode}/>
				<StickyShare url={window.location.href} pathGtm='destination' />
			  </div>{/* end.wrapper */}
			</div>
		)
	}
}

export default SearchResult;