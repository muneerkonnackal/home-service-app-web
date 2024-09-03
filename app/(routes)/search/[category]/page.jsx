"use client"
import BuisinessList from '@/app/_components/BuisinessList';
import GlobalApi from '@/app/_services/GlobalApi';
import React, { useEffect, useState } from 'react'

function BuisinessByCategory({params}) {
const [buisinessList,setBuisinessList]=useState([])

    useEffect(()=>{
        console.log(params);
        params&&getBuisinessList()
        
    },[params])

const getBuisinessList = ()=>{
    GlobalApi.getBuisinessByCategory(params.category).then(res=>{
        setBuisinessList(res?.businessLists);
        
    })
}

  return (
    <div>
        <BuisinessList title={params.category } 
        buisinessList={buisinessList}/>
    </div>
  )
}

export default BuisinessByCategory