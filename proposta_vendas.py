from fpdf import FPDF

class SalesPDF(FPDF):
    def header(self):
        self.set_font('helvetica', 'B', 15)
        self.set_text_color(15, 23, 42)
        self.cell(190, 8, 'DOSSIÊ DE ACELERAÇÃO DIGITAL & IA', 0, 1, 'C')
        self.set_font('helvetica', 'I', 10)
        self.set_text_color(100, 116, 139)
        self.cell(190, 6, 'Soluções de Alta Performance e Automação para Negócios', 0, 1, 'C')
        self.ln(4)

    def footer(self):
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(150, 150, 150)
        self.cell(190, 10, f'Proposta Comercial Exclusiva - Página {self.page_no()}', 0, 0, 'C')

pdf = SalesPDF()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.set_font('helvetica', '', 11)

secoes = [
    ("1. O Problema que Resolvemos", [
        "Sistemas travados por bugs críticos de build (React Native / Expo).",
        "Gargalos operacionais no atendimento ao cliente (falta de automação no WhatsApp).",
        "Falta de infraestrutura escalável e rápida para lançamento de MVPs e Apps."
    ]),
    ("2. Nossas Soluções Imediatas (Sprint de 24h)", [
        "Auditoria e Correção de Bugs: Destravamos seu código, rotas ou Supabase em tempo recorde.",
        "Assistentes de IA & Automação: Bots inteligentes que qualificam leads e vendem 24h por dia.",
        "Aplicações Web & PWA: Desenvolvimento ágil e hospedagem na nuvem com custo fixo zero."
    ]),
    ("3. Vantagens Competitivas", [
        "Velocidade de Execução: Entrega expressa focada em resultados práticos.",
        "Stack Moderna: React, TypeScript, Vite, Supabase, Vercel e APIs de IA de ponta.",
        "Suporte Direto: Comunicação ágil e sem intermediários burocráticos."
    ]),
    ("4. Condições Comerciais para Hoje", [
        "Pacotes de Intervenção Rápida a partir de R$ 300 a R$ 500 por escopo fechado.",
        "Implementação imediata com início nas próximas horas após o fechamento.",
        "Contato Direto: Vamos alinhar sua demanda e colocar sua solução no ar hoje."
    ])
]

for titulo, itens in secoes:
    pdf.set_font('helvetica', 'B', 12)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(190, 8, titulo, 0, 1, 'L')
    
    pdf.set_font('helvetica', '', 10)
    pdf.set_text_color(51, 65, 85)
    for item in itens:
        pdf.multi_cell(190, 6, f"- {item}")
    pdf.ln(4)

pdf.output("proposta_comercial_vendas.pdf")
print("Material de vendas gerado com sucesso: proposta_comercial_vendas.pdf")
