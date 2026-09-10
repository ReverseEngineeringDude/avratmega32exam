import re

with open('src/data/questions.js', 'r') as f:
    content = f.read()

# Exp 1
content = re.sub(r'"line":\s*"while\s*\(1\)\s*\{\s*\.\.\.\s*\}",', '"line": "while(1)",', content)
content = re.sub(r'"line":\s*"for\s*\(i\s*=\s*1;\s*i\s*<\s*3000;\s*i\+\+\);\s*//\s*after\s*ON",', '"line": "for(i=1;i<3000;i++);",', content)
content = re.sub(r'"line":\s*"for\s*\(i\s*=\s*1;\s*i\s*<\s*3000;\s*i\+\+\);\s*//\s*after\s*OFF",', '"line": "for(i=1;i<3000;i++);",', content)
content = re.sub(r'"snippet":\s*"while\s*\(1\)\s*\{\s*\.\.\.\s*\}",', '"snippet": "while(1)",', content)

# Exp 2
content = re.sub(r'"line":\s*"while\(1\)\s*\{\s*\}",', '"line": "while(1)",', content)

# Exp 4
content = re.sub(r'"line":\s*"void\s*delay\(\)\s*\{\s*\.\.\.\s*\}",', '"line": "void delay()",', content)

# Exp 5
content = re.sub(r'"snippet":\s*"0xAA\s*and\s*0x55",', '"snippet": "PORTB = 0xAA;",', content)

# Exp 6
content = re.sub(r'"line":\s*"PORTB\s*=\s*0x01;\s*\.\.\.\s*PORTB\s*=\s*0x80;",', '"line": "PORTB = 0x01;",', content)
content = re.sub(r'"snippet":\s*"0x01,\s*0x02,\s*0x04\.\.\.",', '"snippet": "PORTB = 0x01;",', content)

# Exp 8
content = re.sub(r'"snippet":\s*"&\s*and\s*\|",', '"snippet": "DDRB &= ~0x08;",', content)

# Exp 15
content = re.sub(r'"snippet":\s*"for-loop\s*delay",', '"snippet": "void delay()",', content)

# Exp 24
content = re.sub(r'"snippet":\s*"PORTD\s*\|\=\s*\(1\s*<<\s*EN\);\s*\.\.\.\s*PORTD\s*&\=\s*~\(1\s*<<\s*EN\);",', '"snippet": "PORTD |= (1 << EN);",', content)

with open('src/data/questions.js', 'w') as f:
    f.write(content)
