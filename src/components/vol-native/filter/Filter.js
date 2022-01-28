import React from "react";

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }
  onHandleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
    event.preventDefault();
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="input-group  m-3">
        <input
          type="text"
          className="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={inputValue}
          onChange={this.onHandleChange}
        />
        <button
          onClick={() => this.props.onGettingInputValue(inputValue)}
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2">
          Filter
        </button>
      </div>
    );
  }
}
