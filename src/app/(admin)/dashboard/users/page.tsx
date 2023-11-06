import React from "react";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineCheck } from "react-icons/ai";

const Users = () => {
  return (
    <div className="homeLayout p-3">
      <h2 className="text-center mb-3 mt-2">Users</h2>
      <div className="py-4 mt-4 border-t">
        <form className="flex gap-4 items-center justify-center">
          <input
            type="text"
            className="border py-2 rounded-full px-4 text-sm outline-gray-300"
            placeholder="Search"
          />
          <button className="btn btn-sm">
            <AiOutlineSearch />
            Search
          </button>
        </form>
      </div>

      {/* Modal */}
      <input type="checkbox" id="update_banned_user" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h4 className="p-2 pt-0">Tomal Kazi</h4>
          <form className="flex gap-3 items-center justify-center">
            <select
              name="status"
              className="w-full px-4 py-2 rounded-full text-sm border focus:outline-none"
            >
              <option value="active">Active</option>
              <option value="banned">Banned</option>
            </select>
            <button className="btn btn-sm">
              <AiOutlineCheck /> Update
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="update_banned_user">
          Close
        </label>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="table table-zebra table-pin-rows table-pin-cols">
          <thead>
            <tr className="text-black">
              <th>ID</th>
              <td>Name</td>
              <td>Email</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Rakibuzzaman</td>
              <td>example@gmail.com</td>
              <td>
                <span className="badge badge-success text-white">Active</span>
              </td>
              <td className="flex gap-5">
                <label
                  htmlFor="update_banned_user"
                  className="tooltip hover:text-primary cursor-pointer"
                  data-tip="Edit"
                >
                  <FaEdit />
                </label>
                <button
                  className="tooltip hover:text-red-600"
                  data-tip="Delete"
                >
                  <RxCross2 />
                </button>
              </td>
            </tr>

            <tr>
              <th>2</th>
              <td>TOmal Kazi</td>
              <td>example@gmail.com</td>
              <td>
                <span className="badge badge-warning">Banned</span>
              </td>
              <td className="flex gap-5">
                <button className="tooltip hover:text-primary" data-tip="Edit">
                  <FaEdit />
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
  );
};

export default Users;
