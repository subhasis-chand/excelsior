import React, { Component } from "react";
import LeftSideBar from '../../CommonComponents/LeftSideBar/LeftSideBar'

export default class Home extends Component {
	constructor({match}) {
			super();
			this.state = {
				path: match.path,
			}
		}

	render() {
		const { path}  = this.state;
		return(
			<div className='app-body'>
				<LeftSideBar path={ path }/>
				<div className='dark-background main-content-size'>Home</div>
			</div>
		)
	}

}