import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Table,
  Modal,
  Button,
  Row,
  Col,
  Popconfirm,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const { TextArea } = Input;

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const leadData = useSelector((state) => state.client.details);
  const [tasks, setTasks] = useState([]);
  const [isData, setIsData] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [checkBox, setCheckBox] = useState(false);
  const [form] = Form.useForm();

  const assignees = useSelector((state) => state.teamMember.details);

  useEffect(() => {
    if (assignees && Array.isArray(assignees)) {
      setTeamMembers(() =>
        assignees.map((user) => ({
          label: user.User_Name,
          value: user.User_Name,
          id: user.ID,
        }))
      );
    }
  }, [assignees]);

  const fetchTask = async () => {
    try {
      const response = await ZOHO.CREATOR.API.getAllRecords({
        appName: "visa-management",
        reportName: "All_Tasks",
        criteria: `Lead == ${leadData.ID}`,
      });
      const records = response.data
        ? response.data.map((data, index) => {
            const key = index + 1;
            return {
              key: key,
              Task: data.Task,
              Subject: data.Subject_field,
              Assignee: data.Assignee.display_value,
              "Due Date": data.Due_Date,
              Priority: data.Priority,
              Status: data.Status,
              ID: data.ID,
            };
          })
        : [];
      setTasks(records);
      setIsData(true);
      console.log("Updated Tasks:", records);
    } catch (error) {
      console.error("Error Fetching Tasks", error);
      setTasks([]);
    }
  };
  useEffect(() => {
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

  const deleteRecord = async (id) => {
    try {
      await ZOHO.CREATOR.init();
      const config = {
        appName: "visa-management",
        reportName: "All_Tasks",
        criteria: `ID == ${id}`,
      };
      console.log(config);
      await ZOHO.CREATOR.init();
      const response = await ZOHO.CREATOR.API.deleteRecord(config);
      await fetchTask();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Task",
      dataIndex: "Task",
      key: "Task",
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      key: "Subject",
    },
    {
      title: "Assignee",
      dataIndex: "Assignee",
      key: "Assignee",
    },
    {
      title: "Due Date",
      dataIndex: "Due Date",
      key: "Due Date",
    },
    {
      title: "Priority",
      dataIndex: "Priority",
      key: "Priority",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Popconfirm
          title="Delete the Task"
          description="Are you sure want to delete the task?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteRecord(record.ID)}
        >
          <Button type="danger">
            <i className="text-red-600 text-xl bi bi-trash3-fill"></i>
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    const data = {
      ...value,
      Due_Date: value?.Due_Date?.format("DD-MMM-YYYY") || "",
      Assignee: teamMembers.find((i) => i.value === value.Assignee).id,
      Notify_assigned_team_by_email: checkBox,
      Lead: leadData.ID,
    };
    const formData = {
      data: data,
    };
    const config = {
      appName: "visa-management",
      formName: "Task",
      data: formData,
    };
    try {
      await ZOHO.CREATOR.init();
      const response = await ZOHO.CREATOR.API.addRecord(config);
      form.resetFields();
      setOpen(false);
      await fetchTask();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2">
      <div className="text-end mb-2">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 py-2 px-3 text-white rounded transition-all hover:bg-blue-500"
        >
          Add Task <i className="bi bi-plus-circle mx-2"></i>
        </button>
      </div>
      {isData ? (
        <>
          <Table dataSource={tasks} columns={columns} />
        </>
      ) : (
        <div className="flex h-[600px] mt-2 flex-col justify-center items-center">
          <div>
            <i className="bi bi-folder-x text-[100px] text-blue-600"></i>
          </div>
          <div className="font-semibold text-lg">No Tasks were created</div>
          <div className="mt-3 text-sm">There are no Tasks created as yet.</div>
          <div className="mt-3 text-sm">
            Click <span className="text-blue-600 cursor-pointer">here</span> to
            get started
          </div>
        </div>
      )}

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        width={1000}
        style={{ top: 20 }}
        title="Add Task"
        footer={<></>}
      >
        <div className="bg-white p-2">
          <Form
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            size="default"
          >
            <Row gutter={[12, 1]}>
              <Col span={12}>
                <Form.Item
                  label="Task"
                  name="Task"
                  rules={[{ required: true, message: "Required to Fill" }]}
                  className="w-[300px]"
                >
                  <Input className="rounded-lg border" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Assignee"
                  name="Assignee"
                  rules={[{ required: true, message: "Required to Fill" }]}
                  className="w-[300px]"
                >
                  <Select className="mt-2" allowClear options={teamMembers} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Subject"
                  name="Subject_field"
                  className="w-[300px]"
                >
                  <Input className="rounded-lg border" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Due Date"
                  name="Due_Date"
                  className="w-[300px]"
                >
                  <DatePicker className="w-[300px]" format={"DD-MMM-YYYY"} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Priority"
                  name="Priority"
                  className="w-[300px]"
                >
                  <Select options={priorityOptions} allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Status" name="Status" className="w-[300px]">
                  <Select allowClear options={statusOptions} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Notes" name="Notes" className="w-[300px]">
                  <TextArea className="rounded-md" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Notify assigned team by email"
                  name="Notify_assigned_team_by_email"
                  layout="horizontal"
                >
                  <Checkbox
                    onChange={(curr) => setCheckBox(curr.target.checked)}
                    checked={checkBox}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <div className="flex gap-5">
                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      Save
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="button">Cancel</Button>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;
