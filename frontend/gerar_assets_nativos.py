import os
from PIL import Image

print("A gerar recursos nativos do Android...")

# Criar imagem base do ícone
icon = Image.new("RGB", (512, 512), color="#0F172A")
icon.save("icon_base.png")

mipmap_sizes = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192
}

res_dir = "android/app/src/main/res"
# Garante que a estrutura de pastas do Android existe
os.makedirs(res_dir, exist_ok=True)

for folder, size in mipmap_sizes.items():
    folder_path = os.path.join(res_dir, folder)
    os.makedirs(folder_path, exist_ok=True)
    
    resized_icon = icon.resize((size, size), Image.Resampling.LANCZOS)
    resized_icon.save(os.path.join(folder_path, "ic_launcher.png"))
    resized_icon.save(os.path.join(folder_path, "ic_launcher_round.png"))
    resized_icon.save(os.path.join(folder_path, "ic_launcher_foreground.png"))
    
print("Ícones nativos gerados e aplicados com sucesso!")
