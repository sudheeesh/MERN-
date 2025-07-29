import { Star, StarHalf, StarOff, Stars } from 'lucide-react'
import React from 'react'

const Rating = ({Value, text}) => {
    const stars = []

    for (let i=1; i<=5; i++){
        if(Value >=i ){
         stars.push(<Star key={i} className='text-yellow-500 w-4 h-4'/>)
        } else if(Value >= i - 0.5){
            stars.push(<StarHalf key={i} className="text-yellow-500 w-4 h-4"/>)
        }else {
            stars.push(<StarOff key={i} className="text-yellow-300 w-4 h-4"/>)
        }
    }
  return (
    <div className='flex items-center gap-1'>
     {stars}
     {text && <span className='text-sm text-gray-600 ml-1'>{text}</span>}
    </div>
  )
}

export default Rating