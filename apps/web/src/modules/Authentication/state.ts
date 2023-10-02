export type AuthenticationAction = {
  isAuthenticated?: boolean;
  openSignIn?: boolean;
  onSignUp?: boolean;
};

class AuthenticationObserver {
  state: AuthenticationAction;
  subscribers: ((message: AuthenticationAction) => void)[];

  constructor() {
    this.subscribers = [];
    this.state = {
      isAuthenticated: false,
      openSignIn: false,
      onSignUp: false,
    };
  }

  subscribe = (subscriber: (message: AuthenticationAction) => void) => {
    this.subscribers.push(subscriber);
    subscriber(this.state);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  };

  action = (data: AuthenticationAction) => {
    this.state = { ...this.state, ...data };
    this.subscribers.forEach((subscriber) => {
      subscriber(this.state);
    });
  };
}

export const AuthenticationState = new AuthenticationObserver();

// bind this to the toast function
const authenticationFunction = (data: AuthenticationAction) => {
  AuthenticationState.action(data);
};

// We use `Object.assign` to maintain the correct types as we would lose them otherwise
export const authentication = Object.assign(authenticationFunction, {
  action: AuthenticationState.action,
});
