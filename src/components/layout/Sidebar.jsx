import { NavLink } from 'react-router-dom'

function Sidebar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-[#0D9488] text-white px-3 py-2 rounded-lg block"
      : "text-white hover:bg-[#1E4E6B] px-3 py-2 rounded-lg block"

  return (
    <div className="w-64 bg-[#1E3A5F] text-white min-h-screen p-4">

      {/* BRAND */}
      <h1 className="text-2xl font-bold mb-8">
        InventoryPulse
      </h1>

      {/* MAIN NAV */}
      <div className="space-y-2">

        <p className="text-xs text-slate-300 mb-2 uppercase">
          Main
        </p>

        <NavLink to="/" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>

        <NavLink to="/stock-in" className={linkClass}>
          Stock In
        </NavLink>

      </div>

    </div>
  )
}

export default Sidebar