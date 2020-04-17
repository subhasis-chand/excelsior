import React, { Component } from "react";
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './Header.css';

class Header extends Component {
	constructor() {
			super();
		}

	render() {
		return(
			<div className='header header-height'>
				<div className='header-text'>EXCELSIOR</div>
				<Icon name="glass martini" color='red' />
			</div>
		)
	}

}

export default Header;