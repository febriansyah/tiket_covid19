import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
  } from "react-router-dom";

const langnya= window.location.hostname.substr(0, window.location.hostname.indexOf('.'));
const langDef = 'en'

class Header extends React.Component{
	constructor(props){
		super(props)
		this.state = {
		  defaultLangnya: langnya == langDef ? langnya : 'id',
		};
	}
	render(){
		const {
	      defaultLangnya
	    } = this.state;
		return(
			<div>
			<header>
				<div className="wrapperBig">
					<div className="inner_section">
						<div className="logo">
							<a href="https://www.tiket.com/">
								<img src="/assets/images/tiket-com-blue@2x.png" alt='logo_tiket' />
							</a>
						</div>{/* end.logo */}
						<div className="mainMenu">
							<ul className={`${defaultLangnya == 'id' ? 'hide' : ''}`}>
								<li><a href="https://en.tiket.com/pesawat">Flight</a></li>
								<li><a href="https://en.tiket.com/hotel">Hotel</a></li>
								<li><a href="https://en.tiket.com/to-do">To Dos</a></li>
								<li><a href="https://en.tiket.com/kereta-api">Train</a></li>
								<li><a href="https://en.tiket.com/sewa-mobil">Car Rental</a></li>
								<li><a href="https://en.tiket.com/to-do/search?category=EVENT">Events</a></li>
							</ul>

							<ul className={`${defaultLangnya == 'id' ? '' : 'hide'}`}>
								<li><a href="https://www.tiket.com/pesawat">Pesawat</a></li>
								<li><a href="https://www.tiket.com/hotel">Hotel</a></li>
								<li><a href="https://www.tiket.com/to-do">To Do</a></li>
								<li><a href="https://www.tiket.com/kereta-api">Kereta Api</a></li>
								<li><a href="https://www.tiket.com/sewa-mobil">Sewa Mobil</a></li>
								<li><a href="https://www.tiket.com/to-do/search?category=EVENT&pageNumber=1">Event</a></li>
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