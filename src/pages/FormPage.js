import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoBar from "../components/PersonalInfoBar";

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

      {/* Sayfa ana container */}
      <div style={{ flex: 1, display: "flex" }}>
        {/* Sol taraf: Görsel yükleme */}
        <div
          style={{
            width: "50%",
            backgroundColor: "#f5f5f5",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <h2 style={{ marginBottom: "20px", fontWeight: "600" }}>
            Ultrason Görüntüsü
          </h2>

          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "400px",
              border: "2px solid #bbb",
              borderRadius: "0px",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Ultrason"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span style={{ color: "#aaa", fontSize: "16px" }}>
                Henüz görüntü yüklenmedi
              </span>
            )}
          </div>

          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => document.getElementById("imageUpload").click()}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "20px",
                cursor: "pointer",
              }}
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

        {/* Sağ taraf: Kişisel Bilgiler + Kan Değerleri */}
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
            <Field label="GGT" value={ggt} onChange={setGgt} type="number" />
            <Field label="ALP" value={alp} onChange={setAlp} type="number" />
            <Field
              label="Total Bilirubin"
              value={totalBilirubin}
              onChange={setTotalBilirubin}
              type="number"
            />
            <Field
              label="Direkt Bilirubin"
              value={directBilirubin}
              onChange={setDirectBilirubin}
              type="number"
            />
            <Field label="Albumin" value={albumin} onChange={setAlbumin} type="number" />
            <Field label="INR" value={inr} onChange={setInr} type="number" />
            <Field
              label="Trombosit (Platelet)"
              value={platelet}
              onChange={setPlatelet}
              type="number"
            />
            <Field label="LDH" value={ldh} onChange={setLdh} type="number" />
            <Field label="Tam Kan Sayımı (CBC)" value={cbc} onChange={setCbc} type="number" />
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
