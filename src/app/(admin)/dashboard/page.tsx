import ViewCard from "@/components/dashboard/ViewCard";
import React from "react";
import { MdSearch } from "react-icons/md";
import { BsPenFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

const page = () => {
  return (
    <div className="homeLayout p-3">
      <h3 className="mb-2">Dashboard</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <ViewCard title="Total Posts" count={13} />
        <ViewCard title="Total Views" count={1251} />
        <ViewCard title="Total Users" count={5} />
        <ViewCard title="Banned Users" count={1} />
      </div>
      <div className="text-center">
        <h3 className="mt-6">Search Post</h3>
        <div className="mt-4 mb-6 col-span-4 overflow-hidden flex w-full max-w-[600px] border shadow-md rounded-lg mx-auto">
          <input
            className="w-full bg-white py-3 px-4 focus:outline-none text-sm"
            type="text"
            placeholder="Search..."
          />
          <div className="grid place-items-center border-l  px-3">
            <MdSearch />
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-pin-rows table-pin-cols border">
            <thead>
              <tr className="text-black">
                <th>ID</th>
                <td>Title</td>
                <td>Date</td>
                <td>Author</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>
                  <Link href="" target="_blank">
                    Cy Ganderton Quality Control Schaden and Vandervort
                  </Link>
                </td>
                <td>12/16/2020</td>
                <td>Specialist</td>
                <td className="flex gap-5">
                  <button
                    className="tooltip hover:text-primary"
                    data-tip="Edit"
                  >
                    <BsPenFill />
                  </button>
                  <button
                    className="tooltip hover:text-red-600"
                    data-tip="Delete"
                  >
                    <RxCross2 />
                  </button>
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td>Cy Ganderton Quality Control Schaden and Vandervort</td>
                <td>12/16/2020</td>
                <td>Specialist</td>
                <td className="flex gap-5">
                  <button
                    className="tooltip hover:text-primary"
                    data-tip="Edit"
                  >
                    <BsPenFill />
                  </button>
                  <button
                    className="tooltip hover:text-red-600"
                    data-tip="Delete"
                  >
                    <RxCross2 />
                  </button>
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td>Cy Ganderton Quality Control Schaden and Vandervort</td>
                <td>12/16/2020</td>
                <td>Specialist</td>
                <td className="flex gap-5">
                  <button
                    className="tooltip hover:text-primary"
                    data-tip="Edit"
                  >
                    <BsPenFill />
                  </button>
                  <button
                    className="tooltip hover:text-red-600"
                    data-tip="Delete"
                  >
                    <RxCross2 />
                  </button>
                </td>
              </tr>
              <tr>
                <th>1</th>
                <td>Cy Ganderton Quality Control Schaden and Vandervort</td>
                <td>12/16/2020</td>
                <td>Specialist</td>
                <td className="flex gap-5">
                  <button
                    className="tooltip hover:text-primary"
                    data-tip="Edit"
                  >
                    <BsPenFill />
                  </button>
                  <button
                    className="tooltip hover:text-red-600"
                    data-tip="Delete"
                  >
                    <RxCross2 />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
