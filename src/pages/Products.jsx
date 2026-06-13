import { useState } from 'react'

function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 80000, stock: 5 },
    { id: 2, name: 'Mouse', price: 1500, stock: 2 },
    { id: 3, name: 'Keyboard', price: 3500, stock: 0 }
  ])

  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: ''
  })

  // ADD PRODUCT
  const handleAdd = (e) => {
    e.preventDefault()

    if (!form.name || !form.price || !form.stock) return

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock)
    }

    setProducts([...products, newProduct])

    setForm({ name: '', price: '', stock: '' })
  }

  // DELETE PRODUCT
  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B]">
          Products
        </h1>
        <p className="text-sm text-slate-500">
          Manage inventory products
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-3"
      >

        <div className="grid grid-cols-3 gap-3">

          <input
            className="border p-2 rounded"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

        </div>

        <button
          className="bg-[#1E3A5F] text-white px-4 py-2 rounded"
        >
          Add Product
        </button>

      </form>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-slate-50 text-slate-600 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">

                <td className="p-4 font-medium">
                  {p.name}
                </td>

                <td className="p-4">
                  KES {p.price}
                </td>

                <td className="p-4">
                  {p.stock}
                </td>

                <td className="p-4">
                  {p.stock === 0 ? (
                    <span className="text-red-500 font-semibold">
                      Out of stock
                    </span>
                  ) : p.stock <= 3 ? (
                    <span className="text-amber-500 font-semibold">
                      Low stock
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      In stock
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Products