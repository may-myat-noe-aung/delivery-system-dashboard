// import React, { useEffect, useRef, useState } from "react";

// import {
//   CreditCard,
//   Store,
//   CalendarClock,
//   CircleDollarSign,
//   X,
// } from "lucide-react";

// export default function FinanceNotificationDropdown({
//   shops = [],
// }) {
//   const [open, setOpen] = useState(false);

//   const notiRef = useRef(null);

//   // =============================
//   // OUTSIDE CLICK
//   // =============================

//   useEffect(() => {
//     const handleClick = (e) => {
//       if (
//         notiRef.current &&
//         !notiRef.current.contains(e.target)
//       ) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener(
//       "mousedown",
//       handleClick
//     );

//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleClick
//       );
//     };
//   }, []);

//   // =============================
//   // FORMAT MONEY
//   // =============================

//   const formatMoney = (amount) => {
//     return `${Number(
//       amount || 0
//     ).toLocaleString()} MMK`;
//   };

//   // =============================
//   // FORMAT DATE
//   // =============================

//   const formatDate = (date) => {
//     if (!date) return "-";

//     const d = new Date(date);

//     if (Number.isNaN(d.getTime())) {
//       return date;
//     }

//     return d.toLocaleDateString(
//       "en-GB",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );
//   };

//   // =============================
//   // CLEAR ONE SHOP'S UI
//   // =============================

//   const closeDropdown = () => {
//     setOpen(false);
//   };

//   return (
//     <div
//       className="relative"
//       ref={notiRef}
//     >
//       {/* =================================
//           FINANCE BUTTON
//       ================================= */}

//       <button
//         onClick={() =>
//           setOpen((prev) => !prev)
//         }
//         className="
//           group
//           relative
//           flex
//           items-center
//           justify-center
//           rounded-2xl
//           border
//           border-emerald-500/20
//           bg-neutral-900
//           p-2
//           shadow-lg
//           transition-all
//           duration-300
//           hover:border-emerald-400/40
//           hover:bg-emerald-500/5
//           hover:shadow-emerald-500/10
//         "
//       >
//         <CreditCard
//           className="
//             h-5
//             w-5
//             text-emerald-300
//             transition-transform
//             duration-300
//             group-hover:scale-110
//           "
//         />

//         {/* BADGE */}

//         {shops.length > 0 && (
//           <span
//             className="
//               absolute
//               -right-1.5
//               -top-1.5
//               flex
//               min-h-[18px]
//               min-w-[18px]
//               items-center
//               justify-center
//               rounded-full
//               border
//               border-neutral-950
//               bg-emerald-500
//               px-1
//               text-[10px]
//               font-bold
//               text-white
//               shadow-lg
//               shadow-emerald-500/30
//             "
//           >
//             {shops.length > 99
//               ? "99+"
//               : shops.length}
//           </span>
//         )}
//       </button>

//       {/* =================================
//           DROPDOWN
//       ================================= */}

//       {open && (
//         <div
//           className="
//             absolute
//             right-0
//             z-50
//             mt-3
//             w-[420px]
//             overflow-hidden
//             rounded-2xl
//             border
//             border-emerald-500/20
//             bg-[#0b1120]/95
//             shadow-2xl
//             shadow-black/50
//             backdrop-blur-xl
//           "
//         >
//           {/* HEADER */}

//           <div
//             className="
//               flex
//               items-center
//               justify-between
//               border-b
//               border-white/10
//               px-5
//               py-4
//             "
//           >
//             <div className="flex items-center gap-3">
//               <div
//                 className="
//                   flex
//                   h-10
//                   w-10
//                   items-center
//                   justify-center
//                   rounded-xl
//                   border
//                   border-emerald-400/20
//                   bg-emerald-500/10
//                 "
//               >
//                 <CreditCard
//                   size={19}
//                   className="text-emerald-300"
//                 />
//               </div>

//               <div>
//                 <h3 className="text-sm font-semibold text-white">
//                   Finance Payments
//                 </h3>

//                 <p className="text-[11px] text-neutral-500">
//                   {shops.length} shop
//                   {shops.length !== 1
//                     ? "s"
//                     : ""}{" "}
//                   pending payment
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={closeDropdown}
//               className="
//                 rounded-lg
//                 p-1.5
//                 text-neutral-600
//                 transition
//                 hover:bg-white/5
//                 hover:text-neutral-300
//               "
//             >
//               <X size={16} />
//             </button>
//           </div>

//           {/* EMPTY */}

//           {shops.length === 0 && (
//             <div
//               className="
//                 flex
//                 flex-col
//                 items-center
//                 justify-center
//                 px-6
//                 py-14
//                 text-center
//               "
//             >
//               <div
//                 className="
//                   mb-4
//                   flex
//                   h-14
//                   w-14
//                   items-center
//                   justify-center
//                   rounded-2xl
//                   border
//                   border-emerald-500/20
//                   bg-emerald-500/5
//                 "
//               >
//                 <CreditCard
//                   size={24}
//                   className="text-emerald-500/60"
//                 />
//               </div>

//               <p className="text-sm font-medium text-neutral-300">
//                 All payments are completed
//               </p>

//               <p className="mt-1 text-xs text-neutral-600">
//                 No shops are currently pending payment
//               </p>
//             </div>
//           )}

//           {/* SHOP LIST */}

//           {shops.length > 0 && (
//             <div
//               className="
//                 max-h-[400px]
//                 space-y-2
//                 overflow-y-auto
//                 p-3
//               "
//             >
//               {shops.map((shop) => {
//                 const shopInfo =
//                   shop?.shopsInfo;

//                 const platformFee =
//                   shop?.platform_fee_records?.[0];

//                 const commission =
//                   shop?.commission_records?.[0];

//                 const platformAmount = Number(
//                   platformFee?.amount || 0
//                 );

//                 const commissionAmount =
//                   Number(
//                     commission?.commission_fees ||
//                       0
//                   );

//                 const total =
//                   platformAmount +
//                   commissionAmount;

//                 const dueDate =
//                   platformFee?.period_end ||
//                   commission?.period_end;

//                 return (
//                   <div
//                     key={shopInfo?.id}
//                     className="
//                       group
//                       relative
//                       overflow-hidden
//                       rounded-xl
//                       border
//                       border-white/10
//                       bg-white/[0.025]
//                       p-4
//                       transition-all
//                       duration-300
//                       hover:border-emerald-500/30
//                       hover:bg-emerald-500/[0.04]
//                     "
//                   >
//                     <div className="relative">
//                       {/* SHOP HEADER */}

//                       <div className="flex items-start gap-3">
//                         <div
//                           className="
//                             flex
//                             h-10
//                             w-10
//                             shrink-0
//                             items-center
//                             justify-center
//                             rounded-xl
//                             border
//                             border-emerald-400/20
//                             bg-emerald-500/10
//                           "
//                         >
//                           <Store
//                             size={19}
//                             className="text-emerald-300"
//                           />
//                         </div>

//                         <div className="min-w-0 flex-1">
//                           <p className="truncate text-sm font-semibold text-white">
//                             {shopInfo?.shop_name ||
//                               "Unknown Shop"}
//                           </p>

//                           <p className="mt-0.5 text-[11px] text-neutral-500">
//                             ID: {shopInfo?.id}
//                           </p>
//                         </div>

//                         <span
//                           className="
//                             rounded-full
//                             bg-red-500/10
//                             px-2
//                             py-1
//                             text-[9px]
//                             font-semibold
//                             uppercase
//                             tracking-wider
//                             text-red-400
//                           "
//                         >
//                           Payment Due
//                         </span>
//                       </div>

//                       {/* AMOUNT */}

//                       <div
//                         className="
//                           mt-3
//                           rounded-lg
//                           border
//                           border-white/5
//                           bg-black/20
//                           px-3
//                           py-3
//                         "
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-2">
//                             <CircleDollarSign
//                               size={14}
//                               className="text-emerald-400"
//                             />

//                             <span className="text-[11px] text-neutral-500">
//                               Total Payment
//                             </span>
//                           </div>

//                           <span className="text-sm font-bold text-emerald-300">
//                             {formatMoney(total)}
//                           </span>
//                         </div>
//                       </div>

//                       {/* DETAILS */}

//                       <div className="mt-3 space-y-1.5">
//                         {platformAmount > 0 && (
//                           <div className="flex justify-between text-[11px]">
//                             <span className="text-neutral-600">
//                               Platform Fee
//                             </span>

//                             <span className="text-neutral-400">
//                               {formatMoney(
//                                 platformAmount
//                               )}
//                             </span>
//                           </div>
//                         )}

//                         {commissionAmount > 0 && (
//                           <div className="flex justify-between text-[11px]">
//                             <span className="text-neutral-600">
//                               Commission
//                             </span>

//                             <span className="text-neutral-400">
//                               {formatMoney(
//                                 commissionAmount
//                               )}
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       {/* DUE DATE */}

//                       <div
//                         className="
//                           mt-3
//                           flex
//                           items-center
//                           gap-1.5
//                           border-t
//                           border-white/5
//                           pt-2
//                         "
//                       >
//                         <CalendarClock
//                           size={12}
//                           className="text-neutral-600"
//                         />

//                         <span className="text-[10px] text-neutral-500">
//                           Due{" "}
//                           {formatDate(dueDate)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* FOOTER */}

//           <div
//             className="
//               border-t
//               border-white/5
//               px-5
//               py-3
//               text-center
//             "
//           >
            
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";

import {
  CreditCard,
  Store,
  CalendarClock,
  X,
  WalletCards,
} from "lucide-react";

export default function FinanceNotificationDropdown({
  shops = [],
}) {
  const [open, setOpen] = useState(false);

  const notiRef = useRef(null);

  // =============================
  // OUTSIDE CLICK
  // =============================

  useEffect(() => {
    const handleClick = (e) => {
      if (
        notiRef.current &&
        !notiRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClick
      );
    };
  }, []);

  // =============================
  // FORMAT DATE
  // =============================

  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      return date;
    }

    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =============================
  // GET DUE DATE
  // =============================

  const getDueDate = (shop) => {
    const platformFee =
      shop?.platform_fee_records?.[0];

    const commission =
      shop?.commission_records?.[0];

    return (
      platformFee?.period_end ||
      commission?.period_end ||
      null
    );
  };

  return (
    <div
      className="relative"
      ref={notiRef}
    >
      {/* =================================
          FINANCE BUTTON
      ================================= */}

      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="
          group
          relative
          flex
          items-center
          justify-center
          rounded-2xl
          border
          border-emerald-500/20
          bg-neutral-900
          p-2
          shadow-lg
          transition-all
          duration-300
          hover:border-emerald-400/40
          hover:bg-emerald-500/5
          hover:shadow-emerald-500/10
        "
        aria-label="Finance notifications"
      >
        {/* Glow */}

        <span
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-2xl
            bg-emerald-400/0
            blur-xl
            transition
            duration-300
            group-hover:bg-emerald-400/10
          "
        />

        {/* Icon */}

        <CreditCard
          className="
            relative
            h-5
            w-5
            text-emerald-300
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />

        {/* =================================
            BADGE
        ================================= */}

        {shops.length > 0 && (
          <span
            className="
              absolute
              -right-1.5
              -top-1.5
              flex
              min-h-[18px]
              min-w-[18px]
              items-center
              justify-center
              rounded-full
              border
              border-neutral-950
              bg-emerald-500
              px-1
              text-[10px]
              font-bold
              text-white
              shadow-lg
              shadow-emerald-500/30
              animate-pulse
            "
          >
            {shops.length > 99
              ? "99+"
              : shops.length}
          </span>
        )}
      </button>

      {/* =================================
          DROPDOWN
      ================================= */}

      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-3
            w-[420px]
            overflow-hidden
            rounded-2xl
            border
            border-emerald-500/20
            bg-[#0b1120]/95
            shadow-2xl
            shadow-black/50
            backdrop-blur-xl
          "
        >
          {/* =================================
              HEADER
          ================================= */}

          <div
            className="
              relative
              flex
              items-center
              justify-between
              border-b
              border-white/10
              px-5
              py-4
            "
          >
            {/* Header glow */}

            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                top-0
                h-20
                bg-gradient-to-b
                from-emerald-500/10
                to-transparent
              "
            />

            {/* Title */}

            <div className="relative flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-emerald-400/20
                  bg-emerald-500/10
                "
              >
                <WalletCards
                  size={19}
                  className="text-emerald-300"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Finance Payments
                </h3>

                <p className="mt-0.5 text-[11px] text-neutral-500">
                  {shops.length} shop
                  {shops.length !== 1
                    ? "s"
                    : ""}{" "}
                  need to pay
                </p>
              </div>
            </div>

            {/* Close */}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                relative
                rounded-lg
                p-1.5
                text-neutral-600
                transition
                hover:bg-white/5
                hover:text-neutral-300
              "
              aria-label="Close finance notifications"
            >
              <X size={16} />
            </button>
          </div>

          {/* =================================
              EMPTY STATE
          ================================= */}

          {shops.length === 0 && (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                px-6
                py-14
                text-center
              "
            >
              {/* Icon */}

              <div
                className="
                  mb-4
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/5
                "
              >
                <CreditCard
                  size={24}
                  className="text-emerald-500/60"
                />
              </div>

              <p className="text-sm font-medium text-neutral-300">
                No payment pending
              </p>

              <p className="mt-1 max-w-[250px] text-xs leading-5 text-neutral-600">
                All shops have completed their
                required payments.
              </p>
            </div>
          )}

          {/* =================================
              SHOP LIST
          ================================= */}

          {shops.length > 0 && (
            <div
              className="
                max-h-[400px]
                space-y-2
                overflow-y-auto
                p-3
              "
            >
              {shops.map((shop, index) => {
                const shopInfo =
                  shop?.shopsInfo;

                const shopId =
                  shopInfo?.id || "-";

                const shopName =
                  shopInfo?.shop_name ||
                  "Unknown Shop";

                const dueDate =
                  getDueDate(shop);

                return (
                  <div
                    key={`${shopId}-${index}`}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.025]
                      p-4
                      transition-all
                      duration-300
                      hover:border-emerald-500/30
                      hover:bg-emerald-500/[0.04]
                    "
                  >
                    {/* =================================
                        HOVER GRADIENT
                    ================================= */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-emerald-500/[0.07]
                        via-transparent
                        to-transparent
                        opacity-0
                        transition
                        duration-300
                        group-hover:opacity-100
                      "
                    />

                    <div className="relative">
                      {/* =================================
                          SHOP HEADER
                      ================================= */}

                      <div className="flex items-start gap-3">
                        {/* Shop Icon */}

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-emerald-400/20
                            bg-emerald-500/10
                          "
                        >
                          <Store
                            size={19}
                            className="text-emerald-300"
                          />
                        </div>

                        {/* Shop Name + ID */}

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">
                            {shopName}
                          </p>

                          <p className="mt-1 text-[11px] text-neutral-500">
                            Shop ID:{" "}
                            <span className="text-neutral-400">
                              {shopId}
                            </span>
                          </p>
                        </div>

                        {/* Status */}

                        <span
                          className="
                            shrink-0
                            rounded-full
                            border
                            border-amber-400/20
                            bg-amber-500/10
                            px-2
                            py-1
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-wider
                            text-amber-300
                          "
                        >
                          Payment Due
                        </span>
                      </div>

                      {/* =================================
                          MESSAGE
                      ================================= */}

                      <div
                        className="
                          mt-3
                          rounded-lg
                          border
                          border-white/5
                          bg-black/20
                          px-3
                          py-2.5
                        "
                      >
                        <p className="text-xs text-neutral-300">
                          💳 ငွေပေးချေရန် ကျန်ရှိနေပါသည်။
                        </p>
                      </div>

                      {/* =================================
                          DUE DATE
                      ================================= */}

                      {/* <div
                        className="
                          mt-3
                          flex
                          items-center
                          gap-2
                          border-t
                          border-white/5
                          pt-3
                        "
                      >
                        <CalendarClock
                          size={13}
                          className="shrink-0 text-emerald-400"
                        />

                        <span className="text-[11px] text-neutral-500">
                          Payment Date
                        </span>

                        <span className="ml-auto text-[11px] font-medium text-neutral-300">
                          {formatDate(dueDate)}
                        </span>
                      </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* =================================
              FOOTER
          ================================= */}
{/* 
          <div
            className="
              border-t
              border-white/5
              px-5
              py-3
              text-center
            "
          >
            <p className="text-[10px] text-neutral-600">
              Payment status updates automatically
            </p>
          </div> */}
        </div>
      )}
    </div>
  );
}