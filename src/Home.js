import React, { Component } from "react";
 
class Home extends Component {
  render() {
    return (
      <div>
        <div className="home_text">
          <h2>Welcome on Top Chef website !</h2><br></br>
            <p>
              If you're on this website, you are a real food lover, like me ! You'll be able to find 
              a complete list of starred restaurants in France which is always up-to-date. Several information
              are available to help you choose the right one ! 
            </p>
            <br></br>
            <p> And if you love your money too, we provide you a filtered list of deals available in 
            these starred restaurants right now ! All you have to do is going through our different tabs 
            and make your choice !
            </p> 
        </div>
        <div className="home_picture">
          <img src="/home.jpg" alt="Humoristic pitcure"/>
        </div>
      </div>
    );
  }
}
 
export default Home;