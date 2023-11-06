"use client";
import React from "react";
import { AiOutlinePlusCircle, AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Loader from "@/components/common/Loader";
import { useState, useEffect } from "react";
import {
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/features/category/categoryApi";
import Alerts from "@/components/common/Alerts";
import toast, { Toaster } from "react-hot-toast";

const Category = () => {
  const { data, error, isLoading } = useGetAllCategoriesQuery(null);
  const [
    editCategory,
    { isLoading: isEditing, isSuccess: editSuccess, error: editError },
  ] = useEditCategoryMutation();
  const [
    addCategory,
    { isLoading: adding, isSuccess: addSuccess, error: addError },
  ] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // set categories
  useEffect(() => {
    setCategories(data);
  }, [data]);

  // Edit category
  const handleEditCategory = (e: any, category_id: number) => {
    e.preventDefault();
    editCategory({ id: category_id, hide: e.target.checked });
  };

  // Add new category
  const handleAddCategory = (e: any) => {
    e.preventDefault();
    addCategory({ name: categoryName });
  };

  // delete category
  const handleDeleteCategory = (id: number) => {
    if (!confirm("Are you sure want to delete?")) return;
    deleteCategory(id);
  };

  useEffect(() => {
    if (!isEditing && editSuccess) {
      toast.success("Status Update!");
    }

    if (!isEditing && editError) {
      // toast.error(editError.data.message);
    }
  }, [editSuccess, editError]);

  useEffect(() => {
    if (!adding && addSuccess) {
      toast.success("Add category success!");
      setCategoryName("");
    }
    if (addError) {
      // toast.error(addError.data.message);
    }
  }, [addSuccess, addError]);

  if (isLoading) return <Loader />;

  if (!isLoading && error)
    return <Alerts status="error" message="Could not get data!" />;

  return (
    <div className="max-w-[500px] mx-auto p-3">
      <Toaster />
      <h2 className="text-center mb-3 mt-2">Categories</h2>
      {/* Add category Modal */}
      <input type="checkbox" id="add_edit_category" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleAddCategory}
            className="flex gap-3 items-center justify-center"
          >
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-2 rounded-full text-sm border focus:outline-none"
              placeholder="ex:Phone"
            />
            <button type="submit" disabled={adding} className="btn btn-sm">
              <AiOutlineCheck /> Add
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="add_edit_category">
          Close
        </label>
      </div>

      <div className="flex justify-between items-center py-4 mt-4 border-t">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border py-2 rounded-full px-4 text-sm outline-gray-300"
          placeholder="Search"
        />
        <label htmlFor="add_edit_category" className="btn btn-sm">
          <AiOutlinePlusCircle /> Add New
        </label>
      </div>
      <h6 className="mb-2 font-bold text-sm">
        <span className="text-gray-500">Total : </span> {data.length}
      </h6>
      <div className="border rounded-lg overflow-hidden">
        <table className="table table-zebra table-pin-rows table-pin-cols">
          <thead>
            <tr className="text-black">
              <th>ID</th>
              <td>Name</td>
              <td>Hide</td>
              <td className="text-center">Delete</td>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories
                .filter((item: any) =>
                  item.category_name
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase())
                )
                .map((category: any) => (
                  <tr key={category.category_id}>
                    <th>{category.category_id}</th>
                    <td className="font-bold">{category.category_name}</td>
                    <td>
                      <input
                        type="checkbox"
                        className="toggle toggle-sm toggle-warning"
                        onChange={(e) =>
                          handleEditCategory(e, category.category_id)
                        }
                        checked={category.is_hide}
                        disabled={isEditing}
                      />
                    </td>
                    <td className="flex justify-center gap-5">
                      <button
                        onClick={() =>
                          handleDeleteCategory(category.category_id)
                        }
                        className="tooltip hover:text-red-600"
                        data-tip="Delete"
                      >
                        <RxCross2 />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
