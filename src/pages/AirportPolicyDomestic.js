import React, { Component, Fragment } from "react";
import {Link} from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import request from "superagent";
//import debounce from "lodash.debounce";
import $ from 'jquery'; 
import axios from 'axios';

import StickyShare from './StickyShare';
//import ReadMoreReact from 'read-more-react';
import trimText from "../utils/trimText";
import PopupAirport from './PopupAirport';
import { sendEventGTM } from '../utils/gtm';

//import ReactMarkdown from 'react-markdown';

//const input = '## This is a header\n\nAnd this is a paragraph'

const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'
const apiUrl = 'https://api.tiketsafe.com/api/v2/';
const htmlTextInd =
  "<p>Bagian ini berisi informasi mengenai kebijakan penerbangan dari masing-masing bandara sesuai area atau negara. Kamu bisa mengecek tentang ketentuan/persyaratan untuk terbang, sekaligus mendapatkan informasi mengenai ketentuan masuk area terkait. Info yang tertera di halaman ini bersifat referensi dan dapat diubah sewaktu-waktu oleh otoritas terkait. Kami akan terus berusaha memberikan informasi ter-update. Namun, sobat tiket tetap perlu mencari tahu info sedetail mungkin mengenai kebijakan bandara sebelum melakukan penerbangan, dan lain-lain.</p><h3>Syarat & Ketentuan Infopage COVID-19</h3><p>Terjadinya pandemi COVID-19 di berbagai belahan dunia menimbulkan keprihatinan dan perhatian khususnya dari berbagai pihak, diantaranya adalah pemerintah dan para pelaku usaha pariwisata. Sebagai online travel agent yang ingin selalu mengedepankan kebutuhan dan keamanan sobat tiket, tiket.com memberikan informasi terkait pandemi COVID-19, pembatasan area, regulasi perjalanan, dan lain-lain melalui infopage ini yang diambil dari berbagai sumber yang terpercaya.</p><p>Informasi di infopage ini dibuat hanya sebagai referensi dan tidak dapat digunakan sebagai rujukan sepenuhnya untuk melakukan perjalanan atau membeli produk. Sobat tiket dianjurkan untuk melakukan pencarian informasi yang komprehensif dari sumber yang dibuat oleh otoritas terkait serta melakukan protokol kesehatan yang disarankan dan cek status COVID-19 di mana pun berada agar tetap aman.</p><p>Selain itu, regulasi atau peraturan terkait produk tiket.com yang dibeli bisa saja berbeda dengan yang tertulis di sini, karena hal tersebut mengacu pada kebijakan masing-masing penyedia jasa dan/atau dapat berubah sewaktu-waktu. Infopage ini memberikan informasi umum untuk kepentingan pembaca dan bukan untuk memenuhi permintaan dan/atau kepentingan pihak tertentu.</p><p>Infopage ini akan terus mendapatkan pembaharuan dari tiket.com. Sobat tiket dianjurkan untuk mengunjungi aplikasi tiket.com dari waktu ke waktu untuk mengetahui pembaharuan dimaksud.</p><p>tiket.com memiliki hak kepemilikan atas semua informasi yang terdapat di dalam Infopage COVID-19 ini, oleh karena itu setiap penggunaannya secara umum oleh pihak ketiga manapun untuk tujuan apapun wajib mendapatkan persetujuan tertulis terlebih dahulu dari tiket.com.</p>";

const htmlTextEn ="<p>This section contains information regarding airport policies according to country or area. You can check the terms and conditions for flying, as well as detailed information about how to enter a specific area here. The information listed on this page is for reference only and can be changed at any time by the authority without prior notice. We will continue to provide the most updated information for t-mates. However, you still need to find out as much detail as possible about the policies of the airport before purchasing flight tickets and other important information needed.</p><h3>COVID-19 Infopage Terms & Conditions</h3><p>The occurrence of the COVID-19 pandemic in various parts of the world has caused concern and attention, including the government and tourism businesses. As an online travel agent who wants to always prioritize t-mates needs and safety, tiket.com provides information related to the COVID-19 pandemic, area restrictions, travel regulations, etc. through this infopage taken from a variety of trusted sources.</p><p>The information on this infopage is made only for reference and cannot be used as a full reference for traveling or purchasing products. t-mates are advised to do information search from sources made by the relevant authorities as well as carrying out the recommended health protocols and check COVID-19 status in the destination.</p><p>Additionally, regulations or terms related to tiket.com products purchased may be different from what is written on this infopage, because it refers to the policies of each provider and/or may change at any time without prior notice. This infopage only provides general information for the benefit of the reader and is not made to fulfill requests or interests of certain parties.</p><p>This infopage will continue to be updated by tiket.com. t-mates are advised to visit tiket.com application from time to time to be aware of such updates.</p><p>tiket.com is the sole proprietary for any information contained in this COVID-19 Infopage, therefore any use in general by any third party for whatsoever reason must obtain prior written approval from tiket.com.</p>"

const htmlText = langnya == langDef ? htmlTextEn : htmlTextInd;

const readMoreInd ="Selengkapnya";
const hideInd ="Sembunyikan";

const readMoreEng ="Read More";
const hideEng ="Show Less";
const urlCop = window.location.href;

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
      defaultLangnya: langnya == langDef ? langnya : 'id',
      readMoreTxt: langnya == langDef ? readMoreEng : readMoreInd,
      hideMoreTxt: langnya == langDef ? hideEng : hideInd,
      showOriginalHTML: false,
      originalHTML: htmlText,
      trimmedHTML: trimText(htmlText, 20, 200)[0],
      valueCopy: urlCop,
      copied: false,
      tempPopup:[]
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
  handleClick(i,airportName){
    return (e) => {
      const gtmProperty = {screenName: 'tiketSafeAirport',vertical:'flight'};
			const gtmFlight = {
        airline: airportName
			};
      sendEventGTM(
        {'event': 'click', 'eventCategory': 'expandDetail', 'eventLabel': airportName },
        gtmProperty,
        gtmFlight,
      );

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
    	//window.popupSlider();
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
            tempPopup:results.body.data
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
  handleShowText = () => {
    this.setState( prevState  => ({
      ...prevState,
      showOriginalHTML: !prevState.showOriginalHTML
    }));
  }
  InternationalFilterGtm = () => {
    const gtmProperty = {screenName: 'tiketSafeAirport',vertical:'flight'};
    const gtmFlight = {
      type: 'international'
    };
    sendEventGTM(
      {'event': 'click', 'eventCategory': 'filter', 'eventLabel' : 'international' },
      gtmProperty,
      gtmFlight,
    );
  }
	onCopy = () => {
    this.setState({copied: true});
    $("#linkCopied").fadeIn();
     setTimeout(function() { 
      $("#linkCopied").fadeOut();
    }, 2000);
  };
  urlCopy = () => {
    let urlnya = window.location.href;
    return urlnya;
  }
  popupShow = () => {
      $("#popup_search_airport_policy").removeClass("hide");
      setTimeout(function() {
          $("#popup_search_airport_policy").addClass("actived");
        }, 500);
    }

	render(){
		const {
      error,
      hasMore,
      isLoading,
      users,
      defaultLangnya,
      showOriginalHTML,
      originalHTML,
      trimmedHTML,
      readMoreTxt,
      hideMoreTxt,
      tempPopup
    } = this.state;
    var myArray = tempPopup;
    console.log(myArray,'my');

		return(

		<div id="middle-content" className="innerPages">
      <div id="linkCopied">
        <p>{defaultLangnya == 'id' ? 'Link sudah disalin!' : 'Link is copied!'}</p>
      </div>

      <div className="top_bg_section">
		    <div className="wrapper">
    		  <div className="rows">
    		    	<Link to="/" className="back_button"><i className="fa fa-angle-left" aria-hidden="true"></i></Link>
    		    </div>
    		    <div className="rows">	
    		    					<div className="main_title_top">
    					<h3>{defaultLangnya == 'id' ? 'Kebijakan Bandara' : 'Airport Policy'}</h3>
    				</div>
    			</div>{/* end.rows */}

          <div className="rows">
            <div className="search_row">
              <input type="text" id="searchTrigger_airlines" className="search_input" name="" placeholder={defaultLangnya == 'id' ? 'Cari bandara atau kota' : 'Search airports or cities'} />
                <div onClick={this.popupShow} className="overlay_trigger trigger_slider_search" data-slider="popup_search_airport_policy"></div>
            </div>
          </div>{/* end.rows */}
        </div>{/* end.wrapper */}
      </div>{/* end.top_bg_section */}


      <div className="bottom_bg_section">
        <div className="wrapper relative contSticky">

          <div className="shareSocmed">
            <FacebookShareButton url={this.urlCopy()} className="facebookShare" />
            <TwitterShareButton url={this.urlCopy()}  className="twitterShare" />
            <WhatsappShareButton url={this.urlCopy()}  className="waShare" />
            <CopyToClipboard onCopy={this.onCopy} text={this.urlCopy()}>
              <button className="linkShare"></button>
            </CopyToClipboard>
          </div>

          <div className="flex_block">
    		    <section id="section_innernya">
            <div className="rows">
                <div className="block_policy full_block">
                  <div className="caption_policy">
                  <div className="detail-text-project">
                      <h3>{defaultLangnya == 'id' ? 'Regulasi Tiket dan Kebijakan Bandara' : 'Airport Ticketing Guidelines and Policy'}</h3>
                          <span className="blue_rounded_txt no_marg">Published 29 April 2020</span>
                    <div
                      className="text"
                      dangerouslySetInnerHTML={{
                        __html: `${
                          !showOriginalHTML ? trimmedHTML : originalHTML
                        }`
                      }}
                    />
                    <button className="read-more" onClick={this.handleShowText}>
                      {!showOriginalHTML ? readMoreTxt : hideMoreTxt }
                    </button>
                    </div>{/*><!--end.detail-text-project-->*/}
                  </div>
                </div>{/* end.block_policy */}
            </div>{/* end.rows */}
    				<div className="rows">
    					<div className="tabs_main_menu">
    						<Link to="" className="tabs_menu active">
    							<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
    							<span>{defaultLangnya == 'id' ? 'Domestik' : 'Domestic'}</span>
    						</Link>
    						<Link to="/AirportPolicyInternational" onClick={this.InternationalFilterGtm} className="tabs_menu">
    						<div className="circleCheck"><i className="fa fa-check" aria-hidden="true"></i></div>
    							<span>{defaultLangnya == 'id' ? 'Internasional' : 'International'}</span>
    						</Link>
    					</div>
    			    </div>{/* end.rows */}
    		    </section>

    		    <section id="section_tabs_list">
    		    	<div id="tnc-accodion">
    		    	
    			    {users.map((user, i) => (
    		          <Fragment key={i}>
    		            <div className="items" key={i}>
          					  <div className={`page ${this.display(i) == 'block' && 'active'}`}  onClick={this.handleClick(i,user.airportName)}>
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
          </div>
  		    
          {myArray.length >0 &&
          <PopupAirport param={myArray}/> }
          <StickyShare url={window.location.href} pathGtm='airportPolicy' />
		  </div>{/* end.wrapper */}
      </div>{/* end.bottom_bg_section */}
		</div>

		)
	}
}
export default AirportPolicyDomestic;