<script>
    import { search } from "$lib/cinemana.js";
    import VideoCard from '$components/VideoCard.svelte';
    let entry = null;
    let videos = [];

    async function populateVideos(event) {
        if(event.key === 'Enter') {
            videos = await search(entry);
        }
    }
    
</script>

<input
    type="text"
    placeholder="Search movie/series"
    bind:value={entry}
    on:keydown={populateVideos}
    class="input input-bordered w-full"
/>

<div class="grid grid-cols-1 gap-16 lg:grid-cols-4 md:grid-cols-2 p-8" id="container">
    {#each videos as vid}
        <VideoCard info={vid}/>
    {/each}
</div>
