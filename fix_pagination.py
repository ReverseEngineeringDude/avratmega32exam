import sys

def replace_file(path, content):
    with open(path, 'w') as f:
        f.write(content.strip() + "\n")

with open('src/pages/QuestionDetailPage.module.css', 'r') as f:
    lines = f.read()

import re

# find pagination section
# It starts around .pagination and ends before .mobileBack

pagination_css = """
.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 3.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border);
  gap: 1.5rem;
}

.pageLink {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: 16px;
  text-decoration: none;
  width: 50%;
  background: var(--card-bg);
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.pageLink:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(79, 70, 229, 0.08);
}

.pageLink > div {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
}

.pageLinkRight {
  justify-content: flex-end;
  text-align: right;
}

.pageLinkRight > div {
  align-items: flex-end;
}

.pageLinkLabel {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 800;
}

.pageLinkTitle {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pageLink svg {
  color: var(--text-tertiary);
  transition: transform 0.2s ease, color 0.2s ease;
  flex-shrink: 0;
}

.pageLink:hover svg {
  color: var(--accent);
}

.pageLink:first-child:hover svg {
  transform: translateX(-4px);
}

.pageLinkRight:hover svg {
  transform: translateX(4px);
}
"""

new_css = re.sub(r'\.pagination \{.*\.pageLinkTitle \{[^\}]*\}', pagination_css.strip(), lines, flags=re.DOTALL)

replace_file('src/pages/QuestionDetailPage.module.css', new_css)
