import React from "react";
import {Row, Grid, Col} from "react-flexbox-grid";


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

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const requestUrl = `http://localhost:3000/user?name=${this.state.name}&password=${this.state.password}`

    fetch(requestUrl)
      .then(res => res.json())
      .then(data => {
        if (data.length) {
          this.props.history.push('/contacts')
        }
      })
  }


  render() {
    return(
        <div className="form-layout">
          <Grid>
            <Row center="lg"
                 middle="xs">
              <Col
                   lg={6}
                   md={6}
                   xs={12}>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Name:
                    <input type="text"
                           name="name"
                           className="form__input-authorisation"
                           value={this.state.name}
                           onChange={this.handleChange} />
                  </label>
                  <label>
                    Password:
                    <input type="text"
                           name="password"
                           className="form__input-authorisation"
                           value={this.state.password}
                           onChange={this.handleChange} />
                  </label>
                    <input type="submit"
                           value="Submit"
                           className="submit-btn"/>
                </form>
              </Col>
            </Row>
          </Grid>
        </div>
    )
  }
}

export default Form;
