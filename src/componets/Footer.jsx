import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-slate-800 flex justify-center'>
        <div>

        <h1 className='font-bold text-2xl text-center p-2'><span className='text-white'>&lt;</span>Pass<span className='text-white'>OP/&gt;</span></h1>
        <div className='text-white flex items-center text-xl font-semibold gap-2 pb-2'>
            created by <div className='w-10 h-10 rounded-full overflow-hidden '><img className='scale-125 object-cover' src="src/icons/vsp.jfif" alt="VSP logo" /></div>with love
        </div>
    </div>
    </div>
  )
}

export default Footer