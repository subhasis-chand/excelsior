import React, { Component } from "react";
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/Header.css';

class Header extends Component {

	render() {
		return(
			<div className='header header-height'>
				<div className='header-text'>EXCELSIOR</div>
				<div style={{paddingBottom: '1em'}}>
					<Icon name="glass martini" color='red' />
				</div>
			</div>
		)
	}

}

export default Header;