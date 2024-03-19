'use client'
import { GlobalState } from '@/app/Utills/context'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
  const [User, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const responseTrack = GlobalState()

  const router = useRouter()

  const fetchSignUp = async (e) => {
    try {
      const response = await axios.post('/api/signup', e);
      const { message } = response.data;
      if (response.status === 200) {
        router.push('/pages/login')
        return message

      } else if (response.status === 409) {
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
    fetchSignUp(User)
  }
  return (
    <>
      <div className='border border-[#C1C1C1] w-[576px] h-[691px] m-auto mt-8 rounded-2xl'>
        <div className="max-w-lg w-full p-6 m-auto">
          <h2 className="text-3xl font-semibold p-4 text-center my-8">Create your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-8 w-full">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
                placeholder="Enter your name"
                value={User.name}
                onChange={handleChange} required
              />
            </div>
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
            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 font-medium text-base h-14" >
              CREATE ACCOUNT
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Have an Account? <Link href={'/pages/login'} className="text-black ">LOGIN </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Page