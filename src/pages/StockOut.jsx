import { useState } from 'react'
import { stockOut } from '../services/api'

function StockOut() {
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    await stockOut({
      productId,
      quantity: Number(quantity)
    })

    alert('Stock reduced')
    setProductId('')
    setQuantity('')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stock Out</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-3">

        <input
          className="w-full border p-2"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          className="w-full border p-2"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button className="bg-red-600 text-white px-4 py-2 rounded">
          Remove Stock
        </button>

      </form>
    </div>
  )
}

export default StockOut