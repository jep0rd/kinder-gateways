import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <ul className="mt-6">
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Pending</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Approved</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Declined</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Payment</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">User Settings</li>
        </ul>
      </div>
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard!</h2>
        <p className="mt-4">
          This is an example of an admin dashboard built with ReactJS and Tailwind CSS.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
