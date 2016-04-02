import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Button, Input } from 'react-bootstrap';

/* Actions */
import { routeActions } from 'react-router-redux';
import { fetchUsers } from 'redux/modules/users';

@connect(
  state => ({ users: state.users }),
  {
    fetchUsers,
    pushState: routeActions.push
  }
)

class UserSearch extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func,
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
    this.props.fetchUsers(this.state.value, 1);
  }

  // onSuggestionSelected(event, { suggestion }) { // eslint-disable-line
  //  this.props.pushState(`/nav/${ suggestion.root_gml_id }/chart`);
  // }

  render() {
    // const style = require('./UserSearch.scss');
    return (
      <form>
        <Input type="text" ref="input" onChange={this.onChange} />
        <Button bsStyle="primary" onClick={this.onSubmit}>Search Users</Button>
      </form>
    );
  }

}

export default UserSearch;
