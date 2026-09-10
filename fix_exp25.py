import re

with open('src/data/questions.js', 'r') as f:
    content = f.read()

bad_while_loop = """
    while(1)
    {
        lcd_command(0x01); // Clear display
        for(i = 0; message[i] != '\\\\0'; i++)
        {
            lcd_data(message[i]);
        }
        _delay_ms(500);
        
        lcd_command(0x18); // Shift display left
        _delay_ms(300);
    }
"""

good_while_loop = """
    lcd_command(0x01); // Clear display
    for(i = 0; message[i] != '\\\\0'; i++)
    {
        lcd_data(message[i]);
    }
    _delay_ms(500);

    while(1)
    {
        lcd_command(0x18); // Shift display left
        _delay_ms(300);
    }
"""

content = content.replace(bad_while_loop.strip(), good_while_loop.strip())

with open('src/data/questions.js', 'w') as f:
    f.write(content)
