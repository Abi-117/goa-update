import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AdminLayout from "../components/AdminLayout";



interface ContactData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function ContactList() {
  const [contacts, setContacts] = useState<ContactData[]>([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-6">Contact Messages</h1>

        {contacts.length === 0 ? (
          <p className="text-gray-600">No contact messages available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Phone</th>
                  <th className="p-3 border">Message</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="p-3 border">{item.name}</td>
                    <td className="p-3 border">{item.email}</td>
                    <td className="p-3 border">{item.phone}</td>
                    <td className="p-3 border">{item.message}</td>
                    <td className="p-3 border text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 border">
                      <Button
                        variant="destructive"
                        onClick={() => deleteContact(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
