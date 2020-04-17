import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './LeftSideBar.css';
import { sidebarList } from './constants';

class LeftSideBar extends Component {
	constructor() {
		super();
		this.state = {
			selectedList: '/',
		}
	}

	handleClick = (selectedList) => {
		this.setState({selectedList});
	}

	render() {
		const selectedList = this.state.selectedList;
		const finalList = sidebarList.map((element, index) => {
			return(
				<Link to={'/' + element.route} key={index}>
					<li onClick={() => this.handleClick(element.route)}
						className={ selectedList === element.route ? 'list-selected' : 'list-unselected' }>
						{ element.displayName }
					</li>
				</Link>
			)
		})
		return(
			<div className='left-side-bar-size left-side-bar'>
				{finalList}
			</div>
		)
	}

}

export default LeftSideBar;