import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/", {
                email,
                password
            }).then(res=>{
                if(res.data == "exists"){
                    navigate('/home')
                }
                else if(res.data == "not exists"){
                    alert("User not sign up")
                }
            })
            .catch(e=>{
                alert("invalid credentials")
                console.log(e)
            })
        } catch (e) {
            console.log(e);
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

    const signupLinkStyle = {
        display: 'block',
        textAlign: 'center',
        color: '#007bff',
        textDecoration: 'none'
    };

    return (
        <div style={containerStyle}>
            <h3 style={titleStyle}>Login</h3>
            <form onSubmit={submit} style={formStyle}>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    style={inputStyle}
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    style={inputStyle}
                />
                <input 
                    type="submit" 
                    style={submitButtonStyle} 
                    value="Login"
                />
            </form>
            <p style={orTextStyle}>OR</p>
            <Link to="/signup" style={signupLinkStyle}>SignUp Page</Link>
        </div>
    );
}

export default Login;