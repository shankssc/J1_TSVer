export {};

declare global {

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
        CUST,
        OWN,
        CAR,
        ADMN,
    }

    interface UserSession {
        _id: string;
        username: string;
        email: string;
        token: string;
    }

}