import React from "react";

const PersonalInfoBar = () => {
  return (
    <div style={{
      backgroundColor: "#4CAF50",
      padding: "20px",
      color: "white",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    }}>
      <button
        style={{
          backgroundColor: "#fff",
          color: "black",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          fontWeight: "bold",
          fontSize: "14px",
          cursor: "pointer"
        }}
      >
        Giriş Yap
      </button>
    </div>
  );
};

export default PersonalInfoBar;
