<script lang="ts">
    import { loginState } from "$lib/data";

    let email = "";

    async function performLogin() {
        // TODO this code should actually do a login and not just set the store value
        loginState.update((n) => {
            return {
                email: email,
                token: "UNKNOWN FAKE TOKEN"
            }
        })
    }
</script>

<h2>Login</h2>
<input bind:value={email} />
<button on:click={performLogin}>Login</button>
