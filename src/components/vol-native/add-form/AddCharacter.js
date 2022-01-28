import React from "react";

export default class AddCharacter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      valueName: "",
      valueGender: "",
      valueCulture: "",
      valueBorn: "",
      valueDied: "",
    };
  }

  onHandleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm,
    });
  };

  changeValueName = (e) => {
    this.setState({
      valueName: e.target.value,
    });
  };

  changeValueGender = (e) => {
    this.setState({
      valueGender: e.target.value,
    });
  };

  changeValueCulture = (e) => {
    this.setState({
      valueCulture: e.target.value,
    });
  };

  changeValueBorn = (e) => {
    this.setState({
      valueBorn: e.target.value,
    });
  };

  changeValueDied = (e) => {
    this.setState({
      valueDied: e.target.value,
    });
  };

  onInputValueChange = (e) => {
    const { valueName, valueGender, valueCulture, valueBorn, valueDied } =
      this.state;
    this.props.onAddCharacter({
      valueName,
      valueGender,
      valueCulture,
      valueBorn,
      valueDied,
    });
    this.setState({
      valueName,
      valueGender,
      valueCulture,
      valueBorn,
      valueDied,
    });
    e.preventDefault();
  };

  render() {
    const { showForm } = this.state;

    const renderForm = showForm ? (
      <form className="row g-1 m-1" onSubmit={this.onInputValueChange}>
        <div className="col-sm">
          <p className="text-center fs-7">Name</p>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={this.state.valueName}
            onChange={this.changeValueName}
          />
        </div>
        <div className="col-sm">
          <p className="text-center fs-7">Gender</p>
          <input
            type="text"
            className="form-control"
            placeholder="Gender"
            value={this.state.valueGender}
            onChange={this.changeValueGender}
          />
        </div>
        <div className="col-sm">
          <p className="text-center fs-7">Culture</p>
          <input
            type="text"
            className="form-control"
            placeholder="Culture"
            value={this.state.valueCulture}
            onChange={this.changeValueCulture}
          />
        </div>
        <div className="col-sm">
          <p className="text-center fs-7">Born</p>
          <input
            type="text"
            className="form-control"
            placeholder="Born"
            value={this.state.valueBorn}
            onChange={this.changeValueBorn}
          />
        </div>
        <div className="col-sm">
          <p className="text-center fs-7">Died</p>
          <input
            type="text"
            className="form-control"
            placeholder="Died"
            value={this.state.valueDied}
            onChange={this.changeValueDied}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-outline-info m-3">
            Отправить форму
          </button>
        </div>
      </form>
    ) : (
      <button
        type="button"
        className="btn btn-outline-info m-3"
        onClick={() => this.onHandleShowForm()}>
        Добавить
      </button>
    );

    return <>{renderForm}</>;
  }
}
