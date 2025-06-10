import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/Signin.css';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful!");
            setTimeout(() => navigate('/home'), 1500);
        } catch (err) {
            toast.error(`Login failed: ${err.code}`);
            console.error(err);
        }
    };

    return (
        <div className="signin-container">
            <ToastContainer />
            <div className="signin-left">
                <h2 className="signin-title">Welcome Back!</h2>
                <form onSubmit={handleSubmit} className="signin-form">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        placeholder="you@example.com"
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />

                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />

                    <button type="submit" className="signin-btn">Sign In</button>

                    <p className="signin-footer">
                        Don't have an account? <Link to="/signup" className="signin-register">Register</Link>
                    </p>

                    <div className="signin-or">Or continue with</div>
                    <div className="signin-icons">
                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
                        <img src="https://img.icons8.com/ios-filled/50/000000/mac-os.png" alt="Apple" />
                        <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" />
                        <img src="https://img.icons8.com/color/48/000000/twitter.png" alt="Twitter" />
                    </div>
                </form>
            </div>
            <div className="signin-right">
                <div className="signin-overlay">
                    <h2>Transform your text into polished PowerPoint slides.</h2>
                    <p>Sign in to start creating smart, clean, and ready-to-present decks—automatically.</p>
                </div>
            </div>
        </div>
    );
};

export default Signin;
