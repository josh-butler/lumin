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
      value: ''
    };
  }

  onChange = () => {
    const newValue = this.refs.input.getValue();
    this.setState({value: newValue});
  }

  onSubmit = () => {
    console.log(this.state.value);
    // this.props.fetchUsers(this.state.value, 1);
    this.props.updateQuery(this.state.value);
    this.props.pushState(`/profiles/${this.state.value}/1`);
  }

  render() {
    const styles = require('./UserSearch.scss');
    return (
      <div className={styles.searchContainer}>
        <form className={styles.formGroup}>
          <Input type="text" ref="input" onChange={this.onChange} />
          <Button bsStyle="primary" onClick={this.onSubmit}>Search Users</Button>
        </form>
      </div>
    );
  }
}

