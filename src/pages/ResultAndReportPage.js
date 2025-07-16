import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ResultAndReportPage.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResultAndReportPage = () => {
  const reportRef = useRef();
  const location = useLocation();
  const hastaVerisi = location.state || {};

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Yapay zeka API çağrısı (sadece sayfa yüklendiğinde)
  useEffect(() => {
    if (!hastaVerisi) return;

    const fetchPrediction = async () => {
      setLoading(true);
      setError(null);

      try {
        // Örneğin backend API URL’iniz:
        const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hastaVerisi),
        });

        if (!response.ok) throw new Error("Tahmin alınamadı");

        const data = await response.json();
        setPrediction(data.prediction); // backend'den dönen tahmin sonucu burada olmalı
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [hastaVerisi]);

  const downloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("saglik-raporu.pdf");
    });
  };

  const currentDate = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="report-page">
      <div className="report-container" ref={reportRef}>
        <div className="header">
          <img src="/images/istun_logo.png" alt="Logo" className="logo" />
          <div className="title">
            <h3>
              İSTANBUL SAĞLIK VE TEKNOLOJİ ÜNİVERSİTESİ <br />
              <strong>FİBROZİS TAHMİN VE DEĞERLENDİRME RAPORU</strong>
            </h3>
          </div>
        </div>

        <div className="section">
          <h4>HASTANIN:</h4>
          <table>
            <tbody>
              <tr>
                <td>Adı ve Soyadı:</td>
                <td>{hastaVerisi.name} {hastaVerisi.surname}</td>
              </tr>
              <tr>
                <td>T.C. Kimlik No:</td>
                <td>{hastaVerisi.tc}</td>
              </tr>
              <tr>
                <td>Cinsiyet:</td>
                <td>{hastaVerisi.gender || "-"}</td> {/* Eğer varsa */}
              </tr>
              <tr>
                <td>Yaş:</td>
                <td>{hastaVerisi.age}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section">
          <h4>FİBROZİS EVRE TAHMİNİ:</h4>
          <div className="box">
            {loading && <p>Yükleniyor...</p>}
            {error && <p style={{ color: "red" }}>Hata: {error}</p>}
            {prediction && <p>{prediction}</p>}
          </div>
        </div>

        <div className="section">
          <h4>KAN DEĞERLERİ:</h4>
          <table>
            <tbody>
              {hastaVerisi.labValues &&
                Object.entries(hastaVerisi.labValues).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="section">
          <h4>ULTRASON GÖRÜNTÜSÜ:</h4>
          {hastaVerisi.ultrasoundImage ? (
            <img
              src={hastaVerisi.ultrasoundImage}
              alt="Ultrason Görüntüsü"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ) : (
            <p>Ultrason görüntüsü yüklenmedi.</p>
          )}
        </div>

        <div className="notes">
          <p>(*) Rapor tarihi: {currentDate}</p>
          <p>
            (**) Fibrozis Evre Tahmini bölümünde Kan Değerleri ve Ultrason Görüntüsü bilgileriyle
            eğitilmiş yapay zeka tahmin sonu bulunmaktadır.
          </p>
        </div>
      </div>

      <button className="download-button" onClick={downloadPDF}>
        Raporu PDF Olarak İndir
      </button>
    </div>
  );
};

export default ResultAndReportPage;
