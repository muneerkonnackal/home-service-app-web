"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from "./_components/BookingHistoryList";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { Item } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function myBooking() {
  const { data } = useSession();
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    data && GetUserBookingHistory();
  }, [data]);

  const GetUserBookingHistory = () => {
    GlobalApi.GetUserBookingHistory(data.user.email).then((res) => {
      console.log(res.bookings);

      setBookingHistory(res.bookings);
    });
  };

  const filterData = (type) => {
    const result = bookingHistory.filter((Item) =>
      type == "booked"
        ? new Date(Item.date) >= new Date()
        : new Date(Item.date) <= new Date()
    );
    return result;
  };

  return (
    <div className="my-10 mx-5 md:mx-36">
      <div className="flex items-center justify-between ">
        <h2 className="font-bold text-[20px] my-2">My Booking</h2>
        <Link href={"/"}>
          <Button className="rounded-full border border-gray-600">Back</Button>
        </Link>
      </div>
      {/* <Tabs defaultValue="booked" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          <BookingHistoryList bookingHistory={filterData("booked")} />
        </TabsContent>
        <TabsContent value="completed">
          <BookingHistoryList bookingHistory={filterData("completed")} />
        </TabsContent>
      </Tabs> */}
       <Tabs defaultValue="booked" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          {filterData('booked').length > 0 ? (
            <BookingHistoryList bookingHistory={filterData('booked')} />
          ) : (
            <h2 className='font-bold text-center mt-5'>You don't have any upcoming bookings.</h2>
          )}
        </TabsContent>
        <TabsContent value="completed">
          {filterData('completed').length > 0 ? (
            <BookingHistoryList bookingHistory={filterData('completed')} />
          ) : (
            <h2 className='font-bold text-center mt-5'>You don't have any completed bookings.</h2>
          )}
        </TabsContent>
      </Tabs>
    </div>
    
  );
}

export default myBooking;
