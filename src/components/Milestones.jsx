import React from 'react'

const Milestones = () => {
    return (
        <>
            <div className='flex justify-between border-b'>
                <div className='font-bold text-lg'>Milestones</div>
            </div>
            <div className='p-3'>
                <div className='flex justify-center'>
                    <i className="bi bi-folder-x text-[100px] text-blue-600"></i>
                </div>
                <div className='font-semibold text-blue-600 text-lg text-center'>No Milestones Available</div>
                <div className="mt-3 text-sm text-center">There is no Milestones available yet.</div>
                <div className="mt-3 text-sm text-center">There are no Milestones available yet. Milestones will be automatically created from your Retainer Schedule. To get started, go to the Milestone tab.</div>
            </div>
        </>
    )
}

export default Milestones