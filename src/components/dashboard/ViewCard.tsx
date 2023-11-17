import React from "react";

const ViewCard = ({
  title,
  count,
}: {
  title: string;
  count: number | string;
}) => {
  return (
    <div className="w-full px-6 py-10 rounded-xl shadow-lg border text-center bg-gradient-to-tl from-emerald-500 to-blue-500">
      <p className="text-gray-200 text-sm mb-2 font-normal">{title}</p>
      <h1 className="text-white">{count}</h1>
    </div>
  );
};

export default ViewCard;
