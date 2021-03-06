import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';

import Snack from '../snackDefault';

class FormEvent extends Component {
    state = {
        event: {
            name: '',
            own: getCookie('userId'),
            start: new Date(Date.now()),
            end: new Date(Date.now() + 3600000),
            address: {
                city: 'coquimbo',
                street: '',
                number: 1
            },
            quotas: 1,
            price: 0,
            details: '',
            tags: [],
            coordinates: "0z0n",
            image: ''
        },
        fieldset: {
            disabled: false
        },
        snack: {
            message: '',
            open: false
        },
        tag: ''
    };

    handleAdd = () => {
        let event = this.state.event;

        if (event.tags.indexOf(this.state.tag) < 0) {
            event.tags.push(this.state.tag)
        }

        this.setState({
            tag: '' ,
            event: event
        })
    };

    handleChange = name => event => {
        let aux = this.state.event;

        aux[name] = event.target.value;

        this.setState({ event: aux })
    };

    handleCity = (event) => {
        let aux = this.state.event;

        aux.address.city = event.target.value;

        this.setState({ event: aux })
    };

    handleDisable = () => {
        this.setState({
            fieldset: {
                disabled: !this.state.fieldset.disabled
            }
        })
    };

    handleEndDate = (event) => {
        let endDate = event.target.value.split('-'), aux = this.state.event;

        aux.end = new Date(endDate[0], endDate[1] - 1, endDate[2], this.state.event.end.getHours(), this.state.event.end.getMinutes());

        this.setState({
            event: aux
        })
    };

    handleEndTime = (event) => {
        let endTime = event.target.value.split(':'), aux = this.state.event;

        aux.end = new Date(this.state.event.end.getFullYear(), this.state.event.end.getMonth(), this.state.event.end.getDate(), endTime[0], endTime[1]);

        this.setState({
            event: aux
        })
    };

    handleFile = () => {
        document.querySelector('form input[type="file"]').click()
    };

    handleNumber = (event) => {
        let aux = this.state.event;

        aux.address.number = event.target.value;

        this.setState({ event: aux })
    };

    handleTag = (event) => {
        this.setState({ tag: event.target.value })
    };

    handlePostRequest = () => {
        this.handleRequest('post', 'http://' + window.location.hostname + ':8081/events', function() { window.location.href = '/' })
    };

    handleRequest = (type, url, callback) => {
        let request = new XMLHttpRequest(), parent = this;

        request.open('POST', 'http://' + window.location.hostname + ':8081/events', true);
        request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

        this.handleDisable();

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                switch (request.status) {
                    case 201:
                        callback(request.response);
                        break;
                    case 403:
                        parent.handleSnack(getErrors(request.response));
                        break;
                    default:
                        parent.handleSnack('Service not respond');
                        break;
                }
            }
        };

        request.send( JSON.stringify( this.state.event ) )
    };

    handleRemove = tag => () => {
        let event = this.state.event;

        event.tags.splice(event.tags.indexOf(tag));

        this.setState({ event: event });
    };

    handleSnack = (message) => {
        this.setState({
            snack: {
                message: typeof message === 'string' ? message : this.state.snack.message,
                open: typeof message === 'string'
            },
            fieldset: {
                disabled: typeof message === 'string'
            }
        })
    };

    handleStartDate = (event) => {
        let startDate = event.target.value.split('-'), aux = this.state.event;

        aux.start = new Date(startDate[0], startDate[1] - 1, startDate[2], aux.start.getHours(), aux.start.getMinutes());

        this.setState({
            event: aux
        })
    };

    handleStartTime = (event) => {
        let startTime = event.target.value.split(':'), aux = this.state.event;

        aux.start = new Date(aux.start.getFullYear(), aux.start.getMonth(), aux.start.getDate(), startTime[0], startTime[1]);

        this.setState({
            event: aux
        })
    };

    handleStreet = (event) => {
        let aux = this.state.event;

        aux.address.street = event.target.value;

        this.setState({ event: aux })
    };

    render() {
        return (
            <form
                style={{
                    overflowY: 'auto',
                    padding: '64px 0 0'
                }}
            >
                <fieldset
                    disabled={ this.state.fieldset.disabled }
                    style={{
                        border: 0,
                        margin: 0,
                        padding: '16px 16px 0'
                    }}
                >
                    <TextField
                        fullWidth
                        error={ this.state.event.name.trim().length === 0 }
                        helperText='Enter characters or/and digits numbers'
                        label='Title'
                        onChange={ this.handleChange('name') }
                        style={{ paddingBottom: 16 }}
                        type='text'
                        value={ this.state.event.name }
                    />

                    <TextField
                        disabled={ true }
                        label='Country'
                        select
                        onChange={ null }
                        SelectProps={{ native: true }}
                        style={{
                            paddingBottom: 16,
                            marginRight: 8,
                            width: 'calc(50% - 8px)'
                        }}
                    >
                        <option value='chile'>Chile</option>
                    </TextField>

                    <TextField
                        helperText='Select a city'
                        label='City'
                        onChange={ this.handleCity }
                        select
                        SelectProps={{ native: true }}
                        style={{
                            paddingBottom: 16,
                            marginLeft: 8,
                            width: 'calc(50% - 8px)'
                        }}
                        value={ this.state.event.address.city }
                    >
                        <option value='la serena'>La Serena</option>
                        <option value='coquimbo'>Coquimbo</option>
                    </TextField>

                    <TextField
                        error={ this.state.event.address.street.trim().length === 0 }
                        helperText='Enter characters or/and digits numbers'
                        label="Street"
                        onChange={ this.handleStreet }
                        style={{
                            paddingBottom: 16,
                            marginRight: 8,
                            width: 'calc(70% - 8px)'
                        }}
                        type="text"
                        value={ this.state.event.address.street }
                    />

                    <TextField
                        error={ this.state.event.address.number === '' }
                        helperText='Enter a number'
                        label="Number"
                        onChange={ this.handleNumber }
                        style={{
                            paddingBottom: 16,
                            marginLeft: 8,
                            width: 'calc(30% - 8px)'
                        }}
                        type="number"
                        value={ this.state.event.address.number }
                    />

                    <TextField
                        error={ this.state.event.start >= this.state.event.end }
                        helperText='Format dd/mm/aaaa'
                        InputLabelProps={{ shrink: true }}
                        label="Fecha de Inicio *"
                        onChange={ this.handleStartDate }
                        style={{
                            marginRight: 8,
                            paddingBottom: 16,
                            width: 'calc(50% - 8px)'
                        }}
                        type="date"
                        value={
                            this.state.event.start.getFullYear() + '-' +
                            ( this.state.event.start.getMonth() + 1 < 10 ? '0' + (this.state.event.start.getMonth() + 1) : this.state.event.start.getMonth() + 1 ) + '-' +
                            ( this.state.event.start.getDate() < 10 ? '0' + this.state.event.start.getDate() : this.state.event.start.getDate() )
                        }
                    />

                    <TextField
                        error={ this.state.event.start >= this.state.event.end }
                        helperText='Format hh:mm'
                        InputLabelProps={{ shrink: true }}
                        label="Hora de Inicio *"
                        onChange={ this.handleStartTime }
                        style={{
                            marginLeft: 8,
                            paddingBottom: 16,
                            width: 'calc(50% - 8px)'
                        }}
                        type="time"
                        value={ ( this.state.event.start.getHours() < 10 ? '0' + this.state.event.start.getHours() : this.state.event.start.getHours() ) + ':' + ( this.state.event.start.getMinutes() < 10 ? '0' + this.state.event.start.getMinutes() : this.state.event.start.getMinutes() ) }
                    />

                    <TextField
                        helperText='Format dd/mm/aaaa'
                        label='Fecha de Termino *'
                        onChange={ this.handleEndDate }
                        style={{
                            marginRight: 8,
                            paddingBottom: 16,
                            width: 'calc(50% - 8px)'
                        }}
                        type='date'
                        value={
                            this.state.event.end.getFullYear() + '-' +
                            ( this.state.event.end.getMonth() + 1 < 10 ? '0' + (this.state.event.end.getMonth() + 1) : this.state.event.end.getMonth() + 1 ) + '-' +
                            ( this.state.event.end.getDate() < 10 ? '0' + this.state.event.end.getDate() : this.state.event.end.getDate() )
                        }
                    />

                    <TextField
                        helperText='Format hh:mm'
                        InputLabelProps={{ shrink: true }}
                        label="Hora de Termino *"
                        onChange={ this.handleEndTime }
                        style={{
                            marginLeft: 8,
                            paddingBottom: 16,
                            width: 'calc(50% - 8px)'
                        }}
                        type="time"
                        value={ ( this.state.event.end.getHours() < 10 ? '0' + this.state.event.end.getHours() : this.state.event.end.getHours() ) + ':' + ( this.state.event.end.getMinutes() < 10 ? '0' + this.state.event.end.getMinutes() : this.state.event.end.getMinutes() ) }
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rowsMax="3"
                        onChange={ this.handleChange('details') }
                        style={{ marginBottom: 16 }}
                        value={ this.state.event.details }
                    />

                    <TextField
                        error={ this.state.event.quotas < 1 }
                        helperText='Enter a number'
                        label='Quotas'
                        onChange={ this.handleChange('quotas') }
                        style={{
                            paddingBottom: 16,
                            marginRight: 8,
                            width: 'calc(50% - 8px)'
                        }}
                        type="number"
                        value={ this.state.event.quotas }
                    />

                    <TextField
                        error={ this.state.event.price < 0 || this.state.event.price === '' }
                        helperText='Enter a number'
                        label="Price"
                        onChange={ this.handleChange('price') }
                        style={{
                            paddingBottom: 16,
                            marginLeft: 8,
                            width: 'calc(50% - 8px)'
                        }}
                        type="number"
                        value={ this.state.event.price }
                    />

                    <TextField
                        helperText='Enter a url of image'
                        fullWidth
                        label="Image"
                        onChange={ this.handleChange('image') }
                        style={{
                            marginRight: 8,
                            width: 'calc(70% - 8px)'
                        }}
                        type="text"
                        value={ this.state.event.image }
                    />

                    <input type="file" name="pic" accept="image/*" hidden/>

                    <Button
                        color='primary'
                        children='select'
                        dense
                        onClick={ this.handleFile }
                        style={{
                            marginLeft: 8,
                            width: 'calc(30% - 8px)'
                        }}
                    />

                    <div
                        style={{
                            backgroundColor: '#eee',
                            margin: '16px -16px 0',
                            padding: 16
                        }}
                    >
                        <TextField
                            placeholder='Enter a tag and press "add"'
                            onChange={ this.handleTag }
                            style={{
                                marginRight: 8,
                                width: 'calc(70% - 8px)'
                            }}
                            value={ this.state.tag }
                        />

                        <Button
                            color='primary'
                            dense
                            disabled={ this.state.tag.trim().length === 0 }
                            onClick={ this.handleAdd }
                            style={{
                                marginLeft: 8,
                                width: 'calc(30% - 8px)'
                            }}
                        >
                            Add
                        </Button>

                        <div
                            style={{
                                display: 'flex',
                                margin: '16px -16px 0',
                                padding: '0 16px'
                            }}
                        >
                            {
                                this.state.event.tags.length === 0 &&
                                <Chip
                                    key={ -1 }
                                    label={ <span><Icon style={{ verticalAlign: 'middle' }}>mood_bad</Icon> No tags</span> }
                                    style={{ opacity: .7 }}
                                />
                            }

                            {
                                this.state.event.tags.map((tag, index) => {
                                    return (
                                        <Chip
                                            label={ tag }
                                            key={ index }
                                            onRequestDelete={ this.handleRemove(tag) }
                                            style={{ marginRight: 8 }}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>

                    <Snack
                        close={ this.handleSnack }
                        message={ this.state.snack.message }
                        open={ this.state.snack.open }
                    />

                    <Button
                        id='create_event_button'
                        children='Create event'
                        onClick={ this.handlePostRequest }
                        style={{ display: 'none' }}
                    />
                </fieldset>
            </form>
        );
    }
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp(name + '=([^;]+)')); if (match) return match[1]
}

function getErrors(response) {
    let errors = JSON.parse(response),
        string = '';

    if (errors.hasOwnProperty('errors')) {
        for (let property in errors.errors) {
            if (errors.errors.hasOwnProperty(property)) {
                string = string + errors.errors[property].message + '\n'
            }
        }
    } else {
        if (errors.hasOwnProperty('code')) {
            string = textFields[errors.errmsg.split('index: ').pop().split('_').reverse().pop()] + ' ya registrado.'
        }
    }

    return string
}

function test(exp, val) {
    return (new RegExp(exp)).test(val)
}

let textFields = {
    'username': 'Nombre de usuario',
    'business.rut.body': 'Rut de empresa',
    'mail': 'Correo electrónico'
};

export default FormEvent;
