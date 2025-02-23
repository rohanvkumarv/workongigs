

// // "use client"
// // import React, { useState, useEffect } from 'react';
// // import { User, Edit2, BellRing, ChevronRight } from 'lucide-react';
// // import { useAuth } from '@/context/authContext';

// // const ProfileContent = () => {
// //   const { freelancerId, email, isAuthenticated, isLoading, logout } = useAuth();
  
// //   const [userData, setUserData] = useState({
// //     name: '',
// //     mobile: '',
// //     email: '',
// //     city: '',
// //     country: '',
// //     pincode: '',
// //     profession: ''
// //   });

// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editedData, setEditedData] = useState(userData);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');

// //   useEffect(() => {
// //     const fetchDetails = async () => {
// //       if (freelancerId) {
// //         try {
// //           const response = await fetch('/api/get-details', {
// //             method: 'POST',
// //             headers: {
// //               'Content-Type': 'application/json'
// //             },
// //             body: JSON.stringify({ freelancerId })
// //           });
          
// //           if (!response.ok) {
// //             throw new Error('Failed to fetch details');
// //           }
          
// //           const data = await response.json();
// //           setUserData(data);
// //           setEditedData(data); // Initialize editedData with current data
// //         } catch (error) {
// //           console.error('Error:', error);
// //           setError('Error fetching freelancer details');
// //         }
// //       }
// //     };

// //     fetchDetails();
// //   }, [freelancerId]);

// //   const handleEdit = async () => {
// //     if (isEditing) {
// //       try {
// //         const response = await fetch('/api/update-details', {
// //           method: 'PUT',
// //           headers: {
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({
// //             freelancerId,
// //             ...editedData  // Send all data
// //           })
// //         });

// //         if (!response.ok) {
// //           const errorData = await response.json();
// //           throw new Error(errorData.error || 'Failed to update details');
// //         }

// //         const updatedData = await response.json();
// //         setUserData(updatedData);
// //         setSuccess('Profile updated successfully!');
// //         setTimeout(() => setSuccess(''), 3000);
// //       } catch (error) {
// //         console.error('Error:', error);
// //         setError(error.message || 'Error updating profile');
// //         setTimeout(() => setError(''), 3000);
// //         return; // Don't exit edit mode on error
// //       }
// //     } else {
// //       // Entering edit mode - set editedData to current userData
// //       setEditedData(userData);
// //     }
// //     setIsEditing(!isEditing);
// //   };

// //   const handleFieldChange = (key, value) => {
// //     setEditedData(prev => ({
// //       ...prev,
// //       [key]: value
// //     }));
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
// //         <div className="text-xl text-gray-600">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-8 bg-gray-50 min-h-screen">
// //       <div className="max-w-4xl mx-auto space-y-6">
// //         {/* Success/Error Messages */}
// //         {(success || error) && (
// //           <div className={`p-4 rounded-lg ${success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
// //             {success || error}
// //           </div>
// //         )}

// //         {/* Profile Section */}
// //         <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
// //           <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-gray-50">
// //             <div className="flex items-center">
// //               <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
// //                 <User className="w-5 h-5" />
// //               </div>
// //               <h2 className="text-xl font-semibold text-gray-900 ml-4">Your Profile Details</h2>
// //             </div>
// //             <div className="flex gap-4">
// //               {isEditing && (
// //                 <button
// //                   onClick={() => {
// //                     setIsEditing(false);
// //                     setEditedData(userData);
// //                   }}
// //                   className="flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50"
// //                 >
// //                   Cancel
// //                 </button>
// //               )}
// //               <button
// //                 onClick={handleEdit}
// //                 className="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all
// //                        hover:scale-105 active:scale-95"
// //                 style={{
// //                   backgroundColor: isEditing ? '#000' : '#fff',
// //                   color: isEditing ? '#fff' : '#000',
// //                   border: '1px solid #000'
// //                 }}
// //               >
// //                 <Edit2 className="w-4 h-4 mr-2" />
// //                 {isEditing ? 'Save Changes' : 'Edit Profile'}
// //               </button>
// //             </div>
// //           </div>

// //           <div className="p-6 grid grid-cols-2 gap-6">
// //             {Object.entries(userData).map(([key, value]) => (
// //               <div key={key} className="space-y-2">
// //                 <label className="text-sm font-medium text-gray-500 capitalize">
// //                   {key}
// //                 </label>
// //                 {isEditing ? (
// //                   <input
// //                     type="text"
// //                     value={editedData[key] || ''}
// //                     onChange={(e) => handleFieldChange(key, e.target.value)}
// //                     disabled={key === 'email'}
// //                     className={`w-full px-4 py-2 rounded-lg border border-gray-200 
// //                               ${key === 'email' ? 'bg-gray-50 cursor-not-allowed' : 'focus:border-black focus:ring-1 focus:ring-black'}
// //                               transition-colors`}
// //                   />
// //                 ) : (
// //                   <p className="text-base text-gray-900 py-2">{value || '-'}</p>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Bank Details Section */}
// //         <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
// //           <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-gray-50">
// //             <div className="flex items-center">
// //               <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
// //                 <BellRing className="w-5 h-5" />
// //               </div>
// //               <h2 className="text-xl font-semibold text-gray-900 ml-4">Bank Details</h2>
// //             </div>
// //             <span className="px-4 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
// //               Coming Soon
// //             </span>
// //           </div>

// //           <div className="p-8 text-center bg-gradient-to-b from-white to-gray-50">
// //             <div className="max-w-md mx-auto">
// //               <p className="text-gray-600 mb-4">
// //                 Bank details section is under development. Soon you'll be able to add your bank information for easy withdrawals.
// //               </p>
// //               <button
// //                 disabled
// //                 className="flex items-center justify-center w-full px-4 py-2 rounded-lg 
// //                          bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100"
// //               >
// //                 Add Bank Details
// //                 <ChevronRight className="w-4 h-4 ml-2" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileContent;

// "use client"
// import React, { useState, useEffect } from 'react';
// import { User, Edit2, BellRing, ChevronRight } from 'lucide-react';
// import { useAuth } from '@/context/authContext';

// const ProfileContent = () => {
//   const { freelancerId, email, isAuthenticated, isLoading, logout } = useAuth();
  
//   const [userData, setUserData] = useState({
//     name: '',
//     mobile: '',
//     email: '',
//     city: '',
//     country: '',
//     pincode: '',
//     profession: ''
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState(userData);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       if (!freelancerId) return;
      
//       try {
//         const response = await fetch('/api/get-details', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ freelancerId })
//         });
        
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || 'Failed to fetch details');
//         }
        
//         const data = await response.json();
//         setUserData(data);
//         setEditedData(data);
//       } catch (error) {
//         console.error('Error:', error);
//         setError('Error fetching freelancer details');
//         setTimeout(() => setError(''), 3000);
//       }
//     };

//     fetchDetails();
//   }, [freelancerId]);

//   const validateForm = () => {
//     if (!editedData.name?.trim()) {
//       setError('Name is required');
//       return false;
//     }
//     if (editedData.mobile && !/^\d{10}$/.test(editedData.mobile)) {
//       setError('Mobile number must be 10 digits');
//       return false;
//     }
//     if (editedData.pincode && !/^\d{6}$/.test(editedData.pincode)) {
//       setError('Pincode must be 6 digits');
//       return false;
//     }
//     return true;
//   };
//   const handleEdit = async () => {
//     if (isEditing) {
//       if (!validateForm()) {
//         setTimeout(() => setError(''), 3000);
//         return;
//       }
  
//       setIsSubmitting(true);
//       try {
//         // Simply pass the data as-is
//         const dataToUpdate = {
//           freelancerId,
//           ...editedData
//         };
  
//         const response = await fetch('/api/update-details', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(dataToUpdate)
//         });
  
//         const data = await response.json();
  
//         if (!response.ok) {
//           throw new Error(data.error || 'Failed to update details');
//         }
  
//         setUserData(data);
//         setSuccess('Profile updated successfully!');
//         setIsEditing(false);
//       } catch (error) {
//         console.error('Error:', error);
//         setError(error.message || 'Error updating profile');
//       } finally {
//         setIsSubmitting(false);
//         setTimeout(() => {
//           setError('');
//           setSuccess('');
//         }, 3000);
//       }
//     } else {
//       setEditedData(userData);
//       setIsEditing(true);
//     }
//   };
 
//   const handleFieldChange = (key, value) => {
//     setEditedData(prev => ({
//       ...prev,
//       [key]: value
//     }));
//     // Clear any existing error when user starts typing
//     if (error) setError('');
//   };

//   if (isLoading) {
//     return (
//       <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
//         <div className="text-xl text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   if (!isAuthenticated || !freelancerId) {
//     return (
//       <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
//         <div className="text-xl text-gray-600">Please login to view your profile</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* Success/Error Messages */}
//         {(success || error) && (
//           <div className={`p-4 rounded-lg ${success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
//             {success || error}
//           </div>
//         )}

//         {/* Profile Section */}
//         <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-gray-50">
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
//                 <User className="w-5 h-5" />
//               </div>
//               <h2 className="text-xl font-semibold text-gray-900 ml-4">Your Profile Details</h2>
//             </div>
//             <div className="flex gap-4">
//               {isEditing && (
//                 <button
//                   onClick={() => {
//                     setIsEditing(false);
//                     setEditedData(userData);
//                     setError('');
//                   }}
//                   className="flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//               )}
//               <button
//                 onClick={handleEdit}
//                 disabled={isSubmitting}
//                 className="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all
//                        hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                 style={{
//                   backgroundColor: isEditing ? '#000' : '#fff',
//                   color: isEditing ? '#fff' : '#000',
//                   border: '1px solid #000'
//                 }}
//               >
//                 <Edit2 className="w-4 h-4 mr-2" />
//                 {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
//               </button>
//             </div>
//           </div>

//           <div className="p-6 grid grid-cols-2 gap-6">
//             {Object.entries(userData).map(([key, value]) => (
//               <div key={key} className="space-y-2">
//                 <label className="text-sm font-medium text-gray-500 capitalize">
//                   {key}
//                 </label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={editedData[key] || ''}
//                     onChange={(e) => handleFieldChange(key, e.target.value)}
//                     disabled={key === 'email' || isSubmitting}
//                     className={`w-full px-4 py-2 rounded-lg border border-gray-200 
//                               ${key === 'email' ? 'bg-gray-50 cursor-not-allowed' : 'focus:border-black focus:ring-1 focus:ring-black'}
//                               transition-colors disabled:opacity-50`}
//                     placeholder={`Enter your ${key.toLowerCase()}`}
//                   />
//                 ) : (
//                   <p className="text-base text-gray-900 py-2">{value || '-'}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bank Details Section */}
//         <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-gray-50">
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
//                 <BellRing className="w-5 h-5" />
//               </div>
//               <h2 className="text-xl font-semibold text-gray-900 ml-4">Bank Details</h2>
//             </div>
//             <span className="px-4 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
//               Coming Soon
//             </span>
//           </div>

//           <div className="p-8 text-center bg-gradient-to-b from-white to-gray-50">
//             <div className="max-w-md mx-auto">
//               <p className="text-gray-600 mb-4">
//                 Bank details section is under development. Soon you'll be able to add your bank information for easy withdrawals.
//               </p>
//               <button
//                 disabled
//                 className="flex items-center justify-center w-full px-4 py-2 rounded-lg 
//                          bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100"
//               >
//                 Add Bank Details
//                 <ChevronRight className="w-4 h-4 ml-2" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileContent;

"use client"
import React, { useState, useEffect } from 'react';
import { User, Edit2, BellRing, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/authContext';

const ProfileContent = () => {
  const { freelancerId, email, isAuthenticated, isLoading } = useAuth();

  // Fields to display in the UI
  const displayFields = [
    'name',
    'email',
    'mobile',
    'city',
    'country',
    'pincode',
    'profession'
  ];
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    country: '',
    pincode: '',
    profession: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!freelancerId) return;
      
      try {
        const response = await fetch('/api/get-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ freelancerId })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch details');
        }
        
        const data = await response.json();
        setUserData(data);
        setEditedData(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Error fetching freelancer details');
        setTimeout(() => setError(''), 3000);
      }
    };

    fetchDetails();
  }, [freelancerId]);

  const validateForm = () => {
    if (!editedData.name?.trim()) {
      setError('Name is required');
      return false;
    }
    if (editedData.mobile && !/^\d{10}$/.test(editedData.mobile)) {
      setError('Mobile number must be 10 digits');
      return false;
    }
    if (editedData.pincode && !/^\d{6}$/.test(editedData.pincode)) {
      setError('Pincode must be 6 digits');
      return false;
    }
    return true;
  };

  const handleEdit = async () => {
    if (isEditing) {
      if (!validateForm()) {
        setTimeout(() => setError(''), 3000);
        return;
      }
  
      setIsSubmitting(true);
      try {
        const dataToUpdate = {
          freelancerId,
          ...editedData
        };
  
        const response = await fetch('/api/update-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToUpdate)
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || 'Failed to update details');
        }
  
        setUserData(data);
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'Error updating profile');
      } finally {
        setIsSubmitting(false);
        setTimeout(() => {
          setError('');
          setSuccess('');
        }, 3000);
      }
    } else {
      setEditedData(userData);
      setIsEditing(true);
    }
  };
 
  const handleFieldChange = (key, value) => {
    setEditedData(prev => ({
      ...prev,
      [key]: value
    }));
    if (error) setError('');
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !freelancerId) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Please login to view your profile</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Success/Error Messages */}
        {(success || error) && (
          <div className={`p-4 rounded-lg ${success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {success || error}
          </div>
        )}

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 ml-4">Your Profile Details</h2>
            </div>
            <div className="flex gap-4">
              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedData(userData);
                    setError('');
                  }}
                  className="flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleEdit}
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all
                       hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: isEditing ? '#000' : '#fff',
                  color: isEditing ? '#fff' : '#000',
                  border: '1px solid #000'
                }}
              >
                <Edit2 className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-2 gap-6">
            {displayFields.map((key) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium text-gray-500 capitalize">
                  {key}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData[key] || ''}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    disabled={key === 'email' || isSubmitting}
                    className={`w-full px-4 py-2 rounded-lg border border-gray-200 
                              ${key === 'email' ? 'bg-gray-50 cursor-not-allowed' : 'focus:border-black focus:ring-1 focus:ring-black'}
                              transition-colors disabled:opacity-50`}
                    placeholder={`Enter your ${key.toLowerCase()}`}
                  />
                ) : (
                  <p className="text-base text-gray-900 py-2">{userData[key] || '-'}</p>
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