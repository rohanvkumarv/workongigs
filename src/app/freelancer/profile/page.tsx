
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { User, Edit2, BellRing, ChevronRight, Upload, Camera, Save, X } from 'lucide-react';
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
    profileImage: '',
    bankAccountNumber: '',
    bankName: '',
    ifscCode: '',
    bankEmail: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bankError, setBankError] = useState('');
  const [bankSuccess, setBankSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingBank, setIsSubmittingBank] = useState(false);
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

  const validateBankForm = () => {
    if (editedData.ifscCode && editedData.ifscCode.length !== 11) {
      setBankError('IFSC code must be 11 characters');
      return false;
    }
    if (editedData.bankEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedData.bankEmail)) {
      setBankError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleBankEdit = async () => {
    if (isEditingBank) {
      if (!validateBankForm()) {
        setTimeout(() => setBankError(''), 3000);
        return;
      }

      setIsSubmittingBank(true);
      try {
        const response = await fetch('/api/update-banking-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            freelancerId,
            bankAccountNumber: editedData.bankAccountNumber,
            bankName: editedData.bankName,
            ifscCode: editedData.ifscCode,
            bankEmail: editedData.bankEmail
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to update banking information');
        }

        setUserData(prev => ({
          ...prev,
          bankAccountNumber: data.bankingInfo.bankAccountNumber,
          bankName: data.bankingInfo.bankName,
          ifscCode: data.bankingInfo.ifscCode,
          bankEmail: data.bankingInfo.bankEmail
        }));
        setBankSuccess('Banking information updated successfully!');
        setIsEditingBank(false);
      } catch (error) {
        console.error('Error:', error);
        setBankError(error.message || 'Error updating banking information');
      } finally {
        setIsSubmittingBank(false);
        setTimeout(() => {
          setBankError('');
          setBankSuccess('');
        }, 3000);
      }
    } else {
      setIsEditingBank(true);
    }
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
      <div className="p-4 sm:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-lg sm:text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !freelancerId) {
    return (
      <div className="p-4 sm:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-lg sm:text-xl text-gray-600 text-center">Please login to view your profile</div>
      </div>
    );
  }

  // Determine which image URL to display
  const displayImageUrl = previewImage || editedData.profileImage || userData.profileImage;

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Success/Error Messages */}
        {(success || error) && (
          <div className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base ${success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {success || error}
          </div>
        )}

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 ml-3 sm:ml-4">Your Profile Details</h2>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedData(userData);
                    setError('');
                    setPreviewImage('');
                  }}
                  className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                  disabled={isSubmitting || uploadingImage}
                >
                  <X className="w-4 h-4 mr-1 sm:mr-2" />
                  Cancel
                </button>
              )}
              <button
                onClick={handleEdit}
                disabled={isSubmitting || uploadingImage}
                className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all
                       hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                style={{
                  backgroundColor: isEditing ? '#000' : '#fff',
                  color: isEditing ? '#fff' : '#000',
                  border: '1px solid #000'
                }}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-1 sm:mr-2" />
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-1 sm:mr-2" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <div 
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-2 
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
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                  </div>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                )}
                
                {uploadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                    <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
              </div>
              
              {isEditing && (
                <span className="text-xs sm:text-sm text-gray-500">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {displayFields.map((key) => (
                <div key={key} className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-500 capitalize">
                    {key}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData[key] || ''}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                      disabled={key === 'email' || isSubmitting}
                      className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-200 
                                ${key === 'email' ? 'bg-gray-50 cursor-not-allowed' : 'focus:border-black focus:ring-1 focus:ring-black'}
                                transition-colors disabled:opacity-50`}
                      placeholder={`Enter your ${key.toLowerCase()}`}
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-1 sm:py-2 break-words">{userData[key] || '-'}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="bg-white rounded-xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <BellRing className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 ml-3 sm:ml-4">Banking Information</h2>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              {isEditingBank && (
                <button
                  onClick={() => {
                    setIsEditingBank(false);
                    setEditedData(userData);
                    setBankError('');
                  }}
                  className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                  disabled={isSubmittingBank}
                >
                  <X className="w-4 h-4 mr-1 sm:mr-2" />
                  Cancel
                </button>
              )}
              <button
                onClick={handleBankEdit}
                disabled={isSubmittingBank}
                className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all
                       hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                style={{
                  backgroundColor: isEditingBank ? '#10b981' : '#fff',
                  color: isEditingBank ? '#fff' : '#10b981',
                  border: '1px solid #10b981'
                }}
              >
                {isEditingBank ? (
                  <>
                    <Save className="w-4 h-4 mr-1 sm:mr-2" />
                    {isSubmittingBank ? 'Saving...' : 'Save Banking Info'}
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-1 sm:mr-2" />
                    Edit Banking Info
                  </>
                )}
              </button>
            </div>
          </div>

          {(bankSuccess || bankError) && (
            <div className={`p-3 sm:p-4 mx-4 sm:mx-6 mt-4 rounded-lg text-sm sm:text-base ${bankSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {bankSuccess || bankError}
            </div>
          )}

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Bank Account Number
                </label>
                {isEditingBank ? (
                  <input
                    type="text"
                    value={editedData.bankAccountNumber || ''}
                    onChange={(e) => handleFieldChange('bankAccountNumber', e.target.value)}
                    disabled={isSubmittingBank}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-200
                              focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors disabled:opacity-50"
                    placeholder="Enter bank account number"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-gray-900 py-1 sm:py-2 break-words">{userData.bankAccountNumber || '-'}</p>
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Bank Name
                </label>
                {isEditingBank ? (
                  <input
                    type="text"
                    value={editedData.bankName || ''}
                    onChange={(e) => handleFieldChange('bankName', e.target.value)}
                    disabled={isSubmittingBank}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-200
                              focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors disabled:opacity-50"
                    placeholder="Enter bank name"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-gray-900 py-1 sm:py-2 break-words">{userData.bankName || '-'}</p>
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  IFSC Code
                </label>
                {isEditingBank ? (
                  <input
                    type="text"
                    value={editedData.ifscCode || ''}
                    onChange={(e) => handleFieldChange('ifscCode', e.target.value.toUpperCase())}
                    disabled={isSubmittingBank}
                    maxLength={11}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-200
                              focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors disabled:opacity-50"
                    placeholder="Enter IFSC code (11 characters)"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-gray-900 py-1 sm:py-2 break-words">{userData.ifscCode || '-'}</p>
                )}
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium text-gray-500">
                  Email for Payments
                </label>
                {isEditingBank ? (
                  <input
                    type="email"
                    value={editedData.bankEmail || ''}
                    onChange={(e) => handleFieldChange('bankEmail', e.target.value)}
                    disabled={isSubmittingBank}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-200
                              focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors disabled:opacity-50"
                    placeholder="Enter email for payment notifications"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-gray-900 py-1 sm:py-2 break-words">{userData.bankEmail || '-'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;