import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';


class UserNavBar extends Component {
    constructor() {
        super()
        this.state = {
            1 : 'ui item',
            2 : 'ui active item',
            3 : 'ui item',
            4 : 'ui item'
        } 
        this.updateButton = this.updateButton.bind(this)
    } 
    updateButton(url, num) {
        this.props.history.push(url)
        const obj = {}
        for (var i = 1; i < 5; i++) {
            if (num === i) {
            obj[i] = 'ui active item'
            } else {
            obj[i] = 'ui item'
            }
        }
        this.setState(obj)
    }

    render(){ 
        return (
            <div className="ui orange four item menu">
                <div className={this.state[1]} onClick={ () => {this.updateButton('/user/profile', 1)} }><i className="user circle icon"></i>
                </div>
                <div className={this.state[2]} onClick={() => {this.updateButton('/user', 2)}}>Calendar</div>
                <div className={this.state[3]} onClick={() => {this.updateButton('/user/challengelist', 3)}}>Live Challenges</div>
                <div className={this.state[4]} onClick={() => {this.updateButton('/user/companylist', 4)}}>Company List</div>
            </div>
        )
    }
}

export default withRouter(UserNavBar);