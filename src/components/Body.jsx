import React from 'react'
import Tab from '@mui/material/Tab';
import { Tabs } from '@mui/material';
import ProfileTab from './ProfileTab';
import Tasks from './Tasks';
import Chat from './Chat';

const Body = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const CustomTab = (props) => {
        const { index, children } = props;
        return (
            <div className={index == value ? "block" : "hidden"}>{children}</div>
        )
    }
    return (
        <div className='p-2 rounded-lg mt-3 box-shadow bg-white min-h-[600px]'>
            <Tabs value={value} onChange={handleChange}>
                <Tab label='profile' className='hover:text-blue-600' value='1' />
                <Tab label='Questionnaires' className='hover:text-blue-600' value='2' />
                <Tab label='Documents' className='hover:text-blue-600' value='3' />
                <Tab label='Forms' className='hover:text-blue-600' value='4' />
                <Tab label='Tasks' className='hover:text-blue-600' value='5' />
                <Tab label='Agreements and Letters' className='hover:text-blue-600' value='6' />
                <Tab label='Appointments' className='hover:text-blue-600' value='7' />
                <Tab label='Communication' className='hover:text-blue-600' value='8' />
                <Tab label='Billing' className='hover:text-blue-600' value='9' />
            </Tabs>
            <CustomTab index='1'>
                <ProfileTab />
            </CustomTab>
            <CustomTab index='2'>
                <div>Tab 2</div>
            </CustomTab>
            <CustomTab index='3'>
                <div>Tab 3</div>
            </CustomTab>
            <CustomTab index='4'>
                <div>Tab 4</div>
            </CustomTab>
            <CustomTab index='5'>
                <Tasks />
            </CustomTab>
            <CustomTab index='6'>
                <div>Tab 6</div>
            </CustomTab>
            <CustomTab index='7'>
                <div>Tab 7</div>
            </CustomTab>
            <CustomTab index='8'>
                <Chat />
            </CustomTab>
            <CustomTab index='9'>
                <div>Tab 9</div>
            </CustomTab>
        </div>
    )
}

export default Body
