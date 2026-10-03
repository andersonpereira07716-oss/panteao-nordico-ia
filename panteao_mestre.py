import os
from google import genai

# Inicializa o cliente do Gemini
client = genai.Client()

def limpar_terminal():
    os.system('clear')

def menu_principal():
    print("=" * 60)
    print("      🔥 PANTEÃO NÓRDICO - ECOSSISTEMA MESTRE 🔥")
    print("=" * 60)
    print("1. 🧠 Consulta ao Conselho (Odin, Thor & Freya)")
    print("2. 🎯 Gerador Comercial & Opções de Pagamento (Pix/Cartão/Bancos)")
    print("3. ⚡ Sair para o Terminal")
    print("=" * 60)

def invocar_conselho():
    limpar_terminal()
    print("--- INVOCANDO O CONSELHO DO PANTEÃO ---")
    pergunta = input("Qual é o desafio atual para as divindades analisarem? ").strip()
    
    prompt = f"""
    Atue como o Conselho Supremo do Panteão Nórdico (Odin para estratégia, Thor para arquitetura técnica e Freya para copy/vendas).
    Analise o seguinte desafio do desenvolvedor: '{pergunta}'.
    Dê uma diretriz prática, direta e motivadora para executar no Termux ou no app.
    """
    
    print("\nProcessando sabedoria das divindades...")
    try:
        response = client.models.generate_content(
            model='gemini-3.8-flash',
            contents=prompt,
        )
        print("\n" + "=" * 50)
        print(response.text)
        print("=" * 50)
    except Exception as e:
        print(f"\nErro ao invocar o Panteão: {e}")

def modulo_comercial():
    limpar_terminal()
    print("--- GERADOR COMERCIAL & CHECKOUT INTELIGENTE ---")
    
    print("\nEscolha a Solução:")
    print("1. Desenvolvimento de App / Web / MVP")
    print("2. Automação de Atendimento / IA")
    print("3. Parceria Estratégica / Patrocínio")
    tipo_esc = input("Opção (1-3): ").strip()
    
    tipos = {
        "1": "Desenvolvimento de Solução Mobile/Web de Alta Performance",
        "2": "Implementação de Automação Comercial com IA",
        "3": "Parceria Estratégica e Patrocínio de Marca"
    }
    tipo = tipos.get(tipo_esc, "Solução Tecnológica Personalizada")
    
    cliente = input("Nome do cliente ou empresa: ").strip()
    valor = input("Valor do projeto (ex: R$ 1.500): ").strip()
    
    print("\nEscolha a Forma de Pagamento:")
    print("1. Mercado Pago (Link Direto / Pix / Cartão)")
    print("2. Kiwify (Checkout de Serviços/Infoprodutos)")
    print("3. Banco do Brasil (TED / Pix Direto)")
    print("4. Caixa Econômica Federal (Pix / Conta)")
    pag_esc = input("Opção (1-4): ").strip()
    
    pagamentos = {
        "1": "Link de Pagamento via Mercado Pago",
        "2": "Checkout Seguro via Kiwify",
        "3": "TED ou PIX - Banco do Brasil",
        "4": "PIX ou Transferência - Caixa Econômica Federal"
    }
    pagamento = pagamentos.get(pagamentos.get(pag_esc), "PIX ou Transferência Bancária")
    
    print("\n" + "=" * 60)
    print(f"       PROPOSTA COMERCIAL PARA: {cliente.upper()}")
    print("=" * 60)
    print(f"\n*Copy para Instagram / Direct:*")
    print(f"Fala {cliente}, beleza? Analisei teu cenário e preparei a solução ideal: *{tipo}*.")
    print(f"O investimento fechado para essa entrega é de *{valor}*, facilitado via *{pagamento}*.")
    print("Me dá o 'ok' que te envio os detalhes e começamos ainda hoje!")
    print("=" * 60)

if __name__ == "__main__":
    while True:
        limpar_terminal()
        menu_principal()
        opcao = input("\nEscolhe a tua ação (1-3): ").strip()
        
        if opcao == "1":
            invocar_conselho()
            input("\nPressiona Enter para voltar ao menu...")
        elif opcao == "2":
            modulo_comercial()
            input("\nPressiona Enter para voltar ao menu...")
        elif opcao == "3":
            print("\nO Valhalla favorece os que agem. Até à próxima batalha!")
            break
        else:
            input("\nOpção inválida! Pressiona Enter para tentar novamente.")
