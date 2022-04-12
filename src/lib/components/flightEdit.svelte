<script lang="ts">
    import type { Flight } from "$lib/api/flight";
    import { addFlight, updateFlight } from "$lib/api/flight";
    import { loginState } from "$lib/data";
    import { createEventDispatcher } from "svelte";
    import { getProperDateFormatForNow } from "$lib/dateFormat";

    const dispatch = createEventDispatcher();

    export let flight: Flight = {
        id: "",
        origin: "",
        destination: "",
        tail_number: "",
        date: getProperDateFormatForNow(),
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
                date: getProperDateFormatForNow(),
                email: "",
            };
        } else if (buttonText === "Update") {
            await updateFlight($loginState, flight);
            dispatch("flightedit", {
                type: "update",
                id: flight.id,
            });
        } else {
            alert("Cannot complete");
        }
    }
</script>

<label>
    Origin
    <input type="text" bind:value={flight.origin} />
</label>
<label>
    Destination
    <input type="text" bind:value={flight.destination} />
</label>
<label>
    Tail
    <input type="text" bind:value={flight.tail_number} />
</label>
<label>
    Date
    <input type="date" bind:value={flight.date} />
</label>

<button on:click={doClick}>{buttonText}</button>
