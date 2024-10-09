import { useState } from "react";
import { motion } from "framer-motion";
import { Clipboard, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../App.css"

export default function CodeCard({codeSnippet}: any) {
  const [copied, setCopied] = useState(false);

  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = codeSnippet.split("\n").length;

  return (
    <motion.div
      className="max-w-md w-full bg-gray-900 dark:hover:shadow-xl dark: rounded-xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex space-x-1">
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
          language="javascript"
          style={atomDark}
          class="example"
          customStyle={{
            margin: 0,
            padding: "16px",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            cursor: "pointer"
          }}
        >
          {codeSnippet}
        </SyntaxHighlighter>
      </div>
      <motion.div
        className="bg-gray-800 p-4 flex justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="text-sm text-gray-400">Javascript</span>
        <span className="text-sm text-gray-400">{lineCount}</span>
      </motion.div>
    </motion.div>
  );
}
