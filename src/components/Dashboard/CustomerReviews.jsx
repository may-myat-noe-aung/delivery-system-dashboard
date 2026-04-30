// import React from "react";
// import { useTheme } from "../ThemeProvider"; // adjust path if needed

// const reviews = [
//   {
//     name: "Mg Kaung Kaung",
//     date: "2 days ago",
//     review:
//       "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
//     rating: 4.1,
//     image:
//       "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60",
//     avatar:
//       "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60",
//   },
//   {
//     name: "Mg Kaung Kaung",
//     date: "2 days ago",
//     review:
//       "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
//     rating: 4.1,
//     image:
//       "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60",
//     avatar:
//       "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60",
//   },
//   {
//     name: "Mg Kaung Kaung",
//     date: "2 days ago",
//     review:
//       "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
//     rating: 4.1,
//     image:
//       "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60",
//     avatar:
//       "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60",
//   },
//   {
//     name: "Mg Kaung Kaung",
//     date: "2 days ago",
//     review:
//       "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
//     rating: 4.1,
//     image:
//       "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60",
//     avatar:
//       "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60",
//   },
// ];

// const CustomerReviews = () => {
//   const { dark } = useTheme();

//   return (
//     <div
//       className={`p-6 mx-6 rounded-2xl shadow-sm ${
//         dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
//       }`}
//     >
//       <h2
//         className={`text-lg font-bold mb-4 ${
//           dark ? "text-gray-100" : "text-gray-800"
//         }`}
//       >
//         Customer Reviews
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {reviews.map((review, index) => (
//           <div
//             key={index}
//             className={`rounded-xl shadow p-3 flex flex-col space-y-2 ${
//               dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
//             }`}
//           >
//             {/* Header */}
//             <div className="flex items-center">
//               <img
//                 src={review.avatar}
//                 alt={review.name}
//                 className="w-8 h-8 rounded-full mr-2"
//               />
//               <div>
//                 <h3
//                   className={`font-semibold text-sm ${
//                     dark ? "text-gray-100" : "text-gray-900"
//                   }`}
//                 >
//                   {review.name}
//                 </h3>
//                 <p
//                   className={`text-xs ${
//                     dark ? "text-gray-400" : "text-gray-400"
//                   }`}
//                 >
//                   {review.date}
//                 </p>
//               </div>
//             </div>

//             {/* Review text + Image */}
//             <div className="flex flex-col gap-2">
//               <p className={`text-xs ${dark ? "text-gray-300" : "text-gray-600"}`}>
//                 {review.review}
//               </p>
//               <img
//                 src={review.image}
//                 alt="Review"
//                 className="w-full h-20 object-cover rounded-lg"
//               />
//             </div>

//             {/* Rating */}
//             <div className="flex items-center justify-between text-xs">
//               <div className="flex text-yellow-400">
//                 {Array.from({ length: 5 }, (_, i) => (
//                   <span key={i}>{i < 4 ? "★" : "☆"}</span>
//                 ))}
//               </div>
//               <p
//                 className={`font-semibold text-xs ${
//                   dark ? "text-gray-200" : "text-gray-700"
//                 }`}
//               >
//                 ({review.rating})
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomerReviews;
import React from "react";

const reviews = [
  {
    name: "Mg Kaung Kaung",
    date: "2 days ago",
    review:
      "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60",
    avatar:
      "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Mg Kaung Kaung",
    date: "2 days ago",
    review:
      "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60",
    avatar:
      "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Mg Kaung Kaung",
    date: "2 days ago",
    review:
      "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60",
    avatar:
      "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Mg Kaung Kaung",
    date: "2 days ago",
    review:
      "Energize with our nutritious healthy salad, bursting with fresh greens and vibrant superfoods",
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60",
    avatar:
      "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=900&auto=format&fit=crop&q=60",
  },
];

const CustomerReviews = () => {
  return (
    <div className="p-6 mx-6 rounded-2xl shadow-sm bg-gray-900 text-gray-100 mb-10">
      <h2 className="text-lg font-bold mb-4 text-gray-100">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="rounded-xl shadow p-3 flex flex-col space-y-2 bg-gray-800 text-gray-100"
          >
            {/* Header */}
            <div className="flex items-center">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <h3 className="font-semibold text-sm text-gray-100">
                  {review.name}
                </h3>
                <p className="text-xs text-gray-400">{review.date}</p>
              </div>
            </div>

            {/* Review */}
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-300">{review.review}</p>
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
              <p className="font-semibold text-gray-200">
                ({review.rating})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;