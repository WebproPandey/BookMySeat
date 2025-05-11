import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleError, handleSuccess } from '../../utils/toast';
import { addBus } from '../../redux/actions/busAction';
import { useNavigate } from 'react-router-dom';

export default function AddBus() {
  const dispatch = useDispatch();
  const  navigate  = useNavigate()
  const { loading } = useSelector((state) => state.bus);

const initialBusData = {
  name: '',
  from: '',
  to: '',
  pickupTime: '',
  dropTime: '',
  distance: '',
  pricePerKm: {
    ac: '',
    nonAc: '',
    deluxe: '',
    nonDeluxe: '',
  },
  busType: 'AC',
  seats: '',
};
const [busData, setBusData] = useState(initialBusData);

  const [busImage, setBusImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['ac', 'nonAc', 'deluxe', 'nonDeluxe'].includes(name)) {
      setBusData((prev) => ({
        ...prev,
        pricePerKm: {
          ...prev.pricePerKm,
          [name]: value === '' ? 0 : Number(value),
        },
      }));
    } else if (['distance', 'seats'].includes(name)) {
      setBusData((prev) => ({
        ...prev,
        [name]: value === '' ? 0 : Number(value),
      }));
    } else {
      setBusData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!busImage) return handleError('Please upload a bus image');
    if (!busData.name || !busData.from || !busData.to || !busData.pickupTime || !busData.dropTime) {
      return handleError('Please fill all required fields');
    }
    if (busData.distance <= 0 || busData.seats <= 0) {
      return handleError('Distance and Seats must be greater than 0');
    }

    const formData = new FormData();
    formData.append('name', busData.name);
    formData.append('route', JSON.stringify({ from: busData.from, to: busData.to }));
    formData.append('pickupTime', busData.pickupTime);
    formData.append('dropTime', busData.dropTime);
    formData.append('distance', busData.distance);
    formData.append('pricePerKm', JSON.stringify(busData.pricePerKm));
    formData.append('busType', busData.busType);
    formData.append('seats', busData.seats);
    formData.append('busImage', busImage);

    dispatch(addBus(formData, handleSuccess, handleError ,navigate));

  };

  return (
    <div className="flex items-center justify-center h-full  px-6 py-2">
      <div className="w-full max-w-5xl bg-gray-100 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-semibold  text-center text-blue-700">Add New Bus</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 w-full md:grid-cols-2 gap-2 place-items-center">
          <input name="name" placeholder="Bus Name" className=" w-full input border rounded px-4 py-2" onChange={handleChange} />
          <input name="from" placeholder="From" className=" w-full input border rounded px-4 py-2" onChange={handleChange} />
          <input name="to" placeholder="To" className=" w-full input border rounded px-4 py-2" onChange={handleChange} />
          <input name="pickupTime" placeholder="Pickup Time" className=" w-full input border rounded px-4 py-2" onChange={handleChange} />
          <input name="dropTime" placeholder="Drop Time" className=" w-full input border rounded px-4 py-2" onChange={handleChange} />
          <input name="distance" type="number" placeholder="Distance (in km)" className=" w-full input border rounded px-4 py-2" onChange={handleChange} />
          <input name="ac" placeholder="Price AC" className=" w-full input border rounded px-4 py-2" onChange={handleChange} />
          <input name="nonAc" placeholder="Price Non-AC" className=" w-full input border rounded px-4 py-2" onChange={handleChange} />
          <input name="deluxe" placeholder="Price Deluxe" className=" w-full input border rounded px-4 py-2" onChange={handleChange} />
          <input name="nonDeluxe" placeholder="Price Non-Deluxe" className=" w-full input border rounded px-4 py-2" onChange={handleChange} />
          <select name="busType" className=" w-full input border rounded px-4 py-2" onChange={handleChange} defaultValue="AC">
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Non-Deluxe">Non-Deluxe</option>
          </select>
          <input name="seats" type="number" placeholder="Number of Seats" className="w-full input border rounded px-4 py-2" onChange={handleChange} />
          <input type="file" accept="image/*" onChange={(e) => setBusImage(e.target.files[0])} className="col-span-1 md:col-span-2 border rounded px-4 py-2" />
      

          <button
            disabled={loading}
            type="submit"
            className="col-span-1 md:col-span-2 w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
          >
            {loading ? 'Uploading...' : 'Add Bus'}
          </button>

        </form>
      </div>
    </div>
  );
}
