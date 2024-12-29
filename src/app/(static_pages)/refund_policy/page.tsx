"use client"


import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Sparkles, Shield,
  Clock, FileText, AlertCircle, Scale, CheckCircle
} from 'lucide-react';

const RefundPolicy = () => {
  const sections = [
    {
      title: "1. General Conditions",
      content: [
        { 
          heading: "Non-Delivery of Service",
          desc: "If the freelancer fails to deliver the agreed-upon service within the specified deadline without prior mutual agreement with the client."
        },
        {
          heading: "Service Not as Described",
          desc: "If the delivered service does not meet the description or requirements as agreed upon in the project contract."
        },
        {
          heading: "Mutual Agreement",
          desc: "If both the client and the freelancer mutually agree to cancel the project and request a refund."
        }
      ]
    },
    {
      title: "2. Eligibility for Refunds",
      content: [
        {
          heading: "Request Timeline",
          desc: "Refund requests must be submitted within 3 days of the project's scheduled completion date."
        },
        {
          heading: "Evidence Required",
          desc: "The client must provide evidence supporting their claim (e.g., screenshots, communication logs, or other relevant documents)."
        },
        {
          heading: "Resolution Attempts",
          desc: "Both parties must make a reasonable effort to resolve the issue before requesting a refund."
        }
      ]
    },
    {
      title: "3. Refund Process",
      content: [
        {
          heading: "Submission",
          desc: "To request a refund, clients must contact our support team at contact@workongigs.com with the project details and the reason for the refund request."
        },
        {
          heading: "Review Process",
          desc: "Our team will review the request and any supporting evidence within 3 business days."
        },
        {
          heading: "Final Resolution",
          desc: "We will work with both the client and the freelancer to reach a fair resolution. If the refund request is approved, the client will receive a full or partial refund, depending on the circumstances."
        }
      ]
    },
    {
      title: "4. Non-Refundable Situations",
      content: [
        {
          heading: "Change of Mind",
          desc: "If the client changes their mind after the service has been delivered as per the agreed contract."
        },
        {
          heading: "Client Delays",
          desc: "If the client fails to provide necessary information or approvals, causing delays or incomplete delivery."
        },
        {
          heading: "Partial Completion",
          desc: "If the service has been partially delivered and accepted by the client, refunds will only be issued for the incomplete portion of the work."
        },
        {
          heading: "Active Disputes",
          desc: "If there is an ongoing dispute that has not yet been resolved through our dispute resolution process."
        }
      ]
    }
  ];

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
            REFUND POLICY
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Refund Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At WorkOnGigs, we are committed to ensuring a positive experience for both our clients and freelancers. 
            This policy outlines our refund conditions and process.
          </p>
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
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {section.content.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                        className="flex gap-4 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center
                                    group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.heading}</h4>
                          <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {sectionIndex !== sections.length - 1 && (
                    <div className="border-b border-gray-200 my-8" />
                  )}
                </div>
              ))}

              {/* Dispute Resolution Section */}
              <div className="bg-black/5 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                  <Scale className="w-5 h-5" />
                  Dispute Resolution
                </h3>
                <p className="text-gray-600 mb-4">
                  If a refund request is denied or if the client and freelancer cannot agree on a resolution, 
                  the issue may be escalated to our dispute resolution team. Both parties will be required to 
                  provide supporting evidence, and our decision will be final and binding.
                </p>
              </div>

              {/* Contact Information */}
              {/* <div className="pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Need Assistance?</h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center
                                group-hover:bg-black group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href="mailto:contact@workongigs.com" 
                         className="text-gray-900 hover:text-gray-600 transition-colors">
                        contact@workongigs.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center
                                group-hover:bg-black group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a href="tel:" 
                         className="text-gray-900 hover:text-gray-600 transition-colors">
                        +91 7477211211
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center
                                group-hover:bg-black group-hover:text-white transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-900">Vill Post Ajgaraha, Rewa MP</p>
                    </div>
                  </div>
                </div>
              </div> */}
               <div className="bg-black/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Assistance?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions or need support, our team is here to help:
                </p>
                <div className="space-y-2">
                  <a href="mailto:support@workongigs.com" 
                     className="text-gray-900 hover:text-black transition-colors block">
                    support@workongigs.com
                  </a>
                  {/* <p className="text-gray-900">+917477211211</p> */}
                </div>
              </div>
              
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicy;