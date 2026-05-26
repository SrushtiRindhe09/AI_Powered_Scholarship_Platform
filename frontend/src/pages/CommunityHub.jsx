import { useState, useEffect } from 'react';
import { MessageSquare, Heart, Share2, Search, Zap, User, Loader2 } from 'lucide-react';
import { fetchCommunityPosts, createCommunityPost } from '../services/api';

export default function CommunityHub() {
  const [question, setQuestion] = useState('');

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchCommunityPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (!question.trim()) return;
    setSubmitting(true);
    try {
      const newPost = await createCommunityPost({
        title: "Community Post", // generic for now
        content: question,
        type: "general"
      });
      setPosts([newPost, ...posts]);
      setQuestion("");
    } catch (error) {
      console.error("Failed to post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-900 mb-2">Peer Community</h1>
            <p className="text-slate-500">Connect, share experiences, and get advice from fellow applicants.</p>
          </div>
          <div className="relative">
             <input type="text" placeholder="Search discussions..." className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
             <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           
           {/* Main Feed */}
           <div className="flex-1 space-y-6">
              {/* Post Creator */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                 <div className="flex gap-4">
                    <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center shrink-0">
                       <User className="w-5 h-5 text-navy-500" />
                    </div>
                    <div className="flex-1">
                       <textarea 
                         value={question}
                         onChange={(e) => setQuestion(e.target.value)}
                         placeholder="Post a question or share a success story..."
                         className="w-full border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[100px] resize-y mb-3"
                       ></textarea>
                       <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                             <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">Add Image</button>
                             <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">Tag Topic</button>
                          </div>
                          <button 
                            disabled={submitting}
                            onClick={handlePostSubmit}
                            className="bg-navy-900 hover:bg-navy-800 text-white px-6 py-2 rounded-xl font-bold transition-all text-sm disabled:opacity-50">
                             {submitting ? 'Posting...' : 'Post'}
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Feed List */}
              {loading ? (
                 <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-emerald-500 animate-spin" /></div>
              ) : posts.length === 0 ? (
                 <div className="text-center py-12 text-slate-500">No posts yet. Be the first to start a discussion!</div>
              ) : (
                <div className="space-y-4">
                   {posts.map(post => (
                      <div key={post._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                                  {post.author.charAt(0)}
                               </div>
                               <div>
                                  <div className="font-bold text-navy-900 flex items-center gap-2">
                                     {post.author} 
                                     <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{post.role}</span>
                                  </div>
                                  <div className="text-xs text-slate-400">{new Date(post.createdAt).toLocaleDateString()}</div>
                               </div>
                            </div>
                            {post.type === 'success' && (
                               <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                                  <Zap className="w-3 h-3"/> Success Story
                               </span>
                            )}
                         </div>
                         
                         {post.title && <h3 className="font-bold text-lg text-navy-900 mb-2">{post.title}</h3>}
                         <p className="text-slate-600 text-sm leading-relaxed mb-4">{post.content}</p>
                         
                         <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                            <button className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors text-sm font-medium">
                               <Heart className="w-5 h-5"/> {post.likes}
                            </button>
                            <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors text-sm font-medium">
                               <MessageSquare className="w-5 h-5"/> {post.comments} Comments
                            </button>
                            <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors text-sm font-medium ml-auto">
                               <Share2 className="w-5 h-5"/> Share
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
              )}
           </div>

           {/* Sidebar */}
           <div className="w-full lg:w-72 space-y-6">
              <div className="bg-navy-900 rounded-3xl p-6 text-white shadow-sm">
                 <h3 className="font-bold text-lg mb-4">Trending Topics</h3>
                 <div className="flex flex-wrap gap-2">
                    {['#RelianceFoundation', '#InterviewPrep', '#Documents', '#OBCScholarship'].map(tag => (
                       <span key={tag} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-sm cursor-pointer">{tag}</span>
                    ))}
                 </div>
              </div>
              
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-navy-900 mb-4">Top Contributors</h3>
                 <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                       <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                             {i}
                          </div>
                          <div>
                             <div className="text-sm font-bold text-navy-900">User {i}</div>
                             <div className="text-xs text-slate-500">120 Answers</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
