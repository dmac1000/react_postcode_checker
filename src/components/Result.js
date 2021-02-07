import React from "react";

class Result extends React.Component {
  render() {
    return (
      <div className="result_container">
        <h4>{this.props.error}</h4>
        <h5>{this.props.european_electoral_region}</h5>
        <h5><b>Location: </b>{this.props.selectedLocation}</h5>     
        <h5><b>Zoom:</b> {this.props.selectedZoom}</h5>     
      </div>
    );
  }
}

export default Result;
