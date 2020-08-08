import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery'; 
import PropTypes from 'prop-types'
import axios from 'axios';
import StickyShare from './StickyShare';

const apiUrl = 'https://api.tiketsafe.com/api/v1/';
const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'

class TicketingPolicyFlights extends React.Component{
	constructor(props) {
	    super(props)

	    this.state = {
	        product: {},
	        currentId : '',
	        ResAtas: [],
	        ResBawah: [],
	        defaultLangnya: langnya == langDef ? langnya : 'id',

	    }
	  }


	  componentWillReceiveProps(nextProps) {
		this.getResAtas(nextProps.match.params.product);
		this.getResBawah(nextProps.match.params.product);
	}

 	  componentWillMount() {
		    // alert('componentwillmount')               
		 

		    const currentProductId = this.props.match.params.product    
		        this.setState({

		          currentId: currentProductId

		        })

			

		  }


	componentDidMount(){
		//console.log('ini '+this.props.match.params.product)
		this.getResAtas(this.props.match.params.product);
		this.getResBawah(this.props.match.params.product);
		setTimeout(() => {
			window.activeAccordion();
		}, 1000);
	}
	
	getResAtas(){
		
		let arrItems = [];
		axios({
			method: 'get',
			url: apiUrl + `tickets`,
			headers: {
				"Access-Control-Allow-Origin": "*"
			}
		})
		.then(res => {
				arrItems = res.data.data;
				//console.log(arrItems.data)
				this.setState({ ResAtas: arrItems });

				

			
		})
		.catch(err => {
			this.setState({ loading: false });
		})
	}

	getResBawah(currentId){
		let arrContent = [];
		console.log('aaa'+currentId);

		axios({
			method: 'get',
			url: apiUrl+`ticket?lang=`+this.state.defaultLangnya+`&serial=`+currentId,
			headers: {
				"Access-Control-Allow-Origin": "*"
			}
		})
		.then(res => {
				arrContent = res.data.data.items;
				//console.log(arrContent)
				this.setState({ ResBawah: arrContent });
			
		})
		.catch(err => {
			this.setState({ loading: false });
		})
	}

	renderResAtas(dataResatas){
		
		return dataResatas.map((val, i) =>
		
		<Link to={`/TicketingPolicy/${val.serial}`} className={`tabs_menu ${val.serial == this.props.match.params.product && 'active'}`} key={i}>
					<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
					<span>{val.verticalName}</span>
		</Link>
		

		);
	}

	renderResBawah(dataResbawah){
		return dataResbawah.map((val, i) =>
		<Fragment key={i}>
			<div className={`items ${val.description == '' ? 'hide' : val.name}`}>
              <div className="page">
				<span>{val.description == '' ? '' : val.name}</span>
              </div>
              <div className="content">
                <p>{val.description}</p>


              </div>{/* end.content */}
            </div>
		</Fragment>

		);

	}

	render() {
		return(
			<div id="middle-content" className="homePage">
			
			  <div className="wrapper">
			    <div className="rows">
			    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
			    </div>
			    <div className="rows">
					<div className="main_title_top">
						<h3>Ticketing Policy</h3>
					</div>
				</div>{/* end.rows */}


			    <section id="section_innernya">
					<div className="rows">
						<div className="tabs_main_menu overflow_tabs">
							{this.renderResAtas(this.state.ResAtas)}
						</div>
				    </div>{/* end.rows */}
			    </section>

			    <section id="section_tabs_list">
			    
			    	<div id="tnc-accodion">
			    		{this.renderResBawah(this.state.ResBawah)}
				    	
			    	</div>{/* end.tnc-accodion */}
			      
			    </section>
			    
			    <StickyShare url={window.location.href}/>
			  </div>{/* end.wrapper */}
			</div>

		)
	}
}
export default TicketingPolicyFlights;