<script lang="ts">
    import { loginState } from "$lib/data";
    import Logout from "$lib/components/logout.svelte";
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li div {
    display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}
</style>

<ul>
    <li>
        <a href="/">Home</a>
    </li>
    <li>
        <a href="/flights">Flights</a>
    </li>
    <li>
        <a href="/flights/upload">Upload</a>
        </li>
    <li style="float:right">
        <div>
            {#if $loginState.email !== ""}
                {$loginState.email} <Logout />
            {:else}
                <p>Please login</p>
            {/if}
        </div>
    </li>
</ul>
