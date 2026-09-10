// All questions are stored here. Add new questions to this array.

const questions = [
  {
    id: "exp-01-familiarization-led-blink",
    title: "Exp 01: Familiarization with ATmega32 Development Board & Atmel Studio — LED Blinking",
    category: "Digital I/O",
    order: 1,
    isFair: true,
    problemStatement:
      "Familiarize with the ATmega32 microcontroller-based development system board and Atmel Studio IDE. Write an Embedded C program to blink all 8 LEDs connected to PORTB by toggling them ON and OFF with a software delay loop.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB0 (Pin 1)", component: "LED 1 Anode (via 330Ω resistor to Vcc)" },
      { mcuPin: "PB1 (Pin 2)", component: "LED 2 Anode (via 330Ω resistor to Vcc)" },
      { mcuPin: "PB2 (Pin 3)", component: "LED 3 Anode (via 330Ω resistor to Vcc)" },
      { mcuPin: "PB3 (Pin 4)", component: "LED 4 Anode (via 330Ω resistor to Vcc)" },
      { mcuPin: "PB4 (Pin 5)", component: "LED 5 Anode (via 330Ω resistor to Vcc)" },
      { mcuPin: "PB5 (Pin 6)", component: "LED 6 Anode (via 330Ω resistor to Vcc)" },
      { mcuPin: "PB6 (Pin 7)", component: "LED 7 Anode (via 330Ω resistor to Vcc)" },
      { mcuPin: "PB7 (Pin 8)", component: "LED 8 Anode (via 330Ω resistor to Vcc)" },
      { mcuPin: "VCC (Pin 10)", component: "+5V Power Supply" },
      { mcuPin: "GND (Pin 11)", component: "Ground" },
      { mcuPin: "XTAL1 (Pin 13)", component: "16 MHz Crystal Oscillator (with 22pF cap to GND)" },
      { mcuPin: "XTAL2 (Pin 12)", component: "16 MHz Crystal Oscillator (with 22pF cap to GND)" },
      { mcuPin: "RESET (Pin 9)", component: "10kΩ Pull-up resistor to VCC" },
      { mcuPin: "AVCC (Pin 30)", component: "+5V Power Supply" },
    ],
    code: `#include <avr/io.h>

int main(void)
{
    unsigned int i;

    DDRB = 0xFF;            // Configure all PORTB pins as output

    for (i = 1; i < 3000; i++);   // Initial startup delay

    while (1)
    {
        PORTB = 0xFF;              // Turn ON all LEDs (all pins HIGH)
        for (i = 1; i < 3000; i++);   // Delay — keep LEDs ON

        PORTB = 0x00;              // Turn OFF all LEDs (all pins LOW)
        for (i = 1; i < 3000; i++);   // Delay — keep LEDs OFF
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "#include <avr/io.h>",
        explanation:
          "Includes the AVR I/O header file. This gives access to all register names like DDRB, PORTB, PINB, etc. specific to the ATmega32. Every AVR program starts with this include.",
      },
      {
        line: "unsigned int i;",
        explanation:
          "Declares a loop counter variable 'i' as unsigned integer (16-bit, range 0–65535 on AVR). Used for creating software delay loops.",
      },
      {
        line: "DDRB = 0xFF;",
        explanation:
          "Sets the Data Direction Register for PORTB to 0xFF (binary 11111111). This configures all 8 pins of PORTB (PB0–PB7) as OUTPUT. A '1' bit = output, a '0' bit = input.",
      },
      {
        line: "for (i = 1; i < 3000; i++);",
        explanation:
          "A software delay loop — runs an empty loop 2999 times doing nothing. This creates a small time delay after the port configuration, giving the hardware time to stabilize before starting the blink cycle. The semicolon at the end means the loop body is empty.",
      },
      {
        line: "while (1)",
        explanation:
          "An infinite loop — the standard way to keep an embedded program running forever. Microcontrollers don't have an OS to return to, so the main logic always runs inside an infinite loop.",
      },
      {
        line: "PORTB = 0xFF;",
        explanation:
          "Writes 0xFF (binary 11111111) to PORTB, setting all 8 output pins to HIGH (+5V). This turns ON all 8 LEDs connected to PB0–PB7 simultaneously.",
      },
      {
        line: "for (i = 1; i < 3000; i++);",
        explanation:
          "Software delay after turning LEDs ON — keeps the LEDs in the ON state for a visible duration. The delay duration depends on the clock frequency (at 16 MHz, this is a very short delay).",
      },
      {
        line: "PORTB = 0x00;",
        explanation:
          "Writes 0x00 (binary 00000000) to PORTB, setting all 8 output pins to LOW (0V). This turns OFF all 8 LEDs simultaneously.",
      },
      {
        line: "for (i = 1; i < 3000; i++);",
        explanation:
          "Software delay after turning LEDs OFF — keeps the LEDs in the OFF state for a visible duration before the loop repeats and turns them ON again. This creates the blinking effect.",
      },
    ],
    importantCode: [
      {
        snippet: "DDRB = 0xFF;",
        note: "Data Direction Register — sets all 8 pins of PORTB as OUTPUT. Must be configured before writing to PORTB.",
      },
      {
        snippet: "PORTB = 0xFF;",
        note: "Writes HIGH (logic 1) to all PORTB pins — turns all connected LEDs ON.",
      },
      {
        snippet: "PORTB = 0x00;",
        note: "Writes LOW (logic 0) to all PORTB pins — turns all connected LEDs OFF.",
      },
      {
        snippet: "for (i = 1; i < 3000; i++);",
        note: "Software delay loop — an empty for-loop used to waste CPU cycles and create a time delay without using library functions.",
      },
      {
        snippet: "while (1)",
        note: "Infinite super-loop — keeps the microcontroller running the blink logic forever. All embedded programs use this pattern.",
      },
      {
        snippet: "#include <avr/io.h>",
        note: "Essential header — maps register names (DDRB, PORTB, etc.) to their actual memory addresses for the specific AVR chip.",
      },
    ],
    vivaQuestions: [
      {
        q: "What is the function of the DDR register in ATmega32?",
        a: "DDR (Data Direction Register) determines whether each pin of a port acts as INPUT or OUTPUT. Writing '1' to a DDR bit makes that pin an output; writing '0' makes it an input. For example, DDRB = 0xFF makes all 8 pins of PORTB outputs.",
      },
      {
        q: "What is the difference between DDRB, PORTB, and PINB?",
        a: "DDRB configures pin direction (input/output). PORTB writes data to output pins (or enables pull-up resistors on input pins). PINB reads the current logic level on the pins. These three registers exist for every port (A, B, C, D) in ATmega32.",
      },
      {
        q: "Why do we use while(1) in embedded C programs?",
        a: "Unlike desktop programs, microcontrollers have no OS to return to. If main() ends, the MCU will reset or execute garbage instructions. The while(1) infinite loop ensures the program keeps running and continuously performs its task.",
      },
      {
        q: "What does 0xFF mean in hexadecimal and binary?",
        a: "0xFF in hexadecimal = 255 in decimal = 11111111 in binary. It represents all 8 bits set to 1. When written to DDRB, it makes all 8 pins output. When written to PORTB, it sets all pins to HIGH.",
      },
      {
        q: "Why do we use a for-loop for delay instead of _delay_ms()?",
        a: "The for-loop delay is a simple software delay that doesn't require any additional header files. It works by wasting CPU cycles. However, _delay_ms() from <util/delay.h> is more accurate because it calculates exact timing based on F_CPU. The for-loop delay duration varies with compiler optimization settings.",
      },
      {
        q: "How many I/O ports does ATmega32 have and how many pins each?",
        a: "ATmega32 has 4 I/O ports: PORTA, PORTB, PORTC, and PORTD. Each port has 8 pins (PA0–PA7, PB0–PB7, PC0–PC7, PD0–PD7), giving a total of 32 general-purpose I/O pins. Hence the name ATmega32.",
      },
      {
        q: "What is the role of Atmel Studio in this experiment?",
        a: "Atmel Studio (now Microchip Studio) is the IDE used to write, compile, and debug AVR C programs. It includes the AVR-GCC compiler that converts C code into a .hex file, which is then flashed (uploaded) to the ATmega32 microcontroller using a programmer like USBasp or AVRISP.",
      },
      {
        q: "What happens if we don't set DDRB before writing to PORTB?",
        a: "By default after reset, all DDR bits are 0, meaning all pins are configured as inputs. If you write to PORTB without setting DDRB, the pins won't drive any output voltage. Instead, writing 1 to PORTB on an input pin will only enable the internal pull-up resistor — the LEDs won't light up.",
      },
    ],
  },
  {
    id: "exp-02-sending-byte-portb",
    title: "Exp 02: Sending A Byte (0x0F) to PORTB of ATmega32",
    category: "Digital I/O",
    order: 2,
    isFair: false,
    problemStatement:
      "To write and execute an AVR C program for the ATmega32 MCU to send the byte 0x0F to PORTB and observe the output using LEDs in Proteus.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB0 (Pin 1)", component: "LED 1 Anode (ON) via 330Ω resistor to Vcc" },
      { mcuPin: "PB1 (Pin 2)", component: "LED 2 Anode (ON) via 330Ω resistor to Vcc" },
      { mcuPin: "PB2 (Pin 3)", component: "LED 3 Anode (ON) via 330Ω resistor to Vcc" },
      { mcuPin: "PB3 (Pin 4)", component: "LED 4 Anode (ON) via 330Ω resistor to Vcc" },
      { mcuPin: "PB4 (Pin 5)", component: "LED 5 Anode (OFF) via 330Ω resistor to Vcc" },
      { mcuPin: "PB5 (Pin 6)", component: "LED 6 Anode (OFF) via 330Ω resistor to Vcc" },
      { mcuPin: "PB6 (Pin 7)", component: "LED 7 Anode (OFF) via 330Ω resistor to Vcc" },
      { mcuPin: "PB7 (Pin 8)", component: "LED 8 Anode (OFF) via 330Ω resistor to Vcc" },
      { mcuPin: "GND (Pin 11)", component: "Ground" },
    ],
    code: `#include <avr/io.h>

int main(void)
{
    unsigned int i;

    DDRB = 0xFF;                  // Configure all PORTB pins as output
    PORTB = 0x0F;                 // Send byte 0x0F (00001111) to PORTB

    for (i = 1; i < 3000; i++);   // Optional delay

    while (1)
    {
        // Infinite loop to keep the MCU running
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "DDRB = 0xFF;",
        explanation: "Configures all 8 pins of PORTB as output by writing 1s to the Data Direction Register."
      },
      {
        line: "PORTB = 0x0F;",
        explanation: "Sends the hexadecimal value 0x0F to PORTB. In binary, 0x0F is 00001111. This means pins PB0, PB1, PB2, and PB3 (lower nibble) are set HIGH (1), turning their LEDs ON. Pins PB4, PB5, PB6, and PB7 (upper nibble) are set LOW (0), turning their LEDs OFF."
      },
      {
        line: "for (i = 1; i < 3000; i++);",
        explanation: "A simple software delay. Though not strictly necessary for a static output, it is often used in basic experiments to let the hardware stabilize or as a placeholder."
      },
      {
        line: "while (1)",
        explanation: "An empty infinite loop. Since we only want to set the output once and leave it in that state, we do the configuration before the loop, and then just let the microcontroller idle in this loop forever."
      }
    ],
    importantCode: [
      {
        snippet: "PORTB = 0x0F;",
        note: "0x0F translates to binary 00001111. It controls the upper and lower 4 bits (nibbles) independently."
      }
    ],
    vivaQuestions: [
      {
        q: "What does the value 0x0F represent in binary?",
        a: "0x0F in hexadecimal translates to 00001111 in binary. The lower 4 bits (lower nibble) are 1s, and the upper 4 bits (upper nibble) are 0s."
      },
      {
        q: "What will happen to the LEDs connected to PORTB when PORTB = 0x0F is executed?",
        a: "The LEDs connected to the lower 4 pins (PB0 to PB3) will turn ON because they receive a HIGH signal (logic 1). The LEDs on the upper 4 pins (PB4 to PB7) will stay OFF because they receive a LOW signal (logic 0)."
      },
      {
        q: "Why is the while(1) loop empty in this program?",
        a: "Because the task is just to send a static byte (0x0F) to the port once. Once the LEDs are set, they maintain their state. The while(1) loop is just there to prevent the main function from exiting and resetting the microcontroller."
      },
      {
        q: "How would you modify the code to turn ON the upper 4 LEDs and turn OFF the lower 4 LEDs?",
        a: "By sending the byte 0xF0 to PORTB instead. (PORTB = 0xF0;), which is 11110000 in binary."
      }
    ]
  },
  {
    id: "exp-03-input-operation",
    title: "Exp 03: Input Operation — Read from PORTA, Display on PORTB",
    category: "Digital I/O",
    order: 3,
    isFair: false,
    problemStatement:
      "To write and execute an AVR C program to read data from PORTA (input) and display the same data on PORTB (output) of the ATmega32 MCU.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PA0-PA7 (Pins 40-33)", component: "DIP Switches / Buttons (Input)" },
      { mcuPin: "PB0-PB7 (Pins 1-8)", component: "LEDs (Output)" },
      { mcuPin: "GND (Pin 11)", component: "Ground" },
      { mcuPin: "VCC (Pin 10)", component: "+5V Power Supply" },
    ],
    code: `#include <avr/io.h>

int main(void)
{
    DDRA = 0x00;    // Configure all PORTA pins as INPUT
    DDRB = 0xFF;    // Configure all PORTB pins as OUTPUT

    while (1)
    {
        // Read the logic levels from the physical pins of PORTA (using PINA)
        // and assign them directly to the output register of PORTB
        PORTB = PINA; 
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "DDRA = 0x00;",
        explanation: "Sets Data Direction Register for PORTA to 0x00 (all 0s). This configures every pin on PORTA to act as an input, ready to read switches or sensors."
      },
      {
        line: "DDRB = 0xFF;",
        explanation: "Sets Data Direction Register for PORTB to 0xFF (all 1s). This configures every pin on PORTB to act as an output to drive the LEDs."
      },
      {
        line: "PORTB = PINA;",
        explanation: "PINA reads the actual physical voltage levels (High/Low) present on the PORTA pins. We then assign this read value directly to PORTB, instantly mirroring the input to the output LEDs."
      }
    ],
    importantCode: [
      {
        snippet: "PINA",
        note: "Always use PINx (e.g., PINA, PINB) to READ input signals. Using PORTx for reading will only read the previously written output state, not the actual physical pin."
      }
    ],
    vivaQuestions: [
      {
        q: "What is the difference between PORTA and PINA?",
        a: "PORTA is the data register used to write output values to the pins (or to enable internal pull-up resistors). PINA is the input register used to read the physical logic states present on the pins."
      },
      {
        q: "Why did we set DDRA to 0x00?",
        a: "DDRA controls the direction of PORTA pins. Setting it to 0x00 makes all the pins inputs, allowing us to read external signals like switches."
      }
    ]
  },
  {
    id: "exp-04-blink-all-leds-function",
    title: "Exp 04: Blink All LEDs Using a Delay Function",
    category: "Digital I/O",
    order: 4,
    isFair: false,
    problemStatement:
      "To blink all LEDs connected to PORTB using a modular software delay function.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB0-PB7 (Pins 1-8)", component: "LEDs (Output)" },
    ],
    code: `#include <avr/io.h>

// Function to generate a software delay
void delay() 
{
    unsigned int i, j;
    // Nested loop to create a longer, visible delay
    for(i = 0; i < 1000; i++) {
        for(j = 0; j < 100; j++); 
    }
}

int main(void) 
{
    DDRB = 0xFF;    // Configure all PORTB pins as output

    while (1) 
    {
        PORTB = 0xFF; // Turn ON all LEDs
        delay();      // Call the delay function

        PORTB = 0x00; // Turn OFF all LEDs
        delay();      // Call the delay function
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "void delay()",
        explanation: "Defines a custom function named 'delay'. Creating a separate function keeps the main loop clean and promotes code reusability."
      },
      {
        line: "for(i = 0; i < 1000; i++) { for(j = 0; j < 100; j++); }",
        explanation: "A nested for-loop. The inner loop runs 100 times for every 1 iteration of the outer loop. This wastes CPU cycles to generate a noticeable time delay."
      },
      {
        line: "delay();",
        explanation: "Calls the delay function, pausing the LED state (either ON or OFF) so the human eye can see the change."
      }
    ],
    importantCode: [
      {
        snippet: "void delay()",
        note: "Using functions for repetitive tasks like delays makes code cleaner and easier to maintain."
      }
    ],
    vivaQuestions: [
      {
        q: "Why do we use a nested loop in the delay function?",
        a: "A single loop with an integer might not provide a long enough delay depending on the clock frequency. A nested loop multiplies the delay time, easily creating a delay of hundreds of milliseconds without overflowing the loop variable."
      },
      {
        q: "What is the disadvantage of a software delay loop?",
        a: "Software delays block the CPU (wasting cycles), meaning the MCU cannot perform other tasks while waiting. Also, the exact delay time changes if the CPU frequency or compiler optimization level changes."
      }
    ]
  },
  {
    id: "exp-05-alternate-led-blinking",
    title: "Exp 05: Alternate LED Blinking",
    category: "Digital I/O",
    order: 5,
    isFair: false,
    problemStatement:
      "To blink alternate LEDs connected to PORTB using a software delay function.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB0-PB7 (Pins 1-8)", component: "LEDs (Output)" },
    ],
    code: `#include <avr/io.h>

void delay() 
{
    unsigned int i, j;
    for(i = 0; i < 1000; i++) {
        for(j = 0; j < 100; j++); 
    }
}

int main(void) 
{
    DDRB = 0xFF;    // Set PORTB as output

    while (1) 
    {
        // 0xAA = 10101010 (Even LEDs OFF, Odd LEDs ON)
        PORTB = 0xAA; 
        delay();

        // 0x55 = 01010101 (Even LEDs ON, Odd LEDs OFF)
        PORTB = 0x55; 
        delay();
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "PORTB = 0xAA;",
        explanation: "Sends the hexadecimal value 0xAA to PORTB. In binary, this is 10101010. Pins 7, 5, 3, and 1 are HIGH (LEDs ON); pins 6, 4, 2, and 0 are LOW (LEDs OFF)."
      },
      {
        line: "PORTB = 0x55;",
        explanation: "Sends the hexadecimal value 0x55 to PORTB. In binary, this is 01010101. It is the exact inverse of 0xAA, swapping the ON/OFF states of the LEDs."
      }
    ],
    importantCode: [
      {
        snippet: "PORTB = 0xAA;",
        note: "Standard hexadecimal patterns used to test alternating bits."
      }
    ],
    vivaQuestions: [
      {
        q: "Convert 0xAA to binary.",
        a: "A in hex is 10 in decimal, which is 1010 in binary. So 0xAA is 10101010."
      },
      {
        q: "How else could you alternate the LEDs without assigning 0x55 explicitly?",
        a: "You could use the bitwise NOT operator (~) to invert the port. E.g., PORTB = ~PORTB; inside the loop."
      }
    ]
  },
  {
    id: "exp-06-led-running-pattern",
    title: "Exp 06: LED Running Pattern",
    category: "Digital I/O",
    order: 6,
    isFair: false,
    problemStatement:
      "To generate a running LED pattern (chaser) on PORTB.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB0-PB7 (Pins 1-8)", component: "LEDs (Output)" },
    ],
    code: `#include <avr/io.h>

void delay() 
{
    unsigned int i, j;
    for(i = 0; i < 500; i++) {
        for(j = 0; j < 100; j++); 
    }
}

int main(void) 
{
    DDRB = 0xFF; // Configure PORTB as output

    while (1) 
    {
        PORTB = 0x01; // 00000001
        delay();
        
        PORTB = 0x02; // 00000010
        delay();
        
        PORTB = 0x04; // 00000100
        delay();
        
        PORTB = 0x08; // 00001000
        delay();
        
        PORTB = 0x10; // 00010000
        delay();
        
        PORTB = 0x20; // 00100000
        delay();
        
        PORTB = 0x40; // 01000000
        delay();
        
        PORTB = 0x80; // 10000000
        delay();
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "PORTB = 0x01;",
        explanation: "By sequentially turning on one bit at a time and delaying, it creates the visual effect of an LED moving across the port."
      }
    ],
    importantCode: [
      {
        snippet: "PORTB = 0x01;",
        note: "These hexadecimal values correspond to a single '1' moving from the Least Significant Bit (LSB) to the Most Significant Bit (MSB)."
      }
    ],
    vivaQuestions: [
      {
        q: "What does 0x80 represent in binary?",
        a: "It represents 10000000, which means the LED on pin PB7 (the Most Significant Bit) is ON, and all others are OFF."
      },
      {
        q: "How would you make the pattern run backwards (from PB7 down to PB0)?",
        a: "You would reverse the order of the statements, starting with PORTB = 0x80; and ending with PORTB = 0x01;"
      }
    ]
  },
  {
    id: "exp-07-monitoring-port-pin",
    title: "Exp 07: Monitoring PORT PIN",
    category: "Digital I/O",
    order: 7,
    isFair: false,
    problemStatement:
      "(a) A door sensor (push button switch) is connected to pin PB3 of Port B. An LED is connected to pin PC5 of Port C. Write an AVR C program to monitor the door sensor and turn ON the LED when the door opens.\n\n(b) Read the status of PB0 and PB1 and output the corresponding ASCII character to Port D.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB3 (Port B Pin 3)", component: "Door sensor (push button)" },
      { mcuPin: "PC5 (Port C Pin 5)", component: "LED (Output)" },
      { mcuPin: "PB0, PB1", component: "Input pins" },
      { mcuPin: "PORTD", component: "ASCII Output" }
    ],
    code: `// PROGRAM (a)
#include <avr/io.h>

int main()
{
    DDRB = 0x00;
    DDRC = 0x20;

    while(1)
    {
        if(PINB == 0x08)
            PORTC = 0x20;
        else
            PORTC = 0x00;
    }
}


// PROGRAM (b)
#include <avr/io.h>

int main()
{
    DDRB = 0x00;
    DDRD = 0xFF;

    while(1)
    {
        if(PINB == 0x00)
            PORTD = '0';
        else if(PINB == 0x01)
            PORTD = '1';
        else if(PINB == 0x02)
            PORTD = '2';
        else if(PINB == 0x03)
            PORTD = '3';
    }
}`,
    codeExplanation: [
      {
        line: "DDRB = 0x00;",
        explanation: "Configures all pins of PORTB as INPUT to read the sensors/switches."
      },
      {
        line: "DDRC = 0x20;",
        explanation: "Configures PC5 as OUTPUT (0x20 in binary is 00100000) for the LED."
      },
      {
        line: "if(PINB == 0x08)",
        explanation: "Checks if PB3 is HIGH (0x08 in binary is 00001000). Reads from PINB because it's an input."
      },
      {
        line: "PORTD = '0';",
        explanation: "Outputs the ASCII value of '0' (which is 0x30) to PORTD based on the input."
      }
    ],
    importantCode: [
      {
        snippet: "PINB == 0x08",
        note: "We must use PINx (not PORTx) to read the actual logic level on the input pins."
      }
    ],
    vivaQuestions: [
      {
        q: "Why do we read from PINB instead of PORTB?",
        a: "PORTB is the data register used for outputting values, while PINB reflects the actual physical voltage level at the input pins."
      },
      {
        q: "What does 0x20 mean for DDRC?",
        a: "0x20 is 00100000 in binary. This sets bit 5 of DDRC to 1, configuring PC5 as an output."
      }
    ]
  },
  {
    id: "exp-08-monitoring-port-pin-bitwise",
    title: "Exp 08: Monitoring PORT PIN (Using Bitwise Operators)",
    category: "Digital I/O",
    order: 8,
    isFair: false,
    problemStatement:
      "(a) A door sensor (push button switch) is connected to pin PB3 of Port B. An LED is connected to pin PC5 of Port C. Write an AVR C program to monitor the door sensor and turn ON the LED when the door opens, using bitwise operators.\n\n(b) Read the status of PB0 and PB1 and output the corresponding ASCII character to Port D, using bitwise operators.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB3 (Port B Pin 3)", component: "Door sensor (push button)" },
      { mcuPin: "PC5 (Port C Pin 5)", component: "LED (Output)" },
      { mcuPin: "PB0, PB1", component: "Input pins" },
      { mcuPin: "PORTD", component: "ASCII Output" }
    ],
    code: `// PROGRAM (a)
#include <avr/io.h>

int main()
{
    // Clear bit 3 in DDRB to configure PB3 as input (0x08 is 00001000)
    DDRB &= ~0x08;
    // Set bit 5 in DDRC to configure PC5 as output (0x20 is 00100000)
    DDRC |= 0x20;

    while(1)
    {
        // Check if PB3 is HIGH by masking with 0x08
        if(PINB & 0x08)
            PORTC |= 0x20;  // Turn ON LED (Set bit 5)
        else
            PORTC &= ~0x20; // Turn OFF LED (Clear bit 5)
    }
}


// PROGRAM (b)
#include <avr/io.h>

int main()
{
    // Clear bits 0 and 1 in DDRB to configure PB0 and PB1 as input (0x03 is 00000011)
    DDRB &= ~0x03;
    // Configure all pins of PORTD as output
    DDRD = 0xFF;

    while(1)
    {
        // Read only PB0 and PB1 using a bitwise AND mask with 0x03
        unsigned char status = PINB & 0x03;

        if(status == 0x00)
            PORTD = '0';
        else if(status == 0x01) // 1
            PORTD = '1';
        else if(status == 0x02) // 2
            PORTD = '2';
        else if(status == 0x03) // 3
            PORTD = '3';
    }
}`,
    codeExplanation: [
      {
        line: "DDRB &= ~0x08;",
        explanation: "Bitwise AND with NOT clears the 3rd bit (0x08 is 00001000 in binary) of DDRB without affecting other bits, making PB3 an input."
      },
      {
        line: "DDRC |= 0x20;",
        explanation: "Bitwise OR with 0x20 (00100000 in binary) sets the 5th bit of DDRC, making PC5 an output, preserving other pins' states."
      },
      {
        line: "if(PINB & 0x08)",
        explanation: "Bitwise AND masks out all bits except PB3. The result is non-zero (true) only if PB3 is HIGH."
      },
      {
        line: "PORTC &= ~0x20;",
        explanation: "Clears the 5th bit of PORTC to turn OFF the LED, without affecting the rest of PORTC."
      }
    ],
    importantCode: [
      {
        snippet: "DDRB &= ~0x08;",
        note: "Using bitwise AND (&) with inverted masks clears bits, while bitwise OR (|) sets bits."
      }
    ],
    vivaQuestions: [
      {
        q: "Why is it better to use bitwise operators instead of writing exact hex values like DDRB = 0x00?",
        a: "Bitwise operators allow you to change or check the state of specific pins without affecting the configuration or output of the other pins on the same port."
      },
      {
        q: "What does the operation &= ~ do?",
        a: "It clears specific bits. The ~ operator inverts the mask, turning 1s to 0s and 0s to 1s. The &= operator then performs a bitwise AND, effectively forcing the targeted bits to 0 while leaving others unchanged."
      }
    ]
  },
  {
    id: "exp-09-toggle-single-bit",
    title: "Exp 09: Toggle Single Bit Continuously",
    category: "Digital I/O",
    order: 9,
    isFair: false,
    problemStatement:
      "Write an AVR C program to toggle only bit 4 of PORTB continuously without disturbing the states of the other pins on the port.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB4 (Port B Pin 4)", component: "LED (Output)" }
    ],
    code: `#include <avr/io.h>

void delay() 
{
    unsigned int i, j;
    for(i = 0; i < 1000; i++) {
        for(j = 0; j < 100; j++); 
    }
}

int main(void)
{
    // Configure PB4 as output by setting bit 4 of DDRB, leaving others unchanged
    DDRB |= (1 << 4);

    while(1)
    {
        // Toggle bit 4 of PORTB using bitwise XOR (^=), leaving others unchanged
        PORTB ^= (1 << 4);
        
        delay();
    }
    
    return 0;
}`,
    codeExplanation: [
      {
        line: "DDRB |= (1 << 4);",
        explanation: "Bitwise OR with (1 << 4) sets the 4th bit of DDRB to 1, configuring PB4 as an output, while keeping all other DDRB bits in their current state."
      },
      {
        line: "PORTB ^= (1 << 4);",
        explanation: "Bitwise XOR with (1 << 4) toggles the 4th bit of PORTB. If it was 1, it becomes 0. If it was 0, it becomes 1. Other pins remain exactly as they were."
      }
    ],
    importantCode: [
      {
        snippet: "^=",
        note: "The Bitwise XOR assignment operator is the standard and most efficient way to toggle a bit without using conditional if-else statements."
      }
    ],
    vivaQuestions: [
      {
        q: "What does the XOR (^) operator do when toggling?",
        a: "XOR returns 1 if the bits are different, and 0 if they are the same. When you XOR a bit with 1, it flips (toggles) its state. When you XOR a bit with 0, it stays the same."
      },
      {
        q: "Why not use PORTB = ~PORTB;?",
        a: "PORTB = ~PORTB; would invert ALL 8 pins of PORTB. Since the requirement is to toggle ONLY bit 4 without disturbing others, we must use PORTB ^= (1 << 4);."
      }
    ]
  },
  {
    id: "exp-10-bcd-to-ascii",
    title: "Exp 10: Packed BCD to ASCII Conversion",
    category: "Data Conversion",
    order: 10,
    isFair: false,
    problemStatement:
      "Write and execute an AVR C program to convert the packed BCD number 0x29 into its ASCII equivalent and display the ASCII bytes on PORTB and PORTC.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PORTB", component: "ASCII output for lower nibble ('9')" },
      { mcuPin: "PORTC", component: "ASCII output for upper nibble ('2')" }
    ],
    code: `#include <avr/io.h>

int main(void)
{
    unsigned char packed_bcd = 0x29;
    unsigned char lower_nibble, upper_nibble;

    // Configure PORTB and PORTC as outputs
    DDRB = 0xFF;
    DDRC = 0xFF;

    // Extract lower nibble (9) using AND 0x0F
    lower_nibble = packed_bcd & 0x0F;
    // Convert to ASCII using OR 0x30 and send to PORTB ('9' is 0x39)
    PORTB = lower_nibble | 0x30;

    // Extract upper nibble (2) using AND 0xF0
    upper_nibble = packed_bcd & 0xF0;
    // Shift right by 4 bits
    upper_nibble = upper_nibble >> 4;
    // Convert to ASCII using OR 0x30 and send to PORTC ('2' is 0x32)
    PORTC = upper_nibble | 0x30;

    while(1)
    {
        // Infinite loop to keep MCU running
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "lower_nibble = packed_bcd & 0x0F;",
        explanation: "Masks out the upper 4 bits, leaving only the lower 4 bits. 0x29 & 0x0F results in 0x09."
      },
      {
        line: "PORTB = lower_nibble | 0x30;",
        explanation: "Adding (or bitwise ORing with) 0x30 converts a digit from 0-9 into its corresponding ASCII character ('0'-'9'). 0x09 | 0x30 becomes 0x39, which is '9'."
      },
      {
        line: "upper_nibble = packed_bcd & 0xF0;",
        explanation: "Masks out the lower 4 bits. 0x29 & 0xF0 results in 0x20."
      },
      {
        line: "upper_nibble = upper_nibble >> 4;",
        explanation: "Shifts the upper nibble 4 places to the right to move it to the lower position. 0x20 becomes 0x02."
      }
    ],
    importantCode: [
      {
        snippet: "| 0x30",
        note: "Bitwise ORing a single decimal digit (0-9) with 0x30 is the standard way to convert it to its ASCII code."
      }
    ],
    vivaQuestions: [
      {
        q: "What is a packed BCD number?",
        a: "Packed BCD (Binary Coded Decimal) stores two decimal digits in a single byte. For example, 0x29 represents the decimal number 29."
      },
      {
        q: "Why do we use the bitwise AND mask 0x0F?",
        a: "0x0F (00001111 in binary) is used as a mask to extract only the lower 4 bits of a byte, setting the upper 4 bits to 0."
      },
      {
        q: "Why shift the upper nibble by 4?",
        a: "After masking with 0xF0, the upper digit is in the upper half of the byte (e.g., 0x20). Shifting it right by 4 moves it to the lower half (0x02) so we can treat it as a standalone digit."
      }
    ]
  },
  {
    id: "exp-11-ascii-to-bcd",
    title: "Exp 11: ASCII to Packed BCD Conversion",
    category: "Data Conversion",
    order: 11,
    isFair: false,
    problemStatement:
      "Write and execute an AVR C program to convert the ASCII digits '4' and '7' into a packed BCD number and display the packed BCD value on PORTB.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PORTB", component: "LEDs to display packed BCD output (0x47)" }
    ],
    code: `#include <avr/io.h>

int main(void)
{
    unsigned char digit1 = '4'; // ASCII '4' (0x34)
    unsigned char digit2 = '7'; // ASCII '7' (0x37)
    unsigned char packed_bcd;

    // Configure PORTB as output
    DDRB = 0xFF;

    // Mask first digit to get the raw number (0x04)
    digit1 = digit1 & 0x0F;
    // Shift left by 4 to move it to the upper nibble (0x40)
    digit1 = digit1 << 4;

    // Mask second digit to get the raw number (0x07)
    digit2 = digit2 & 0x0F;

    // OR both digits to pack them into a single byte (0x47)
    packed_bcd = digit1 | digit2;

    // Display packed BCD on PORTB
    PORTB = packed_bcd;

    while(1)
    {
        // Infinite loop
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "digit1 = digit1 & 0x0F;",
        explanation: "Masks out the upper 4 bits (the '3' in 0x34), leaving only the lower 4 bits (0x04), effectively converting the ASCII character to a raw numerical value."
      },
      {
        line: "digit1 = digit1 << 4;",
        explanation: "Shifts the number 4 bits to the left, moving it into the upper nibble position so it can be combined with the second digit. 0x04 becomes 0x40."
      },
      {
        line: "packed_bcd = digit1 | digit2;",
        explanation: "Bitwise OR combines the upper nibble (0x40) and the lower nibble (0x07) into a single packed BCD byte (0x47)."
      }
    ],
    importantCode: [
      {
        snippet: "digit1 << 4",
        note: "To pack two digits into one byte, the most significant digit must be shifted 4 places to the left to occupy the upper nibble."
      }
    ],
    vivaQuestions: [
      {
        q: "What is the ASCII value of a numerical digit?",
        a: "The ASCII values of digits '0' through '9' range from 0x30 to 0x39. To get the actual numerical value (0-9), you can mask out the upper bits by ANDing with 0x0F, or by simply subtracting 0x30."
      },
      {
        q: "Why do we use the bitwise OR operator to combine the digits?",
        a: "After shifting the first digit to the upper nibble (e.g., 0x40) and extracting the second digit (e.g., 0x07), bitwise OR overlays the 1s together (0x40 | 0x07 = 0x47) without them interfering with each other."
      }
    ]
  },
  {
    id: "exp-12-serial-transmission-lsb",
    title: "Exp 12: Serial Transmission of 44H (LSB First)",
    category: "Serial Communication",
    order: 12,
    isFair: false,
    problemStatement:
      "Write and execute an AVR C program to transmit hexadecimal value 44H serially through PORTC Pin 3 by sending the Least Significant Bit (LSB) first.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PC3 (Port C Pin 3)", component: "Serial output line" }
    ],
    code: `#include <avr/io.h>

void delay() 
{
    unsigned int i, j;
    for(i = 0; i < 1000; i++) {
        for(j = 0; j < 100; j++); 
    }
}

int main(void)
{
    unsigned char data = 0x44; // 01000100 in binary
    int i;

    // Configure PC3 as output
    DDRC |= (1 << 3);

    // Loop 8 times for 8 bits
    for (i = 0; i < 8; i++)
    {
        // Test if the Least Significant Bit (LSB) is 1
        if (data & 0x01)
        {
            PORTC |= (1 << 3);  // Output HIGH on PC3
        }
        else
        {
            PORTC &= ~(1 << 3); // Output LOW on PC3
        }

        // Shift data right by 1 to bring the next bit into the LSB position
        data = data >> 1;
        
        // Delay to allow observation of the bit transmission
        delay(); 
    }

    while(1)
    {
        // Infinite loop to keep MCU running after transmission stops
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "if (data & 0x01)",
        explanation: "Masks all bits except the LSB (bit 0). If the LSB is 1, the result is non-zero (true). If it's 0, the result is 0 (false)."
      },
      {
        line: "data = data >> 1;",
        explanation: "Right shift operator. Moves all bits one position to the right. The current LSB is discarded, and the next bit becomes the new LSB for the next loop iteration."
      }
    ],
    importantCode: [
      {
        snippet: "data & 0x01",
        note: "This is the standard technique to isolate and test the LSB of a byte."
      }
    ],
    vivaQuestions: [
      {
        q: "What does 'LSB First' mean in serial transmission?",
        a: "It means that the Least Significant Bit (the bit at position 0) is sent over the wire first, followed by bit 1, bit 2, and so on up to the Most Significant Bit (MSB)."
      },
      {
        q: "Why do we use the right shift operator (>> 1)?",
        a: "Since we are always testing bit 0 (using & 0x01), shifting the data right by 1 step brings the next bit into position 0 so it can be tested and transmitted in the next iteration."
      },
      {
        q: "What is the expected sequence of bits transmitted for 0x44?",
        a: "0x44 in binary is 01000100. Reading from right to left (LSB to MSB), the sequence is: 0, 0, 1, 0, 0, 0, 1, 0."
      }
    ]
  },
  {
    id: "exp-13-serial-transmission-msb",
    title: "Exp 13: Serial Transmission of 44H (MSB First)",
    category: "Serial Communication",
    order: 13,
    isFair: false,
    problemStatement:
      "Write and execute an AVR C program to transmit the hexadecimal value 44H serially through PORTC Pin 3 by sending the Most Significant Bit (MSB) first.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PC3 (Port C Pin 3)", component: "Serial output line" }
    ],
    code: `#include <avr/io.h>

void delay() 
{
    unsigned int i, j;
    for(i = 0; i < 1000; i++) {
        for(j = 0; j < 100; j++); 
    }
}

int main(void)
{
    unsigned char data = 0x44; // 01000100 in binary
    unsigned char temp;
    int i;

    // Configure PC3 as output
    DDRC |= (1 << 3);

    // Copy data into a temporary register
    temp = data;

    // Loop 8 times for 8 bits
    for (i = 0; i < 8; i++)
    {
        // Test if the Most Significant Bit (MSB) is 1 using mask 0x80 (10000000 in binary)
        if (temp & 0x80)
        {
            PORTC |= (1 << 3);  // Output HIGH on PC3
        }
        else
        {
            PORTC &= ~(1 << 3); // Output LOW on PC3
        }

        // Shift data left by 1 to bring the next bit into the MSB position
        temp = temp << 1;
        
        // Delay to allow observation of the bit transmission
        delay(); 
    }

    while(1)
    {
        // Infinite loop to keep MCU running after transmission stops
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "if (temp & 0x80)",
        explanation: "Masks all bits except the MSB (bit 7). 0x80 in binary is 10000000. If the MSB is 1, the result is non-zero (true)."
      },
      {
        line: "temp = temp << 1;",
        explanation: "Left shift operator. Moves all bits one position to the left. The current MSB is discarded, and the next bit becomes the new MSB for the next loop iteration."
      }
    ],
    importantCode: [
      {
        snippet: "temp & 0x80",
        note: "This is the standard technique to isolate and test the MSB of an 8-bit byte."
      }
    ],
    vivaQuestions: [
      {
        q: "What does 'MSB First' mean in serial transmission?",
        a: "It means that the Most Significant Bit (bit 7) is sent over the wire first, followed by bit 6, bit 5, down to the Least Significant Bit (LSB)."
      },
      {
        q: "Why do we use the left shift operator (<< 1) instead of right shift?",
        a: "Since we are always testing the MSB (bit 7), shifting the data left by 1 step brings the next bit into position 7 so it can be tested and transmitted in the next iteration."
      },
      {
        q: "What is the expected sequence of bits transmitted for 0x44 (MSB First)?",
        a: "0x44 in binary is 01000100. Reading from left to right (MSB to LSB), the sequence is: 0, 1, 0, 0, 0, 1, 0, 0."
      }
    ]
  },
  {
    id: "exp-14-timer0-delay-normal-mode",
    title: "Exp 14: Timer0 Delay Generation (Normal Mode)",
    category: "Timers & Counters",
    order: 14,
    isFair: false,
    problemStatement:
      "Write and execute an AVR C program to toggle all bits of PORTB continuously with a delay generated using Timer0 in Normal Mode without a prescaler.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PORTB", component: "LEDs to visualize toggling output" }
    ],
    code: `#include <avr/io.h>

void T0Delay();

int main()
{
    // Configure all pins of PORTB as output
    DDRB = 0xFF;

    while(1)
    {
        PORTB = 0x55;  // 01010101 in binary
        T0Delay();

        PORTB = 0xAA;  // 10101010 in binary
        T0Delay();
    }
}

void T0Delay()
{
    // Load the initial value into Timer0 Counter Register
    TCNT0 = 0x20;

    // Start Timer0, Normal mode, no prescaler
    TCCR0 = 0x01;

    // Wait until the Timer Overflow Flag (TOV0) is set in TIFR
    while((TIFR & 0x01) == 0);

    // Stop Timer0
    TCCR0 = 0x00;

    // Clear the TOV0 flag by writing a 1 to it
    TIFR = 0x01;
}`,
    codeExplanation: [
      {
        line: "TCNT0 = 0x20;",
        explanation: "Loads the starting value (0x20) into the Timer/Counter 0 register. The timer will count up from this value to 0xFF."
      },
      {
        line: "TCCR0 = 0x01;",
        explanation: "Configures Timer/Counter Control Register 0. Writing 0x01 sets the Clock Select bits to 'no prescaler', starting the timer."
      },
      {
        line: "while((TIFR & 0x01) == 0);",
        explanation: "Polls the Timer Interrupt Flag Register (TIFR). It waits in this empty loop until the TOV0 (Timer0 Overflow) bit (bit 0) becomes 1, which happens when TCNT0 overflows from 0xFF to 0x00."
      },
      {
        line: "TCCR0 = 0x00;",
        explanation: "Stops the timer by clearing the Clock Select bits."
      },
      {
        line: "TIFR = 0x01;",
        explanation: "Clears the TOV0 flag. In AVR, hardware flags in the TIFR register are cleared by writing a logical '1' to them, not '0'."
      }
    ],
    importantCode: [
      {
        snippet: "TIFR = 0x01;",
        note: "Remember that to clear the overflow flag (TOV0), you must write a '1' to it, contrary to typical register clearing logic."
      }
    ],
    vivaQuestions: [
      {
        q: "What does TCNT0 do?",
        a: "TCNT0 is the 8-bit Timer/Counter register. It holds the current count value and increments with each timer clock pulse."
      },
      {
        q: "How does the delay generation work in this program?",
        a: "The timer starts counting from 0x20 up to its maximum value, 0xFF (255). When it rolls over to 0x00, it sets the TOV0 flag in the TIFR register. The while loop waits for this flag to be set, effectively creating a time delay based on the CPU frequency."
      },
      {
        q: "Why do we write 0x01 to TIFR at the end of the delay function?",
        a: "In AVR microcontrollers, interrupt flags like TOV0 are cleared by writing a logic '1' to their respective bit locations. Writing a '0' has no effect."
      }
    ]
  },
  {
    id: "exp-15-delay-for-loop",
    title: "Exp 15: Delay Generation Using For Loop",
    category: "Timers & Counters",
    order: 15,
    isFair: false,
    problemStatement:
      "Write and execute an AVR C program to toggle all bits of PORTB continuously with a delay generated using a software 'for' loop.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PORTB", component: "LEDs to visualize toggling output" }
    ],
    code: `#include <avr/io.h>

void delay()
{
    unsigned int i, j;
    // Nested for-loop to waste CPU cycles and generate a delay
    for(i = 0; i < 1000; i++)
    {
        for(j = 0; j < 100; j++);
    }
}

int main(void)
{
    // Configure all pins of PORTB as output
    DDRB = 0xFF;

    while(1)
    {
        PORTB = 0x55;  // 01010101 in binary
        delay();

        PORTB = 0xAA;  // 10101010 in binary
        delay();
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "for(i = 0; i < 1000; i++)",
        explanation: "Outer loop runs 1000 times."
      },
      {
        line: "for(j = 0; j < 100; j++);",
        explanation: "Inner loop runs 100 times for each outer loop iteration, doing nothing (;). This wastes CPU instruction cycles to create a visible time delay."
      }
    ],
    importantCode: [
      {
        snippet: "void delay()",
        note: "Software delays block the CPU from doing other work, unlike hardware timers."
      }
    ],
    vivaQuestions: [
      {
        q: "What is the disadvantage of using a for-loop for delays?",
        a: "It is inaccurate and blocks the CPU. The actual delay time depends heavily on the CPU clock frequency and the compiler's optimization level."
      }
    ]
  },
  {
    id: "exp-16-delay-built-in",
    title: "Exp 16: Delay Generation Using Built-in Function",
    category: "Timers & Counters",
    order: 16,
    isFair: false,
    problemStatement:
      "Write and execute an AVR C program to toggle all bits of PORTB continuously with a delay generated using the built-in _delay_ms() function.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PORTB", component: "LEDs to visualize toggling output" }
    ],
    code: `#define F_CPU 1000000UL // Define CPU frequency before including delay.h
#include <avr/io.h>
#include <util/delay.h>

int main(void)
{
    // Configure all pins of PORTB as output
    DDRB = 0xFF;

    while(1)
    {
        PORTB = 0x55;  // 01010101 in binary
        _delay_ms(500); // 500 millisecond delay

        PORTB = 0xAA;  // 10101010 in binary
        _delay_ms(500); // 500 millisecond delay
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "#define F_CPU 1000000UL",
        explanation: "Defines the CPU frequency (e.g., 1 MHz). The _delay_ms() function needs this to calculate exactly how many CPU cycles to waste to achieve the specified time in milliseconds."
      },
      {
        line: "#include <util/delay.h>",
        explanation: "Includes the AVR delay library which provides _delay_ms() and _delay_us()."
      },
      {
        line: "_delay_ms(500);",
        explanation: "Halts the program execution for 500 milliseconds (half a second) using an accurate, compiler-optimized cycle loop."
      }
    ],
    importantCode: [
      {
        snippet: "#define F_CPU",
        note: "You MUST define F_CPU before including <util/delay.h> for the delay functions to calculate the correct timing."
      }
    ],
    vivaQuestions: [
      {
        q: "Why do we need to define F_CPU?",
        a: "Because the compiler needs to know how fast the microcontroller is running (clock frequency) to calculate the exact number of instruction cycles required to create a 1-millisecond delay."
      },
      {
        q: "What is the difference between _delay_ms() and a hardware timer?",
        a: "_delay_ms() is a software delay that wastes CPU cycles and blocks execution. Hardware timers run independently of the CPU, allowing the CPU to execute other tasks while the timer counts."
      }
    ]
  },
  {
    id: "exp-17-timer0-delay-ctc-mode",
    title: "Exp 17: Toggle PORTB using Timer0 in CTC Mode",
    category: "Timers & Counters",
    order: 17,
    isFair: false,
    problemStatement:
      "Write and execute an AVR C program to toggle all bits of PORTB continuously with a delay generated using Timer0 in CTC (Clear Timer on Compare Match) Mode with no prescaler.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PORTB", component: "LEDs to visualize toggling output" }
    ],
    code: `#include <avr/io.h>

void T0Delay(void);

int main(void)
{
    // Configure all pins of PORTB as output
    DDRB = 0xFF;

    while(1)
    {
        PORTB = 0x55; // Output alternating bit pattern
        T0Delay();

        PORTB = 0xAA; // Output inverted alternating bit pattern
        T0Delay();
    }
}

void T0Delay(void)
{
    // Initialize Timer0 counter to 0
    TCNT0 = 0x00;

    // Load the Output Compare Register with the desired match value
    OCR0 = 0xC0;

    // Start Timer0 in CTC Mode, no prescaler
    // (WGM01 = 1 for CTC, CS00 = 1 for no prescaler -> 0x09)
    TCCR0 = 0x09;

    // Wait until the Output Compare Flag (OCF0) is set in TIFR
    while((TIFR & 0x02) == 0);

    // Stop Timer0
    TCCR0 = 0x00;

    // Clear the OCF0 flag by writing a 1 to it
    TIFR = 0x02;
}`,
    codeExplanation: [
      {
        line: "OCR0 = 0xC0;",
        explanation: "Sets the Output Compare Register 0 to 0xC0. The timer will count from 0 up to this value."
      },
      {
        line: "TCCR0 = 0x09;",
        explanation: "Configures Timer0. 0x09 sets WGM01=1 (CTC mode) and CS00=1 (No prescaler). In CTC mode, TCNT0 resets to 0 automatically when it matches OCR0."
      },
      {
        line: "while((TIFR & 0x02) == 0);",
        explanation: "Polls the Timer Interrupt Flag Register (TIFR). It waits until the OCF0 (Output Compare Flag 0) bit (bit 1) becomes 1, which happens when TCNT0 equals OCR0."
      },
      {
        line: "TIFR = 0x02;",
        explanation: "Clears the OCF0 flag by writing a logical '1' to its bit position, readying it for the next delay call."
      }
    ],
    importantCode: [
      {
        snippet: "TCCR0 = 0x09;",
        note: "This configuration byte enables CTC mode, which provides much more precise control over the delay compared to Normal Mode."
      }
    ],
    vivaQuestions: [
      {
        q: "What does CTC stand for?",
        a: "CTC stands for Clear Timer on Compare Match. When the timer counter (TCNT0) matches the value in the output compare register (OCR0), the counter is automatically cleared to zero."
      },
      {
        q: "Which flag is checked in CTC mode?",
        a: "In CTC mode, we check the OCF0 (Output Compare Flag 0) in the TIFR register, which is bit 1."
      },
      {
        q: "How do you calculate the delay in CTC mode?",
        a: "The delay depends on the CPU clock frequency, the prescaler value, and the value in OCR0. Formula: Time = (OCR0 + 1) * Prescaler / F_CPU."
      }
    ]
  },
  {
    id: "exp-18-timer0-as-counter",
    title: "Exp 18: Timer0 As Counter",
    category: "Timers & Counters",
    order: 18,
    isFair: false,
    problemStatement:
      "Design and implement an AVR program using ATmega32 where Timer0 is configured in counter mode to count external pulses applied to the T0 pin (PD4). The current 8-bit count value must be continuously displayed on PORTB using LEDs.",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PD4 (T0 Pin)", component: "External pulse source (Push button/Clock)" },
      { mcuPin: "PORTB", component: "LEDs to display the 8-bit count" }
    ],
    code: `#define F_CPU 1000000UL
#include <avr/io.h>

void main(void)
{
    DDRB = 0xFF;         // Set PORTB as output (to display count)
    DDRD &= ~(1 << PD4); // Set PD4 (T0) as input for external pulses

    TCCR0 = 6;           // Timer0: External clock source on T0 pin, falling edge
    TCNT0 = 0;           // Clear Timer/Counter0 register

    while (1)
    {
        PORTB = TCNT0;   // Output current count to PORTB
    }
}`,
    codeExplanation: [
      {
        line: "DDRD &= ~(1 << PD4);",
        explanation: "Configures PD4 as an input. PD4 is the multiplexed pin for T0, the external clock input for Timer0."
      },
      {
        line: "TCCR0 = 6;",
        explanation: "Configures Timer0 for Counter mode. Writing 6 (which is binary 110 for the CS02:CS00 bits) selects the external clock source on the T0 pin, clocking on the falling edge."
      },
      {
        line: "TCNT0 = 0;",
        explanation: "Initializes the Timer/Counter0 register to 0 before starting to count."
      },
      {
        line: "PORTB = TCNT0;",
        explanation: "Continuously reads the hardware counter register (TCNT0) and writes its value directly to PORTB to display the count on LEDs."
      }
    ],
    importantCode: [
      {
        snippet: "TCCR0 = 6;",
        note: "Values 6 and 7 for the Clock Select bits in TCCR0 turn the 'Timer' into a 'Counter' by using external pulses instead of the internal CPU clock."
      }
    ],
    vivaQuestions: [
      {
        q: "What is the difference between a Timer and a Counter?",
        a: "A timer increments its value based on the internal system clock (used for time delays), while a counter increments its value based on external pulses applied to a specific pin (used for counting events)."
      },
      {
        q: "What does TCCR0 = 6 do?",
        a: "It configures Timer0 to act as a counter, incrementing TCNT0 every time a falling edge (High-to-Low transition) is detected on the external T0 pin (PD4)."
      },
      {
        q: "What happens when TCNT0 reaches 255 (0xFF) and receives another pulse?",
        a: "It overflows back to 0 (0x00) and sets the Timer Overflow flag (TOV0), though we aren't using the flag in this simple display program."
      }
    ]
  },
  {
    id: "exp-19-timer0-16bit-counter",
    title: "Exp 19: AVR Timer0 as 16-Bit External Counter",
    category: "Timers & Counters",
    order: 19,
    isFair: false,
    problemStatement:
      "Write an AVR C program to extend the 8-bit Timer0 into a 16-bit counter using the Timer0 overflow flag (TOV0). Count external pulses and display the 16-bit count on PORTC (lower 8 bits) and PORTD (upper 8 bits).",
    circuitImageUrl: "",
    pinConnections: [
      { mcuPin: "PB0 (T0 Pin)", component: "External pulse source (Push button/Clock)" },
      { mcuPin: "PORTC", component: "LEDs to display lower 8 bits of count" },
      { mcuPin: "PORTD", component: "LEDs to display upper 8 bits of count" }
    ],
    code: `#include <avr/io.h>

int main(void)
{
    DDRC = 0xFF;  // Lower 8 bits of the 16-bit count
    DDRD = 0xFF;  // Upper 8 bits of the 16-bit count
    PORTB = 0x01; // Enable pull-up resistor on PB0 (T0 pin)
    
    TCNT0 = 0x00; // Clear Timer0 counter
    TCCR0 = 0x06; // External clock on T0 (falling edge)
    PORTD = 0x00; // Initialize upper byte to 0

    while(1)
    {
        PORTC = TCNT0; // Continuously display lower byte

        // Check if Timer0 has overflowed (counted from 255 to 0)
        if(TIFR & (1 << TOV0))
        {
            TIFR = (1 << TOV0); // Clear overflow flag by writing 1
            PORTD++;            // Increment upper byte
        }
    }

    return 0;
}`,
    codeExplanation: [
      {
        line: "PORTB = 0x01;",
        explanation: "Since DDRB for PB0 is 0 by default (input), writing 1 to PORTB enables the internal pull-up resistor on the T0 pin, preventing it from floating."
      },
      {
        line: "TCCR0 = 0x06;",
        explanation: "Configures Timer0 to act as a counter clocked by falling edges on the external T0 pin."
      },
      {
        line: "if(TIFR & (1 << TOV0))",
        explanation: "Checks if the Timer0 Overflow Flag is set. This happens every time TCNT0 reaches 255 and rolls over to 0."
      },
      {
        line: "PORTD++;",
        explanation: "Since TCNT0 (PORTC) just rolled over, we increment PORTD to act as the upper 8 bits of the counter, effectively chaining two 8-bit counters to make a 16-bit counter."
      }
    ],
    importantCode: [
      {
        snippet: "TIFR = (1 << TOV0);",
        note: "Always remember that hardware interrupt flags in AVR are cleared by writing a logical '1' to them, not '0'."
      }
    ],
    vivaQuestions: [
      {
        q: "How does this program create a 16-bit counter from an 8-bit timer?",
        a: "By using TCNT0 to count the lower 8 bits, and using software to monitor the overflow flag (TOV0). Every time TCNT0 overflows (256 pulses), the software increments PORTD, which acts as the upper 8 bits."
      },
      {
        q: "What is the maximum number of pulses this 16-bit counter can count?",
        a: "A 16-bit counter can count up to (2^16 - 1) = 65,535 pulses before both PORTC and PORTD roll over to 0."
      }
    ]
  },
  {
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
}`,
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
}`,
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
}`,
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
}`,
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
}`,
    codeExplanation: [
      {
        line: "lcd_command(0x38);",
        explanation: "Standard initialization command for a 16x2 LCD in 8-bit mode using 2 lines."
      }
    ],
    importantCode: [
      {
        snippet: "PORTD |= (1 << EN);",
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

    lcd_command(0x01); // Clear display
    for(i = 0; message[i] != '\\0'; i++)
    {
        lcd_data(message[i]);
    }
    _delay_ms(500);

    while(1)
    {
        lcd_command(0x18); // Shift display left
        _delay_ms(300);
    }
}`,
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
