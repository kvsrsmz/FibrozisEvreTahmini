import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoBar from "../components/PersonalInfoBar";

const FormPage = () => {
  const navigate = useNavigate();

  // State'ler
  const [tc, setTc] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [ast, setAst] = useState("");
  const [alt, setAlt] = useState("");

  const handleSubmit = () => {
    const hastaVerisi = {
      tc,
      name,
      surname,
      age,
      labValues: {
        AST: ast,
        ALT: alt,
      },
    };

    navigate("/result", { state: hastaVerisi });
  };

  return (
    <div>
      <PersonalInfoBar />

      <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
        {/* Sol taraf */}
        <div style={{ flex: 1, backgroundColor: "#f5f5f5" }}></div>

        {/* Sağ taraf */}
        <div
          style={{
            flex: 1,
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "flex-start",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Başlık: Kişisel Bilgiler */}
          <h2 style={{ fontSize: "20px", marginBottom: "0", color: "#333" }}>
            Kişisel Bilgiler
          </h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Field label="T.C." value={tc} onChange={setTc} />
            <Field label="İsim" value={name} onChange={setName} />
            <Field label="Soyisim" value={surname} onChange={setSurname} />
            <Field label="Yaş" value={age} onChange={setAge} type="number" />
          </div>

          {/* Başlık: Kan Değerleri */}
          <h2 style={{ fontSize: "20px", marginBottom: "0", color: "#333" }}>
            Kan Değerleri
          </h2>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <Field label="AST" value={ast} onChange={setAst} type="number" />
            <Field label="ALT" value={alt} onChange={setAlt} type="number" />
          </div>

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
              cursor: "pointer",
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
