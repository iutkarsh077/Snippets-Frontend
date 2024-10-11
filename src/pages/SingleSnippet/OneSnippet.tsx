import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Clipboard, Check, Send } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRegComment } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { snippet } from "@nextui-org/react";


interface Author {
    name: string;
}

interface PostSnippet {
    id: string; // Unique identifier for the snippet
    programmingLanguage: string; // The programming language of the code snippet
    code: string; // The code snippet itself
    question: string; // The related question for the code snippet
    authorId: string; // The ID of the author
    createdAt: Date; // Timestamp for when the snippet was created
    updatedAt: Date; // Timestamp for when the snippet was last updated
    author: Author; // The author object containing the author's name and ID
}


export default function OneSnippet() {
  const { id } = useParams();
  console.log(id);
  const [copied, setCopied] = useState(false);
  const [singlePost, setSinglePost] = useState< PostSnippet | null>(null);
  const [createComment, setCreateComment] = useState(false);
  const [comment, setComment] = useState("");

    useEffect(()=>{
        const getUniquePost = async () =>{
            try {
                const res = await axios.get(`/api/v1/getSinglePost`, {
                    params: { id }
                })
                if(res.data.status === false){
                    throw new Error(res.data);
                }
                setSinglePost(res.data.data);
                console.log(res);
            } catch (error: any) {
                const errorMessage = error.response.data.msg || "An unknow error occured";
                toast.error(errorMessage);
            }
        }
        getUniquePost();
    }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(singlePost?.code as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = () =>{
    
  }

  return (
    <>
    {
        singlePost && (<div className="flex mt-14 justify-center gap-x-10">
            <ToastContainer/>
          <motion.div
            className="max-w-lg w-full flex flex-col bg-gray-900 rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <motion.button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {copied ? <Check size={20} /> : <Clipboard size={20} />}
                </motion.button>
              </div>
              <SyntaxHighlighter
                language={singlePost.programmingLanguage}
                style={atomDark}
                customStyle={{
                  margin: 0,
                  padding: "16px",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  height: "100%",
                }}
              >
                {singlePost.code}
              </SyntaxHighlighter>
            </div>
            <motion.div
              className="bg-gray-800 p-4 flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-sm text-gray-400">{singlePost.programmingLanguage}</span>
              <span className="flex gap-x-5 items-center text-gray-400"><span className="text-sm text-gray-400">{singlePost.code.split("\n").length}</span>
              <motion.div className="hover:cursor-pointer" whileHover={{scale: 1.2, color: "#FFFFFF", rotate: 360}} onClick={()=>setCreateComment(!createComment)}><FaRegComment/></motion.div>
              </span>
            </motion.div>
          </motion.div>
    
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-sm w-full bg-gray-800 rounded-xl shadow-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Problem Statement</h3>
            <p className="text-gray-300 ">
           {singlePost.question}
            </p>
          </motion.div>
        </div>)
    }

{
  createComment && (
    <div className="flex justify-center ">
      <motion.div
      className="flex space-y-3 p-4 gap-x-4 rounded-md shadow-lg w-full max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <textarea
        
        placeholder="Add your comment..."
        className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        onChange={(e) => setComment(e.target.value)}
      />
      <motion.button
        className="px-4 flex items-center  gap-x-2 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddComment}
      >
        Send <Send/>
      </motion.button>
    </motion.div>
    </div>
  )
}
    </>
  );
}
