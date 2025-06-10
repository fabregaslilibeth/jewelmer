import { useState, useRef } from 'react';
import Button from '../Buttons/Button';
import { storage } from '../../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

interface UserInfo {
  name: string;
  bio: string;
  location: string;
  birthday: string;
  imageUrl: string;
}

interface ProfileProps {
  handleSave: (userInfo: UserInfo) => void;
}

export default function Profile({ handleSave }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    bio: '',
    location: '',
    birthday: '',
    imageUrl: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const storageRef = ref(storage, `profile-images/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setUserInfo(prev => ({ ...prev, imageUrl: downloadURL }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4" onClick={handleEdit}>
        <Button>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <div className="flex flex-col items-center space-y-4">
        {isEditing && (
          <div className="flex flex-col items-center space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
            //   className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900">Name</h2>
        {isEditing ? (
          <input
            type="text"
            className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        ) : (
          <p className="mt-2 text-gray-600">{userInfo.name}</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900">Birthday</h2>
        {isEditing ? (
          <input
            type="date"
            className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={userInfo.birthday}
            onChange={(e) => setUserInfo({ ...userInfo, birthday: e.target.value })}
          />
        ) : (
          <p className="mt-2 text-gray-600">{userInfo.birthday}</p>
        )}
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
      {isEditing && (
        <div className="mt-6">
            <button
                onClick={() => handleSave(userInfo)}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
            Save Changes
            </button>
        </div>
        )}
    </div>
  );
}