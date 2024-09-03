import { Button } from '@/components/ui/button'
import { Clock, Mail, MapPin, Share, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function BuisinessInfo({buisiness}) {
  return buisiness?.name&&(
    <div className='md:flex gap-4 items-center'>
        <Image src={buisiness?.images[0]?.url}
        alt={buisiness.name}
        width={150}
        height={200}
        className='rounded-full h-[150px] object-cover' 
        />

        <div className='flex items-center  justify-between w-full'>
            <div className='flex flex-col  mt-4 md:mt-0 items-baseline gap-3'>
                <h2 className='text-primary p-1 px-3 text-lg bg-purple-100 rounded-full'>{buisiness?.category?.name}</h2>
                <h2 className='text-[40px] font-bold'>{buisiness.name}</h2>
                <h2 className=' flex gap-2 text-lg text-gray-500'><MapPin/>{buisiness.address}</h2>
                <h2 className='flex gap-2 text-lg text-gray-500'><Mail/> {buisiness?.email}</h2>
            </div>

            <div className='flex flex-col gap-5 items-end'>
                <Button><Share /></Button>
                <h2 className='flex gap-2 text-lg text-primary'><User/>{buisiness.contactPerson}</h2>
                <h2 className='flex gap-2 text-lg text-gray-500'><Clock/>Available 8:AM to 10:PM</h2>
            </div>
        </div>


    </div>
  )
}

export default BuisinessInfo