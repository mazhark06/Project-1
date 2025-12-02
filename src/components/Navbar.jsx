import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
  let optionArr = [
    { name: 'Medical-Equipments', link: '/medical-equipment' },
    { name: 'Medical-Beds', link: '/medical-bed' },
    { name: 'Medical-Furniture', link: '/medical-furniture' },
  ]
function Mobile() {
  const [active, setActive] = useState(false)
  
  return (

    <div>
      <div onClick={() =>setActive(val => !val) } className="symb mt-3"><i className="ri-menu-fill text-4xl"></i></div>

      <div className={`mobile-menu  bg-red-400 w-full  absolute top-45 left-0 duration-1000  text-center  ${active ? 'block' : 'hidden' } `}>
        <ul className='flex flex-col gap-5 py-5 '>
          <li className='hover:text-red-500 cursor-pointer '><NavLink to="/">Home</NavLink></li>
          </ul>
          </div>
    </div>
  )
}



function Desktop() {
  const [active, setActive] = useState(false)
  const timerRef = React.useRef(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const startCloseTimer = () => {
    clearTimer()
    timerRef.current = setTimeout(() => {
      setActive(false)
      timerRef.current = null
    }, 1000)
  }

  React.useEffect(() => {
    return () => clearTimer()
  }, [])

  return (
    <div className='flex w-full mx-auto items-center justify-center'>
      <ul className='flex gap-5 '>
        <li className='hover:text-red-500 cursor-pointer '><NavLink to="/">Home</NavLink></li>
        <li className='hover:text-red-500 cursor-pointer '><NavLink to="/about-us">About Us</NavLink></li>
        <li
          onMouseEnter={() => { setActive(true); clearTimer() }}
          onMouseLeave={startCloseTimer}
          className='relative h-fit hover:text-red-500 cursor-pointer'
        >
          Products +
          <div className='text-black'>
            <ul
              onMouseEnter={() => { setActive(true); clearTimer() }}
              onMouseLeave={startCloseTimer}
              className={`absolute top-10 -translate-x-7 w-50 bg-white px-2 rounded py-1 shadow-md ${active ? 'block' : 'hidden'}`}
            >
              {optionArr.map((item, index) => (
                <li key={index} className=' w-full '>
                  <NavLink to={item.link} className='w-full block hover:bg-neutral-200 py-1 px-2'>{item.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li className='hover:text-red-500 cursor-pointer '>Contact us</li>
      </ul>
    </div>
  )
}
export {
  Mobile,
  Desktop
}