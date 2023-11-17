import React from "react";

const Loader = ({ title }: { title?: string }) => {
  return (
    <div className="w-full flex items-center justify-center gap-3 text-center py-5">
      <span className="loading loading-spinner loading-md"></span>
      <p className="text-sm font-semibold">{title}</p>
    </div>
  );
};

export default Loader;
