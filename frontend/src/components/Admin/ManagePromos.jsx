import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPromos,
  addPromo,
  updatePromo,
  deletePromo,
} from "../../redux/actions/promoActions";
import { toast } from "react-toastify";
import { ChevronUp, ChevronDown } from "lucide-react"; // Using lucide icons
import { handleConfirm } from "../../utils/toast";

export default function ManagePromos() {
  const dispatch = useDispatch();
  const { promos, loading } = useSelector((state) => state.promo);

  const [formData, setFormData] = useState({
    code: "",
    discountPercent: "",
    expiryDate: "",
    usageLimit: "",
  });

  const [editingPromo, setEditingPromo] = useState(null);
  const [scrollToTop, setScrollToTop] = useState(true);

  useEffect(() => {
    dispatch(fetchPromos());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPromo) {
      dispatch(
        updatePromo(
          editingPromo._id,
          formData,
          () => {
            toast.success("Promo updated successfully");
            setEditingPromo(null);
            setFormData({
              code: "",
              discountPercent: "",
              expiryDate: "",
              usageLimit: "",
            });
          },
          (error) => toast.error(error)
        )
      );
    } else {
      dispatch(
        addPromo(
          formData,
          () => {
            toast.success("Promo added successfully");
            setFormData({
              code: "",
              discountPercent: "",
              expiryDate: "",
              usageLimit: "",
            });
          },
          (error) => toast.error(error)
        )
      );
    }
  };

  const handleEdit = (promo) => {
    setEditingPromo(promo);
    setFormData({
      code: promo.code,
      discountPercent: promo.discountPercent,
      expiryDate: promo.expiryDate,
      usageLimit: promo.usageLimit,
    });
  };


const handleDelete = (promoId) => {
  handleConfirm("Are you sure you want to delete this promo code?", () => {
    dispatch(
      deletePromo(
        promoId,
        () => handleSuccess("Promo deleted successfully"),
        (error) => handleError(error)
      )
    );
  });
};

  const formRef = useRef(null);
  const [formVisible, setFormVisible] = useState(false);

  const toggleForm = () => {
    setFormVisible((prev) => !prev);
  };

  return (
    <div className="ManagePromos px-4 md:px-6 py-3 bg-gray-200 h-full relative overflow-scroll  ">
      <div className="w-full mx-auto bg-white py-3 px-2 md:px-6 rounded-md  md:rounded-xl shadow-lg  sticky top-0 z-[8]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
            {editingPromo ? "Update Promo Code" : "Create New Promo Code"}
          </h2>
          <button
            onClick={toggleForm}
            className="absolute right-4 top-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow z-10"
            title={formVisible ? "Hide Form" : "Show Form"}
          >
            {formVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`transition-all duration-500 overflow-hidden  grid grid-cols-2 md:grid-cols-4 gap-2 ${
            formVisible ? "h-fit py-4" : "h-0 p-0"
          }`}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Promo Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              placeholder="Enter promo code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Percent (%)
            </label>
            <input
              type="number"
              name="discountPercent"
              value={formData.discountPercent}
              placeholder="e.g. 10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usage Limit
            </label>
            <input
              type="number"
              name="usageLimit"
              value={formData.usageLimit}
              placeholder="e.g. 100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 col-span-full"
          >
            {editingPromo ? "Update Promo" : "Add Promo"}
          </button>
        </form>
      </div>

      {loading ? (
        <p>Loading promos...</p>
      ) : promos && promos.length > 0 ? (
        <div className=" sticky top-[10%]">
          <div className=" md:my-5 text-xl text-black font-medium">
            All Promo Codes
          </div>
          <div className="ManagePromos space-y-2 md:space-y-4 grid grid-cols-2 md:grid-cols-4 gap-3 overflow-scroll z-[2]">
            {promos.map((promo) => (
              <div
                key={promo._id}
                className="p-4 bg-gray-100 rounded h-full w-full shadow"
              >
                <h2 className="text-lg font-bold">{promo.code}</h2>
                <p className="text-md font-medium">
                  Discount: {promo.discountPercent}%
                </p>
                <p className="text-md font-medium">
                  Expiry Date: {new Date(promo.expiryDate).toLocaleDateString()}
                </p>
                <p className="text-md font-medium">
                  Usage Limit: {promo.usageLimit}
                </p>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleEdit(promo)}
                    className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(promo._id)}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No promo codes available. Add a new promo code to get started.</p>
      )}
    </div>
  );
}
