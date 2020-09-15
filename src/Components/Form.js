import React from "react";
import {Row, Grid, Col} from "react-flexbox-grid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Contacts from "./Contacts";




class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      name: '',
      password: ''
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  data = [
    { "name": "typicode", "password": "111" }
  ];



  handleChange(event) {
    console.log(event.target.value)

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const requestUrl = `http://localhost:3000/user?name=${this.state.name}&password=${this.state.password}`

    const response = fetch(requestUrl)
      .then(res => res.json())
      .then(data => {
          console.log('result', data)
        if (data.length) {
          this.props.history.push('/contacts')
        }
      })
  }





  render() {


    return(

        <div className="form-layout">
          <Grid>
            <Row center="lg" middle="xs">
              <Col lg={6} xs={12}>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Name:
                    <input type="text"
                           name="name"
                           className="input-authorisation"
                           value={this.state.name}
                           onChange={this.handleChange} />
                  </label>
                  <label>
                    Password:
                    <input type="text"
                           name="password"
                           className="input-authorisation"
                           value={this.state.password}
                           onChange={this.handleChange} />
                  </label>


                  <input type="submit"
                         value="Submit"
                         className="submit-btn"/>
                  <div>
                    <Link to="/contacts">About</Link>
                  </div>
                </form>
              </Col>
            </Row>

          </Grid>
        </div>

    )
  }
}

export default Form;
