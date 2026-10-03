from fpdf import FPDF

class AutoPDF(FPDF):
    def header(self):
        self.set_font('helvetica', 'B', 14)
        self.set_text_color(15, 23, 42)
        self.cell(190, 8, 'PROPOSTA COMERCIAL & ECOSSISTEMA TECNICO', 0, 1, 'C')
        self.set_font('helvetica', 'I', 10)
        self.set_text_color(100, 116, 139)
        self.cell(190, 6, 'Automacao, Aplicativos Mobile e Solucoes com IA', 0, 1, 'C')
        self.ln(4)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(150, 150, 150)
        self.cell(190, 10, f'Documento Gerado Automaticamente - Pagina {self.page_no()}', 0, 0, 'C')

pdf = AutoPDF()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.set_font('helvetica', '', 11)

dados = [
    ("1. Solucoes de Alta Performance", [
        "Desenvolvimento mobile rapido com React Native e Expo.",
        "Estruturacao de bancos de dados seguros e escalaveis com Supabase.",
        "Implantacao e hospedagem continua integrada via Vercel e GitHub."
    ]),
    ("2. Automacao Comercial com Inteligencia Artificial", [
        "Implementacao de assistentes inteligentes para atendimento e qualificacao de leads.",
        "Scripts automatizados para otimizacao de fluxos de trabalho e operacoes digitais.",
        "Entrega agil focada no retorno imediato sobre o investimento."
    ])
]

for titulo, itens in dados:
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(190, 8, titulo, 0, 1, 'L')
    pdf.set_font('helvetica', '', 10)
    pdf.set_text_color(51, 65, 85)
    for item in itens:
        pdf.multi_cell(190, 6, f"- {item}")
    pdf.ln(4)

pdf.output("proposta_automatizada.pdf")
print("Sucesso: proposta_automatizada.pdf gerada com sucesso!")
