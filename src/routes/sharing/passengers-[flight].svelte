<script lang="ts">
    import { page } from "$app/stores";
    import { loginState } from "$lib/data";
    import {
        getPassengers,
        addPassengerToFlight,
        getPassengersForFlight,
        removePassengerFrom,
    } from "$lib/api/passengers";

    const flight = $page.params.flight;

    let passengersPromise = getPassengers($loginState);
    let passengersOnFlightPromise = getPassengersForFlight($loginState, flight);

    const addPax = async (passenger) => {
        await addPassengerToFlight($loginState,flight,passenger);
        passengersOnFlightPromise = getPassengersForFlight($loginState, flight);
    };
    const removePax = async (passenger) => {
        await removePassengerFrom($loginState,flight,passenger)
        passengersOnFlightPromise = getPassengersForFlight($loginState, flight);
    };
</script>

<h2>Passengers</h2>
{#await passengersPromise}
    ... wait passengers ...
{:then passengers}
    {#await passengersOnFlightPromise}
        --- wait load ---
    {:then passengersOnFlight}
        <div class="passengerFlightListBox">
            {#each passengers as passenger}
                <div>
                    {passenger.passenger_id}
                </div>
                <div>
                    {passengersOnFlight.includes(passenger.passenger_id)
                        ? "On Flight"
                        : "Not On Flight"}
                </div>
                <div>
                    {#if passengersOnFlight.includes(passenger.passenger_id)}
                        <button
                            on:click={() => {
                                removePax(passenger.passenger_id);
                            }}
                        >
                            Remove
                        </button>
                    {:else}
                        <button
                            on:click={() => {
                                addPax(passenger.passenger_id);
                            }}
                        >
                            Add
                        </button>
                    {/if}
                </div>
            {/each}
        </div>
    {/await}
{/await}

<style>
    .passengerFlightListBox {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
</style>
