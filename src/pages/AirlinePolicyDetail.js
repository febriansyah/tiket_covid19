import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StickyShare from './StickyShare';

//const proxyurl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = 'https://api.tiketsafe.com/api/v1/';
const headers = { "Access-Control-Allow-Origin": "*"};

const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'

class AirlinePolicyDetail extends Component{
	constructor(props) {
	   super(props);
	   this.state = {
			dataItem: null,
			defaultLangnya: langnya == langDef ? langnya : 'id',
	   }

	   this.goBack = this.goBack.bind(this);
	}

	goBack() {
	    this.props.history.goBack();
	}

	componentDidMount() {
		window.readmoreFade();
		window.activeAccordion();
		window.popupSlider();

		this.getAirlineDetail(this.props.location.state.serial);
	}

	getAirlineDetail(serial) {
		axios({
			method: 'get',
			url:apiUrl + `airline?lang=`+this.state.defaultLangnya+`&airlineSerial=${serial}`,
			headers
		})
		.then(res => {
			if (res.data.status === 'success') {
				this.setState({ dataItem: res.data.data });
			}
			
		})
	}

	render() {
		console.log(this.props, 'airline detail', this.state);
		const { dataItem,defaultLangnya } = this.state;
		
		return(
			<div id="middle-content" className="homePage">
			  <div className="wrapper">
			    <div className="rows">
			    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
			    </div>

			    <div className="rows">
					<div className="main_title_top">
						<h3>{defaultLangnya == 'id' ? 'Kebijakan Maskapai' : 'Airline Policy'}</h3>
					</div>
				</div>{/* end.rows */}

			    <section id="section_innernya">
			    	<div className="rows">
					  <div className="search_row">
					    <input type="text" id="searchTrigger_airlines" className="search_input" name="" placeholder={defaultLangnya == 'id' ? 'Cari maskapai' : 'Search airlines'} />
					    <div className="overlay_trigger trigger_slider_search" data-slider="popup_search_airplane_policy"></div>
					  </div>
					</div>{/* end.rows */}
			    </section>

			    <section id="section_tabs_list">
			    	<div id="tnc-accodion">
				    	<div className="items">
			              <div className="page active">
			              	<img src={dataItem && dataItem.imageURL} className="icon_airline" alt='airline_logo' />
							<span>{dataItem && dataItem.airlinesName}</span>
			              </div>

			              <div className="content active">
			                <p>{dataItem && dataItem.generalRequirementDesc}</p><br />
			     

			              </div>{/* end.content */}
			            </div>
			    	</div>{/* end.tnc-accodion */}
			    </section>
				<StickyShare url={window.location.href}/>
			  </div>{/* end.wrapper */}
			</div>
		)
	}
}

export default AirlinePolicyDetail;