import React from 'react'
import { TypeBox } from './TypeBox';
import { useLocation } from 'react-router-dom';
export function SideBar() {
  const location = useLocation();
  const token = location.pathname.split("/")[2]; 
    return (
      <div className="bg-white  w-96 border-r-gray-200 border-r-2 sticky top-0 h-screen">
        <h1 className="text-4xl mt-4 ml-2 mr-2">
          <i className="fa-solid fa-brain"></i> No Brainer
        </h1>
        <TypeBox sharedToken={token}/>
      </div>
    );
  }

