import React from "react";
import {Row, Grid, Col} from "react-flexbox-grid";


 const ContactItem = (props) => {
  const { contact } = props;

     return (
       <li className="contacts__link">
         <img className="contacts__image"
              src={contact.image}
              width="60px"
              height="60px" />
         <div className="contacts__info-layout">
           <div className="contacts__name"> {contact.name} </div>
           <div className="contacts__number"> {contact.phoneNumber} </div>
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
        <Row center="lg">
          <Col>
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
        </Row>
      </Grid>
    )
  }
}

export default Contacts;
