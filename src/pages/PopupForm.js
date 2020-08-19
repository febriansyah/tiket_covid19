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
const dataLayer = window.dataLayer || [];

class Popup extends React.Component{
	constructor(props){
		super(props)
		this.state = {
		  fields: {},
          errors: {},
      	  defaultLangnya: langnya == langDef ? langnya : 'id' ,
		  imageSrc:  'https://'+window.location.host +'/assets/images/nav_icon_close.png',
		  imgGenCitySrc:  'https://'+window.location.host +'/assets/images/icon_general_city.png',
		  imgBandaraSrc:  'https://'+window.location.host +'/assets/images/icon_bandara.png',
		  noResultImg:  'https://'+window.location.host +'/assets/images/no_result.png',
		};
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
				dataLayer.push({'event': 'click','eventCategory' : 'saveEmail', 'eventLabel' : 'flight' });
			})
			.catch(err => {
				console.log(err, 'err');
				
				$("#popup_confirmasiFailed").removeClass("actived");
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
		const {
     	 defaultLangnya,
		} = this.state;
		
		return(
			<div>
				<div id="popup_confirmasiFailed" className="popup_slider hide">
					<div className="bg_popup"></div>
					<div className="content_slide_btm">
					    <div className="box_popup_search_auto">
					    	<div className="inner_popup">
					    		<h3>{defaultLangnya == 'id' ? 'Maaf' : 'Sorry'}</h3>
					    		<p>{defaultLangnya == 'id' ? 'Ada kesalahan dalam proses pengiriman email' : 'There was an error sending the email'}</p>
					    		<div className="form_row">
						    		<div className="form_group">
						    			<button className="block_blue_bt trigger_close_popup" type="submit">Ok </button>
						    		</div>
					    		</div> {/* end.form_row */}
					    	</div> {/* end.inner_popup */}
					    </div> {/* end.box_popup_search_auto */}
					</div> {/* end.content_slide_btm */}
				</div> {/* end.popup_slider */}

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
					    	<div onClick={() => this.setState({ ...initialSearch })} className="button_close_popup trigger_close_popup"><img src={this.state.imageSrc} className="icon_close_popup" /></div>
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

			</div>
		)
	}
}
export default Popup;