import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

const initialSearch = {
	searchText: '',
	searchResult: [],
	searchPage: 1,
}

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = 'https://api.tiketsafe.com/api/v1/';
const headers = { "Access-Control-Allow-Origin": "*"};

class Popup extends React.Component{
	constructor(props){
		super(props)
		this.state = {
		  list_data_popular: [], 
		  load_aju_error: false,
		  loaded: false,
		  count_item: 0,

		  ...initialSearch,
		  listAirport: [],
		  listAirlines: [],
		  covid_world_timeline: null,
		  showNoResult: 'hide',
		};
	}

	componentWillMount() {
		axios({
            method: 'get',
            url: proxyurl + 'https://covid.amcharts.com/data/js/world_timeline.js',
            headers
        })
        .then(res => {
            let data = res.data.replace(/\s/g, '').split('=')[1];
            let arrData = JSON.parse(data);
            let result = [];
            
            if (Array.isArray(arrData)) {
                result = arrData[arrData.length - 1];
			}

			this.setState({ covid_world_timeline: result });
			
			this._listData();
			this.getListAirport();
			this.getListAirlines();
        })
	}

	_listData = () => {
		axios({
			method: 'get',
			url:apiUrl +'suggestion/popular-city',
			headers
		})
		.then(response => {
			// console.log(response, 'response popular city');
			const { covid_world_timeline } = this.state;
			let newItem = null;
			let remapCity = [];

			if (covid_world_timeline) {
				newItem = covid_world_timeline.list.filter((item) => item.id === 'ID')[0];
			}

			if (Array.isArray(response.data.data)) {
				response.data.data.forEach(e => {
					remapCity.push({
						...e,
						...newItem,
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

	getListAirport() {
		axios({
			method: 'get',
			url:apiUrl + 'airports?lang=id',
			headers
		})
		.then(res => {
			if (res.data.status === 'success') {
				this.setState({ listAirport: res.data.data });
			}

			$(".halBefore-kuis").fadeOut();
		})
		.catch(err => {
			$(".halBefore-kuis").fadeOut();
		})
	}

	getListAirlines() {
		axios({
			method: 'get',
			url:apiUrl + 'airlines?lang=id&page=1&flightType=1',
			headers
		})
		.then(res => {
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

				this.typingTimeout = setTimeout(() => {
					if (type === 'airline_policy') {
						this.searchAirline(searchText);
					} else {
						this.searchCitiesOrAirport(searchText, this.state.searchPage);
					}
				}, 2000);
			} else {
				this.setState({ showNoResult: 'hide' });
				$(".halBefore-kuis").fadeOut();
			}
		})
	}

	searchCitiesOrAirport(text, page) {
		if (page === 0) return;

		axios({
			method: 'get',
			url:apiUrl + `suggestion/location?keyword=${text}&type=country&page=${page}`,
			headers
		})
		.then(res => {
			// console.log(res, 'res search');
			const { covid_world_timeline } = this.state;
			let newItem = null;
			let remapCity = [];

			if (covid_world_timeline) {
				newItem = covid_world_timeline.list.filter((item) => item.id === 'ID')[0];
			}

			if (res.data.status === 'success' && Array.isArray(res.data.data)) {
				res.data.data.forEach(e => {
					remapCity.push({
						...e,
						...newItem,
					})
				});
			}

			this.setState({ searchResult: remapCity });

			if (remapCity.length === 0) {
				this.setState({ showNoResult: '' });
			}

			$(".halBefore-kuis").fadeOut();
		})
		.catch(err => {
			this.setState({ showNoResult: '' });
			$(".halBefore-kuis").fadeOut();
		})
	}

	searchAirline(text, page) {
		axios({
			method: 'get',
			url:apiUrl + `suggestion/airlines?keyword=${text}&page=${page}`,
			headers
		})
		.then(res => {
			// console.log(res, 'res search');
			
			if (res.data.status === 'success') {
				this.setState({ searchResult: res.data.data });
			}

			if (res.data.data.length === 0) {
				this.setState({ showNoResult: '' });
			}
			
			$(".halBefore-kuis").fadeOut();
		})
		.catch(err => {
			this.setState({ showNoResult: '' });
			$(".halBefore-kuis").fadeOut();
		})
	}

	RenderCityPopular() {
		let list_data_popular = this.state.searchText.length > 2 ? this.state.searchResult : this.state.list_data_popular;

		return list_data_popular.map((value, idx) =>
			<Link
				key={idx}
				to={{ pathname: "/SearchResult", state: {
					data: value
				}}}
				className="row_result_autocomplete trigger_close_popup"
				onClick={() => this.setState({ ...initialSearch })}
			>
				<img src="assets/images/icon_general_city.png" className="icon_city" alt='city' />
				<span>{value.cityName}, {value.countryName ? value.countryName : 'Indonesia'}</span>
			</Link>
		)
	}

	renderAirport() {
		let data = this.state.searchText.length > 2 ? this.state.searchResult : this.state.listAirport;
		
		return data.map((item, idx) =>
			<Link
				key={idx}
				to={{ pathname: "/AirportPolicyDetail", state: { airportCode: item.airportCode } }}
				className="row_result_autocomplete trigger_close_popup"
				onClick={() => this.setState({ ...initialSearch })}
			>
				<img src="assets/images/icon_general_city.png" className="icon_city" alt='city' />
				<span>{item.airportName}</span>
			</Link>
		)
	}

	renderAirlines() {
		let data = this.state.searchText.length > 2 ? this.state.searchResult : this.state.listAirlines;

		return data.map((item, idx) =>
			<Link
				key={idx}
				to={{ pathname: '/AirlinePolicyDetail', state: { serial: item.serial } }}
				className="row_result_autocomplete trigger_close_popup"
				onClick={() => this.setState({ ...initialSearch })}
			>
				<img src={item.imageURL} className="icon_city" alt='city' />
				<span>{item.airlinesName}</span>
			</Link>
		)
	}

	render() {
		// console.log(this.state, 'state popup');
		
		return(
			<div>
				<div id="popup_confirmasi" className="popup_slider hide">
					<div className="bg_popup"></div>
					<div className="content_slide_btm">
					    <div className="box_popup_search_auto">
					    	<div className="inner_popup">
					    		<h3>You will get a notification</h3>
					    		<p>We will send an email when the destination is open for visitors.</p>
					    		<div className="form_row">
						    		<div className="form_group">
						    			<button className="block_blue_bt" type="submit">Ok </button>
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
					    	<div onClick={() => this.setState({ ...initialSearch })} className="button_close_popup trigger_close_popup"><i className="fa fa-times" aria-hidden="true"></i></div>
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
				    	<div className="box_popup_search">
					    	<div onClick={() => this.setState({ ...initialSearch })} className="button_close_popup trigger_close_popup"><i className="fa fa-times" aria-hidden="true"></i></div>
				    		<div className="rows">
						        <div className="main_title_top">
						          <h3>Going Anywhere?</h3>
						        </div>
						    </div>{/* end.rows */}
						    <div className="rows">
						        <div className="search_row">
						          	<input
										type="text"
										className="search_input"
										name=""
										value={this.state.searchText}
										onChange={(val) => this.onChangeText(val, 'city')}
										placeholder="Search cities or airports"
									/>
						        </div>
								<label style={{fontSize: '10px'}}>type at least 3 letters</label>
						    </div> {/* end.rows */}
						    <div className="rows">
							    <div className={"main_title grey_title "}>
						          <h3>Popular Destinations</h3>
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
						        		<img src="assets/images/no_result.png" style={{width: 577/2.2, height: 384/2.2}} alt='noresult' />
						        	</div>
						        	<div className="caption_noneResult">
						        		<h3>Let’s use another keyword</h3>
						        		<p>This keyword has no result. Change your keyword and try again.</p>
						        	</div>
						        </div>{/* end.list_noneResult */}
						        <div className="list_autocomplete trigger_close_popup">
									{this.RenderCityPopular()}
						        </div> {/* end.list_autocomplete */}
						    </div> {/* end.rows */}
				    	</div> {/* end.box_popup_search_auto */}
				    </div> {/* end.content_slide_btm */}
				</div>{/* end.popup_slider */}

				<div id="popup_search_airplane_policy" className="popup_slider hide">
					<div className="bg_popup"></div>
					<div className="content_slide_btm">
				    	<div className="box_popup_search">
					    	<div onClick={() => this.setState({ ...initialSearch })} className="button_close_popup trigger_close_popup"><i className="fa fa-times" aria-hidden="true"></i></div>
				    		<div className="rows">
						        <div className="main_title_top">
						          <h3>Airline Policy?</h3>
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
										placeholder="Search airline policy"
									/>
						        </div>
								<label style={{fontSize: '10px'}}>type at least 3 letters</label>
						    </div> {/* end.rows */}
						    <div className="rows">
							    <div className="main_title grey_title ">
						          <h3>Suggested Airlines</h3>
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
						        		<img src="assets/images/no_result.png" style={{width: 577/2.2, height: 384/2.2}} alt='noresult' />
						        	</div>
						        	<div className="caption_noneResult">
						        		<h3>Let’s use another keyword</h3>
						        		<p>This keyword has no result. Change your keyword and try again.</p>
						        	</div>
						        </div>{/* end.list_noneResult */}
						        <div className="list_autocomplete">
									{this.renderAirlines()}
						        </div> {/* end.list_autocomplete */}
						    </div> {/* end.rows */}
				    	</div> {/* end.box_popup_search_auto */}
				    </div> {/* end.content_slide_btm */}
				</div>{/* end.popup_slider */}

				<div id="popup_search_airport_policy" className="popup_slider hide">
					<div className="bg_popup"></div>
					<div className="content_slide_btm">
				    	<div className="box_popup_search">
					    	<div onClick={() => this.setState({ ...initialSearch })} className="button_close_popup trigger_close_popup"><i className="fa fa-times" aria-hidden="true"></i></div>
				    		<div className="rows">
						        <div className="main_title_top">
						          <h3>Airport Policy</h3>
						        </div>
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

						    <div className="rows">
						        <div className="search_row">
									<input
										type="text"
										className="search_input"
										name=""
										value={this.state.searchText}
										onChange={(val) => this.onChangeText(val, 'airport')}
										placeholder="Search cities or airports"
									/>
						        </div>
								<label style={{fontSize: '10px'}}>type at least 3 letters</label>
						    </div> {/* end.rows */}
						    <div className="rows">
							    <div className="main_title grey_title ">
						          <h3>Suggested Airports</h3>
						        </div>
						        <div className={"list_noneResult " + this.state.showNoResult}>
						        	<div className="icon_noneResult">
						        		<img src="assets/images/no_result.png" style={{width: 577/2.2, height: 384/2.2}} alt='noresult' />
						        	</div>
						        	<div className="caption_noneResult">
						        		<h3>Let’s use another keyword</h3>
						        		<p>This keyword has no result. Change your keyword and try again.</p>
						        	</div>
						        </div>{/* end.list_noneResult */}

						        <div className="list_autocomplete">
						          {this.renderAirport()}
						        </div> {/* end.list_autocomplete */}
						    </div> {/* end.rows */}
				    	</div> {/* end.box_popup_search_auto */}
				    </div> {/* end.content_slide_btm */}
				</div>{/* end.popup_slider */}
			</div>
		)
	}
}
export default Popup;