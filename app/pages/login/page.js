'use client'
import { GlobalState } from '@/app/Utills/context';
import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {
  const [User, setUser] = useState({
    email: '',
    password: ''
  });

  const { saveLoginData } = GlobalState()

  const fetchLogin = async (e) => {
    try {
      const response = await axios.post('/api/login', e);
      const { message, serverData } = response.data;
      if (response.status === 200) {
        saveLoginData(serverData)
        return message
      } else if (response.status === 400 || 401) {
        return message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin(User)
  }
  return (
    <>
      <div className='border border-[#C1C1C1] w-[576px] h-[585px] m-auto mt-8 rounded-2xl'>
        <div className="max-w-lg w-full p-6 m-auto">
          <h2 className="text-3xl font-semibold p-4 text-center my-8">Login</h2>
          <div className=' text-center mb-4'>
            <p className='text-2xl font-medium '>Welcome back to ECOMMERCE</p>
            <p className='text-base font-normal'>The next gen business marketplace</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-8 w-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
                placeholder="Enter your email"
                value={User.email}
                onChange={handleChange} required
              />
            </div>
            <div className="mb-8 w-full">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
                placeholder="Enter your password"
                value={User.password}
                onChange={handleChange} required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 font-medium text-base h-14"
            >
              LOGIN
            </button>
          </form>
          <hr className='h-[1px] border border-[#C1C1C1] my-8' />
          <p className="mt-4 text-center text-gray-600">
            Have an Account? <Link href={'/pages/signup'} className="text-black hover:font-bold">SIGN UP </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Page