"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement newsletter signup logic here

    setEmail('')
  }

  return (
    <footer className="bg-gradient-to-b from-red-900/20 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-400">Watchify</h2>
            <p className="text-gray-400">Your ultimate streaming destination for the best movies and TV shows.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Movies</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">TV Shows</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">My List</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">Help & Info</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Account</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-400">Newsletter</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-red-900/30 border-red-700 text-white placeholder-gray-400"
                required
              />
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                <Mail className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-red-700">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024  Watchify. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}