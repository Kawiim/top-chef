import React, { Component } from "react";
 
 const apiUrl = "http://localhost:6969/deals/"

class Deals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deals: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(apiUrl + "all", { accept: 'application/json' })
      .then(response => response.json())
      .then(data => this.setState({ deals: data }));
  }

  handleChange(event) {
    var name = "all"
    if(event.target.value !== "") {
      name = event.target.value
    }
    fetch(apiUrl + name, { accept: 'application/json' })
    .then(response => response.json())
    .then(data => this.setState({ deals: data }));
  }

  render() {
    const { deals } = this.state;
    return (
      <div>
        <h2>Deals</h2>
        <p>The latest deals on starred restaurants in France, just for you !</p>
        <span>
          <input id="nameInput" type="text" placeholder="Filter the list by name" onChange={this.handleChange} />
        </span>

        <ul>
          {deals.map(rest =>
            <li key={rest._id}>
              <h3>{rest.name} <span> {rest.address} </span></h3>
              <ul>
              {rest.deals.map(deal =>
                <li key={deal.id}>
                  <h4> {deal.title} </h4>
                  <p> {deal.exclusions} </p>
                </li>
              )}
              </ul>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
 
export default Deals;