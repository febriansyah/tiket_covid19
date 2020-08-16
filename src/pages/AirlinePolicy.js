import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery'; 
import axios from 'axios';
import request from "superagent";
//import debounce from "lodash.debounce";
import ReadMoreReact from 'read-more-react';
import PopupAirlines from './PopupAirlines';
import StickyShare from './StickyShare';

const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'

class AirlinePolicy extends Component{
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
      defaultLangnya: langnya == langDef ? langnya : 'id' ,
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

  loadUsers = () => {
    this.setState({ isLoading: true}, () => {
      this.state.paging = this.state.paging+1;

      request
        .get('https://api.tiketsafe.com/api/v2/airlines?lang='+this.state.defaultLangnya+'&flightType=1&page='+this.state.paging)
        .then((results) => {   
          // Creates a massaged array of user data
          //console.log(results.body.data.length)
          const nextUsers = results.body.data.map(value => ({
            airlinesName: value.airlinesName,
            imageURL: value.imageURL,
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
						<div className="block_policy full_block">
						  <div className="caption_policy">
							<div className="detail-text-project">
							    <h3>{defaultLangnya == 'id' ? 'Regulasi Tiket dan Kebijakan Maskapai' : 'Airlines Ticketing Guidelines and Policy'}</h3>
				          		<span className="blue_rounded_txt no_marg">Published 29 April 2020</span>
								<p>
									<ReadMoreReact 
										text={defaultLangnya == 'id' ? 'Bagian ini berisi informasi mengenai kebijakan penerbangan dan regulasi terkait pembelian tiket yang dikeluarkan oleh maskapai. Kamu bisa mengecek tentang ketentuan/persyaratan untuk terbang, sekaligus mendapatkan informasi  mengenai refund, reschedule, atau reroute. Info yang tertera di halaman ini bersifat referensi dan dapat diubah sewaktu-waktu oleh maskapai terkait. Kami akan terus berusaha memberikan informasi ter-update. Namun, sobat tiket tetap perlu mencari tahu info sedetail mungkin mengenai kebijakan dari maskapai terkait sebelum membeli tiket, melakukan penerbangan, dan lain-lain.' : 'This section contains information regarding airline policies and regulations of flight tickets issued by airlines. You can check the terms and conditions for flying, as well as detailed information about refund, reschedule, or reroute policies. The information listed on this page is for reference only and can be changed at any time by the airline without prior notice. We will continue to provide the most updated information. However, t-mates still need to find out as much detail as possible about the policies of the airline before purchasing flight tickets, scheduling your flights, and so on.'}

										readMoreText={defaultLangnya == 'id' ? 'Selengkapnya' : 'Read More'}/>
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
				              <div className={`page ${this.display(i) == 'block' && 'active'}`}  onClick={this.handleClick(i)}>
				              	<img src={user.imageURL} className="icon_airline" alt='airline_logo' />
								<span>{user.airlinesName}</span>
				              </div>
				              <div className={`content ${this.display(i) == 'block' && 'active'}`}  style={{display: this.display(i)}}>
					              {user.items.map((item, k) => (
				                      <div className="rowHtml" key={k}>
				                        <h3>{item.description == '' ? '' : item.name}</h3>
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

          <PopupAirlines />
			    <StickyShare url={window.location.href}/>
			  </div>{/* end.wrapper */}
			</div>
		)
	}
}

export default AirlinePolicy;