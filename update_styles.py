import sys

def replace_file(path, content):
    with open(path, 'w') as f:
        f.write(content.strip() + "\n")

index_css = """
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap');

:root {
  /* Light Theme - Modern Refined */
  --bg-primary: #f9fafb;
  --bg-secondary: #ffffff;
  --text-primary: #111827;
  --text-secondary: #4b5563;
  --text-tertiary: #9ca3af;
  --accent: #4f46e5;
  --accent-hover: #4338ca;
  --secondary: #ec4899;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --border: #e5e7eb;
  --border-focus: #c7d2fe;
  
  --card-bg: #ffffff;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  --card-shadow-hover: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'Fira Code', 'Source Code Pro', monospace;
}

[data-theme="dark"] {
  /* Dark Theme - Midnight / Indigo */
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-tertiary: #64748b;
  --accent: #6366f1;
  --accent-hover: #818cf8;
  --secondary: #f472b6;
  --success: #34d399;
  --warning: #fbbf24;
  --error: #f87171;
  --border: #334155;
  --border-focus: #475569;
  
  --card-bg: #1e293b;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --card-shadow-hover: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  color: var(--accent);
  transition: color 0.2s ease;
}

a:hover {
  color: var(--accent-hover);
}

button {
  cursor: pointer;
  font-family: var(--font-sans);
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-tertiary);
}
"""

question_card_css = """
.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--card-shadow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), var(--secondary));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--card-shadow-hover);
  border-color: var(--border-focus);
}

.card:hover::before {
  opacity: 1;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.25rem 1.25rem 0.5rem;
}

.categoryTag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  background-color: var(--bg-primary);
  color: var(--accent);
  border: 1px solid rgba(79, 70, 229, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
}

[data-theme="dark"] .categoryTag {
  background-color: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.2);
}

.card:hover .categoryTag {
  background-color: var(--accent);
  color: white;
  border-color: var(--accent);
}

.reviewBtn {
  background: none;
  border: none;
  color: var(--text-tertiary);
  padding: 0.4rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
}

.reviewBtn:hover {
  color: var(--success);
  transform: scale(1.1);
  background-color: rgba(16, 185, 129, 0.1);
}

.reviewed {
  color: var(--success);
  background-color: rgba(16, 185, 129, 0.1);
}

.cardLink {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.75rem 1.25rem 1.25rem;
  color: inherit;
  text-decoration: none;
}

.title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.statement {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.cardFooter {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  border-top: 1px solid var(--border);
  padding-top: 1rem;
}

.viewLink {
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: gap 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card:hover .viewLink {
  gap: 0.6rem;
}
"""

home_page_css = """
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: var(--card-bg);
  border-radius: 24px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.hero::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
  z-index: 0;
  pointer-events: none;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
  letter-spacing: -0.025em;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.filterToggle {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}

.toggleBtn {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.75rem 1.75rem;
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.toggleBtn:hover {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1);
  transform: translateY(-1px);
}

.activeToggle {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
}

.activeToggle:hover {
  background: var(--accent-hover);
  color: white;
}


.controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  background: var(--card-bg);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.refreshBtn {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.65rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.refreshBtn:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: rgba(79, 70, 229, 0.05);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.empty {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
  background: var(--card-bg);
  border-radius: 16px;
  border: 1px dashed var(--border);
}

.empty p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.empty button {
  background: var(--accent);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
}

.empty button:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 8px -1px rgba(79, 70, 229, 0.3);
}

@media (max-width: 768px) {
  .title {
    font-size: 2.25rem;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .hero {
    padding: 2rem 1rem;
    border-radius: 16px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 1rem;
  }

  .title {
    font-size: 1.75rem;
  }
  
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
}
"""

navbar_css = """
.navbar {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(var(--bg-secondary-rgb, 255, 255, 255), 0.85);
}

[data-theme="dark"] .navbar {
  background: rgba(30, 41, 59, 0.85);
}

.navContent {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.025em;
  transition: opacity 0.2s ease;
}

.brand:hover {
  opacity: 0.8;
}

.icon {
  color: var(--accent);
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.stats {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
}

.statItem {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--text-secondary);
  font-weight: 500;
  background: var(--bg-primary);
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid var(--border);
}

.statItem svg {
  color: var(--accent);
}

.statItem.success svg {
  color: var(--success);
}

.themeToggle {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.themeToggle:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: rotate(15deg);
}

@media (max-width: 640px) {
  .navContent {
    padding: 0.75rem 1rem;
  }
  
  .stats {
    display: none;
  }
}
"""

question_detail_css = """
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.backLink {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-weight: 600;
  margin-bottom: 2rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.backLink:hover {
  color: var(--accent);
  transform: translateX(-4px);
}

.header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.categoryTag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  background-color: rgba(79, 70, 229, 0.1);
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.3;
  letter-spacing: -0.025em;
}

.section {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--card-shadow);
}

.sectionTitle {
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

.sectionTitle svg {
  color: var(--accent);
}

.problemText {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

@media (max-width: 640px) {
  .container {
    padding: 1rem 1rem 3rem;
  }
  
  .title {
    font-size: 1.75rem;
  }
  
  .section {
    padding: 1.5rem;
    border-radius: 12px;
  }
}
"""

search_bar_css = """
.searchContainer {
  position: relative;
  flex: 1;
  max-width: 600px;
  width: 100%;
}

.searchIcon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  pointer-events: none;
  transition: color 0.2s ease;
}

.searchInput {
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

.searchInput:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.searchInput:focus + .searchIcon {
  color: var(--accent);
}

.searchInput::placeholder {
  color: var(--text-tertiary);
}

.clearBtn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-tertiary);
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.clearBtn:hover {
  color: var(--error);
  background-color: rgba(239, 68, 68, 0.1);
}
"""

code_block_css = """
.codeContainer {
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

.langLabel {
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

.copyBtn.copied {
  color: var(--success);
  border-color: var(--success);
  background-color: rgba(16, 185, 129, 0.05);
}

.codeContent {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Custom override for syntax highlighter */
.codeContent pre {
  margin: 0 !important;
  padding: 1.25rem !important;
  background: transparent !important;
}
"""

viva_accordion_css = """
.accordion {
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

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: none;
  border: none;
  text-align: left;
  color: var(--text-primary);
  font-size: 1.05rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.header:hover {
  background-color: rgba(79, 70, 229, 0.03);
}

.header.open {
  background-color: rgba(79, 70, 229, 0.05);
  color: var(--accent);
}

.icon {
  color: var(--text-tertiary);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.header.open .icon {
  transform: rotate(180deg);
  color: var(--accent);
}

.content {
  padding: 0 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--bg-primary);
}

.content.open {
  padding: 0 1.25rem 1.25rem;
  max-height: 500px;
  opacity: 1;
  border-top: 1px solid rgba(79, 70, 229, 0.1);
  margin-top: 0.5rem;
  padding-top: 1rem;
}
"""

replace_file('src/index.css', index_css)
replace_file('src/components/QuestionCard.module.css', question_card_css)
replace_file('src/pages/HomePage.module.css', home_page_css)
replace_file('src/components/Navbar.module.css', navbar_css)
replace_file('src/pages/QuestionDetailPage.module.css', question_detail_css)
replace_file('src/components/SearchBar.module.css', search_bar_css)
replace_file('src/components/CodeBlock.module.css', code_block_css)
replace_file('src/components/VivaAccordion.module.css', viva_accordion_css)

