import Image from 'next/image'
import React from 'react'

function BuisinessDescription({buisiness}) {
  return buisiness?.name&&(
    <div>
        <h2 className='font-bold text-[25px] '>Description</h2>
        <p className='mt-4 text-lg text-gray-600'>{buisiness.about}</p>

        <h2 className='font-bold text-[25px] mt-8'>Gallery</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5'>
            {buisiness?.images?.map((item,index)=>(
                <Image src={item?.url} key={index}
                alt='image'
                width={700}
                height={200}
                className='rounded-lg'
                /> 
            ))}
        </div>
    </div>
  )
}

export default BuisinessDescription