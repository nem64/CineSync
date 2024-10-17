async function search(value) {
    let request = await (await fetch(`https://cinemana.shabakaty.com/api/android/video/V/2/itemsPerPage/1/video_title_search/${btoa(value).replaceAll('=', '')}/itemsPerPage/12/pageNumber/0/level/0`)).json()
    let result = [];
    request.forEach(video => {
        result.push(
            {
                id: video['nb'],
                title: video['en_title'],
                imageUrl: video['imgObjUrl'],
                description: video['en_content']
            }
        )
    });

    return result;
}

async function fetchSeries(rootId) {
    let episodes = await (await fetch(`https://cinemana.shabakaty.com/api/android/videoSeason/id/${rootId}`)).json()
    let seasons = {};
    episodes.forEach(episode => {
        if (seasons[episode['season']] === undefined) {
            seasons[episode['season']] = []
        }

        seasons[episode['season']].push({
            id: episode['nb'],
            title: episode['en_title'],
            season: episode['season'],
            episode: episode['episodeNummer'],
            imageUrl: episode['imgObjUrl'],
            description: episode['en_content'],
            series: episode['kind'] === '2' ? true : false,
            translationFiles: {
                arabic: episode['arTranslationFilePath'] !== undefined ? episode['arTranslationFilePath'].replaceAll('srt', 'vtt') : undefined,
                english: episode['arTranslationFilePath'] !== undefined ? episode['enTranslationFilePath'].replaceAll('srt', 'vtt') : undefined
            },
        })
    });

    return seasons;
}
async function videoInfo(id) {
    let request = await (await fetch(`https://cinemana.shabakaty.com/api/android/allVideoInfo/id/${id}`)).json();
    let result = {
        id: request['nb'],
        title: request['en_title'],
        season: request['season'],
        episode: request['episodeNummer'],        
        imageUrl: request['imgObjUrl'],
        description: request['en_content'],
        series: request['kind'] === '2' ? true : false,
        translationFiles: {
            arabic: request['arTranslationFilePath'] !== undefined ? request['arTranslationFilePath'].replaceAll('srt', 'vtt') : undefined,
            english: request['arTranslationFilePath'] !== undefined ? request['enTranslationFilePath'].replaceAll('srt', 'vtt') : undefined
        },
    }

    return result
}


async function videoURLs(id) {
    let request = await (await fetch(`https://cinemana.shabakaty.com/api/android/transcoddedFiles/id/${id}`)).json();
    let results = [];

    request.forEach(resolution => {
        results.push({
            type: 'video/' + resolution.container,
            src: resolution.videoUrl,
            label: resolution.resolution
        })
    });
    return results;
}

export { search, videoInfo, fetchSeries, videoURLs };