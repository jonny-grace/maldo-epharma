import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <div>
        <div className="flex items-center">
          <Link href="/" className='flex'>
            <img
            src="/assets/maldo_logo.png" // Replace with the actual path to your logo
            alt="Logo"
            className="h-16 w-32 mr-2"
          />
          {/* <span className="text-black font-bold text-2xl">Maldo Med</span> */} 
          </Link>
          
        </div>
    </div>
  )
}

export default Logo