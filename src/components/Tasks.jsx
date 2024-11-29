import { Grid2 } from '@mui/material';
import { Modal } from 'flowbite-react';
import { Checkbox, DatePicker, Form, Input, Select, Table } from "antd";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
const { TextArea } = Input;

const Tasks = () => {
    const [open, setOpen] = useState(false);
    const leadData = useSelector((state) => state.client.details);
    const [tasks, setTasks] = useState([]);
    const [isData, setIsData] = useState(false);
    const [taskData, setTaskData] = useState({
        Lead: "",
        Subject_field: "",
        Task: "",
        Assignee: "",
        Priority: "",
        Due_Date: "",
        Status: "",
        Reason_of_Arranging_Documents: ""
    })
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await ZOHO.CREATOR.API.getAllRecords(
                    {
                        appName: "visa-management",
                        reportName: "All_Tasks",
                        criteria: `Lead == ${leadData.ID}`
                    }
                );
                const records = response.data ? response.data.map((data,index) => {
                    const key = index + 1;
                    return {
                        "key": key,
                        "Task": data.Task,
                        "Subject": data.Subject_field,
                        "Assignee": data.Assignee.display_value,
                        "Due Date": data.Due_Date,
                        "Priority": data.Priority,
                        "Status": data.Status
                    }
                }) : [];
                setTasks(records);
                setIsData(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTask();
    }, [leadData]);

    

    const priorityOptions = [
        { label: "High", value: "High" },
        { label: "Highest", value: "Highest" },
        { label: "Normal", value: "Normal" },
        { label: "Low", value: "Low" },
        { label: "Lowest", value: "Lowest" },
    ];

    const statusOptions = [
        { label: "In Progress", value: "In Progress" },
        { label: "Not Started", value: "Not Started" },
        { label: "Completed", value: "Completed" },
        { label: "Waiting for Review", value: "Waiting for Review" },
        { label: "Archive", value: "Archive" },
    ];

    const columns = [
        {
            title: "Task",
            dataIndex: "Task",
            key: "Task"
        },
        {
            title: "Subject",
            dataIndex: "Subject",
            key: "Subject"
        },
        {
            title: "Assignee",
            dataIndex: "Assignee",
            key: "Assignee"
        },
        {
            title: "Due Date",
            dataIndex: "Due Date",
            key: "Due Date"
        },
        {
            title: "Priority",
            dataIndex: "Priority",
            key: "Priority"
        },
        {
            title: "Status",
            dataIndex: "Status",
            key: "Status"
        },
    ]

    const handleChange = (field, value) => {
        setTaskData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }
    const handleSubmit = async () => {
        console.log(taskData);
    }
    return (
        <div className='p-2'>
            <div className='text-end'>
                <button onClick={() => setOpen(true)} className='bg-blue-600 py-2 px-3 text-white rounded transition-all hover:bg-blue-500'>Add Task <i className="bi bi-plus-circle mx-2"></i></button>
            </div>
            {
                isData ? (
                    <>
                    <Table  dataSource={tasks} columns={columns}/>
                    </>
                )
                    : (
                        <div className='flex h-[600px] mt-2 flex-col justify-center items-center'>
                            <div><i className="bi bi-folder-x text-[100px] text-blue-600"></i></div>
                            <div className='font-semibold text-lg'>No Tasks were created</div>
                            <div className='mt-3 text-sm'>There are no Tasks created as yet.</div>
                            <div className='mt-3 text-sm'>Click <span className='text-blue-600 cursor-pointer'>here</span> to get started</div>
                        </div>
                    )
            }

            <Modal show={open} onClose={() => setOpen(false)} size='4-xl p-0'>
                <Modal.Body className='p-0 rounded'>
                    <div className='flex justify-between p-2 bg-blue-600 text-white'>
                        <div className='uppercase'>Add Task</div>
                        <div className='text-lg cursor-pointer' onClick={() => setOpen(false)}><i className='bi bi-x-lg'></i></div>
                    </div>
                    <div className='bg-white p-3'>
                        <Form onFinish={handleSubmit}>
                            <Grid2 container>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6, md: 6 }}>
                                    <Form.Item label="Task" layout='vertical'>
                                        <Input className='w-[300px] rounded' value={taskData.Task} onChange={(e) => handleChange("Task", e.target.value)} />
                                    </Form.Item>
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6, md: 6 }}>
                                    <Form.Item label='Assignee' layout='vertical' className='w-[300px]'>
                                        <Select
                                            className='mt-2'
                                            allowClear
                                            options={[{
                                                label: "Arun A",
                                                value: "Arun A"
                                            },
                                            {
                                                label: "Arun B",
                                                value: "Arun B"
                                            },
                                            ]}
                                            value={taskData.Assignee}
                                            onChange={(value) => handleChange("Assignee", value)} />
                                    </Form.Item>

                                </Grid2>
                            </Grid2>
                            <Grid2 container className='mt-4 place-content-center'>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6, md: 6 }}>
                                    <Form.Item label="Subject" layout='vertical' className='w-[300px]'>
                                        <Input
                                            className='rounded'
                                            value={taskData.Subject_field}
                                            onChange={(e) => handleChange("Subject_field", e.target.value)} />
                                    </Form.Item>
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6, md: 6 }}>
                                    <Form.Item label="Due Date" layout='vertical'>
                                        <DatePicker
                                            className='w-[300px]'
                                            format={"DD-MMM-YYYY"}
                                            value={taskData.Due_Date}
                                            onChange={(value) => handleChange("Due_Date", value)} />
                                    </Form.Item>

                                </Grid2>
                            </Grid2>
                            <Grid2 container className='mt-4'>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6, md: 6 }}>
                                    <Form.Item label="Priority" layout='vertical' className='w-[300px]'>
                                        <Select
                                            options={priorityOptions}
                                            isClearable
                                            value={taskData.Priority}
                                            onChange={(value) => handleChange("Priority", value)} />
                                    </Form.Item>

                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 12, lg: 6, xl: 6, md: 6 }}>
                                    <Form.Item label="Status" layout='vertical' className='w-[300px]'>
                                        <Select
                                            allowClear
                                            options={statusOptions}
                                            value={taskData.Status}
                                            onChange={(value) => handleChange("Status", value)} />
                                    </Form.Item>
                                </Grid2>
                            </Grid2>
                            <div className="flex flex-col gap-8 mt-3">
                                <Form.Item label="Notes" layout='vertical' className='w-[300px]'>
                                    <TextArea
                                        value={taskData.Reason_of_Arranging_Documents}
                                        onChange={(e) => handleChange("Reason_of_Arranging_Documents", e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Notify assigned team by email">
                                    <Checkbox />
                                </Form.Item>
                            </div>

                        </Form>
                    </div>
                    <div className='flex p-3 border-t gap-5'>
                        <button  className='bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-500 transition-all' type='submit'>Save</button>
                        <button className='px-4 py-2 rounded border hover:bg-blue-100 transition-all hover:border-blue-500 hover:text-blue-500'>Cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Tasks