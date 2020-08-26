import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
  } from "react-router-dom";
class Footer extends React.Component{
	constructor(props){
		super(props)
		
	}
	render(){
		console.log(window.location.pathname.split("/")[1]);
		if(window.location.pathname.split("/")[1] !== "SearchResult")
		{
			return(

				<div>
					<footer>
						<p>© 2011-2020 PT. Global Tiket Network. All Rights Reserved</p>
					</footer>
				</div>

			)
		}
		return(

			<>
			</>

		)
	}
}
export default Footer;