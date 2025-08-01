// import axios from "axios";
import { useState } from "react"
import Body from "./components/body/Body";
import { SelectPhoneContext } from "./hooks/useSelectPhoneDevice";
// const API_URL=import.meta.VITE_BACKEND_API_URL

function App() {


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