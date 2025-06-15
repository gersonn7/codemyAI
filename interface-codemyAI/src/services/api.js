import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

export const api = async (question) => {
    try{
        const response = await axios.post(`${API_URL}technology/question`, {
            question
        })

        return response.data.response
    }catch(err){
        console.error("Erro ao buscar resposta no servidor", err)
        throw err
    }
}