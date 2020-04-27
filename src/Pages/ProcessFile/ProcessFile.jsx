import React, { Component } from "react";
import axios from 'axios';
import { Icon, Form, Button } from 'semantic-ui-react';
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
		console.log("event: ", event);
	}

	render() {
		const { path, inputFileInfo, uploadStatus, fileContent }  = this.state;
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
						<div className="ui inverted divider"></div>
						{
							fileContent
							?
								<div style={{ width: '50%' }}>
									<div style={{  color: 'tomato', fontSize: '20px' }}>Edit your file</div>
									<br/>
									<Form inverted style={{ color: 'grey' }} onSubmit={this.editOptionHandler}>
										<Form.Input fluid label='Delete Rows' placeholder='1,2,4' />
										<Form.Input fluid label='Delete Columns' placeholder='1,2,4' />
										<Form.Input fluid label='Normalise Columns' placeholder='1,2,4' />
										<Form.Checkbox label='Normalise all Columns' />
										<Button type='submit'>Submit</Button>
									</Form>
									<br/>
									<br/>
								</div>
							: null
						}
					</div>

				</div>
			</div>
		)
	}

}