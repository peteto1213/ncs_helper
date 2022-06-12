import React from "react";

function Spinner() {
  return (
    <div className="loadingSpinnerContainer">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
