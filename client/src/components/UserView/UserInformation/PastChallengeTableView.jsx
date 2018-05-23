import React, { Component } from 'react';
import ReactCollapsingTable from 'react-collapsing-table';

class PastChallengeTableView extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <ReactCollapsingTable 
      columns={this.props.columns} 
      rows={this.props.rows} 
      rowSize={3} 
      // showSearch={ true }
      showPagination={ true }
    />
    )
  }
}

export default PastChallengeTableView;