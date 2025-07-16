import React from "react";

const PersonalInfoBar = () => {
  const handleLogout = () => {
    alert("Çıkış yapılıyor...");
    // İstersen burada logout işlemleri veya yönlendirme yapabilirsin
  };

  return (
    <div
      style={{
        backgroundColor: "#2E7D32", // yeşil arka plan
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
          color: "#fff",
        }}
      >
        "Erken teşhis hayat kurtarır!"
      </div>

      {/* Sağ: Çıkış Yap Butonu */}
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#cc0000", // kırmızı buton
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          fontWeight: "bold",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Çıkış Yap
      </button>
    </div>
  );
};

export default PersonalInfoBar;
