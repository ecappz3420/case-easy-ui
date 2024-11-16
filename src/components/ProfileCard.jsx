import React from 'react'
import { useSelector } from 'react-redux'
const ProfileCard = () => {
    const client = useSelector((state)=> state.client.details);
    return (
        <>
            <div className='flex justify-between border-b'>
                <div className='font-bold text-lg'>Profile Details</div>
                <a className='cursor-pointer text-blue-600 text-sm' href={`https://creatorapp.zoho.in/torontoimmigrationcompany/visa-management/#Form:Lead?recLinkID=${client ? client.ID:0}&viewLinkName=LeadsA`} target='_Blank' >Edit</a>
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
                        <div className='text-sm'>{client ? client.Name : ""}</div>
                    </div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>last Name</div>
                        <div className='text-sm'>-</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm'>DATE OF BIRTH</div>
                        <div className='text-sm'>{client ? client.DOB: ""}</div>
                    </div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm'>AGE</div>
                        <div className='text-sm'>24</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Country of Residence</div>
                        <div className='text-sm'>{client ? client.Country_of_Residence:""}</div>
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
                        <div className='text-sm'>{client? client.Lead_id:""}</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Created By</div>
                        <div className='text-xl'><i className="bi bi-dash-lg"></i></div>
                    </div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Login Email</div>
                        <div className='text-sm'>{client? client.Email: ""}</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'></div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Primary Phone</div>
                        <div className='text-sm'>{client ? client.Mobile: ""}</div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Other Emails</div>
                        <div className='text-xl'><i className="bi bi-dash-lg"></i></div>
                    </div>
                    <div className='w-1/2'>
                        <div className='text-slate-500 font-semibold text-sm uppercase'>Other Contacts</div>
                        <div className='text-sm'>{client ? client.Secondary_Number : ""}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileCard