import sys

filename = 'src/data/questions.js'
with open(filename, 'r') as f:
    lines = f.readlines()

# Keep everything up to line 1550
lines = lines[:1550]

new_content = """  {
    id: "exp-20-timer0-overflow-interrupt-shift",
    title: "Exp 20: Timer0 Overflow Interrupt to Generate Square Wave (With Shift Operators)",
    category: "Interrupts",
    order: 20,
    isFair: false,
    problemStatement:
      "Write an AVR C program to generate a square wave on PB5 using Timer0 overflow interrupt while continuously transferring data from PORTC to PORTD in the main loop.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB5", component: "Oscilloscope/LED to observe square wave" },
      { mcuPin: "PORTC", component: "Input switches/sensors" },
      { mcuPin: "PORTD", component: "Output LEDs to mirror PORTC" }
    ],
    code: `#include <avr/io.h>
#include <avr/interrupt.h>
int main ()
{
    DDRB|=(1<<PB5);
    DDRC=0x00; 
    DDRD=0xFF;
    TCNT0=0; 
    TCCR0=(1<<CS00);
    TIMSK=(1<<TOIE0);
    sei();
    while(1)
    { 
        PORTD=PINC; 
    }
}
ISR(TIMER0_OVF_vect)
{
    PORTB^=(1<<PB5);
}\`,
    codeExplanation: [
      {
        line: "TIMSK=(1<<TOIE0);",
        explanation: "Setting the TOIE0 bit allows Timer0 to trigger an interrupt whenever it overflows."
      },
      {
        line: "PORTB^=(1<<PB5);",
        explanation: "Uses XOR operator to toggle the PB5 pin."
      }
    ],
    importantCode: [
      {
        snippet: "sei()",
        note: "Enable global interrupts."
      }
    ],
    vivaQuestions: [
      {
        q: "What is an ISR?",
        a: "An Interrupt Service Routine."
      }
    ]
  },
  {
    id: "exp-21-simplified-timer0-interrupt",
    title: "Exp 21: Simplified AVR C Program (Without Shift Operator)",
    category: "Interrupts",
    order: 21,
    isFair: false,
    problemStatement:
      "Write a simplified AVR C program to generate a square wave on PB5 using Timer0 overflow interrupt without using shift operators, while continuously transferring data from PORTC to PORTD.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB5", component: "Oscilloscope/LED to observe square wave" },
      { mcuPin: "PORTC", component: "Input switches/sensors" },
      { mcuPin: "PORTD", component: "Output LEDs to mirror PORTC" }
    ],
    code: `#include <avr/io.h>
#include <avr/interrupt.h>

int main()
{
    DDRB = 0x20;      // PB5 as output
    DDRC = 0x00;      // PORTC as input
    DDRD = 0xFF;      // PORTD as output

    TCNT0 = 0x00;     // Start Timer0 from 0
    TCCR0 = 0x01;     // Normal mode, No prescaler
    TIMSK = 0x01;     // Enable Timer0 Overflow Interrupt
    sei();            // Enable Global Interrupt

    while(1)
    {
        PORTD = PINC; // Copy PORTC to PORTD
    }
}

ISR(TIMER0_OVF_vect)
{
    PORTB = PORTB ^ 0x20;   // Toggle PB5
}\`,
    codeExplanation: [
      {
        line: "TIMSK = 0x01;",
        explanation: "Enables the Timer0 Overflow Interrupt."
      }
    ],
    importantCode: [
      {
        snippet: "0x20",
        note: "Direct hexadecimal value instead of shift operator."
      }
    ],
    vivaQuestions: [
      {
        q: "Why use hex instead of shift?",
        a: "It can be easier to read for beginners."
      }
    ]
  },
  {
    id: "exp-22-timer0-interrupt-toggle-pb0",
    title: "Exp 22: TIMER0 INTERRUPT – Read PORTC, Send to PORTD, Toggle PB0",
    category: "Interrupts",
    order: 22,
    isFair: false,
    problemStatement:
      "Write an AVR C program to read input from PORTC and send it to PORTD continuously. Use Timer0 overflow interrupt to toggle PB0 continuously (Square wave generator).",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB0", component: "LED/Oscilloscope" },
      { mcuPin: "PORTC", component: "Input" },
      { mcuPin: "PORTD", component: "Output" }
    ],
    code: `#define F_CPU 1000000UL
#include <avr/io.h>
#include <avr/interrupt.h>

void main(void)
{
    DDRC = 0x00;     // PORTC as input
    DDRD = 0xFF;     // PORTD as output
    DDRB = 0x01;     // PB0 as output (LED)

    TCNT0 = 0;       // Start Timer0 from 0
    TCCR0 = 1;       // Normal mode, no prescaler
    TIMSK = 1;       // Enable Timer0 overflow interrupt
    sei();           // Enable global interrupts

    while (1)
    {
        PORTD = PINC;   // Read from PORTC and send to PORTD
    }
}

// Interrupt Service Routine – Timer0 Overflow
ISR(TIMER0_OVF_vect)
{
    PORTB ^= 0x01;   // Toggle PB0
}\`,
    codeExplanation: [
      {
        line: "PORTB ^= 0x01;",
        explanation: "Toggles PB0 using XOR."
      }
    ],
    importantCode: [
      {
        snippet: "sei()",
        note: "Enables global interrupts."
      }
    ],
    vivaQuestions: [
      {
        q: "What is the frequency of the generated square wave?",
        a: "1953 Hz for a 1 MHz clock with no prescaler."
      }
    ]
  },
  {
    id: "exp-23-timer0-interrupt-toggle-portb",
    title: "Exp 23: Timer0 Interrupt - Toggle all bits of PORTB",
    category: "Interrupts",
    order: 23,
    isFair: false,
    problemStatement:
      "Write an AVR C program to read input from PORTC and send it to PORTD continuously. Use Timer0 overflow interrupt to toggle all bits of PORTB continuously.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PORTB", component: "LEDs (Toggle output)" },
      { mcuPin: "PORTC", component: "Input switches/sensors" },
      { mcuPin: "PORTD", component: "Output LEDs (mirrors PORTC)" }
    ],
    code: `#include <avr/io.h>
#include <avr/interrupt.h>

int main(void)
{
    DDRC = 0x00;     // PORTC as input
    DDRD = 0xFF;     // PORTD as output
    DDRB = 0xFF;     // All PORTB pins as output

    TCNT0 = 0;       // Start Timer0 from 0
    TCCR0 = 1;       // Normal mode, no prescaler
    TIMSK = 1;       // Enable Timer0 overflow interrupt
    sei();           // Enable global interrupts

    while (1)
    {
        PORTD = PINC;   // Read from PORTC and send to PORTD
    }
    return 0;
}

ISR(TIMER0_OVF_vect)
{
    PORTB = ~PORTB;   // Toggle all bits of PORTB
}\`,
    codeExplanation: [
      {
        line: "PORTB = ~PORTB;",
        explanation: "Using the bitwise NOT operator (~) inverts all 8 bits of PORTB at once."
      }
    ],
    importantCode: [
      {
        snippet: "PORTB = ~PORTB;",
        note: "This is a quick way to toggle an entire 8-bit port, turning all 0s to 1s and 1s to 0s."
      }
    ],
    vivaQuestions: [
      {
        q: "What is the difference between ~ and ^ when toggling?",
        a: "The bitwise NOT (~) operator inverts all bits in a variable. The bitwise XOR (^) operator is usually combined with a mask to toggle only specific bits."
      }
    ]
  },
  {
    id: "exp-24-lcd-interfacing",
    title: "Exp 24: Interfacing 16×2 LCD with ATmega32 in 8-bit Mode",
    category: "Interfacing",
    order: 24,
    isFair: false,
    problemStatement:
      "Write an AVR C program to interface a 16×2 alphanumeric LCD (14-pin) with the ATmega32 microcontroller in 8-bit mode and display the message 'WELCOME TO SSM'.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PORTC", component: "LCD Data Pins (D0 - D7)" },
      { mcuPin: "PD0", component: "LCD Register Select (RS)" },
      { mcuPin: "PD1", component: "LCD Read/Write (RW)" },
      { mcuPin: "PD2", component: "LCD Enable (EN)" }
    ],
    code: `#define F_CPU 1000000UL
#include <avr/io.h>
#include <util/delay.h>

#define RS PD0
#define RW PD1
#define EN PD2

void lcd_command(unsigned char command)
{
    PORTC = command;            
    PORTD &= ~(1 << RS);        
    PORTD &= ~(1 << RW);        
    PORTD |= (1 << EN);         
    _delay_ms(1);
    PORTD &= ~(1 << EN);        
    _delay_ms(2);
}

void lcd_data(unsigned char data)
{
    PORTC = data;               
    PORTD |= (1 << RS);         
    PORTD &= ~(1 << RW);        
    PORTD |= (1 << EN);         
    _delay_ms(1);
    PORTD &= ~(1 << EN);        
    _delay_ms(2);
}

void lcd_init()
{
    lcd_command(0x38); // Initialize LCD in 8-bit mode, 2 lines, 5x7 matrix
    lcd_command(0x0C); // Display ON, Cursor OFF
    lcd_command(0x01); // Clear display screen
    lcd_command(0x06); // Increment cursor
    lcd_command(0x80); // First position
}

int main(void)
{
    char message[] = "WELCOME TO SSM";
    int i;
    
    DDRC = 0xFF;
    DDRD = 0xFF;
    lcd_init();
    
    for(i = 0; message[i] != '\\0'; i++)
    {
        lcd_data(message[i]);
    }
    
    while(1);
    
    return 0;
}\`,
    codeExplanation: [
      {
        line: "lcd_command(0x38);",
        explanation: "Standard initialization command for a 16x2 LCD in 8-bit mode using 2 lines."
      }
    ],
    importantCode: [
      {
        snippet: "PORTD |= (1 << EN); ... PORTD &= ~(1 << EN);",
        note: "This sequence creates the necessary High-to-Low pulse on the Enable pin to tell the LCD to read the data on PORTC."
      }
    ],
    vivaQuestions: [
      {
        q: "What is the function of the RS pin?",
        a: "RS is the Register Select pin. When RS=0, the LCD expects a command. When RS=1, the LCD expects data."
      }
    ]
  },
  {
    id: "exp-25-lcd-moving-display",
    title: "Exp 25: 16×2 LCD Moving Display Using Atmega32",
    category: "Interfacing",
    order: 25,
    isFair: false,
    problemStatement:
      "Write an AVR C program to interface a 16×2 alphanumeric LCD display (14-pin) in 8-bit mode with ATmega32 and display the message 'WELCOME TO SSM' with a continuous moving/scrolling effect.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PORTC", component: "LCD Data Pins (D0 - D7)" },
      { mcuPin: "PD0", component: "LCD Register Select (RS)" },
      { mcuPin: "PD1", component: "LCD Read/Write (RW)" },
      { mcuPin: "PD2", component: "LCD Enable (EN)" }
    ],
    code: `#define F_CPU 1000000UL
#include <avr/io.h>
#include <util/delay.h>

#define RS PD0
#define RW PD1
#define EN PD2

void lcd_command(unsigned char command)
{
    PORTC = command;
    PORTD &= ~(1 << RS);
    PORTD &= ~(1 << RW);
    PORTD |= (1 << EN);
    _delay_ms(1);
    PORTD &= ~(1 << EN);
    _delay_ms(2);
}

void lcd_data(unsigned char data)
{
    PORTC = data;
    PORTD |= (1 << RS);
    PORTD &= ~(1 << RW);
    PORTD |= (1 << EN);
    _delay_ms(1);
    PORTD &= ~(1 << EN);
    _delay_ms(2);
}

void lcd_init()
{
    lcd_command(0x38); // 8-bit, 2-line, 5x7
    lcd_command(0x0C); // Display ON, cursor OFF
    lcd_command(0x01); // Clear display
    lcd_command(0x06); // Increment cursor
    lcd_command(0x80); // First position
}

int main(void)
{
    char message[] = "WELCOME TO SSM";
    int i;
    DDRC = 0xFF;
    DDRD = 0xFF;
    lcd_init();

    while(1)
    {
        lcd_command(0x01); // Clear display
        for(i = 0; message[i] != '\\0'; i++)
        {
            lcd_data(message[i]);
        }
        _delay_ms(500);
        
        lcd_command(0x18); // Shift display left
        _delay_ms(300);
    }
}\`,
    codeExplanation: [
      {
        line: "lcd_command(0x18);",
        explanation: "This specific LCD command shifts the entire display left by one position. It creates the scrolling effect when called inside a loop."
      }
    ],
    importantCode: [
      {
        snippet: "0x18",
        note: "Command to shift the entire display to the left."
      }
    ],
    vivaQuestions: [
      {
        q: "Does shifting the display alter the DDRAM addresses?",
        a: "No, the data remains in the DDRAM (Display Data RAM). Shifting just changes which part of the DDRAM is mapped to the visible LCD window."
      }
    ]
  }
];

export default questions;
"""

with open(filename, 'w') as f:
    f.writelines(lines)
    f.write(new_content)
