function Users() {
  const users = [
    { id: 1, name: 'Admin User', role: 'admin', email: 'admin@inventory.com' },
    { id: 2, name: 'Staff User', role: 'staff', email: 'staff@inventory.com' }
  ]

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B]">
          Users Management
        </h1>
        <p className="text-sm text-slate-500">
          Manage system users and their roles
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-3 bg-slate-50 text-slate-600 text-sm font-medium p-4">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
        </div>

        {/* USERS LIST */}
        <div>

          {users.map((u) => (
            <div
              key={u.id}
              className="grid grid-cols-3 p-4 border-t hover:bg-slate-50 transition"
            >

              {/* NAME */}
              <span className="font-medium text-[#1E293B]">
                {u.name}
              </span>

              {/* EMAIL */}
              <span className="text-slate-500">
                {u.email}
              </span>

              {/* ROLE BADGE */}
              <span
                className={`
                  inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold text-white
                  ${u.role === 'admin' ? 'bg-red-500' : 'bg-[#0D9488]'}
                `}
              >
                {u.role.toUpperCase()}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default Users