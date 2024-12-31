import React from 'react'
import {Loader} from '../icons/Loader'

export const LoaderModal = () => {
  return (
    <div className="fixed bg-transparent border-none top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] border-2 h-96 w-80 rounded-lg z-40 flex flex-col items-center justify-center">
        <Loader/>
    </div>
  )
}
