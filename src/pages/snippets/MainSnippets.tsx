import CodeCard from "../../components/Card";

const MainSnippets = () => {
  const codeSnippet = `function greet(name) {
    console.log(\`Hello, \${name}!\`);
      let val = "Hii"
    }
  greet("World");`;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-3 mt-8">
    {Array.from({ length: 500 }).map((_, index) => (
      <CodeCard key={index} codeSnippet={codeSnippet} />
    ))}
  </div>
  
  );
};

export default MainSnippets;
