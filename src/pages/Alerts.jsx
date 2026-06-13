import { useEffect, useState } from 'react'
import { getLowStockAlerts } from '../services/api'

function Alerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    async function load() {
      const data = await getLowStockAlerts()
      setAlerts(data)
    }

    load()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Low Stock Alerts</h1>

      <div className="space-y-3">

        {alerts.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded shadow bg-white border-l-4
              ${item.stock === 0
                ? 'border-red-500'
                : item.stock <= item.minStock / 2
                ? 'border-yellow-500'
                : 'border-amber-500'
              }`}
          >
            <p className="font-bold">{item.name}</p>
            <p>Stock: {item.stock}</p>
            <p>Minimum: {item.minStock}</p>

            {item.stock === 0 && (
              <p className="text-red-500 font-semibold">OUT OF STOCK</p>
            )}
          </div>
        ))}

      </div>
    </div>
  )
}

export default Alerts