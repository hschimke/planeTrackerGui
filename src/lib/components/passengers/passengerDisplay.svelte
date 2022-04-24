<script lang="ts">
    import { loginState } from "$lib/data";
    import type {passenger} from "$lib/api/passengers"
    import { createEventDispatcher } from "svelte";
    import { removePassenger } from "$lib/api/passengers";

    const dispatch = createEventDispatcher();

    export let passenger : passenger;

    const onDelete = async () => {
        await removePassenger($loginState,passenger.passenger_id)
        dispatch("deletePassenger")
    }
</script>

    <div>{passenger.passenger_id}</div>
    <div>{passenger.default_companion === true ? "DEFAULT" : ""}</div>
    <button on:click={onDelete}>Delete</button>