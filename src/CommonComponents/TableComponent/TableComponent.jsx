import React, { Component } from "react";
import { Table } from 'semantic-ui-react';

export default class ProcessFile extends Component {

	render() {
		const { tableData } = this.props;
		return(
			<div style={{ width: '100%', height: '70%', overflow: 'scroll' }}>
			<Table celled selectable inverted>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell></Table.HeaderCell>
						{
							[...Array(tableData[0].length).keys()].map((element, index) => {
								return <Table.HeaderCell key={index}>Column {element + 1}</Table.HeaderCell>
							})
						}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{
						tableData.map((row, index) => {
							return <Table.Row key={index}>
								<Table.Cell>Row {index + 1}</Table.Cell>
								{
									row.map((col, colInd) => {
										return <Table.Cell key={colInd}>{col}</Table.Cell>
									})
								}
							</Table.Row>
						})
					}
				</Table.Body>
			</Table>
			</div>
		)
	}
}

