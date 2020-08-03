import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

const initialSearch = {
	searchText: '',
	searchResult: [],
	searchPage: 1,
}

const apiUrl = 'https://api.tiketsafe.com/api/v1/';
const headers = { "Access-Control-Allow-Origin": "*"};
const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'

let listWorldMap = JSON.parse(localStorage.getItem('request:worlds-maps')) || [];

class Popup extends React.Component{
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

		  ...initialSearch,
		  listAirport: [],
		  listAirlines: [],
		  showNoResult: 'hide',
		};
	}

	componentDidMount() {
		this._listData();
		this.getListAirport();
		this.getListAirlines();
	}

	mappingListWordMap(countryCode) {
		const result = listWorldMap.filter((item) => item.id === countryCode)[0];
		return result;
	}

	_listData = () => {
		axios({
			method: 'get',
			url:apiUrl +'suggestion/popular-city',
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
						this.searchCitiesOrAirport(searchText, this.state.searchPage, type);
					}
				}, 2000);
			} else {
				this.setState({ showNoResult: 'hide' });
				$(".halBefore-kuis").fadeOut();
			}
		})
	}

	searchCitiesOrAirport(text, page, type) {
		if (page === 0) return;

		axios({
			method: 'get',
			url:apiUrl + `suggestion/location?keyword=${text}&type=${type}&page=${page}`,
			headers
		})
		.then(res => {
			console.log(res, 'res search');
			console.log(apiUrl + `suggestion/location?keyword=${text}&type=${type}&page=${page}`);
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
				to={{ pathname: "/SearchResult/" + value.countryCode }}
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

	handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Cannot be empty";
        }

        if(typeof fields["email"] !== "undefined"){
           let lastAtPos = fields["email"].lastIndexOf('@');
           let lastDotPos = fields["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       }  

       this.setState({errors: errors});
       return formIsValid;
    }

    contactSubmit(e) {
		e.preventDefault();
		
        if (this.handleValidation()) {
			axios.post(apiUrl+"user-submissions", {
				email: this.state.fields.email,
				countryCode: this.props.selectedCountryCode,
			}, {
				headers
			})
			.then(res => {
				console.log(res, 'res');
				$("#popup_email").removeClass("actived");
				$("#popup_email").addClass("hide");
				$("#popup_confirmasi").removeClass("hide");
				$("#popup_confirmasi").addClass("actived");
			})
			.catch(err => {
				console.log(err, 'err');
				
				$("#popup_email").removeClass("actived");
				$("#popup_email").addClass("hide");
				$("#popup_confirmasi").removeClass("hide");
				$("#popup_confirmasi").addClass("actived");
			})
        } else {
           //alert("Form has errors.")
        }
    }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

	render() {
		// console.log(this.props, 'state popup');
		const {
     	 defaultLangnya,
    	} = this.state;
		return(
			<div>
				<div id="popup_confirmasi" className="popup_slider hide">
					<div className="bg_popup"></div>
					<div className="content_slide_btm">
					    <div className="box_popup_search_auto">
					    	<div className="inner_popup">
					    		<h3>{defaultLangnya == 'id' ? 'Kamu akan mendapat pemberitahuan' : 'You will get a notification'}</h3>
					    		<p>{defaultLangnya == 'id' ? 'Kami mengirimkan email bila lokasi tujuan sudah boleh dikunjungi.' : 'We will send an email when the destination is open for visitors.'}</p>
					    		<div className="form_row">
						    		<div className="form_group">
						    			<button className="block_blue_bt trigger_close_popup" type="submit">Ok </button>
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
					    	<div onClick={() => this.setState({ ...initialSearch })} className="button_close_popup trigger_close_popup"><img src="assets/images/nav_icon_close.png" className="icon_close_popup" /></div>
					    	<div className="inner_popup">
					    		<h3>{defaultLangnya == 'id' ? 'Masukkan Alamat Email' : 'Enter Email Address'}</h3>
					    		<p>{defaultLangnya == 'id' ? 'Notifikasi tentang status lokasi tujuanmu akan dikirimkan ke email ini.' : 'Notifications about the status of your destination will be sent to this email.'}</p>
					    		<form name="contactform" className="contactform" onSubmit={this.contactSubmit.bind(this)}>

					    		<div className="form_row">
						    		<div className="form_group">
										<input
											refs="email"
											className="input_form"
											type="text"
											size="30"
											placeholder="Email"
											onChange={this.handleChange.bind(this, "email")}
											value={this.state.fields["email"]}
										/>
										<span className="erorr_help">{this.state.errors["email"]}</span>
						    		</div>
					    		</div> {/* end.form_row */}

					    		<div className="form_row">
						    		<div className="form_group">
						    			<button className="block_blue_bt" id="submit" value="Submit">{defaultLangnya == 'id' ? 'Save' : 'Simpan'}</button>
						    			<button className="block_blue_bt hide" type="submit" >Save </button>
						    		</div>
					    		</div> {/* end.form_row */}
					    		</form>
					    	</div> {/* end.inner_popup */}
					    </div> {/* end.box_popup_search_auto */}
					</div> {/* end.content_slide_btm */}
				</div> {/* end.popup_slider */}

				<div id="popup_search" className="popup_slider hide">
					<div className="bg_popup"></div>
					<div className="content_slide_btm">
				    	<div className="box_popup_search">
					    	<div onClick={() => this.setState({ ...initialSearch })} className="button_close_popup trigger_close_popup"><img src="assets/images/nav_icon_close.png" className="icon_close_popup" /></div>
				    		<div className="rows">
						        <div className="main_title_top">
						          <h3>{defaultLangnya == 'id' ? 'Mau ke Mana?' : 'Going Anywhere?'}</h3>
						        </div>
						    </div>{/* end.rows */}
						    <div className="rows">
						        <div className="search_row">
						          	<input
										type="text"
										className="search_input"
										name=""
										value={this.state.searchText}
										onChange={(val) => this.onChangeText(val, 'country')}
										placeholder={defaultLangnya == 'id' ? 'Cari kota atau bandara' : 'Search cities or airports'}
									/>
						        </div>
								<label style={{fontSize: '10px',}} className="hide" >type at least 3 letters</label>
						    </div> {/* end.rows */}
						    <div className="rows">
							    <div className={"main_title grey_title "}>
						          <h3>{defaultLangnya == 'id' ? 'Tujuan Populer' : 'Popular Destinations'}</h3>
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
						        		<h3>{defaultLangnya == 'id' ? 'Ayo pakai kata kunci lain' : 'Let’s use another keyword'}</h3>
						        		<p>{defaultLangnya == 'id' ? 'Tidak ada hasil untuk kata kunci ini. Ubah kata kuncimu dan coba lagi.' : 'This keyword has no result. Change your keyword and try again.'}</p>
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
					    	<div onClick={() => this.setState({ ...initialSearch })} className="button_close_popup trigger_close_popup"><img src="assets/images/nav_icon_close.png" className="icon_close_popup" /></div>
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
						        		<img src="assets/images/no_result.png" style={{width: 577/2.2, height: 384/2.2}} alt='noresult' />
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

				<div id="popup_search_airport_policy" className="popup_slider hide">
					<div className="bg_popup"></div>
					<div className="content_slide_btm">
				    	<div className="box_popup_search">
					    	<div onClick={() => this.setState({ ...initialSearch })} className="button_close_popup trigger_close_popup"><img src="assets/images/nav_icon_close.png" className="icon_close_popup" /></div>
				    		<div className="rows">
						        <div className="main_title_top">
						          <h3>{defaultLangnya == 'id' ? 'Kebijakan Bandara' : 'Airport Policy'}</h3>
						        </div>
						    </div>

						    <div className="rows">
						        <div className="search_row">
									<input
										type="text"
										className="search_input"
										name=""
										value={this.state.searchText}
										onChange={(val) => this.onChangeText(val, 'airport')}
										placeholder={defaultLangnya == 'id' ? 'Cari bandara atau kota' : 'Search cities or airports'}
									/>
						        </div>
								<label style={{fontSize: '10px'}} className="hide">type at least 3 letters</label>
						    </div> {/* end.rows */}
						    <div className="rows">
							    <div className="main_title grey_title ">
						          <h3>{defaultLangnya == 'id' ? 'Rekomendasi Bandara' : 'Suggested Airports'}</h3>
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
						        		<h3>{defaultLangnya == 'id' ? 'Ayo pakai kata kunci lain' : 'Let’s use another keyword'}</h3>
						        		<p>{defaultLangnya == 'id' ? 'Tidak ada hasil untuk kata kunci ini. Ubah kata kuncimu dan coba lagi.' : 'This keyword has no result. Change your keyword and try again.'}</p>
						        	</div>
						        </div>{/* end.list_noneResult */}

						        <div className="list_autocomplete trigger_close_popup">
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