import React, { Component } from "react";
import LeftSideBar from '../../CommonComponents/LeftSideBar/LeftSideBar'
import { Icon, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import TableComponent from '../../CommonComponents/TableComponent/TableComponent';
import { IP_LAYER_GUIDELINE, ACTIVATION_FUNCTION_OPTIONS } from './constants';
import '../../styles/NeuralNetwork.css';

export default class NeuralNetworks extends Component {
	constructor({match}) {
		super();
		this.state = {
			path: match.path,
			selectedFile: null,
			uploadStatus: '',
			uploadLocalFile: false,
			useBEFile: false,
			fileContent: null,
			networkArray: [],
			noOfNodes: 'NA',
			activationFunction: 'NA',
			dropOutFraction: 0,
			doneAddingLayer: false
		}
	}
	

	uploadLocalFileHandler = () => {
		this.setState({
			uploadLocalFile: true,
			useBEFile: false,
			fileContent: null
		})
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

	addLayerHandler = (event, result) => {
		const { name, value } = result || event.target;
		this.setState({[name]: value})
	}

	networkArrayHandler = () => {
		const { networkArray, noOfNodes, activationFunction, dropOutFraction } = this.state;
		networkArray.push({ noOfNodes, activationFunction, dropOutFraction });
		this.setState(networkArray);
	}

	displayNetworkNodes = () => {
		const { networkArray } = this.state;
		return networkArray.map((neuron, index) => {
			return(
				<div key={index} className='nn-box'>
					{ index === 0
						? <span style={{ fontWeight: 'bolder', color: 'rgb(38,38,38)' }}>Input Layer</span>
						: index === networkArray.length-1
						? <span style={{ fontWeight: 'bolder', color: 'rgb(38,38,38)' }}>Output Layer</span>
						: <span style={{ fontWeight: 'bolder', color: 'rgb(38,38,38)' }}>Hidden Layer No: { index } </span>
					}
					<br/>
					No of {index === 0 ? 'inputs' : 'Neurons'} : { neuron.noOfNodes }
					<br/>
					Activation Function: { neuron.activationFunction }<br/>
					Drop out fraction: { neuron.dropOutFraction }
				</div>
			)
		});
	}

	createNNHandler = (event) => {
		const { networkArray } = this.state;
    axios.post("http://127.0.0.1:5000/build_nn/", null,{ params: {
      networkArray
    }}).then(res => {
			console.log(res.data);
      this.setState({ oneAddingLayer: true });
    })
    .catch(err => console.warn(err));
    event.preventDefault();
	}

	render() {
		const {
			path,
			uploadStatus,
			uploadLocalFile,
			useBEFile,
			fileContent,
			networkArray,
			noOfNodes,
			doneAddingLayer
		}  = this.state;
		
		return(
			<div className='app-body'>
				<LeftSideBar path={ path }/>
				<div className='dark-background main-content-size'>
				<div className='main-content-header'>Neural Network</div>
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
						
						<br/>
						<div>
							{uploadStatus === 'success' 
								? <div style={{ color: 'green' }}><Icon name='thumbs up' color='green' /> Upload successful.</div>
								: this.state.uploadStatus === 'failed'
								? <div style={{ color: 'red' }}><Icon name='thumbs down' color='red' /> Upload failed.</div>
								: null }
						</div>
						<span style={{ color: 'tomato' }}>Select data source to start building a Neural Network</span>
						<div className="ui inverted divider"></div>
						{
							fileContent
							?
								<>
									<div className='text-color'>
										The first Ten lines of your file looks like as follows.
									</div>
									<br/>
									<TableComponent tableData={ fileContent }/>
									<div className="ui inverted divider"></div>
								</>
						: null
						}
						
					</div>
					<div style={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: 'center' }}>
						<div style={{ width: '50%' }}>
							<div style={{ color: 'tomato', fontSize: '20px', textAlign: 'center' }}>Build a Neural Network</div><br/>
							<div className='nn-box'>{IP_LAYER_GUIDELINE}</div>
							<div className="ui inverted divider"></div>
							{ networkArray.length === 0
								?	
								<div className='nn-box'>
									Add Input Layer to your Neural Network<br/><br/>
									<div className="ui input fluid">
										<input
											name='noOfNodes'
											onChange={this.addLayerHandler}
											type="text"
											value={(/^[0-9]*$/.test(noOfNodes) ? noOfNodes : '')}
											placeholder="No of features in the input data"
										/>
									</div>
								</div>
								:
								<>
									{ this.displayNetworkNodes() }
									<button
										disabled={ networkArray.length <= 1 }
										className="ui fluid button teal"
										onClick={this.createNNHandler}
									>
										Create this Neural Network
									</button>
									<div className="ui inverted divider"></div>
									<br/>
									{ doneAddingLayer
										? null
										:
										<div className='nn-box'>
											Add One more Layer to your Neural Network
											<br/><br/>
											<div className="ui input fluid">
												<input
													name='noOfNodes'
													onChange={this.addLayerHandler}
													type="text"
													placeholder="No of neurons in the layer"
													value={(/^[0-9]*$/.test(noOfNodes) ? noOfNodes : '')}
												/>
											</div>
											<br/>
											<Dropdown
												placeholder='Activation Function'
												fluid
												options={ACTIVATION_FUNCTION_OPTIONS}
												selection
												onChange={this.addLayerHandler}
												name='activationFunction'
											/>
											<br/>
											<div className="ui input fluid">
												<input
													name='dropOutFraction'
													disabled={true}
													onChange={this.addLayerHandler}
													type="text"
													placeholder="Drop out fraction (Coming soon)"
												/>
											</div>
										</div>
									}
								</>
							}
							{ doneAddingLayer
								? null
								:
								<button
								disabled={ fileContent===null }
								className="ui fluid button blue"
								onClick={this.networkArrayHandler}
								>
									Add Layer
								</button>
							}
							
							<br/>
							
						</div>
					</div>
					<br/><br/><br/><br/><br/><br/>
					
				</div>
			</div>
		)
	}

}