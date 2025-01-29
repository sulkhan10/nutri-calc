import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Tdee from './Tdee';
import NotFound from './NotFound';
import Navigation from './Navigation'; // Assuming you have a Navigation component
import './index.css';


const App = () => {
    return (
        <Router>
            <div className='w-full flex items-center justify-center'>

            <Navigation  />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Tdee" element={<Tdee />} />
                
                {/* Catch-all route for undefined routes */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            </div>
        </Router>
    );
};

// Create a root and render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
