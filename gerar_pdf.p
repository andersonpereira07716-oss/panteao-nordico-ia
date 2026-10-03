from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        # Cabeçalho do Relatório
        self.set_font('helvetica', 'B', 14)
        self.set_text_color(30, 41, 59)
        self.cell(0, 10, 'RELATÓRIO TÉCNICO: PANTEÃO NÓRDICO', 0, 1, 'C')
        self.set_font('helvetica', 'I', 10)
        self.set_text_color(100, 116, 139)
        self.cell(0, 6, 'Plataforma de IA e Automação de Negócios', 0, 1, 'C')
        self.ln(5)

    def footer(self):
        # Rodapé
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f'Página {self.page_no()}', 0, 0, 'C')

# Criando o objeto PDF
pdf = PDF()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.set_font('helvetica', '', 11)

# Conteúdo do Relatório
conteudo = [
    ("1. Visão Geral da Arquitetura", [
        "Hospedagem & Deploy: Sincronizado via GitHub e implantado na Vercel.",
        "Ambiente Móvel: Rodando no Android através do Termux, Expo e React Native.",
        "Persistência de Dados: Gerenciamento local otimizado via AsyncStorage.",
        "Notificações: Sistema integrado com Expo Notifications para rituais diários."
    ]),
    ("2. O Board Executivo (Divindades)", [
        "ODIN (Oráculo Supremo): Visão estratégica e arquitetura de modelos comerciais.",
        "THOR (Força de Combate): Engenharia de software, bugs em React Native e Supabase.",
        "FREYA (Magia & Conteúdo): Copywriting, funis de vendas e e-books para Amazon KDP.",
        "LOKI (Mestre das Ilusões): Growth hacking e estratégias de tráfego orgânico.",
        "HEIMDALLr (Guarda da Bifrost): Segurança, integridade e monitoramento de rede."
    ]),
    ("3. Módulos Operacionais", [
        "Conselho: Central de comandos unificada com múltiplas IAs coordenadas.",
        "Pergaminhos de Comando: Repositório local para gravação e persistência de prompts.",
        "Modo de Batalha: Interface otimizada para cópia rápida de snippets de código.",
        "Radar da Bifrost: Monitoramento de saúde e latência de rede.",
        "Rituais: Configuração de notificações push para checagens diárias."
    ]),
    ("4. Estratégias de Monetização", [
        "Prestação de Serviços Rápidos: Diagnóstico e correção de falhas técnicas.",
        "Automação Comercial: Implantação de assistentes de IA para comércios locais.",
        "Infoprodutos: Criação e formatação automatizada de conteúdos em escala."
    ])
]

for titulo, itens in conteudo:
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 8, titulo, 0, 1, 'L')
    
    pdf.set_font('helvetica', '', 10)
    pdf.set_text_color(51, 65, 85)
    for item in itens:
       pdf.multi_cell(190, 6, f"- {item}")

    pdf.ln(4)

# Salvando o arquivo PDF
pdf.output("panteao_nordico_relatorio.pdf")
print("PDF gerado com sucesso: panteao_nordico_relatorio.pdf")
