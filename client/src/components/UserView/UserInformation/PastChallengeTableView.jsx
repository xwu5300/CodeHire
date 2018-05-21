import React, { Component } from 'react';
import ReactCollapsingTable from 'react-collapsing-table';

class PastChallengeTableView extends Component {
  constructor() {
    super()
  }

  render() {
    console.log('passchallenge view props', this.props)
    return (
      <ReactCollapsingTable 
      columns={this.props.columns} 
      rows={this.props.rows} 
      rowSize={5} 
      // showSearch={ true }
      showPagination={ true }
    />
    )
  }
}

export default PastChallengeTableView;