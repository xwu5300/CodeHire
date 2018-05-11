import React, { Component } from 'react';

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: {
        title: this.props.challengeInfo.title,
        instruction: this.props.challengeInfo.instruction,
        function_name: this.props.challengeInfo.function_name,
        parameters: this.props.challengeInfo.parameters,
        testInput: JSON.parse(this.props.challengeInfo.test_cases)[0],
        testOutput: JSON.parse(this.props.challengeInfo.test_cases)[1],
        exampleInput: '',
        exampleOutput: '',
        difficulty: this.props.challengeInfo.difficulty
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.validateForm();
  }

  validateForm() {
    $('.ui.form')
      .form({
        on: 'blur',
        fields: {
          title: 'empty',
          instruction: 'empty',
          function_name: 'empty',
          parameters: 'empty',
          testInput: 'empty',
          testOutput: 'empty',
          exampleInput: 'empty',
          exampleOutput: 'empty',
          difficulty: 'empty'
        }
      })
  }

  handleChange(event) {
    this.state.challenge[event.target.name] = event.target.value;
    this.setState({challenge: this.state.challenge});
  }

  handleSave(event) {
    event.preventDefault();
    if ($('.ui.form').form('is valid')) {
      this.save();
    }
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
      }, () => {
        this.props.close();
      })
    })
  }

  render() {
    return (
      <div className="form-container">
        <form className="ui form" onSubmit={(event) => this.handleSave(event)}>
          <div className="field">
            <label>Title</label>
            <input name="title" type="text" value={this.state.challenge.title} onChange={this.handleChange}/>
          </div>
          <div className="field">
            <label>Instructions</label>
            <textarea rows="3" name="instruction" type="text" value={this.state.challenge.instruction} onChange={this.handleChange}/>
          </div>
          <div className="field">
            <label>Function Name</label>
            <input name="function_name" type="text" value={this.state.challenge.function_name} onChange={this.handleChange}/>
          </div>
          <div className="field">
            <label>Initial Parameters</label>
            <input name="parameters" type="text" value={this.state.challenge.parameters} onChange={this.handleChange}/>
          </div>
          <div className="two fields">
            <div className="field">
              <label>Test Case - Input</label>
              <input name="testInput" type="text" value={this.state.challenge.testInput} onChange={this.handleChange}/>
            </div>
            <div className="field">
              <label>Test Case - Output</label>
              <input name="testOutput" type="text" value={this.state.challenge.testOutput} onChange={this.handleChange}/>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label>Example - Input</label>
              <input name="exampleInput" type="text" value={this.state.challenge.exampleInput} onChange={this.handleChange}/>
            </div>
            <div className="field">
              <label>Example - Output</label>
              <input name="exampleOutput" type="text" value={this.state.challenge.exampleOutput} onChange={this.handleChange}/>
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
          <div className="ui error message"></div>
          <div className="actions">
          <div className="two fluid ui buttons">
            <button className="ui cancel red basic button" onClick={() => {this.props.close()}}>
              <i className="remove icon"></i> Cancel
            </button>
            <button className="ui ok green basic submit button" type="submit"><i className="checkmark icon"></i>Update</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

}



export default UpdateForm;