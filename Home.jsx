import React from 'react'

function Home() {
  return (
    <div>
    {/*  */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#f5f5f5' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://via.placeholder.com/40x40?text=Logo" alt="Logo" style={{ marginRight: '0.5rem' }} />
                <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>ShopEase</span>
            </div>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '1.5rem', margin: 0 }}>
                <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Home</a></li>
                <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Products</a></li>
                <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>About</a></li>
                <li><a href="#" style={{ textDecoration: 'none', color: '#333' }}>Contact</a></li>
            </ul>
        </nav>
        <section style={{ textAlign: 'center', padding: '3rem 1rem', background: '#e0f7fa' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to ShopEase</h1>
            <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
                Discover the best deals on your favorite products. Fast shipping, secure payments, and top-notch customer service.
            </p>
            <button style={{ padding: '0.75rem 2rem', fontSize: '1rem', background: '#00796b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Shop Now
            </button>
        </section>
        <section style={{ padding: '2rem 1rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Featured Products</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                {/* Placeholder for featured products */}
                <div style={{ width: '180px', height: '220px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.1rem' }}>
                    Product 1
                </div>
                <div style={{ width: '180px', height: '220px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.1rem' }}>
                    Product 2
                </div>
                <div style={{ width: '180px', height: '220px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '1.1rem' }}>
                    Product 3
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home