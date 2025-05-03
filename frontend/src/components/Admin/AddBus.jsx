import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleError, handleSuccess } from '../../utils/toast';
import { addBus } from '../../redux/actions/busAction';

export default function AddBus() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.bus);

  const [busData, setBusData] = useState({
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
  });

  const [busImage, setBusImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (['ac', 'nonAc', 'deluxe', 'nonDeluxe'].includes(name)) {
      // Handle pricePerKm fields
      setBusData((prev) => ({
        ...prev,
        pricePerKm: {
          ...prev.pricePerKm,
          [name]: value === '' ? 0 : Number(value), // Convert to number or set to 0
        },
      }));
    } else if (['distance', 'seats'].includes(name)) {
      // Convert numeric fields to numbers or set to 0
      setBusData((prev) => ({
        ...prev,
        [name]: value === '' ? 0 : Number(value), // Convert to number or set to 0
      }));
    } else {
      // Handle other fields
      setBusData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!busImage) {
      return handleError('Please upload a bus image');
    }
  
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
  
    console.log("Form Data:", Object.fromEntries(formData)); // Debugging: Log the form data
  
    dispatch(addBus(formData, handleSuccess, handleError));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Bus</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Bus Name" className="input" onChange={handleChange} />
        <input name="from" placeholder="From" className="input" onChange={handleChange} />
        <input name="to" placeholder="To" className="input" onChange={handleChange} />
        <input name="pickupTime" placeholder="Pickup Time" className="input" onChange={handleChange} />
        <input name="dropTime" placeholder="Drop Time" className="input" onChange={handleChange} />
        <input name="distance" type='number' placeholder="Distance (in km)" className="input" onChange={handleChange} />
        <input name="ac" placeholder="Price AC" className="input" onChange={handleChange} />
        <input name="nonAc" placeholder="Price Non-AC" className="input" onChange={handleChange} />
        <input name="deluxe" placeholder="Price Deluxe" className="input" onChange={handleChange} />
        <input name="nonDeluxe" placeholder="Price Non-Deluxe" className="input" onChange={handleChange} />
        <select name="busType" className="input" onChange={handleChange}>
          <option>AC</option>
          <option>Non-AC</option>
          <option>Deluxe</option>
          <option>Non-Deluxe</option>
        </select>
        <input name="seats" type='number' placeholder="Number of Seats" className="input" onChange={handleChange} />
        <input type="file" accept="image/*" onChange={(e) => setBusImage(e.target.files[0])} />
        <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? 'Uploading...' : 'Add Bus'}
        </button>
      </form>
    </div>
  );
}