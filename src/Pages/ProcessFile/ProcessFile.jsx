import React, { Component } from "react";
import axios from 'axios';
import { Icon, Table, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import LeftSideBar from '../../CommonComponents/LeftSideBar/LeftSideBar';
import { FILE_UPLOAD_GUIDELINES } from './constants';

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

	render() {
		const { path, inputFileInfo, uploadStatus, fileContent }  = this.state;
		console.log("file content: ", fileContent);
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
							<div style={{ width: '100%', height: '70%', overflow: 'scroll' }}>
							<Table celled selectable inverted>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell two wide column></Table.HeaderCell>
										{
											[...Array(fileContent[0].split(',').length).keys()].map((element, index) => {
												return <Table.HeaderCell key={index}>Column {element + 1}</Table.HeaderCell>
											})
										}
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{
										fileContent.map((row, index) => {
											return <Table.Row key={index}>
												<Table.Cell>Row {index + 1}</Table.Cell>
												{
													row.split(',').map((col, colInd) => {
														return <Table.Cell key={colInd}>{col}</Table.Cell>
													})
												}
											</Table.Row>
										})
									}
								</Table.Body>
							</Table>
							</div>
							: null
						}
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
						<div>asfdg</div>
    

					

					</div>

				</div>
			</div>
		)
	}

}