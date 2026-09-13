import { useEffect, useState } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all users
  const getUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/users",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Users:", data);

      if (response.ok) {
        
        setUsers(data.users);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Promote member to trainer
  const makeTrainer = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/update-role/${userId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("Role update:", data);

      if (response.ok) {
        alert("User promoted to trainer successfully!");

        // Refresh users after role update
        getUsers();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  return (
    <div>
      <h1>Manage Users</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.role}</td>

                <td>
                  {user.role === "member" && (
                    <button
                      onClick={() => makeTrainer(user._id)}
                    >
                      Make Trainer
                    </button>
                  )}

                  {user.role === "trainer" && (
                    <span>Trainer</span>
                  )}

                  {user.role === "admin" && (
                    <span>Admin</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;