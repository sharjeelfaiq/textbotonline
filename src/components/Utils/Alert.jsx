import React from "react";
import "../css/Alert.css"

function Alert(props) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="alert-div">
      {props.alert &&
      <div
        className={`alert alert-box alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong className="alert-text">
          {capitalizeFirstLetter(props.alert.type)}
        </strong>{" "}
        {props.alert.msg}
      </div>}
    </div>
  );
}

export default Alert;
