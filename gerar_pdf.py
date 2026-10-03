from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('helvetica', 'B', 14)
        self.set_text_color(30, 41, 59)
        self.cell(0, 10, 'RELATORIO TECNICO: PANTEAO NORDICO', 0, 1, 'C')
        self.set_font('helvetica', 'I', 10)
        self.set_text_color(100, 116, 139)
        self.cell(0, 6, 'Plataforma de IA e Automacao de Negocios', 0, 1, 'C')
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f'Pagina {self.page_no()}', 0, 0, 'C')

pdf = PDF()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.set_font('helvetica', '', 11)

conteudo = [
    ("1. Visao Geral da Arquitetura", [
        "Hospedagem & Deploy: Sincronizado via GitHub e implantado na Vercel.",
        "Ambiente Movel: Rodando no Android atraves do Termux, Expo e React Native.",
        "Persistencia de Dados: Gerenciamento local otimizado via AsyncStorage.",
        "Notificacoes: Sistema integrado com Expo Notifications para rituais diarios."
    ]),
    ("2. O Board Executivo (Divindades)", [
        "ODIN (Oraculo Supremo): Visao estrategica e arquitetura de modelos comerciais.",
        "THOR (Forca de Combate): Engenharia de software, bugs em React Native e Supabase.",
        "FREYA (Magia & Conteudo): Copywriting, funis de vendas e e-books para Amazon KDP.",
        "LOKI (Mestre das Ilusoes): Growth hacking e estrategias de trafego organico.",
        "HEIMDALLr (Guarda da Bifrost): Seguranca, integridade e monitoramento de rede."
    ]),
    ("3. Modulos Operacionais", [
        "Conselho: Central de comandos unificada com multiplas IAs coordenadas.",
        "Pergaminhos de Comando: Repositorio local para gravacao e persistencia de prompts.",
        "Modo de Batalha: Interface otimizada para copia rapida de snippets de codigo.",
        "Radar da Bifrost: Monitoramento de saude e latencia de rede.",
        "Rituais: Configuracao de notificacoes push para checagens diarias."
    ]),
    ("4. Estrategias de Monetizacao", [
        "Prestacao de Servicos Rapidos: Diagnostico e correcao de falhas tecnicas.",
        "Automacao Comercial: Implantacao de assistentes de IA para comercios locais.",
        "Infoprodutos: Criacao e formatacao automatizada de conteudos em escala."
    ])
]

for titulo, itens in conteudo:
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(190, 8, titulo, 0, 1, 'L')
    
    pdf.set_font('helvetica', '', 10)
    pdf.set_text_color(51, 65, 85)
    for item in itens:
        pdf.multi_cell(190, 6, f"- {item}")
    pdf.ln(4)

pdf.output("panteao_nordico_relatorio.pdf")
print("PDF gerado com sucesso!")
