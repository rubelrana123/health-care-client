 
import {
  Stethoscope,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react'
import Link from 'next/link'
 
export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-medical-blue to-medical-green rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Amer Doctor</span>
            </div>
            <p className="text-sm leading-relaxed">
              AI-powered healthcare platform connecting patients with the best
              medical professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-medical-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-medical-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-medical-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-medical-blue transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-medical-blue transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/consultant"
                  className="hover:text-medical-blue transition-colors"
                >
                  Find Consultant
                </Link>
              </li>
              <li>
                <Link
                  href="/health-plan"
                  className="hover:text-medical-blue transition-colors"
                >
                  Health Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/medicine"
                  className="hover:text-medical-blue transition-colors"
                >
                  Medicine
                </Link>
              </li>
              <li>
                <Link
                  href="/diagnostic"
                  className="hover:text-medical-blue transition-colors"
                >
                  Diagnostic
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-medical-blue transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-medical-blue transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-medical-blue transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-medical-blue transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-medical-blue transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-medical-blue flex-shrink-0 mt-0.5" />
                <span>support@amerdoctor.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-medical-blue flex-shrink-0 mt-0.5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-medical-blue flex-shrink-0 mt-0.5" />
                <span>123 Healthcare Ave, Medical District, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; 2024 Amer Doctor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
