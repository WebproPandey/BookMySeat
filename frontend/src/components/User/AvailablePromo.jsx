import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromoCode } from "../../redux/actions/user/userActions";
import { toast } from "react-toastify";

const AvailablePromo = () => {
  const dispatch = useDispatch();
  const { promos, loading, error } = useSelector((state) => state.userPromo);

  useEffect(() => {
    dispatch(fetchPromoCode());
  }, [dispatch]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Promo code "${code}" copied!`);
  };

  if (loading) return <p >Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-[20vh]">
      {promos.map((promo) => (
        <div
          key={promo._id}
          className="relative bg-red-500 text-white rounded-xl p-6 shadow-lg flex flex-col justify-between"
        >
          {/* Side notch like coupon */}
          <div className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 w-5 h-10 bg-black rounded-full"></div>
          <div className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 w-5 h-10 bg-black rounded-full"></div>

          <div className="space-y-1">
            <h2 className="text-4xl font-bold">{promo.discountPercent}%</h2>
            <p className="text-sm">HOT BRAND COUPON</p>
            <p className="text-xs opacity-80">Expiry Date: {new Date(promo.expiryDate).toLocaleDateString("en-GB")}</p>
          </div>

          <div className="mt-6 flex items-center justify-between bg-white text-black px-4 py-2 rounded-lg">
            <span className="font-semibold">{promo.code}</span>
            <button
              onClick={() => handleCopy(promo.code)}
              className="text-sm bg-black text-white px-2 py-1 rounded hover:bg-gray-800"
            >
              Copy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailablePromo;
