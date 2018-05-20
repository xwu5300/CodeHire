import React, { Component } from 'react';
import ReactFilestack from 'filestack-react';


const basicOptions = {
  fromSources: ['local_file_system'],
  maxFiles: 1,
};


class Dropbox extends Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      fileName: ''
    }

    this.success = this.success.bind(this);
  }

  success(result) {
    this.setState({
      fileName: result.filesUploaded[0].filename
    })
    this.props.saveResume(result.filesUploaded[0].url, result.filesUploaded[0].filename, localStorage.getItem('userId'));
  }


  render() {
  return (
    <ReactFilestack
      apikey={'A0lqArjXlRiOwVn8p9lRHz'}
      onSuccess={ this.success }
      onError={'onError'}
      render={({ onPick }) => (
        <div className='user_resume_container'>
          <div className='resume_div'>{ this.state.fileName }</div>
          <button onClick={onPick} className='ui orange button'>Choose File</button>
        </div>
      )}
    />
  );
}
}

export default Dropbox;