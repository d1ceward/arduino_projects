const int hddLedPin = 2;
const int networkLedPin = 3;

// INPUT VALUES
const int ALL_LED_OFF = 0;
const int ALL_LED_ON = 1;

const int HDD_LED_ON = 2; // HDD led on
const int HDD_LED_OFF = 3; // HDD led off

const int NETWORK_LED_ON = 4; // Network led on
const int NETWORK_LED_OFF = 5; // Network led off

const byte maxCharacters = 8;
char inputString[maxCharacters];
boolean newData = false;

void setup() {
  Serial.begin(4800);
  while (!Serial); // Wait for serial

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(hddLedPin, OUTPUT);
  pinMode(networkLedPin, OUTPUT);
}

void loop() {
  receiveWithEndMarker();
  processInput();
}

void receiveWithEndMarker() {
  char inputCharacter;
  char endMarker = '\n';
  static byte index = 0;

  if (Serial.available() > 0) {
    inputCharacter = Serial.read();

    if (inputCharacter != endMarker) {
      inputString[index] = inputCharacter;
      index++;

      if (index >= maxCharacters)
        index = maxCharacters - 1;
    } else {
      inputString[index] = '\0'; // terminate the string
      index = 0;
      newData = true;
    }
  }
}

void processInput() {
  if (!newData)
    return ;

  int command = atoi(inputString);

  switch (command) {
    case ALL_LED_OFF:
      digitalWrite(hddLedPin, LOW);
      digitalWrite(networkLedPin, LOW);
      break;
    case ALL_LED_ON:
      digitalWrite(hddLedPin, HIGH);
      digitalWrite(networkLedPin, HIGH);
      break;
    case HDD_LED_ON:
      digitalWrite(hddLedPin, HIGH);
      break;
    case HDD_LED_OFF:
      digitalWrite(hddLedPin, LOW);
      break;
    case NETWORK_LED_ON:
      digitalWrite(networkLedPin, HIGH);
      break;
    case NETWORK_LED_OFF:
      digitalWrite(networkLedPin, LOW);
      break;
    default:
      digitalWrite(hddLedPin, LOW);
      digitalWrite(networkLedPin, LOW);
  }

  newData = false;
}
