import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

class ListEvents extends Component {
    state = {
        events: []
    };

    componentDidMount() {
        this.handleRequest(this.handleUpdate, '')
    }

    handleRequest = (callback, query) => {
        let request = new XMLHttpRequest();

        request.open('GET', 'http://' + window.location.hostname + ':8081/events' + query, true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 200:
                        callback(request.response);
                        break;
                    default:
                        break;
                }
            }
        };

        request.send()
    };

    handleUpdate = (events) => {
        this.setState({
            events: JSON.parse(events)
        })
    };

    render() {
        return (
            <List style={{ padding: '64px 0' }}>
                {
                    this.state.events.map((event, index) => (
                        <Link
                            key={ index }
                            to={ '/event/' + event._id}
                        >
                            <ListItem button>
                                <Avatar src={ event.image }/>

                                <ListItemText
                                    primary={ event.name }
                                    secondary={ event.details !== '' ? event.details : 'No description' }
                                />

                                <Typography
                                    children={ '24 hr' }
                                    gutterBottom
                                    type="body2"
                                />
                            </ListItem>
                        </Link>
                    ))
                }


                <Button
                    fab
                    color="accent"
                    onClick={ this.handleCreate }
                    style={{position: 'fixed', right: 16, bottom: 72}}
                >
                    <Icon>add</Icon>
                </Button>
            </List>
        );
    }
}

export default ListEvents;