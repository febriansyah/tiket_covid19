import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import axios from 'axios';

const apiUrl = 'https://api.tiketsafe.com/api/v1/';


class TicketingPolicyFlights extends React.Component{
	constructor(props) {
	    super(props)

	    this.state = {
	        product: {},
	        currentId : '',
	        ResAtas: []
	    }
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
		window.activeAccordion();


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
				console.log(arrItems.data)
				this.setState({ ResAtas: arrItems });
			
		})
		.catch(err => {
			this.setState({ loading: false });
		})
	}

	renderResAtas(dataResatas){
		
		return dataResatas.map((val, i) =>
		
		<Link to={`/TicketingPolicyFlights/${val.id}`} className={`tabs_menu ${val.id == this.props.match.params.product && 'active'}`} key={i}>
					<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
					<span>{val.verticalName}</span>
		</Link>
		

		);
	}

	render() {
		

		//const { currentId,ResAtas } = this.state;
		//console.log('kka'+currentId);
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
				    	<div className="items">

							
			              <div className="page">
							<span>Important Info</span>
			              </div>
			              <div className="content">
			                <h3>Important</h3>
			                <p>The terms and conditions informed on this page are fluctuative and are subject to change without prior notice. The applicable policy will still follow the airline regulations when the request is submitted.</p><br />
			                <h3>Refund</h3>
							<p>Refund conditions are subject to change without prior notice and follow based on the terms and conditions of the airline.</p>
							<p>
							Ticket Purchase Date: On / before 15 March 2020.<br/>
							Flight Period: 24 January - 31 August 2020.<br/>
							Routes: All routes.<br/>
							Refund Rules: Full refund.</p>

							<p>
							Ticket Purchase Date: 5 March - 31 August 2020.<br/>
							Flight Period: -<br/>
							Routes: All routes.<br/>
							Refund Rules: As per normal regulation.</p>
							<p>
							Based on information that we received, the refund process will take longer than usual. Therefore, we suggest you to do an Open Ticket and enjoy the convenience and excellence with the options offered in accordance with the provisions of the ticket issuance date and flight date as above.</p>


			              </div>{/* end.content */}
			            </div>

			            <div className="items">
			              <div className="page">
							<span>Refund</span>
			              </div>
			              <div className="content">
			                <h3>Important</h3>
			                <p>The terms and conditions informed on this page are fluctuative and are subject to change without prior notice. The applicable policy will still follow the airline regulations when the request is submitted.</p><br />
			                <h3>Refund</h3>
							<p>Refund conditions are subject to change without prior notice and follow based on the terms and conditions of the airline.</p>
							<p>
							Ticket Purchase Date: On / before 15 March 2020.<br/>
							Flight Period: 24 January - 31 August 2020.<br/>
							Routes: All routes.<br/>
							Refund Rules: Full refund.</p>

							<p>
							Ticket Purchase Date: 5 March - 31 August 2020.<br/>
							Flight Period: -<br/>
							Routes: All routes.<br/>
							Refund Rules: As per normal regulation.</p>
							<p>
							Based on information that we received, the refund process will take longer than usual. Therefore, we suggest you to do an Open Ticket and enjoy the convenience and excellence with the options offered in accordance with the provisions of the ticket issuance date and flight date as above.</p>


			              </div>{/* end.content */}
			            </div>

			            <div className="items">
			              <div className="page">
							<span>Reschedule</span>
			              </div>
			              <div className="content">
			                <h3>Important</h3>
			                <p>The terms and conditions informed on this page are fluctuative and are subject to change without prior notice. The applicable policy will still follow the airline regulations when the request is submitted.</p><br />
			                <h3>Refund</h3>
							<p>Refund conditions are subject to change without prior notice and follow based on the terms and conditions of the airline.</p>
							<p>
							Ticket Purchase Date: On / before 15 March 2020.<br/>
							Flight Period: 24 January - 31 August 2020.<br/>
							Routes: All routes.<br/>
							Refund Rules: Full refund.</p>

							<p>
							Ticket Purchase Date: 5 March - 31 August 2020.<br/>
							Flight Period: -<br/>
							Routes: All routes.<br/>
							Refund Rules: As per normal regulation.</p>
							<p>
							Based on information that we received, the refund process will take longer than usual. Therefore, we suggest you to do an Open Ticket and enjoy the convenience and excellence with the options offered in accordance with the provisions of the ticket issuance date and flight date as above.</p>


			              </div>{/* end.content */}
			            </div>

			    	</div>{/* end.tnc-accodion */}
			      
			    </section>
			    <div className="rows fixed_button">
			    	<div className="button_bottom">
			    		<button type="button" className="share_bt"> <span>Share</span></button>
			    	</div>
			    </div>{/* end.rows */}
			  </div>{/* end.wrapper */}
			</div>

		)
	}
}
export default TicketingPolicyFlights;