import os
from google import genai

client = genai.Client()

def limpar_terminal():
    os.system('clear')

def gravar_historico(conteudo):
    with open("historico_valhalla.txt", "a", encoding="utf-8") as f:
        f.write(conteudo + "\n" + "-"*40 + "\n")

def menu_principal():
    print("=" * 60)
    print("    🔥 PANTEÃO NÓRDICO - ECOSSISTEMA TOTAL & AUTÔNOMO 🔥")
    print("=" * 60)
    print("1. 🧠 Consulta ao Conselho (Odin, Thor & Freya)")
    print("2. ⚡ Forja de Thor (Geração de Código Automatizado)")
    print("3. 🎯 Gerador Comercial & Precificação de ROI")
    print("4. 🛠️ Oráculo de Erros (Diagnóstico de Bugs no Termux)")
    print("5. 📜 Pergaminho de Mimir (Ver Histórico Salvo)")
    print("6. 🚪 Sair para o Terminal")
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
        resposta_texto = response.text
        print("\n" + "=" * 50)
        print(resposta_texto)
        print("=" * 50)
        
        # Registo automático no Pergaminho de Mimir
        gravar_historico(f"CONSULTA AO CONSELHO:\nDesafio: {pergunta}\nResposta:\n{resposta_texto}")
        print("\n[Mimir registou esta sabedoria no Pergaminho com sucesso!]")
    except Exception as e:
        print(f"\nErro ao invocar o Panteão: {e}")

def forja_thor():
    limpar_terminal()
    print("--- FORJA DE THOR (GERADOR DE CÓDIGO) ---")
    necessidade = input("Descreve o componente ou script que o Thor deve forjar (ex: 'Tela de login em React Native com Tailwind'): ").strip()
    
    prompt = f"""
    Atue como Thor, o deus ferreiro e arquiteto de software do Panteão Nórdico.
    Escreva o código limpo, estruturado e pronto para uso no Termux para a seguinte solicitação: '{necessidade}'.
    Forneça apenas o código bem comentado e instruções breves de implementação.
    """
    
    print("\nO martelo bate na bigorna... Forjando código...")
    try:
        response = client.models.generate_content(
            model='gemini-3.8-flash',
            contents=prompt,
        )
        codigo = response.text
        print("\n" + "=" * 50)
        print(codigo)
        print("=" * 50)
        
        gravar_historico(f"FORJA DE THOR:\nSolicitação: {necessidade}\nCódigo:\n{codigo}")
    except Exception as e:
        print(f"\nErro na Forja: {e}")

def modulo_comercial():
    limpar_terminal()
    print("--- GERADOR COMERCIAL & PRECIFICAÇÃO DE ROI ---")
    
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
    horas = float(input("Quantas horas estimas gastar no projeto? ").strip() or "10")
    valor_hora = float(input("Qual o valor pretendido por hora (ex: 50)? ").strip() or "50")
    
    total = horas * valor_hora
    valor_formatado = f"R$ {total:,.2f}"
    
    print("\nEscolha a Forma de Pagamento Principal:")
    print("1. Mercado Pago (Link / Pix / Cartão)")
    print("2. Kiwify (Checkout Automatizado)")
    print("3. Banco do Brasil (TED / Pix Direto)")
    print("4. Caixa Econômica Federal (Pix / Conta)")
    pag_esc = input("Opção (1-4): ").strip()
    
    pagamentos = {
        "1": "Link de Pagamento via Mercado Pago",
        "2": "Checkout Seguro via Kiwify",
        "3": "TED ou PIX - Banco do Brasil",
        "4": "PIX ou Transferência - Caixa Econômica Federal"
    }
    pagamento = pagamentos.get(pag_esc, "PIX ou Transferência Bancária")
    
    proposta = f"""
--- PROPOSTA COMERCIAL PARA: {cliente.upper()} ---
Serviço: {tipo}
Investimento Calculado (ROI): {valor_formatado} (Baseado em {horas}h de execução)
Método de Quitação: {pagamento}

*Copy para Direct / Instagram:*
"Fala {cliente}, beleza? Analisei teu cenário e estruturei a solução ideal: {tipo}. 
O investimento fechado para essa entrega de alta performance é de {valor_formatado}, com facilidade de pagamento via {pagamento}. 
Me dá o 'ok' que te envio os detalhes e começamos ainda hoje!"
    """
    print(proposta)
    gravar_historico(proposta)

def oraculo_erros():
    limpar_terminal()
    print("--- ORÁCULO DE ERROS (DIAGNÓSTICO NO TERMUX) ---")
    erro_usuario = input("Cola aqui o traceback ou a mensagem de erro que apareceu no teu terminal: ").strip()
    
    prompt = f"""
    Atue como especialista técnico em Python, Node.js e ambiente Termux no Android.
    Analise o seguinte erro reportado pelo desenvolvedor e forneça a solução exata e direta para resolvê-lo:
    '{erro_usuario}'
    """
    
    print("\nConsultando os registros ancestrais do erro...")
    try:
        response = client.models.generate_content(
            model='gemini-3.8-flash',
            contents=prompt,
        )
        solucao = response.text
        print("\n" + "=" * 50)
        print(solucao)
        print("=" * 50)
        gravar_historico(f"ORÁCULO DE ERROS:\nErro: {erro_usuario}\nSolução:\n{solucao}")
    except Exception as e:
        print(f"\nErro ao consultar o Oráculo: {e}")

def ler_historico():
    limpar_terminal()
    print("--- PERGAMINHO DE MIMIR (REGISTROS) ---")
    if os.path.exists("historico_valhalla.txt"):
        with open("historico_valhalla.txt", "r", encoding="utf-8") as f:
            print(f.read())
    else:
        print("O pergaminho ainda está em branco. Nenhuma ação foi registada hoje.")

if __name__ == "__main__":
    while True:
        menu_principal()
        opcao = input("\nEscolhe a tua ação (1-6): ").strip()
        
        if opcao == "1":
            invocar_conselho()
        elif opcao == "2":
            forja_thor()
        elif opcao == "3":
            modulo_comercial()
        elif opcao == "4":
            oraculo_erros()
        elif opcao == "5":
            ler_historico()
        elif opcao == "6":
            print("\nO Valhalla favorece os que agem. Até à próxima batalha!")
            break
        else:
            print("\nOpção inválida!")
        
        input("\nPressiona Enter para voltar ao menu principal...")
        limpar_terminal()
