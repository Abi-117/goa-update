import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const ServicesList = () => {
  const [services, setServices] = useState([]);

  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/services");
    setServices(res.data);
  };

  const remove = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/services/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <AdminLayout>
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Services</h2>
        <Link
          to="/admin/services/add"
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Add Service
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Image</th>
            <th>Title</th>
            <th>Timing</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map((s: any) => (
            <tr key={s._id}>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${s.image}`}
                  className="w-24"
                />
              </td>
              <td>{s.title}</td>
              <td>{s.timing}</td>
              <td>
                <Link
                  to={`/admin/services/edit/${s._id}`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => remove(s._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>
  );
};

export default ServicesList;
