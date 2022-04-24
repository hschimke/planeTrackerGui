<script lang="ts">
    import { loginState } from "$lib/data";
    import { getPassengers } from "$lib/api/passengers";
    import AddPassenger from "$lib/components/passengers/addPassenger.svelte";
    import PassengerDisplay from "$lib/components/passengers/passengerDisplay.svelte";

    let passengerListPromise = getPassengers($loginState);

    const reloadPassengerList = () => {
        passengerListPromise = getPassengers($loginState);
    };
</script>

<h2>Passengers</h2>

<AddPassenger on:addPassenger={reloadPassengerList} />

{#await passengerListPromise}
    <p>Loading Passengers...</p>
{:then passengerList}
<h3>Passengers</h3>
    <div class="passengerList">
        {#each passengerList as passenger}
            <PassengerDisplay {passenger} on:deletePassenger={reloadPassengerList} />
        {/each}
    </div>
{:catch e}
    {e}
{/await}

<style>
    div.passengerList {
        width: 20em;
        display: grid;
        grid-template-columns: 1fr 1fr .5fr;
    }
</style>
