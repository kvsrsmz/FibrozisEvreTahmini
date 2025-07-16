import React from "react";
import "./LabValuesForm.css";

const LabValuesForm = () => {
  return (
    <div className="lab-values-form">
      {/* Her biri %48 genişlikte iki sütun */}
      <div style={{ flex: "0 0 48%" }}>
        <label>AST (Aspartat Aminotransferaz)</label>
        <input type="number" step="0.01" placeholder="AST değeri" />
      </div>

      <div style={{ flex: "0 0 48%" }}>
        <label>ALT (Alanin Aminotransferaz)</label>
        <input type="number" step="0.01" placeholder="ALT değeri" />
      </div>

      <div style={{ flex: "0 0 48%" }}>
        <label>GGT (Gama Glutamil Transferaz)</label>
        <input type="number" step="0.01" placeholder="GGT değeri" />
      </div>

      <div style={{ flex: "0 0 48%" }}>
        <label>ALP (Alkalen Fosfataz)</label>
        <input type="number" step="0.01" placeholder="ALP değeri" />
      </div>

      <div style={{ flex: "0 0 48%" }}>
        <label>Total Bilirubin</label>
        <input type="number" step="0.01" placeholder="Total Bilirubin" />
      </div>

      <div style={{ flex: "0 0 48%" }}>
        <label>Direkt Bilirubin</label>
        <input type="number" step="0.01" placeholder="Direkt Bilirubin" />
      </div>

      <div style={{ flex: "0 0 48%" }}>
        <label>Albumin</label>
        <input type="number" step="0.01" placeholder="Albumin" />
      </div>

      <div style={{ flex: "0 0 48%" }}>
        <label>INR (International Normalized Ratio)</label>
        <input type="number" step="0.01" placeholder="INR" />
      </div>

      <div style={{ flex: "0 0 48%" }}>
        <label>Trombosit (Platelet) sayısı</label>
        <input type="number" step="1" placeholder="Trombosit sayısı" />
      </div>

      <div style={{ flex: "0 0 48%" }}>
        <label>LDH</label>
        <input type="number" step="0.01" placeholder="LDH" />
      </div>

      <div style={{ flex: "0 0 48%" }}>
        <label>Tam kan sayımı (CBC)</label>
        <input type="number" step="1" placeholder="CBC" />
      </div>
    </div>
  );
};

export default LabValuesForm;
