import React, { Component } from "react";
import './LinearRegression.css';
import LeftSideBar from '../../CommonComponents/LeftSideBar/LeftSideBar'

export default class LinearRegresion extends Component {
	constructor({match}) {
			super();
			this.state = {
				path: match.path,
			}
		}

	render() {
		const { path}  = this.state;
		console.log("path: ", path);
		return(
			<div className='app-body'>
				<LeftSideBar path={ path }/>
				<div className='dark-background main-content-size'>LinearRegresion</div>
			</div>
		)
	}

}