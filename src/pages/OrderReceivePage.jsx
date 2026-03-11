import React from 'react'

import OrdersTable from '../components/OrderReceive/OrdersTable'

const OrderReceivePage = () => {
  const orders = [
  {
    id: "FO1025",
    customerName: "Mg Mg",
    phone: "09xxxxxxxx",
    address: "Yangon, Sanchaung",
    items: [
      { name: "Chicken Burger", qty: 2 },
      { name: "French Fries", qty: 1 }
    ],
    paymentMethod: "KBZ Pay",
    paid: true,
    total: 25000
  },  
  {
    id: "FO1026",
    customerName: "Mg Mg",
    phone: "09xxxxxxxx",
    address: "Yangon, Sanchaung",
    items: [
      { name: "Chicken Burger", qty: 2 },
      { name: "French Fries", qty: 1 }
    ],
    paymentMethod: "KBZ Pay",
    paid: true,
    total: 25000
  }
];

  return (
   <div>
     {/* <OrderConfirm/>
     <OrderDetail/> */}
  {/* <OrdersTable
  orders={orders}
  onAccept={(order) => console.log("Accepted:", order)}
  onReject={(order) => console.log("Rejected:", order)}
/> */}

     {/* <OrdersTable/> */}
   </div>
    
  )
}

export default OrderReceivePage