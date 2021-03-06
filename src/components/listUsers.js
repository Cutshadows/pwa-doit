import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';

class ListUsers extends Component {
    state = {
        users: []
    };

    componentWillReceiveProps() {
        this.handleRequest()
    }

    handleRequest = () => {
        let request = new XMLHttpRequest(), onUpdate = this.handleUpdate;

        request.open('GET', 'http://' + window.location.hostname + ':8081/users?ids=' + this.props.list.join(','), true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        onUpdate(JSON.parse(request.response));
                        break;
                    default:
                        break;
                }
            }
        };

        request.send()
    };

    handleUpdate = (data) => {
        this.setState({
            users: data
        })
    };

    render() {
        return (
            <List>
                {
                    this.state.users.map((user, i) => (
                        <Link
                            key={ this.state.users.length - i }
                            to={ '/user/' + user._id }
                            style={{ textDecoration:'none' }}
                        >
                            <ListItem button>
                                <Avatar
                                    src={ user.image === '/images/landscape.jpg' ? '/images/user.png' : user.image }
                                    style={{ border: '2px solid black' }}
                                />

                                <ListItemText
                                    classes={{ text:'overflow-text' }}
                                    primary={ user.names }
                                    secondary={ '@' + user.username }
                                />
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
        );
    }
}

export default ListUsers;