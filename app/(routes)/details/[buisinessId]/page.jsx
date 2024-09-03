"use client"
import GlobalApi from '@/app/_services/GlobalApi';
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import BuisinessInfo from '../_components/BuisinessInfo';
import SuggestedBuisiness from '../_components/SuggestedBuisiness';
import BuisinessDescription from '../_components/BuisinessDescription';

function BuisinessDeatail({params}) {
    const {data,status}=useSession();
    const [buisiness,setBuisiness]=useState([])

    useEffect(()=>{
      params&&getBuisinessById();
    },[params]);

   useEffect(()=>{
    checkUserAuth()
   },[]);

   
   const getBuisinessById=()=>{
    GlobalApi.getBuisinessById(params.buisinessId).then(res=>{
      setBuisiness(res.businessList
      );
    }) //here the buisinessId isthe foldername
  }


    const checkUserAuth=()=>{
      
    if(status=='loading'){
      return <p>Loading</p>
  }

  if(status=='unauthenticated'){
      signIn('descope')
  }
    }


  return status=='authenticated'&&buisiness&& (
    <div className='py-8 md:py-20 px-10 md:px-36'>
      <BuisinessInfo buisiness ={buisiness} />

      <div className='grid grid-cols-2 md:grid-cols-3 mt-16'>
        <div className='col-span-2 md:col-span-2 order-last md:order-first'>
          <BuisinessDescription buisiness ={buisiness} />
        </div>
        <div className=''>
          <SuggestedBuisiness buisiness ={buisiness} />
        </div>

      </div>
    </div>
  )
}

export default BuisinessDeatail