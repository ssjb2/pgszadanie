import React from "react";
import { Link } from "react-router-dom";
const CreateMedicineButton = () => {
  return (
    <React.Fragment>
      <Link to="/addMedicine" className="btn btn-lg btn-info">
        Create a Medicine
      </Link>
    </React.Fragment>
  );
};
export default CreateMedicineButton;
