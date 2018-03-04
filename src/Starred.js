import React, { Component } from "react";

const apiUrl = "http://localhost:6969/starred/"


class Starred extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starredRest: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(apiUrl + "all", { accept: 'application/json' })
      .then(response => response.json())
      .then(data => this.setState({ starredRest: data }));
  }

  handleChange(event) {
    var name = "all"
    if(event.target.value !== "") {
      name = event.target.value
    }
    fetch(apiUrl + name, { accept: 'application/json' })
    .then(response => response.json())
    .then(data => this.setState({ starredRest: data }));
  }

  render() {
    const { starredRest } = this.state;
    return (
      <div>
        <h2>Starred restaurants</h2>
        <p>On this tab, you can find the list of starred restaurants in France !</p>
        <span>
          <input id="nameInput" type="text" placeholder="Filter the list by name" onChange={this.handleChange} />
        </span>

        <ul>
          {starredRest.map(rest =>
            <li key={rest._id}>
              <h3>{rest.name}</h3>
              <p>{rest.address}</p>
              <p>{rest.priceRange}</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
 
export default Starred;