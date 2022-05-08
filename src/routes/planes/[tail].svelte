<script lang="ts">
    import { page } from "$app/stores";
    import { loginState } from "$lib/data";
    import { getPlaneDetails } from "$lib/api/flight";
    import FlightDisplayRow from "$lib/components/flightList/flightDisplayRow.svelte";

    const tail = $page.params.tail;
    let detailsPromise = getPlaneDetails($loginState,tail)

</script>

<h2>Flight Details for {tail}</h2>
{#await detailsPromise}
    <p>loading...</p>
{:then detail} 
<div>
    <span>
        Total Flights:
    </span>
    <span>
        {detail.seen}
    </span>
</div>
<div>
    <span>
        Routes
    </span>
    <span>
        {#each detail.routes as route}
        <div>
            ({route.count}) {route.origin} -> {route.destination}
        </div>
        {/each}
    </span>
</div>
<div>
    <span>
        Flight List:
    </span>
    <span>
        <table>
        {#each detail.flights as flight (flight.id)}
        <FlightDisplayRow {flight} />
        {/each}
    </table>
    </span>
</div>
{:catch error}
    {error}
{/await}