import React, { Component } from "react";
import { getMedicine, createMedicine } from "../../actions/medicineActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
class UpdateMedicine extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      expirationDate: "",
      place: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { id, name, expirationDate, place } = nextProps.medicine;

    this.setState({ id, name, expirationDate, place });
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getMedicine(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const updateMedicine = {
      id: this.state.id,
      name: this.state.name,
      expirationDate: this.state.expirationDate,
      place: this.state.place
    };

    this.props.createMedicine(updateMedicine, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Medicine</h5>
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
                    className="form-control form-control-lg"
                    placeholder="Expiration Date"
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
                    placeholder="Place"
                    name="place"
                    value={this.state.place}
                    onChange={this.onChange}
                  />
                  {errors.description && (
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
UpdateMedicine.propTypes = {
  getMedicine: PropTypes.func.isRequired,
  createMedicine: PropTypes.func.isRequired,
  medicine: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  medicine: state.medicine.medicine,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getMedicine, createMedicine }
)(UpdateMedicine);
