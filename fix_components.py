import sys

def replace_file(path, content):
    with open(path, 'w') as f:
        f.write(content.strip() + "\n")

code_block_css = """
.container {
  margin-top: 1rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
}

.title {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.copyBtn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
  background-color: var(--bg-primary);
}

.copyBtn:hover {
  color: var(--accent);
  border-color: var(--accent);
  background-color: rgba(79, 70, 229, 0.05);
}

/* We don't have .copied in jsx grep, but let's leave it in case */
.copyBtn.copied {
  color: var(--success);
  border-color: var(--success);
  background-color: rgba(16, 185, 129, 0.05);
}

/* Using global rules to target syntax highlighter if we didn't use a local class */
.container pre {
  margin: 0 !important;
  padding: 1.25rem !important;
  background: transparent !important;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.5;
}
"""

viva_accordion_css = """
.container {
  margin-bottom: 2.5rem;
}

.heading {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.75rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-primary);
  overflow: hidden;
  transition: all 0.2s ease;
}

.item:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.08);
}

.item.open {
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
}

.question {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: none;
  border: none;
  text-align: left;
  color: var(--text-primary);
  transition: background-color 0.2s ease;
}

.question:hover {
  background-color: rgba(79, 70, 229, 0.03);
}

.open .question {
  background-color: rgba(79, 70, 229, 0.05);
}

.qNumber {
  color: var(--accent);
  font-weight: 800;
  font-size: 1rem;
}

.qText {
  flex: 1;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.4;
}

.chevron {
  color: var(--text-tertiary);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.open .chevron {
  transform: rotate(180deg);
  color: var(--accent);
}

.answer {
  padding: 0 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--bg-primary);
}

.open .answer {
  padding: 0 1.25rem 1.25rem;
  max-height: 1000px;
  opacity: 1;
  border-top: 1px solid rgba(79, 70, 229, 0.1);
  margin-top: 0.5rem;
  padding-top: 1rem;
}

.memorizeLabel {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
}

.checkbox {
  display: none;
}

.memorizedIcon {
  color: var(--success);
}

.notMemorizedIcon {
  color: var(--text-tertiary);
}
"""

important_snippets_css = """
.container {
  margin-bottom: 2.5rem;
}

.heading {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.75rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.card {
  background: rgba(245, 158, 11, 0.05);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 12px;
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

[data-theme="dark"] .card {
  background: rgba(251, 191, 36, 0.05);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.4);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  background: var(--warning);
}

.iconWrapper {
  margin-bottom: 0.75rem;
  color: var(--warning);
}

.snippet {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--warning);
  font-weight: 700;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed rgba(245, 158, 11, 0.3);
  word-break: break-all;
}

.note {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}
"""

replace_file('src/components/CodeBlock.module.css', code_block_css)
replace_file('src/components/VivaAccordion.module.css', viva_accordion_css)
replace_file('src/components/ImportantSnippets.module.css', important_snippets_css)
