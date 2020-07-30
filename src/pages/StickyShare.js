import React from 'react';

const btn = document.getElementById("button")


class StickyShare extends React.Component{
	constructor(props) {
		super(props)
	}
	onclick = () => {
		//alert('aaa');
		var url = this.props.url;
	    if (navigator.share !== undefined) {
	      navigator
	        .share({
	          url
	        })
	        .then(() => console.log("Shared!"))
	        .catch(err => console.error(err));
	    } else {
	      window.location = `mailto:?subject=a&body=a%0A${url}`;
	    }
	  };

	render(){

		return(
			<div>
			<div className="fixed_button_rows">

		    	<div className="button_bottom">
		    		<button id="buttonnya" onClick={this.onclick} className="share_bt">Share</button>

		    	</div>
		    </div>{/* end.fixed_button_rows */}
		    </div>

		)
	}
}
export default StickyShare;