import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'leaflet/dist/leaflet.css';
// default icon fix 
// https://github.com/ghybs/leaflet-defaulticon-compatibility
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import React from "react";

import Title from "./components/Title";
import Form from "./components/Form";
import Result from "./components/Result";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      heading: "Postcode Checker",
      subheading: "Enter a Postcode to validate it !",
      postcode: undefined,
      primary_care_trust: undefined,
      nhs_ha: undefined,
      admin_district: undefined,
      european_electoral_region: undefined,
      error: undefined,
      // hard coded to test
      selectedLocation: [53.495849, -7.790033],
      zoom: 7
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
          postcode: response.result.postcode, 
          primary_care_trust: response.result.primary_care_trust, 
          nhs_ha: response.result.nhs_ha,        
          admin_district: response.result.admin_district,
          european_electoral_region: response.result.european_electoral_region,
          selectedLocation: [response.result.latitude, response.result.longitude],
          zoom:18
        });
        // NEED TO GET IT TO REDRAW THE MAP AFTER A VALID POSTCODE !!

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
    // TESTING: getting state
    let {selectedLocation, zoom} = this.state

    return (
      <div className="postcode-body">
        <Title
          heading={this.state.heading}
          subheading={this.state.subheading}
        />
        <Form loadAPI={this.callPostcodeAPI} />
        <Result
          european_electoral_region={this.state.european_electoral_region}
          error={this.state.error}
          //TESTING: to show value of selected Location
          selectedZoom={zoom}
          selectedLocation={selectedLocation}
        />
    
        <LeafletMap center = {selectedLocation} zoom ={zoom} scrollWheelZoom={false} >
          <TileLayer        
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> 
          <Marker position={selectedLocation} >
            <Popup>
                The location of {this.state.postcode}. <br/> 
                {this.state.primary_care_trust} {this.state.nhs_ha}. <br/> 
                {this.state.admin_district}. <br/> 
                {this.state.european_electoral_region}.
            </Popup>
          </Marker>
        </LeafletMap>

      </div>
    );
  }
}

export default App;