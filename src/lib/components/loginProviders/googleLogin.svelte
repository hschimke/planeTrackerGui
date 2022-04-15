<script lang="ts">
    import jwt_decode from "jwt-decode";
    import { performLogin } from "$lib/login";
    import { onMount } from "svelte";

    let setupDone = false;
    let mounted = false;

    onMount(() => {
        mounted = true;
        if (!setupDone) {
            setupGoogle();
        }
    });

    function handleGAPILoaded() {
        if (mounted && !setupDone) {
            setupGoogle();
        }
    }

    function decodeJwtResponse(token) {
        return jwt_decode(token) as {
            sub: string;
            name: string;
            given_name: string;
            family_name: string;
            picture: string;
            email: string;
        };
    }

    function handleCredentialResponse(response) {
        // decodeJwtResponse() is a custom function defined by you
        // to decode the credential response.
        const responsePayload = decodeJwtResponse(response.credential);

        /*
        console.log("ID: " + responsePayload.sub);
        console.log("Full Name: " + responsePayload.name);
        console.log("Given Name: " + responsePayload.given_name);
        console.log("Family Name: " + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);
        */

        performLogin(responsePayload.email, response.credential, "google");
    }

    function setupGoogle() {
        if (!setupDone) {
            google.accounts.id.initialize({
                client_id:
                import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" } // customization attributes
            );
            google.accounts.id.prompt(); // also display the One Tap dialog
            setupDone = true;
        }
    }
</script>

<svelte:head>
    <script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        on:load={handleGAPILoaded}></script>
</svelte:head>

<div id="buttonDiv" />
