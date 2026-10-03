const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI();

async function convocarConselho() {
    const promptUnificado = `
    Convocacao ao Panteao Nordico: Preciso de uma estrategia rapida para faturar hoje com servicos de desenvolvimento e automacao.
    - Odin: Da a diretriz estrategica de negocios.
    - Thor: Escreve um snippet limpo em TypeScript para conexao com Supabase.
    - Freya: Cria uma copy curta de vendas para o Instagram.
    `;

    try {
        console.log("Invocando as divindades...");
        const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: promptUnificado,
        });

        console.log("\n=== RESPOSTA DO CONSELHO ===");
        console.log(response.text);
    } catch (error) {
        console.error("Erro ao invocar o Panteao:", error);
    }
}

convocarConselho();
