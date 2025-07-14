import React, { useRef } from "react";
import "./ResultAndReportPage.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResultAndReportPage = () => {
  const reportRef = useRef();

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

  // Raporun oluşturulduğu tarihi al
  const currentDate = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="report-page">
      <div className="report-container" ref={reportRef}>
        <div className="header">
          {/* Logo artık public klasöründen çağrılıyor */}
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
                <td>T.C. Kimlik No:</td>
              </tr>
              <tr>
                <td>Cinsiyet: </td>
                <td>Yaş: </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section">
          <h4>FİBROZİS EVRE TAHMİNİ:</h4>
          <div className="box"></div>
        </div>

        <div className="section">
          <h4>KAN DEĞERLERİ VE ULTRASON GÖRÜNTÜSÜ:</h4>
          <div className="box"></div>
        </div>

        <div className="notes">
          <p>(*) Rapor tarihi: {currentDate}</p>
          <p>
            (**) Fibrozis Evre Tahmini bölümünde Kan Değerleri ve Ultrason Görüntüsü bilgileriyle eğitilmiş yapay zeka tahmin sonu bulunmaktadır.
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
