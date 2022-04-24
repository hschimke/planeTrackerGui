<script lang="ts">
    import { loginState } from "$lib/data";
    import { createEventDispatcher } from "svelte";
    import { addPassenger } from "$lib/api/passengers";

    const dispatch = createEventDispatcher();

    let email :string= ""
    let isDefault : boolean = false;
    const addNewPassenger = async () => {
        await addPassenger($loginState,{passenger_id:email, default_companion:isDefault})
        dispatch("addPassenger")
        email = "";
        isDefault = false;
    }
</script>

<div>
    <h3>Add Passenger</h3>
<label>
    <span>Passenger Email</span>
    <input type="text" placeholder="Passenger" title="Passenger Email" bind:value={email} />
</label>

<label>
    <span class="checkboxLabel">Default Passenger?</span>
    <input type="checkbox" title="Default Passenger?" bind:checked={isDefault} />
</label>

<button on:click={addNewPassenger}>Add</button>
</div>

<style>
label > span {
    display: none;
}
span.checkboxLabel {
    display: inline;
}
</style>