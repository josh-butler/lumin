import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import config from '../../config';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#777'}}>
                <div className={styles.brand}/>
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              <LinkContainer to="/">
                <NavItem eventKey={2}>New Request</NavItem>
              </LinkContainer>
              <NavItem eventKey={4} target="_blank" href="https://www.linkedin.com/in/joshua-butler-b2151b98">About Us</NavItem>
              <div style={{display: 'flex', height: '50px', alignItems: 'center'}}>
                <div style={{padding: '0 10px', 'fontWeight': '600'}}>
                  <Link to="/report/a">Client A</Link>
                </div>
                <div style={{padding: '0 10px', 'fontWeight': '600'}}>
                  <Link to="/report/b">Client B</Link>
                </div>
                <div style={{padding: '0 10px', 'fontWeight': '600'}}>
                  <Link to="/report/c">Client C</Link>
                </div>
              </div>
            </Nav>
            <Nav navbar pullRight>
              <NavItem eventKey={1} target="_blank" title="View on Github" href="https://github.com/josh-butler/lumin">
                <i className="fa fa-github"/>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>

        <div className={styles.appFooter}>
          <div className={styles.footerText}>
            Want to see the code? Check it out <a
            href="https://github.com/josh-butler/lumin"
            target="_blank">on Github</a>
          </div>
        </div>
      </div>
    );
  }
}
