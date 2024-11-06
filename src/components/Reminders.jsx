import { Grid2 } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import { Checkbox, Datepicker, Label, Modal, Radio, Select, Textarea, TextInput } from "flowbite-react";

const Reminders = () => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(null);
    const [selectValue, setSelectValue] = useState(null);
    return (
        <>
            <div className='flex justify-between border-b'>
                <div className='font-bold text-lg'>Reminders</div>
                <div className='cursor-pointer text-blue-600 text-sm'>Create</div>
            </div>
            <div className='p-3'>
                <div className='flex justify-center'>
                    <i className="bi bi-folder-x text-[100px] text-blue-600"></i>
                </div>
                <div className='font-semibold text-blue-600 text-lg text-center'>No Reminders Created</div>
                <div className="mt-3 text-sm text-center">There is no Reminders yet.</div>
                <div className="mt-3 text-sm text-center">Click <span onClick={() => setOpen(true)} className='text-blue-600 cursor-pointer'>here</span> to get Started</div>
            </div>
            <Modal show={open} size='xxl' >
                <Modal.Body className='min-h-[600px]'>
                    <div className='flex justify-between'>
                        <div className='text-lg font-thin'>Add Reminder</div>
                        <div className='text-lg cursor-pointer' onClick={() => setOpen(false)}><i class="bi bi-x-lg"></i></div>
                    </div>
                    <div className='mt-5'>
                        <form>
                            <Grid2 container spacing={2}>
                                <Grid2 size={{ sm: 12, xs: 12, md: 4, lg: 4, xl: 4 }}>
                                    <Label>Expires</Label>
                                    <Datepicker className='mt-2'  required/>
                                </Grid2>
                                <Grid2 size={{ sm: 12, xs: 12, md: 4, lg: 4, xl: 4 }}>
                                    <Label>Send Reminder</Label>
                                    <Select className='mt-2' value={selectValue} required>
                                        <option value="">Please Select</option>
                                        <option>Within 3 Days of expiration</option>
                                        <option>Within 5 Days of expiration</option>
                                        <option>Within 7 Days of expiration</option>
                                        <option>Within 15 Days of expiration</option>
                                        <option>Within 30 Days of expiration</option>
                                        <option>Within 60 Days of expiration</option>
                                        <option>Within 90 Days of expiration</option>
                                        <option>Within 120 Days of expiration</option>
                                    </Select>

                                </Grid2>
                                <Grid2 size={{ sm: 12, xs: 12, md: 4, lg: 4, xl: 4 }}>
                                    <Label>Reminder Date</Label>
                                    <Datepicker className='mt-2'required />
                                </Grid2>
                            </Grid2>
                            <div className='mt-5'>
                                <fieldset className='flex flex-col gap-4'>
                                    <legend>Notifications</legend>
                                    <div className='flex gap-[20px] mt-3'>
                                        <div className='flex gap-3 items-center'>
                                            <Radio name='notify' />
                                            <Label>SMS</Label>
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            <Radio name='notify' />
                                            <Label>Email</Label>
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            <Radio name='notify' />
                                            <Label>Chat</Label>
                                        </div>
                                    </div>

                                </fieldset>
                            </div>
                            <div className='mt-5'>
                                <Label>Subject</Label>
                                <TextInput/>
                            </div>
                            <div className='mt-5'>
                                <Label>Message</Label>
                                <Textarea className='h-[100px]' required/>
                            </div>
                            <div className='flex gap-6 mt-5'>
                                <Checkbox/>
                                <Label>Send Notification</Label>
                            </div>
                            <div className='flex justify-end gap-8'>
                                <button onClick={()=>setOpen(false)} className='px-4 py-2 border rounded transition-all hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500'>Cancel</button>
                                <button type='submit' className='px-4 py-2 bg-blue-600 rounded text-white transition-all   hover:bg-blue-500'>Save</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default Reminders