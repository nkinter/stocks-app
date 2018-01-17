import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class TableComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      tableRows: [],
      fixedHeader: true,
      stripedRows: true,
      showRowHover: true,
      //fixedFooter: true,
      //selectable: true,
      //multiSelectable: false,
      //enableSelectAll: false,
      //deselectOnClickaway: true,
      showCheckboxes: false,
      height: '600px'
    };
  }

  componentDidMount() {
    this.callApi();
  }

  callApi() {
    fetch(
      'https://6rojikg4b0.execute-api.us-east-1.amazonaws.com/dev/getvaluetable?dollars=15000&size=20'
    )
      .then(results => {
        return results.json();
      })
      .then(data => this.setState({ data }));
  }

  render() {
    const stocks = this.state.data.map(row => {
      return (
        <TableRow key={row.rank}>
          <TableRowColumn>{row.rank}</TableRowColumn>
          <TableRowColumn>{row.symbol}</TableRowColumn>
          <TableRowColumn>{row.earnings_yield}</TableRowColumn>
          <TableRowColumn>{row.roic}</TableRowColumn>
          <TableRowColumn>{row.value_calc}</TableRowColumn>
          <TableRowColumn>{row.value_weight}</TableRowColumn>
          <TableRowColumn>{row.sale_price}</TableRowColumn>
          <TableRowColumn>{row.shares_to_buy}</TableRowColumn>
          <TableRowColumn>{row.total_cost}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={this.state.selectable}
        multiSelectable={this.state.multiSelectable}
      >
        <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          enableSelectAll={this.state.enableSelectAll}
        >
          <TableRow>
            <TableHeaderColumn tooltip="Rank">Rank</TableHeaderColumn>
            <TableHeaderColumn tooltip="Ticker Symbol">
              Symbol
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Earning Yield">
              Earnings Yield
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Return on Invested Capital">
              ROIC
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Computed Value">
              Value
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Weighted Value">
              Value Weight
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Closing Stock Price Value">
              Sale Price
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Number of shares to purchase">
              Number of Shares
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Total Cost of Shares">
              Total Cost
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}
        >
          {stocks}
        </TableBody>
      </Table>
    );
  }
}

export default TableComponent;
