import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPromos,
  addPromo,
  updatePromo,
  deletePromo,
} from "../../redux/actions/promoActions";
import { toast } from "react-toastify";

export default function ManagePromos() {
  const dispatch = useDispatch();
  const { promos, loading } = useSelector((state) => state.promo);
  console.log("promos:", promos);

  const [formData, setFormData] = useState({
    code: "",
    discountPercent: "",
    expiryDate: "",
    usageLimit: "",
  });

  const [editingPromo, setEditingPromo] = useState(null);

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
    if (window.confirm("Are you sure you want to delete this promo code?")) {
      dispatch(
        deletePromo(
          promoId,
          () => toast.success("Promo deleted successfully"),
          (error) => toast.error(error)
        )
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Promo Codes</h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          name="code"
          value={formData.code}
          placeholder="Promo Code"
          className="input"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discountPercent"
          value={formData.discountPercent}
          placeholder="Discount Percent"
          className="input"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          placeholder="Expiry Date"
          className="input"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="usageLimit"
          value={formData.usageLimit}
          placeholder="Usage Limit"
          className="input"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingPromo ? "Update Promo" : "Add Promo"}
        </button>
      </form>

      {loading ? (
        <p>Loading promos...</p>
      ) : promos && promos.length > 0 ? (
        <div className="space-y-4">
          {promos?.map((promo, index) => (
            <div
              key={promo._id || index}
              className="p-4 bg-gray-100 rounded shadow"
            >
              <h2 className="text-lg font-bold">{promo.code}</h2>
              <p>Discount:{promo.discountPercent}%</p>
              <p>
                Expiry Date: {new Date(promo.expiryDate).toLocaleDateString()}
              </p>
              <p>Usage Limit: {promo.usageLimit}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(promo)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(promo._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No promo codes available. Add a new promo code to get started.</p> // Fallback message
      )}
    </div>
  );
}
