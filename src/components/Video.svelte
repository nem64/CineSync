<script>
    import { onMount } from 'svelte';
    import { videoURLs } from '$lib/cinemana.js';
    import videojs from 'video.js';
    import 'video.js/dist/video-js.css';
    import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css';
    import qualitySelector from '@silvermine/videojs-quality-selector';
    import "videojs-hotkeys";

    export let data;
    let video;
    qualitySelector(videojs);
    onMount(async () => {
        if (videojs.getPlayers()['player']) {
            videojs.getPlayers()['player'].dispose();
        }

        let urls = await videoURLs(data.id);
        let subtitles = [
            {
                kind: 'captions',
                label: 'English',
                src: data.translationFiles.english,
            },
            {
                kind: 'captions',
                label: 'Arabic',
                src: data.translationFiles.arabic,
            },
        ];
        video = videojs(
            'player',
            {
                tracks: subtitles,
                sources: urls,
            },
            function () {
                var player = this;
                player.hotkeys({
                    volumeStep: 0.1,
                    seekStep: 5,
                    enableModifiersForNumbers: false,
                });
                player.controlBar.addChild('QualitySelector');
            },
        );
    });
</script>

<div class="text-center min-w-max mb-4 text-2xl font-bold">
    <span class="">
        {data.title}
        {#if data.series}
            - Season {data.season} Episode {data.episode}
        {/if}
    </span>
</div>
<div class="divider"></div>
<video-js id="player" class="vjs-16-9" controls>
    <track kind="captions" />
</video-js>
