import React, { Component } from "react";

const apiUrl = "http://localhost:6969/starred"


class Starred extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starredRest: [],
    };
  }

  componentDidMount() {
    fetch(apiUrl, { accept: 'application/json' })
      .then(response => response.json())
      .then(data => this.setState({ starredRest: data }));
  }

  render() {
    const { starredRest } = this.state;
    return (
      <div>
        <h2>Starred restaurants</h2>
        <p>On this tab, you can find the list of starred restaurants in France !</p>

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