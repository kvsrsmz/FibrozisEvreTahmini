import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoBar from "../components/PersonalInfoBar";
import "./FormPage.css";

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
    // Hasta ve laboratuvar bilgilerini bir nesnede topla
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

    // FormData ile hem JSON verisi hem de dosya gönderimi için obje oluştur
    const formData = new FormData();
    formData.append("patient_data", JSON.stringify(hastaVerisi)); // Hasta verisini ekle

    if (ultrasoundFile) {
      formData.append("ultrasound_image", ultrasoundFile); // Ultrason dosyasını ekle
    }

    try {
      // Backend API'ye POST isteği gönder
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      // API'den hata gelirse yakala
      if (!response.ok) throw new Error("Tahmin API çağrısı başarısız.");

      // API'den gelen sonucu JSON olarak al
      const result = await response.json();

      // Tahmin sonucu ve ultrason önizlemesi ile sonuç sayfasına yönlendir
      navigate("/result", {
        state: {
          ...hastaVerisi,
          prediction: result.prediction,
          ultrasoundImage: selectedImage,
        },
      });
    } catch (error) {
      // Hata durumunda kullanıcıya uyarı göster
      alert("Tahmin sırasında bir hata oluştu: " + error.message);
    }
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
          <h2 style={{ fontSize: "20px", marginBottom: "20px", marginLeft:"30px", color: "#333" }}>
            Ultrason Görüntüsü
          </h2>

          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "400px",
              border: "2px solid #bbb",
              borderRadius: "10px",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              overflow: "hidden",
              marginBottom: "20px",
              marginTop: "30px",     // 👈 Aşağı kaydırır
              marginLeft: "30px",    // 👈 Sağa kaydırır
            }}
          >

            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Ultrason"
                style={{
                  width: "200%",
                  height: "200%",
                  objectFit: "cover",
                }}
              />

            ) : (
              <span style={{ fontSize: "20px", marginBottom: "0", color: "#333" }}>
                Henüz görüntü yüklenmedi
              </span>
            )}
          </div>
          <div className="formpage-image-btn-box">
            <button
              onClick={() => document.getElementById("imageUpload").click()}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2E7D32",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                marginTop: "30px",     // 👈 Aşağı kaydırır
                marginRight: "90px",
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
          <button onClick={handleSubmit} className="formpage-submit-btn">
            Tahmin Et
          </button>
        </div>
      </div>
    </div>
  );
};

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
