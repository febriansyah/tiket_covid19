import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
  } from "react-router-dom";
class Footer extends React.Component{

	render(){
		return(
			<div>
				<footer>
					<p>© 2011-2020 PT. Global Tiket Network. All Rights Reserved</p>
				</footer>
			</div>

		)
	}
}
export default Footer;