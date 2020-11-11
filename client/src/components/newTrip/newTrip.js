import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import SideBar from "../sidebar/SideBar";
import Content from "../content/Content";
import { Row, Form, Card, Col, Container, Button } from "react-bootstrap";
import API from "../../utils/API";
import mongoose from "mongoose";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from "react-router-dom";


class NewTrip extends React.Component {
  constructor() {
    super();

    // Moblie first
    this.state = {
      isOpen: false,
      isMobile: true,

      startDate: new Date(),
      endDate: new Date(),

      tripName: "",
      tripLocation: "",

    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.previousWidth = -1;

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e) {
    let value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
    
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.tripName && this.state.tripLocation ) {
      API.saveTrips({
        name: this.state.tripName,
        location: this.state.tripLocation,
        tripLength: this.pickDates(),
      })
        .then(() =>
          this.setState({
            tripName: "",
            tripLocation: "",
            tripDates: "",
          })
        )
        .then(() => {
          console.log("success!"); 
        })
        .catch((err) => console.log(err));
    }
  }
  handleStartChange(date) {
    console.log(date);
    this.setState({
      startDate: date
    })
  }
  handleEndChange(date) {
    console.log(date);
    this.setState({
      endDate: date
    })
  }
  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.startDate);
    console.log(this.state.endDate);
  }

  updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 576;
    const isMobile = width <= widthLimit;
    const wasMobile = this.previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      this.setState({
        isOpen: !isMobile,
      });
    }


    this.previousWidth = width;
  }

  pickDates() {
    var i;
    var startDate = this.state.startDate;
    var endDate = this.state.endDate;
    Date.prototype.addDays = function (days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
    };
    function getDates(startDate, endDate) {
      var dateArray = new Array();
      var currentDate = startDate;
      while (currentDate <= endDate) {
        dateArray.push(currentDate);
        currentDate = currentDate.addDays(1);
      }
      return dateArray;
    }
    var dateArray = getDates(new Date(startDate), new Date(endDate));
    for (i = 0; i < dateArray.length; i++) {
      console.log(dateArray[i]);
    }
    return dateArray;
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth.bind(this));
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="App wrapper">
        <Content toggle={this.toggle} isOpen={this.state.isOpen} />
        <Row>

          <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
          <Col>
            <Container>
              {/* Stack the columns on mobile by making one full-width and the other half-width */}

              <Row className="mt-3">
                <Col xs={12} sm={12} md={12} lg={6}>
                  <Card className="shadow">
                    <Card.Body>
                      <div>
                        <Card.Title>
                          <strong>Join</strong>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          If a trip has already been created, enter its unique
                        trip code{" "}
                        </Card.Subtitle>
                        <Form>
                          <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" placeholder="Trip Code" />
                          </Form.Group>
                        </Form>
                        <Button variant="primary">Join Trip</Button>{" "}
                        {/* <Button variant="primary">Request Payment</Button>
      <Button variant="primary">Split Expense</Button> */}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6}>
                  <Card className="shadow">
                    <Card.Body>
                      <div>
                        <Card.Title>
                          <strong>Create</strong>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          placeholder text
                      </Card.Subtitle>
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Group
                            id="tripName"

                            onChange={this.handleInputChange}
                            value={this.state.tripName}
                          >
                            <Form.Control type="text" placeholder="Event Name" name="tripName" />
                          </Form.Group>
                          <Form.Group
                            id="tripLocation"

                            onChange={this.handleInputChange}
                            value={this.state.tripLocation}
                          >
                            <Form.Control type="text" placeholder="Location" name="tripLocation" />
                          </Form.Group>

                          <Form.Group controlId="startDate">
                            <h6>Start Date</h6>
                            <form onSubmit={this.onFormSubmit}>
                              <div className="form-group">
                                <DatePicker
                                  className="form-control"
                                  selected={this.state.startDate}
                                  onChange={this.handleStartChange}
                                  name="startDate"
                                  dateFormat="MM/dd/yyyy"
                                />
                                {/* <button className="btn btn-dark">Show Date</button> */}
                              </div>
                            </form>
                          </Form.Group>
                          <Form.Group controlId="endDate">
                          <h6>End Date</h6>
                            <form onSubmit={this.onFormSubmit}>
                              <div className="form-group">
                                <DatePicker
                                  className="form-control"
                                  selected={this.state.endDate}
                                  onChange={this.handleEndChange}
                                  name="endDate"
                                  dateFormat="MM/dd/yyyy"
                                />
                                {/* <button className="btn btn-dark">Show Date</button> */}
                              </div>
                            </form>
                          </Form.Group>
                          <Button variant="primary" type="submit" >Create Trip</Button>{" "}
                        </Form>

                        {/* <Button variant="primary">Request Payment</Button>
      <Button variant="primary">Split Expense</Button> */}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
            </Container>
          </Col>
        </Row>


      </div>
    );
  }
}

export default NewTrip;
