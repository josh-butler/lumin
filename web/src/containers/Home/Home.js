import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Grid, Row, Col } from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
/* Actions */
import { routeActions } from 'react-router-redux';
import { postRequest } from 'redux/modules/requests';


@connect(
  state => ({ requests: state.requests.data }),
  {
    postRequest,
    pushState: routeActions.push
  }
)
export default class Home extends Component {
  static propTypes = {
    postRequest: PropTypes.func,
    requests: PropTypes.array,
    pushState: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      titleLabel: 'Title',
      titleValue: '',
      titleIsValid: false,
      priorityLabel: 'Priority',
      priorityValue: '',
      priorityIsValid: false,
      clientLabel: 'Client',
      clientValue: '',
      clientIsValid: false,
      productLabel: 'Product',
      productValue: '',
      productIsValid: false,
      dateLabel: 'Target Date',
      dateValue: new Date().getTime().toString(),
      dateIsValid: true,
      bsStyle: null,
      ticketUrlValue: '',
      ticketUrlLabel: 'Ticket URL',
      ticketUrlIsValid: false,
      descriptionValue: '',
      labelStyle: {marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#000'}
    };
  }

  onTitleChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      titleValue: newValue,
      titleIsValid: newValue.length > 2,
      titleBsStyle: null,
      titleLabel: 'Title'
    });
  }


  onDescriptionChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      descriptionValue: newValue,
    });
  }

  onClientChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      clientValue: newValue,
      clientIsValid: newValue,
      clientBsStyle: null,
      clientLabel: 'Client'
    });
  }

  onProductChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      productValue: newValue,
      productIsValid: newValue,
      productBsStyle: null,
      productLabel: 'Product'
    });
  }

  onDateChange = (event) => {
    const dateIsValid = event !== 'Invalid date';
    const baseLabelStyle = {marginBottom: '5px', fontWeight: 'bold', fontSize: '14px'};
    const fontColor = dateIsValid ? '#000' : '#a94442';
    const labelStyle = Object.assign(baseLabelStyle, {color: fontColor});
    this.setState({
      dateValue: event,
      dateIsValid: dateIsValid,
      dateBsStyle: null,
      labelStyle: labelStyle,
      dateLabel: 'Target Date'
    });
  }

  onPriorityChange = (event) => {
    const newValue = event.target.value;
    const isInt = /^\+?(0|[1-9]\d*)$/.test(newValue);
    if (isInt || newValue === '') {
      this.setState({
        priorityValue: newValue,
        priorityIsValid: newValue.length >= 1,
        priorityBsStyle: null,
        priorityLabel: 'Priority'
      });
    }
  }

  onUrlChange = (event) => {
    const newValue = event.target.value;
    const isValid = newValue.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    this.setState({
      ticketUrlValue: newValue,
      ticketUrlIsValid: isValid ? true : false,
      ticketUrlBsStyle: null,
      ticketUrlLabel: 'Ticket URL'
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const inputValid = [this.state.titleIsValid, this.state.priorityIsValid, this.state.clientIsValid, this.state.productIsValid, this.state.dateIsValid, this.state.ticketUrlIsValid];

    if (inputValid.every((input) => {return input;})) {
      const formData = {
        title: this.state.titleValue,
        description: this.state.descriptionValue,
        priority: this.state.priorityValue,
        client: this.state.clientValue,
        product: this.state.productValue,
        date: this.state.dateValue,
        ticketUrl: this.state.ticketUrlValue
      };
      this.props.postRequest(formData);
    } else {
      this.setState({
        titleBsStyle: this.state.titleIsValid ? 'success' : 'error',
        titleLabel: this.state.titleIsValid ? 'Title' : 'Title must contain at least 3 characters',
        priorityBsStyle: this.state.priorityIsValid ? 'success' : 'error',
        priorityLabel: this.state.priorityIsValid ? 'Priority' : 'Priority is required',
        clientBsStyle: this.state.clientIsValid ? 'success' : 'error',
        clientLabel: this.state.clientIsValid ? 'Client' : 'Please select a client',
        productBsStyle: this.state.productIsValid ? 'success' : 'error',
        productLabel: this.state.productIsValid ? 'Product' : 'Select a product',
        ticketUrlBsStyle: this.state.ticketUrlIsValid ? 'success' : 'error',
        ticketUrlLabel: this.state.ticketUrlIsValid ? 'Ticket URL' : 'Enter a valid URL',
        dateLabel: this.state.dateIsValid ? 'Target Date' : 'YYYY-MM-DD is required'
      });
    }
  }

  renderForm() {
    return (
      <div>
        <Row className="show-grid">
          <Col sm={3} smPush={3} md={4} mdPush={3}>
            <Input bsStyle={this.state.titleBsStyle} label={this.state.titleLabel} placeholder="Request title" type="text" value={ this.state.titleValue } ref="inputTitle" onChange={this.onTitleChange}/>
          </Col>
          <Col sm={3} smPush={3} md={2} mdPush={3}>
            <Input type="select" bsStyle={this.state.clientBsStyle} label={this.state.clientLabel} placeholder="Select a client" onChange={this.onClientChange}>
              <option value="">Select a client</option>
              <option value="a">Client A</option>
              <option value="b">Client B</option>
              <option value="c">Client C</option>
            </Input>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col sm={4} smPush={3} md={4} mdPush={3}>
            <div style={ {marginBottom: '10px'} }>
              <div style={this.state.labelStyle}>{ this.state.dateLabel }</div>
              <DateTimeField mode={'date'} inputFormat="YYYY-MM-DD" onChange={this.onDateChange}/>
            </div>
          </Col>
          <Col sm={2} smPush={3} md={2} mdPush={3}>
            <Input bsStyle={this.state.priorityBsStyle} label={this.state.priorityLabel} placeholder="Priority number" type="number" value={ this.state.priorityValue } ref="inputPriority" onChange={this.onPriorityChange} />
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} sm={4} smPush={3}>
            <Input type="select" bsStyle={this.state.productBsStyle} label={this.state.productLabel} placeholder="Select a product" onChange={this.onProductChange}>
              <option value="">Select a product</option>
              <option value="policies">Policies</option>
              <option value="billing">Billing</option>
              <option value="claims">Claims</option>
              <option value="reports">Reports</option>
            </Input>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} sm={6} smPush={3}>
            <Input type="textarea" label="Description" placeholder="Description" onChange={ this.onDescriptionChange }/>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} sm={6} smPush={3}>
            <Input bsStyle={this.state.ticketUrlBsStyle} label={this.state.ticketUrlLabel} placeholder="Ticket URL" type="text" ref="inputTicketUrl" onChange={this.onUrlChange} />
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles.homeContainer}>
        <form bsStyle={this.state.priorityBsStyle} className={styles.formGroup} onSubmit={this.onSubmit}>
          <Grid>
            { this.renderForm() }
            <Row className="show-grid">
              <Col xs={6} sm={6} smPush={3}>
                <Button bsStyle="primary" onClick={this.onSubmit}>Save Request</Button>
              </Col>
            </Row>
          </Grid>
        </form>
      </div>
    );
  }
}
