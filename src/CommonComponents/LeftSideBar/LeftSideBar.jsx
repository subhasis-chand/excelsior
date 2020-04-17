import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './LeftSideBar.css';

class LeftSideBar extends Component {
	constructor() {
			super();
		}

	render() {
		return(
			<div className='left-side-bar-size left-side-bar'>
				<Link to='/'><li className='list'>HOME</li></Link>
				<Link to='/process_file'><li className='list'>Process File</li></Link>
				<Link to='/'><li className='list'>PCA</li></Link>
				<Link to='/linear_regression'><li className='list'>Linear Regression</li></Link>
				<Link to='/'><li className='list'>Logistic Regression</li></Link>
			</div>
		)
	}

}

export default LeftSideBar;