import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DarkModeToggle from '../components/DarkModeToggle.jsx';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:5000/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Chatbot state and handlers
  const [chatOpen, setChatOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const toggleChat = () => setChatOpen((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate submission
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      {/* Navbar */}
      <header
        className="navbar"
        style={{
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8c8dc',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '60px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {/* Left side: Welcome message */}
        <div style={{ fontWeight: 'bold', color: '#4a2c3a' }}>
          Welcome {loggedInUser}
        </div>

        {/* Center: App Title */}
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: 'black', // <-- black text color here
            letterSpacing: '1px',
            cursor: 'default',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#e74c3c')}
          onMouseLeave={(e) => (e.target.style.color = 'black')}
        >
          WELCOME TO KATYANI ORGANICS
        </div>

        {/* Right side: Toggle + Logout */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <DarkModeToggle />

          <button
            onClick={handleLogout}
            style={{
              marginLeft: '8px',
              padding: '8px 16px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Body Padding */}
      <div style={{ paddingTop: '80px', padding: '1rem' }}>
        {products &&
          products.map((item, index) => (
            <ul key={index}>
              <li>
                {item.name} : {item.price}
              </li>
            </ul>
          ))}
      </div>

      {/* Chatbot */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1100,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleChat}
          style={{
            backgroundColor: '#f8c8dc',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            fontSize: '28px',
            color: '#4a2c3a',
          }}
          aria-label="Toggle chat"
        >
          💬
        </button>

        {/* Chat Window */}
        {chatOpen && (
          <div
            style={{
              marginTop: '10px',
              width: '300px',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
              padding: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: '#4a2c3a',
              }}
            >
              <span>Chat with us!</span>
              <button
                onClick={toggleChat}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#4a2c3a',
                }}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', color: '#4a2c3a' }}>
                <p>Thank you for reaching out!</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                  }}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                  }}
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows="3"
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#f8c8dc',
                    color: '#4a2c3a',
                    padding: '10px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Send
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;











// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import DarkModeToggle from '../components/DarkModeToggle.jsx';

// function Home() {
//   const [loggedInUser, setLoggedInUser] = useState('');
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoggedInUser(localStorage.getItem('loggedInUser'));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('loggedInUser');
//     handleSuccess('User Logged out');
//     setTimeout(() => {
//       navigate('/login');
//     }, 1000);
//   };

//   const fetchProducts = async () => {
//     try {
//       const url = 'https://deploy-mern-app-1-api.vercel.app/products';
//       const headers = {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       };
//       const response = await fetch(url, headers);
//       const result = await response.json();
//       setProducts(result);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Chatbot state and handlers
//   const [chatOpen, setChatOpen] = useState(false);
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [submitted, setSubmitted] = useState(false);

//   const toggleChat = () => setChatOpen((prev) => !prev);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // For now, just simulate submission
//     setSubmitted(true);
//     setFormData({ name: '', email: '', message: '' });
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <header
//         className="navbar"
//         style={{
//           padding: '1rem 2rem',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           backgroundColor: '#f8c8dc',
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 1000,
//           height: '60px',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//         }}
//       >
//         {/* Left side: Welcome message */}
//         <div style={{ fontWeight: 'bold' }}>Welcome {loggedInUser}</div>

//         {/* Right side: Toggle + Logout */}
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <DarkModeToggle />

//           <button
//             onClick={handleLogout}
//             style={{
//               marginLeft: '8px',
//               padding: '8px 16px',
//               backgroundColor: '#e74c3c',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Body Padding */}
//       <div style={{ paddingTop: '80px', padding: '1rem' }}>
//         {products && products.map((item, index) => (
//           <ul key={index}>
//             <li>{item.name} : {item.price}</li>
//           </ul>
//         ))}
//       </div>

//       {/* Chatbot */}
//       <div
//         style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           zIndex: 1100,
//           fontFamily: 'Arial, sans-serif',
//         }}
//       >
//         {/* Toggle Button */}
//         <button
//           onClick={toggleChat}
//           style={{
//             backgroundColor: '#f8c8dc',
//             borderRadius: '50%',
//             width: '60px',
//             height: '60px',
//             border: 'none',
//             boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//             cursor: 'pointer',
//             fontSize: '28px',
//             color: '#4a2c3a',
//           }}
//           aria-label="Toggle chat"
//         >
//           💬
//         </button>

//         {/* Chat Window */}
//         {chatOpen && (
//           <div
//             style={{
//               marginTop: '10px',
//               width: '300px',
//               backgroundColor: 'white',
//               border: '1px solid #ccc',
//               borderRadius: '8px',
//               boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
//               padding: '10px',
//             }}
//           >
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 fontWeight: 'bold',
//                 marginBottom: '10px',
//                 color: '#4a2c3a',
//               }}
//             >
//               <span>Chat with us!</span>
//               <button
//                 onClick={toggleChat}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   fontSize: '20px',
//                   cursor: 'pointer',
//                   color: '#4a2c3a',
//                 }}
//                 aria-label="Close chat"
//               >
//                 ×
//               </button>
//             </div>

//             {submitted ? (
//               <div style={{ textAlign: 'center', color: '#4a2c3a' }}>
//                 <p>Thank you for reaching out!</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Your Name"
//                   required
//                   style={{
//                     padding: '8px',
//                     borderRadius: '4px',
//                     border: '1px solid #ccc',
//                     fontSize: '14px',
//                   }}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Your Email"
//                   required
//                   style={{
//                     padding: '8px',
//                     borderRadius: '4px',
//                     border: '1px solid #ccc',
//                     fontSize: '14px',
//                   }}
//                 />
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Your Message"
//                   required
//                   rows="3"
//                   style={{
//                     padding: '8px',
//                     borderRadius: '4px',
//                     border: '1px solid #ccc',
//                     fontSize: '14px',
//                     resize: 'vertical',
//                   }}
//                 />
//                 <button
//                   type="submit"
//                   style={{
//                     backgroundColor: '#f8c8dc',
//                     color: '#4a2c3a',
//                     padding: '10px',
//                     borderRadius: '4px',
//                     border: 'none',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   Send
//                 </button>
//               </form>
//             )}
//           </div>
//         )}
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Home;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import DarkModeToggle from '../components/DarkModeToggle.jsx';

// function Home() {
//   const [loggedInUser, setLoggedInUser] = useState('');
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoggedInUser(localStorage.getItem('loggedInUser'));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('loggedInUser');
//     handleSuccess('User Logged out');
//     setTimeout(() => {
//       navigate('/login');
//     }, 1000);
//   };

//   const fetchProducts = async () => {
//     try {
//       const url = 'https://deploy-mern-app-1-api.vercel.app/products';
//       const headers = {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       };
//       const response = await fetch(url, headers);
//       const result = await response.json();
//       setProducts(result);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Chatbot state and handlers
//   const [chatOpen, setChatOpen] = useState(false);
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [submitted, setSubmitted] = useState(false);

//   const toggleChat = () => setChatOpen((prev) => !prev);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // For now, just simulate submission
//     setSubmitted(true);
//     setFormData({ name: '', email: '', message: '' });
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <header
//         className="navbar"
//         style={{
//           padding: '1rem 2rem',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           backgroundColor: '#f8c8dc',
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 1000,
//           height: '60px',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//         }}
//       >
//         {/* Left: Welcome user */}
//         <div style={{ fontWeight: 'bold', flex: 1 }}>Welcome {loggedInUser}</div>

//         {/* Center: App Title */}
//         <div
//           style={{
//             flex: 1,
//             textAlign: 'center',
//             fontSize: '1.25rem',
//             fontWeight: 'bold',
//             color: '#4a2c3a',
//             letterSpacing: '1px',
//             cursor: 'default',
//             transition: 'color 0.3s ease',
//           }}
//           onMouseEnter={(e) => (e.target.style.color = '#e74c3c')}
//           onMouseLeave={(e) => (e.target.style.color = '#4a2c3a')}
//         >
//           WELCOME TO KATYANI ORGANICS
//         </div>

//         {/* Right: Toggle and Logout */}
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
//           <DarkModeToggle />
//           <button
//             onClick={handleLogout}
//             style={{
//               marginLeft: '8px',
//               padding: '8px 16px',
//               backgroundColor: '#e74c3c',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Body Padding */}
//       <div style={{ paddingTop: '80px', padding: '1rem' }}>
//         {products && products.map((item, index) => (
//           <ul key={index}>
//             <li>{item.name} : {item.price}</li>
//           </ul>
//         ))}
//       </div>

//       {/* Chatbot */}
//       <div
//         style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           zIndex: 1100,
//           fontFamily: 'Arial, sans-serif',
//         }}
//       >
//         {/* Toggle Button */}
//         <button
//           onClick={toggleChat}
//           style={{
//             backgroundColor: '#f8c8dc',
//             borderRadius: '50%',
//             width: '60px',
//             height: '60px',
//             border: 'none',
//             boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//             cursor: 'pointer',
//             fontSize: '28px',
//             color: '#4a2c3a',
//           }}
//           aria-label="Toggle chat"
//         >
//           💬
//         </button>

//         {/* Chat Window */}
//         {chatOpen && (
//           <div
//             style={{
//               marginTop: '10px',
//               width: '300px',
//               backgroundColor: 'white',
//               border: '1px solid #ccc',
//               borderRadius: '8px',
//               boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
//               padding: '10px',
//             }}
//           >
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 fontWeight: 'bold',
//                 marginBottom: '10px',
//                 color: '#4a2c3a',
//               }}
//             >
//               <span>Chat with us!</span>
//               <button
//                 onClick={toggleChat}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   fontSize: '20px',
//                   cursor: 'pointer',
//                   color: '#4a2c3a',
//                 }}
//                 aria-label="Close chat"
//               >
//                 ×
//               </button>
//             </div>

//             {submitted ? (
//               <div style={{ textAlign: 'center', color: '#4a2c3a' }}>
//                 <p>Thank you for reaching out!</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Your Name"
//                   required
//                   style={{
//                     padding: '8px',
//                     borderRadius: '4px',
//                     border: '1px solid #ccc',
//                     fontSize: '14px',
//                   }}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Your Email"
//                   required
//                   style={{
//                     padding: '8px',
//                     borderRadius: '4px',
//                     border: '1px solid #ccc',
//                     fontSize: '14px',
//                   }}
//                 />
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Your Message"
//                   required
//                   rows="3"
//                   style={{
//                     padding: '8px',
//                     borderRadius: '4px',
//                     border: '1px solid #ccc',
//                     fontSize: '14px',
//                     resize: 'vertical',
//                   }}
//                 />
//                 <button
//                   type="submit"
//                   style={{
//                     backgroundColor: '#f8c8dc',
//                     color: '#4a2c3a',
//                     padding: '10px',
//                     borderRadius: '4px',
//                     border: 'none',
//                     cursor: 'pointer',
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   Send
//                 </button>
//               </form>
//             )}
//           </div>
//         )}
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Home;














// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import DarkModeToggle from '../components/DarkModeToggle.jsx'; // 👈 Import the toggle button

// function Home() {
//   const [loggedInUser, setLoggedInUser] = useState('');
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoggedInUser(localStorage.getItem('loggedInUser'));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('loggedInUser');
//     handleSuccess('User Logged out');
//     setTimeout(() => {
//       navigate('/login');
//     }, 1000);
//   };

//   const fetchProducts = async () => {
//     try {
//       const url = 'https://deploy-mern-app-1-api.vercel.app/products';
//       const headers = {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       };
//       const response = await fetch(url, headers);
//       const result = await response.json();
//       setProducts(result);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);




//   return (
//   <div>
//     {/* Navbar */}
//     <header
//       className="navbar"
//       style={{
//         padding: '1rem 2rem',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: '#f8c8dc',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 1000,
//         height: '60px',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//       }}
//     >
//       {/* Left side: Welcome message */}
//       <div style={{ fontWeight: 'bold' }}>Welcome {loggedInUser}</div>

//       {/* Right side: Toggle + Logout */}
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <DarkModeToggle />
//         <button
//           onClick={handleLogout}
//           style={{
//             marginLeft: '8px',
//             padding: '8px 16px',
//             backgroundColor: '#e74c3c',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </header>

//     {/* Body Padding */}
//     <div style={{ paddingTop: '80px', padding: '1rem' }}>
//       {products && products.map((item, index) => (
//         <ul key={index}>
//           <li>{item.name} : {item.price}</li>
//         </ul>
//       ))}
//     </div>

//     <ToastContainer />
//   </div>
// );
// }

// export default Home;
















// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Home.css';

// function Home() {
//   const [loggedInUser, setLoggedInUser] = useState('');
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoggedInUser(localStorage.getItem('loggedInUser'));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('loggedInUser');
//     handleSuccess('User Logged out');
//     setTimeout(() => {
//       navigate('/login');
//     }, 1000);
//   };

//   const fetchProducts = async () => {
//     try {
//       const url = 'https://deploy-mern-app-1-api.vercel.app/products';
//       const headers = {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       };
//       const response = await fetch(url, headers);
//       const result = await response.json();
//       setProducts(result);
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <header className="navbar">
//         <h1 className="welcome-text">Welcome {loggedInUser}</h1>
//         <button onClick={handleLogout}>Logout</button>
//       </header>

//       <main className="content">
//         {products && products.map((item, index) => (
//           <ul key={index}>
//             <span>{item.name} : {item.price}</span>
//           </ul>
//         ))}
//       </main>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Home;











// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify';

// function Home() {
//     const [loggedInUser, setLoggedInUser] = useState('');
//     const [products, setProducts] = useState('');
//     const navigate = useNavigate();
//     useEffect(() => {
//         setLoggedInUser(localStorage.getItem('loggedInUser'))
//     }, [])

//     const handleLogout = (e) => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('loggedInUser');
//         handleSuccess('User Loggedout');
//         setTimeout(() => {
//             navigate('/login');
//         }, 1000)
//     }

//     const fetchProducts = async () => {
//         try {
//             const url = "https://deploy-mern-app-1-api.vercel.app/products";
//             const headers = {
//                 headers: {
//                     'Authorization': localStorage.getItem('token')
//                 }
//             }
//             const response = await fetch(url, headers);
//             const result = await response.json();
//             console.log(result);
//             setProducts(result);
//         } catch (err) {
//             handleError(err);
//         }
//     }
//     useEffect(() => {
//         fetchProducts()
//     }, [])

//     return (
//         <div>
//             <h1>Welcome {loggedInUser}</h1>
//             <button onClick={handleLogout}>Logout</button>
//             <div>
//                 {
//                     products && products?.map((item, index) => (
//                         <ul key={index}>
//                             <span>{item.name} : {item.price}</span>
//                         </ul>
//                     ))
//                 }
//             </div>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Home