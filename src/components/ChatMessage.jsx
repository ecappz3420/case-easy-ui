import React from "react";
import { Input, Button } from "antd";

const ChatMessage = () => {
  const { TextArea } = Input;

  return (
    <div className="border p-2 gap-6 flex flex-col justify-between">
      <TextArea
        maxLength={500}
        style={{
          height: 300,
          resize: "none",
        }}
      />
      <div>
        <Button type="primary" size="small">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatMessage;
