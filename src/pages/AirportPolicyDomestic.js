import React, { Component, Fragment } from "react";
import {Link} from 'react-router-dom';
import request from "superagent";
import debounce from "lodash.debounce";
import $ from 'jquery'; 
import axios from 'axios';
import StickyShare from './StickyShare';
import ReadMoreReact from 'read-more-react';
import ReactMarkdown from 'react-markdown';

//const input = '## This is a header\n\nAnd this is a paragraph'

const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'
const apiUrl = 'https://api.tiketsafe.com/api/v2/';

class AirportPolicyDomestic extends React.Component{
constructor(props) {
    super(props);
    
    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: [],
      paging: 0,
      expand: false,
      setHeight:"0px",
      defaultLangnya: langnya == langDef ? langnya : 'id'
    };

    // Binds our scroll event handler
    window.onscroll = () => {
    	//alert(window.innerHeight + window.scrollY+' sama ga '+(document.body.offsetHeight -10));
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
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 20)
      ) {
        loadUsers();
      }
    };
  }
  getInitialState(){
    return {active: null}
  }
  handleClick(i){
    return (e) => {
      let active = this.state.active === i ? null : i
      this.setState({active: active, expand: true})
    }
  }
  display(i){
    return this.state.active === i ? 'block' : 'none'
  }
  liClass(i){
    return this.state.active === i ? 'active' : 'inactive'
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadUsers();
  }

   componentDidMount() {
   		
    /*setTimeout(() => {
			window.activeAccordion();
		}, 1000);*/
    	window.popupSlider();
  	}

  loadUsers = () => {
    this.setState({ isLoading: true}, () => {
      //const proxyurl = "https://cors-anywhere.herokuapp.com/";
      this.state.paging = this.state.paging+1;

      //console.log('ada '+this.state.defaultLangnya);
      request
        .get('https://api.tiketsafe.com/api/v2/airports?airportType=1&lang='+this.state.defaultLangnya+'&page='+this.state.paging)
        .then((results) => {   
          // Creates a massaged array of user data
          console.log('ada '+results.body.data);
          const nextUsers = results.body.data.map(value => ({
            airportName: value.airportName,
            items: value.items,
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
    console.log(langnya);

		return(

		<div id="middle-content" className="homePage">
		  <div className="wrapper">
		    <div className="rows">
		    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
		    </div>
		    <div className="rows">	
		    					<div className="main_title_top">
					<h3>{defaultLangnya == 'id' ? 'Kebijakan Bandara' : 'Airport Policy'}</h3>
				</div>
			</div>{/* end.rows */}


		    <section id="section_innernya">
		    	<div className="rows">
				  <div className="search_row">
				    <input type="text" id="searchTrigger_airlines" className="search_input" name="" placeholder={defaultLangnya == 'id' ? 'Cari bandara atau kota' : 'Search airports or cities'} />
					    <div className="overlay_trigger trigger_slider_search" data-slider="popup_search_airport_policy"></div>
				  </div>
				</div>{/* end.rows */}
				<div className="rows">
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
      					  <div className={`page ${this.display(i) == 'block' && 'active'}`}  onClick={this.handleClick(i)}>
      						<span>{user.airportName}</span>
      					  </div>
      					  <div className={`content ${this.display(i) == 'block' && 'active'}`}  style={{display: this.display(i)}}>
                    {user.items.map((item, k) => (
                      <div className="rowHtml" key={k}>
                        <h3 className={item.description == '' ? 'hideDesc' : 'showDesc'}>{item.description == '' ? '' : item.name}</h3>
                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                      </div>
                    ))}


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
				          {/* <div className="bounce1"></div>
				          <div className="bounce2"></div>
				          <div className="bounce3"></div> */}
				        </div>
				      </div>
				    </div>
		        }
		        {!hasMore &&
		          <div></div>
		        }
		    	</div>{/* end.tnc-accodion */}
		      
		    </section>
		    
        <StickyShare url={window.location.href}/>
		  </div>{/* end.wrapper */}
		</div>

		)
	}
}
export default AirportPolicyDomestic;