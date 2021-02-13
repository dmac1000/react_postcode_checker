import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'leaflet/dist/leaflet.css';

// default icon fix 
// https://github.com/ghybs/leaflet-defaulticon-compatibility
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import React from "react";

import Title from "./components/Title";
import Form from "./components/Form";
import Result from "./components/Result";


// changes the map position to a valid postcode location
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.flyTo(center, zoom,{
    duration: 3
    });
    
  return null;
}


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
      // hard coded default to centre of ireland
      selectedLocation: [53.430073,  -8.035491],
      zoom: 7
    };
  }

  resetStates = () =>{
    this.setState ({
      primary_care_trust: "",
      nhs_ha: "",
      admin_district: "",
      european_electoral_region: ""
    });
  };

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
          zoom:18,
          error: ""
        });
      } else {
        this.setState({
          error: "Error Postcode not Found"
        });
        this.resetStates();
      }
    } else {
      // error handling
      this.setState({
        error: "An error has occured with API call"
      });
      this.resetStates();
    }
  };


  render() {
    return (
      <div className="App">
        <Title
          heading={this.state.heading}
          subheading={this.state.subheading}
        />
        <Form loadAPI={this.callPostcodeAPI} />
        <Result
          error={this.state.error}
        />
        <MapContainer classsName="Map"  center={this.state.selectedLocation} zoom={this.state.zoom}>
              <ChangeView center={this.state.selectedLocation} zoom={this.state.zoom}/>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
              <Marker position={this.state.selectedLocation} >
                <Popup>
                  The location of {this.state.postcode}. <br/> 
                  {this.state.primary_care_trust} {this.state.nhs_ha}. <br/> 
                  {this.state.admin_district}. <br/> 
                  {this.state.european_electoral_region}.
                </Popup>
              </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default App;