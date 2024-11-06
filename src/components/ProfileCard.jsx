import React from 'react'

const ProfileCard = () => {
    return (
        <>
            <div className='flex justify-between border-b'>
                <div className='font-bold text-lg'>Profile Details</div>
                <div className='cursor-pointer text-blue-600 text-sm'>Edit</div>
            </div>
            <div className='font-semibold py-3 border-b text-blue-600 cursor-pointer'>Primary</div>
            <div className='overflow-y-auto h-[220px]'>
                <div className='font-bold py-1'>Demographic</div>
                <div className='text-slate-500 font-semibold text-sm'>Associated Company</div>
                <div className='text-xl'><i className="bi bi-dash-lg"></i></div>
                <div className='text-slate-500 font-semibold text-sm'>UCI</div>
                <div className='text-xl'><i className="bi bi-dash-lg"></i></div>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm'>Passport No</div>
                        <div className='text-xl'><i className="bi bi-dash-lg"></i></div>
                    </div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm'>Passport Expiry</div>
                        <div className='text-xl'><i className="bi bi-dash-lg"></i></div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>First Name</div>
                        <div className='text-sm'>Katy</div>
                    </div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>last Name</div>
                        <div className='text-sm'>Perry</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm'>DATE OF BIRTH</div>
                        <div className='text-sm'>04/09/2000</div>
                    </div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm'>AGE</div>
                        <div className='text-sm'>24</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Country of Residence</div>
                        <div className='text-sm'>Canada</div>
                    </div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Country of Citizenship</div>
                        <div className='text-sm'>{'1) Canada'}</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Marital Status</div>
                        <div className='text-sm'>Never Married/Status</div>
                    </div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Client ID</div>
                        <div className='text-sm'>KP-2</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Created By</div>
                        <div className='text-xl'><i className="bi bi-dash-lg"></i></div>
                    </div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Login Email</div>
                        <div className='text-sm'>katy@fakeemail.com</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'></div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Primary Phone</div>
                        <div className='text-sm'>647-123-4567</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Other Emails</div>
                        <div className='text-xl'><i className="bi bi-dash-lg"></i></div>
                    </div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Other Contacts</div>
                        <div className='text-sm'>{'1) 647-123-4567'}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard