import os
from google import genai

# Inicializa o cliente do Gemini (usa a chave GEMINI_API_KEY configurada nas variáveis de ambiente)
client = genai.Client()

prompt_unificado = """
Convocacao ao Panteao Nordico: Preciso de uma estrategia rapida para faturar hoje com servicos de desenvolvimento e automacao.
- Odin: Da a diretriz estrategica de negocios.
- Thor: Escreve um snippet limpo em TypeScript para conexao com Supabase.
- Freya: Cria uma copy curta de vendas para o Instagram.
"""

print("Invocando as divindades...")
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents=prompt_unificado,
)

print("\n=== RESPOSTA DO CONSELHO ===")
print(response.text)
