<script lang="ts">
    import { performLogin } from "$lib/login";
    import GoogleLogin from "$lib/components/loginProviders/googleLogin.svelte";

    let email = "";

    async function doLogin() {
        performLogin(email);
    }
</script>

<h2>Login</h2>
<input bind:value={email} />
<button on:click={doLogin}>Login</button>

<h2>Google</h2>
<GoogleLogin />
