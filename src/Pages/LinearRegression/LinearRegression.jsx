import React, { Component } from "react";
import axios from 'axios';
import { Button, Icon, Slider,  } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/LinearRegression.css';
import LeftSideBar from '../../CommonComponents/LeftSideBar/LeftSideBar';
import { FILE_UPLOAD_GUIDELINES } from './constants';

export default class LinearRegresion extends Component {
	constructor({match}) {
			super();
			this.state = {
				path: match.path,
				percenatgeTraining: 70,
				inputFileInfo: false,
				shouldShuffle: true,
			}
		}

	getTrainingPercentage = (event) => {
		this.setState({ percenatgeTraining: event.target.value })
	}

	handleShuffle = (event) => {
		const { shouldShuffle } = this.state;
		this.setState({ shouldShuffle: !shouldShuffle })
	}

	inputFileGuide = () => {
		const { inputFileInfo } = this.state;
		this.setState({ inputFileInfo : !inputFileInfo });
	}

	render() {
		const { path, inputFileInfo, percenatgeTraining, shouldShuffle }  = this.state;
		return(
			<div className='app-body'>
				<LeftSideBar path={ path }/>
				<div className='dark-background main-content-size'>
					<div className='main-content-header'>Linear Regresion</div>

					<div className="ui inverted segment" style={{ margin: '0px' }}>

						<div className="ui inverted transparent input main-content-body">
							<Icon name="info circle" color='grey' onClick={this.inputFileGuide} className='icon-div' />
							<input type="file" style={{ marginLeft: '1em', color: 'grey' }}/>
							<button className="ui right floated button inverted teal">Upload File</button>
						</div>
						{ inputFileInfo ? <div className='info-div-style'>{ FILE_UPLOAD_GUIDELINES }</div> : null	}

						<div className="ui inverted divider"></div>

						<div className='main-content-body'>
							<span>Percentage Training Data: { percenatgeTraining } </span>
							<input
								type="range"
								min='0'
								max='100'
								step='1'
								value={ percenatgeTraining }
								onChange={ this.getTrainingPercentage }
							/>
							<span style={{ marginLeft: '3em' }}>Shuffle while training: </span>
							<input type='checkbox' name='shouldShuffle' checked={shouldShuffle} onChange={this.handleShuffle} />
						</div>
						<div className="ui inverted divider"></div>

						<button className="ui left floated button inverted teal">Train Data</button>

					</div>

				</div>
			</div>
		)
	}

}