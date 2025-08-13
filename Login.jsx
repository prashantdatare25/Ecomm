import React from 'react'

function Login() {
return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
        <h2>Login</h2>
        <form>
            <div style={{ marginBottom: 16 }}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" style={{ width: "100%", padding: 8, marginTop: 4 }} required />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" style={{ width: "100%", padding: 8, marginTop: 4 }} required />
            </div>
            <button type="submit" style={{ width: "100%", padding: 10, background: "#007bff", color: "#fff", border: "none", borderRadius: 4 }}>
                Login
            </button>
        </form>
    </div>
)
}

export default Login