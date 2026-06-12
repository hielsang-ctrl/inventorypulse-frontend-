import { useParams } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-bold">Product Detail</h1>

      <div className="bg-white p-4 shadow rounded mt-4">
        <p>Product ID: {id}</p>
        <p>This page will show full product info (backend ready)</p>
      </div>
    </div>
  )
}

export default ProductDetail