import React from "react";
import ManagementTable from "../components/Management/ManagementTable";

function ManagementPage() {
  return (
    <section className="h-[750px] overflow-y-auto max-w-8xl px-4 py-6 space-y-6">
      <ManagementTable />
    </section>
  );
}

export default ManagementPage;
