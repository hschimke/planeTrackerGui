<script lang="ts">
    import type { Flight } from "$lib/api/flight";
    import { addFlight, updateFlight } from "$lib/api/flight";
    import { loginState } from "$lib/data";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let flight: Flight = {
        id: "",
        origin: "",
        destination: "",
        tail_number: "",
        date: "",
        email: "",
    };
    let buttonText = "Add";
    if (flight.id !== "") {
        buttonText = "Update";
    }
    async function doClick() {
        if (buttonText === "Add") {
            await addFlight($loginState, flight);
            dispatch("flightedit", {
                type: "add",
            });
            flight = {
                id: "",
                origin: "",
                destination: "",
                tail_number: "",
                date: "",
                email: "",
            };
        } else if (buttonText === "Update") {
            await updateFlight($loginState, flight);
            dispatch("flightedit", {
                type: "update",
                id: flight.id
            });
        } else {
            alert("Cannot complete");
        }
    }
</script>

<input type="text" bind:value={flight.origin} />
<input type="text" bind:value={flight.destination} />
<input type="text" bind:value={flight.tail_number} />
<input type="date" bind:value={flight.date} />
<button on:click={doClick}>{buttonText}</button>
