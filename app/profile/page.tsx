'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Frontend developer passionate about creating beautiful user experiences.',
    location: 'San Francisco, CA',
    addresses: [
      {
        id: '1',
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        country: 'United States',
        isDefault: true
      },
      {
        id: '2',
        street: '456 Market St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94103',
        country: 'United States',
        isDefault: false
      }
    ],
    payment: {
      cardNumber: '**** **** **** 4242',
      cardHolder: 'John Doe',
      expiryDate: '12/25',
      cardType: 'Visa'
    }
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditingAddressId(null);
    // Here save the changes to backend
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: Date.now().toString(),
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      isDefault: userInfo.addresses.length === 0
    };
    setUserInfo({
      ...userInfo,
      addresses: [...userInfo.addresses, newAddress]
    });
    setEditingAddressId(newAddress.id);
  };

  const handleEditAddress = (addressId: string) => {
    setEditingAddressId(addressId);
  };

  const handleDeleteAddress = (addressId: string) => {
    setUserInfo({
      ...userInfo,
      addresses: userInfo.addresses.filter(addr => addr.id !== addressId)
    });
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setUserInfo({
      ...userInfo,
      addresses: userInfo.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative h-32 w-32 rounded-full border-4 border-white overflow-hidden">
                <Image
                  src="/placeholder-avatar.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
                <p className="text-gray-600">{userInfo.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`${
                    activeTab === 'profile'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('address')}
                  className={`${
                    activeTab === 'address'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Address
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`${
                    activeTab === 'payments'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Payments
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'profile' && (
                <>
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">About</h2>
                    {isEditing ? (
                      <textarea
                        className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={4}
                        value={userInfo.bio}
                        onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                      />
                    ) : (
                      <p className="mt-2 text-gray-600">{userInfo.bio}</p>
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Location</h2>
                    {isEditing ? (
                      <input
                        type="text"
                        className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={userInfo.location}
                        onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                      />
                    ) : (
                      <p className="mt-2 text-gray-600">{userInfo.location}</p>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'address' && (
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
                                onChange={(e) => setUserInfo({
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
                                  onChange={(e) => setUserInfo({
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
                                  onChange={(e) => setUserInfo({
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
                                  onChange={(e) => setUserInfo({
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
                                  onChange={(e) => setUserInfo({
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
              )}

              {activeTab === 'payments' && (
                <>
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {isEditing ? 'Cancel' : 'Edit Payment'}
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">Card Information</h2>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Card Number</label>
                          {isEditing ? (
                            <input
                              type="text"
                              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={userInfo.payment.cardNumber}
                              onChange={(e) => setUserInfo({
                                ...userInfo,
                                payment: { ...userInfo.payment, cardNumber: e.target.value }
                              })}
                            />
                          ) : (
                            <p className="mt-1 text-gray-600">{userInfo.payment.cardNumber}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Card Holder</label>
                          {isEditing ? (
                            <input
                              type="text"
                              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={userInfo.payment.cardHolder}
                              onChange={(e) => setUserInfo({
                                ...userInfo,
                                payment: { ...userInfo.payment, cardHolder: e.target.value }
                              })}
                            />
                          ) : (
                            <p className="mt-1 text-gray-600">{userInfo.payment.cardHolder}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            {isEditing ? (
                              <input
                                type="text"
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={userInfo.payment.expiryDate}
                                onChange={(e) => setUserInfo({
                                  ...userInfo,
                                  payment: { ...userInfo.payment, expiryDate: e.target.value }
                                })}
                              />
                            ) : (
                              <p className="mt-1 text-gray-600">{userInfo.payment.expiryDate}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Card Type</label>
                            {isEditing ? (
                              <input
                                type="text"
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={userInfo.payment.cardType}
                                onChange={(e) => setUserInfo({
                                  ...userInfo,
                                  payment: { ...userInfo.payment, cardType: e.target.value }
                                })}
                              />
                            ) : (
                              <p className="mt-1 text-gray-600">{userInfo.payment.cardType}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {isEditing && (
              <div className="mt-6">
                <button
                  onClick={handleSave}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 