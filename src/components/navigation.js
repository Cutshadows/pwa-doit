import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Icon from 'material-ui/Icon';

class Navigation extends Component {
    state = {
        value: this.props.value
    };

    handleChange = (event, value) => {
        this.setState({
            value: value
        })
    };

    render() {
        return (
            <div>
                <BottomNavigation
                    onChange={ this.handleChange }
                    style={{
                        bottom: 0,
                        position: 'fixed',
                        width: '100vw',
                        overflow: 'hidden'
                    }}
                    value={ this.state.value }
                >
                    <BottomNavigationButton
                        icon={ <Icon children='message'/> }
                        label='Messages'
                        onClick={ function () { document.getElementById('messages_link').click() } }
                        value='messages'
                    />

                    <BottomNavigationButton
                        icon={ <Icon children='home'/> }
                        label='Home'
                        onClick={ function () { document.getElementById('events_link').click() } }
                        value='home'
                    />

                    <BottomNavigationButton
                        icon={ <Icon children='person'/> }
                        label='User'
                        onClick={ function () { document.getElementById('user_link').click() } }
                        value='user'
                    />
                </BottomNavigation>

                <Link id={ 'user_link' } to={ '/user/' + getCookie('userId') }/>
                <Link id={ 'events_link' } to={ '/' }/>
                <Link id={ 'messages_link' } to={ '/messages/' }/>
            </div>
        );
    }
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

export default Navigation;