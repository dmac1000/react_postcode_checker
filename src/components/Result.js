import React from "react";

class Result extends React.Component {
  render() {
    return (
      <div className="result_container">
        <h3>{this.props.error}</h3>
        <h3>{this.props.european_electoral_region}</h3>
        <h3>{this.props.latitude}</h3>
        <h3>{this.props.longitude}</h3>
        <h3>{this.props.currentLocation}</h3>     
        <h3>{this.props.currentZoom}</h3>     
      </div>
    );
  }
}

export default Result;
