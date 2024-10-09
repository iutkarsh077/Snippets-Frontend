import { useState } from 'react'

const Home = () => {
    const [hey, setHey] = useState('');
  const handleBackendCall = async () =>{
    const res = await fetch("/api");
    const data = await res.json();
    setHey(data);
  }
  return (
    <div className="text-3xl flex items-center gap-y-6 flex-col">
          <div>
          Home Page
          </div>
          <button onClick={handleBackendCall} className="bg-orange-600 p-2 rounded-xl">Click me</button>
          <div>
          {
            hey.length > 0 ? (<div className="text-3xl text-purple-500">
              {hey}
            </div>) : ("No calls")
          }
          </div>
    </div>
  )
}

export default Home
