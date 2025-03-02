import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex w-full justify-between md:px-60 px-2 bg-gradient-to-r from-blue-400 to-cyan-300 py-2'>
        <h1 className='font-bold text-xl'><span className='text-white'>&lt;</span>Pass<span className='text-white'>OP/&gt;</span></h1>
        <ul className='flex gap-5'>
            <li className='hover:scale-110 duration-75'><a href="#">Home</a></li>
            <li className='hover:scale-110 duration-75'><a href="#">About</a></li>
            <li className='hover:scale-110 duration-75'><a href="#">Contact</a></li>
        </ul>
    </nav>
  )
}

export default Navbar