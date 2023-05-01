import {TokenResponse} from "../contracts/api/auth.constracts";
import {ApplicationStorage} from "./ApplicationStorage";

const authStorage = new ApplicationStorage<TokenResponse>('auth');

export default authStorage;