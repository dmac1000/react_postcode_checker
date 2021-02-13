import React from "react";

class Result extends React.Component {
  render() {
    return (
      <div className="result_container">
        <h4>{this.props.error}</h4>  
      </div>
    );
  }
}

export default Result;
