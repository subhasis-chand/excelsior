import React, { Component } from "react";
import {Bar} from 'react-chartjs-2';

export default class BarChart extends Component {
	render() {
		const { yPred, yTest, label1, label2 } = this.props;
		const data = {
			labels: [...Array(yPred.length).keys()],
			datasets: [
						{
							label: label1,
							backgroundColor: 'lightgray',
							hoverBackgroundColor: 'blue',
							data: yPred
						},
						{
							label: label2,
							backgroundColor: 'gray',
							hoverBackgroundColor: 'red',
							data: yTest
						}
			]
		};
		
		return(
			<Bar
				data={data}
			/>
		)
	}
}