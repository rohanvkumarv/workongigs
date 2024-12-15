"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Twitter, Linkedin, Mail, Phone,
  Instagram, Facebook, Youtube, ArrowUpRight 
} from 'lucide-react';

const Footer = () => {
  const links = {
    main: [
      { label: 'Home', href: '/' },
      { label: 'How to use', href: '/#usage' },
      { label: 'Benefits for clients', href: '/#clients' },
      { label: 'Benefits for Freelancers', href: '/#lancers' },
      { label: 'Upcoming', href: '/#upcoming' },
      { label: 'Contact Us', href: '/contact' }
    ],
    social: [
      { label: 'Twitter', href: '#', icon: Twitter },
      { label: 'Facebook', href: '#', icon: Facebook },
      { label: 'Instagram', href: '#', icon: Instagram },
      { label: 'YouTube', href: '#', icon: Youtube }
    ],
    legal: [
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Privacy Policy', href: '/policy' },
      { label: 'Refund Policy', href: '/refund' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'About Us', href: '/about-us' }
    ]
  };

  return (
    <footer className="bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Logo and Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="space-y-8">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">R</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {links.social.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-gray-700" />
                    </motion.a>
                  );
                })}
              </div>

              <p className="text-gray-600 max-w-sm">
                We change the way Freelance Industry works
              </p>
            </div>
          </motion.div>

          {/* Main Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 gap-4">
              {links.main.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ x: 4 }}
                  className="text-gray-600 hover:text-black transition-colors inline-flex items-center group"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 
                                       group-hover:translate-x-1 transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Legal Links and Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Legal Links */}
            <div className="flex flex-wrap gap-4">
              {links.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-600 hover:text-black transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <span className="block text-gray-600">
                Need help?{' '}
                <a href="/contact" className="text-black hover:text-gray-800 transition-colors">
                  Contact Us
                </a>
              </span>
              <span className="block text-gray-600">
                Made With Prem by{' '}
                <a href="https://rohankumar10.me" className="text-black hover:text-gray-800 transition-colors">
                  Rohan Kumar
                </a>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:contact@example.com" className="text-gray-600 hover:text-black transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:+1234567890" className="text-gray-600 hover:text-black transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-gray-100 to-transparent opacity-50" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gray-100 to-transparent opacity-50" />
    </footer>
  );
};

export default Footer;