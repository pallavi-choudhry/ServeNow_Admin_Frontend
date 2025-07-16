function UserManagement({ users, setUsers }) {
  return (
    <div className="ml-72 mt-6 px-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Username</th>
            <th className="p-3">Activity</th>
            <th className="p-3">Issues</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.activity}</td>
              <td className="p-3">{user.issues}</td>
              <td className="p-3">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => setUsers(users.filter((u) => u.id !== user.id))}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
