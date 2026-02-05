import React, { useEffect, useState } from "react";
import ChangePasscodeForm from "./ChangePasscodeForm";
import ChangePasswordForm from "./ChangePasswordForm";


/* 🔹 FAKE ADMIN EMAIL */
const fakeAdminEmail = "owner@example.com";

export default function SecurityTab() {
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    // Fake data instead of localStorage
    setAdminEmail(fakeAdminEmail);
  }, []);

  return (
    <div className="">
      <h3 className="font-bold text-xl mb-4 text-[#B476FF] text-center md:text-left">
        Security Settings
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <ChangePasscodeForm email={adminEmail} />
        <ChangePasswordForm email={adminEmail} />
      </div>
    </div>
  );
}
