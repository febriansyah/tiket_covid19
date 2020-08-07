import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StickyShare from './StickyShare';
import moment from 'moment';
import $ from 'jquery';
import NumberFormat from 'react-number-format';
import ReadMoreReact from 'read-more-react';
import Maps from './Maps';
import { color } from '../components/color';
import { getColorByStatus } from '../utils/func';
import queryString from 'query-string';

const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'

class SearchResult extends React.Component{
	constructor(props) {
	   super(props);
	   this.state = {
			dataItem: null,
			dataCard: [],
			dataCardPolicy:[],
			dataCardPolicyItem:[],
			dataCovid: null,
			loading: true,
			defaultLangnya: langnya == langDef ? langnya : 'id',
			readyDataCard: false,
	   };
	  
	   this.goBack = this.goBack.bind(this);
	}

	goBack() {
	    this.props.history.goBack();
	}

	componentDidMount() {
		window.readmoreFade();
		window.popupSlider();
		this.getCountryByCode(this.props.match.params.countryCode);
		this.getCovidData(this.props.match.params.countryCode);
		this.getarrItems(this.props.match.params.countryCode);
		let param=queryString.parse(this.props.location.search);
		{!!(param.kota)?this.getCountryByCode(this.props.match.params.countryCode,param.kota):this.getCountryByCode(this.props.match.params.countryCode,'')}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.countryCode !== nextProps.match.params.countryCode) {
			$(".halBefore-kuis").fadeIn();
			this.getCountryByCode(nextProps.match.params.countryCode);
			this.getCovidData(nextProps.match.params.countryCode);
			if (this.props.match.params.airportCode !== nextProps.match.params.airportCode) {
				console.log(this.props.match.params.airportCode);

			}
			this.setState({
				readyDataCard: false
			}, () => {
				this.getarrItems(nextProps.match.params.countryCode);
			})
		}
	}

	getCovidData(countryCode) {
        axios({
            method: 'get',
            url: 'https://cors-anywhere.herokuapp.com/' + 'https://covid.amcharts.com/data/js/world_timeline.js',
            headers: { "Access-Control-Allow-Origin": "*" }
        })
        .then(res => {
            let data = res.data.replace(/\s/g, '').split('=')[1];
            let arrData = JSON.parse(data);
            let dataCovid = null;
            
            if (Array.isArray(arrData) && arrData.length > 0) {
				dataCovid = arrData[arrData.length - 1].list.filter(covid => covid.id === countryCode)[0];
			}

			this.setState({ dataCovid });
        })
    }

	getCountryByCode(countryCode,kota) {
		const apiUrl = 'https://api.tiketsafe.com/api/v2/';
		this.props.changeSelectedCountryCode(countryCode);

		if(kota === '')
		{
			axios({
				method: 'get',
				url:apiUrl + `country?lang=`+this.state.defaultLangnya+`&countryCode=${countryCode}`,
				headers: {
					"Access-Control-Allow-Origin": "*"
				}
			})
			.then(res => {
				//console.log(res.data.data[0].items, 'country');
				console.log('wewaw')
				let arrData = [];
				let arrItems = [];
				if (res.data.status === 'success') {
					if (res.data.data.length > 0) {
						arrData = res.data.data[0];
						arrItems = res.data.data[0].items
					}
				}

				this.setState({ dataItem: arrData }, () => {
					//this.setState({ dataCard:arrItems });
					$(".halBefore-kuis").fadeOut();
					this.setState({ loading: false });
				})

				if (arrItems.length > 0) {
					this.setState({ dataCard: arrItems });
					//this.setState({ dataCardPolicy:[]});
				}

				
			})
			.catch(err => {
				this.setState({ loading: false });
			})

		}else{

			axios({
				method: 'get',
				url:apiUrl + `country?lang=`+this.state.defaultLangnya+`&countryCode=${countryCode}`+`&airportCode=${kota}`,
				headers: {
					"Access-Control-Allow-Origin": "*"
				}
			})
			.then(res => {
				//console.log(res.data.data[0].items, 'country');
				
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
				}

				
			})
			.catch(err => {
				this.setState({ loading: false });
			})

		}
	}

	getarrItems(countryCode) {
		const apiUrl = 'https://api.tiketsafe.com/api/v2/';
		this.props.changeSelectedCountryCode(countryCode);
		let arrItems = [];

		axios({
			method: 'get',
			url:apiUrl + `country?lang=`+this.state.defaultLangnya+`&countryCode=${countryCode}`,
			headers: {
				"Access-Control-Allow-Origin": "*"
			}
		})
		.then(res => {
				arrItems = res.data.data[0].items;
				
				this.setState({ dataCard: arrItems });

				setTimeout(() => {
					this.setState({ readyDataCard: true });
				}, 1000);
		})
		.catch(err => {
			this.setState({ loading: false });
		})
	}

	renderdetailinfo(dataCard, defaultLangnya) {
		console.log(this.state.readyDataCard, 'this.state.readyDataCard');
		
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
		//console.log(this.props,  'search result', this.state);

		const { dataItem, dataCovid, defaultLangnya, dataCard ,dataCardPolicy,dataCardPolicyItem} = this.state;
		
		let confirmed = 0, deaths = 0, recovered = 0, countryName = '', mapsColor = '#FFFFFF', labelReadMode = 'Loading..', countryCode, longitude, latitude;

	//console.log(dataCardPolicy.length);	
			if (dataCovid) {
				confirmed = dataCovid.confirmed;
				deaths = dataCovid.deaths;
				recovered = dataCovid.recovered;

				if(dataCardPolicy.length !== 0){
					console.log('masuk');
					confirmed = dataCardPolicy.casePositive;
					deaths = dataCardPolicy.caseDeaths;
					recovered = dataCardPolicy.caseRecovered;
				}
			}
			
			

		
		if (dataItem) {
			labelReadMode = 'Read More..';
			countryName = dataItem.countryName;
			countryCode = dataItem.countryCode;
			longitude = dataItem.longitude;
			latitude = dataItem.latitude;
			mapsColor = getColorByStatus(dataItem.status);

			if(dataCardPolicy.length !== 0){
				countryName = dataCardPolicy.provinceName;
			}
		}
		
		return(
			<div id="middle-content" className="homePage">
			
			  <div className="wrapper">
			    <div className="rows">
			    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
			    </div>

			   

			    <section id="section_maps">
				<div className={`block_info alert_warning ${mapsColor != color.yellow && 'hide'}`}>
			      <img src="../assets/images/icon_alert_warning.png" className="icon_alert" alt='alert' />
			      <span>{defaultLangnya == 'id' ? 'Kunjungi dengan kewaspadaan ekstra' : 'Partially prohibited, check local policy'}</span>
			    </div>

			    <div className={`block_info alert_danger ${mapsColor != color.red && 'hide'}`}>
			      <img src="../assets/images/icon_alert_danger.png" className="icon_alert" alt='alert' />
			      <span>{defaultLangnya == 'id' ? 'Hindari bila tidak berkepentingan' : 'Hindari bila tidak berkepentingan'}</span>
			    </div>

			    <div className={`block_info alert_safe ${mapsColor != color.green && 'hide'}`}>
			      <img src="../assets/images/icon_alert_safe.png" className="icon_alert" alt='alert' />
			      <span>{defaultLangnya == 'id' ? 'Kunjungi dengan tindakan pencegahan' : 'Allowed, travel with safety precautions'}</span>
			    </div>

			      <div className="rows">
			        <div className="block_shadow">
			          <h3>{dataItem && dataItem.countryName ? dataItem.countryName : countryName}</h3>
						<div className={`block_info block_info_notif trigger_slider_search ${mapsColor === color.yellow && 'hide'} ${mapsColor === color.green && 'hide'}`} data-slider="popup_email">
							<span>{defaultLangnya == 'id' ? 'Beritahu bila larangan sudah dicabut' : 'Notify when then prohibition is lifted'}</span>
						</div>
			        </div>
			      </div>
			      <div className="rows">
			        <div className="relative">
						<Maps
							parentName='Search'
							homeZoomLevel={5}
							countryCode={dataItem && dataItem.countryCode ? dataItem.countryCode : countryCode}
							countryName={dataItem && dataItem.countryName ? dataItem.countryName : countryName}
							longitude={parseFloat(longitude)}
							latitude={parseFloat(latitude)}
							loading={this.state.loading}
							{...this.props}
						/>
						<div className="zoom_abs">
							<img src="../assets/images/icon_zoom.png" />
							<span>Zoom</span>
						</div>
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
			            <h4>{defaultLangnya == 'id' ? 'Kasus COVID-19 di' : 'COVID-19 Cases in'} {countryName && countryName ? countryName : countryName}</h4>
			            <p className="green hide">No new cases in {countryName} for 1 day</p>
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
			                <h4 className="number_cause">
			                	<NumberFormat value={confirmed} displayType={'text'} thousandSeparator={true}/>
			                </h4>
			                <p>{defaultLangnya == 'id' ? 'Kasus Aktif' : 'Active Cases'}</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			                <h4 className="number_cause">
			                	<NumberFormat value={confirmed+ deaths} displayType={'text'} thousandSeparator={true}/>
			                </h4>
			                <p>{defaultLangnya == 'id' ? 'Total' : 'Total'}</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			                <h4 className="number_cause">
			                	<NumberFormat value={recovered} displayType={'text'} thousandSeparator={true}/>
			                </h4>
			                <p>{defaultLangnya == 'id' ? 'Sembuh' : 'Recoveries'}</p>
			              </div>
			            </div>
			            <div className="cols4">
			              <div className="info_cause">
			                <h4 className="number_cause">
			                	<NumberFormat value={deaths} displayType={'text'} thousandSeparator={true}/>
			                </h4>
			                <p>{defaultLangnya == 'id' ? 'Meninggal' : 'Deaths'}</p>
			              </div>
			            </div>
			          </div>

						<span className="sourceName">{defaultLangnya == 'id' ? 'Data dari' : 'Source data by'} <a href="http://amcharts.com/" target="_blank">AMcharts</a></span>

						<span className="sourceNameRight hide">{defaultLangnya == 'id' ? 'Data 3 hari terakhir' : 'Last 3 days data'}</span>
			        </div>

			      </div>

			      {dataItem && <div className="rows">
			        <div className="important_things">
			          <h3 className="mediumFont">{defaultLangnya == 'id' ? 'Hal Penting Untuk Diketahui' : 'Important Things to Know'}</h3>
			          <p>{defaultLangnya == 'id' ? 'Daftar persyaratan dan peraturan yang harus ditaati.' : 'List of requirements to fulfill and regulations to follow.'}</p><br />
			          <span className="blue_rounded_txt">{defaultLangnya == 'id' ? 'Published' : 'Published'} {moment(dataItem.updatedTimestamp).format('DD MMMM YYYY')}</span>
			        </div>
			      </div>}

			      <div className="rows">
				  	{dataCard && this.renderdetailinfo(dataCard, defaultLangnya)}

					  {dataCardPolicyItem.length > 0 ?
						<section id="section_tabs_list">
								<div id="tnc-accodion">
									<div className="items">
										<div className="page active">
											<span>{this.state.dataItem && this.state.dataItem.airportName} </span>
										</div>
										<div className="content active">
											{dataCardPolicyItem.map((item, k) => (
												<div className="rowHtml" key={k}>
													<h3>{item.description == '' ? '' : item.name}</h3>
													<div dangerouslySetInnerHTML={{ __html: item.description }} />
												</div>
											))}
										</div>
									</div>
								</div>{/* end.tnc-accodion */}
							</section> : '' }
			      </div>{/* end.rows */}
			    </section>
				

				<StickyShare url={window.location.href}/>
			  </div>{/* end.wrapper */}
			</div>
		)
	}
}

export default SearchResult;