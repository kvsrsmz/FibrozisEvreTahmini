import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoBar from "../components/PersonalInfoBar";
import Chatbot from "../components/Chatbot";
import "./FormPage.css";

// TC Kimlik No doğrulama fonksiyonu
const isValidTC = (tc) => {
  if (!/^\d{11}$/.test(tc)) return false;
  if (tc[0] === "0") return false;

  const digits = tc.split("").map(Number);
  const sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const sumEven = digits[1] + digits[3] + digits[5] + digits[7];
  const digit10 = ((sumOdd * 7) - sumEven) % 10;
  if (digit10 !== digits[9]) return false;

  const total = digits.slice(0, 10).reduce((a, b) => a + b, 0);
  const digit11 = total % 10;
  if (digit11 !== digits[10]) return false;

  return true;
};

const FormPage = () => {
  const navigate = useNavigate();

  // Hasta bilgileri
  const [tc, setTc] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");

  // Kan değerleri
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

  // Görsel dosya ve önizleme url
  const [ultrasoundFile, setUltrasoundFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUltrasoundFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!age || Number(age) < 10) {
      alert("Yaş 10'dan küçük olamaz!");
      return;
    }

    if (!isValidTC(tc)) {
      alert("Geçerli bir T.C. Kimlik No giriniz!");
      return;
    }

    if (!name.trim() || !surname.trim()) {
      alert("İsim ve Soyisim boş olamaz!");
      return;
    }

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

    const formData = new FormData();
    formData.append("patient_data", JSON.stringify(hastaVerisi));
    if (ultrasoundFile) {
      formData.append("ultrasound_image", ultrasoundFile);
    }

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Tahmin API çağrısı başarısız.");

      const result = await response.json();

      navigate("/result", {
        state: {
          ...hastaVerisi,
          prediction: result.prediction,
          ultrasoundImage: selectedImage,
        },
      });
    } catch (error) {
      alert("Tahmin sırasında bir hata oluştu: " + error.message);
    }
  };

  const titleStyle = {
    fontSize: "1.4rem",
    fontWeight: "600",
    fontFamily: "Arial, sans-serif",
    marginBottom: "12px",
    color: "#333",
    textTransform: "uppercase",
  };

  const handleTextInput = (setter) => (e) => {
    const value = e.target.value;
    if (/^[a-zA-ZığüşöçİĞÜŞÖÇ\s]*$/.test(value)) {
      setter(value);
    }
  };

  const handleNumberInput = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <div>
      <PersonalInfoBar />
  {/* Chatbot component */}
      <Chatbot />

      <div className="formpage-container">
        <div className="formpage-image-section">
          <h2 className="formpage-title" style={titleStyle}>Ultrason Görüntüsü</h2>
          <div className="formpage-image-box">
            {selectedImage ? (
              <img src={selectedImage} alt="Ultrason" className="formpage-ultrasound-img" />
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
          <h2 className="formpage-title" style={titleStyle}>Kişisel Bilgiler</h2>
          <div className="formpage-fields-row">
            <Field
              label="T.C."
              value={tc}
              onChange={handleNumberInput(setTc)}
              maxLength={11}
              placeholder="11 haneli TC giriniz"
              type="text"
            />
            <Field label="İsim" value={name} onChange={handleTextInput(setName)} />
            <Field label="Soyisim" value={surname} onChange={handleTextInput(setSurname)} />
            <Field
              label="Yaş"
              value={age}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setAge(val);
              }}
              min={10}
              step={1}
              type="number"
              placeholder="Yaş giriniz"
            />
          </div>
          <h2 className="formpage-title" style={titleStyle}>Kan Değerleri</h2>
          <div className="formpage-fields-row">
            <Field label="AST" value={ast} onChange={(e) => setAst(e.target.value)} type="number" step={0.1} />
            <Field label="ALT" value={alt} onChange={(e) => setAlt(e.target.value)} type="number" step={0.1} />
            <Field label="GGT" value={ggt} onChange={(e) => setGgt(e.target.value)} type="number" step={0.1} />
            <Field label="ALP" value={alp} onChange={(e) => setAlp(e.target.value)} type="number" step={0.1} />
            <Field label="Total Bilirubin" value={totalBilirubin} onChange={(e) => setTotalBilirubin(e.target.value)} type="number" step={0.1} />
            <Field label="Direkt Bilirubin" value={directBilirubin} onChange={(e) => setDirectBilirubin(e.target.value)} type="number" step={0.1} />
            <Field label="Albumin" value={albumin} onChange={(e) => setAlbumin(e.target.value)} type="number" step={0.1} />
            <Field label="INR" value={inr} onChange={(e) => setInr(e.target.value)} type="number" step={0.1} />
            <Field label="Trombosit (Platelet)" value={platelet} onChange={(e) => setPlatelet(e.target.value)} type="number" step={0.1} />
            <Field label="LDH" value={ldh} onChange={(e) => setLdh(e.target.value)} type="number" step={0.1} />
            <Field label="Tam Kan Sayımı (CBC)" value={cbc} onChange={(e) => setCbc(e.target.value)} type="number" step={0.1} />
          </div>
          <button onClick={handleSubmit} className="formpage-submit-btn">Tahmin Et</button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, type = "text", step, maxLength, placeholder }) => (
  <div style={{ display: "flex", flexDirection: "column", minWidth: "150px" }}>
    <label style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={{
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "14px",
        width: "150px",
      }}
      step={step}
      maxLength={maxLength}
      placeholder={placeholder ?? `${label} giriniz`}
      min={type === "number" ? 0 : undefined}
    />
  </div>
);

export default FormPage;

