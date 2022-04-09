<script lang="ts">
    import {performLogin} from "$lib/login";

    let email = "";

    async function doLogin() {
        performLogin(email);
    }
</script>

<h2>Login</h2>
<input bind:value={email} />
<button on:click={doLogin}>Login</button>
