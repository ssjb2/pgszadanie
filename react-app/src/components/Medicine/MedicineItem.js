import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteMedicine } from "../../actions/medicineActions";

class MedicineItem extends Component {
  onDeleteClick = id => {
    this.props.deleteMedicine(id);
  };
  render() {
    const { medicine } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{medicine.name}</h3>
              <p>{medicine.place}</p>
              <p>{medicine.expirationDate}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/updateMedicine/${medicine.id}`}>
                  <li className="list-group-item update">
                    <i className="text-primary"> Update</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, medicine.id)}
                >
                  <i className="text-danger"> Delete </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MedicineItem.propTypes = {
  deleteMedicine: PropTypes.func.isRequired
};
export default connect(
  null,
  { deleteMedicine }
)(MedicineItem);
