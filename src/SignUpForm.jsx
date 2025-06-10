import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import './styles/SignUpForm.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const db = getDatabase();
            await set(ref(db, 'users/' + user.uid), {
                fullName: capitalize(fullName),
                gender,
                email
            });

            toast.success("Account Created Successfully!");
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            toast.error(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-wrapper">
            <ToastContainer />
            <motion.div
                className="signup-left"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="signup-overlay">
                    <h1>Create Your Account to use our <br /><span>AI</span></h1>
                    <p>Sign up to start creating smart, clean, and ready-to-present decks—automatically.</p>
                </div>
            </motion.div>
            <motion.div
                className="signup-right"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <form className='signup-form' onSubmit={handleSubmit}>
                    <h2>Create an account</h2>

                    <label>Full Name:
                        <input type="text" onChange={(e) => setFullName(e.target.value)} required />
                    </label>

                    <label>Gender:
                        <select onChange={(e) => setGender(e.target.value)} required>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>

                    <label>Email Address:
                        <input type="email" onChange={(e) => setEmail(e.target.value)} required />
                    </label>

                    <label>Password:
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password-icon"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle Password Visibility"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </label>

                    <button type='submit' disabled={loading}>
                        {loading ? 'Creating...' : 'Create an Account'}
                    </button>

                    <p>Already Registered? <Link to="/login">Signin</Link></p>
                </form>
            </motion.div>
        </div>
    );
};

export default SignUpForm;
