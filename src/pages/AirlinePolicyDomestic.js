import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery'; 
import axios from 'axios';
import request from "superagent";
import debounce from "lodash.debounce";
import ReadMoreReact from 'read-more-react';
import StickyShare from './StickyShare';

const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'

class AirlinePolicyDomestic extends Component{
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

  loadUsers = () => {
    this.setState({ isLoading: true}, () => {
      this.state.paging = this.state.paging+1;

      request
        .get('https://api.tiketsafe.com/api/v1/airlines?lang='+this.state.defaultLangnya+'&flightType=1&page='+this.state.paging)
        .then((results) => {   
          // Creates a massaged array of user data
          //console.log(results.body.data.length)
          const nextUsers = results.body.data.map(value => ({
            airlinesName: value.airlinesName,
            imageURL: value.imageURL,
            generalRequirementDesc: value.generalRequirementDesc,

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
    	window.readmoreFade();
    	
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
      defaultLangnya,
    } = this.state;

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
					<div className="rows">
						<div className="tabs_main_menu">
							<Link to="" className="tabs_menu active">
								<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
								<span>Domestic</span>
							</Link>
							<Link to="/AirlinePolicyInternational" className="tabs_menu">
							<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
								<span>International</span>
							</Link>
						</div>
				    </div>{/* end.rows */}
					<div className="rows">
						<div className="block_policy full_block">
						  <div className="caption_policy">
							<div className="detail-text-project">
							    <h3>Airlines Ticketing Guideline and Policy</h3>
				          		<span className="blue_rounded_txt no_marg">Published 29 April 2020</span>
								<p>
									<ReadMoreReact 
										text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"

										readMoreText="Read More"/>
								</p>
						    </div>{/*><!--end.detail-text-project-->*/}
						  </div>
						</div>{/* end.block_policy */}
				    </div>{/* end.rows */}
			    </section>

			    <section id="section_tabs_list">
			    	<div id="tnc-accodion">
			    		{users.map((user, i) => (
				          <Fragment key={i}>
				            <div className="items" key={i}>
				              <div className="page">
				              	<img src={user.imageURL} className="icon_airline" alt='airline_logo' />
								<span>{user.airlinesName}</span>
				              </div>
				              <div className="content">
				                <p>{user.generalRequirementDesc}</p><br />
				                
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

export default AirlinePolicyDomestic;