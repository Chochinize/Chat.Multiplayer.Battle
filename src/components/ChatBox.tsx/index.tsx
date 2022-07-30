import React from 'react'
import ShowArea from './showarea'
import TextArea from './textarea'

const index = () => {
  return (
    <div className=' md:w-[35vw] lg:w-[35vw] xl:w-[20vw] h-full flex  flex-col '>
      <ShowArea />
      <TextArea/>
    </div>
  )
}

export default index