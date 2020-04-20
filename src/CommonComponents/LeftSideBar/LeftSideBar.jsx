import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './LeftSideBar.css';
import { sidebarList } from './constants';

class LeftSideBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const selectedList = this.props.path;
		const finalList = sidebarList.map((element, index) => {
			return(
				<Link to={element.route} key={index}>
					<li
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