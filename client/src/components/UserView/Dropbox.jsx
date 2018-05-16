import React, { Component } from 'react';
import ReactFilestack from 'filestack-react';


const basicOptions = {
  fromSources: ['local_file_system'],
  maxFiles: 1,
};


class Dropbox extends Component {
  
  constructor(props) {
    super(props);

    this.state={ file_name: '' }

    this.success = this.success.bind(this);
  }

  success(result) {
    this.setState({
      file_name: result.filesUploaded[0].filename
    })
  }


  render() {
  return (
    <ReactFilestack
      apikey={'A0lqArjXlRiOwVn8p9lRHz'}
      onSuccess={ this.success }
      onError={'onError'}
      options={ basicOptions }
      render={({ onPick }) => (
        <div className='user_resume_container'>
          <div className='resume_div'>{ this.state.file_name }</div>
          <button onClick={onPick} className='ui orange button'>Choose File</button>
        </div>
      )}
    />
  );
}
}

export default Dropbox;