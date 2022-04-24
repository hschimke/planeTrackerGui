<script lang="ts">
    import type { Flight } from "$lib/api/flight";
    import { getFlights } from "$lib/api/flight";
    import FlightList from "$lib/components/flightList/flightList.svelte";
    import FlightEdit from "$lib/components/flightEdit.svelte";
    import { loginState } from "$lib/data";
    import { getPassengerFlights } from "$lib/api/passengers";

    let flightPromise = getFlights($loginState);
    let passengerFlightsPromise = getPassengerFlights($loginState)

    function doEditUpdate(event) {
        if (event.detail.type === "add") {
            flightPromise = getFlights($loginState);
        }
    }
    function doListUpdate(event) {
        if (event.detail.type === "delete" || event.detail.type === "update") {
            flightPromise = getFlights($loginState);
        }
    }
</script>

<h2>Flights</h2>

<FlightEdit on:flightedit={doEditUpdate} />
{#await flightPromise}
    <p>loading...</p>
{:then flights}
    <FlightList {flights} on:listedit={doListUpdate} />
{:catch error}
    <p>error: {error}</p>
{/await}

<h2>Flights as passenger</h2>
{#await passengerFlightsPromise}
    <p>loading...</p>
{:then flights}
{#if flights.length > 0}
    <FlightList {flights} allowEdit={false} />
    {:else}
    <p>No Flights as Passenger</p>
    {/if}
{:catch error}
    <p>error: {error}</p>
{/await}