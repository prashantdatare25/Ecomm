import React from 'react'

function Signup() {
const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: ''
});

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here (e.g., API call)
    alert('Signup successful!');
};

return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 10 }}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: 8 }}
                />
            </div>
            <div style={{ marginBottom: 10 }}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: 8 }}
                />
            </div>
            <div style={{ marginBottom: 10 }}>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: 8 }}
                />
            </div>
            <button type="submit" style={{ padding: '8px 16px' }}>Sign Up</button>
        </form>
    </div>
);
}

export default Signup