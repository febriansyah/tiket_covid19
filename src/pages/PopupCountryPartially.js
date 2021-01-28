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
const langDef = 'en';

let listWorldMap = JSON.parse(localStorage.getItem('request:worlds-maps')) || [];

class PopupCountry extends React.Component{
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
		  showNoResult: 'hide',
		  showPopularText:'show',
		  countryByStatus: {
			  partially: []
		  }
		};
	}

	componentDidMount() {
		this._listData();
		this.getCountryStatus();
	}

	getCountryStatus() {
        axios({
            type: 'get',
            url:`https://api.tiketsafe.com/api/v2/country-status`,
            headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then(res => {
			const response = res.data;
			let countryByStatus = this.state.countryByStatus;

			if (response && Array.isArray(response.data)) {
				response.data.map((item) => {
					if (item.status === 3) {
						countryByStatus.partially.push(item);
					}
				})

				this.setState({ countryByStatus });
			}
        })
        .catch(err => {
        })
    }

	mappingListWordMap(countryCode) {
		const result = listWorldMap.filter((item) => item.id === countryCode)[0];
		return result;
	}

	_listData = () => {
		axios({
			method: 'get',
			url:'https://api.tiketsafe.com/api/v2/suggestion/popular-city',
			headers
		})
		.then(response => {
			// console.log(response, 'response popular city');
			let remapCity = [];

			if (Array.isArray(response.data.data)) {
				response.data.data.forEach(e => {
					remapCity.push({
						...e,
						...this.mappingListWordMap(e.countryCode),
					})
				});
			}

			this.setState({ list_data_popular: remapCity });

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

	searchCitiesOrAirport(text, page, type) {
		if (page === 0) return;

		axios({
			method: 'get',
			url:`https://api.tiketsafe.com/api/v2/suggestion/location?keyword=${text}&type=${type}&page=${page}`,
			headers
		})
		.then(res => {
			console.log(res, 'res search');
			console.log(`https://api.tiketsafe.com/api/v2/suggestion/location?keyword=${text}&type=${type}&page=${page}`);
			let remapCity = [];

			if (res.data.status === 'success' && Array.isArray(res.data.data)) {
				res.data.data.forEach(e => {
					remapCity.push({
						...e,
						...this.mappingListWordMap(e.countryCode),
					})
				});
			}

			this.setState({ searchResult: remapCity });

			if (remapCity.length === 0) {
				this.setState({ showNoResult: '' });
				this.setState({ showPopularText: 'hide' });
				sendEventGTM({'event': ' impression','eventCategory' : 'errorAutoComplete', 'eventLabel' : this.state.searchText , 'eventValue' : 10-this.state.searchText.length  });
			}

			$(".halBefore-kuis").fadeOut();
		})
		.catch(err => {
			this.setState({ showNoResult: '' });
			$(".halBefore-kuis").fadeOut();
		})
	}
	CityGtmPush = () =>  {
		const gtmProperty = {vertical:'flight'};
		const gtmFlight = {
			destinationCity: '',
			keyword: '',
		};
		sendEventGTM(
			{'event': 'click','eventCategory' : 'chooseAutoComplete', 'eventLabel' : this.state.searchText , 'eventValue' : 10-this.state.searchText.length  },
			gtmProperty,
			gtmFlight,
		);
	}
	RenderCityPopular() {
		return this.state.countryByStatus.partially.map((value, idx) =>
			<Link
				key={idx}
				to={{pathname: '/SearchResult/' + value.id }}
				className="row_result_autocomplete trigger_close_popup"
			>
				<span>{value.title}</span>
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
		// console.log(this.state, 'state country prohibited');
		const {
     	 defaultLangnya,
		} = this.state;
		
		return(
			<div>
				<div id="popup_partially_country" className="popup_slider popup_new_style hide">
				<div className="bg_popup"></div>
					<div className="content_slide_btm popup_status_country">
				    	<div className="box_popup_search">
				    		<div className="top_popup">
						    	<div onClick={() => this.setState({ ...initialSearch }),this.popupCLose} className="button_close_popup trigger_close_popup"><img src={this.state.imageSrc} className="icon_close_popup" /></div>
					    		<div className="title_popup_teks">
							        <div className="main_title_top">
							          <h3>{defaultLangnya == 'id' ? 'Dilarang Sebagian' : 'Partially Prohibited'}</h3>
							        </div>
							    </div>{/* end.rows */}
						    </div>
						    <div className="rows">
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
						        <div className="list_autocomplete trigger_close_popup" style={{display: 'flex', flexDirection: 'column'}}>
									{this.RenderCityPopular()}
						        </div> {/* end.list_autocomplete */}
						    </div> {/* end.rows */}
				    	</div> {/* end.box_popup_search_auto */}
				    </div> {/* end.content_slide_btm */}
				</div>
			</div>
		)
	}
}
export default PopupCountry;