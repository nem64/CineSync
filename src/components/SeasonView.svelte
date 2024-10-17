<script>
    import { pushState } from '$app/navigation';
    import { createEventDispatcher, onMount } from 'svelte';

    export let seasons;
    export let currentEpisode;
    let episodes = [];

    let currentTab;
    async function updateEpisodeList(season) {
        episodes = seasons[season];
        currentTab = season;
    }

    onMount(() => {
        Object.values(seasons).find((e) =>
            e.some((f) =>
                f.id === currentEpisode ? updateEpisodeList(f.season) : false,
            ),
        );
    });
    const dispatch = createEventDispatcher();

    function changeVideo(videoId) {
        currentEpisode = videoId;
        pushState(`/watch/${videoId}`);
        dispatch('videochange', {
            videoId: videoId,
        });
    }
</script>

<div role="tablist" class="tabs tabs-boxed mb-8 tabs-sm lg:tabs-md">
    {#each Object.entries(seasons) as [season, _]}
        <button
            class:active={currentTab == season}
            on:click={updateEpisodeList(season)}
            role="tab"
            class="tab {currentTab == season ? 'tab-active' : ''}"
            >Season {season}</button
        >
    {/each}
</div>

<div class="grid lg:grid-cols-12 grid-cols-4 gap-8 justify-center">
    {#each episodes as episode}
        <button
            class:active={currentEpisode == episode.id}
            on:click={changeVideo(episode.id)}
            class="btn lg:col-span-1 col-span-2 btn-block {currentEpisode ==
            episode.id
                ? 'btn-active'
                : ''}">Episode {episode.episode}</button
        >
    {/each}
</div>
