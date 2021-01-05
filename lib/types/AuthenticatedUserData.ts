/**
 * Object containing data about the user making the request.
 */
interface AuthenticatedUserData {
    /** UUID of the user making the request. */
    id: string;
    /** Role of the user */
    role: string;
    /** Display name of the user (only found in user tokens) */
    displayName?: string;
    /** E-mail address of the user (only found in user tokens) */
    email?: string;
    /** When user is a machine, this holds name by which machine
   * can be identified (only found in M2M tokens)
   */
    machineName?: string;
    /** Indicates if request is made via external API */
    isExternal?: boolean;
}

export default AuthenticatedUserData;
