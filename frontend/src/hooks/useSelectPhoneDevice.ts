import { createContext, useContext } from "react";

interface SelectPhone{
    selectedPhoneIndex: number | null
    setSelectedPhoneIndex: (index: number | null) => void
}

export const SelectPhoneContext = createContext<SelectPhone | undefined>(undefined);

export function useSelectPhoneDevice(){
    
    const selectedPhone = useContext(SelectPhoneContext);

    if (selectedPhone === undefined){
        throw new Error("Kindly use this context to wrap around <Body/> only");
    }

    return selectedPhone;
}