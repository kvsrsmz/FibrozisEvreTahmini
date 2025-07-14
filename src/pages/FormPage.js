import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoBar from "../components/PersonalInfoBar";
import LabValuesForm from "../components/LabValuesForm";

const FormPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const hastaVerisi = {
    name: "Ayşe Yılmaz",
    age: 45,
    gender: "Kadın",
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    navigate("/result", { state: { ...hastaVerisi, image: selectedImage } });
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <PersonalInfoBar />

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
    maxWidth: "600px",   // burası 500'den 600'e çıktı
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
                fontSize: "15px",
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

        {/* Sağ taraf: Form ve buton */}
        <div
          style={{
            width: "50%",
            backgroundColor: "#ffffff",
            borderLeft: "1px solid #ccc",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <LabValuesForm />
          </div>

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
              cursor: "pointer",
              alignSelf: "center",
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
