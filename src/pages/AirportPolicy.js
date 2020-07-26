import React, { Component, Fragment } from "react";
import {Link} from 'react-router-dom';
import request from "superagent";
import debounce from "lodash.debounce";
import $ from 'jquery'; 
import axios from 'axios';
import StickyShare from './StickyShare';
import ReactMarkdown from 'react-markdown';

//const input = '## This is a header\n\nAnd this is a paragraph'

const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));

const langDef = 'en'


class AirportPolicy extends React.Component{
constructor(props) {
    super(props);
    
    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: [],
      paging: 0,
      defaultLangnya: langnya == langDef ? langnya : 'id'  
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

   componentDidMount() {

  	}

  loadUsers = () => {
    this.setState({ isLoading: true}, () => {
      //const proxyurl = "https://cors-anywhere.herokuapp.com/";
      this.state.paging = this.state.paging+1;

      //console.log('ada '+this.state.defaultLangnya);
      request
        .get('https://api.tiketsafe.com/api/v1/airports?lang='+this.state.defaultLangnya+'&page='+this.state.paging)
        .then((results) => {   
          // Creates a massaged array of user data

          const nextUsers = results.body.data.map(value => ({
            airportName: value.airportName,
            generalRequirements: value.generalRequirements,
          }));

          // Merges the next users into our existing users
          this.setState({
            // Note: Depending on the API you're using, this value may be
            // returned as part of the payload to indicate that there is no
            // additional data to be loaded
            hasMore: (results.body.data.length != 0),
            isLoading: false,
            users: [
              ...this.state.users,
              ...nextUsers,
            ],
          });

    	window.activeAccordion();
    	window.popupSlider();
    	
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
    console.log(langnya);

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
				    <input type="text" id="searchTrigger_airlines" className="search_input" name="" placeholder="Search airport or cities" />
					    <div className="overlay_trigger trigger_slider_search" data-slider="popup_search_airport_policy"></div>
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
					    <div dangerouslySetInnerHTML={{ __html: user.generalRequirements }} />

						<br />
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
		          <div></div>
		        }
		    	</div>{/* end.tnc-accodion */}
		      
		    </section>
		    
			    <StickyShare />
		  </div>{/* end.wrapper */}
		</div>

		)
	}
}
export default AirportPolicy;