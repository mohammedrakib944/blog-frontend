import React from "react";

const ViewCard = ({
  title,
  count,
}: {
  title: string;
  count: number | string;
}) => {
  return (
    <div className="w-full px-6 py-10 rounded-lg shadow-sm border text-center">
      <p className="text-gray-500 text-sm mb-2 font-normal">{title}</p>
      <h1>{count}</h1>
    </div>
  );
};

export default ViewCard;
