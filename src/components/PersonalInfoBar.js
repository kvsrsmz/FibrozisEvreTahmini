import React from "react";

const PersonalInfoBar = () => {
  return (
    <div
      style={{
        backgroundColor: "#2E7D32",
        padding: "10px 30px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100vw",
        boxSizing: "border-box",
      }}
    >
      {/* Sol: Logo */}
      <img
        src="/images/istun_logo.png"
        alt="İstun Logo"
        style={{
          height: "40px",
          transform: "scale(1.8)",
          transformOrigin: "left center",
        }}
      />

      {/* Orta: Metin */}
      <div
        style={{
          flex: 1,
          textAlign: "center",
          fontStyle: "italic",
          fontSize: "20px",
          color: "#ffffff",
        }}
      >
        "Erken teşhis hayat kurtarır!"
      </div>

      {/* Sağ: Giriş Yap Butonu */}
      <button
        style={{
          backgroundColor: "#fff",
          color: "black",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          fontWeight: "bold",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Giriş Yap
      </button>
    </div>
  );
};

export default PersonalInfoBar;
