import AuthenticatedUserData from './AuthenticatedUserData';

class EqueumContext {
  user?: AuthenticatedUserData;
  authHeader: string;
}

export default EqueumContext;
