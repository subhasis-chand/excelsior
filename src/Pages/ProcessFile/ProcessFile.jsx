import React, { Component } from "react";
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import LeftSideBar from '../../CommonComponents/LeftSideBar/LeftSideBar';
import { FILE_UPLOAD_GUIDELINES } from './constants';
import TableComponent from '../../CommonComponents/TableComponent/TableComponent'

export default class ProcessFile extends Component {
	constructor({match}) {
			super();
			this.state = {
				path: match.path,
				selectedFile: null,
				inputFileInfo: false,
				uploadStatus: '',
				fileContent:  null,
				deleteRows: '',
				deleteCols: '',
				removeNaN: true,
				removeHeader: true,
				isEditOptionValid: true,
				saveInBE: true
			}
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
		if (selectedFile && selectedFile.name.slice(-4) === '.csv') {
			let data = new FormData()
			data.append('file', selectedFile);
			axios.post("http://127.0.0.1:5000/upload_input_file/".concat(this.state.selectedFile.name), data, {}).then(
				res => {
					this.setState({
						uploadStatus: res.status === 200 ? 'success' : 'failed',
						fileContent: res.data.content
					})
				}
			)	
		} else if (selectedFile.name.slice(-4) !== '.csv'){
			this.setState({ uploadStatus: 'notcsv' })
		} else {
			this.setState({ uploadStatus: 'failed' })
		}
	}

	editOptionHandler = (event) => {
		let name = event.target.name;
    let value = event.target.value;
		if (name === 'removeNaN') {
			this.setState({
				removeNaN: !this.state.removeNaN,
			})
		} else if(name === 'removeHeader') {
			this.setState({
				removeHeader: !this.state.removeHeader,
			})
		} else if (name === 'saveInBE') {
			this.setState({ saveInBE: !this.state.saveInBE })
		} else { this.setState({[name]: value}) }
	}

	editFileHandler = (event) => {
		const { deleteRows, deleteCols, removeNaN, removeHeader, saveInBE } = this.state;
		const isEditOptionValid = (/^[0-9, ]*$/.test(deleteCols)) && (/^[0-9, ]*$/.test(deleteRows));

		isEditOptionValid ?
    (
			axios.post("http://127.0.0.1:5000/edit_file/", null,{ params: {
				deleteCols,
				deleteRows,
				removeHeader,
				removeNaN,
				saveInBE
			}}).then(res => {
				this.setState({
					isEditOptionValid,
					fileContent: res.data.content
				})
			})
			.catch(err => console.warn(err))
		)
		: this.setState({isEditOptionValid})
    event.preventDefault();
	}

	render() {
		const { path, inputFileInfo, uploadStatus, fileContent, removeHeader, removeNaN, isEditOptionValid, saveInBE }  = this.state;
		return(
			<div className='app-body'>
				<LeftSideBar path={ path }/>
				<div className='dark-background main-content-size'>
					<div className='main-content-header'>File Processing</div>

					<div className="ui inverted segment" style={{ margin: '0px', height: '100%' }}>

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
								: this.state.uploadStatus === 'notcsv'
								? <div style={{ color: 'red' }}><Icon name='ban' color='red' /> Please select a csv file</div>
								: null }
						</div>

						<div className="ui inverted divider"></div>
						
						{
							fileContent
							? <div style={{ color: 'grey' }}> The first Ten lines of your file looks like as follows. <br/></div>
							: <div style={{ color: 'grey' }}>Upload a file to get the preview</div>
						}
						<br/>
						{
							fileContent
							?
								<TableComponent tableData={ fileContent }/>
							: null
						}
						{
							fileContent
							?
							<div style={{display: 'flex', flexDirection: 'column'}}>
								<div className="ui inverted divider"></div>
								<a href="http://127.0.0.1:5000/download/inputFile.csv" download='inputFile.csv'>Download this file</a> 
								<div className="ui inverted divider"></div>
								<div style={{  color: 'tomato', fontSize: '20px' }}>Edit your file</div>
								<br/>
								<div style={{ width: '30%' }}>
									Remove Header
									<input type='checkbox' checked={ removeHeader } name='removeHeader' onChange={this.editOptionHandler}
										style={{ float: 'right' }}/><br/>
									Remove Rows with NaN values
									<input type='checkbox' checked={ removeNaN } name='removeNaN' onChange={this.editOptionHandler}
										style={{ float: 'right' }}/><br/>
									Save the edited file in BE
									<input type='checkbox' checked={ saveInBE } name='saveInBE' onChange={this.editOptionHandler}
										style={{ float: 'right' }}/><br/>
									
									<br/>
									Delete Rows <br/>
									<input type='text' name='deleteRows' onChange={this.editOptionHandler} style={{ width: '100%' }}/><br/><br/>
									Delete Columns <br/>
									<input type='text' name='deleteCols' onChange={this.editOptionHandler} style={{ width: '100%' }}/><br/><br/>
									<button className="ui left floated button inverted teal" onClick={this.editFileHandler}>Edit File</button>
								</div>
								{
									isEditOptionValid
									? <br/>
									: <div style={{color:'red'}}>
											Please enter row or col no separated by comma. Any other charcter is not allowed
									  </div>
								}
								<br/><br/><br/><br/><br/><br/><br/>
							</div>		
							: null
						}
						
									
					</div>

				</div>
			</div>
		)
	}

}