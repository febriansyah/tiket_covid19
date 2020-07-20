import React, { Component, Fragment } from "react";
import {Link} from 'react-router-dom';
import request from "superagent";
import debounce from "lodash.debounce";
import $ from 'jquery'; 
import axios from 'axios';

class AirportPolicy extends React.Component{
constructor(props) {
    super(props);
    
    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: [],
      paging: 0
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadUsers,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadUsers();
      }
    };
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadUsers();
  }

  loadUsers = () => {
    this.setState({ isLoading: true}, () => {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const pagenya = this.state.paging+1;

      request
        .get(proxyurl+'https://api.tiketsafe.com/api/v1/airports?lang=id&page='+pagenya)
        .then((results) => {          
          console.log(pagenya);
          // Creates a massaged array of user data
          const nextUsers = results.body.data.map(value => ({
            airportName: value.airportName,
          }));

          // Merges the next users into our existing users
          this.setState({
            // Note: Depending on the API you're using, this value may be
            // returned as part of the payload to indicate that there is no
            // additional data to be loaded
            hasMore: (this.state.users.length < 100),
            isLoading: false,
            users: [
              ...this.state.users,
              ...nextUsers,
            ],
          });

    	window.activeAccordion();
    	
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
           });
        })
    });
  }

	

	render(){
		const {
      error,
      hasMore,
      isLoading,
      users,
    } = this.state;

		return(

		<div id="middle-content" className="homePage">
		  <div className="wrapper">
		    <div className="rows">
		    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
		    </div>
		    <div className="rows">
				<div className="main_title_top">
					<h3>Airport Policy</h3>
				</div>
			</div>{/* end.rows */}


		    <section id="section_innernya">
		    	<div className="rows">
				  <div className="search_row">
				    <input type="text" id="searchTrigger_airlines" className="search_input trigger_slider_search" data-slider="popup_search_airport_policy" name="" placeholder="Search airport or cities" />
				  </div>
				</div>{/* end.rows */}
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
		    </section>

		    <section id="section_tabs_list">
		    	<div id="tnc-accodion">
		    	
			    {users.map((user, i) => (
		          <Fragment key={i}>
		            <div className="items" key={i}>
					  <div className="page">
						<span>{user.airportName}</span>
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


					  </div>
					</div>
		          </Fragment>
		        ))}
		        <hr />
		        {error &&
		          <div>
		            {error}
		          </div>
		        }
		        {isLoading &&

		          <div className="halBefore-kuis">
				      <div className="box-loading2">
				          <div className="spinner">
				          <div className="bounce1"></div>
				          <div className="bounce2"></div>
				          <div className="bounce3"></div>
				        </div>
				      </div>
				    </div>
		        }
		        {!hasMore &&
		          <div>You did it! You reached the end!</div>
		        }
		    	</div>{/* end.tnc-accodion */}
		      
		    </section>
		    <div className="rows">
		    	<div className="button_bottom">
		    		<button type="button" className="share_bt"><img className="icon_bt" src="assets/images/icon_share.png" /> <span>Share</span></button>
		    	</div>
		    </div>{/* end.rows */}
		  </div>{/* end.wrapper */}
		</div>

		)
	}
}
export default AirportPolicy;