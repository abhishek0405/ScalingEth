import React from "react";

function Locker({ src, onClick }) {
  function handleLockerClick(event) {
    // Open the modal for the locker
    // ...
  }

  return (
    <div className="locker" onClick={onClick}>
      <img src={src} alt="Locker" />
    </div>
  );
}
