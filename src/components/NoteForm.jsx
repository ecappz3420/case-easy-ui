import { Button, Checkbox, Datepicker, Textarea, TextInput } from 'flowbite-react'
import React from 'react'

const NoteForm = ({handleClick}) => {
    return (
        <form>
            <div className='mb-5'>
                <label>Date</label>
                <Datepicker placeholder='YYY-MM-DD' />
            </div>
            <div className="mb-5 flex flex-col">
                <label>{'Subject (Optional)'}</label>
                <TextInput />
            </div>
            <div className="mb-5 flex flex-col">
                <label>{'Notes'}</label>
                <Textarea className='h-[200px]' />
            </div>
            <div className='mb-5 flex gap-3 items-center'>
                <Checkbox />
                 <div>Notify assigned team by email</div>
            </div>
            <button onClick={handleClick} className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500'>Save</button>
        </form>
    )
}

export default NoteForm