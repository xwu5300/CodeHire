import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    }
  }

  render() {
    return (
      <div className="form-container">
        <form class="ui form">
          <div class="field">
            <label>Title:</label>
            <input name="title" type="text" placeholder="Two Sum"/>
          </div>
          <div class="field">
            <label>Instructions:</label>
            <textarea rows="3" name="instructions" type="text" placeholder="Find the indicies of two items in an array that equal the target"/>
          </div>
          <div class="field">
            <label>Function Name</label>
            <input name="function-name" type="text" placeholder="twoSum"/>
          </div>
          <div class="field">
            <label>Initial Parameters</label>
            <input name="params" type="text" placeholder="array, target"/>
          </div>
          <div class="two fields">
            <div class="field">
              <label>Test Case - Input</label>
              <input name="test-input" type="text" placeholder="[1, 3, 6, 0, -2], 9"/>
          ` </div>
            <div class="field">
              <label>Test Case - Output</label>
              <input name="test-output" type="text" placeholder="[1, 2]"/>
      `     </div>
          </div>
          <div class="two fields">
            <div class="field">
              <label>Example - Input</label>
              <input name="example-input" type="text" placeholder="[1, 4, -2, 6, 9], 15"/>
          ` </div>
            <div class="field">
              <label>Example - Output</label>
              <input name="example-output" type="text" placeholder="[3, 4]"/>
      `     </div>
          </div>
          <div class="field">
            <label>Difficulty</label>
            <select class="ui dropdown" name="dropdown">
              <option value="">Select</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </form>
      </div>
    )
  }

}



export default Form;