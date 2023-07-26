interface RegFormState {
    username: string;
    email: string;
    password: string;
    role: Role;
  }

interface LogFormState {
    username: string;
    password: string;
  }

enum Role {
    CUST = 'CUSTOMER',
    OWN = 'BUSINESS_OWNER',
    CAR = 'CARRIER',
    ADMN = 'ADMINISTRATOR',
  }