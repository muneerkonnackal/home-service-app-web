"use client"
import Image from "next/image";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import GlobalApi from "./_services/GlobalApi";
import { useEffect, useState } from "react";
import BuisinessList from "./_components/BuisinessList";


export default function Home() {

  const [categoryList,setCategoryList] = useState([])
  const [buisinessList,setBuisinessList] = useState([])

  useEffect(()=>{
    getCategoryList(),
    getAllBuisinessList()
  },[]);

  //* used to get all categories
  const getCategoryList =()=>{
    GlobalApi.getCategory().then(res=>{
      setCategoryList(res.categories);
      
    })
  }
  
  //* used to get all buisiness list
  const getAllBuisinessList =()=>{
    GlobalApi.getAllBuisinessList().then(res=>{
      setBuisinessList(res.businessLists);
      
    })
  }



  return (
  <div>
    <Hero/>

    <CategoryList categoryList = {categoryList} />

    <BuisinessList buisinessList={buisinessList} 
    title={'Popular Buisiness'}/>
  </div>
  );
}
