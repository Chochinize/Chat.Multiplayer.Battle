import React from 'react'

const Room = () => {
  const  testarray = [{name:'martin',id:'123'}]
    return (
    <div className=''>
        <ul className='flex'>
            <li className='text-2xl border-b-2 '>  <img
          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />  {testarray.map(i=>i.name)}</li>
            <li>{testarray.map(i=>i.id)}</li>
        </ul>
    </div>
  )
}

export default Room