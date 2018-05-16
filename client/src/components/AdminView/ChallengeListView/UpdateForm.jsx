import React, { Component } from 'react';
import Promise from 'bluebird';


class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenge: {
        title: this.props.challengeInfo.title,
        category: this.props.challengeInfo.category,
        instruction: this.props.challengeInfo.instruction,
        function_name: this.props.challengeInfo.function_name,
        parameters: this.props.challengeInfo.parameters,
        testInput: JSON.stringify(JSON.parse(this.props.challengeInfo.test_cases)[0][0]),
        testOutput: JSON.stringify(JSON.parse(this.props.challengeInfo.test_cases)[1][0]),
        exampleInput: JSON.stringify(JSON.parse(this.props.challengeInfo.examples)[0][0]),
        exampleOutput: JSON.stringify(JSON.parse(this.props.challengeInfo.examples)[1][0]),
        difficulty: this.props.challengeInfo.difficulty
      },
      invalid: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.checkIfValid = this.checkIfValid.bind(this);
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
          category: '',
          instruction: 'empty',
          function_name: 'empty',
          parameters: 'empty',
          testInput: 'empty',
          testOutput: 'empty',
          exampleInput: 'empty',
          exampleOutput: 'empty',
          difficulty: 'empty'
        },
        inline: true
      })
  }

  handleChange(event) {
    this.state.challenge[event.target.name] = event.target.value;
    this.setState({challenge: this.state.challenge});
  }

  handleSave() {
    if ($('.ui.form').form('is valid')) {
      this.save();
    }
  }

  checkIfValid(event) {
    event.preventDefault();
    return Promise
    .try(() => {
      JSON.parse(this.state.challenge.testInput);
      JSON.parse(this.state.challenge.testOutput);
      JSON.parse(this.state.challenge.exampleInput);
      JSON.parse(this.state.challenge.exampleOutput);
    })
    .then(() => {
      this.setState({
        invalid: false
      }, () => {
        this.handleSave();
      })
    })
    .catch((err) =>{
      if (err) {
        console.log('there was an error', err)
        this.setState({
          invalid: true
        })
        return false;
      }
    })
  }

  save() {
    this.props.save(this.state.challenge, this.props.userId, () => {
      this.setState({
        challenge: {
          title: '',
          category: '',
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
        <form className="ui form" onSubmit={(event) => this.checkIfValid(event)}>
          <div className="field">
            <label>Title</label>
            <input name="title" type="text" value={this.state.challenge.title} onChange={this.handleChange}/>
          </div>
          <div className="field">
          <label>Category</label>
            <select className="ui dropdown" name="category" value={this.state.challenge.category} onChange={this.handleChange}>
              <option value="">Select</option>
              <option value="algos">Algorithms</option>
              <option value="dataStructures">Data Structures</option>
              <option value="sysDesign">System Design</option>
            </select>
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
          <div>The below test cases and examples must be inputted in the following format:</div>
          <ul>
            <li>Each parameter must be separated by a comma</li>
            <li>If more than one parameter is included, enclose all of the parameters in an array</li>
            <li>When including objects, wrap the keys and values in double quotes</li>
            <li>{'Example: [[1, 2, 3], {"a":"1"}]'}</li>
          </ul>
          <br/>
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
              <option value="1">1 - Least Difficult</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 - Most Difficult</option>
            </select>
          </div>
          <div className="ui error message"></div>
          {this.state.invalid ? <div style={{color: 'red', fontWeight: 'strong'}}>Either your tests or examples are not in the correct format. Please update and re-sbumit.</div> : null}
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