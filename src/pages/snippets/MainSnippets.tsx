import { useEffect, useState } from "react";
import CodeCard from "../../components/Card";
import axios from "axios";

interface SnippetType {
  id: string;
  programmingLanguage: string;
  code: string;
  question: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

const MainSnippets = () => {
  const [snippets, setSnippets] = useState<SnippetType[] | null>(null);
  const codeSnippet = `function greet(name) {
    console.log(\`Hello, \${name}!\`);
      let val = "Hii"
    }
  greet("World");`;

  useEffect(() => {
    const getAllSnippets = async () => {
      const res = await axios.get("/api/v1/getAllSnippets");
      if (res && res.data) {
        setSnippets(res.data.data);
        console.log(res);
      }
    };
    getAllSnippets();
  }, []);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-3 mt-10 ml-20 mr-20">
      {snippets && 
        snippets.map((snippet: any)=>(
          <CodeCard snippet={snippet} />
        ))
      } 
      {/* {Array.from({ length: 500 }).map((_, index) => (
      <CodeCard key={index} codeSnippet={codeSnippet} snippets={snippets} />
    ))} */}
    </div>
  );
};

export default MainSnippets;
