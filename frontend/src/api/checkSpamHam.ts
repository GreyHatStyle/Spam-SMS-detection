// npm i @tanstack/react-query
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface SpamHamResponse{
    status: "success" | "fail" | "exception"
    message: string
}

const checkSpamHamApi = async (text: string): Promise<SpamHamResponse> => {
    const API_URL = import.meta.env.SPAM_HAM_MODEL_API_URL;

    const response = await axios.post<SpamHamResponse>(
        `${API_URL}/ml/spam`,
        {
            text: text,
        }
    );

    if(response.status != 200){
        throw new Error(`Error: ${response.data.message}`);
    }

    return response.data;
}

export function useCheckSpamHam(){
    const {mutate, data, error} = useMutation({
        mutationFn: checkSpamHamApi,
    });

    return {mutate, data, error}
}