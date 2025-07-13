import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import ResultAndReportPage from "./pages/ResultAndReportPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/result" element={<ResultAndReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
