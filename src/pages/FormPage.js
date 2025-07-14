import React from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoBar from "../components/PersonalInfoBar";
import LabValuesForm from "../components/LabValuesForm";

const FormPage = () => {
  const navigate = useNavigate();

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
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
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
              marginTop: "30px",
              padding: "12px 24px",
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

export default FormPage;
