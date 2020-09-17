import React from "react";
import {Row, Grid, Col} from "react-flexbox-grid";


 const ContactItem = (props) => {
  const { contact, handleDeleteUser } = props;
  const handleDelete = () => handleDeleteUser(contact.id)


     return (
       <li className="contacts__link">
         <img className="contacts__image"
              src={contact.image}
              width="60px"
              height="60px" />
         <div className="contacts-info-layout">
           <div className="contacts__name"> {contact.name} </div>
           <div className="contacts-info">
             <div className="contacts__number"> {contact.phoneNumber}</div>
           </div>
         </div>
         <div className="delete-contact-btn"
              onClick={handleDelete}>X</div>
       </li>
     );
   }

class Contacts extends React.Component {
  constructor() {
    super();
    this.state = {
      displayedContacts: [],
      loading: false,
      value: '',
      contactName: '',
      contactNumber: '',
      contactImage: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddContact = this.handleAddContact.bind(this);
    this.handleSubmitContact = this.handleSubmitContact.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
  }

  componentDidMount() {

    const requestUrl = 'http://localhost:3000/contacts'

    const response = fetch(requestUrl)
      .then(res => res.json())
      .then(data => {
        this.setState({
          displayedContacts: data, loading: true
        })
      }
    )
  }

  handleSubmitContact(e) {

    console.log(e.target.value)
    e.preventDefault();

    const newId = this.state.displayedContacts.length + 1
    console.log(newId)

    const newUser = JSON.stringify({
      name: this.state.contactName,
      phoneNumber: this.state.contactNumber,
      image: this.state.contactImage,
      id: newId
    })

    fetch('http://localhost:3000/contacts', {
      method: 'POST',
      body: newUser,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res => res.json())
      .then(data => {
        console.log('result', data)

        this.setState((prevState)=> ({
          displayedContacts: [...prevState.displayedContacts, data]
        }))
      })
  }

  handleAddContact(e) {

    console.log(e.target.value)

    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleDeleteUser(id) {

    fetch(`http://localhost:3000/contacts/${id}`, {
    method: 'DELETE',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(() => {

        this.setState({
          displayedContacts:  this.state.displayedContacts.filter(contact => contact.id !== id)
        })
      })
  }


  handleSearch(e) {
    const searchQuery = e.target.value.toLowerCase();

    const filteredContacts = this.state.displayedContacts.filter(function(el) {
      const searchValue = el.name.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });

    this.setState({
      displayedContacts: filteredContacts
    })
  }


  render() {

    const list = this.state.displayedContacts.map((contact, i) => {
      return <ContactItem contact={contact}
                          key={contact.id}
                          handleDeleteUser={this.handleDeleteUser}/>
    })

    return(
      <Grid>
        <Row >
          <Col lg={6}>
            <div className="contacts">
              <input type="text"
                     placeholder="Search..."
                     className="contacts__search-field"
                     onChange={this.handleSearch}
              />
              <ul className="contacts__list">
                {list}
              </ul>
            </div>
          </Col>
          <Col lg={6}>

            <form action=""
                  className="contacts-form"
                  onSubmit={this.handleSubmitContact}>

              <input type="submit"
                     value="SubmitContact"
                     className="contacts-form-submit-btn"

              />
              <label>
                <input type="text"
                       name="contactName"
                       className="contacts-form__input"
                       placeholder="Name and Surname"
                       value={this.state.contactName}
                       onChange={this.handleAddContact}
                        />
              </label>
              <label>
                <input type="text"
                       name="contactNumber"
                       className="contacts-form__input"
                       placeholder="Tel"
                       value={this.state.contactNumber}
                       onChange={this.handleAddContact}
                        />
              </label>
              <label>
                <input type="text"
                       name="contactImage"
                       className="contacts-form__input"
                       placeholder="Image url"
                       value={this.state.contactImage}
                       onChange={this.handleAddContact}
                />
              </label>
            </form>

          </Col>

        </Row>
      </Grid>
    )
  }
}

export default Contacts;
