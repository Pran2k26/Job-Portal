import React from 'react'

const Footer = () => {
  return (
   <footer className="bg-gray-800 text-gray-300 text-sm py-4">
  <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
    <span>© {new Date().getFullYear()} JobHunt. All rights reserved.</span>
    <div className="flex space-x-4 mt-2 sm:mt-0">
      <a href="/privacy" className="hover:underline">Privacy</a>
      <a href="/terms" className="hover:underline">Terms</a>
      <a href="/contact" className="hover:underline">Contact</a>
    </div>
  </div>
</footer>

  )
}

export default Footer