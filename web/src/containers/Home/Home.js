import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'react-bootstrap';

/* Actions */
import { routeActions } from 'react-router-redux';
import { updateQuery } from 'redux/modules/query';


@connect(
  state => ({ users: state.users.data }),
  {
    updateQuery,
    pushState: routeActions.push
  }
)
export default class UserSearch extends Component {
  static propTypes = {
    updateQuery: PropTypes.func,
    users: PropTypes.array,
    pushState: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      inputValid: false,
      bsStyle: null,
      inputLabel: ''
    };
  }

  onChange = () => {
    const newValue = this.refs.input.getValue();
    this.setState({
      value: newValue,
      inputValid: newValue.length > 2,
      bsStyle: null,
      inputLabel: ''
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (this.state.inputValid) {
      this.props.updateQuery(this.state.value);
      this.props.pushState(`/profiles/${this.state.value}/1`);
    } else {
      this.setState({
        bsStyle: 'error',
        inputLabel: 'You must enter at least 3 characters'
      });
    }
  }

  render() {
    const styles = require('./UserSearch.scss');
    return (
      <div className={styles.searchContainer}>
        <form className={styles.formGroup} onSubmit={this.onSubmit}>
          <Input bsStyle={this.state.bsStyle} label={this.state.inputLabel} type="text" ref="input" onChange={this.onChange} />
          <Button bsStyle="primary" onClick={this.onSubmit}>Search Users</Button>
        </form>
      </div>
    );
  }
}

