import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoBar from "../components/PersonalInfoBar";

const FormPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  // Şimdilik sabit veriler (ileride bu veriler state'ten alınacak)
  const hastaVerisi = {
    name: "Ayşe Yılmaz",
    age: 45,
    gender: "Kadın",
  };

  const handleSubmit = () => {
    navigate("/result", { state: hastaVerisi });
  };

  return (
    <div>
      <PersonalInfoBar />

      <div style={{ flex: 1, display: "flex" }}>
        {/* Sol taraf (şimdilik boş) */}
        <div style={{ width: "50%", backgroundColor: "#f5f5f5" }}></div>

        {/* Sağ taraf */}
        <div style={{
          width: "50%",
          backgroundColor: "#ffffff",
          borderLeft: "1px solid #ccc",
          padding: "40px"
        }}>
          <LabValuesForm />
          <button
            onClick={handleSubmit}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              fontSize: "16px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Tahmin Et
          </button>
        </div>
      </div>
    </div>
  );
};

// Ortak input bileşeni
const Field = ({ label, value, onChange, type = "text" }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "14px",
        width: "150px",
      }}
      placeholder={`${label} giriniz`}
    />
  </div>
);

export default FormPage;
