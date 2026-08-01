import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'


const Home = () => {
  const [products, setProduct] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const data = await res.json();
        setProduct(data.slice(0, 4))  // featured products 
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className='home-container'>
      <div className='hero-banner'>
        <h1>Welcome to Shopnest</h1>
        <p>Discover the best product at unbeatable price</p>
      </div>

      {loading ? (
        <div>Loading...</div>
      ): (
        <div className='product-grid'>
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      )
      }
    </div>
  )
}

export default Home