'use client'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios';


const ContextPro = createContext()
const Context = ({ children }) => {
  const initialState = {
    LoggedIn: null,
  }
  const router = useRouter()

  const Reducer = (state, action) => {
    switch (action.type) {
      case "SAVE_LOGIN_DATA":
        return {
          ...state,
          LoggedIn: action.payload
        }
      case "SAVE_DATA":
        return {
          ...state,
          LoggedIn: {
            ...state.LoggedIn,
            Category: action.payload
          }
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(Reducer, initialState)

  const saveLoginData = async (e) => {
    dispatch({ type: "SAVE_LOGIN_DATA", payload: e })
  }

  const SaveData = async () => {
    try {
      const response = await axios.post('/api/saved', state.LoggedIn);
      const Data = response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const DataSave = (e) => {
    dispatch({ type: "SAVE_DATA", payload: e })
  }

  useEffect(() => {
    if (state.LoggedIn !== null) {
      router.push('/pages/welcome');
    }
  }, [state.LoggedIn]);

  return (
    <>
      <ContextPro.Provider value={{ ...state, saveLoginData, DataSave, SaveData }}>
        {children}
      </ContextPro.Provider>
    </>
  )
}

export const GlobalState = () => {
  return useContext(ContextPro)
}
export default Context
