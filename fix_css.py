import sys

def replace_file(path, content):
    with open(path, 'w') as f:
        f.write(content.strip() + "\n")

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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
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

.logo svg {
  color: var(--accent);
}

.logo:hover {
  opacity: 0.8;
}

.desktopNav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.mobileNav {
  display: none;
  align-items: center;
  gap: 1rem;
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

.menuToggle {
  background: none;
  border: none;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 640px) {
  .container {
    padding: 0.75rem 1rem;
  }
  
  .desktopNav {
    display: none;
  }
  
  .mobileNav {
    display: flex;
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

.categoryBadge {
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
  margin-bottom: 1rem;
}

.problemStatement {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: var(--bg-secondary);
  border-left: 4px solid var(--accent);
  border-radius: 8px;
}

.reviewToggle {
  display: flex;
  align-items: center;
}

.reviewedBtn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.reviewedBtn:hover {
  border-color: var(--success);
  color: var(--success);
}

.reviewedBtn.reviewed {
  background: rgba(16, 185, 129, 0.1);
  border-color: var(--success);
  color: var(--success);
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

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.pageLink {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  text-decoration: none;
  width: calc(50% - 0.5rem);
  background: var(--bg-secondary);
  transition: all 0.2s ease;
}

.pageLink:hover {
  border-color: var(--accent);
  background: var(--bg-primary);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.08);
}

.pageLinkRight {
  align-items: flex-end;
  text-align: right;
}

.pageLinkLabel {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
}

.pageLinkTitle {
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
}

.mobileBack {
  display: none;
  margin-top: 2rem;
  text-align: center;
}

.mobileBackBtn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
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
  
  .pagination {
    flex-direction: column;
    gap: 1rem;
  }
  
  .pageLink {
    width: 100%;
    align-items: flex-start;
    text-align: left;
  }
  
  .mobileBack {
    display: block;
  }
}
"""

replace_file('src/components/Navbar.module.css', navbar_css)
replace_file('src/pages/QuestionDetailPage.module.css', question_detail_css)

