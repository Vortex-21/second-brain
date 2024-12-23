import React from 'react'
import { TypeBox } from './TypeBox';

export function SideBar() {
    return (
      <div className="bg-white  w-96 border-r-gray-200 border-r-2 sticky top-0 h-screen">
        <h1 className="text-4xl mt-4 ml-2 mr-2">
          <i className="fa-solid fa-brain"></i> No Brainer
        </h1>
        <TypeBox />
      </div>
    );
  }

