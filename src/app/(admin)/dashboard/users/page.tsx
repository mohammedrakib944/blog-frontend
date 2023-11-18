"use client";
import React, { use, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { AiOutlineSearch, AiOutlineCheck } from "react-icons/ai";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/redux/features/user/userApi";
import Loader from "@/components/common/Loader";
import Alerts from "@/components/common/Alerts";

const Users = () => {
  // Get user user and check it's admin or not
  const { User } = useSelector((state: any) => state.user);
  const { data: users, isLoading, isError } = useGetAllUsersQuery(null);
  const [deleteUser, { isError: deleteError }] = useDeleteUserMutation();
  const [
    updateUser,
    { isError: updateError, isSuccess: updateDone, isLoading: updating, error },
  ] = useUpdateUserMutation();
  const [AllUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [userType, setUserType] = useState("user");
  const [isBanned, setIsBanned] = useState(false);

  // Update user
  const handleUserUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!User) return toast.error("Login first!");
    if (User.role !== "admin") return toast.error("User should admin!");
    const sendData = {
      is_banned: isBanned,
      role: userType,
    };
    // update data
    updateUser({ id: selectedUser.user_id, data: sendData });
  };

  // Delete user
  const handleUserDelete = (id: number) => {
    if (!User) return toast.error("Login first!");
    if (User.role !== "admin") return toast.error("User should admin!");
    if (!confirm(`ID - ${id} will delete permanently!`)) return;
    deleteUser(id);
  };

  useEffect(() => {
    if (!updating && updateError) {
      toast.error("Something went wrong!");
    }

    if (!updating && updateDone) {
      toast.success("User updated success!");
    }
  }, [updateError, updateDone]);

  useEffect(() => {
    if (deleteError) {
      toast.error("Something went wrong!");
    }
  }, [deleteError]);

  useEffect(() => {
    if (selectedUser) {
      setUserType(selectedUser.role);
      setIsBanned(selectedUser.is_banned);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (users) {
      setAllUsers(users);
    }
  }, [users]);

  if (!isLoading && isError)
    return <Alerts status="error" message="Could not get data!" />;

  return (
    <div className="homeLayout p-3">
      <Toaster />
      <div className="py-4">
        <form className="flex gap-4 items-center justify-center">
          <input
            type="text"
            className="border border-neutral bg-base-100 hover:border-primary py-2 rounded-full px-4 text-sm outline-gray-300"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
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
          <h4 className="p-2 pt-0">Update User - {selectedUser?.name}</h4>
          <form
            onSubmit={handleUserUpdate}
            className="flex gap-3 items-center justify-center"
          >
            <label className="label-text">Role</label>
            <select
              name="status"
              className="w-full px-4 py-2 bg-base-100 rounded-full text-sm border focus:outline-none"
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="form-control w-52">
              <label className="cursor-pointer label">
                <span className="label-text">Banned</span>
                <input
                  type="checkbox"
                  checked={isBanned}
                  className="ml-2 toggle toggle-primary"
                  onChange={(e) => {
                    setIsBanned(e.target.checked);
                  }}
                />
              </label>
            </div>
            <button disabled={updating} type="submit" className="btn btn-sm">
              <AiOutlineCheck /> Update
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="update_banned_user">
          Close
        </label>
      </div>

      {/* Table */}
      <div className="border border-accent rounded-lg overflow-x-auto">
        <table className="table table-zebra table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>ID</th>
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {AllUsers ? (
              AllUsers.filter((user: any) =>
                user.name.toLowerCase().includes(searchText.toLowerCase())
              ).map((user: any) => (
                <tr key={user.user_id}>
                  <th>{user.user_id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.is_banned ? (
                      <span className="badge badge-warning">Banned</span>
                    ) : (
                      <span className="badge badge-success text-white">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="flex gap-5">
                    <label
                      htmlFor="update_banned_user"
                      className="tooltip tooltip-secondary hover:text-primary cursor-pointer"
                      data-tip="Edit"
                      onClick={() => setSelectedUser(user)}
                    >
                      <FaEdit />
                    </label>
                    <button
                      onClick={() => handleUserDelete(user.user_id)}
                      className="tooltip tooltip-warning hover:text-red-600"
                      data-tip="Delete"
                    >
                      <RxCross2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
