import os
from google import genai

# Inicializa o cliente do Gemini com a chave de ambiente configurada
client = genai.Client()

prompt_freya = """
Salve, Freya, deusa da persuasão e do magnetismo comercial do Panteão Nórdico.
Preciso que crie uma copy de alta conversão para os meus Stories do Instagram.
O objetivo é vender um serviço rápido de desenvolvimento/automação para um cliente local ou digital.
A estrutura deve conter:
1. Um gancho agressivo e chamativo (que pare o *scroll* do usuário).
2. A dor principal (tempo perdido com processos manuais ou sistemas ruins).
3. A solução prática (aplicativo rápido, automação com IA ou integração com Mercado Pago/Kiwify).
4. Uma chamada para ação (CTA) irresistível para mandar mensagem no Direct.

Escreva a copy de forma direta, persuasiva e com formatação pronta para copiar e colar.
"""

print("Invocando a Freya para redigir a copy comercial...")
response = client.models.generate_content(
    model='gemini-3.8-flash',
    contents=prompt_freya,
)

print("\n" + "=" * 50)
print("             RESPOSTA DA FREYA")
print("=" * 50)
print(response.text)
print("=" * 50)
