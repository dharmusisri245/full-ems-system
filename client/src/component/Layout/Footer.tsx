
import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 overflow-visible">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Column 1 - Company Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            EMS
          </h2>
          <p className="text-sm leading-relaxed">
            Empowering event organizers with modern tools to manage, track, and
            deliver unforgettable experiences.  
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="https://github.com" target="_blank" className="hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-primary">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="mailto:contact@ems.com" className="hover:text-primary">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary transition">Home</a></li>
            <li><a href="#" className="hover:text-primary transition">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition">Services</a></li>
            <li><a href="#" className="hover:text-primary transition">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 - Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition">FAQs</a></li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Stay Updated
          </h3>
          <p className="text-sm mb-3">
            Subscribe to get the latest updates, features, and news from EMS.
          </p>
          <form className="flex items-center gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="text-sm"
            />
            <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-4 mt-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <span>
            © {new Date().getFullYear()} <b>EMS</b>. All rights reserved.
          </span>
          <span className="mt-2 md:mt-0">
            Designed with ❤️ by <span className="font-medium text-primary">Your Team</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
