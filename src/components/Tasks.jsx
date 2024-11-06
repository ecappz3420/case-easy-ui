import { Grid2 } from '@mui/material';
import { Checkbox, Datepicker, Modal, Textarea, TextInput } from 'flowbite-react';
import React from 'react'
import { useState } from 'react'
import Select from 'react-select'

const Tasks = () => {
    const [open, setOpen] = useState(false);
    const priorityOptions = [
        {
            label: "High",
            value: "High"
        },
        {
            label: "Med",
            value: "Med"
        },
        {
            label: "Low",
            value: "Low"
        },
    ];
    const statusOptions = [
        {
            label: "In Progress",
            value: "In Progress"
        },
        {
            label: "Not Started",
            value: "Not Started"
        },
        {
            label: "Complete",
            value: "Complete"
        },
        {
            label: "Waiting for Review",
            value: "Waiting for Review"
        },
        {
            label: "Archive",
            value: "Archive"
        },

    ]
    return (
        <div className='p-2'>
            <div className='text-end'>
                <button onClick={() => setOpen(true)} className='bg-blue-600 py-2 px-3 text-white rounded transition-all hover:bg-blue-500'>Add Task <i className="bi bi-plus-circle mx-2"></i></button>
            </div>
            <div className='flex h-[600px] mt-2 flex-col justify-center items-center'>
                <div><i className="bi bi-folder-x text-[100px] text-blue-600"></i></div>
                <div className='font-semibold text-lg'>No Tasks were created</div>
                <div className='mt-3 text-sm'>There are no Tasks created as yet.</div>
                <div className='mt-3 text-sm'>Click <span className='text-blue-600 cursor-pointer'>here</span> to get started</div>
            </div>
            <Modal show={open} onClose={() => setOpen(false)} size='4-xl p-0'>
                <Modal.Body className='p-0 rounded'>
                    <div className='flex justify-between p-2 bg-blue-600 text-white'>
                        <div className='uppercase'>Add Task</div>
                        <div className='text-lg cursor-pointer' onClick={()=> setOpen(false)}><i className='bi bi-x-lg'></i></div>
                    </div>
                    <div className='bg-white p-3'>
                        <form className=''>
                            <Grid2 container spacing={3}>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6 }}>
                                    <label>Task</label>
                                    <TextInput className='mt-2' />
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6 }}>
                                    <label>{'Assignee(s)'}</label>
                                    <Select className='mt-2' isMulti isClearable options={[
                                        {
                                            label: "Arun A",
                                            value: "Arun A"
                                        },
                                        {
                                            label: "Arun B",
                                            value: "Arun B"
                                        },
                                    ]} />
                                </Grid2>
                            </Grid2>
                            <Grid2 container spacing={3} className='mt-4'>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6 }}>
                                    <label className='mb-2'>Due Date</label>
                                    <Datepicker className='mt-2' />
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6 }}>
                                    <label for="time" class="block mb-2 font-medium text-gray-900 dark:text-white">Select time:</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="time" id="time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="09:00" max="18:00" value="00:00" required />
                                    </div>

                                </Grid2>
                            </Grid2>
                            <Grid2 container spacing={3} className='mt-4'>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6 }}>
                                    <label>Due Date</label>
                                    <Select className='mt-2' options={priorityOptions} isClearable />
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6 }}>
                                    <label>Time Due</label>
                                    <Select className='mt-2' options={statusOptions} isClearable />
                                </Grid2>
                            </Grid2>
                            <Grid2 container>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6 }} className='mt-4'>
                                    <label>Notes</label>
                                    <div>
                                        <Textarea className='h-[90px]' />
                                    </div>

                                </Grid2>
                            </Grid2>
                            <div className='mt-4 flex gap-4 items-center'>
                                <Checkbox className='cursor-pointer' />
                                <label>Notify assigned team by email</label>
                            </div>
                        </form>
                    </div>
                    <div className='flex p-3 border-t gap-5'>
                        <button className='bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-500 transition-all'>Save</button>
                        <button className='px-4 py-2 rounded border hover:bg-blue-100 transition-all hover:border-blue-500 hover:text-blue-500'>Cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Tasks