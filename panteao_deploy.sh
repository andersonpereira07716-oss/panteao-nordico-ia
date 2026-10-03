echo "🚀 [1/3] A verificar dependências e a iniciar serviços locais..."

echo "🌐 [2/3] A iniciar o Cloudflare Tunnel para expor a API de forma segura..."
cloudflared tunnel --url http://localhost:3000 &

echo "📱 [3/3] A preparar compilação Capacitor para APK Android..."
if [ -d "android" ]; then
  npx cap update
  npx cap copy
  echo "✅ Projeto sincronizado com o Capacitor! Podes abrir o Android Studio com 'npx cap open android' para gerar o APK final."
else
  echo "⚠️ Pasta android não detetada. Executa 'npx cap init' caso ainda não tenhas configurado."
fi

echo "✨ Processo concluído! O teu Panteão Nórdico IA está pronto para o próximo nível."
