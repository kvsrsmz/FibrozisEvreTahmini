import React from "react";

const PersonalInfoBar = () => {
  return (
    <div style={{
      backgroundColor: "#2E7D32",
      padding: "20px",
      color: "white",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100vw",     // tam ekran genişliği
      margin: "0",         // kenar boşluğu yok
      boxSizing: "border-box"
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
          marginRight: "70px",
          cursor: "pointer"
        }}
      >
        Giriş Yap
      </button>
    </div>
  );
};

export default PersonalInfoBar;
