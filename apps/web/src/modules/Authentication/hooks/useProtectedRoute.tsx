import React from 'react';
import { RequireSignInPlaceholder } from 'src/components';
import {
  AuthenticationAction,
  AuthenticationState,
  authentication,
} from 'src/modules';

export const useProtectedRoute = () => {
  const [state, setState] = React.useState<AuthenticationAction>({});
  const { isAuthenticated } = state;
  React.useEffect(() => {
    return AuthenticationState.subscribe(setState);
  }, []);
  return {
    PlaceholderElement: !isAuthenticated ? (
      <RequireSignInPlaceholder
        onSignIn={() => authentication({ openSignIn: true })}
      />
    ) : null,
  };
};
