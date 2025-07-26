// import axios from "axios";
import { useState } from "react"
import Body from "./components/body/Body";
import { SelectPhoneContext } from "./hooks/useSelectPhoneDevice";
// const API_URL=import.meta.VITE_BACKEND_API_URL

function App() {

  // const [message, setMessage] = useState("");

  // async function healthCheck(){
  //   try{
  //     const response = await axios.get(`${API_URL}/health`)
  //     const m =  response.data["message"];
  //     setMessage(m);
  //     console.log(message);
  //   }
  //   catch(error){
  //     console.log(error);
  //   }
  //   finally{
  //     console.log("Api request done!!");
  //   }
  // }

  // useEffect( ()=>{
  //   healthCheck();
  // }, []);
  const [selectedPhoneIndex, setSelectedPhoneIndex] = useState<null | number>(null);

  return (
    <>
      <SelectPhoneContext.Provider value={{selectedPhoneIndex, setSelectedPhoneIndex}}>
        <Body/>
      </SelectPhoneContext.Provider>
    </>
  )
}

export default App