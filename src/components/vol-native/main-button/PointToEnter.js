import React from "react";

const Button = (props) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => props.onShowData()}
        className="btn btn-outline-primary btn-lg m-1 mt-5">
        game of Thrones characters
      </button>
    </div>
  );
};

export default Button;
