"use client"
import React, { useState } from 'react';
import { User, Edit2, BellRing, ChevronRight } from 'lucide-react';

const ProfileContent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    number: '+1 234 567 8900',
    gmail: 'john.doe@gmail.com',
    city: 'New York',
    country: 'United States',
    pincode: '10001',
    profession: 'Software Developer'
  });

  const [editedData, setEditedData] = useState(userData);

  const handleEdit = () => {
    if (isEditing) {
      setUserData(editedData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 ml-4">Your Profile Details</h2>
            </div>
            <button
              onClick={handleEdit}
              className="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all
                     hover:scale-105 active:scale-95"
              style={{
                backgroundColor: isEditing ? '#000' : '#fff',
                color: isEditing ? '#fff' : '#000',
                border: '1px solid #000'
              }}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="p-6 grid grid-cols-2 gap-6">
            {Object.entries(userData).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium text-gray-500 capitalize">
                  {key}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData[key]}
                    onChange={(e) => setEditedData({ ...editedData, [key]: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black 
                           focus:ring-1 focus:ring-black transition-colors"
                  />
                ) : (
                  <p className="text-base text-gray-900 py-2">{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                <BellRing className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 ml-4">Bank Details</h2>
            </div>
            <span className="px-4 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
              Coming Soon
            </span>
          </div>

          <div className="p-8 text-center bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-md mx-auto">
              <p className="text-gray-600 mb-4">
                Bank details section is under development. Soon you'll be able to add your bank information for easy withdrawals.
              </p>
              <button
                disabled
                className="flex items-center justify-center w-full px-4 py-2 rounded-lg 
                         bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100"
              >
                Add Bank Details
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;