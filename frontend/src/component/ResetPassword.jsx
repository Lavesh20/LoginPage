import React, { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function ResetPassword() {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { id, token } = useParams();

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/reset-password/${id}/${token}`, { password });
            if (res.data.status === "Password updated") {
                navigate('/');
            } else {
                console.log(res.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
          <h4 className="mb-4 text-center">Reset Password</h4>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                      New Password
                  </label> <br />
                  <input
                      type="password"
                      placeholder="Enter Password"
                      autoComplete="off"
                      name="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div> <br />
              <button type="submit" className="btn btn-success w-100">
                  Update
              </button>
          </form>
      </div>
  </div>
    );
}

export default ResetPassword;
