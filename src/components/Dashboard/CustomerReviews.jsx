// import React from "react";
// import { Star } from "lucide-react";

// export default function CustomerReviews() {
//   const reviews = [
//     {
//       id: 1,
//       name: "Mew Hnin Phyu",
//       date: "2 days ago",
//       review:
//         "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
//       rating: 4.1,
//       img: "https://i.ibb.co/7G5x0wS/food-salad.jpg", // replace with real food img
//       avatar: "https://i.pravatar.cc/50?img=5",
//     },
//     {
//       id: 2,
//       name: "Mew Hnin Phyu",
//       date: "2 days ago",
//       review:
//         "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
//       rating: 4.1,
//       img: "https://i.ibb.co/7G5x0wS/food-salad.jpg",
//       avatar: "https://i.pravatar.cc/50?img=6",
//     },
//     {
//       id: 3,
//       name: "Mew Hnin Phyu",
//       date: "2 days ago",
//       review:
//         "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
//       rating: 4.1,
//       img: "https://i.ibb.co/7G5x0wS/food-salad.jpg",
//       avatar: "https://i.pravatar.cc/50?img=7",
//     },
//   ];

//   return (
//     <div className="bg-white p-5 rounded-2xl shadow my-6">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">
//         Customer Reviews
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {reviews.map((r) => (
//           <div
//             key={r.id}
//             className="border rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition"
//           >
//             {/* Image */}
//             <img
//               src={r.img}
//               alt="Food"
//               className="w-full h-32 object-cover rounded-xl"
//             />

//             {/* Review Text */}
//             <p className="text-sm text-gray-600 line-clamp-3">{r.review}</p>

//             {/* Reviewer Info */}
//             <div className="flex items-center gap-3 mt-auto">
//               <img
//                 src={r.avatar}
//                 alt={r.name}
//                 className="w-10 h-10 rounded-full border"
//               />
//               <div className="flex-1">
//                 <h4 className="text-sm font-semibold text-gray-800">
//                   {r.name}
//                 </h4>
//                 <span className="text-xs text-gray-500">{r.date}</span>
//               </div>
//             </div>

//             {/* Rating */}
//             <div className="flex items-center gap-1 text-yellow-500 text-sm">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-4 h-4 ${
//                     i < Math.round(r.rating) ? "fill-yellow-400" : "fill-gray-200"
//                   }`}
//                 />
//               ))}
//               <span className="ml-2 text-gray-700 font-medium">
//                 ({r.rating})
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from "react";

const reviews = [
  {
    name: "Mg Kaung Kaung",
    date: "2 days ago",
    review:
      "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", // Replace with your salad image URL
    avatar: "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww", // Replace with your avatar image URL
  },
    {
    name: "Mg Kaung Kaung",
    date: "2 days ago",
    review:
      "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", // Replace with your salad image URL
    avatar: "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww", // Replace with your avatar image URL
  },
    {
    name: "Mg Kaung Kaung",
    date: "2 days ago",
    review:
      "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", // Replace with your salad image URL
    avatar: "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww", // Replace with your avatar image URL
  },
    {
    name: "Mg Kaung Kaung",
    date: "2 days ago",
    review:
      "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D", // Replace with your salad image URL
    avatar: "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww", // Replace with your avatar image URL
  },

];

const CustomerReviews = () => {
  return (
    <div className="p-6 mx-6 rounded-2xl shadow-sm bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Customer Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-3 flex flex-col space-y-2"
          >
            {/* Header */}
            <div className="flex items-center">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{review.name}</h3>
                <p className="text-gray-400 text-xs">{review.date}</p>
              </div>
            </div>

   <div className="flex items-center justify-center">
             {/* Review text */}
            <p className="text-gray-600 text-xs">{review.review}</p>

            {/* Image */}
            <img
              src={review.image}
              alt="Review"
              className="w-full h-20 object-cover rounded-lg"
            />
   </div>

            {/* Rating */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < 4 ? "★" : "☆"}</span>
                ))}
              </div>
              <p className="font-semibold text-gray-700">({review.rating})</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
