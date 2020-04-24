import React, { Component } from "react";
import axios from 'axios';
import { Icon  } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/LinearRegression.css';
import LeftSideBar from '../../CommonComponents/LeftSideBar/LeftSideBar';
import { FILE_UPLOAD_GUIDELINES } from './constants';

export default class LinearRegresion extends Component {
	constructor({match}) {
			super();
			this.state = {
				path: match.path,
				selectedFile: null,
				percenatgeTraining: 70,
				inputFileInfo: false,
				shouldShuffle: true,
				uploadStatus: '',
				normalizeData: true,
			}
		}

	getTrainingPercentage = (event) => {
		this.setState({ percenatgeTraining: event.target.value })
	}

	handleShuffle = (event) => {
		const { shouldShuffle } = this.state;
		this.setState({ shouldShuffle: !shouldShuffle })
	}

	handleNormalize = (event) => {
		const { normalizeData } = this.state;
		this.setState({ normalizeData: !normalizeData })
	}

	inputFileGuide = () => {
		const { inputFileInfo } = this.state;
		this.setState({ inputFileInfo : !inputFileInfo });
	}

	selectFileHandler=(event)=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
	}
	
	uploadFileHandler = () => {
		const { selectedFile } = this.state;
		if (selectedFile) {
			let data = new FormData()
			data.append('file', selectedFile);
			axios.post("http://127.0.0.1:5000/upload_input_file/".concat(this.state.selectedFile.name), data, {}).then(
				res => {
					this.setState({
						uploadStatus: res.status === 200 ? 'success' : 'failed'
					})
				}
			)	
		} else {
			this.setState({ uploadStatus: 'failed' })
		}
	}
	
	handleTrain = (event) => {
    const { percenatgeTraining, shouldShuffle, normalizeData } = this.state;
    axios.post("http://127.0.0.1:5000/linear_regression/", null,{ params: {
      percenatgeTraining,
			shouldShuffle,
			normalizeData
    }}).then(res => {
      this.setState({
        loss: res.data.loss,
      })
    })
    .catch(err => console.warn(err));
    event.preventDefault();
  }

	render() {
		const { path, inputFileInfo, percenatgeTraining, shouldShuffle, uploadStatus, normalizeData }  = this.state;
		return(
			<div className='app-body'>
				<LeftSideBar path={ path }/>
				<div className='dark-background main-content-size'>
					<div className='main-content-header'>Linear Regresion</div>

					<div className="ui inverted segment" style={{ margin: '0px' }}>

						<div className="ui inverted transparent input main-content-body">
							<Icon name="info circle" color='grey' onClick={this.inputFileGuide} className='icon-div' />
							<input type="file" style={{ marginLeft: '1em', color: 'grey' }} onChange={this.selectFileHandler}/>
							<button className="ui right floated button inverted teal" onClick={this.uploadFileHandler}>Upload File</button>
						</div>
						{ inputFileInfo ? <div className='info-div-style'>{ FILE_UPLOAD_GUIDELINES }</div> : null	}
						<br/>
						<div>
							{uploadStatus === 'success' 
								? <div style={{ color: 'green' }}><Icon name='thumbs up' color='green' /> Upload successful.</div>
								: this.state.uploadStatus === 'failed'
								? <div style={{ color: 'red' }}><Icon name='thumbs down' color='red' /> Upload failed.</div>
								: null }
						</div>

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
							<span style={{ marginLeft: '3em' }}>Normalize data: </span>
							<input type='checkbox' name='normalizeData' checked={normalizeData} onChange={this.handleNormalize} />
						</div>
						<div className="ui inverted divider"></div>

						<button className="ui left floated button inverted teal" onClick={this.handleTrain}>Train Data</button>

					</div>

				</div>
			</div>
		)
	}

}