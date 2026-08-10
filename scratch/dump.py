import sys
import re

with open(r'd:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\ux_design_cleanroom\index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "3. UX컨설팅" in line:
        start_idx = i
        break

content = ''.join(lines[start_idx:start_idx+100])
content = re.sub(r'src=\"data:image/[^\"]+\"', 'src=\"[BASE64_IMAGE]\"', content)
print(content)
