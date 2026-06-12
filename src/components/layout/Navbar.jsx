import useAuthStore from '../../store/authStore'

function Navbar() {
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)

  return (
    <div className="h-14 flex items-center justify-between px-4 border-b bg-white">

      <h1 className="text-lg font-bold text-[#1E3A5F]">
        InventoryPulse
      </h1>

      <div className="flex items-center gap-3">

        {user && (
          <span className="text-sm text-gray-600">
            {user.email}
          </span>
        )}

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  )
}

export default Navbar