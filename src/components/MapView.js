import React, { Component } from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

class MapView extends Component {

  render() {

    return ( 
      <div className="map_container">

        
        <h3>{this.props.latitude}</h3>
        <h3>{this.props.longitude}</h3>

        <LeafletMap 
        // 
         //center ={[55.024808, -7.256165]}
        //center = {this.props.latitude, this.props.longitude }
        zoom ={16}
        > 
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        /> 
        </LeafletMap>
     </div>
    );
  }
}

export default MapView;