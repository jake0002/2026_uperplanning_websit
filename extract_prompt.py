import json

transcript_path = r"C:\Users\jake\.gemini\antigravity-ide\brain\49e0cae8-390b-4ded-9e44-5d5be6707522\.system_generated\logs\transcript_full.jsonl"
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'USER_INPUT':
            content = data.get('content', '')
            if 'UX기획 페이퍼보드 협업 장면' in content:
                print(content[:500])
                print('...')
                print(content[-500:])
                with open(r'd:\Dropbox\03_super planning\00_슈퍼플래닝\2026_uperplanning_website\extracted_prompt.txt', 'w', encoding='utf-8') as out:
                    out.write(content)
