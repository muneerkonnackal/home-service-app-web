import { Calendar, Clock, MapPin, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GlobalApi from "@/app/_services/GlobalApi";

function BookingHistoryList({ bookingHistory }) {
  console.log(bookingHistory);

  const cancelBooking = (bookingId) => {
    GlobalApi.DeleteBooking(bookingId).then(
      (resp) => {
        if (resp) {
          toast("Booking Delete Successfully!");
        }
      },
      (e) => {
        toast("Error while canceling booking!");
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {bookingHistory && bookingHistory.length > 0 ?(
      bookingHistory.map((booking, index) => (
        <div key={index} className="flex gap-4 border rounded-lg p-4 mb-5">
          {booking?.businessList?.name && (
            <Image
              src={booking?.businessList?.images[0]?.url}
              alt="image"
              width={120}
              height={120}
              className="rounded-lg object-cover"
            />
          )}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">{booking.businessList.name}</h2>
            <h2 className="flex gap-2 text-primary">
              <User /> {booking.businessList.contactPerson}
            </h2>
            <h2 className="flex gap-2 text-gray-500">
              <MapPin /> {booking.businessList.address}
            </h2>
            <h2 className="flex gap-2 text-gray-500">
              <Calendar className="text-primary" /> Service On:{" "}
              <span className="text-black">{booking.date}</span>
            </h2>
            <h2 className="flex gap-2 text-gray-500">
              <Clock className="text-primary" /> Service On:{" "}
              <span className="text-black">{booking.time}</span>
            </h2>

            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button>Cancel Booking</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => cancelBooking(booking.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))) : 
      (<div className="font-bold m-5">
        <h2 value="booked" >You Dont Have Any Bookings</h2>
        <h2 value="completed" >You Dont Have Any Completed List</h2>

      </div>) }
    </div>
  );
}

export default BookingHistoryList;
