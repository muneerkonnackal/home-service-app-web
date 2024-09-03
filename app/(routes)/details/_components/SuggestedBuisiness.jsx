import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import { NotebookPen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BookingSection from './BookingSection'


function SuggestedBuisiness({buisiness}) {

    const [buisinessList,setBuisinessList]=useState([])

    useEffect(()=>{
        buisiness&&getBuisinessList()
     },[buisiness])

const getBuisinessList = ()=>{
    GlobalApi.getBuisinessByCategory(buisiness?.category?.name).then(res=>{
        setBuisinessList(res?.businessLists);
        
    })
}


  return (
    <div className='md:pl-10'>
        
       <BookingSection buisiness={buisiness}> 
       <Button className="flex gap-2 w-full">
        <NotebookPen/>
        Book Appointment  
        </Button>
       </BookingSection>

        <div className='hidden md:block'>
          <h2 className='font-bold text-lg mt-3 mb-3 '>Similar Buisiness</h2>
  
          <div className=''>
            {buisinessList&&buisinessList.map((buisiness,index)=>(
              <Link href={'/details/'+buisiness.id} className='flex gap-2 mb-4 hover:border border-primary rounded-lg p-2 cursor-pointer hover:shadow-md'>
                <Image src={buisiness?.images[0].url}
                alt={buisiness.name}
                width={80}
                height={80}
                className='rounded-lg object-cover'
                />
                <div >
                  <h2 className='font-bold '>{buisiness.name}</h2>
                  <h2 className='text-primary'>{buisiness.contactPerson}</h2>
                  <h2 className='text-gray-400'>{buisiness.address}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
    </div>
  )
}

export default SuggestedBuisiness