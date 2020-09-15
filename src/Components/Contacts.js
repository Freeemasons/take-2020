import React from "react";
import {Row, Grid, Col} from "react-flexbox-grid";


 const ContactItem = (props) => {
  console.log('props', props);
  const { contact } = props;

     return (
       <li className="contact">
         <img className="contact-image"
              src={contact.image}
              width="60px"
              height="60px" />
         <div className="contact-info">
           <div className="contact-name"> {contact.name} </div>
           <div className="contact-number"> {contact.phoneNumber} </div>
         </div>
       </li>
     );
   }

class Contacts extends React.Component {
  constructor() {
    super();
    this.state = {
      displayedContacts: [],
      loading: false
    }

    this.handleSearch = this.handleSearch.bind(this)

  }

  componentDidMount() {


    const requestUrl = 'http://localhost:3000/contacts'

    const response = fetch(requestUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          displayedContacts: data, loading: true
        })
      }

  )
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
      return <ContactItem testProp={i}
                          contact={contact}
                          key={contact.id}/>
    })


    return(
      <Grid>
        <Row>
          <Col>
            <div className="contacts">
              <input type="text"
                     placeholder="Search..."
                     className="search-field"
                     onChange={this.handleSearch}
              />
              <ul className="contacts-list">
                {list}
              </ul>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Contacts;
