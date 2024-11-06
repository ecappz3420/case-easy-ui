import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const TimePicker = ({startDate,onChange}) => {
    const handleChange = (date)=> {
        onChange(date);
    }
  return (
    <DatePicker
    selected={startDate}
    onChange={handleChange}
    showTimeSelectOnly
    timeIntervals={1}
    dateFormat="h:mm aa"
    className='border-rounded'/>
  )
}

export default TimePicker