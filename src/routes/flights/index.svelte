<script lang="ts">
    import type { Flight } from "$lib/api/flight";
    import { getFlights } from "$lib/api/flight";
    import FlightList from "$lib/components/flightList.svelte";
    import FlightEdit from "$lib/components/flightEdit.svelte";
    import { loginState } from "$lib/data";

    let flightPromise = getFlights($loginState);
    function doEditUpdate(event){
        if(event.detail.type === "add"){
            flightPromise = getFlights($loginState);
        }
    }
</script>

<h2>Flights</h2>

<FlightEdit on:flightedit={doEditUpdate} />
{#await flightPromise}
    <p>loading...</p>
{:then flights}
    <FlightList {flights} />
    {:catch error}
    <p>error: {error}</p>
{/await}
