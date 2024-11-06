import { Grid2, Link } from '@mui/material'
import React from 'react'
import ProfileCard from './ProfileCard'
import CaseInfo from './CaseInfo'
import TeamMembers from './TeamMembers'
import Reminders from './Reminders'
import Milestones from './Milestones'
import RelatesCases from './RelatesCases'

const ProfileTab = () => {
    return (
        <div className='p-2'>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 5, xl: 5 }}>
                    {/* {Profile} */}
                    <div className='h-[350px] rounded border p-2 mb-3 box-shadow'>
                        <ProfileCard />
                    </div>

                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 7, xl: 7 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                            <div className='h-[350px] rounded mb-3 box-shadow border p-2'>
                            <CaseInfo/>
                            </div>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                            <div className='h-[350px] rounded mb-3 box-shadow border p-2'>
                                <TeamMembers/>
                            </div>
                        </Grid2>
                    </Grid2>

                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 5, xl: 5 }}>
                    <div className='h-[350px] rounded border mb-3 box-shadow p-2'>
                    <Reminders/>
                    </div>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 7, xl: 7 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                            <div className='h-[350px] rounded mb-3 box-shadow border p-2'>
                                <Milestones/>
                            </div>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                            <div className='h-[350px] rounded mb-3 box-shadow border p-2'>
                                <RelatesCases/>
                            </div>
                        </Grid2>
                    </Grid2>

                </Grid2>
            </Grid2>
        </div>
    )
}

export default ProfileTab