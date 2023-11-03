import { AiOutlinePlusCircle, AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";

const Category = () => {
  return (
    <div className="max-w-[500px] mx-auto p-3">
      <h2 className="text-center mb-3 mt-2">Category</h2>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form className="flex gap-3 items-center justify-center">
            <input
              type="text"
              className="px-4 py-2 rounded-full text-sm border focus:outline-none"
              placeholder="Category Name"
            />
            <button className="btn btn-sm">
              <AiOutlineCheck /> Add
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>

      <div className="flex justify-between items-center py-4 mt-4 border-t">
        <input
          type="text"
          className="border py-2 rounded-full px-4 text-sm outline-gray-300"
          placeholder="Search"
        />
        <label htmlFor="my_modal_7" className="btn btn-sm">
          <AiOutlinePlusCircle /> Add New
        </label>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="table table-zebra table-pin-rows table-pin-cols">
          <thead>
            <tr className="text-black">
              <th>ID</th>
              <td>Name</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Phone</td>
              <td>
                <span className="badge badge-success text-white">Show</span>
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

            <tr>
              <th>2</th>
              <td>Laptop</td>
              <td>
                <span className="badge badge-warning">Hide</span>
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

export default Category;
