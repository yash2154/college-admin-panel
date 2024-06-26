import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminCard from "./AdminCard"; // Importing the AdminCard component

interface Admin {
  name: string;
  username: string;
  email: string;
}

const AdminList: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/admin/getalladmin"
        );
        setAdmins(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch admin data");
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-[89vh] w-[85vw] overflow-auto flex flex-col items-center p-4 bg-gray-900">
      <div className="w-full md:w-[80%] flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg shadow-lg bg-gray-900 mt-6 p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-300 mb-4">
          Admin <span className="text-blue-500">List</span>
        </h1>
        {admins.map((admin) => (
          <AdminCard key={admin.username} admin={admin} />
        ))}
      </div>
    </div>
  );
};

export default AdminList;
