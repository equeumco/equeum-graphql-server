/**
 * Object containing data about the user making the request.
 */
interface AuthenticatedUserData {
  /** UUID of the user making the request */
  id: string;
  /** Display name of the user */
  displayName?: string;
  /** E-mail address of the user */
  email?: string;
  /** Role of the user */
  role: string;
}

export default AuthenticatedUserData;
