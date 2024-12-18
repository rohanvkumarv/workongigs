// "use client";

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Check, X, Eye, EyeOff, ArrowLeft } from 'lucide-react';

// const ResetPasswordPage = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [validationState, setValidationState] = useState({
//     minLength: false,
//     hasUpperCase: false,
//     hasLowerCase: false,
//     hasNumber: false,
//     hasSpecial: false
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Validate password in real-time
//   useEffect(() => {
//     setValidationState({
//       minLength: newPassword.length >= 8,
//       hasUpperCase: /[A-Z]/.test(newPassword),
//       hasLowerCase: /[a-z]/.test(newPassword),
//       hasNumber: /[0-9]/.test(newPassword),
//       hasSpecial: /[^A-Za-z0-9]/.test(newPassword),
//     });
//   }, [newPassword]);

//   const renderPasswordCheck = (condition, text) => (
//     <motion.div 
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="flex items-center gap-2 text-sm"
//     >
//       {condition ? 
//         <Check size={16} className="text-green-500" /> : 
//         <X size={16} className="text-gray-300" />}
//       <span className={condition ? "text-green-500" : "text-gray-400"}>{text}</span>
//     </motion.div>
//   );

//   const handlePasswordReset = () => {
//     // Basic client-side validation
//     if (!Object.values(validationState).every(Boolean)) {
//       setErrorMessage('Please meet all password requirements');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setErrorMessage('Passwords do not match');
//       return;
//     }

//     // Here you would typically add your password reset logic
//     console.log('Password reset attempted');
//     alert('Password reset functionality to be implemented');
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-24">
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handlePasswordReset();
//         }}
//         className="rounded-3xl p-8 shadow-sm"
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="space-y-6 pt-8"
//         >
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
//             <p className="text-gray-500 mt-2">Enter your new password below</p>
//           </div>

//           <div className="space-y-4">
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="New Password"
//                 className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300 pr-10"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Confirm New Password"
//               className={`w-full p-3.5 rounded-2xl border bg-white focus:outline-none ${
//                 confirmPassword && newPassword !== confirmPassword
//                   ? 'border-red-300 focus:border-red-400'
//                   : 'border-gray-200 focus:border-gray-300'
//               }`}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />

//             {errorMessage && (
//               <div className="bg-red-50 p-3 rounded-xl text-red-600 text-sm">
//                 {errorMessage}
//               </div>
//             )}

//             <div className="bg-gray-50 p-4 rounded-xl space-y-2">
//               {renderPasswordCheck(validationState.minLength, "At least 8 characters")}
//               {renderPasswordCheck(validationState.hasUpperCase, "One uppercase letter")}
//               {renderPasswordCheck(validationState.hasLowerCase, "One lowercase letter")}
//               {renderPasswordCheck(validationState.hasNumber, "One number")}
//               {renderPasswordCheck(validationState.hasSpecial, "One special character")}
//             </div>
//           </div>
//         </motion.div>

//         <div className="flex justify-between items-center mt-8">
//           <div
//             onClick={() => {/* Handle go back */}}
//             className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 rounded-2xl cursor-pointer"
//           >
//             <ArrowLeft size={20} />
//             Go back
//           </div>

//           <button
//             type="submit"
//             className={`px-6 py-2.5 rounded-2xl transition-colors ${
//               (!newPassword || !confirmPassword || 
//                !Object.values(validationState).every(Boolean))
//                 ? 'bg-gray-300 cursor-not-allowed'
//                 : 'bg-black text-white hover:bg-gray-800'
//             }`}
//             disabled={
//               !newPassword || !confirmPassword || 
//               !Object.values(validationState).every(Boolean)
//             }
//           >
//             Reset Password
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ResetPasswordPage;
// "use client";

// import React, { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Eye, Lock } from 'lucide-react';

// const ResetPasswordPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');
  
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (formData.newPassword !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (formData.newPassword.length < 8) {
//       setError('Password must be at least 8 characters long');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch('/api/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           token,
//           newPassword: formData.newPassword,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess(true);
//         // Redirect to login page after 2 seconds
//         setTimeout(() => {
//           router.push('/auth/user/login');
//         }, 2000);
//       } else {
//         setError(data.error || 'Failed to reset password');
//       }
//     } catch (error) {
//       setError('An unexpected error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!token) {
//     return (
//       <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg">
//         <p className="text-red-500">Invalid reset link. Please request a new password reset.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto mt-24">
//       <div className="rounded-3xl p-8 shadow-sm">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
//           <p className="text-gray-500 mt-2">Please enter your new password</p>
//         </div>

//         {success ? (
//           <div className="bg-green-50 p-4 rounded-lg text-green-700">
//             Password reset successful! Redirecting to login...
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {error && (
//               <div className="bg-red-50 p-4 rounded-lg text-red-700">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-4">
//               <div className="relative">
//                 <Lock 
//                   size={20} 
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="New Password"
//                   className="w-full p-3.5 pl-12 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
//                   value={formData.newPassword}
//                   onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
//                   disabled={loading}
//                   required
//                 />
//                 <Eye
//                   size={20}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 />
//               </div>

//               <div className="relative">
//                 <Lock 
//                   size={20} 
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Confirm New Password"
//                   className="w-full p-3.5 pl-12 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
//                   value={formData.confirmPassword}
//                   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                   disabled={loading}
//                   required
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors disabled:bg-gray-300"
//             >
//               {loading ? 'Resetting Password...' : 'Reset Password'}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordPage;

// "use client";

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Lock, Eye, Check, X } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ResetPasswordPage = ({ params }) => {
//   const router = useRouter();
//   const { id } = params;

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const [passwordStrength, setPasswordStrength] = useState({
//     hasLength: false,
//     hasUppercase: false,
//     hasLowercase: false,
//     hasNumber: false,
//     hasSpecial: false
//   });

//   const [alert, setAlert] = useState({ show: false, type: '', message: '' });

//   useEffect(() => {
//     const checkPasswordStrength = (password) => {
//       setPasswordStrength({
//         hasLength: password.length >= 8,
//         hasUppercase: /[A-Z]/.test(password),
//         hasLowercase: /[a-z]/.test(password),
//         hasNumber: /[0-9]/.test(password),
//         hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
//       });
//     };

//     checkPasswordStrength(formData.newPassword);
//   }, [formData.newPassword]);

//   const renderPasswordCheck = (condition, text) => (
//     <motion.div 
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="flex items-center gap-2 text-sm"
//     >
//       {condition ? 
//         <Check size={16} className="text-green-500" /> : 
//         <X size={16} className="text-gray-300" />}
//       <span className={condition ? "text-green-500" : "text-gray-400"}>{text}</span>
//     </motion.div>
//   );

//   const showAlertMessage = (type, message) => {
//     setAlert({ show: true, type, message });
//     setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate password requirements
//     if (!Object.values(passwordStrength).every(Boolean)) {
//       showAlertMessage('error', 'Please meet all password requirements');
//       return;
//     }

//     if (formData.newPassword !== formData.confirmPassword) {
//       showAlertMessage('error', 'Passwords do not match');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch('/api/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: id,
//           newPassword: formData.newPassword,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         showAlertMessage('success', 'Password reset successful!');
//         // Redirect to login page after 2 seconds
//         setTimeout(() => {
//           router.push('/auth/user/login');
//         }, 2000);
//       } else {
//         showAlertMessage('error', data.error || 'Failed to reset password');
//       }
//     } catch (error) {
//       showAlertMessage('error', 'An unexpected error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-24">
//       {alert.show && (
//         <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
//           alert.type === 'success' 
//             ? 'bg-green-50 text-green-800 border border-green-100' 
//             : 'bg-red-50 text-red-800 border border-red-100'
//         }`}>
//           <p>{alert.message}</p>
//         </div>
//       )}

//       <div className="rounded-3xl p-8 shadow-sm">
//         <div className="space-y-6">
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
//             <p className="text-gray-500 mt-2">Please enter your new password</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-4">
//               <div className="relative">
//                 <Lock 
//                   size={20} 
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="New Password"
//                   className="w-full p-3.5 pl-12 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
//                   value={formData.newPassword}
//                   onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
//                   disabled={loading}
//                 />
//                 <Eye
//                   size={20}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
//                   onClick={() => !loading && setShowPassword(!showPassword)}
//                 />
//               </div>

//               <div className="relative">
//                 <Lock 
//                   size={20} 
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Confirm New Password"
//                   className={`w-full p-3.5 pl-12 rounded-2xl border bg-white focus:outline-none ${
//                     formData.confirmPassword && formData.newPassword !== formData.confirmPassword 
//                       ? 'border-red-300 focus:border-red-400' 
//                       : 'border-gray-200 focus:border-gray-300'
//                   }`}
//                   value={formData.confirmPassword}
//                   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                   disabled={loading}
//                 />
//               </div>

//               <div className="bg-gray-50 p-4 rounded-xl space-y-2">
//                 {renderPasswordCheck(passwordStrength.hasLength, "At least 8 characters")}
//                 {renderPasswordCheck(passwordStrength.hasUppercase, "One uppercase letter")}
//                 {renderPasswordCheck(passwordStrength.hasLowercase, "One lowercase letter")}
//                 {renderPasswordCheck(passwordStrength.hasNumber, "One number")}
//                 {renderPasswordCheck(passwordStrength.hasSpecial, "One special character")}
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full px-6 py-3 rounded-2xl transition-colors ${
//                 loading 
//                   ? 'bg-gray-300 cursor-not-allowed' 
//                   : 'bg-black text-white hover:bg-gray-800'
//               }`}
//             >
//               {loading ? 'Resetting Password...' : 'Reset Password'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordPage;
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ResetPasswordPage = ({ params }) => {
  const router = useRouter();
  const { token: token } = params; // The URL parameter 'id' is actually our reset token

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  });

  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    const checkPasswordStrength = (password) => {
      setPasswordStrength({
        hasLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      });
    };

    checkPasswordStrength(formData.newPassword);
  }, [formData.newPassword]);

  const renderPasswordCheck = (condition, text) => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-sm"
    >
      {condition ? 
        <Check size={16} className="text-green-500" /> : 
        <X size={16} className="text-gray-300" />}
      <span className={condition ? "text-green-500" : "text-gray-400"}>{text}</span>
    </motion.div>
  );

  const showAlertMessage = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate password requirements
  //   if (!Object.values(passwordStrength).every(Boolean)) {
  //     showAlertMessage('error', 'Please meet all password requirements');
  //     return;
  //   }

  //   if (formData.newPassword !== formData.confirmPassword) {
  //     showAlertMessage('error', 'Passwords do not match');
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const response = await fetch('/api/reset-password', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         token, // Use the token from URL
  //         newPassword: formData.newPassword,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       showAlertMessage('success', 'Password reset successful!');
  //       // Redirect to login page after 2 seconds
  //       setTimeout(() => {
  //         router.push('/auth/user/login');
  //       }, 2000);
  //     } else {
  //       showAlertMessage('error', data.error || 'Failed to reset password');
  //     }
  //   } catch (error) {
  //     showAlertMessage('error', 'An unexpected error occurred');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
// Example of the reset request in the component
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!token) {
    showAlertMessage('error', 'Reset token is missing');
    return;
  }

  try {
    setLoading(true);
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,  // Make sure this matches the URL parameter
        newPassword: formData.newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      showAlertMessage('success', 'Password reset successful!');
      setTimeout(() => {
        router.push('/auth/freelancer/login');
      }, 2000);
    } else {
      showAlertMessage('error', data.error || 'Failed to reset password');
    }
  } catch (error) {
    showAlertMessage('error', 'An unexpected error occurred');
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="max-w-2xl mx-auto mt-24">
      {alert.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          alert.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-100' 
            : 'bg-red-50 text-red-800 border border-red-100'
        }`}>
          <p>{alert.message}</p>
        </div>
      )}

      <div className="rounded-3xl p-8 shadow-sm">
        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
            <p className="text-gray-500 mt-2">Please enter your new password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Lock 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full p-3.5 pl-12 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  disabled={loading}
                />
                <Eye
                  size={20}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => !loading && setShowPassword(!showPassword)}
                />
              </div>

              <div className="relative">
                <Lock 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className={`w-full p-3.5 pl-12 rounded-2xl border bg-white focus:outline-none ${
                    formData.confirmPassword && formData.newPassword !== formData.confirmPassword 
                      ? 'border-red-300 focus:border-red-400' 
                      : 'border-gray-200 focus:border-gray-300'
                  }`}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                {renderPasswordCheck(passwordStrength.hasLength, "At least 8 characters")}
                {renderPasswordCheck(passwordStrength.hasUppercase, "One uppercase letter")}
                {renderPasswordCheck(passwordStrength.hasLowercase, "One lowercase letter")}
                {renderPasswordCheck(passwordStrength.hasNumber, "One number")}
                {renderPasswordCheck(passwordStrength.hasSpecial, "One special character")}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 rounded-2xl transition-colors ${
                loading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
