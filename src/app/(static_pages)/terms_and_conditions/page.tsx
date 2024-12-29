"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    // <div className="relative bg-white min-h-screen">
    <div className="w-full bg-white py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative pt-32 px-4 sm:px-6 lg:px-8">
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
            TERMS AND CONDITIONS
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-600">Last updated: June 08, 2024</p>
        </motion.div>

        {/* Main Terms Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                       border border-gray-100 overflow-hidden p-8 sm:p-12">
            {/* Premium Corner Gradients */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-black/5 to-transparent" />

            {/* Content */}
            <div className="relative space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Our Legal Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We are WorkOnGigs ('Company', 'we', 'us', or 'our'). We operate the website https://workongigs.com (the 'Site'), as well as any other related products and services that refer or link to these legal terms (the 'Legal Terms') (collectively, the 'Services'). We Ensure: Freelancers Get Paid and, Clients Receive Satisfactory Work. You can contact us by phone at 7477211211, email at contact@workongigs.com, or by mail to Madhya Pradesh, India.
              </p>

              <p className="text-gray-700 leading-relaxed">
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ('you'), and WorkOnGigs, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms.
              </p>

              <div className="bg-black/5 rounded-xl p-6 my-8">
                <p className="text-gray-900 font-semibold">
                  IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                </p>
              </div>


{/* start  */}








<h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
              <div className="space-y-2">
                {[
                  "1. Our Services",
                  "2. Intellectual Property Rights",
                  "3. User Representations",
                  "4. User Registration",
                  "5. Purchases and Payment",
                  "6. Subscriptions",
                  "7. Prohibited Activities",
                  "8. User Generated Contributions",
                  "9. Contribution License",
                  "10. Guidelines for Reviews",
                  "11. Social Media",
                  "12. Services Management",
                  "13. Privacy Policy",
                  "14. Term and Termination",
                  "15. Modifications and Interruptions",
                  "16. Governing Law",
                  "17. Dispute Resolution",
                  "18. Corrections",
                  "19. Disclaimer",
                  "20. Limitations of Liability",
                  "21. Indemnification",
                  "22. User Data",
                  "23. Electronic Communications, Transactions, and Signatures",
                  "24. SMS Text Messaging",
                  "25. Miscellaneous",
                  "26. Contact Us"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* First section of content - we'll add more in subsequent updates */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">1. Our Services</h2>
              <p className="text-gray-700 leading-relaxed">
                The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
              </p>

              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Intellectual Property Rights</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Our intellectual property</h3>
                <p className="text-gray-700 leading-relaxed">
                  We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the 'Content'), as well as the trademarks, service marks, and logos contained therein (the 'Marks').
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world. The Content and Marks are provided in or through the Services 'AS IS' for your personal, non-commercial use or internal business purpose only.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Your use of our Services</h3>
                <p className="text-gray-700 leading-relaxed">
                  Subject to your compliance with these Legal Terms, including the 'PROHIBITED ACTIVITIES' section below, we grant you a non-exclusive, non-transferable, revocable licence to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Access the Services</li>
                  <li>Download or print a copy of any portion of the Content to which you have properly gained access</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  solely for your personal, non-commercial use or internal business purpose.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. User Representations</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  By using the Services, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>All registration information you submit will be true, accurate, current, and complete</li>
                  <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
                  <li>You have the legal capacity and you agree to comply with these Legal Terms</li>
                  <li>You are not a minor in the jurisdiction in which you reside</li>
                  <li>You will not access the Services through automated or non-human means, whether through a bot, script, or otherwise</li>
                  <li>You will not use the Services for any illegal or unauthorized purpose</li>
                  <li>Your use of the Services will not violate any applicable law or regulation</li>
                </ul>
                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">4. User Registration</h2>
              <p className="text-gray-700 leading-relaxed">
                You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">5. Purchases and Payment</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We accept the following forms of payment:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>UPI</li>
                  <li>Debit card</li>
                  <li>PayPal</li>
                  <li>Visa</li>
                  <li>Mastercard</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
                </p>
                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in INR.
                  </p>
                </div>
              </div>


              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">6. Subscriptions</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Billing and Renewal</h3>
                <p className="text-gray-700 leading-relaxed">
                  Billing is managed through the dashboard with automated reminders.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Free Trial</h3>
                <p className="text-gray-700 leading-relaxed">
                  We offer a 30-day free trial to new users who register with the Services. The account will not be charged and the subscription will be suspended until upgraded to a paid version at the end of the free trial.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Cancellation</h3>
                <p className="text-gray-700 leading-relaxed">
                  You can cancel your subscription by raising a refund issue. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at contact@workongigs.com.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Fee Changes</h4>
                  <p className="text-gray-900">
                    We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. Prohibited Activities</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                </p>
                
                <p className="text-gray-700 leading-relaxed">As a user of the Services, you agree not to:</p>
                
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Systematically retrieve data or content from the Services without written permission",
                    "Trick, defraud, or mislead us and other users, especially in attempts to learn sensitive account information",
                    "Circumvent, disable, or interfere with security-related features of the Services",
                    "Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services",
                    "Use any information obtained from the Services to harass, abuse, or harm another person",
                    "Make improper use of our support services or submit false reports of abuse or misconduct",
                    "Use the Services in a manner inconsistent with any applicable laws or regulations",
                    "Engage in unauthorized framing of or linking to the Services",
                    "Upload or transmit viruses, Trojan horses, or other malicious code",
                    "Engage in any automated use of the system",
                    "Delete the copyright or other proprietary rights notice from any Content",
                    "Attempt to impersonate another user or person",
                    "Upload or transmit any material that acts as a passive or active information collection or transmission mechanism",
                    "Interfere with, disrupt, or create an undue burden on the Services",
                    "Harass, annoy, intimidate, or threaten any of our employees",
                    "Attempt to bypass any measures designed to prevent or restrict access to the Services",
                    "Copy or adapt the Services' software",
                    "Decipher, decompile, disassemble, or reverse engineer any of the software",
                    "Make any unauthorized use of the Services",
                    "Use a buying agent or purchasing agent to make purchases",
                    "Take payment outside of the platform",
                    "Attempt to download paid media",
                    "Breach terms and conditions"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">8. User Generated Contributions</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").
                </p>

                <p className="text-gray-700 leading-relaxed">
                  When you create or make available any Contributions, you thereby represent and warrant that:
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    "The creation, distribution, transmission, public display, or performance of your Contributions do not violate the proprietary rights of any third party",
                    "You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use your Contributions",
                    "Your Contributions are not false, inaccurate, or misleading",
                    "Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation",
                    "Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable",
                    "Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone",
                    "Your Contributions are not used to harass or threaten any other person",
                    "Your Contributions do not violate any applicable law, regulation, or rule",
                    "Your Contributions do not violate the privacy or publicity rights of any third party",
                    "Your Contributions do not violate any applicable law concerning child pornography",
                    "Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">9. Contribution License</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  By posting your Contributions to any part of the Services or making Contributions accessible to the Services by linking your account from the Services to any of your social networking accounts, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorize sublicenses of the foregoing.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    The use and distribution may occur in any media formats and through any media channels. This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">10. Guidelines for Reviews</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We may provide you areas on the Services to leave reviews or ratings. When posting a review, you must comply with the following criteria:
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    "You should have firsthand experience with the person/entity being reviewed",
                    "Your reviews should not contain offensive profanity, or abusive, racist, offensive, or hateful language",
                    "Your reviews should not contain discriminatory references",
                    "Your reviews should not contain references to illegal activity",
                    "You should not be affiliated with competitors if posting negative reviews",
                    "You should not make any conclusions as to the legality of conduct",
                    "You may not post any false or misleading statements",
                    "You may not organize a campaign encouraging others to post reviews"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    We may accept, reject, or remove reviews in our sole discretion. We have absolutely no obligation to screen reviews or to delete reviews, even if anyone considers reviews objectionable or inaccurate.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">11. Social Media</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  As part of the functionality of the Services, you may link your account with online accounts you have with third-party service providers (each such account, a "Third-Party Account") by either:
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                    <span className="text-gray-700">Providing your Third-Party Account login information through the Services</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                    <span className="text-gray-700">Allowing us to access your Third-Party Account, as permitted under the applicable terms and conditions that govern your use of each Third-Party Account</span>
                  </div>
                </div>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    You represent and warrant that you are entitled to disclose your Third-Party Account login information to us and/or grant us access to your Third-Party Account, without breach by you of any of the terms and conditions that govern your use of the applicable Third-Party Account.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  By granting us access to any Third-Party Accounts, you understand that we may access, make available, and store (if applicable) any content that you have provided to and stored in your Third-Party Account so that it is available on and through the Services via your account. Unless otherwise specified in these Terms, all Social Network Content, if any, will be considered to be User Content for all purposes of these Terms.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">12. Services Management</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right, but not the obligation, to:
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Monitor the Services for violations of these Legal Terms",
                    "Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms",
                    "Refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof",
                    "Remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems",
                    "Otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">13. Privacy Policy</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We care about data privacy and security. Please review our Privacy Policy at{' '}
                  <a href="https://workongigs.com/policy" className="text-blue-600 hover:text-blue-800 underline">
                    https://workongigs.com/policy
                  </a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms.
                </p>
                
                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    Please be advised the Services are hosted in India. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in India, then through your continued use of the Services, you are transferring your data to India, and you expressly consent to have your data transferred to and processed in India.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">14. Term and Termination</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">15. Modifications and Interruptions</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.
                  </p>
                </div>
              </div>

 
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">16. Governing Law</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of India applicable to agreements made and to be entirely performed within India, without regard to its conflict of law principles.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">17. Dispute Resolution</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Informal Negotiations</h3>
                <p className="text-gray-700 leading-relaxed">
                  To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a "Dispute" and collectively, the "Disputes") brought by either you or us (individually, a "Party" and collectively, the "Parties"), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Binding Arbitration</h3>
                <p className="text-gray-700 leading-relaxed">
                  If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute (except those Disputes expressly excluded below) will be finally and exclusively resolved by binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    The arbitration shall be commenced and conducted under the Commercial Arbitration Rules of the Indian Arbitration Association ("IAA") and, where appropriate, the IAA's Supplementary Procedures for Consumer Related Disputes ("IAA Consumer Rules"), both of which are available at the IAA website: www.adr.org.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900">Restrictions</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law:
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "No arbitration shall be joined with any other proceeding",
                    "There is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures",
                    "There is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">18. Corrections</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  There may be information on the Services that contains typographical errors, inaccuracies, or omissions that may relate to the Services, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">19. Disclaimer</h2>
              <div className="space-y-4">
                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900 font-semibold">
                    THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  We make no warranties or representations about the accuracy or completeness of the Services' content or the content of any websites linked to the Services and we will assume no liability or responsibility for any:
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Errors, mistakes, or inaccuracies of content and materials",
                    "Personal injury or property damage resulting from your access to and use of the Services",
                    "Any unauthorized access to or use of our secure servers and/or any personal information stored therein",
                    "Any interruption or cessation of transmission to or from the Services",
                    "Any bugs, viruses, trojan horses, or the like which may be transmitted through the Services by any third party",
                    "Any errors or omissions in any content and materials or for any loss or damage incurred as a result of the use of any content posted, transmitted, or otherwise made available via the Services"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">20. Limitations of Liability</h2>
              <div className="space-y-4">
                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Notwithstanding anything to the contrary contained herein, our liability to you for any cause whatsoever and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us during the six (6) month period prior to any cause of action arising.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Certain state laws and international laws do not allow limitations on implied warranties or the exclusion or limitation of certain damages. If these laws apply to you, some or all of the above disclaimers or limitations may not apply to you, and you may have additional rights.
                </p>
              </div>

          


              {/* last  */}

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">21. Indemnification</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of:
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Your Contributions",
                    "Use of the Services",
                    "Breach of these Legal Terms",
                    "Any breach of your representations and warranties set forth in these Legal Terms",
                    "Your violation of the rights of a third party, including but not limited to intellectual property rights",
                    "Any overt harmful act toward any other user of the Services with whom you connected via the Services"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">22. User Data</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">23. Electronic Communications, Transactions, and Signatures</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">24. SMS Text Messaging</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Opting Out</h3>
                <p className="text-gray-700 leading-relaxed">
                  If at any time you wish to stop receiving SMS messages from us, simply reply to the text with "STOP." You may receive an SMS message confirming your opt out.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Message and Data Rates</h3>
                <p className="text-gray-700 leading-relaxed">
                  Please be aware that message and data rates may apply to any SMS messages sent or received. The rates are determined by your carrier and the specifics of your mobile plan.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Support</h3>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions or need assistance regarding our SMS communications, please email us at contact@workongigs.com or call at 7477211211.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">25. Miscellaneous</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">26. Contact Us</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions or need assistance with our Terms and Conditions, please contact our support team at:
                </p>

                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span>{' '}
                    <a href="mailto:contact@workongigs.com" className="text-blue-600 hover:text-blue-800 underline">
                      contact@workongigs.com
                    </a>
                  </p>
                  {/* <p className="text-gray-700">
                    <span className="font-semibold">Phone:</span> +917477211211
                  </p> */}
                  {/* <p className="text-gray-700">
                    <span className="font-semibold">Address:</span> Vill Post Ajgaraha Rewa Madhya Pradesh
                  </p> */}
                </div>
              </div>



            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

             

            