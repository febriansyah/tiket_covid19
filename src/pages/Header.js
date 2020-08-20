import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
  } from "react-router-dom";
class Header extends React.Component{

	render(){
		return(
			<div>
			<header>
				<div className="wrapperBig">
					<div className="inner_section">
						<div className="logo">
							<Link to="/">
								<img src="/assets/images/tiket-com-blue@2x.png" alt='logo_tiket' />
							</Link>
						</div>{/* end.logo */}
						<div className="mainMenu">
							<ul>
								<li><Link to="/">Flight</Link></li>
								<li><Link to="/">Hotel</Link></li>
								<li><Link to="/">Train</Link></li>
								<li><Link to="/">Car Rental</Link></li>
								<li><Link to="/">Event</Link></li>
								<li><Link to="/">Attraction</Link></li>
								<li><Link to="/">Movie</Link></li>
							</ul>
						</div>
					</div>
				</div>
			</header>
			</div>

		)
	}
}
export default Header;