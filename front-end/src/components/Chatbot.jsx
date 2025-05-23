// src/components/Chatbot.jsx
import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle form submission, e.g., send data to a server
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      <button className="chatbot-toggle" onClick={toggleChat}>
        💬
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Chat with us!</span>
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>
          {submitted ? (
            <div className="thank-you-message">
              <p>Thank you for reaching out!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
              />
              <button type="submit">Send</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
