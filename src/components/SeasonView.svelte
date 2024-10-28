<script>
    import { pushState } from '$app/navigation';
    import { createEventDispatcher, onMount } from 'svelte';

    let { seasons, currentEpisode } = $props();
    let episodes = $state([]);

    let currentTab = $state();
    function updateEpisodeList(season) {
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

<div role="tablist" class="tabs tabs-boxed mb-8 tabs-sm lg:tabs-md border border-slate-600 shadow-xl">
    {#each Object.entries(seasons) as [season, _]}
        <button
            class:active={currentTab == season}
            onclick={() => updateEpisodeList(season)}
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
            onclick={() => changeVideo(episode.id)}
            class="btn col-span-2 btn-block {currentEpisode ==
            episode.id
                ? 'btn-active'
                : ''} border border-slate-700 shadow-md">Episode {episode.episode}</button
        >
    {/each}
</div>
