import React, { useState } from 'react';

function LabValuesForm() {
  const [ast, setAst] = useState('');
  const [alt, setAlt] = useState('');
  const [hgb, setHgb] = useState('');
  const [wbc, setWbc] = useState('');

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Kan Değerleri</h2>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <Field label="AST" value={ast} onChange={setAst} />
        <Field label="ALT" value={alt} onChange={setAlt} />
        <Field label="HGB" value={hgb} onChange={setHgb} />
        <Field label="WBC" value={wbc} onChange={setWbc} />
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ marginBottom: '5px', color: '#555' }}>{label}</label>
      <input
        type="number"
        step="any"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={`${label} değeri`}
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          width: '120px'
        }}
      />
    </div>
  );
}

export default LabValuesForm;
