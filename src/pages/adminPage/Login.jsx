import React, { useState } from 'react'
import admin_bg from "../../assets/admin-bg.jpg"
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import axios from 'axios'
import Loader from '../../components/admin/Loader'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
  const [visible, setvisible] = useState(false)
  let [credentials, setCredentials] = useState({})
  let [isSubmiting, setIsSubmiting] = useState(false)
  let [error, setError] = useState("")
  const navigate = useNavigate()

  function onChangeHandler(e) {
    setError("")
    let { name, value } = e.target

    setCredentials((prev) => (
      { ...prev, [name]: value }
    ))

  }

  async function submitHandler() {
    try {
      setIsSubmiting(true)
      let response = await axios.post(`${import.meta.env.VITE_SERVER_URI}/admin/login`, credentials,
        { withCredentials: true })
      setIsSubmiting(false)
        if(response?.data?.success)  navigate("/admin/dashboard", {replace:true})
    } catch (error) {
      
      setIsSubmiting(false)
      setError(error?.response?.data?.message)
    } 

  }

  return (
    <div style={{ backgroundImage: `url(${admin_bg})` }} className='w-full flex justify-center items-center h-screen object-cover bg-cover'>
      <div className="min-w-24 relative  px-12 py-10 bg-white mx-auto rounded-2xl">
        <h1 className='text-lg font-semibold'>Admin Log In</h1>
        <p className='text-neutral-500 text-sm py-1'>Enter your Credentials</p>
        <p className='h-6 text-red-500 font-semibold'>{error && error}</p>
        <div className="inputs my-1 w-full  flex flex-col gap-4 justify-center">
          <div className="user w-full border-b">
            <input className='w-full focus:border-none focus:outline-none px- py-1'
              type="text" id='username'
              placeholder='Username'
              name='username'
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div className="pass w-full flex items-center border-b">
            <input
              name='password'
              onChange={(e) => onChangeHandler(e)}
              className='w-full focus:border-none focus:outline-none px- py-1'
              type={visible ? "text" : "password"}
              id='password'
              placeholder='Password'
            />
            <div
              onClick={() => setvisible(prev => !prev)}
              className="eye cursor-pointer select-none">{visible ? <RiEyeLine /> : <RiEyeOffLine />}</div>

          </div>
        </div>
        <div className="Login">
          <button onClick={submitHandler} className='w-full bg-[#07090A] cursor-pointer text-white py-1 select-none mt-6 rounded'>Login</button>
        </div>
        <div className="loading mx-auto absolute flex items-center justify-center translate-x-1/2 top-1/2 w-fit">
          <Loader visible={isSubmiting} />
        </div>
      </div>
    </div>
  )
}

export default Login