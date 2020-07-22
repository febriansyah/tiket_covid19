import React from 'react';

class StickyShare extends React.Component{
	render(){
		return(
			<div>
			<div className="fixed_button_rows">
		    	<div className="button_bottom">
		    		<button type="button" className="share_bt"><img className="icon_bt" src="assets/images/icon_share.png" alt='share' /> <span>Share</span></button>
		    	</div>
		    </div>{/* end.fixed_button_rows */}
		    </div>

		)
	}
}
export default StickyShare;