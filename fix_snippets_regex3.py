import re

with open('src/data/questions.js', 'r') as f:
    content = f.read()

# Exp 1
content = re.sub(r'line:\s*"while\(1\)",', 'line: "while (1)",', content)
content = re.sub(r'line:\s*"for\(i=1;i<3000;i\+\+\);",', 'line: "for (i = 1; i < 3000; i++);",', content)
content = re.sub(r'snippet:\s*"while\(1\)",', 'snippet: "while (1)",', content)

# Exp 2
content = re.sub(r'line:\s*"while\(1\)",', 'line: "while (1)",', content)

with open('src/data/questions.js', 'w') as f:
    f.write(content)
