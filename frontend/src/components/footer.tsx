import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full text-sm text-gray-500 border-t border-gray-200 backdrop-blur bg-white/60 dark:bg-black/30 dark:border-gray-800 px-4 py-3 flex justify-between items-center">
      <span>© {new Date().getFullYear()} Ullass POS</span>
      <div className="space-x-4 hidden sm:flex">
        <a href="/privacy" className="hover:underline">Privacy</a>
        <a href="/terms" className="hover:underline">Terms</a>
        <a href="/support" className="hover:underline">Support</a>
      </div>
    </footer>
  )
}
