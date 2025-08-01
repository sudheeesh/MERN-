import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAddress } from '../features/checkoutSlice';

const SavedAddresses = () => {
  const addresses = useSelector((state) => state.checkout.addresses);
  const selected = useSelector((state) => state.checkout.selectedAddress);
  const dispatch = useDispatch();

  if (!addresses.length) return <p>No addresses saved yet.</p>;

  return (
    <div className="space-y-4">
      {addresses.map((addr, i) => (
        <div
          key={i}
          className={`p-4 border rounded ${selected === addr ? 'border-blue-500' : 'border-gray-300'}`}
        >
          <div className="font-bold">{addr.name} - {addr.phone}</div>
          <div>{addr.fullAddress} - <b>{addr.pincode}</b></div>
          <button
            onClick={() => dispatch(selectAddress(addr))}
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
          >
            Deliver Here
          </button>
        </div>
      ))}
    </div>
  );
};

export default SavedAddresses;
