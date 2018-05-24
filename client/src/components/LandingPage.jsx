import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch, History, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history.jsx';
import AuthContainer from '../containers/AuthContainer.jsx';
import AdminContainer from '../containers/AdminContainer.jsx';
import UserContainer from '../containers/UserContainer.jsx';
import Login from './Login.jsx';
import Registration from './Registration.jsx';

class LandingPage extends Component {
  constructor() {
    super()

    this.state = {
      currentScrollHeight: .0001
    }
  }

  componentDidMount () {
    window.onscroll = () => {
      this.setState({
        currentScrollHeight: window.scrollY
      })
    }
  }


  render() {
    let opacity = Math.max(0, this.state.currentScrollHeight/280)
    return (
      <div>
      <div style={{opacity}} className="ui large top fixed hidden menu">
        <div className="ui container">
          <a className="item">Home</a><a className="item">Work</a><a className="item">Company</a><a className="item">Careers</a>
          <div className="right menu">
            <div className="item">
              <a className="ui orange button" onClick={() => {this.props.history.push('/registration')}}>Sign Up</a>
            </div>
            <div className="item">
              <a className="ui orange button" onClick={() => {this.props.history.push('/login')}}>Log in</a>
            </div>
          </div>
        </div>
      </div>

      <div className="pusher">
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui container">
            <div className="ui large secondary inverted pointing menu">
              <a className="toc item"><i className="sidebar icon"></i></a><a className="item">Home</a><a className="item">Work</a><a className="item">Company</a><a className="item">Careers</a>
              <div className="right menu">
                <div className="item">
                  <a className="ui orange button" onClick={() => {this.props.history.push('/login')}}>Log in</a>
                </div>
              </div>
            </div>
          </div>
          <div className="ui text container header">
            <h1 className="ui inverted header">
              CODEHIRE
            </h1>
            <h2>
              HIRE ME I CODE
            </h2>
            <h3>
              CodeHire is a platform that brings together programmers and companies in one location
            </h3>
              <div className="ui orange huge button" onClick={() => {this.props.history.push('/registration')} }>
                Applicant? Click here to get started <i className="right arrow icon"></i>
              </div>
          </div>
      </div>



    <div className="ui vertical stripe segment">
      <div className="ui middle aligned stackable grid container">
        <div className="row">
          <div className="eight wide column">
            <h3 className="ui header">
              We Help Companies and Companions
            </h3>
            <p>
              We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs...through pure data analytics.
            </p>
            <h3 className="ui header">
              We Make Bananas That Can Dance
            </h3>
            <p>
              Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.
            </p>
          </div>
          <div className="six wide right floated column">
            <img className="ui large bordered rounded image" src="../../static/images/templates/semantic-ui/wireframe/white-image.png" />
          </div>
        </div>
        <div className="row">
          <div className="center aligned column">
            <a className="ui huge button">Check Them Out Link to Major Company Sites</a>
          </div>
        </div>
      </div>
    </div>
    <div className="ui vertical stripe quote segment">
      <div className="ui equal width stackable internally celled grid">
        <div className="center aligned row">
          <div className="column">
            <h3>
              "What a Company"
            </h3>
            <p>
              That is what they all say about us
            </p>
          </div>
          <div className="column">
            <h3>
              "I shouldn't have gone with their competitor."
            </h3>
            <p>
              <img className="ui avatar image" src="../../static/images/templates/semantic-ui/avatar/nan.jpg" /><b>Nan</b>Chief Fun Officer Acme Toys
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="ui vertical stripe segment">
      <div className="ui text container">
        <h3 className="ui header">
          Breaking The Grid, Grabs Your Attention
        </h3>
        <p>
          Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.
        </p>
        <a className="ui large button">Read More</a>
        <h4 className="ui horizontal header divider">
          <a href="homepage.html#"> Case Studies</a>
        </h4>
        <h3 className="ui header">
          Did We Tell You About Our Bananas?
        </h3>
        <p>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but its really true. It took years of gene splicing and combinatory DNA research, but our bananas can really dance.
        </p>
        <a className="ui large button">I'm Still Quite Interested</a>
      </div>
    </div>
    <div className="ui inverted vertical footer segment">
      <div className="ui container">
        <div className="ui stackable inverted divided equal height stackable grid">
          <div className="three wide column">
            <h4 className="ui inverted header">
              Company
            </h4>
            <div className="ui inverted link list">
              <a className="item" href="homepage.html#"> About </a><a className="item" href="homepage.html#"> Team </a><a className="item" href="homepage.html#"> Blog </a>
            </div>
          </div>
          <div className="three wide column">
            <h4 className="ui inverted header">
              Services
            </h4>
            <div className="ui inverted link list">
              <a className="item" href="homepage.html#"> FAQ </a><a className="item" href="homepage.html#"> Contact Us </a><a className="item" href="homepage.html#"> Source </a><a className="item" href="homepage.html#"> Code Monkey </a>
            </div>
          </div>
          <div className="seven wide column">
            <h4 className="ui inverted header">
              Footer Header
            </h4>
            <p>
              Extra space for funsies
              Add social media
              Github links
              Twitter
              Linked Ins
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
  }
}

export default withRouter(LandingPage);
