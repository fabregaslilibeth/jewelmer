import { useState } from 'react';

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface UserInfo {
  addresses: Address[];
}

interface AddressProps {
  userInfo: UserInfo;
  onUpdateUserInfo: (userInfo: UserInfo) => void;
}

export default function Address({ userInfo, onUpdateUserInfo }: AddressProps) {
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const handleAddAddress = () => {
    const newAddress: Address = {
      id: Date.now().toString(),
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      isDefault: userInfo.addresses.length === 0
    };
    onUpdateUserInfo({
      ...userInfo,
      addresses: [...userInfo.addresses, newAddress]
    });
    setEditingAddressId(newAddress.id);
  };

  const handleEditAddress = (id: string) => {
    setEditingAddressId(id);
  };

  const handleSetDefaultAddress = (id: string) => {
    onUpdateUserInfo({
      ...userInfo,
      addresses: userInfo.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    });
  };

  const handleDeleteAddress = (id: string) => {
    onUpdateUserInfo({
      ...userInfo,
      addresses: userInfo.addresses.filter(addr => addr.id !== id)
    });
  };

  return (
    <>
    <div className="flex justify-end mb-4">
      <button
        onClick={handleAddAddress}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Address
      </button>
    </div>
    <div className="space-y-6">
      {userInfo.addresses.map((address) => (
        <div key={address.id} className="border rounded-lg p-4 relative">
          {editingAddressId === address.id ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={address.street}
                  onChange={(e) => onUpdateUserInfo({
                    ...userInfo,
                    addresses: userInfo.addresses.map(addr =>
                      addr.id === address.id ? { ...addr, street: e.target.value } : addr
                    )
                  })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={address.city}
                    onChange={(e) => onUpdateUserInfo({
                      ...userInfo,
                      addresses: userInfo.addresses.map(addr =>
                        addr.id === address.id ? { ...addr, city: e.target.value } : addr
                      )
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={address.state}
                    onChange={(e) => onUpdateUserInfo({
                      ...userInfo,
                      addresses: userInfo.addresses.map(addr =>
                        addr.id === address.id ? { ...addr, state: e.target.value } : addr
                      )
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={address.zipCode}
                    onChange={(e) => onUpdateUserInfo({
                      ...userInfo,
                      addresses: userInfo.addresses.map(addr =>
                        addr.id === address.id ? { ...addr, zipCode: e.target.value } : addr
                      )
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={address.country}
                    onChange={(e) => onUpdateUserInfo({
                      ...userInfo,
                      addresses: userInfo.addresses.map(addr =>
                        addr.id === address.id ? { ...addr, country: e.target.value } : addr
                      )
                    })}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditingAddressId(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditingAddressId(null)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-900 font-medium">{address.street}</p>
                  <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                  <p className="text-gray-600">{address.country}</p>
                  {address.isDefault && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditAddress(address.id)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  {!address.isDefault && (
                    <>
                      <button
                        onClick={() => handleSetDefaultAddress(address.id)}
                        className="p-2 text-gray-400 hover:text-gray-500"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
    </>
  );
}