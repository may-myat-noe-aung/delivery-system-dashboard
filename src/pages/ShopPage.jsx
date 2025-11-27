import React, { useState } from 'react'
import ShopForm from '../components/Shop/ShopForm'
import AddShopCard from '../components/Shop/AddShopCard';

const ShopPage = () => {
    const [shops, setShops] = useState([]);
  
    const handleAddShop = (shop) => {
      setShops([shop, ...shops]);
    };


  return (
  <section className="flex w-full h-[750px] overflow-y-auto max-w-8xl px-4   ">
      <ShopForm onAdd={handleAddShop} />
      <AddShopCard shops={shops} />
   
    </section>

  )
}

export default ShopPage

// import React, { useState } from 'react'
// import ShopForm from '../components/Shop/ShopForm'
// import AddShopCard from '../components/Shop/AddShopCard';

// const ShopPage = () => {
//   const [shops, setShops] = useState([]);
//   const [editingShop, setEditingShop] = useState(null);

//   // Add new shop
//   const handleAddShop = (shop) => {
//     setShops([shop, ...shops]);
//   };

//   // Edit shop
//   const handleEditShop = (shop, index) => {
//     setEditingShop({ ...shop, index });
//   };

//   // Update shop after editing
//   const handleUpdateShop = (updatedShop) => {
//     const newShops = [...shops];
//     newShops[updatedShop.index] = updatedShop;
//     setShops(newShops);
//     setEditingShop(null);
//   };

//   return (
//     <section className="flex w-full h-[750px] overflow-y-auto max-w-8xl px-4">
//       <ShopForm
//         onAdd={handleAddShop}
//         onUpdate={handleUpdateShop}
//         editingShop={editingShop}
//       />
//       <AddShopCard
//         shops={shops}
//         onEdit={handleEditShop} // pass edit callback
//       />
//     </section>
//   )
// }

// export default ShopPage;
