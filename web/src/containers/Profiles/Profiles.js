import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { Button, ButtonGroup, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap';

/* Actions */
import { routeActions } from 'react-router-redux';
import { fetchUsers, postUser } from 'redux/modules/users';

import { PER_PAGE } from '../../constants/index';

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
    postUser,
    pushState: routeActions.push
  }
)
export default class Profiles extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func,
    postUser: PropTypes.func,
    users: PropTypes.array,
    pushState: PropTypes.func,
    params: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      prevPage: this.props.params.page !== 1,
      nextPage: this.props.users.length
    };
  }

  handleProfileClick(user) {
    this.props.postUser(user);
    window.open(`https://twitter.com/${user.screen_name}`, '_blank');
  }

  renderPrevButton() {
    if (this.props.params.page !== '1') {
      const {query, page} = this.props.params;
      const prevPage = `/profiles/${query}/${parseInt(page, 10) - 1}`;
      return <Button onClick={() => {this.props.pushState(prevPage);}}>Prev</Button>;
    }
    return null;
  }

  renderNextButton() {
    if (this.props.users.length > PER_PAGE - 1) {
      const {query, page} = this.props.params;
      const nextPage = `/profiles/${query}/${parseInt(page, 10) + 1}`;
      return <Button onClick={() => {this.props.pushState(nextPage);}}>Next</Button>;
    }
    return null;
  }

  renderPageButtons() {
    return (
      <ButtonGroup>
        { this.renderPrevButton() }
        { this.renderNextButton() }
      </ButtonGroup>
    );
  }

  renderProfile(user) {
    return (
      <div style={{display: 'flex'}}>
        <img src={ user.profile_image_url } alt="profile img" height="32" width="32" />
        <span>
          <div style={{padding: '0 10px', 'fontWeight': '600'}}>{ `@${user.screen_name}` }</div>
          <div style={{padding: '0 10px', 'fontSize': '10px'}}>{ user.location }</div>
        </span>
      </div>
    );
  }

  renderProfileList() {
    const searchObj = this.props.users;
    const users = [];
    for (const key in searchObj) {
      if (searchObj.hasOwnProperty(key)) {
        users.push(searchObj[key]);
      }
    }

    return users.map((user) => {
      const boundUserClick = this.handleProfileClick.bind(this, user);
      const styles = { padding: '5px'};
      return (
        <ListGroupItem style={styles} key={ user.id_str } target="_blank" onClick={ boundUserClick }>{ this.renderProfile(user) }</ListGroupItem>
      );
    });
  }

  render() {
    const styles = require('./Profiles.scss');
    return (
      <div className={styles.profilesContainer}>
        <ListGroup className={styles.profilesListGroup}>
          { this.renderProfileList() }
        </ListGroup>
        <div className={styles.buttonsContainer}>
          <ButtonToolbar>
            { this.renderPageButtons()}
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
