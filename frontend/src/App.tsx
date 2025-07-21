import axios from "axios";
import { useEffect, useState } from "react"
import Body from "./components/body/Body";

function App() {

  const [message, setMessage] = useState("");

  async function healthCheck(){
    try{
      const response = await axios.get("http://127.0.0.1:8000/health")
      const m =  response.data["message"];
      setMessage(m);
      console.log(message);
    }
    catch(error){
      console.log(error);
    }
    finally{
      console.log("Api request done!!");
    }
  }

  useEffect( ()=>{
    healthCheck();
  }, []);

  return (
    <>

      {/* <div className="bg-green-200">Hello Manas form frontend</div>
      <div className="bg-blue-500">{message}</div> */}

      <Body/>
    </>
  )
}

export default App