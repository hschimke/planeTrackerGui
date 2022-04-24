<script lang="ts">
    import GoogleLogin from "$lib/components/loginProviders/googleLogin.svelte";
import FakeLogin from "$lib/components/loginProviders/fakeLogin.svelte";
</script>

<h2>Fake</h2>
<FakeLogin />

<h2>Google</h2>
<GoogleLogin />
