import React from 'react';
import ShareButton from 'react-web-share-button';

class StickyShare extends React.Component{
	render(){

		const url = window.location.href
		return(
			<div>
			<div className="fixed_button_rows">

		    	<div className="button_bottom">
		    	<ShareButton buttonText="Share" title="My Great Page" text="A really great page" url={url} />

		    	</div>
		    </div>{/* end.fixed_button_rows */}
		    </div>

		)
	}
}
export default StickyShare;