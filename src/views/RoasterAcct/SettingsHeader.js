import React from "react";
import "./Settings.css";

// reactstrap components

// core components

function SettingsHeader() {
  return (
    <>
      <div
        className="page-header-xs settings-background settings-header"
        style={{
          backgroundImage:
            "url(" +
            require("assets/img/Espresso.jpg").default +
            ")",
        }}
      >
        <div className="filter" />
      </div>
    </>
  );
}

export default SettingsHeader;
