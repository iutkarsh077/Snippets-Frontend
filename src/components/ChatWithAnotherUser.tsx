import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { userContext } from "./GlobalUserProvider";



interface ChatListType {
  id: string,
  text: string,
  senderId: string,
  receiverId: string,
  createdAt: Date,
  updatedAt: Date,
  // sender?: SenderInfoType
}

export default function ChatWithAnotherUser() {
  const params = useParams();
  const { GlobalUserDetails } = useContext<any>(userContext);
  const ReceiverId = params.userId as string;
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState<ChatListType[] | null>(null);

  useEffect(() => {
    const getAllChat = async () => {
      try {
        const res = await axios.post("/api/v1/getChat", {
          senderId: GlobalUserDetails.id,
          receiverId: ReceiverId,
        });

        if (res?.data?.status === false) {
          throw new Error(res.data.msg);
        }

        console.log(res);
        setChatList(res?.data?.chats || []); // Safely access data
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.msg || "An unknown error occurred";
        toast.error(errorMessage);
      }
    };

    if (GlobalUserDetails && ReceiverId) {
      getAllChat();
    }
  }, [GlobalUserDetails, ReceiverId]);

  const handleSendChat = async () => {
    if (
      GlobalUserDetails.id === null ||
      GlobalUserDetails.id === undefined ||
      !GlobalUserDetails ||
      !GlobalUserDetails.id
    ) {
      toast.error("Please Login before, Starting a Chat");
      return;
    }
    try {
      if (!message || !ReceiverId) {
        toast.error("Fields are empty");
        return;
      }
      const data = {
        text: message,
        senderId: GlobalUserDetails.id,
        receiverId: ReceiverId,
      };
      const res = await axios.post("/api/v1/saveChat", data);
      if (res.data.status === false) {
        throw new Error(res.data.msg);
      }

      console.log(res);
    } catch (error: any) {
      const errorMessage = error.response.data || "An unknown error occured";
      toast.error(errorMessage);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mt-10 p-6 space-y-8"
    >
      <ToastContainer />
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="w-full space-y-4"
      >
        <label
          htmlFor="sendMessage"
          className="block text-lg font-medium text-gray-700 dark:text-gray-200"
        >
          Start a new conversation
        </label>
        <textarea
          id="sendMessage"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="w-full h-32 p-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:border-blue-500"
        />
        <button onClick={handleSendChat} className="w-full flex items-center justify-center space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span className=" flex justify-center py-2 gap-x-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 resize-none">
              Send Message <Send />
            </span>
          </motion.div>
        </button>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Previous Chats
        </h2>
        <div className="space-y-4">
          {/* Placeholder for previous chat messages */}
          {chatList && chatList.map((chat: ChatListType, index: number) => (
            <motion.div
              key={chat.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-100 rounded-lg shadow dark:bg-gray-700"
            >
              <p className="text-gray-800 dark:text-gray-200">
                {chat.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
