import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import { sendEventGTM } from '../utils/gtm';

const initialSearch = {
	searchText: '',
	searchResult: [],
	searchPage: 1,
}

const apiUrl = 'https://api.tiketsafe.com/api/v2/';
const headers = { "Access-Control-Allow-Origin": "*"};
const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'

class PopupAirlines extends React.Component{
	constructor(props){
		super(props)
		this.state = {
		  list_data_popular: [], 
		  load_aju_error: false,
		  loaded: false,
		  count_item: 0,
		  fields: {},
          errors: {},
      	  defaultLangnya: langnya == langDef ? langnya : 'id' ,
		  imageSrc:  'https://'+window.location.host +'/assets/images/nav_icon_close.png',
		  imgGenCitySrc:  'https://'+window.location.host +'/assets/images/icon_general_city.png',
		  imgBandaraSrc:  'https://'+window.location.host +'/assets/images/icon_bandara.png',
		  noResultImg:  'https://'+window.location.host +'/assets/images/no_result.png',
		
		  ...initialSearch,
		  listAirlines: [],
		  showNoResult: 'hide',
		  showPopularText:'show'
		};
	}

	componentDidMount() {
		
		if(!this.props.param)
		{
			this.getListAirlines();
		}else{
			this.arlinesTemp();
		}


	}

	arlinesTemp(){
		if(this.props.param.length > 0 ){
			let arlinesData=this.props.param;
			this.setState({ ...initialSearch ,listAirlines: arlinesData });
			$(".halBefore-kuis").fadeOut();
		}
	}

	getListAirlines() {
	
		axios({
			method: 'get',
			url:'https://api.tiketsafe.com/api/v2/airlines?lang=id&page=1&flightType=1',
			headers
		})
		.then(res => {
			console.log(res.data.data,'arlinesTemp')
			if (res.data.status === 'success') {
				this.setState({ listAirlines: res.data.data })
			}

			$(".halBefore-kuis").fadeOut();
		})
		.catch(err => {
			$(".halBefore-kuis").fadeOut();
		})
	}
	
	typingTimeout;

	onChangeText(val, type) {
		let searchText = val.target.value;

		if (this.typingTimeout) {
			clearTimeout(this.typingTimeout);
		}

		this.setState({ searchText }, () => {
			if (searchText.length > 2) {
				this.setState({ showNoResult: 'hide' });
				$(".halBefore-kuis").fadeIn();
				this.setState({ showPopularText: 'hide' });

				this.typingTimeout = setTimeout(() => {
					if (type === 'airline_policy') {
						this.searchAirline(searchText);
					} else {
						this.searchCitiesOrAirport(searchText, this.state.searchPage, type);
					}
				}, 2000);
			} else {
				this.setState({ showNoResult: 'hide' });
				$(".halBefore-kuis").fadeOut();
				this.setState({ showPopularText: 'show' });
			}
		})
	}


	searchAirline(text, page) {
		axios({
			method: 'get',
			url:`https://api.tiketsafe.com/api/v1/suggestion/airlines?keyword=${text}&page=${page}`,
			headers
		})
		.then(res => {
			// console.log(res, 'res search');
			
			if (res.data.status === 'success') {
				this.setState({ searchResult: res.data.data });
			}

			if (res.data.data.length === 0) {
				this.setState({ showNoResult: '' });
				sendEventGTM({'event': ' impression','eventCategory' : 'errorAutoComplete', 'eventLabel' : this.state.searchText , 'eventValue' : 10-this.state.searchText.length  });
			}
			
			$(".halBefore-kuis").fadeOut();
		})
		.catch(err => {
			this.setState({ showNoResult: '' });
			$(".halBefore-kuis").fadeOut();
		})
	}

	AirlinesGtmPush = (airlinesName) => {
		const gtmProperty = {vertical:'flight'};
		const gtmFlight = {
			destinationCity: airlinesName,
			keyword: '',
		};
		sendEventGTM(
			{'event': 'click','eventCategory' : 'chooseAutoComplete', 'eventLabel' : this.state.searchText , 'eventValue' : 10-this.state.searchText.length  },
			gtmProperty,
			gtmFlight,
		);
	}

	renderAirlines() {
		let data = this.state.searchText.length > 2 ? this.state.searchResult : this.state.listAirlines;
	
		return data.map((item, idx) =>
			<Link
				key={idx}
				to={{ pathname: '/AirlinePolicyDetail/' + item.serial }}
				className="row_result_autocomplete trigger_close_popup"
				onClick={() => { this.setState({ ...initialSearch }); this.AirlinesGtmPush(item.airlinesName);}}
				//onClick={() => this.setState({ ...initialSearch }),this.AirlinesGtmPush(item.airlinesName)}
			>
				<img src={item.imageURL} className="icon_city" alt='city' />
				<span>{item.airlinesName}</span>
			</Link>
		)
	}

	popupCLose = () => {
		$(".popup_slider").removeClass("actived");
		setTimeout(function() {
			$(".popup_slider").addClass("hide");
		}, 500);
    }
	
	



	render() {
		// console.log(this.props, 'state popup');
		const {
     	 defaultLangnya,
		} = this.state;
		
		return(
			<div>
				<div id="popup_search_airplane_policy" className="popup_slider hide">
					<div className="bg_popup"></div>
					<div className="content_slide_btm">
				    	<div className="box_popup_search">
					    	<div onClick={() => this.setState({ ...initialSearch }),this.popupCLose} className="button_close_popup trigger_close_popup"><img src={this.state.imageSrc} className="icon_close_popup" /></div>
				    		<div className="rows">
						        <div className="main_title_top">
						          <h3>{defaultLangnya == 'id' ? 'Kebijakan Maskapai' : 'Airline Policy'}</h3>
						        </div>
						    </div>{/* end.rows */}
						    <div className="rows">
						        <div className="search_row">
						        	<input
										type="text"
										className="search_input"
										name=""
										value={this.state.searchText}
										onChange={(val) => this.onChangeText(val, 'airline_policy')}
										placeholder={defaultLangnya == 'id' ? 'Cari kebijakan maskapai' : 'Search airline policy'}
									/>
						        </div>
								<label style={{fontSize: '10px'}} className="hide">type at least 3 letters</label>
						    </div> {/* end.rows */}
						    <div className="rows">
							    <div className="main_title grey_title ">
						          <h3>{defaultLangnya == 'id' ? 'Maskapai Rekomendasi' : 'Suggested Airlines'}</h3>
						        </div>

								{this.state.showNoResult === 'hide' && <div className="halBefore-kuis">
									<div className="box-loading2">
										<div className="spinner">
											<div className="bounce1"></div>
											<div className="bounce2"></div>
											<div className="bounce3"></div>
										</div>
									</div>
								</div>}

						        <div className={"list_noneResult " + this.state.showNoResult}>
						        	<div className="icon_noneResult">
						        		<img src={this.state.noResultImg} style={{width: 577/2.2, height: 384/2.2}} alt='noresult' />
						        	</div>
						        	<div className="caption_noneResult">
						        		<h3>{defaultLangnya == 'id' ? 'Ayo pakai kata kunci lain' : 'Let’s use another keyword'}</h3>
						        		<p>{defaultLangnya == 'id' ? 'Tidak ada hasil untuk kata kunci ini. Ubah kata kuncimu dan coba lagi.' : 'This keyword has no result. Change your keyword and try again.'}</p>
						        	</div>
						        </div>{/* end.list_noneResult */}
						        <div className="list_autocomplete trigger_close_popup">
									{this.renderAirlines()}
						        </div> {/* end.list_autocomplete */}
						    </div> {/* end.rows */}
				    	</div> {/* end.box_popup_search_auto */}
				    </div> {/* end.content_slide_btm */}
				</div>{/* end.popup_slider */}

				
			</div>
		)
	}
}
export default PopupAirlines;