import { func, object, string } from "prop-types";
import { IoWarningOutline } from "react-icons/io5";

const UseDeleteConfirmation = ({
  handleDelete,
  setIsDeleteOpen,
  deleteTitle,
  deleteSubTitle,
  deleteImg,
  deleteDesc,
}) => {
  return (
    <div>
      <p className="text-[#6B7280] text-center text-base">
        Are you sure you want to delete this item from your platform?
      </p>
      <div className="bg-[#FEEDDD] p-5 rounded my-5">
        <div>
          {deleteImg && (
            <div className="w-10 h-10 rounded-full mx-auto">
              <img
                className="w-full h-full rounded-full"
                src={deleteImg}
                alt={deleteTitle}
              />
            </div>
          )}
          {deleteTitle && (
            <span className="text-[#B43200] text-center block font-bold text-lg">
              {deleteTitle}
            </span>
          )}
          {deleteSubTitle && (
            <span className="text-center text-[#6B7280] font-medium  block">
              {deleteSubTitle}
            </span>
          )}
        </div>
        <div>
          <p className="text-[#B43200] text-lg font-bold flex items-center gap-x-1">
            <IoWarningOutline size={20} /> Warning
          </p>
          <p className="text-[#6B7280] font-medium">
            {deleteDesc || "Your data will delete permanently!"}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-x-5">
        <button
          onClick={() => {
            setIsDeleteOpen(false);
          }}
          className="bg-transparent border border-[#6B7280B2] px-5 py-1.5 rounded-md"
        >
          Cancel
        </button>
        <button
          className="bg-[#DC2626] border px-5 py-1.5 text-white rounded-md"
          onClick={() => {
            handleDelete();
            setIsDeleteOpen(false);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

UseDeleteConfirmation.propTypes = {
  handleDelete: func,
  setIsDeleteOpen: func,
  deleteData: object,
  deleteTitle: string,
  deleteSubTitle: string,
  deleteImg: string,
  deleteDesc: string,
};

export default UseDeleteConfirmation;
