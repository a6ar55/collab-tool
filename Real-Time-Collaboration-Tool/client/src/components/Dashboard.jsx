import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';

function Dashboard() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setImageError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prevFormData) => ({ ...prevFormData, profilePicture: downloadURL }))
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch(`/api/auth/signout`);
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type="file"
          hidden
          ref={fileRef}
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-small self-center'>
          {imageError ? (
            <span className='text-red-700'>Error uploading image (file must be of size less than 2MB)</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-green-500'>{`Uploading image: ${imagePercent}% done`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-500'>
              Image uploaded successfully
            </span>
          ) : ('')}
        </p>
        <input type="text" className='w-full px-2 py-2 border border-gray-500' defaultValue={currentUser.username} placeholder='Username' onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, username: e.target.value }))} />
        <input type="email" className='w-full px-2 py-2 border border-gray-500' defaultValue={currentUser.email} placeholder='Email' onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, email: e.target.value }))} />
        <input type="password" className='w-full px-2 py-2 border border-gray-500' placeholder='Password' onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, password: e.target.value }))} />
        <input type="password" className='w-full px-2 py-2 border border-gray-500' placeholder='Confirm Password' />
        <input type="submit" className='bg-blue-500 px-2 py-2' value="Update Account" />
        <div className='flex justify-between mt-5'>
          <span
            className='text-blue-500 cursor-pointer'
            onClick={handleDeleteAccount}
          >
            Delete Account
          </span>
          <span className='text-blue-500 cursor-pointer' onClick={handleSignOut}>
            Sign out
          </span>
        </div>
      </form>
    </div>
  );
}

export default Dashboard;
