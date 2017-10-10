import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import purple from 'material-ui/colors/purple';

import AppBar from 'material-ui/AppBar';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { LinearProgress } from 'material-ui/Progress';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Activities from './components/listActivity';
import Activity from './components/detailActivity';
import AddActivity from './components/formActivity';
import Login from './components/formSession';
import Registry from './components/formUser';
import Profile from "./components/detailProfile";
import Settings from "./components/listSettings";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: purple
    }
});

class App extends React.Component {
    state = {
        title: 'newly added',
        navigation: 0,
        search: ''
    };

    handleBack = () => {
        window.history.back()
    };

    handleChange = (event, value) => {
        this.setState({ navigation: value });
    };

    handleUser = () => {
        if (getCookie('userId') === '') {
            document.getElementById('login').click()
        } else {
            document.getElementById('user').click()
        }
    };

    render() {
        const { navigation } = this.state;

        return <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <div id="shell" style={{padding: '64px 0'}}>
                    <LinearProgress id="progress" color="accent" style={{position: 'fixed', top: 0, width: '100%', zIndex: 1200, display: 'none'}}/>

                    <AppBar id="header" color="primary" position="fixed">
                        <Toolbar style={{minHeight: 64}}>
                            <IconButton id="back" color="inherit" style={{marginLeft:'-12px'}} onClick={this.handleBack}>
                                <Icon>arrow_back</Icon>
                            </IconButton>

                            <Typography id='title' color="inherit" type="title">{this.state.title}</Typography>

                            <IconButton id="down" color="inherit">
                                <Icon>keyboard_arrow_down</Icon>
                            </IconButton>

                            <IconButton id="search" color="inherit" style={{marginLeft: 'auto'}}>
                                <Icon>search</Icon>
                            </IconButton>

                            <IconButton id="filter" color="inherit" style={this.state.btnSearch}>
                                <Icon>filter_list</Icon>
                            </IconButton>

                            <IconButton id="check" color="inherit">
                                <Icon>check</Icon>
                            </IconButton>

                            <IconButton id="shared" color="inherit" style={{marginLeft: 'auto'}}>
                                <Icon>shared</Icon>
                            </IconButton>

                            <IconButton id="person_add" color="inherit">
                                <Icon>person_add</Icon>
                            </IconButton>

                            <Link id='settings' to='/settings' style={{textDecoration: 'none', color: 'inherit', marginLeft: 'auto'}}>
                                <IconButton color="inherit">
                                    <Icon>settings</Icon>
                                </IconButton>
                            </Link>
                        </Toolbar>
                    </AppBar>

                    <Switch>
                        <Route exact path="/" component={Activities}/>
                        <Route path="/activity" component={Activity}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/registry" component={Registry}/>
                        <Route path="/add" component={AddActivity}/>
                        <Route path="/user" component={Profile}/>
                        <Route path="/settings" component={Settings}/>
                    </Switch>

                    <BottomNavigation value={navigation} onChange={this.handleChange} style={{bottom: 0, position: 'fixed', width: '100%'}}>
                        <BottomNavigationButton onClick={function() { document.getElementById('comments').click() }} icon={<Icon>forum</Icon>}/>
                        <BottomNavigationButton onClick={function() { document.getElementById('activities').click() }} icon={<Icon>directions_run</Icon>}/>
                        <BottomNavigationButton onClick={this.handleUser} icon={<Icon>person</Icon>}/>
                    </BottomNavigation>

                    <Link id='comments' to="/"/>
                    <Link id='activities' to="/"/>
                    <Link id='login' to="/login"/>
                    <Link id='user' to='/user'/>
                    <Link id='activity' to='/activity'/>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>;
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

render(<App/>, document.querySelector('#root'));
