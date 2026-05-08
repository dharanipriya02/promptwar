import { useState, useEffect } from 'react';

const cache = {};

export function useYouTube(query) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const key = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    if (!query || !key) { setVideos([]); return; }
    if (cache[query]) { setVideos(cache[query]); return; }

    setLoading(true);
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' travel vlog')}&type=video&maxResults=3&key=${key}`)
      .then(r => r.json())
      .then(data => {
        const vids = (data.items || []).map(i => ({
          id: i.id.videoId,
          title: i.snippet.title,
          channel: i.snippet.channelTitle,
          thumbnail: i.snippet.thumbnails.high?.url || i.snippet.thumbnails.default?.url,
        }));
        cache[query] = vids;
        setVideos(vids);
      })
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, [query, key]);

  return { videos, loading };
}
