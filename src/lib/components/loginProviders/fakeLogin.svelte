<script lang="ts">
    import { performLogin } from "$lib/login";

    let email = "";

    async function doLogin() {
        performLogin(email);
    }
</script>

<input bind:value={email} />
<button on:click={doLogin}>Login</button>