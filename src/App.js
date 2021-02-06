import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import Title from "./components/Title";
import Form from "./components/Form";
import Result from "./components/Result";
import MapView from "./components/MapView";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      heading: "Postcode Checker",
      subheading: "Enter a Postcode to validate it !",
      postcode: undefined,
      european_electoral_region: undefined,
      latitude: 56.024808,
      longitude: -7.256165,
    //  latitude: undefined,
    //  longitude: undefined,
      error: undefined
    };
  }

  // get postcode input, send to apis and return result. If valid call mapAPI
  callPostcodeAPI = async (event) => {
    event.preventDefault(); // stops page refresh as the form would submit
    const postcode = event.target.elements.postcode.value;

    if (postcode) {
      const call = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      const response = await call.json();

      if (call.ok) {
        this.setState({
          european_electoral_region: response.result.european_electoral_region,
          latitude: response.result.latitude,
          longitude: response.result.longitude,
          error: ""
        });
      } else {
        this.setState({
          error: "Error Postcode not Found"
        });
      }
    } else {
      // error handling
      this.setState({
        error: "An error has occured with API call"
      });
    }
  };


  render() {
    return (
      <div className="postcode-body">
        <Title
          heading={this.state.heading}
          subheading={this.state.subheading}
        />
        <Form loadAPI={this.callPostcodeAPI} />
        <Result
          european_electoral_region={this.state.european_electoral_region}
          //latitude={this.state.latitude}
         // longitude={this.state.longitude}
          error={this.state.error}
        />
        
        <MapView
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          
        />
      </div>
    );
  }
}

export default App;

