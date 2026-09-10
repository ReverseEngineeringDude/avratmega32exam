import sys

def replace_file(path, content):
    with open(path, 'w') as f:
        f.write(content.strip() + "\n")

search_bar_css = """
.container {
  position: relative;
  flex: 1;
  max-width: 600px;
  width: 100%;
}

.icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  pointer-events: none;
  transition: color 0.2s ease;
}

.input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-family: var(--font-sans);
  transition: all 0.2s ease;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
}

.input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.input:focus + .icon {
  color: var(--accent);
}

.input::placeholder {
  color: var(--text-tertiary);
}
"""
replace_file('src/components/SearchBar.module.css', search_bar_css)
