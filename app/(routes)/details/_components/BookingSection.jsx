import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Item } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import moment from "moment";
import { CaptionsOff, Smile } from "lucide-react";

function BookingSection({ children, buisiness }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  //state for  save the selected time slot
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);
  const { data } = useSession();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    date && BuisinessBookedSlot();
  }, [date]);

  // Get selected date buidiness booked slot
  const BuisinessBookedSlot = () => {
    GlobalApi.BuisinessBookedSlot(
      buisiness.id,
      moment(date).format("DD-MMM-YYYY")
    ).then((res) => {
      setBookedSlot(res.bookings);
    });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    GlobalApi.createBooking(
      buisiness.id,
      moment(date).format("DD-MMM-YYYY"),
      selectedTime,
      data.user.email,
      data.user.name
    ).then(
      (resp) => {
        console.log( resp.createBooking        );
        if (resp) {
          setDate();
          setSelectedTime("");
          toast("Service Booked successfully!");
          // Toast Msg
        }
      },
      (e) => {
        toast("Error while creating booking");
        //Error Toast Msg
      }
    );
  };

  const isSlotBooked = (time) => {
    return bookedSlot.find((Item) => Item.time == time);
  };
  //  Disable Previous Dates in Calendar
  const isDateDisabled = (day) => {
    return moment(day).isBefore(moment(), "day");
  };

  //  Disable Previous Time Slots 
  const isTimeDisabled = (time) => {
    const currentDate = moment();
    const selectedDate = moment(date);
    const currentTime = moment(time, ["h:mm A"]);

    return (
      selectedDate.isSame(currentDate, "day") &&
      currentTime.isBefore(currentDate)
    );
  };
  const allSlotsDisabled = timeSlot.every(
    (slot) => isSlotBooked(slot.time) || isTimeDisabled(slot.time)
  );

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book an Service</SheetTitle>
            <SheetDescription>
              Select Date and Time slot to book an Service
              {/* Date Picker  */}
              <div className="flex flex-col gap-5 items-baseline ">
                <h2 className="mt-5 font-bold">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={isDateDisabled}
                />
              </div>
              {/* Time slot picker */}
              <h2 className="my-5 font-bold">Select Time Slot</h2>
              {/* <div className='grid grid-cols-3 gap-3'>
        {timeSlot.map((Item,index)=>(
        <Button key={index}
        // disabled={isSlotBooked(Item.time)}
        disabled={isSlotBooked(Item.time) || isTimeDisabled(Item.time)}
         variant='outline'
         className={`border rounded-full p-2 px-3 hover:bg-primary hover:text-white
            ${selectedTime==Item.time&&'bg-primary text-white'}`}
        onClick={()=>setSelectedTime(Item.time)}
         >{Item.time}</Button>
    ))}
        </div> */}
              {allSlotsDisabled ? (
                <div className="text-black font-bold">
                  <h2 className=" text-primary">
                    {" "}
                    <CaptionsOff className="text-red-500"/>
                    Hello!!! {data.user.name} <Smile className="text-yellow-400 "/> <br /> Today's services
                    are closed. Please book for tomorrow.
                  </h2>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {timeSlot.map((Item, index) => (
                    <Button
                      key={index}
                      disabled={
                        isSlotBooked(Item.time) || isTimeDisabled(Item.time)
                      } // Disable booked or previous time slots
                      variant="outline"
                      className={`border rounded-full p-2 px-3 hover:bg-primary hover:text-white
                                                ${
                                                  selectedTime === Item.time &&
                                                  "bg-primary text-white"
                                                }`}
                      onClick={() => setSelectedTime(Item.time)}
                    >
                      {Item.time}
                    </Button>
                  ))}
                </div>
              )}
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button variant="destructive" className="">
                  Cancel
                </Button>
                <Button
                  disabled={!(selectedTime && date)}
                  onClick={() => saveBooking()}
                >
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
