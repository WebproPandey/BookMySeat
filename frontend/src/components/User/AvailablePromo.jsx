import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromoCode } from "../../redux/actions/user/userActions";

const AvailablePromo = () => {
  const dispatch = useDispatch();
  const { promos, loading, error } = useSelector((state) => state.userPromo); // Access `promos` from state

  useEffect(() => {
    dispatch(fetchPromoCode()); // Fetch promos on component mount
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {promos.map((promo) => (
        <div
          key={promo._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
        >
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-bold text-gray-800">{promo.code}</h2>
            <p className="text-gray-600 text-sm">
              Discount: {promo.discountPercent}%
            </p>
            <p className="text-gray-600 text-sm">
              Expiry Date: {new Date(promo.expiryDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 text-sm">
              Usage Limit: {promo.usageLimit}
            </p>
            <p className="text-gray-600 text-sm">
              Used Count: {promo.usedCount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailablePromo;