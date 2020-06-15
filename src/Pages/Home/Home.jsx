import React, { Component } from "react";
import LeftSideBar from '../../CommonComponents/LeftSideBar/LeftSideBar'

export default class Home extends Component {
	constructor({match}) {
			super();
			this.state = {
				path: match.path,
			}
		}

	render() {
		const { path}  = this.state;
		return(
			<div className='app-body'>
				<LeftSideBar path={ path }/>
				<div className='dark-background main-content-size'>
					<div style={{
						fontSize: '18px',
						margin: '10px',
						padding: '10px',
						color: 'coral',
						border: '1px solid grey',
						textAlign: 'justify'
					}}>
						<p>Excelsior is a powerful one of a kind web application which allows the user to apply 
							concepts of machine learning without a single line of coding. User can apply various machine 
							learning algorithms on their own data using a well designed GUI. <br/><br/>
							Processing files and dimentionality reduction was never this easy before. With a few clicks
							user can do the same. The processed file is stored in the back end automatically.
							It can definitely be downloaded. But if the same file has to be used again, there is 
							no need to re-upload<br/> <br/>
							Cassical machine learning algorithms such as Linear Regression, Logistic Regression and 
							Decision Trees can be implemented with just a few clicks. The confusion matrix
							and other results and graphs are plotted automatically.<br/><br/>
							The most important feature is the Neural Networks. Even deep nets can be trained using 
							excelsior. There are no application which let you add layers in neural net with click of buttons.
							Excelsior provides the best way to build neural nets and test your data.
						</p>
					</div>
				</div>
			</div>
		)
	}

}