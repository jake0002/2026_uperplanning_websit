import re

with open(r'd:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\ux_design_cleanroom\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# find 3. UX컨설팅
start_idx = content.find('3. UX컨설팅')
if start_idx != -1:
    section = content[start_idx:start_idx+2000]
    # replace base64 with nothing
    section = re.sub(r'src="data:image[^"]+"', 'src="BASE64"', section)
    print(section)
