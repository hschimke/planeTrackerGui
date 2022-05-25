import { loginState, type LoginState } from "$lib/data";
import { goto } from "$app/navigation";
import { browser } from '$app/env';

export async function performLogin(email, token = "UNKNOWN FAKE TOKEN", type = "fake") {
    // TODO this code should actually do a login and not just set the store value
    loginState.update((n) => {
        return {
            email: email,
            token: token,
            type: type,
        }
    })
}

export async function performLogout(state: LoginState) {
    // TODO this code should actually do a login and not just set the store value
    if (state.type === "google") {
        if (browser) {
            google.accounts.id.disableAutoSelect();
        }
    }
    loginState.set({ email: "", token: "", type: "" })
    goto("/")
}