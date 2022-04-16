import type { LoginState } from "$lib/data";
import { performLogout } from "$lib/login";

export async function checkResponse<T>(loginState: LoginState, response:Response) {
    let returnData :T;
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