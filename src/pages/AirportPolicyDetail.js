import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import $ from 'jquery'; 
import axios from 'axios';
import StickyShare from './StickyShare';
import PopupAirport from './PopupAirport';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = 'https://api.tiketsafe.com/api/v2/';
const headers = { "Access-Control-Allow-Origin": "*" };
const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'
const dataLayer = window.dataLayer || [];
const urlCop = window.location.href;

class AirportPolicyDetail extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			dataItem: null,
			descItem:[],
			defaultLangnya: langnya == langDef ? langnya : 'id',
			valueCopy: urlCop,
			copied: false,
		};
	}

	

	componentDidMount() {
		//console.log('mssu'+this.props.match.params.airportCode);
		 if (this.props.match.params.airportCode) {
			this.getAirportDetail(this.props.match.params.airportCode);
		}

		//window.popupSlider();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.airportCode) {
			this.getAirportDetail(nextProps.match.params.airportCode);
		}
	}
	
	getAirportDetail(airportCode) {
		console.log(airportCode);
		axios({
			method: 'get',
			url:apiUrl + `airport?lang=`+this.state.defaultLangnya+`&airportCode=${airportCode}`,
			headers
		})
		.then(res => {
			console.log(res.data.data.items, 'res airport by code');
			if (res.data.status === 'success') {
				this.setState({ dataItem: res.data.data });
				this.setState({ descItem: res.data.data.items });
			}
		})
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
	popupShow = () => {
      $("#popup_search_airport_policy").removeClass("hide");
      setTimeout(function() {
          $("#popup_search_airport_policy").addClass("actived");
        }, 500);
    }
    accordionHide = () => {
      $("#accorList").toggleClass("active");
      $("#contentAcc").toggleClass("active");
    }

	render() {
		const {
	      defaultLangnya,descItem,dataItem
	    } = this.state;
		console.log(this.props, 'airport detail');
		
		return(
			<div id="middle-content" className="innerPages">
				<div id="linkCopied">
		        	<p>{defaultLangnya == 'id' ? 'Link sudah disalin!' : 'Link is copied!'}</p>
		     	</div>

			 	<div className="top_bg_section">
        			<div className="wrapper">
					    <div className="rows">
					    	<Link to="/AirportPolicyDomestic" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
					    </div>
					    <div className="rows">
							<div className="main_title_top">
								<h3>{defaultLangnya == 'id' ? 'Kebijakan Bandara' : 'Airport Policy'}</h3>
							</div>
						</div>{/* end.rows */}

				    	<div className="rows">
						  <div className="search_row">
						    <input type="text" id="searchTrigger_airlines" className="search_input" name="" placeholder={defaultLangnya == 'id' ? 'Cari bandara atau kota' : 'Search airports or cities'} />
						    <div onClick={this.popupShow} className="overlay_trigger trigger_slider_search" data-slider="popup_search_airport_policy"></div>
						  </div>
						</div>{/* end.rows */}
		        	</div>{/* end.wrapper */}
		     	</div>{/* end.top_bg_section */}

		     	<div className="bottom_bg_section">
			        <div className="wrapper relative contSticky">

			          <div className="shareSocmed">
						<FacebookShareButton url={this.urlCopy()} className="facebookShare" />
						<TwitterShareButton url={this.urlCopy()}  className="twitterShare" />
						<WhatsappShareButton url={this.urlCopy()}  className="waShare" />
						<CopyToClipboard onCopy={this.onCopy} text={this.urlCopy()}>
							<button className="linkShare"></button>
						</CopyToClipboard>
			          </div>

			          <div className="flex_block" style={{ flex: '1' }}>
					    <section id="section_innernya">
							<div className="rows hide">
								<div className="tabs_main_menu">
									<Link to="" className="tabs_menu active">
										<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
										<span>Domestic</span>
									</Link>
									<Link to="/AirportPolicyInternational" className="tabs_menu">
									<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
										<span>International</span>
									</Link>
								</div>
						    </div>{/* end.rows */}

							<div className="halBefore-kuis hide">
								<div className="box-loading2">
									<div className="spinner">
										{/* <div className="bounce1"></div>
										<div className="bounce2"></div>
										<div className="bounce3"></div> */}
									</div>
								</div>
							</div>
					    </section>

					    <section id="section_tabs_list">
					    	<div id="tnc-accodion">
								<div className="items">
									<div id="accorList" className="page active" onClick={this.accordionHide}>
										<span>{dataItem && dataItem.airportName}</span>
									</div>
									<div id="contentAcc" className="content active">
										{descItem.map((item, k) => (
											<div className="rowHtml" key={k}>
												<h3>{item.description == '' ? '' : item.name}</h3>
												<div dangerouslySetInnerHTML={{ __html: item.description }} />
											</div>
										))}
									</div>
								</div>
					    	</div>{/* end.tnc-accodion */}
					      
					    </section>
			    </div>
			    <PopupAirport />
				<StickyShare url={window.location.href}/>
			  </div>{/* end.wrapper */}

     		  </div>{/* end.bottom_bg_section */}
			</div>

		)
	}
}

export default AirportPolicyDetail;