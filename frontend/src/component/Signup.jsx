import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/signup", {
                email,
                password
            });
            
            if (response.data.success) {
                navigate("/home");
            } else {
                alert(response.data.message || "Signup failed");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
            console.error(error);
        }
    }

    const containerStyle = {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const titleStyle = {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column'
    };

    const inputStyle = {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px'
    };

    const submitButtonStyle = {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer'
    };

    const orTextStyle = {
        textAlign: 'center',
        margin: '20px 0',
        color: '#666'
    };

    const loginLinkStyle = {
        display: 'block',
        textAlign: 'center',
        color: '#007bff',
        textDecoration: 'none'
    };

    return (
        <div style={containerStyle}>
            <h3 style={titleStyle}>SignUp</h3>
            <form style={formStyle}>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    required
                    style={inputStyle}
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    required
                    style={inputStyle}
                />
                <input 
                    type="submit" 
                    onClick={submit} 
                    style={submitButtonStyle} 
                    value="Sign Up"
                />
            </form>
            <p style={orTextStyle}>OR</p>
            <Link to="/" style={loginLinkStyle}>Login Page</Link>
        </div>
    );
}

export default SignUp;