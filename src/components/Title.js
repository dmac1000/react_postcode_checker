import React from "react";

class Title extends React.Component {
  render() {
    return (
      <div className="title_container">
        <h1>{this.props.heading}</h1>
      </div>
    );
  }
}

export default Title;
