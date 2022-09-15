import React from 'react'
import ShowArea from './showarea'
import TextArea from './textarea'

const index = () => {
  return (
    <div className=' md:w-[35vw] lg:w-[35vw] sm:relative fixed top-[67%] sm:top-[0%] w-[95vw] sm:w-[20vw] xl:w-[20vw] h-[70%] sm:h-full flex  flex-col '>
      <ShowArea />
      <TextArea/>
    </div>
  )
}

export default index