import os
import re

files_to_check = [
    r'd:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\ux_design\index.html',
    r'd:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\ux_design_cleanroom\index.html',
    r'd:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\ux_design.html',
    r'd:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\ux_design_cleanroom.html',
    r'd:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\ux-design.html',
    r'd:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\implementation\ux_plan\index.html',
]

for filepath in files_to_check:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        print(f"=== File: {filepath} ===")
        # Find 3. UX컨설팅 or consulting section
        idx = content.find('3. UX컨설팅')
        if idx != -1:
            snippet = content[idx:idx+2500]
            snippet_clean = re.sub(r'src="data:image/[^"]+"', 'src="BASE64"', snippet)
            print(snippet_clean)
        else:
            print("Section '3. UX컨설팅' not found")
