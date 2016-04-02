import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

/* Actions */
import { routeActions } from 'react-router-redux';
import { fetchUsers } from 'redux/modules/users';

@asyncConnect([{
  promise: ({store: {dispatch}, params: {query, page}}) => {
    const promises = [];
    promises.push(dispatch(fetchUsers(query, page)));
    return Promise.all(promises);
  }
}])
@connect(
  state => ({ users: state.users.data, query: state.query }),
  {
    fetchUsers,
    pushState: routeActions.push
  }
)
export default class Profiles extends Component {
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

  // onChange = () => {
  //  const newValue = this.refs.input.getValue();
  //  this.setState({value: newValue});
  // }
  //
  // onSubmit = () => {
  //  console.log(this.state.value);
  //  this.props.fetchUsers(this.state.value, 1);
  // }

  alertClicked() {
    alert('You clicked the third ListGroupItem');
  }

  // onSuggestionSelected(event, { suggestion }) { // eslint-disable-line
  //  this.props.pushState(`/nav/${ suggestion.root_gml_id }/chart`);
  // }

  render() {
    const styles = require('./Profiles.scss');
    return (
      <div className={styles.profilesContainer}>
        <ListGroup className={styles.profilesListGroup}>
          <ListGroupItem href="#link1">Link 1</ListGroupItem>
          <ListGroupItem href="#link2">Link 2</ListGroupItem>
          <ListGroupItem onClick={this.alertClicked}>
            Trigger an alert
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}
