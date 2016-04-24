import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

/* Actions */
import { routeActions } from 'react-router-redux';
import { fetchRequests } from 'redux/modules/requests';


@asyncConnect([{
  promise: ({store: {dispatch}, params: {id}}) => {
    const promises = [];
    promises.push(dispatch(fetchRequests(id)));
    return Promise.all(promises);
  }
}])
@connect(
  state => ({ requests: state.requests.data }),
  {
    fetchRequests,
    pushState: routeActions.push
  }
)
export default class Report extends Component {
  static propTypes = {
    fetchClicks: PropTypes.func,
    requests: PropTypes.array,
    pushState: PropTypes.func,
    params: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };
  }

  renderProfile(req) {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
          <span>
            <div style={{padding: '0 10px', 'fontWeight': '600'}}>{ req.title }</div>
            <div style={{padding: '0 10px', 'fontSize': '10px'}}>{ req.product }</div>
            <div style={{padding: '0 10px', 'fontSize': '10px'}}>{ req.ticketUrl }</div>
          </span>
        </div>
        <div style={{height: '100%', justifySelf: 'flex-end'}}>
          <Button bsStyle="primary" bsSize="xsmall">{ req.priority }</Button>
        </div>
      </div>
    );
  }

  renderRequestList() {
    const searchObj = this.props.requests;
    const reqs = [];
    for (const key in searchObj) {
      if (searchObj.hasOwnProperty(key)) {
        reqs.push(searchObj[key]);
      }
    }

    return reqs.map((req) => {
      const styles = { padding: '5px'};
      return (
        <ListGroupItem style={styles} key={ req.uid }>{ this.renderProfile(req) }</ListGroupItem>
      );
    });
  }

  render() {
    const styles = require('./Report.scss');
    return (
      <div className={styles.profilesContainer}>
        <ListGroup className={styles.profilesListGroup}>
          { this.renderRequestList() }
        </ListGroup>
      </div>
    );
  }
}
