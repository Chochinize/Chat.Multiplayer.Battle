import React from 'react'
import ShowArea from './showarea'
import TextArea from './textarea'

const index = () => {
  return (
    <div className=' md:w-[35vw] lg:w-[35vw] xl:w-[20vw] h-full flex  flex-col border-4  border-green-200'>
      <ShowArea />
      <TextArea/>
    </div>
  )
}

export default index