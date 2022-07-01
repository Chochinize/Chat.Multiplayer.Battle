import React from 'react'

const Room = () => {
  const  testarray = [{name:'martin',id:'123'}]
    return (
    <div className=''>
        <ul className='flex'>
            <li>{testarray.map(i=>i.name)}</li>
            <li>{testarray.map(i=>i.id)}</li>
        </ul>
    </div>
  )
}

export default Room