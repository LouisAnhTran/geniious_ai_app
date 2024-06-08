import Image from 'next/image';
import React from 'react'
import { FaAirbnb } from "react-icons/fa";


interface EmptyProps  {
  label: String;
}

const EmptyComponent = ({label}:EmptyProps) => {
  return (
    <div className='h-full p-20 flex flex-col items-center justify-center'>
        <FaAirbnb className='relative h-60 w-60 text-fuchsia-500'/>
        <p className='text-muted-foreground text-sm text-center'>
          {label}
        </p>
    </div>
  )
}

export default EmptyComponent