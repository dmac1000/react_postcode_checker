import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import Title from "./components/Title";
import Form from "./components/Form";
import Result from "./components/Result";
import MapView from "./components/MapView";
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      heading: "Postcode Checker",
      subheading: "Enter a Postcode to validate it !",
      postcode: undefined,
      european_electoral_region: undefined,
      error: undefined,
      // hard coded to test
      latitude: 59.024808,
      longitude: -7.256165,
      currentLocation: [0, 0],
      zoom: 12
    };
  }

  onMoveend (map) {
    this.props.onMoveend(map)
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
         currentLocation: [response.result.latitude, response.result.longitude],

        });
        // NEED TO GET IT TO REDRAW THE MAP AFTER A VALIDATE POSTCODE !!

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
    // TESTING: try as single variable then array
    const {currentLocation, zoom} = this.state
    return (
      <div className="postcode-body">
        <Title
          heading={this.state.heading}
          subheading={this.state.subheading}
        />
        <Form loadAPI={this.callPostcodeAPI} />
        <Result
          european_electoral_region={this.state.european_electoral_region}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          error={this.state.error}
          //TESTING: to show value of currentlocation
          currentLocation={currentLocation}
          // TESTING: Mapview not used
        />
    
        <LeafletMap 
        center = {currentLocation}
        //TESTING: hard coded to test
        //center ={[55.024808, -7.256165]} 
        zoom ={zoom} >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        /> 
        </LeafletMap>
      </div>
    );
  }
}

export default App;

