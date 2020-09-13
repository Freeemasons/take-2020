import React from "react";

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
    this.handleCompare = this.handleCompare.bind(this);
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
    alert('A name was submitted: ' + this.state.name + ' парол '+this.state.password );
    event.preventDefault();


    // let isUserExist = this.data.find((obj)=> {
    //   return obj.name === this.state.name && obj.password === this.state.password
    // })


    const requestUrl = `http://localhost:3000/user?name=${this.state.name}&password=${this.state.password}`

    const response = fetch(requestUrl)
      .then(res => res.json())

    console.log(response)
  }





  render() {


    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text"
                 name="name"
                 value={this.state.name}
                 onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input type="text"
                 name="password"
                 value={this.state.password}
                 onChange={this.handleChange} />
        </label>

        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default Form;
