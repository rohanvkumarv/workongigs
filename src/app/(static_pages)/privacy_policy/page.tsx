
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const PrivacyPolicy = () => {
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
            PRIVACY POLICY
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600">Last updated: June 08, 2024</p>
        </motion.div>

        {/* Main Policy Card */}
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
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
              </p>

              <div className="bg-black/5 rounded-xl p-6">
                <p className="text-gray-900">
                  We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interpretation and Definitions</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Interpretation</h3>
                <p className="text-gray-700 leading-relaxed">
                  The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Definitions</h3>
                <p className="text-gray-700 leading-relaxed">For the purposes of this Privacy Policy:</p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      term: "Account",
                      definition: "means a unique account created for You to access our Service or parts of our Service."
                    },
                    {
                      term: "Affiliate",
                      definition: "means an entity that controls, is controlled by or is under common control with a party, where 'control' means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority."
                    },
                    {
                      term: "Company",
                      definition: "(referred to as either 'the Company', 'We', 'Us' or 'Our' in this Agreement) refers to WorkOnGigs, MP."
                    },
                    {
                      term: "Cookies",
                      definition: "are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses."
                    },
                    {
                      term: "Country",
                      definition: "refers to: Uttar Pradesh, India"
                    },
                    {
                      term: "Device",
                      definition: "means any device that can access the Service such as a computer, a cellphone or a digital tablet."
                    },
                    {
                      term: "Personal Data",
                      definition: "is any information that relates to an identified or identifiable individual."
                    },
                    {
                      term: "Service",
                      definition: "refers to the Website."
                    },
                    {
                      term: "Service Provider",
                      definition: "means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used."
                    },
                    {
                      term: "Third-party Social Media Service",
                      definition: "refers to any website or any social network website through which a User can log in or create an account to use the Service."
                    },
                    {
                      term: "Usage Data",
                      definition: "refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit)."
                    },
                    {
                      term: "Website",
                      definition: "refers to WorkOnGigs, accessible from WorkOnGigs.com"
                    },
                    {
                      term: "You",
                      definition: "means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable."
                    }
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="font-semibold text-gray-900">{item.term}</h4>
                      <p className="text-gray-700">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Collecting and Using Your Personal Data</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Types of Data Collected</h3>
                
                <h4 className="text-lg font-semibold text-gray-900">Personal Data</h4>
                <p className="text-gray-700 leading-relaxed">
                  While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "Email address",
                    "First name and last name",
                    "Phone number",
                    "Usage Data"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-lg font-semibold text-gray-900">Usage Data</h4>
                <p className="text-gray-700 leading-relaxed">
                  Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information from Third-Party Social Media Services</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Google",
                    "Facebook",
                    "Instagram",
                    "Twitter",
                    "LinkedIn"
                  ].map((service, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may collect Personal data that is already associated with Your Third-Party Social Media Service's account, such as Your name, Your email address, Your activities or Your contact list associated with that account.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tracking Technologies and Cookies</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Types of Cookies We Use</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Necessary / Essential Cookies",
                      type: "Session Cookies",
                      admin: "Us",
                      purpose: "These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services."
                    },
                    {
                      title: "Cookies Policy / Notice Acceptance Cookies",
                      type: "Persistent Cookies",
                      admin: "Us",
                      purpose: "These Cookies identify if users have accepted the use of cookies on the Website."
                    },
                    {
                      title: "Functionality Cookies",
                      type: "Persistent Cookies",
                      admin: "Us",
                      purpose: "These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website."
                    }
                  ].map((cookie, index) => (
                    <div key={index} className="bg-black/5 rounded-xl p-6 space-y-2">
                      <h4 className="font-semibold text-gray-900">{cookie.title}</h4>
                      <p className="text-gray-700">Type: {cookie.type}</p>
                      <p className="text-gray-700">Administered by: {cookie.admin}</p>
                      <p className="text-gray-700">Purpose: {cookie.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Your Personal Data</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The Company may use Personal Data for the following purposes:
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      title: "To provide and maintain our Service",
                      desc: "including to monitor the usage of our Service."
                    },
                    {
                      title: "To manage Your Account",
                      desc: "to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user."
                    },
                    {
                      title: "For the performance of a contract",
                      desc: "the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service."
                    },
                    {
                      title: "To contact You",
                      desc: "To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation."
                    },
                    {
                      title: "To provide You with news and updates",
                      desc: "To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information."
                    },
                    {
                      title: "To manage Your requests",
                      desc: "To attend and manage Your requests to Us."
                    },
                    {
                      title: "For business transfers",
                      desc: "We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred."
                    },
                    {
                      title: "For other purposes",
                      desc: "We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience."
                    }
                  ].map((use, index) => (
                    <div key={index} className="bg-black/5 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900">{use.title}</h4>
                      <p className="text-gray-700">{use.desc}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-gray-900">Sharing of Your Personal Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We may share Your personal information in the following situations:
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      title: "With Service Providers",
                      desc: "We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You."
                    },
                    {
                      title: "For business transfers",
                      desc: "We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company."
                    },
                    {
                      title: "With Affiliates",
                      desc: "We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy."
                    },
                    {
                      title: "With business partners",
                      desc: "We may share Your information with Our business partners to offer You certain products, services or promotions."
                    },
                    {
                      title: "With other users",
                      desc: "When You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside."
                    },
                    {
                      title: "With Your consent",
                      desc: "We may disclose Your personal information for any other purpose with Your consent."
                    }
                  ].map((share, index) => (
                    <div key={index} className="bg-black/5 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900">{share.title}</h4>
                      <p className="text-gray-700">{share.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Retention of Your Personal Data</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Transfer of Your Personal Data</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclosure of Your Personal Data</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Business Transactions</h3>
                <p className="text-gray-700 leading-relaxed">
                  If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Law enforcement</h3>
                <p className="text-gray-700 leading-relaxed">
                  Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                </p>

                <h3 className="text-xl font-semibold text-gray-900">Other legal requirements</h3>
                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {[
                      "Comply with a legal obligation",
                      "Protect and defend the rights or property of the Company",
                      "Prevent or investigate possible wrongdoing in connection with the Service",
                      "Protect the personal safety of Users of the Service or the public",
                      "Protect against legal liability"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Security of Your Personal Data</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Links to Other Websites</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
                </p>
                
                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to this Privacy Policy</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
                </p>

                <div className="bg-black/5 rounded-xl p-6">
                  <p className="text-gray-900">
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions or need assistance with our Privacy Policy, please contact our support team at:
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Email:</span>
                    <a href="mailto:contact@workongigs.com" className="text-blue-600 hover:text-blue-800 underline">
                      contact@workongigs.com
                    </a>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Phone:</span>
                    <span className="text-gray-700">+917477211211</span>
                  </div> */}
                  {/* <div className="flex items-start gap-2">
                    <span className="font-semibold text-gray-900">Address:</span>
                    <span className="text-gray-700">Vill Post Ajgaraha Rewa Madhya Pradesh</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

           
          