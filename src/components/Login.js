import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {


    let navigate = useNavigate();



    const [credentials, setCredentials] = useState({ email: "", password: "" })


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("success", "Logged in successfully!")
            navigate('/');
        }
        else {
            props.showAlert("danger", "Invalid credentials")
        }

    }
    return (
        <div className='mt-3'>
            <h2>Login to continue to iNotebook</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-4">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />

                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login