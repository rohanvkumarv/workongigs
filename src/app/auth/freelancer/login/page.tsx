
"use client"
import React, { useState } from 'react';
import { Mail, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UserLoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', title: '', message: '' });

  const showAlert = (type, title, message) => {
    setAlert({ show: true, type, title, message });
    setTimeout(() => setAlert({ show: false, type: '', title: '', message: '' }), 5000);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        showAlert('success', 'Success', 'OTP sent to your email!');
        setStep('otp');
      } else {
        showAlert('error', 'Error', data.error || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      showAlert('error', 'Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        showAlert('success', 'Success', 'Login successful! Redirecting...');
        if (data.freelancer?.id) {
          router.push(`/freelancer/clients`);
        }
      } else {
        showAlert('error', 'Error', data.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      showAlert('error', 'Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-24">
      {alert.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg border z-50 transition-all duration-300 ${
          alert.type === 'success' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
        }`}>
          <h4 className={`font-bold ${
            alert.type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>{alert.title}</h4>
          <p className={
            alert.type === 'success' ? 'text-green-600' : 'text-red-600'
          }>{alert.message}</p>
        </div>
      )}

      <div className="rounded-3xl p-8 shadow-sm">
        <div className="space-y-6">
          {step === 'email' ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
                <p className="text-gray-500 mt-2">Enter your email to sign in</p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3.5 pl-12 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Sending OTP...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
                <p className="text-gray-500 mt-2">Enter the OTP sent to {email}</p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:border-gray-300 text-center text-2xl tracking-widest"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  disabled={loading}
                  maxLength={6}
                  autoFocus
                />

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full px-6 py-3 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Sign in'
                  )}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => { setStep('email'); setOtp(''); }}
                    disabled={loading}
                    className="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="text-black hover:underline disabled:text-gray-400"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/auth/freelancer/signup" className="text-black hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
