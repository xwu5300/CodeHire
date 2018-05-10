import React, { Component } from 'react';


class ScheduleChallengeView extends Component {
  constructor(props){
    super(props);
  }


componentDidMount() {
  console.log(this.props);
}

  render() {
    return (
      <div>
      {this.props.challenges.length === 0 ? 'No saved challenges to choose from' : this.props.challenges.map((item) => {
        return (
          <div key={item.id}>
            <div className="title">{item.title}</div>
            <button className="ui button select">Select</button>
          </div>
        )
      })}
      </div>
    )
  }
}



export default ScheduleChallengeView;




// {!this.state.showForm[i] ? null : 
//   <div className="calendar-container">
//   {!this.props.isInitial ? 
//       <div className="ui calendar" id="calendar" onClick={this.showCalendar}>
//         <div className="ui input left icon">
//           <i className="calendar icon"></i>
//           <input name="date" type="text" placeholder="Date/Time" id="date"/>
//         </div>
//       </div> : null}
//     <div className="field dropdown">
//     <label>Duration (minutes)</label>
//       <select className="ui dropdown" name="duration" value={this.state.duration} onChange={this.handleDurationChange}>
//         <option value="">Select</option>
//         <option value="15">15</option>
//         <option value="30">30</option>
//         <option value="60">60</option>
//         <option value="90">90</option>
//       </select>
//     </div> 
//          <button className="ui button" onClick={() => {this.handleClick(challenge, i)}}>Save</button>
//   </div>
// }