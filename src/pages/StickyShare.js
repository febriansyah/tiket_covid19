import React from 'react';

const btn = document.getElementById("button")
const url = window.location.href.toString();
const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'
const dataLayer = window.dataLayer || [];


class StickyShare extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
	      defaultLangnya: langnya == langDef ? langnya : 'id' ,
	    };

	}
	onclick = () => {
		var url = this.props.url;
		var pathGtm = this.props.pathGtm;
	    if (navigator.share !== undefined) {
			dataLayer.push({'event': 'click','eventCategory' : 'shareLink', 'eventLabel' : pathGtm });
			//console.log(dataLayer);
	      navigator
	        .share({
	          url
	        })
	        .then(() => console.log("Shared!"))
	        .catch(err => console.error(err));
	    } else {
	      window.location = `mailto:?subject=a&body=a%0A${url}`;
			dataLayer.push({'event': 'click','eventCategory' : 'shareLink', 'eventLabel' : pathGtm });
			//console.log(dataLayer);
	    }
	  };

	render(){
		const {
     	 defaultLangnya,
    	} = this.state;
		return(
			<div>
			<div className="fixed_button_rows">

		    	<div className="button_bottom">
		    		<button id="buttonnya" onClick={this.onclick} className="share_bt">{defaultLangnya == 'id' ? 'Bagikan' : 'Share'}</button>

		    	</div>
		    </div>{/* end.fixed_button_rows */}
		    </div>

		)
	}
}
export default StickyShare;