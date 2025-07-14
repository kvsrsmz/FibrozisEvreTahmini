import React, { useState } from "react";

const PersonalInfoBar = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");

  return (
    <div style={{
      backgroundColor: "#4CAF50",
      padding: "20px",
      color: "white",
      display: "flex",
      justifyContent: "flex-end", // sağa hizalama
      alignItems: "center",
      gap: "20px"
    }}>
      <Field label="İsim" value={name} onChange={setName} />
      <Field label="Soyisim" value={surname} onChange={setSurname} />
      <Field label="Yaş" value={age} onChange={setAge} type="number" />
    </div>
  );
};

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
        border: "none",
        fontSize: "14px",
        width: "150px"
      }}
      placeholder={`${label} giriniz`}
    />
  </div>
);

export default PersonalInfoBar;
