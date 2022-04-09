<script lang="ts">
    import { loginState } from "$lib/data";

    let email = "";

    async function performLogout() {
        // TODO this code should actually do a login and not just set the store value
        loginState.set({email:"", token:""})
    }
</script>

<button on:click={performLogout}>Logout</button>