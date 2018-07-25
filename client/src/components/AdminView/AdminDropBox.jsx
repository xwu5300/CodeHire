import React, { Component } from 'react';
import ReactFilestack from 'filestack-react';

const basicOptions = {
  fromSources: ['local_file_system'],
  maxFiles: 1,
};

class AdminDropbox extends Component {
  constructor(props) {
    super(props);

    this.success = this.success.bind(this);
  }

  success(result) {
    this.props.submit(result.filesUploaded[0].url);
  }

  render() {
  return (
    <ReactFilestack
      apikey={'A0lqArjXlRiOwVn8p9lRHz'}
      onSuccess={ this.success }
      onError={() => {}}
      render={({ onPick }) => (
        <div>
          <button onClick={onPick} className="ui orange inverted button" style={{ display: 'block', margin: 'auto' }}>Upload Company Logo</button>
        </div>
      )}
    />
  );
}
}

export default AdminDropbox;