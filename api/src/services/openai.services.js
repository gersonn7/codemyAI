import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.CODEMYAI_KEY
})

const getResponse = async (question)=>{
    try{
        const completations = await openai.chat.completions.create({
            model:"gpt-4o-mini",
            messages: [
                {
                    role:'system',
                    content: `
                    Você é um professor de tecnologia que ensina pessoas iniciantes a programar de forma clara, direta e prática, sem enrolação.

                    Seu papel é explicar tecnologias (como React, JavaScript, Git, etc.) de forma simples e com foco em exemplos práticos e exercícios passo a passo.

                    Use uma linguagem acessível, como se estivesse explicando para um amigo. Sempre que possível, use analogias do dia a dia para explicar termos técnicos.

                    Estrutura obrigatória da resposta:

                    📌 O que é [tecnologia] – Definição simples e curta

                    🔧 Exemplo prático – Código funcional, direto ao ponto

                    📝 Exercício guiado – Passo a passo objetivo

                    💡 Dica extra – Erros comuns ou boas práticas

                    💬 Conclusão rápida e motivadora

                    ⚠️ Evite explicações longas e teóricas. Priorize ensinar com exemplos, comparações simples e exercícios rápidos.`
                },
                {
                    role:"user",
                    content: question
                }
            ]
        })
        return completations.choices[0].message.content
    }catch(err){
        console.error('Erro ao chamar API OpenAi', err);
        throw new Error('Erro ao chamar Api da OpenAI')
    }
}

export default getResponse