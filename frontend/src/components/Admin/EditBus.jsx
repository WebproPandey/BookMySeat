import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateBus, fetchBuses } from "../../redux/actions/busAction";
import { toast } from "react-toastify";

export default function EditBus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { buses, loading } = useSelector((state) => state.bus);

  const [busData, setBusData] = useState(null);
  const [newImage, setNewImage] = useState(null); // State for new image

  useEffect(() => {
    if (buses.length === 0) {
      dispatch(fetchBuses());
    } else {
      const bus = buses.find((b) => b._id === id);
      if (bus) setBusData(bus);
    }
  }, [buses, id, dispatch]);

  useEffect(() => {
    if (buses.length > 0 && !busData) {
      const bus = buses.find((b) => b._id === id);
      if (bus) setBusData(bus);
    }
  }, [buses, id, busData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["ac", "nonAc", "deluxe", "nonDeluxe"].includes(name)) {
      setBusData((prev) => ({
        ...prev,
        pricePerKm: {
          ...prev.pricePerKm,
          [name]: value === "" ? 0 : Number(value),
        },
      }));
    } else if (["seats", "distance"].includes(name)) {
      setBusData((prev) => ({
        ...prev,
        [name]: value === "" ? 0 : Number(value),
      }));
    } else if (["from", "to"].includes(name)) {
      setBusData((prev) => ({
        ...prev,
        route: {
          ...prev.route,
          [name]: value,
        },
      }));
    } else {
      setBusData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]); // Set the new image file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", busData.name);
    formData.append("from", busData.route.from);
    formData.append("to", busData.route.to);
    formData.append("pickupTime", busData.pickupTime);
    formData.append("dropTime", busData.dropTime);
    formData.append("distance", Number(busData.distance)); // Ensure distance is a number
    formData.append("seats", Number(busData.seats)); // Ensure seats is a number
    formData.append("busType", busData.busType);
    formData.append("pricePerKm", JSON.stringify(busData.pricePerKm)); // Properly stringify pricePerKm
  
    // If a new image is uploaded, append it to the FormData
    if (newImage) {
      formData.append("busImage", newImage);
    } else {
      // If no new image is uploaded, send the existing image URL
      formData.append("busImage", busData.busImage);
    }
  
    // Debugging: Log the FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    dispatch(
      updateBus(
        id,
        formData,
        () => {
          toast.success("Bus updated successfully");
          navigate("/admin/buses");
        },
        (error) => toast.error(error)
      )
    );
  }

  if (loading) return <p>Loading...</p>;
  if (!busData) return <p>Bus not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Bus</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={busData.name}
          placeholder="Bus Name"
          className="input"
          onChange={handleChange}
        />
        <input
          name="from"
          value={busData.route.from}
          placeholder="From"
          className="input"
          onChange={handleChange}
        />
        <input
          name="to"
          value={busData.route.to}
          placeholder="To"
          className="input"
          onChange={handleChange}
        />
        <input
          name="pickupTime"
          value={busData.pickupTime}
          placeholder="Pickup Time"
          className="input"
          onChange={handleChange}
        />
        <input
          name="dropTime"
          value={busData.dropTime}
          placeholder="Drop Time"
          className="input"
          onChange={handleChange}
        />
        <input
          name="distance"
          value={busData.distance}
          type="number"
          placeholder="Distance (in km)"
          className="input"
          onChange={handleChange}
        />
        <input
          name="seats"
          value={busData.seats}
          type="number"
          placeholder="Number of Seats"
          className="input"
          onChange={handleChange}
        />
        <div>
          <p className="font-semibold">Price Per Km (₹):</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              name="ac"
              value={busData.pricePerKm.ac}
              type="number"
              placeholder="AC"
              className="input"
              onChange={handleChange}
            />
            <input
              name="nonAc"
              value={busData.pricePerKm.nonAc}
              type="number"
              placeholder="Non-AC"
              className="input"
              onChange={handleChange}
            />
            <input
              name="deluxe"
              value={busData.pricePerKm.deluxe}
              type="number"
              placeholder="Deluxe"
              className="input"
              onChange={handleChange}
            />
            <input
              name="nonDeluxe"
              value={busData.pricePerKm.nonDeluxe}
              type="number"
              placeholder="Non-Deluxe"
              className="input"
              onChange={handleChange}
            />
          </div>
        </div>
        <select
          name="busType"
          value={busData.busType}
          className="input"
          onChange={handleChange}
        >
          <option value="AC">AC</option>
          <option value="Non-AC">Non-AC</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Non-Deluxe">Non-Deluxe</option>
        </select>
        <div className="bg-gray-200">
          <p className="font-semibold">Current Image:</p>
          <img
            src={busData.busImage}
            alt="Bus"
            className="w-full h-40 object-cover rounded-md mb-4"
          />
        </div>
        <div>
          <p className="font-semibold">Upload New Image:</p>
          <input
            type="file"
            accept="image/*"
            className="input"
            onChange={handleImageChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Bus
        </button>
      </form>
    </div>
  );
}