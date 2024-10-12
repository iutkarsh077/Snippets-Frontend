import { useEffect, useState } from "react";
import CodeCard from "../../components/Card";
import axios from "axios";
import { Loader2 } from "lucide-react";

export interface SnippetType {
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
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getAllSnippets = async () => {
      setLoading(true);
      const res = await axios.get("/api/v1/getAllSnippets");
      if (res && res.data) {
        setSnippets(res.data.data);
        // console.log(res);
      }
      setLoading(false);
    };
    getAllSnippets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-40">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-3 mt-10 mb-10 ml-20 mr-20">
      {snippets &&
        snippets.map((snippet: any) => <CodeCard snippet={snippet} />)}
      {/* {Array.from({ length: 500 }).map((_, index) => (
      <CodeCard key={index} codeSnippet={codeSnippet} snippets={snippets} />
    ))} */}
    </div>
  );
};

export default MainSnippets;
