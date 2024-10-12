import { useState } from "react";
import CodeCard from "../components/CodeInput";
import SearchLanguage from "../components/Searchlanguage";

import DescriptionBox from "../components/DescriptionForUpload";

const UploadSnippets = () => {
    const [lang, setLang] = useState("");
    const [code, setCode] = useState("")
    const [description, setDescription] = useState("");
    const [showCodeCard, setShowCodeCard] = useState(true);
    const [showSearchLanguage, setShowSearchLanguage] = useState(false);
    const [showDescriptionBox, setshowDescriptionBox] = useState(false);

    console.log(description)
  return (
    <div className="flex flex-col items-center w-full mt-10">
        <div className={`${showCodeCard === true ? "block" : "hidden"} w-full flex justify-center`}><CodeCard code={code} setCode={setCode} setShowCodeCard={setShowCodeCard} setShowSearchLanguage={setShowSearchLanguage}/></div>
        <div className={`${showSearchLanguage === true ? "block" : "hidden"} w-full`}><SearchLanguage setLang={setLang} setShowSearchLanguage={setShowSearchLanguage} setshowDescriptionBox={setshowDescriptionBox}/></div>
        
        <div className={`${showDescriptionBox === true ? "block" : "hidden"} w-full`}><DescriptionBox setDescription={setDescription} language={lang} code={code}/></div>
      </div>
  )
}

export default UploadSnippets
