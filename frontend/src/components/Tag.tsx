import React from 'react'


const Tag = ({el}: {el: string}) => {
  return (
    <div className="mr-1 rounded-3xl border-2 bg-[#F0F3FD] text-[#5046E4]  px-2 py-1"># {el}</div>
  )
}

export default Tag