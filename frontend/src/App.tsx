// import axios from "axios";
import { useCallback, useState } from "react"
import Body from "./components/body/Body";
import { SelectPhoneContext } from "./hooks/useSelectPhoneDevice";
import { Joyride, type CallBackProps } from "react-joyride";
import { useJoyStore } from "./store/useJoyStore";
// const API_URL=import.meta.VITE_BACKEND_API_URL


function App() {
  const [selectedPhoneIndex, setSelectedPhoneIndex] = useState<null | number>(null);
  // const [stepIndex, setStepIndex] = useState<number>(0);
  // const [run, setRun] = useState<boolean>(true);

  const joy = useJoyStore();

  const handlePhoneSelect = useCallback((index: number | null) => {
    setSelectedPhoneIndex(index);


    if(index !== null && (joy.tState.stepIndex === 1 || joy.tState.stepIndex === 2)){
      joy.setRun(false);
      setTimeout( () => {
        joy.setRun(true);
        joy.setStepIndex(joy.tState.stepIndex + 1);
      }, 600)
    }
  }, [joy.tState.stepIndex]);

  const handleJoyrideCallback = useCallback((data: CallBackProps) =>{
    const { action, index } = data;

    if (action === 'next' && index === 0){
      joy.setStepIndex(1);
    }

    if (action === 'close' || action === 'skip'){
      joy.setRun(false);
    }
  }, []);

  return (
    <>
      <SelectPhoneContext.Provider value={{selectedPhoneIndex, setSelectedPhoneIndex: handlePhoneSelect}}>
        <Joyride 
        
        steps={joy.tState.steps}
        continuous={true}
        run={joy.tState.run}
        stepIndex={joy.tState.stepIndex}
        callback={handleJoyrideCallback}
        showSkipButton={true}
        
        // disableScrolling
        
        />


        <Body/>
      </SelectPhoneContext.Provider>
    </>
  )
}

export default App