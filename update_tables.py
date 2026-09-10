import sys

def replace_file(path, content):
    with open(path, 'w') as f:
        f.write(content.strip() + "\n")

pin_table_css = """
.container {
  margin-bottom: 2.5rem;
}

.tableWrapper {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  background: var(--card-bg);
}

.table th {
  background: var(--bg-primary);
  color: var(--text-secondary);
  font-weight: 700;
  padding: 1rem 1.25rem;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid var(--border);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
}

.table tbody tr {
  transition: background-color 0.2s ease;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table tbody tr:hover {
  background: rgba(79, 70, 229, 0.02);
}

.pinCode {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  background: rgba(79, 70, 229, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  color: var(--accent);
  font-weight: 600;
  display: inline-block;
}

@media (max-width: 480px) {
  .table th,
  .table td {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
}
"""

code_explanation_css = """
.container {
  margin-bottom: 2.5rem;
}

.list {
  list-style: none;
  counter-reset: explanation-counter;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  counter-increment: explanation-counter;
  padding: 1.25rem;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border);
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.item:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.08);
  transform: translateX(4px);
}

.item::before {
  content: counter(explanation-counter);
  position: absolute;
  top: 1.25rem;
  left: -1rem;
  background: var(--bg-primary);
  color: var(--accent);
  border: 2px solid var(--accent);
  font-size: 0.75rem;
  font-weight: 800;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
}

.code {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-primary);
  background: var(--bg-primary);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow-x: auto;
  border: 1px solid var(--border);
  font-weight: 600;
}

.explanation {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .item {
    margin-left: 1rem;
  }
}
"""

important_snippets_css = """
.container {
  margin-bottom: 2.5rem;
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

.code {
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

replace_file('src/components/PinConnectionTable.module.css', pin_table_css)
replace_file('src/components/CodeExplanationList.module.css', code_explanation_css)
replace_file('src/components/ImportantSnippets.module.css', important_snippets_css)
