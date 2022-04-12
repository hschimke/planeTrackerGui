<script lang="ts">
    import { goto } from "$app/navigation";
    import { loginState } from "$lib/data";
    import { bulkUploadFlight } from "$lib/api/flight";

    let bulkData;

    async function doUpload() {
        let newIds = await bulkUploadFlight($loginState, bulkData);
        goto("/flights");
    }
</script>

<style>
    textarea {
        width: 60%;
        height: 20em;
    }
</style>

<h2>Bulk Upload Flights</h2>
<p>
    Currently this is only supported with the Apple Shortcuts notepad option. If
    you have your flights in a different format you can reformat them to look
    like that.
</p>
<p>
    The format for the Apple Shortcuts file is: "TAIL_NUMBER ORIGIN DESTINATION
    DATE(YYYYMMDD)"
</p>

<textarea bind:value={bulkData} />
<button on:click={doUpload}>Upload</button>
