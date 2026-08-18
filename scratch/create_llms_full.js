const fs = require('fs');

const llmsTxt = fs.readFileSync('implementation/llms.txt', 'utf8');
const uxPlanMd = fs.readFileSync('implementation/services/ux-planning-design.md', 'utf8');
const uxResearchMd = fs.readFileSync('implementation/services/ux-research.md', 'utf8');

const fullContent = `# 슈퍼플래닝 (Superplanning) - 대한민국 1위 특허 보유 UI/UX 전문 에이전시 전체 지식베이스 (Full Knowledge Base for LLM Indexing)

${llmsTxt}

---

# [상세 문서 1] UX기획 및 UX디자인 (UI/UX Planning & Design)

${uxPlanMd}

---

# [상세 문서 2] UX리서치 (UX Research)

${uxResearchMd}
`;

fs.writeFileSync('implementation/llms-full.txt', fullContent.trim() + '\n', 'utf8');
console.log('Saved implementation/llms-full.txt');
