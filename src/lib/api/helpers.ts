import type { LoginState } from "$lib/data";
import { performLogout } from "$lib/login";

export const API_PREFIX = import.meta.env.VITE_API_ENDPOINT
export const API_VERSION = "v1/"

export async function checkResponse<T>(loginState: LoginState, response: Response) {
    let returnData: T;
    switch (response.status) {
        case 200:
            returnData = await response.json();
            break;
        case 401:
            alert("Unauthorized access, you have been logged out.")
            performLogout(loginState);
            break;
        default:
            break;
    }
    return returnData
}