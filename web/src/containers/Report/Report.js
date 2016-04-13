import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

/* Actions */
import { routeActions } from 'react-router-redux';
import { fetchClicks } from 'redux/modules/clicks';

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(fetchClicks()));
    return Promise.all(promises);
  }
}])
@connect(
  state => ({ clicks: state.clicks.data }),
  {
    fetchClicks,
    pushState: routeActions.push
  }
)
export default class Report extends Component {
  static propTypes = {
    fetchClicks: PropTypes.func,
    clicks: PropTypes.array,
    pushState: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      clicks: []
    };
  }

  renderProfile(user) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
          <img src={ user.data.profile_image_url } alt="profile img" height="32" width="32" />
          <span>
            <div style={{padding: '0 10px', 'fontWeight': '600'}}>{ `@${user.data.screen_name}` }</div>
            <div style={{padding: '0 10px', 'fontSize': '10px'}}>{ user.data.location }</div>
          </span>
        </div>
        <div style={{height: '100%', justifySelf: 'flex-end'}}>
          <Button bsStyle="primary" bsSize="xsmall">{ user.count }</Button>
        </div>
      </div>
    );
  }

  renderProfileList() {
    const searchObj = this.props.clicks;
    const users = [];
    for (const key in searchObj) {
      if (searchObj.hasOwnProperty(key)) {
        users.push(searchObj[key]);
      }
    }

    return users.map((user) => {
      const styles = { padding: '5px'};
      return (
        <ListGroupItem style={styles} key={ user.id_str }>{ this.renderProfile(user) }</ListGroupItem>
      );
    });
  }

  render() {
    const styles = require('./Report.scss');
    return (
      <div className={styles.profilesContainer}>
        <ListGroup className={styles.profilesListGroup}>
          { this.renderProfileList() }
        </ListGroup>
      </div>
    );
  }
}
