import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { clientObject } from '../../utils/__mocks__/clients';

export class ClientForm extends React.Component {
  constructor(props) {
    super(props);

    const clientData = clientObject();
    clientData.id = props.client ? props.client.id : '';
    clientData.name = props.client ? props.client.name : '';
    clientData.surname = props.client ? props.client.surname : '';
    clientData.note = props.client ? props.client.note : '';

    this.state = {
      ...clientData,
      error: '',
      open: false
    };
  }

  onNameChange = e => {
    const name = e.target.value;
    this.setState(prevState => ({ name: name }));
  };

  onSurnameChange = e => {
    const surname = e.target.value;
    this.setState(prevState => ({ surname: surname }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(prevState => ({ note: note }));
  };

  onRemoveClient = e => {
    this.props.onRemoveClient(this.state.id);
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.name || !this.state.surname) {
      this.setState(prevState => ({
        error: 'Please provide name and surname!'
      }));
    } else {
      this.setState(() => ({
        error: ''
      }));
      this.props.onSubmit({
        name: this.state.name,
        surname: this.state.surname,
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error.length > 0 && (
            <p className="form__error">{this.state.error}</p>
          )}
          <input
            className="text-input"
            type="text"
            placeholder="Name"
            autoFocus
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <input
            className="text-input"
            type="text"
            placeholder="Surname"
            value={this.state.surname}
            onChange={this.onSurnameChange}
          />
          <textarea
            className="textarea"
            placeholder="Add a note (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <div>
            <button>{this.props.client ? 'Save' : 'Add'} Client</button>
          </div>
        </form>
        {this.props.client && (
          <button onClick={this.onRemoveClient}>Remove Client</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

export default connect(mapStateToProps)(ClientForm);
