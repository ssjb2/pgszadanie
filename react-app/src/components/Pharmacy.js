import React, { Component } from "react";
import MedicineItem from "./Medicine/MedicineItem";
import CreateMedicineButton from "./Medicine/CreateMedicineButton";
import { connect } from "react-redux";
import { getMedicines } from "../actions/medicineActions";
import PropTypes from "prop-types";

class Pharmacy extends Component {
  componentDidMount() {
    this.props.getMedicines();
  }

  render() {
    const medicines = this.props.medicine.medicines;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Medicines</h1>
              <br />
              <CreateMedicineButton />
              <br />
              <hr />
            </div>
            {medicines.map(medicine => (
              <MedicineItem key={medicine.id} medicine={medicine} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
Pharmacy.propTypes = {
  medicine: PropTypes.object.isRequired,
  getMedicines: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  medicine: state.medicine
});
export default connect(
  mapStateToProps,
  { getMedicines }
)(Pharmacy);
