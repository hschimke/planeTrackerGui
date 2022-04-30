<script>
    import FakeLogin from "$lib/components/loginProviders/fakeLogin.svelte";
</script>

<h2>About PlaneTracker</h2>
<p>
    Plane tracker helps you keep track of which planes you have been on, and
    where.
</p>

<h2>Future Updates</h2>
<p>
    We're currently on version 0.3.1, but there are some features which are coming
    before 1.0.
</p>
<ul>
    <li>Interesting statistics.</li>
    <li>Flight sharing.</li>
    <li class="done">Passenger lists</li>
    <li>Editable Passenger lists!</li>
</ul>

<h2>Open Source</h2>
<p>
    PlaneTracker is open source. You can view the <a
        href="https://github.com/hschimke/planeTracker">server code</a
    >
    and the
    <a href="https://github.com/hschimke/planeTrackerGui">client code</a> on github.
</p>
<p>
    PlaneTracker is licensed under an MIT license, and uses parts of the MIT
    licensed project <a href="https://github.com/mwgg/Airports">Airports</a>
</p>

<style>
    .done {
        text-decoration: line-through;
    }
</style>
