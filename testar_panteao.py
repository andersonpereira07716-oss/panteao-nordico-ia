import os
from google import genai

# Inicializa o client do Gemini (usando sua chave de API configurada no ambiente)
client = genai.Client()

prompt_conselho = """
Convocação geral ao Panteão: Preciso fechar um contrato de R$ 500 hoje com um cliente digital prestando serviços de desenvolvimento ou automação. 
- Odin: Trace a diretriz comercial e o plano de ação de 3 passos.
- Thor: Escreva um trecho de código robusto em TypeScript/Supabase para validação de webhooks de pagamento.
- Freya: Crie uma copy magnética e curta para direct do Instagram aplicando nossa oferta.
- Loki: Sugira uma estratégia de guerrilha para achar esse cliente rapidamente.
- Heimdallr: Valide os critérios de segurança e rotas da nossa infra na Vercel.
"""

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt_conselho,
)

print("=== RESPOSTA DO PANTEÃO NÓRDICO ===")
print(response.text)
