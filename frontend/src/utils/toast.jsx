import { toast } from "react-toastify";
import React from "react";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-center",
  });
};

export const handleConfirm = (msg, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p>{msg}</p>
        <div className="flex justify-end space-x-2 mt-2">
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
    }
  );
};