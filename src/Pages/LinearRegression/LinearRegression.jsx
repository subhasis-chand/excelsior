import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/LinearRegression.css';
import LeftSideBar from '../../CommonComponents/LeftSideBar/LeftSideBar';
import TableComponent from '../../CommonComponents/TableComponent/TableComponent'
import { FILE_UPLOAD_GUIDELINES } from './constants';
import BarChart from '../../CommonComponents/BarChart/BarChart'

export default class LinearRegresion extends Component {
	constructor({match}) {
			super();
			this.state = {
				path: match.path,
				selectedFile: null,
				percenatgeTraining: 85,
				inputFileInfo: false,
				shouldShuffle: true,
				uploadStatus: '',
				normalizeData: true,
				uploadLocalFile: false,
				useBEFile: false,
				fileContent: null,
				opColNo: 0,
				trainingStatus: '',
				trainingData: null,
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

	selectFileHandler = (event)=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
	}

	uploadLocalFileHandler = () => {
		this.setState({
			uploadLocalFile: true,
			useBEFile: false,
			fileContent: null
		})
	}

	selectColHandler = (event) => {
		const opColNo = event.target.value;
		if (/^[0-9]*$/.test(opColNo)) {
			this.setState({ opColNo: parseInt(opColNo) })
		}
	}

	decOPColNo = () => {
		const { opColNo } = this.state;
		this.setState({ opColNo: opColNo > 1 ? opColNo-1 : opColNo})
	}

	incOPColNo = () => {
		const { opColNo, fileContent} = this.state;
		this.setState({ opColNo: opColNo < fileContent[0].length ? opColNo+1 : opColNo})
	}

	useBEFileHandler = () => {
		axios.post("http://127.0.0.1:5000/get_be_file/").then(
			res => {
				this.setState({
					uploadLocalFile: false,
					useBEFile: true,
					fileContent: res.data.content,
					opColNo: res.data.content[0].length,
				})
			}
		)
	}
	
	uploadFileHandler = () => {
		const { selectedFile } = this.state;
		if (selectedFile) {
			let data = new FormData()
			data.append('file', selectedFile);
			axios.post("http://127.0.0.1:5000/upload_input_file/".concat(this.state.selectedFile.name), data, {}).then(
				res => {
					this.setState({
						uploadStatus: res.status === 200 ? 'success' : 'failed',
						fileContent: res.data.content,
						opColNo: res.data.content[0].length,
				})
				}
			)	
		} else {
			this.setState({ uploadStatus: 'failed' })
		}
	}
	
	handleTrain = (event) => {
    const { percenatgeTraining, shouldShuffle, normalizeData, opColNo } = this.state;
    axios.post("http://127.0.0.1:5000/linear_regression/", null,{ params: {
      percenatgeTraining,
			shouldShuffle,
			normalizeData,
			opColNo,
    }}).then(res => {
      this.setState({
				trainingStatus: res.data.status,
				trainingData: res.data
      })
    })
    .catch(err => console.warn(err));
    event.preventDefault();
	}
	
	downloadWeightHandler = () => {
		window.location.href='http://127.0.0.1:5000/download/weights.csv';
	}

	render() {
		const {
			path,
			inputFileInfo,
			percenatgeTraining,
			shouldShuffle,
			uploadStatus,
			normalizeData,
			uploadLocalFile,
			useBEFile,
			fileContent,
			opColNo,
			trainingStatus,
			trainingData
		}  = this.state;
		const trainingPossible = fileContent !== null;
		console.log("status: ", trainingStatus);
		console.log("data: ", trainingData);
	
		return(
			<div className='app-body'>
				<LeftSideBar path={ path }/>
				<div className='dark-background main-content-size'>
					<div className='main-content-header'>Linear Regresion</div>

					<div className="ui inverted segment" style={{ margin: '0px' }}>
						<div style={{ width: '50%' }} className='text-color'>
							Upload a local file: 
							<input type='checkbox' checked={ uploadLocalFile } name='uploadLocalFile' onChange={this.uploadLocalFileHandler}
								style={{ float: 'right' }}/><br/>
							Use the file saved in BE during process file: 
							<input type='checkbox' checked={ useBEFile } name='useBEFile' onChange={this.useBEFileHandler}
								style={{ float: 'right' }}/><br/>
						</div>
						{ uploadLocalFile ? <div className="ui inverted divider"></div> : null }

						{
							uploadLocalFile
							? (
									<div className="ui inverted transparent input main-content-body">
										<Icon name="info circle" onClick={this.inputFileGuide} className='icon-div' />
										<input type="file" style={{ marginLeft: '1em'  }} onChange={this.selectFileHandler}/>
										<button className="ui right floated button inverted teal" onClick={this.uploadFileHandler}>Upload File</button>
									</div>
								)
							: null
						}
						
						{ inputFileInfo ? <div className='info-div-style'>{ FILE_UPLOAD_GUIDELINES }</div> : null	}
						<br/>
						<div>
							{uploadStatus === 'success' 
								? <div style={{ color: 'green' }}><Icon name='thumbs up' color='green' /> Upload successful.</div>
								: this.state.uploadStatus === 'failed'
								? <div style={{ color: 'red' }}><Icon name='thumbs down' color='red' /> Upload failed.</div>
								: null }
						</div>

						{
							!trainingPossible
							? <span style={{ color: 'tomato' }}>Select data source to activte regression options</span>
							: <span style={{ color: 'tomato' }}>Data Source selected</span>
						}
						<div className="ui inverted divider"></div>

						{
							fileContent
							?
								<>
									<div className='text-color'>
										Make sure your file contains only numeric values for linear regression.
									</div>
									<br/>
									<TableComponent tableData={ fileContent }/>
									<div className="ui inverted divider"></div>
								</>
						: null
						}
						<div className='main-content-body text-color'>
							<span>Percentage Training Data: { percenatgeTraining } </span>
							<input
								type="range"
								min='0'
								max='100'
								step='1'
								value={ percenatgeTraining }
								onChange={ this.getTrainingPercentage }
								disabled = { !trainingPossible } 
							/>
							<span style={{ marginLeft: '3em' }}>Shuffle while training: </span>
							<input
								type='checkbox'
								name='shouldShuffle'
								checked={shouldShuffle}
								disabled = { !trainingPossible }
								onChange={this.handleShuffle}
							/>
							<span style={{ marginLeft: '3em' }}>Normalize data: </span>
							<input
								type='checkbox'
								name='normalizeData'
								checked={normalizeData}
								disabled = { !trainingPossible }
								onChange={this.handleNormalize}
							/>
						</div>
						<div className="ui inverted divider"></div>

						<span className='text-color'>Choose the output label column</span> 
						<button onClick={ this.decOPColNo } disabled = { !trainingPossible }>-</button>
						<input
							type='text'
							name='selectCol'
							onChange={this.selectColHandler}
							style={{ width: '10%', margin: '1em', borderRadius: '5px', textAlign: 'center' }}
							disabled = { !trainingPossible }
							value={opColNo}
						/>
						<button onClick={ this.incOPColNo } disabled = { !trainingPossible }>+</button>
						<br/>

						<button
							className="ui left floated button inverted teal"
							onClick={this.handleTrain}
							disabled = { !trainingPossible }
						>
							Train Data
						</button>
						<br/>
						<br/>
						<br/>
						<div className="ui inverted divider"></div>
						{
						trainingStatus === 'success'
						? <>
								<div style={{ color: 'tomato' }}>Here are the training Resluts</div>
								<div className="ui inverted divider"></div>
								<div className='flex-row text-color'>
									<div style={{ width: '30%', border: '0.5px solid grey', padding: '0.5em', background: 'rgb(38, 38, 38)' }}>RMS Error</div>
									<div style={{ width: '30%', border: '0.5px solid grey', padding: '0.5em', background: 'rgb(38, 38, 38)' }}>{ trainingData.rmse }</div>
									
								</div>
								<div className='flex-row text-color'>
									<div style={{ width: '30%', border: '0.5px solid grey', padding: '0.5em', background: 'rgb(38, 38, 38)' }}>R2 Score</div>
									<div style={{ width: '30%', border: '0.5px solid grey', padding: '0.5em', background: 'rgb(38, 38, 38)' }}>{ trainingData.r2 }</div>
								</div>
								<div className='flex-row text-color'>
									<div style={{ width: '30%', border: '0.5px solid grey', padding: '0.5em', background: 'rgb(38, 38, 38)' }}>Min Percentage Error</div>
									<div style={{ width: '30%', border: '0.5px solid grey', padding: '0.5em', background: 'rgb(38, 38, 38)' }}>{ trainingData.minPerErr }</div>
								</div>
								<div className='flex-row text-color'>
									<div style={{ width: '30%', border: '0.5px solid grey', padding: '0.5em', background: 'rgb(38, 38, 38)' }}>Max Percentage Error</div>
									<div style={{ width: '30%', border: '0.5px solid grey', padding: '0.5em', background: 'rgb(38, 38, 38)' }}>{ trainingData.maxPerErr }</div>
								</div>
								<div className='flex-row text-color'>
									<div style={{ width: '30%', border: '0.5px solid grey', padding: '0.5em', background: 'rgb(38, 38, 38)' }}>Avg Percentage Error</div>
									<div style={{ width: '30%', border: '0.5px solid grey', padding: '0.5em', background: 'rgb(38, 38, 38)' }}>{ trainingData.avgPerErr }</div>
								</div>
								<div className="ui inverted divider"></div>
								<BarChart
									yPred={ trainingData.ypred }
									yTest={ trainingData.ytest }
									label1='Predicted Values'
									label2='Actual Values'
								/>
								<br/><br/>
								<BarChart
									yPred={ trainingData.perErr }
									label1='Percentage Error'
								/>
								<br/>
								<br/>
								<button 
									className="ui left floated button inverted teal"
									type="button"
									onClick={ this.downloadWeightHandler }
								>
									Download Weights
								</button>

							</>
						: null

					}

					</div>
					<div>
				</div>
				
				<div style={{ marginBottom: '7em' }}></div>

				</div>
			</div>
		)
	}

}