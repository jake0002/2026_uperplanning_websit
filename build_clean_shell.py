import os
import re

src_path = r"d:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\ux_research\index.html"
dest_dir = r"d:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\ux_design_cleanroom_v2"
dest_path = os.path.join(dest_dir, "index.html")

os.makedirs(dest_dir, exist_ok=True)

with open(src_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove JSON-LD
content = re.sub(r'<script type="application/ld\+json">.*?</script>', '', content, flags=re.DOTALL)

# Empty the TOC
content = re.sub(r'(<ul class="tree-list toc">).*?(</ul>)', r'\1\n          \2', content, flags=re.DOTALL)

# Empty the main content pane
content = re.sub(r'(<main class="main-content-pane">).*?(</main>)', r'\1\n        \2', content, flags=re.DOTALL)

# Update some labels just in case
content = content.replace("UX리서치 | 슈퍼플래닝 UX스튜디오", "UX기획/디자인 | 슈퍼플래닝 UX스튜디오")
content = content.replace(r"C:\SUPERPLANNING\UX_서비스\UX_리서치", r"C:\SUPERPLANNING\UX_서비스\UX_기획_디자인")
content = content.replace("UX서비스 &gt; UX리서치", "UX서비스 &gt; UX기획/디자인")

with open(dest_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Shell created successfully at", dest_path)
