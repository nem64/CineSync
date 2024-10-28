<script>
    import { videoInfo, fetchSeries } from '$lib/cinemana.js';
    import SeasonView from '$components/SeasonView.svelte';
    import Video from '$components/Video.svelte';
    let { data } = $props()

    let info = $state(videoInfo(data.videoId));
    let series = $state(fetchSeries(data.videoId));
    
    function handleVideoChange(event) {
        info = videoInfo(event.detail.videoId);
    }
</script>

<div class="grid grid-cols-12 gap-8">
    {#await info}
        <p>Loading...</p>
    {:then promise}
        <div class="col-span-12">
            <Video on:videochange={handleVideoChange} data={promise} />
        </div>
    {/await}

    {#await series}
        <p>Loading...</p>
    {:then promise}
        {#if Object.keys(promise).length !== 0}
            <div class="col-span-12">
                <SeasonView
                    on:videochange={handleVideoChange}
                    seasons={promise}
                    currentEpisode={data.videoId}
                />
            </div>
        {/if}
    {/await}
</div>
