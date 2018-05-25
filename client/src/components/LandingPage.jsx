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
                 Click here to get started 
              </div>
          </div>
      </div>



    <div className="ui container segment" style={{ width: '100%', height: '700px'}}>
      <div className='ui three column padded grid'>

        <div className='column'>
          <div className='ui fluid card landing_page_card'>
            <div className='ui small image'>
              <img src='https://www-us.api.concursolutions.com/appcenter/api/v3/listings/550353cc99066b13221bce40/images/57e957ffb490ec6ac904e88e?lang=en-us' /> 
            </div>
          </div>
        </div>

        <div className='column'>
          <div className='ui fluid card landing_page_card'>
            <div className='ui small image'>
              <img src='https://yt3.ggpht.com/a-/AJLlDp0TFaxkKTbr1YMaEdj0KOLllMoFJcuWOIm4XA=s900-mo-c-c0xffffffff-rj-k-no' />
            </div>
          </div>
        </div>

        <div className='column'>
          <div className='ui fluid card landing_page_card'>
            <div className='ui small image'>
              <img src='http://albanyrideshare.info/wp-content/uploads/2016/07/uber-logo.jpg' />
            </div>
          </div>
        </div>

        <div className='column'>
          <div className='ui fluid card landing_page_card'>
            <div className='ui small image'>
              <img className='landing_page_image' src='https://s20352.pcdn.co/wp-content/uploads/2018/03/2000px-YouTube_social_white_square_2017.svg_-1-1024x778.png' />
            </div>
          </div>
        </div>

        <div className='column'>
          <div className='ui fluid card landing_page_card'>
            <div className='ui small image'>
              <img src='https://cdn-images-1.medium.com/max/1200/1*TiKyhAN2gx4PpbOsiBhYcw.png' />
            </div>
          </div>
        </div>

        <div className='column'>
          <div className='ui fluid card landing_page_card'>
            <div className='ui small image'>
              <img src='https://yt3.ggpht.com/a-/AJLlDp0mRnZ39CP7Z0TUWTkjT5WckBX8fB4BTfMAMg=s900-mo-c-c0xffffffff-rj-k-no' />
            </div>
          </div>
        </div>
          
      </div>

      
      <div class="ui vertical segment landing_page_companies">
        <div class="ui huge header">A Variety of Top Tier Companies</div>
          <p> We offer a variety of top tier tech companies to provide candidates with a variety of challenges. </p>
      </div>
   
    </div>

    <div className='ui four column padded grid'>
      <div className='column'>
        <div className='ui fluid card landing_page_card'>
          <div className='ui small image'>
            <img src='https://ca.slack-edge.com/T2SUXDE72-U9J2Z9HJ8-1bd962248a50-1024' />
          </div>
          <div className='content'>
            <h3 className='landing_page_name'>Amy San Felipe</h3>
          </div>
        </div>
      </div>

      <div className='column'>
        <div className='ui fluid card landing_page_card'>
          <div className='ui small image'>
            <img src='https://ca.slack-edge.com/T2SUXDE72-U9HPJAQLT-aee606327989-1024' />
          </div>
          <div className='content'>
            <h3 className='landing_page_name'>Kevin Wang</h3> 
          </div>
        </div>
      </div>

      <div className='column'>
        <div className='ui fluid card landing_page_card'>
          <div className='ui small image'>
            <img src='https://ca.slack-edge.com/T2SUXDE72-U9H5FJH1N-f0fb6e017566-1024' />
          </div>
          <div className='content'>
            <h3 className='landing_page_name'>Vanessa Wu</h3>
          </div>
        </div>
      </div>

      <div className='column'>
        <div className='ui fluid card landing_page_card'>
          <div className='ui small image'>
            <img src='https://ca.slack-edge.com/T2SUXDE72-U9HRNUDPE-b4f0e5be4ac9-1024' />
          </div>
          <div className='content'>
            <h3 className='landing_page_name'>William Kimak</h3>
          </div>
        </div>
      </div>
    </div>
   
    <div className="ui inverted vertical footer segment">
      <h1 className='footer_logo'> CodeHire </h1>
    </div>
  </div>
</div>
    )
  }
}

export default withRouter(LandingPage);
