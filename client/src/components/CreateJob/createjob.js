import React, { Component } from "react";
import Jumbotron from "../Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";

import { Input, TextArea, FormBtn } from "../Form";
import { Redirect } from "react-router-dom";
import ListJobs from "../ListJobs";

class CreateJob extends Component {
  state = {
    jobs: [],
    title: "",
    description: "",
    budget: 0,
    status: ""
  };

  componentDidMount() {
    if (this.props.loggedIn) {
      this.loadJobs();
    }
  };

  loadJobs = () => {
    API.getAllJobs()
      .then(res =>
        this.setState({
          jobs: res.data,
          title: "",
          description: "",
          budget: ""
        })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.description) {
      API.getCreateJob({
        title: this.state.title,
        description: this.state.description,
        budget: this.state.budget
      })
        .then(res => this.loadJobs())
        .catch(err => console.log(err));
    }
  };

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div>
          <h1>{this.props.email}</h1>
          <Container fluid>
            <Row>
              <Col size="md-6">
                <Jumbotron>
                  <h1>Create Job</h1>
                </Jumbotron>
                <form>
                  <Input
                    type="text"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                  />
                  <TextArea
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    name="description"
                    placeholder="Description (required)"
                  />
                  <Input
                    type="number"
                    value={this.state.budget}
                    onChange={this.handleInputChange}
                    name="budget"
                    placeholder="Budget (Optional)"
                  />
                  <FormBtn
                    disabled={!(this.state.description && this.state.title)}
                    onClick={this.handleFormSubmit}
                  >
                    Submit Job
                  </FormBtn>
                </form>
              </Col>
              <Col size="md-6 sm-12">
                <Jumbotron>
                  <h1>Job List</h1>
                </Jumbotron>
                {this.state.jobs.length ? (
                  <ListJobs jobs={this.state.jobs}/>
                ) : (
                    <h3>No Results to Display</h3>
                )}
              </Col> 
            </Row>
          </Container>
          </div>
      );
    }
  };
}

export default CreateJob;