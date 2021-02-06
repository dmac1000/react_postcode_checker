import React from "react";

class Form extends React.Component {
  render() {
    return (
      <form className="form" onSubmit={this.props.loadAPI}>
        <br />
        <input
          className={"postcode_input"}
          type="text"
          name="postcode"
          placeholder="Postcode..."
          defaultValue={this.props.postcode}
          data-testid="form_postcode"
        />
        <br />
        <br />
        <div className={"postcode_buttons_container"}>
          <button
            type="submit"
            className={"btn btn-outline-success postcode_button"}
            data-testid="form_button"
          >
            Validate Postcode
          </button>
        </div>
        <br />
      </form>
    );
  }
}

export default Form;
