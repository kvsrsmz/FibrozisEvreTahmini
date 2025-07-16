import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoBar from "../components/PersonalInfoBar";
import "./FormPage.css";

const FormPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // State'ler
  const [tc, setTc] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");

  // Kan değerleri için state'ler
  const [ast, setAst] = useState("");
  const [alt, setAlt] = useState("");
  const [ggt, setGgt] = useState("");
  const [alp, setAlp] = useState("");
  const [totalBilirubin, setTotalBilirubin] = useState("");
  const [directBilirubin, setDirectBilirubin] = useState("");
  const [albumin, setAlbumin] = useState("");
  const [inr, setInr] = useState("");
  const [platelet, setPlatelet] = useState("");
  const [ldh, setLdh] = useState("");
  const [cbc, setCbc] = useState("");

  const handleSubmit = () => {
    const hastaVerisi = {
      tc,
      name,
      surname,
      age,
      labValues: {
        AST: ast,
        ALT: alt,
        GGT: ggt,
        ALP: alp,
        TotalBilirubin: totalBilirubin,
        DirectBilirubin: directBilirubin,
        Albumin: albumin,
        INR: inr,
        Platelet: platelet,
        LDH: ldh,
        CBC: cbc,
      },
    };

    navigate("/result", { state: hastaVerisi });
  };

  return (
    <div>
      <PersonalInfoBar />
      <div className="formpage-container">
        <div className="formpage-image-section">
          <h2 className="formpage-title">Ultrason Görüntüsü</h2>
          <div className="formpage-image-box">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Ultrason"
                className="formpage-ultrasound-img"
              />
            ) : (
              <span className="formpage-image-placeholder">Henüz görüntü yüklenmedi</span>
            )}
          </div>
          <div className="formpage-image-btn-box">
            <button
              onClick={() => document.getElementById("imageUpload").click()}
              className="formpage-image-btn"
            >
              {selectedImage ? "Görseli Değiştir" : "Görsel Yükle"}
            </button>
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>
        <div className="formpage-info-section">
          <h2 className="formpage-title">Kişisel Bilgiler</h2>
          <div className="formpage-fields-row">
            <Field label="T.C." value={tc} onChange={setTc} />
            <Field label="İsim" value={name} onChange={setName} />
            <Field label="Soyisim" value={surname} onChange={setSurname} />
            <Field label="Yaş" value={age} onChange={setAge} type="number" />
          </div>
          <h2 className="formpage-title">Kan Değerleri</h2>
          <div className="formpage-fields-row">
            <Field label="AST" value={ast} onChange={setAst} type="number" />
            <Field label="ALT" value={alt} onChange={setAlt} type="number" />
            <Field label="GGT" value={ggt} onChange={setGgt} type="number" />
            <Field label="ALP" value={alp} onChange={setAlp} type="number" />
            <Field label="Total Bilirubin" value={totalBilirubin} onChange={setTotalBilirubin} type="number" />
            <Field label="Direkt Bilirubin" value={directBilirubin} onChange={setDirectBilirubin} type="number" />
            <Field label="Albumin" value={albumin} onChange={setAlbumin} type="number" />
            <Field label="INR" value={inr} onChange={setInr} type="number" />
            <Field label="Trombosit (Platelet)" value={platelet} onChange={setPlatelet} type="number" />
            <Field label="LDH" value={ldh} onChange={setLdh} type="number" />
            <Field label="Tam Kan Sayımı (CBC)" value={cbc} onChange={setCbc} type="number" />
          </div>
          <button onClick={handleSubmit} className="formpage-submit-btn">Tahmin Et</button>
        </div>
      </div>
    </div>
  );
};

// Ortak input bileşeni
const Field = ({ label, value, onChange, type = "text" }) => (
  <div style={{ display: "flex", flexDirection: "column", minWidth: "150px" }}>
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
      step={type === "number" ? "0.01" : undefined}
    />
  </div>
);

export default FormPage;
