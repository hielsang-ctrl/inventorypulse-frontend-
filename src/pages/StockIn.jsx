import { useState } from 'react'
import { stockIn } from '../services/api'

function StockIn() {
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!productId || !quantity) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)

    try {
      await stockIn({
        productId,
        quantity: Number(quantity)
      })

      alert('Stock increased successfully')

      setProductId('')
      setQuantity('')
    } catch (error) {
      alert('Failed to add stock')
    }

    setLoading(false)
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B]">
          Stock In
        </h1>
        <p className="text-sm text-slate-500">
          Increase product inventory levels
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow border space-y-4"
      >

        {/* PRODUCT ID */}
        <div>
          <label className="text-sm text-slate-600">Product ID</label>
          <input
            className="w-full border p-2 rounded mt-1"
            placeholder="e.g. 101"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>

        {/* QUANTITY */}
        <div>
          <label className="text-sm text-slate-600">Quantity</label>
          <input
            className="w-full border p-2 rounded mt-1"
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-[#1E3A5F]'
          }`}
        >
          {loading ? 'Processing...' : 'Add Stock'}
        </button>

      </form>

    </div>
  )
}

export default StockIn