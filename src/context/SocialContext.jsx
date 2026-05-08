import { createContext, useContext, useState, useEffect } from 'react';
import { communityPosts as seedPosts } from '../data/communityPosts';

const SocialContext = createContext(null);

const STORAGE_KEY = 'wandr_social';
const load = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null; } catch { return null; }};

export function SocialProvider({ children }) {
  const saved = load();
  const [posts, setPosts] = useState(saved?.posts || seedPosts);
  const [following, setFollowing] = useState(saved?.following || []);
  const [journal, setJournal] = useState(saved?.journal || []);
  const [comments, setComments] = useState(saved?.comments || {});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ posts, following, journal, comments }));
  }, [posts, following, journal, comments]);

  const addPost = (post) => {
    const newPost = { ...post, id: 'u' + Date.now(), likes: 0, datePosted: new Date().toISOString().split('T')[0], isVlogger: false };
    setPosts(prev => [newPost, ...prev]);
    setJournal(prev => [newPost.id, ...prev]);
  };

  const toggleLike = (postId) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const toggleFollow = (authorId) => {
    setFollowing(prev => prev.includes(authorId) ? prev.filter(id => id !== authorId) : [...prev, authorId]);
  };

  const addComment = (postId, text, authorName = 'You') => {
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { id: Date.now(), text, author: authorName, date: new Date().toISOString() }]
    }));
  };

  return (
    <SocialContext.Provider value={{ posts, following, journal, comments, addPost, toggleLike, toggleFollow, addComment }}>
      {children}
    </SocialContext.Provider>
  );
}

export const useSocial = () => useContext(SocialContext);
