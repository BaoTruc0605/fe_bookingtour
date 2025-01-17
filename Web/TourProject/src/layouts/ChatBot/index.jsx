import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const ChatBot = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Chào mừng quý khách đã đến với LuckyPanda Travel. Quý khách cần thông tin gì hãy chat với chúng tôi nhé!",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleSend = async () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);

      try {
        const response = await fetch(
          "http://localhost:5005/webhooks/rest/webhook",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sender: "user", message: inputMessage }),
          }
        );
        const data = await response.json();

        // Thêm phản hồi của Rasa vào messages
        const rasaMessages = data.map((msg) => ({
          sender: "bot",
          text: msg.text,
        }));
        setMessages([
          ...messages,
          { sender: "user", text: inputMessage },
          ...rasaMessages,
        ]);
      } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error);
      }

      setInputMessage("");
      // // phản hồi tự động
      // setTimeout(() => {
      //   setMessages((prevMessages) => [
      //     ...prevMessages,
      //     {
      //       text: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ trả lời bạn sớm nhất.",
      //       sender: "bot",
      //     },
      //   ]);
      // }, 1000);
    }
  };

  return (
    <>
      {/* Nút Chatbot */}
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined style={{ fontSize: "40px" }} />}
        onClick={showModal}
        className="fixed bottom-12 right-10 z-50 shadow-lg h-[70px]"
        style={{ width: 70 }}
      />

      <Modal
        title={<div className="text-xl font-bold">ChatBot</div>}
        open={isModalVisible}
        onCancel={handleClose}
        footer={null}
        width={450}
        height={500}
        className="fixed  right-28 z-52 shadow-lg"
        style={{
          borderRadius: 30,
        }}
      >
        <div
          className="flex flex-col h-[500px] p-2 overflow-y-auto border-b border-gray-300  "
          style={{
            scrollbarWidth: "thin",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex my-1 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`p-2 pl-4 pr-4 text-lg rounded-2xl max-w-[75%] text-left shadow-md ${
                  msg.sender === "user"
                    ? "bg-customColor text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex p-2 border-t border-gray-300">
          <Input
            placeholder="Nhập tin nhắn..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onPressEnter={handleSend}
            className="rounded-xl h-10 mr-2"
          />
          <Button
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            className={`rounded-xl h-10 ${
              inputMessage.trim() ? "bg-customColor" : "bg-white "
            }`}
          >
            Gửi
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ChatBot;
