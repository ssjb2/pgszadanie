import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createMedicine } from "../../actions/medicineActions";
import classnames from "classnames";
class AddMedicine extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      expirationDate: "",
      place: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newMedicine = {
      name: this.state.name,
      expirationDate: this.state.expirationDate,
      place: this.state.place
    };
    this.props.createMedicine(newMedicine, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Add medicine</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Medicine Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg "
                    placeholder="Expiration date"
                    name="expirationDate"
                    value={this.state.expirationDate}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.place
                    })}
                    placeholder="Medicine Place"
                    name="place"
                    value={this.state.place}
                    onChange={this.onChange}
                  />
                  {errors.place && (
                    <div className="invalid-feedback">{errors.place}</div>
                  )}
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddMedicine.propTypes = {
  createMedicine: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createMedicine }
)(AddMedicine);
