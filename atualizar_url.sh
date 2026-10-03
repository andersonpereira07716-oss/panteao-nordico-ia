echo "🔍 A atualizar o endpoint do backend no Frontend..."

# Criar ou atualizar o ficheiro .env na pasta frontend com o URL do Cloudflare
cat << 'ENV' > frontend/.env
VITE_API_URL=https://distinguished-preparing-dad-soldiers.trycloudflare.com
ENV

echo "✅ Ficheiro .env do frontend atualizado com sucesso!"
echo "📱 A sincronizar assets com o Capacitor..."
cd frontend && npm run build && cd ..
npx cap copy

echo "✨ Tudo pronto! O teu frontend está agora ligado ao túnel seguro do Cloudflare."
