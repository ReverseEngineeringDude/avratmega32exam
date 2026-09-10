import sys
import re

def replace_file(path, content):
    with open(path, 'w') as f:
        f.write(content.strip() + "\n")

with open('src/pages/QuestionDetailPage.module.css', 'r') as f:
    lines = f.read()

btn_css = """
.reviewToggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.reviewToggle:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1);
}

.reviewToggle svg {
  transition: transform 0.2s ease;
}

.reviewToggle:hover svg {
  transform: scale(1.1);
}

.reviewedBtn {
  background: rgba(16, 185, 129, 0.1) !important;
  border-color: var(--success) !important;
  color: var(--success) !important;
  box-shadow: none !important;
}

.reviewedBtn:hover {
  background: rgba(16, 185, 129, 0.15) !important;
  transform: translateY(0) !important;
}
"""

new_css = re.sub(r'\.reviewToggle \{.*\.reviewedBtn\.reviewed \{[^\}]*\}', btn_css.strip(), lines, flags=re.DOTALL)

replace_file('src/pages/QuestionDetailPage.module.css', new_css)
