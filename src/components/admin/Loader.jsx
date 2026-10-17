import React from 'react'
import { Audio ,ThreeDots} from 'react-loader-spinner'

const Loader = ({visible}) => {
   return (
    <ThreeDots
  height="60"
  width="60"
  radius="3"
  color="#07090A"
  ariaLabel="three-dots-loading"
  wrapperStyle={{ margin: '20px' }}
  wrapperClass="custom-loader"
  visible={visible}
/>
  )
}

export default Loader