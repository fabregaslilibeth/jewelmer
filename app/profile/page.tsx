'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { db } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Profile from '../components/Profile';
import Address from '../components/Profile/Address';

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cardType: string;
}

interface UserInfo {
  name: string;
  email: string;
  bio: string;
  location: string;
  addresses: Address[];
  payment: PaymentInfo;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'profile',
    label: 'Account Settings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    id: 'transactions',
    label: 'Transaction History',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    id: 'address',
    label: 'Addresses',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    )
  }
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    bio: '',
    location: '',
    addresses: [],
    payment: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cardType: ''
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserInfo(userDoc.data() as UserInfo);
        } else {
          // Initialize user document with default values
          const defaultUserData: UserInfo = {
            name: user.displayName || '',
            email: user.email || '',
            bio: '',
            location: '',
            addresses: [],
            payment: {
              cardNumber: '',
              cardHolder: '',
              expiryDate: '',
              cardType: ''
            }
          };
          await setDoc(userDocRef, defaultUserData);
          setUserInfo(defaultUserData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, userInfo);
      setIsEditing(false);
      setEditingAddressId(null);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
      toast.error('Failed to save profile');
    }
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

  console.log(userInfo);

  if (loading) {
    return (
      <div className="min-h-screen shadow-lg bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl shadow-lg mx-auto min-h-screen bg-gray-200 relative my-10">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-full absolute left-0 top-0 bottom-0 pt-8">
          <div className="p-6">
            <div className="flex items-center flex-col space-x-3 mb-8">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="my-4">
                <h2 className="text-lg font-semibold text-gray-900">{userInfo.name}</h2>
                <p className="text-sm text-gray-500">{userInfo.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'logout') {
                      handleLogout();
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {
                    item.id !== 'logout' && (
                      <svg
                      className={`w-5 h-5 transform transition-transform ${
                        activeTab === item.id ? 'rotate-90' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    )
                  }
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="">

                {/* Profile Content */}
                <div className="pt-20 pb-8 px-8">
                 
                  {/* Tab Content */}
                  <div className="space-y-6">
                    {activeTab === 'profile' && (
                      <Profile handleSave={handleSave} />
                    )}

                    {activeTab === 'address' && (
                      <Address />
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

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 