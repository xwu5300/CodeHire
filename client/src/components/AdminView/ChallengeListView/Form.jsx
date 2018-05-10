import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: {
        title: '',
        instruction: '',
        function_name: '',
        parameters: '',
        testInput: '',
        testOutput: '',
        exampleInput: '',
        exampleOutput: '',
        difficulty: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    // this.validateForm = this.validateForm.bind(this);
  }

  // componentDidMount() {
  //   this.validateForm();
  // }

  validateForm() {
    $('.ui.form')
      .form({
        on: 'blur',
        fields: {
          empty: {
            identifier: 'empty',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter a value'
              }
            ]
          },
          dropdown: {
            identifier: 'difficulty',
            rules: [
              {
                type: 'empty',
                prompty: 'Please select a dropdown value'
              }
            ]
          }
        }
      })
    ;
  }

  handleChange(event) {
    this.state.challenge[event.target.name] = event.target.value;
    this.setState({challenge: this.state.challenge});
  }

  save() {
    this.props.save(this.state.challenge, () => {
      this.setState({
        challenge: {
          title: '',
          instruction: '',
          function_name: '',
          parameters: '',
          testInput: '',
          testOutput: '',
          exampleInput: '',
          exampleOutput: '',
          difficulty: ''
        }
      })
    })
  }

  render() {
    return (
      <div className="form-container">
        <form className="ui form">
          <div className="field">
            <label>Title</label>
            <input id="empty" name="title" type="text" placeholder="Two Sum" value={this.state.challenge.title} onChange={this.handleChange}/>
          </div>
          <div className="field">
            <label>Instructions</label>
            <textarea rows="3" id="empty" name="instruction" type="text" value={this.state.challenge.instruction} placeholder="Find the indicies of two items in an array that equal the target value" onChange={this.handleChange}/>
          </div>
          <div className="field">
            <label>Function Name</label>
            <input id="empty" name="function_name" type="text" placeholder="twoSum" value={this.state.challenge.function_name} onChange={this.handleChange}/>
          </div>
          <div className="field">
            <label>Initial Parameters</label>
            <input id="empty" name="parameters" type="text" placeholder="array, target" value={this.state.challenge.parameters} onChange={this.handleChange}/>
          </div>
          <div className="two fields">
            <div className="field">
              <label>Test Case - Input</label>
              <input id="empty" name="testInput" type="text" placeholder="[1, 3, 6, 0, -2], 9" value={this.state.challenge.testInput} onChange={this.handleChange}/>
            </div>
            <div className="field">
              <label>Test Case - Output</label>
              <input id="empty" name="testOutput" type="text" placeholder="[1, 2]" value={this.state.challenge.testOutput} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label>Example - Input</label>
              <input id="empty" name="exampleInput" type="text" placeholder="[1, 4, -2, 6, 9], 15" value={this.state.challenge.exampleInput} onChange={this.handleChange}/>
            </div>
            <div className="field">
              <label>Example - Output</label>
              <input id="empty" name="exampleOutput" type="text" placeholder="[3, 4]" value={this.state.challenge.exampleOutput} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="field">
            <label>Difficulty</label>
            <select className="ui dropdown" name="difficulty" value={this.state.challenge.difficulty} onChange={this.handleChange}>
              <option value="">Select</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="ui button" type="submit" onClick={() => {this.save()}}>Submit</div>
          <div className="ui error message"></div>
        </form>
      </div>
    )
  }

}



export default Form;