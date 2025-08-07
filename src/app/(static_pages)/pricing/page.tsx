// "use client"
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

// const Pricing = () => {
//   return (
//     <div className="relative bg-white min-h-screen py-16 sm:py-20 md:py-24">
//       {/* Premium Background Pattern */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center justify-center gap-2 text-sm font-medium 
//                        bg-black/5 text-black/80 px-4 py-2 rounded-full mb-4">
//             <Sparkles className="w-4 h-4" />
//             PRICING PLANS
//             <Sparkles className="w-4 h-4" />
//           </div>
//           <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//             Start Free, Pay Later!
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Workongigs is committed to supporting you as you get started. For now, our core services are completely free!
//           </p>
//         </motion.div>

//         {/* Main Content Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="max-w-4xl mx-auto"
//         >
//           <div className="relative bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
//                        border border-gray-100 overflow-hidden p-8 sm:p-12">
//             {/* Premium Corner Gradients */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-black/5 to-transparent" />
//             <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-black/5 to-transparent" />

//             {/* Content */}
//             <div className="relative space-y-12">
//               {/* Features Section */}
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
//                 <div className="grid sm:grid-cols-2 gap-6">
//                   {[
//                     { title: 'Order Management', desc: 'Easily create and manage your orders' },
//                     { title: 'Payment Tracking', desc: 'Keep track of payments and ensure smooth transactions' },
//                     { title: 'Secure File Sharing', desc: 'Share project files securely with clients' },
//                     { title: 'Direct Communication', desc: 'Work directly with clients through WhatsApp and email' }
//                   ].map((feature, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.5, delay: index * 0.1 }}
//                       className="flex gap-4"
//                     >
//                       <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center
//                                   group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
//                         <CheckCircle className="w-5 h-5" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900">{feature.title}</h4>
//                         <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* How It Works */}
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
//                 <div className="space-y-6">
//                   {[
//                     { step: 'Sign Up', desc: 'Create an account to start using our platform' },
//                     { step: 'Manage Your Work', desc: 'Use our tools to handle orders, payments, and file sharing' },
//                     { step: 'Enjoy Free Access', desc: 'Benefit from our features without any cost' }
//                   ].map((step, index) => (
//                     <div key={index} className="flex items-start gap-4">
//                       <div className="w-8 h-8 rounded-full bg-black text-white flex items-center 
//                                   justify-center flex-shrink-0 font-medium">
//                         {index + 1}
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900">{step.step}</h4>
//                         <p className="text-gray-600">{step.desc}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Future Pricing */}
//               {/* <div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Pricing Models</h3>
//                 <div className="grid sm:grid-cols-2 gap-6">
//                   <div className="p-6 rounded-2xl border border-gray-200 hover:border-black 
//                               transition-colors">
//                     <h4 className="font-semibold text-gray-900 mb-2">Subscription-Based Access</h4>
//                     <p className="text-gray-600">Pay a fixed monthly or yearly fee</p>
//                   </div>
//                   <div className="p-6 rounded-2xl border border-gray-200 hover:border-black 
//                               transition-colors">
//                     <h4 className="font-semibold text-gray-900 mb-2">Percentage-Based Fees</h4>
//                     <p className="text-gray-600">Pay a small percentage of the total product price per transaction</p>
//                   </div>
//                 </div>
//               </div> */}

//               {/* Support Section */}
//               <div className="bg-black/5 rounded-2xl p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Need Assistance?</h3>
//                 <p className="text-gray-600 mb-4">
//                   If you have any questions or need support, our team is here to help:
//                 </p>
//                 <div className="space-y-2">
//                   <a href="mailto:support@workongigs.com" 
//                      className="text-gray-900 hover:text-black transition-colors block">
//                     support@workongigs.com
//                   </a>
//                   {/* <p className="text-gray-900">+917477211211</p> */}
//                 </div>
//               </div>

//               {/* CTA */}
//               <div className="text-center pt-6">
//                 <motion.a
//                   href="/auth/freelaner/login"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white 
//                            rounded-xl font-medium group relative overflow-hidden"
//                 >
//                   Get Started Now
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </motion.a>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle, Info, CreditCard, DollarSign } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="relative bg-white min-h-screen py-16 sm:py-20 md:py-24">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 text-sm font-medium 
                       bg-black/5 text-black/80 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            PRICING PLANS
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Start Free, Pay Later!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Workongigs is committed to supporting you as you get started. For now, our core services are completely free!
          </p>
        </motion.div>

        {/* Transaction Fee Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  Transaction Fee Structure
                </h3>
                <p className="text-amber-800 mb-4 leading-relaxed">
                  While our platform services are free, we apply a transparent transaction fee structure to ensure secure payments and platform maintenance.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-amber-200">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="w-5 h-5 text-amber-600" />
                      <span className="font-semibold text-amber-900">Total Fee: 3.75%</span>
                    </div>
                    <p className="text-sm text-amber-700">Applied to each completed transaction</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-amber-200">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-amber-700">Payment Gateway:</span>
                        <span className="font-medium text-amber-900">2.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-700">Platform Operations:</span>
                        <span className="font-medium text-amber-900">1.25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                       border border-gray-100 overflow-hidden p-8 sm:p-12">
            {/* Premium Corner Gradients */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-black/5 to-transparent" />

            {/* Content */}
            <div className="relative space-y-12">
              {/* Features Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { title: 'Order Management', desc: 'Easily create and manage your orders' },
                    { title: 'Payment Tracking', desc: 'Keep track of payments and ensure smooth transactions' },
                    { title: 'Secure File Sharing', desc: 'Share project files securely with clients' },
                    { title: 'Direct Communication', desc: 'Work directly with clients through WhatsApp and email' }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center
                                  group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
                <div className="space-y-6">
                  {[
                    { step: 'Sign Up', desc: 'Create an account to start using our platform' },
                    { step: 'Manage Your Work', desc: 'Use our tools to handle orders, payments, and file sharing' },
                    { step: 'Complete Transactions', desc: 'Process payments with our secure system (3.75% transaction fee applies)' },
                    { step: 'Enjoy Free Access', desc: 'Benefit from all platform features without subscription costs' }
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center 
                                  justify-center flex-shrink-0 font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{step.step}</h4>
                        <p className="text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transparent Pricing Section */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <Info className="w-5 h-5 inline mr-2" />
                  Transparent Pricing Promise
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>• <strong>No hidden fees:</strong> The 3.75% transaction fee is clearly disclosed upfront</p>
                  <p>• <strong>No subscription costs:</strong> Access all platform features without monthly charges</p>
                  <p>• <strong>No setup fees:</strong> Start using the platform immediately at no cost</p>
                  <p>• <strong>Secure payments:</strong> Industry-standard payment processing ensures your money is safe</p>
                </div>
              </div>

              {/* Support Section */}
              <div className="bg-black/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Assistance?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions about our pricing or need support, our team is here to help:
                </p>
                <div className="space-y-2">
                  <a href="mailto:support@workongigs.com" 
                     className="text-gray-900 hover:text-black transition-colors block">
                    support@workongigs.com
                  </a>
                  {/* <p className="text-gray-900">+917477211211</p> */}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center pt-6">
                <motion.a
                  href="/auth/freelaner/login"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white 
                           rounded-xl font-medium group relative overflow-hidden"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;