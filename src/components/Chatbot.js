import React, { useState } from "react";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Merhaba! Size nasıl yardımcı olabilirim?" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { sender: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "bot", text: "Sorunuz için teşekkürler! Şu anda sadece temel cevaplar verebiliyorum." }]);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot butonu sağ alt köşede */}
      <button
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          zIndex: 100,
          background: "#940606ff",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          border: "none",
          cursor: "pointer"
        }}
        onClick={() => setIsChatOpen(true)}
        title="Chatbot"
      >
        🤖
      </button>

      {/* Chatbot modal */}
      {isChatOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 101,
          backdropFilter: "blur(6px)",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            width: "850px",
            maxWidth: "90vw",
            minHeight: "600px",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }}>
            <button
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "transparent",
                border: "none",
                fontSize: "22px",
                cursor: "pointer"
              }}
              onClick={() => setIsChatOpen(false)}
              title="Kapat"
            >✖</button>
            <div style={{
              padding: "24px 16px 8px 16px",
              flex: 1,
              overflowY: "auto"
            }}>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "18px",
                  fontWeight: "bold",
                  fontSize: "2.2rem",
                  letterSpacing: "1px",
                  color: "#940606ff"
                }}
              >Sohbet Asistanı</div>
              <div>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                    marginBottom: "8px"
                  }}>
                    <div style={{
                      background: msg.sender === "user" ? "#940606ff" : "#eee",
                      color: msg.sender === "user" ? "white" : "#333",
                      borderRadius: "12px",
                      padding: "8px 12px",
                      maxWidth: "70%",
                      fontSize: "15px"
                    }}>{msg.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              padding: "12px 16px",
              borderTop: "1px solid #eee",
              display: "flex",
              gap: "8px"
            }}>
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleSendMessage(); }}
                placeholder="Sorunuzu yazın..."
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "15px"
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  background: "#940606ff",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >Gönder</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
