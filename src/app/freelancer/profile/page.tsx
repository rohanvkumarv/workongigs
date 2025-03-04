
// "use client"
// import React, { useState, useEffect } from 'react';
// import { User, Edit2, BellRing, ChevronRight } from 'lucide-react';
// import { useAuth } from '@/context/authContext';

// const ProfileContent = () => {
//   const { freelancerId, email, isAuthenticated, isLoading } = useAuth();

//   // Fields to display in the UI
//   const displayFields = [
//     'name',
//     'email',
//     'mobile',
//     'city',
//     'country',
//     'pincode',
//     'profession'
//   ];
  
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
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
//             {displayFields.map((key) => (
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
//                   <p className="text-base text-gray-900 py-2">{userData[key] || '-'}</p>
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
import React, { useState, useEffect, useRef } from 'react';
import { User, Edit2, BellRing, ChevronRight, Upload, Camera } from 'lucide-react';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';

const ProfileContent = () => {
  const { freelancerId, email, isAuthenticated, isLoading } = useAuth();
  const fileInputRef = useRef(null);

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
    profession: '',
    profileImage: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

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
        setPreviewImage('');
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

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to S3
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('freelancerId', freelancerId);

      const response = await fetch('/api/upload-pfp', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const data = await response.json();
      
      // Update editedData with the new image URL
      setEditedData(prev => ({
        ...prev,
        profileImage: data.imageUrl
      }));
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Error uploading image');
      setTimeout(() => setError(''), 3000);
    } finally {
      setUploadingImage(false);
    }
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

  // Determine which image URL to display
  const displayImageUrl = previewImage || editedData.profileImage || userData.profileImage;

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
                    setPreviewImage('');
                  }}
                  className="flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || uploadingImage}
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleEdit}
                disabled={isSubmitting || uploadingImage}
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

          <div className="p-6">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-8">
              <div 
                className={`relative w-24 h-24 rounded-full overflow-hidden mb-2 
                          border-2 border-gray-200 ${isEditing ? 'cursor-pointer' : ''}`}
                onClick={handleImageClick}
              >
                {displayImageUrl ? (
                  <Image 
                    src={displayImageUrl} 
                    alt="Profile" 
                    fill 
                    style={{ objectFit: 'cover' }}
                    className={uploadingImage ? 'opacity-50' : ''}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                )}
                
                {uploadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                    <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
              </div>
              
              {isEditing && (
                <span className="text-sm text-gray-500">
                  Click to {userData.profileImage ? 'change' : 'upload'} profile picture
                </span>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange}
                accept="image/jpeg, image/png, image/gif, image/webp" 
                className="hidden" 
              />
            </div>

            {/* Profile Fields Grid */}
            <div className="grid grid-cols-2 gap-6">
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