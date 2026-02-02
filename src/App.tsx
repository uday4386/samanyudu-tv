import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Newspaper,
  Film,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Upload,
  X,
  AlertCircle,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  Menu,
  FileCheck,
  Smartphone,
  UserCircle,
  CloudSun,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast, Toaster } from 'sonner';
import logoImage from './assets/logo.png';

// --- Mock Data & Types ---

type NewsType = 'Political' | 'Accident' | 'Education' | 'Crime' | 'Weather' | 'Sports' | 'Business' | 'Social' | 'Others';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  area: string;
  type: NewsType;
  isBreaking: boolean;
  timestamp: string;
  author?: string; // Added to track if it's user submitted
  status?: 'published' | 'pending' | 'rejected';
}

interface ShortItem {
  id: string;
  title: string;
  videoUrl: string;
  duration: number; // in seconds
  timestamp: string;
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'మంత్రి మండల సమావేశం - కీలక నిర్ణయాలు',
    description: 'రాష్ట్ర అభివృద్ధి పై కీలక చర్చలు జరిగాయి. ముఖ్యమంత్రి పలు వరాలు ప్రకటించారు.',
    imageUrl: 'https://images.unsplash.com/photo-1529101091760-61df5286861e?auto=format&fit=crop&q=80&w=800',
    area: 'Vijayawada',
    type: 'Political',
    isBreaking: true,
    timestamp: '2024-02-02T10:30:00',
    status: 'published',
    author: 'Admin'
  },
  {
    id: '2',
    title: 'Heavy Rainfall Expected in Coastal Districts',
    description: 'The meteorological department has issued a red alert for the next 48 hours.',
    imageUrl: 'https://images.unsplash.com/photo-1514632542677-48fae74a01b2?auto=format&fit=crop&q=80&w=800',
    area: 'Visakhapatnam',
    type: 'Weather',
    isBreaking: false,
    timestamp: '2024-02-01T14:20:00',
    status: 'published',
    author: 'Admin'
  }
];

const MOCK_PENDING_NEWS: NewsItem[] = [
  {
    id: 'p1',
    title: 'Local School Science Fair Winners Announced',
    description: 'Students from ZP High School showcased amazing innovations in robotics and agriculture.',
    imageUrl: 'https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?auto=format&fit=crop&q=80&w=800',
    area: 'Guntur',
    type: 'Education',
    isBreaking: false,
    timestamp: '2024-02-02T08:15:00',
    status: 'pending',
    author: 'Ravi Kumar (User)'
  },
  {
    id: 'p2',
    title: 'Accident on National Highway 65',
    description: 'A lorry overturned near the toll plaza causing heavy traffic jam. Police have arrived at the spot.',
    imageUrl: '', // No image provided
    area: 'Suryapet',
    type: 'Accident',
    isBreaking: false,
    timestamp: '2024-02-02T11:45:00',
    status: 'pending',
    author: 'Siva Reddy (User)'
  }
];

const MOCK_SHORTS: ShortItem[] = [
  {
    id: '1',
    title: 'Traffic Update: Main Road Blocked',
    videoUrl: 'https://example.com/video1.mp4',
    duration: 15,
    timestamp: '2024-02-02T09:15:00'
  },
  {
    id: '2',
    title: 'Festival Celebrations at Temple',
    videoUrl: 'https://example.com/video2.mp4',
    duration: 28,
    timestamp: '2024-02-01T18:45:00'
  }
];

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab, mobileOpen, setMobileOpen }: { activeTab: string, setActiveTab: (t: string) => void, mobileOpen: boolean, setMobileOpen: (o: boolean) => void }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'news', label: 'Manage News', icon: Newspaper },
    { id: 'shorts', label: 'Manage Shorts', icon: Film },
    { id: 'approvals', label: 'User Approvals', icon: FileCheck },
    { id: 'app_preview', label: 'App View', icon: Smartphone },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#0f172a] border-r border-slate-800 transform transition-transform duration-200 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-800 flex justify-center">
            <img src={logoImage} alt="SAMANYUDU TV" className="h-16 object-contain" />
          </div>

          <nav className="flex-1 py-6 px-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${activeTab === item.id
                  ? 'bg-yellow-500 text-slate-900 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const DashboardStats = ({ newsCount, shortsCount, pendingCount }: { newsCount: number, shortsCount: number, pendingCount: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 text-sm font-medium">Total News Articles</p>
            <h3 className="text-3xl font-bold text-white mt-2">{newsCount}</h3>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Newspaper className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-400">
          <span className="flex items-center"><Plus size={14} className="mr-1" /> 12 this week</span>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 text-sm font-medium">Total Shorts/Reels</p>
            <h3 className="text-3xl font-bold text-white mt-2">{shortsCount}</h3>
          </div>
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Film className="text-purple-500" size={24} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-green-400">
          <span className="flex items-center"><Plus size={14} className="mr-1" /> 5 this week</span>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 text-sm font-medium">Pending Approvals</p>
            <h3 className="text-3xl font-bold text-white mt-2">{pendingCount}</h3>
          </div>
          <div className="p-3 bg-orange-500/20 rounded-lg">
            <FileCheck className="text-orange-500" size={24} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-yellow-400">
          <span className="flex items-center">Requires attention</span>
        </div>
      </div>
    </div>
  );
};

// --- News Manager ---

const NewsForm = ({
  initialData,
  onSave,
  onCancel
}: {
  initialData?: NewsItem | null,
  onSave: (data: Omit<NewsItem, 'id' | 'timestamp'>) => void,
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    area: initialData?.area || '',
    type: initialData?.type || 'Others' as NewsType,
    isBreaking: initialData?.isBreaking || false,
    imageUrl: initialData?.imageUrl || '',
    videoUrl: initialData?.videoUrl || ''
  });

  const newsTypes: NewsType[] = ['Political', 'Accident', 'Education', 'Crime', 'Weather', 'Sports', 'Business', 'Social', 'Others'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.area) {
      toast.error('Please fill in all required fields');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 w-full max-w-2xl rounded-xl border border-slate-700 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
          <h2 className="text-xl font-bold text-white">{initialData ? 'Edit News Article' : 'Upload New Article'}</h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <form id="newsForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Title <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                  placeholder="Enter news headline..."
                />
              </div>

              {/* Breaking News Switch */}
              <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div>
                  <h4 className="font-semibold text-red-400">Breaking News Alert</h4>
                  <p className="text-xs text-red-300/70">Enable this to show the red scrolling ticker on the user app.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBreaking}
                    onChange={(e) => setFormData({ ...formData, isBreaking: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description <span className="text-red-400">*</span></label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 resize-none"
                  placeholder="Enter full news details..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Area / Location <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                    placeholder="e.g. Vijayawada, Hyderabad"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Category <span className="text-red-400">*</span></label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as NewsType })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                  >
                    {newsTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Media */}
              <div className="space-y-3 pt-2">
                <label className="block text-sm font-medium text-slate-300">Media Attachments</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center hover:border-yellow-500/50 transition-colors cursor-pointer bg-slate-800/50">
                    <ImageIcon className="text-slate-400 mb-2" size={24} />
                    <span className="text-xs text-slate-400">Add Photos</span>
                  </div>
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center hover:border-yellow-500/50 transition-colors cursor-pointer bg-slate-800/50">
                    <Video className="text-slate-400 mb-2" size={24} />
                    <span className="text-xs text-slate-400">Add Video</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">Supports JPG, PNG and MP4 formats.</p>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-800/50 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="newsForm"
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-lg transition-colors shadow-lg shadow-yellow-500/20"
          >
            {initialData ? 'Update News' : 'Publish News'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const NewsManager = ({ news, setNews }: { news: NewsItem[], setNews: React.Dispatch<React.SetStateAction<NewsItem[]>> }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this news item?')) {
      setNews(prev => prev.filter(item => item.id !== id));
      toast.success('News item deleted successfully');
    }
  };

  const handleSave = (data: Omit<NewsItem, 'id' | 'timestamp'>) => {
    if (editingItem) {
      setNews(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...data } : item));
      toast.success('News updated successfully');
    } else {
      const newItem: NewsItem = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...data
      };
      setNews(prev => [newItem, ...prev]);
      toast.success('News published successfully');
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Manage News</h2>
        <button
          onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-bold transition-all"
        >
          <Plus size={20} />
          <span>Upload News</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-yellow-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
          >
            <option value="All">All Categories</option>
            {['Political', 'Accident', 'Education', 'Crime', 'Weather', 'Sports', 'Business', 'Social', 'Others'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredNews.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-xl border border-slate-700 p-4 flex flex-col md:flex-row gap-4 hover:border-slate-600 transition-colors"
          >
            <div className="w-full md:w-48 h-32 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                      {item.type}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                      {item.area}
                    </span>
                    {item.isBreaking && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-500 border border-red-500/30 flex items-center gap-1">
                        <AlertCircle size={10} /> BREAKING
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingItem(item); setIsFormOpen(true); }}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>
              </div>
              <div className="mt-4 flex items-center text-xs text-slate-500">
                <span>Posted on {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredNews.length === 0 && (
          <div className="text-center py-12 text-slate-500 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
            <Newspaper size={48} className="mx-auto mb-3 opacity-20" />
            <p>No news articles found matching your criteria.</p>
          </div>
        )}
      </div>

      {isFormOpen && (
        <NewsForm
          initialData={editingItem}
          onSave={handleSave}
          onCancel={() => { setIsFormOpen(false); setEditingItem(null); }}
        />
      )}
    </div>
  );
};

const NewsApprovalManager = ({ pendingNews, setPendingNews, setNews }: { pendingNews: NewsItem[], setPendingNews: React.Dispatch<React.SetStateAction<NewsItem[]>>, setNews: React.Dispatch<React.SetStateAction<NewsItem[]>> }) => {
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);

  const handleApprove = (item: NewsItem) => {
    // Add to main news list
    const approvedItem = { ...item, status: 'published' as const, timestamp: new Date().toISOString() };
    setNews(prev => [approvedItem, ...prev]);

    // Remove from pending
    setPendingNews(prev => prev.filter(p => p.id !== item.id));
    setSelectedItem(null);
    toast.success(`News from ${item.author} approved and published!`);
  };

  const handleReject = (id: string) => {
    if (confirm('Are you sure you want to reject this submission? It will be removed permanently.')) {
      setPendingNews(prev => prev.filter(p => p.id !== id));
      setSelectedItem(null);
      toast.error('Submission rejected.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Pending User Approvals</h2>

      <div className="grid grid-cols-1 gap-4">
        {pendingNews.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800 rounded-xl border border-slate-700 p-4 flex flex-col md:flex-row gap-4"
          >
            <div className="w-full md:w-48 h-32 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0 relative">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <ImageIcon size={32} />
                </div>
              )}
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                PENDING
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                    {item.type}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                    {item.area}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Submitted by: {item.author}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Review Details
                </button>
                <button
                  onClick={() => handleApprove(item)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 size={16} /> Approve
                </button>
                <button
                  onClick={() => handleReject(item.id)}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <X size={16} /> Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {pendingNews.length === 0 && (
          <div className="text-center py-16 text-slate-500 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
            <CheckCircle2 size={48} className="mx-auto mb-3 opacity-20 text-green-500" />
            <p className="text-lg font-medium text-slate-400">All caught up!</p>
            <p className="text-sm">No pending submissions from users.</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 w-full max-w-2xl rounded-xl border border-slate-700 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <h2 className="text-xl font-bold text-white">Review Submission</h2>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              {selectedItem.imageUrl && (
                <div className="w-full h-64 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                  <img src={selectedItem.imageUrl} alt={selectedItem.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">Category: {selectedItem.type}</span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">Area: {selectedItem.area}</span>
                  <span className="px-3 py-1 bg-blue-900/30 rounded-full text-xs text-blue-400 border border-blue-500/20">User: {selectedItem.author}</span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 border border-slate-700">Time: {new Date(selectedItem.timestamp).toLocaleString()}</span>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedItem.description}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-800/50 flex justify-end gap-3">
              <button
                onClick={() => handleReject(selectedItem.id)}
                className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold rounded-lg transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => handleApprove(selectedItem)}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-green-500/20"
              >
                Approve & Publish
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// --- App Preview Component ---

const AppPreview = ({ news, shorts }: { news: NewsItem[], shorts: ShortItem[] }) => {
  const [subTab, setSubTab] = useState<'home' | 'categories'>('home');

  // Group news by type for the home view
  const groupedNews = news.reduce((acc, item) => {
    if (item.status === 'published' || !item.status) { // Include only published or legacy items
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
    }
    return acc;
  }, {} as Record<string, NewsItem[]>);

  // Get all unique categories available
  const categories = Array.from(new Set(news.map(n => n.type)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">User App Content</h2>
        <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setSubTab('home')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${subTab === 'home' ? 'bg-yellow-500 text-slate-900 shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Home
          </button>
          <button
            onClick={() => setSubTab('categories')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${subTab === 'categories' ? 'bg-yellow-500 text-slate-900 shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Categories
          </button>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 min-h-[600px]">
        {subTab === 'home' ? (
          <div className="space-y-6">
            {/* App Header: Admin, Weather, Notifications */}
            <div className="flex items-center justify-between bg-[#048ABF] p-4 rounded-xl border border-slate-700 backdrop-blur-sm shadow-lg shadow-blue-900/20">
              {/* Left: Admin Profile */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-slate-900 shadow-lg">
                  <UserCircle size={24} />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-none">Admin</p>
                  <span className="text-[10px] text-yellow-500 font-medium bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20 mt-1 inline-block">VERIFIED</span>
                </div>
              </div>

              {/* Center: Weather Widget */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-white">
                  <CloudSun size={24} className="text-yellow-400" />
                  <span className="font-bold text-xl">28°C</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Vijayawada</p>
              </div>

              {/* Right: Notifications */}
              <button className="relative p-2.5 bg-slate-700/50 hover:bg-slate-700 text-white rounded-full transition-all hover:scale-105 active:scale-95 border border-slate-600">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-slate-800 rounded-full animate-pulse"></span>
              </button>
            </div>

            {/* Breaking News Ticker */}
            {news.some(n => n.isBreaking) && (
              <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold flex items-center gap-4 overflow-hidden rounded-lg shadow-lg shadow-red-900/20">
                <span className="bg-white text-red-600 px-2 py-0.5 text-xs rounded uppercase tracking-wider animate-pulse font-bold shrink-0">Breaking News</span>
                <div className="animate-marquee whitespace-nowrap overflow-hidden">
                  {news.filter(n => n.isBreaking).map(n => n.title).join(' • ')}
                </div>
              </div>
            )}

            {/* Shorts Section */}
            <div>
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Film size={20} className="text-yellow-500" /> Shorts & Reels
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {shorts.map(short => (
                  <div key={short.id} className="shrink-0 w-48 aspect-[9/16] bg-slate-800 rounded-lg overflow-hidden relative border border-slate-700 shadow-md group cursor-pointer hover:border-yellow-500/50 transition-colors">
                    <div className="absolute inset-0 bg-slate-700 flex items-center justify-center group-hover:bg-slate-700/50 transition-colors">
                      <Video size={32} className="text-slate-500 group-hover:text-yellow-500 transition-colors" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-3 flex flex-col justify-end">
                      <p className="text-white text-sm font-medium line-clamp-2 leading-tight">{short.title}</p>
                      <span className="text-xs text-slate-400 mt-1">{short.duration}s</span>
                    </div>
                  </div>
                ))}
                {shorts.length === 0 && (
                  <div className="text-slate-500 italic px-4 py-8 w-full text-center bg-slate-800/30 rounded-lg border border-dashed border-slate-800">
                    No shorts available currently.
                  </div>
                )}
              </div>
            </div>

            {/* News Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(groupedNews).map(([category, items]) => (
                <div key={category} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="text-white font-bold text-xl capitalize border-l-4 border-yellow-500 pl-3">{category}</h3>
                    <button className="text-sm text-yellow-500 font-medium hover:text-yellow-400">View All</button>
                  </div>
                  <div className="space-y-4">
                    {items.slice(0, 3).map(item => (
                      <div key={item.id} className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-sm flex h-28 hover:border-slate-600 transition-colors">
                        <div className="w-32 h-full bg-slate-700 relative shrink-0">
                          {item.imageUrl && <img src={item.imageUrl} className="w-full h-full object-cover" alt="" />}
                        </div>
                        <div className="p-3 flex flex-col justify-between flex-1">
                          <div>
                            <h4 className="text-white font-semibold text-base line-clamp-2 leading-tight mb-1">{item.title}</h4>
                            <p className="text-slate-400 text-xs line-clamp-1">{item.description}</p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                            <span className="bg-slate-700/50 px-1.5 py-0.5 rounded">{item.area}</span>
                            <span>•</span>
                            <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map(cat => (
              <div key={cat} className="aspect-square bg-slate-800 border border-slate-700 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-yellow-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group shadow-lg">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-yellow-500/10 transition-colors">
                  <Newspaper className="text-slate-400 group-hover:text-yellow-500" size={24} />
                </div>
                <div className="text-center">
                  <span className="block text-white font-bold text-base">{cat}</span>
                  <span className="text-xs text-slate-500">{groupedNews[cat]?.length || 0} articles</span>
                </div>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="col-span-full text-center text-slate-500 py-20 flex flex-col items-center">
                <Filter size={48} className="opacity-20 mb-4" />
                <p>No categories found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Shorts Manager ---

const ShortsForm = ({
  initialData,
  onSave,
  onCancel
}: {
  initialData?: ShortItem | null,
  onSave: (data: Omit<ShortItem, 'id' | 'timestamp'>) => void,
  onCancel: () => void
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [duration, setDuration] = useState(initialData?.duration || 0); // Simulated duration
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error('Please enter a title');
      return;
    }

    // Simulate duration check if a new file is "uploaded"
    // In a real app, we'd read metadata from the file
    const currentDuration = videoFile ? Math.floor(Math.random() * 45) : duration;

    if (currentDuration > 30) {
      toast.error(`Video is too long (${currentDuration}s). Shorts must be under 30 seconds.`);
      return;
    }

    onSave({
      title,
      videoUrl: initialData?.videoUrl || 'https://example.com/new-short.mp4',
      duration: currentDuration || 15
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 w-full max-w-md rounded-xl border border-slate-700 shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
          <h2 className="text-xl font-bold text-white">{initialData ? 'Edit Short' : 'Upload New Short'}</h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Title <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
              placeholder="Enter short title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Video File <span className="text-red-400">*</span></label>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center hover:border-yellow-500/50 transition-colors cursor-pointer bg-slate-800/50 relative group">
              <input
                type="file"
                accept="video/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setVideoFile(e.target.files[0]);
                    toast.info("Video selected. Duration will be verified on upload.");
                  }
                }}
              />
              <Video className="text-slate-400 mb-2 group-hover:text-yellow-500 transition-colors" size={32} />
              <span className="text-sm text-slate-400 group-hover:text-slate-200">{videoFile ? videoFile.name : 'Click to upload video'}</span>
              <span className="text-xs text-slate-500 mt-1">Max duration: 30 seconds</span>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex gap-3 items-start">
            <AlertCircle className="text-yellow-500 flex-shrink-0 mt-0.5" size={16} />
            <p className="text-xs text-yellow-200/80">Videos longer than 30 seconds will be automatically rejected by the system.</p>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-lg transition-colors shadow-lg shadow-yellow-500/20"
            >
              {initialData ? 'Update Short' : 'Upload Short'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const ShortsManager = ({ shorts, setShorts }: { shorts: ShortItem[], setShorts: React.Dispatch<React.SetStateAction<ShortItem[]>> }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShortItem | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this short?')) {
      setShorts(prev => prev.filter(item => item.id !== id));
      toast.success('Short deleted successfully');
    }
  };

  const handleSave = (data: Omit<ShortItem, 'id' | 'timestamp'>) => {
    if (editingItem) {
      setShorts(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...data } : item));
      toast.success('Short updated successfully');
    } else {
      const newItem: ShortItem = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...data
      };
      setShorts(prev => [newItem, ...prev]);
      toast.success('Short uploaded successfully');
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Manage Shorts</h2>
        <button
          onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-bold transition-all"
        >
          <Plus size={20} />
          <span>Upload Short</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shorts.map(item => (
          <div key={item.id} className="group relative aspect-[9/16] bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
            {/* Mock Video Thumbnail */}
            <div className="absolute inset-0 bg-slate-700 flex items-center justify-center">
              <Video size={48} className="text-slate-600" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end">
              <h3 className="text-white font-bold line-clamp-2 mb-1">{item.title}</h3>
              <span className="text-xs text-slate-300 mb-3">{item.duration} sec</span>

              <div className="grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={() => { setEditingItem(item); setIsFormOpen(true); }}
                  className="bg-slate-800/80 hover:bg-white hover:text-slate-900 text-white p-2 rounded-lg flex justify-center backdrop-blur-sm transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-lg flex justify-center backdrop-blur-sm transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {shorts.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl">
            <Film size={48} className="mx-auto mb-3 opacity-20" />
            <p>No shorts uploaded yet.</p>
          </div>
        )}
      </div>

      {isFormOpen && (
        <ShortsForm
          initialData={editingItem}
          onSave={handleSave}
          onCancel={() => { setIsFormOpen(false); setEditingItem(null); }}
        />
      )}
    </div>
  );
};

// --- Main App ---

import splashImage from './assets/splash_v2.jpg';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // -- Persistent State Initialization --
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('samanyudu_news');
    return saved ? JSON.parse(saved) : MOCK_NEWS;
  });

  const [pendingNews, setPendingNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('samanyudu_pending');
    return saved ? JSON.parse(saved) : MOCK_PENDING_NEWS;
  });

  const [shorts, setShorts] = useState<ShortItem[]>(() => {
    const saved = localStorage.getItem('samanyudu_shorts');
    return saved ? JSON.parse(saved) : MOCK_SHORTS;
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  // -- Persistence Effects --
  useEffect(() => {
    localStorage.setItem('samanyudu_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('samanyudu_pending', JSON.stringify(pendingNews));
  }, [pendingNews]);

  useEffect(() => {
    localStorage.setItem('samanyudu_shorts', JSON.stringify(shorts));
  }, [shorts]);

  // -- Splash Screen Effect --
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-[#020617] z-[100]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full relative flex items-center justify-center bg-black"
        >
          <img
            src={splashImage}
            alt="Loading..."
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 font-sans overflow-hidden selection:bg-yellow-500/30">
      <Toaster position="top-right" theme="dark" />

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-[#0f172a] border-b border-slate-800 flex items-center px-4 justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="text-slate-300">
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-bold text-yellow-500">SAMANYUDU TV</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
                <DashboardStats newsCount={news.length} shortsCount={shorts.length} pendingCount={pendingNews.length} />

                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Breaking News</h3>
                  <div className="space-y-3">
                    {news.filter(n => n.isBreaking).slice(0, 3).map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                        <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                        <span className="text-white font-medium truncate">{item.title}</span>
                      </div>
                    ))}
                    {news.filter(n => n.isBreaking).length === 0 && (
                      <p className="text-slate-500 text-sm">No breaking news active currently.</p>
                    )}
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Latest News Updates</h3>
                    <button onClick={() => setActiveTab('news')} className="text-sm text-yellow-500 hover:text-yellow-400">View All</button>
                  </div>
                  <div className="space-y-3">
                    {news.slice(0, 5).map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-slate-700/30 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors">
                        <div className="w-16 h-12 bg-slate-600 rounded overflow-hidden flex-shrink-0">
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm truncate">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold bg-slate-700 px-1.5 rounded">{item.type}</span>
                            <span className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {item.isBreaking && (
                          <span className="flex-shrink-0 text-[10px] font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded uppercase">Breaking</span>
                        )}
                      </div>
                    ))}
                    {news.length === 0 && (
                      <p className="text-slate-500 text-center py-4">No news articles available.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'news' && (
              <NewsManager news={news} setNews={setNews} />
            )}

            {activeTab === 'app_preview' && (
              <AppPreview news={news} shorts={shorts} />
            )}

            {activeTab === 'approvals' && (
              <NewsApprovalManager pendingNews={pendingNews} setPendingNews={setPendingNews} setNews={setNews} />
            )}

            {activeTab === 'shorts' && (
              <ShortsManager shorts={shorts} setShorts={setShorts} />
            )}

            {activeTab === 'settings' && (
              <div className="flex items-center justify-center h-64 text-slate-500">
                <p>Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
