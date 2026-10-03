import os
from PIL import Image

print("A processar a nova imagem oficial do Panteão Nórdico IA...")

# Caminho onde a imagem foi guardada nos downloads ou assets
source_image_path = "/storage/emulated/0/Download/app-debug-apk (7)/icon.jpg"

if not os.path.exists(source_image_path):
    # Tenta caminho alternativo caso esteja na pasta corrente
    source_image_path = "icon.jpg"

img = Image.open(source_image_path).convert("RGB")

# Garante que a pasta assets existe e guarda o ícone base
os.makedirs("assets", exist_ok=True)
img.save("assets/icon.png")

mipmap_sizes = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192
}

res_dir = "android/app/src/main/res"
os.makedirs(res_dir, exist_ok=True)

for folder, size in mipmap_sizes.items():
    folder_path = os.path.join(res_dir, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    resized_icon = img.resize((size, size), Image.Resampling.LANCZOS)
    resized_icon.save(os.path.join(folder_path, "ic_launcher.png"))
    resized_icon.save(os.path.join(folder_path, "ic_launcher_round.png"))
    resized_icon.save(os.path.join(folder_path, "ic_launcher_foreground.png"))
    
print("Ícones nativos atualizados com sucesso com a nova imagem!")
