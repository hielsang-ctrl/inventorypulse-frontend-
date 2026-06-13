import { useEffect, useState } from 'react'
import { getDashboard } from '../services/api'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await getDashboard()
        setData(res)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading dashboard...
      </div>
    )
  }

  const chartData = data?.monthlyMovements || [
    { month: 'Jan', stock: 20 },
    { month: 'Feb', stock: 40 },
    { month: 'Mar', stock: 30 }
  ]

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-[#1E293B]">
        Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded shadow">
          <p className="text-sm text-gray-500">Products</p>
          <h2 className="text-2xl font-bold">
            {data?.totalProducts ?? 0}
          </h2>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <p className="text-sm text-gray-500">Total Value</p>
          <h2 className="text-2xl font-bold">
            {data?.totalValue ?? 0}
          </h2>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <p className="text-sm text-gray-500">Low Stock</p>
          <h2 className="text-2xl font-bold text-red-500">
            {data?.lowStockCount ?? 0}
          </h2>
        </div>

      </div>

      {/* CHART */}
      <div className="bg-white p-5 shadow rounded h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>

            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="stock"
              stroke="#1E3A5F"
              strokeWidth={2}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default Dashboard