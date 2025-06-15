import getResponse from "../services/openai.services.js";

export const questionTechnology = async(req, res)=>{
    try{
    const { question } = req.body;
    if(!question){
        return res.status(400).json({
            erro: "Escreva algo"
        })
    }
    const response = await getResponse(question);
    res.json({ response })
    } catch(err){
        res.status(500).json({
            erro: 'Erro ao processar sua mensagem. Tente novamente'
        })
    }
}