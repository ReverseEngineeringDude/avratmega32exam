import sys

def replace_file(path):
    with open(path, 'r') as f:
        content = f.read()

    # Exp 1 replacements
    content = content.replace('"line": "while (1) { ... }",', '"line": "while (1)",')
    content = content.replace('"line": "for (i = 1; i < 3000; i++);  // after ON",', '"line": "for (i = 1; i < 3000; i++);",')
    content = content.replace('"line": "for (i = 1; i < 3000; i++);  // after OFF",', '"line": "for (i = 1; i < 3000; i++);",')
    content = content.replace('"snippet": "while (1) { ... }",', '"snippet": "while (1)",')
    
    # Exp 2 replacements
    content = content.replace('"line": "while(1) { }",', '"line": "while (1)",')
    content = content.replace('"line": "while(1)",', '"line": "while (1)",')
    
    # Exp 4 replacements
    content = content.replace('"line": "void delay() { ... }",', '"line": "void delay()",')
    
    # Exp 5 replacements
    content = content.replace('"snippet": "0xAA and 0x55",', '"snippet": "PORTB = 0xAA;",')
    
    # Exp 6 replacements
    content = content.replace('"line": "PORTB = 0x01; ... PORTB = 0x80;",', '"line": "PORTB = 0x01;",')
    content = content.replace('"snippet": "0x01, 0x02, 0x04...",', '"snippet": "PORTB = 0x01;",')
    
    # Exp 8 replacements
    content = content.replace('"snippet": "& and |",', '"snippet": "DDRB &= ~0x08;",')
    
    # Exp 15 replacements
    content = content.replace('"snippet": "for-loop delay",', '"snippet": "void delay()",')
    
    # Exp 24 replacements
    content = content.replace('"snippet": "PORTD |= (1 << EN); ... PORTD &= ~(1 << EN);",', '"snippet": "PORTD |= (1 << EN);",')

    with open(path, 'w') as f:
        f.write(content)

replace_file('src/data/questions.js')
