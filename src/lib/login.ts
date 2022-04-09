import { loginState } from "$lib/data";

export async function performLogin(email) {
    // TODO this code should actually do a login and not just set the store value
    loginState.update((n) => {
        return {
            email: email,
            token: "UNKNOWN FAKE TOKEN"
        }
    })
}

export async function performLogout() {
    // TODO this code should actually do a login and not just set the store value
    loginState.set({ email: "", token: "" })
}