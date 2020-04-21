import React, { Component } from "react";
import axios from 'axios';
import { Button, Input, Checkbox } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/LinearRegression.css';
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
				<div className='dark-background main-content-size'>
					<div className='main-content-header'>Linear Regresion</div>
					
				</div>
			</div>
		)
	}

}