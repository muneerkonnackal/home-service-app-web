const { gql, default: request } = require("graphql-request")


const MASTER_URL = 'https://ap-south-1.cdn.hygraph.com/content/'+process.env.NEXT_PUBLIC_MASTER_URL_KEY+'/master'

const getCategory = async ()=>{
    const query = gql`
    query Category {
  categories {
    bgColor {
      hex
    }
    id
    name
    icon {
      url
    }
  }
}
    `;
    const result = await request(MASTER_URL,query);
    return result;

}

const getAllBuisinessList = async ()=>{
  const query = gql`
  query BuisinessList {
  businessLists {
    about
    address
    category {
      name
    }
    contactPerson
    email
    images {
      url
    }
    id
    name
  }
}
  `;
  const result = await request(MASTER_URL,query);
  return result;
}


// get categories by clicking options
const getBuisinessByCategory=async(category)=>{
  const query = gql`
  query MyQuery {
  businessLists(where: {category: {name: "`+category+`"}}) {
    about
    address
    category {
      name
    }
    contactPerson
    email
    id
    name
    images {
      url
    }
  }
}
  `
  const result = await request(MASTER_URL,query);
  return result;
}

// getbuisinessbyId
const getBuisinessById=async(id)=>{
  const query =gql`
  query GetBuisinessById {
  businessList(where: {id: "`+id+`"}) {
    about
    address
    category {
      name
    }
    contactPerson
    email
    id
    name
    images {
      url
    }
  }
}
  `
  const result = await request(MASTER_URL,query);
  return result;
}



const createBooking = async(buisinessId,date,time,userEmail,userName)=>{
  const mutationQuery=gql`
 mutation CreateBooking {
  createBooking(
    data: {bookingStatus: booked, businessList: {connect: {id: "`+buisinessId+`"}}, date: "`+date+`", time: "`+time+`", userEmail: "`+userEmail+`", userName: "`+userName+`"}
  ) {
    id
  }
     publishManyBookings(to: PUBLISHED) {
    count
  }
}`
const result = await request(MASTER_URL,mutationQuery);
  return result;
  
  
}

const BuisinessBookedSlot=async(buisinessId,date)=>{
  const query =gql`
  query BuisinessBookedSlot {
  bookings(where: {businessList: {id: "`+buisinessId+`"},
   date: "`+date+`"}) {
    date
    time
  }
}`
const result = await request(MASTER_URL,query);
  return result;
  
}

const GetUserBookingHistory=async(userEmail)=>{
  const  query = gql`
  query GetUserBookingHistory {
  bookings(where: {userEmail: "`+userEmail+`"}
   orderBy: publishedAt_DESC) {
    id
    date
    time
    businessList {
      id
      name
      images {
        url
      }
        
      contactPerson
      address
    }
    
  }
}`
const result = await request(MASTER_URL,query);
  return result;
}

// Cancel Booking From History and delete from history
 const DeleteBooking=async(bookingId)=>{
  const mutationQuery=gql`mutation DeleteBooking {
  deleteBooking(where: {id: "`+bookingId+`"}) {
    businessList {
      id
      name
    }
  }
}`
const result = await request(MASTER_URL,mutationQuery);
  return result;
 }


export default{
    getCategory,
    getAllBuisinessList,
    getBuisinessByCategory,
    getBuisinessById,
    createBooking,
    BuisinessBookedSlot,
    GetUserBookingHistory,
    DeleteBooking
}