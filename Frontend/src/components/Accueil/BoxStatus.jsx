import React from 'react'

function BoxStatus({bgColor,icon ,title , number}) {
  return (
<div className="flex-1 flex justify-between gap-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg drop-shadow-black-sm">
  <div className={`w-4/12 h-20 p-2  my-5 mx-4 rounded-xl flex justify-center items-center ${bgColor}`}>
            <img className='w-8/12' src={icon} alt="PersonIcon" />
        </div>
        <div className='flex flex-col  justify-evenly items-center'>
            <p className=' text-lg font-semibold'>{title}</p>
            <p className=' w-full text-left text-yellow-300 font-bold text-3xl '>{number}</p>
           
        </div>
    </div>
  )
}

export default BoxStatus