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
        testCases: this.props.challengeInfo.test_cases,
        exampleCases: this.props.challengeInfo.examples,
        difficulty: this.props.challengeInfo.difficulty
      },
      invalid: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.checkIfValid = this.checkIfValid.bind(this);
    this.handleTestInputChange = this.handleTestInputChange.bind(this);
    this.handleTestOutputChange = this.handleTestOutputChange.bind(this);
    this.handleExampleInputChange = this.handleExampleInputChange.bind(this);
    this.handleExampleOutputChange = this.handleExampleOutputChange.bind(this);
    this.handleAddTest = this.handleAddTest.bind(this);
    this.handleAddExample = this.handleAddExample.bind(this);
    this.handleRemoveTest = this.handleRemoveTest.bind(this);
    this.handleRemoveExample = this.handleRemoveExample.bind(this);
  }

  componentDidMount() {
    this.validateForm();
    console.log(this.state)
  }

  validateForm() {
    $('.ui.form')
      .form({
        on: 'blur',
        fields: {
          title: 'empty',
          category: 'empty',
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

  handleTestInputChange(idx, event) {
    let newTestInput = this.state.challenge.testCases.map((item, i) => {
      if (i !== idx) return item;
      return {...item, input: event.target.value};
    })
    this.setState({
      challenge: {
        title: this.state.challenge.title,
        category: this.state.challenge.category,
        instruction: this.state.challenge.instruction,
        function_name: this.state.challenge.function_name,
        parameters: this.state.challenge.parameters,
        testCases: newTestInput,
        exampleCases: this.state.challenge.exampleCases,
        difficulty: this.state.challenge.difficulty
      }
    })
  }

  handleAddTest() {
    this.setState({
      challenge: {
        title: this.state.challenge.title,
        category: this.state.challenge.category,
        instruction: this.state.challenge.instruction,
        function_name: this.state.challenge.function_name,
        parameters: this.state.challenge.parameters,
        testCases: this.state.challenge.testCases.concat([{input: "", output: ""}]),
        exampleCases: this.state.challenge.exampleCases,
        difficulty: this.state.challenge.difficulty
      }
    })
  }

  handleTestOutputChange(idx, event) {
    let newTestOutput = this.state.challenge.testCases.map((item, i) => {
      if (i !== idx) return item;
      return {...item, output: event.target.value};
    })
    this.setState({
      challenge: {
        title: this.state.challenge.title,
        category: this.state.challenge.category,
        instruction: this.state.challenge.instruction,
        function_name: this.state.challenge.function_name,
        parameters: this.state.challenge.parameters,
        testCases: newTestOutput,
        exampleCases: this.state.challenge.exampleCases,
        difficulty: this.state.challenge.difficulty
      }
    })
  }

  handleExampleInputChange(idx, event) {
    let newExampleInput = this.state.challenge.exampleCases.map((item, i) => {
      if (i !== idx) return item;
      return {...item, input: event.target.value};
    })
    this.setState({
      challenge: {
        title: this.state.challenge.title,
        category: this.state.challenge.category,
        instruction: this.state.challenge.instruction,
        function_name: this.state.challenge.function_name,
        parameters: this.state.challenge.parameters,
        testCases: this.state.challenge.testCases,
        exampleCases: newExampleInput,
        difficulty: this.state.challenge.difficulty
      }
    })
  }


  handleExampleOutputChange(idx, event) {
    let newExampleOutput = this.state.challenge.exampleCases.map((item, i) => {
      if (i !== idx) return item;
      return {...item, output: event.target.value};
    })
    this.setState({
      challenge: {
        title: this.state.challenge.title,
        category: this.state.challenge.category,
        instruction: this.state.challenge.instruction,
        function_name: this.state.challenge.function_name,
        parameters: this.state.challenge.parameters,
        testCases: this.state.challenge.testCases,
        exampleCases: newExampleOutput,
        difficulty: this.state.challenge.difficulty
      }
    })
  }

  handleAddExample() {
    this.setState({
      challenge: {
        title: this.state.challenge.title,
        category: this.state.challenge.category,
        instruction: this.state.challenge.instruction,
        function_name: this.state.challenge.function_name,
        parameters: this.state.challenge.parameters,
        testCases: this.state.challenge.testCases,
        exampleCases: this.state.challenge.exampleCases.concat([{input: "", output: ""}]),
        difficulty: this.state.challenge.difficulty
      }
    })
  }

  handleRemoveTest(idx) {
    this.setState({
      challenge: {
        title: this.state.challenge.title,
        category: this.state.challenge.category,
        instruction: this.state.challenge.instruction,
        function_name: this.state.challenge.function_name,
        parameters: this.state.challenge.parameters,
        testCases: this.state.challenge.testCases.filter((test, i) => i !== idx),
        exampleCases: this.state.challenge.exampleCases,
        difficulty: this.state.challenge.difficulty
      }
    })
  }

  handleRemoveExample(idx) {
    this.setState({
      challenge: {
        title: this.state.challenge.title,
        category: this.state.challenge.category,
        instruction: this.state.challenge.instruction,
        function_name: this.state.challenge.function_name,
        parameters: this.state.challenge.parameters,
        testCases: this.state.challenge.testCases,
        exampleCases: this.state.challenge.exampleCases.filter((example, i) => i !== idx),
        difficulty: this.state.challenge.difficulty
      }
    })
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
      this.state.challenge.testCases.forEach((item) => {
        JSON.parse(item.input);
        JSON.parse(item.output);
      })
      this.state.challenge.exampleCases.forEach((item) => {
        JSON.parse(item.input);
        JSON.parse(item.output);
      })
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
          testCases: [{input: "", output: ""}],
          exampleCases: [{input: "", output: ""}],
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
              <option value="algorithms">Algorithms</option>
              <option value="data structures">Data Structures</option>
              <option value="system design">System Design</option>
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
          {this.state.challenge.testCases.map((item, i) => (
            <div>
              <div className="two fields" key={i}>
                <div className="field">
                  <label>Test Case - Input</label>
                  <input name="testInput" type="text" placeholder="[[1, 3, 6, 0, -2], 9]" value={item.input} onChange={(evt)=> {this.handleTestInputChange(i, evt)}}/>
                </div>
                <div className="field">
                  <label>Test Case - Output</label>
                  <input name="testOutput" type="text" placeholder="[1, 2]" value={item.output} onChange={(evt)=>{this.handleTestOutputChange(i, evt)}}/>
                </div>
              </div>
              <div className="ui icon button" style={{float: "right"}} onClick={this.handleAddTest}><i className="plus icon"></i></div>
              <div className="ui icon button" style={{float: "right"}} onClick={()=>{this.handleRemoveTest(i)}}><i className="minus icon"></i></div>
            </div>
            ))}
            {this.state.challenge.exampleCases.map((item, i) => (
            <div>
              <div className="two fields" key={i}>
                <div className="field">
                  <label>Example - Input</label>
                  <input name="exampleInput" type="text" placeholder="[[1, 4, -2, 6, 9], 15]" value={item.input} onChange={(evt)=>{this.handleExampleInputChange(i, evt)}}/>
                </div>
                <div className="field">
                  <label>Example - Output</label>
                  <input name="exampleOutput" type="text" placeholder="[3, 4]" value={item.output} onChange={(evt)=>{this.handleExampleOutputChange(i, evt)}}/>
                </div>
              </div>
              <div className="ui icon button" style={{float: "right"}} onClick={()=> this.handleAddExample()}><i className="plus icon"></i></div>
              <div className="ui icon button" style={{float: "right"}} onClick={()=> this.handleRemoveExample(i)}><i className="minus icon"></i></div>
            </div>
            ))}
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