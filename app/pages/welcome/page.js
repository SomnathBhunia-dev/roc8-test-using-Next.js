/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { GlobalState } from '@/app/Utills/context';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const Page = () => {
  const [AllData, setAllData] = useState([]);
  const [currentPage, setcurrentPage] = useState(0)

  const { LoggedIn, DataSave, SaveData } = GlobalState()

  const [newData, setnewData] = useState(LoggedIn?.Interest || [])

  const router = useRouter()

  const fetchData = async (e) => {
    try {
      const response = await axios.get('/api/allcategory');
      const Data = response.data;
      setAllData(Data)
    } catch (error) {
      console.error('Error:', error);
    }
  }


  
  useEffect(() => {
    fetchData()
  }, [])
  
  useEffect(() => {
    if (!LoggedIn) {
      router.push('/pages/login')
    }
  }, [])
  
  const handleChange = (value) => {

    if (!newData.includes(value)) {
      setnewData(prev => [...prev, value])
    } else {
      setnewData(prev => prev.filter(i => i !== value))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
     DataSave(newData)
  }
   useEffect(() => {
    if (LoggedIn !== null) {
        SaveData();
    }
}, [LoggedIn]);

  return (
    <>
      <div className='border border-[#C1C1C1] w-[576px] h-[585px] m-auto mt-8 rounded-2xl'>
        <div className="max-w-lg w-full p-6 m-auto">
          <div className=' text-center mb-4'>
            <h2 className="text-3xl font-semibold p-4 text-center">Please mark your interests!</h2>
            <p className='text-base font-normal'>We will keep you notified.</p>
          </div>
          <div>
            <p className='text-xl font-medium'>My saved interests!</p>
            {AllData.length !== 0 &&
              AllData.slice(0 + (currentPage * 6), 6 + (currentPage * 6)).map((i) => (
                <div className='flex mt-4' key={i.name}>
                  <input type="checkbox" id={i.id} value={i.name} onChange={() => handleChange(i.name)} className='opacity-0 absolute cursor-pointer w-6 h-6 ml-1' />
                  <label htmlFor={i.id} className={`inline-block ${newData?.includes(i.name) ? 'bg-black' : 'bg-gray-300'} w-6 h-6 rounded-md cursor-pointer mr-4`}>
                    {newData?.includes(i.name) &&
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative cursor-pointer left-1 top-1.5'>
                        <path d="M1 7L4.5 11L15 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>}</label>
                  <span className='text-base font-normal text-black'>{i.name}</span>
                </div>
              ))}
          </div>
          <div className='flex mt-8 w-full justify-between'>
            <button onClick={handleSubmit} className='w-32 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-gray-800 font-medium text-base disabled:bg-slate-600'>Save</button>
            <div className='space-x-4'>
              <button onClick={() => setcurrentPage(prev => prev - 1)} disabled={currentPage === 0} className='w-fit bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 font-medium text-base disabled:bg-slate-600'>Prev</button>
              <button onClick={() => setcurrentPage(prev => prev + 1)} disabled={currentPage === Math.ceil(AllData.length / 6) - 1} className='w-fit bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 font-medium text-base  disabled:bg-slate-600'>Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page