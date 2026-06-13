function Reports() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-bold">Inventory Summary</h2>
          <p>Total products, stock value, low stock trends</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-bold">Stock Movement</h2>
          <p>Stock in vs stock out analysis</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-bold">Supplier Performance</h2>
          <p>Delivery tracking and reliability</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-bold">Alerts Report</h2>
          <p>Low stock and out-of-stock history</p>
        </div>

      </div>
    </div>
  )
}

export default Reports