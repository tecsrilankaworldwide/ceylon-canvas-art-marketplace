import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Armchair, Gavel, Users, Image, 
  Plus, Edit, Trash2, Eye, DollarSign, TrendingUp, ShoppingCart,
  Save, X, Upload, Loader2, LogOut, Search, Filter
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Admin Layout Component
const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) {
      navigate('/signin');
      return;
    }
    const parsed = JSON.parse(userData);
    if (!parsed.is_admin) {
      navigate('/');
      return;
    }
    setUser(parsed);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'artworks', label: 'Artworks', icon: Package },
    { id: 'furniture', label: 'Furniture', icon: Armchair },
    { id: 'auctions', label: 'Auctions', icon: Gavel },
    { id: 'artists', label: 'Artists', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex" data-testid="admin-panel">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F3057] text-white fixed h-full">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E5A93C] rounded-full flex items-center justify-center font-bold">CC</div>
            <div>
              <h1 className="font-heading text-lg">Ceylon Canvas</h1>
              <p className="text-xs text-white/60">Admin Panel</p>
            </div>
          </Link>
        </div>
        
        <nav className="p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-[#E5A93C] text-[#0F3057]' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
              data-testid={`admin-tab-${tab.id}`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#E5A93C] rounded-full flex items-center justify-center text-[#0F3057] font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
              <p className="text-xs text-white/60">{user?.email}</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

// Dashboard Tab
const DashboardTab = () => {
  const [stats, setStats] = useState({ artworks: 0, furniture: 0, auctions: 0, artists: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/stats`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Artworks', value: stats.total_artworks || 50, icon: Package, color: 'bg-blue-500' },
    { label: 'Furniture Items', value: stats.total_furniture || 43, icon: Armchair, color: 'bg-green-500' },
    { label: 'Active Auctions', value: stats.active_auctions || 30, icon: Gavel, color: 'bg-purple-500' },
    { label: 'Artists', value: stats.total_artists || 40, icon: Users, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-heading text-[#0F3057] mb-8">Dashboard Overview</h1>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#E5A93C]" />
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-[#0F3057]">{stat.value}</p>
                <p className="text-[#5C636A] text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-heading text-[#0F3057] mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link to="#" onClick={() => {}} className="p-4 border border-dashed border-[#D4B896] rounded-lg hover:bg-[#F5F5F0] transition-colors text-center">
                <Plus className="h-8 w-8 text-[#E5A93C] mx-auto mb-2" />
                <p className="text-sm text-[#0F3057]">Add Artwork</p>
              </Link>
              <Link to="#" className="p-4 border border-dashed border-[#D4B896] rounded-lg hover:bg-[#F5F5F0] transition-colors text-center">
                <Plus className="h-8 w-8 text-[#E5A93C] mx-auto mb-2" />
                <p className="text-sm text-[#0F3057]">Add Furniture</p>
              </Link>
              <Link to="#" className="p-4 border border-dashed border-[#D4B896] rounded-lg hover:bg-[#F5F5F0] transition-colors text-center">
                <Gavel className="h-8 w-8 text-[#E5A93C] mx-auto mb-2" />
                <p className="text-sm text-[#0F3057]">Create Auction</p>
              </Link>
              <Link to="#" className="p-4 border border-dashed border-[#D4B896] rounded-lg hover:bg-[#F5F5F0] transition-colors text-center">
                <Users className="h-8 w-8 text-[#E5A93C] mx-auto mb-2" />
                <p className="text-sm text-[#0F3057]">Add Artist</p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Generic Item Manager Component
const ItemManager = ({ 
  title, 
  apiEndpoint, 
  fetchEndpoint,
  fields, 
  itemName 
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const token = localStorage.getItem('token');
  const dataEndpoint = fetchEndpoint || apiEndpoint;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_URL}/api/${dataEndpoint}?limit=100`);
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const url = editItem 
        ? `${API_URL}/api/${apiEndpoint}/${editItem.id}`
        : `${API_URL}/api/${apiEndpoint}`;
      
      const method = editItem ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchItems();
        setShowForm(false);
        setEditItem(null);
        setFormData({});
      } else {
        const error = await res.json();
        alert(error.detail || 'Error saving item');
      }
    } catch (error) {
      alert('Error saving item');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${itemName}?`)) return;
    
    try {
      const res = await fetch(`${API_URL}/api/${apiEndpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchItems();
      }
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const openEdit = (item) => {
    setEditItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const openAdd = () => {
    setEditItem(null);
    const initialData = {};
    fields.forEach(f => {
      if (f.default !== undefined) initialData[f.name] = f.default;
    });
    setFormData(initialData);
    setShowForm(true);
  };

  const filteredItems = items.filter(item => 
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-heading text-[#0F3057]">{title}</h1>
        <Button onClick={openAdd} className="bg-[#E5A93C] text-[#0F3057] hover:bg-[#d4982b]">
          <Plus className="h-4 w-4 mr-2" /> Add {itemName}
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#5C636A]" />
            <Input 
              placeholder={`Search ${title.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-[#5C636A]">{filteredItems.length} items</p>
        </div>
      </div>

      {/* Items List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#E5A93C]" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F5F5F0]">
              <tr>
                <th className="text-left p-4 text-[#0F3057] font-medium">Image</th>
                <th className="text-left p-4 text-[#0F3057] font-medium">Title</th>
                <th className="text-left p-4 text-[#0F3057] font-medium">Price</th>
                <th className="text-left p-4 text-[#0F3057] font-medium">Category</th>
                <th className="text-left p-4 text-[#0F3057] font-medium">Status</th>
                <th className="text-right p-4 text-[#0F3057] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-t border-[#E5E5DF] hover:bg-[#FDFDFB]">
                  <td className="p-4">
                    <img 
                      src={item.images?.[0] || 'https://via.placeholder.com/60'} 
                      alt={item.title || item.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-[#0F3057]">{item.title || item.name}</p>
                    <p className="text-sm text-[#5C636A] truncate max-w-xs">{item.description?.slice(0, 50)}...</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-[#E5A93C]">${item.price?.toLocaleString() || 'N/A'}</p>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-[#F5F5F0] rounded text-sm capitalize">
                      {item.category || item.medium || '-'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      item.is_available !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.is_available !== false ? 'Available' : 'Sold'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openEdit(item)}
                        className="text-[#0F3057] hover:bg-[#F5F5F0]"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredItems.length === 0 && (
            <div className="p-12 text-center text-[#5C636A]">
              No items found. Click "Add {itemName}" to create one.
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5E5DF] flex items-center justify-between">
              <h2 className="text-xl font-heading text-[#0F3057]">
                {editItem ? `Edit ${itemName}` : `Add New ${itemName}`}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-[#0F3057] mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                      className="w-full border border-[#D4B896] rounded-lg p-3 min-h-[100px]"
                      required={field.required}
                    />
                  ) : field.type === 'select' ? (
                    <Select 
                      value={formData[field.name] || ''} 
                      onValueChange={(v) => setFormData({...formData, [field.name]: v})}
                    >
                      <SelectTrigger className="border-[#D4B896]">
                        <SelectValue placeholder={`Select ${field.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === 'number' ? (
                    <Input
                      type="number"
                      step={field.step || '1'}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData({...formData, [field.name]: parseFloat(e.target.value) || 0})}
                      className="border-[#D4B896]"
                      required={field.required}
                    />
                  ) : (
                    <Input
                      type={field.type || 'text'}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                      className="border-[#D4B896]"
                      required={field.required}
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="flex-1 bg-[#E5A93C] text-[#0F3057] hover:bg-[#d4982b]"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  {editItem ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Artworks Tab
const ArtworksTab = () => {
  const fields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'price', label: 'Price ($)', type: 'number', step: '0.01', required: true },
    { name: 'category', label: 'Category', type: 'select', required: true, options: [
      { value: 'painting', label: 'Painting' },
      { value: 'sculpture', label: 'Sculpture' },
      { value: 'digital', label: 'Digital Art' },
      { value: 'photography', label: 'Photography' },
      { value: 'mixed-media', label: 'Mixed Media' },
    ]},
    { name: 'medium', label: 'Medium', type: 'text' },
    { name: 'dimensions', label: 'Dimensions', type: 'text' },
    { name: 'year_created', label: 'Year Created', type: 'number' },
    { name: 'images', label: 'Image URL', type: 'text' },
  ];

  return <ItemManager title="Artworks" apiEndpoint="admin/artworks" fetchEndpoint="artworks" fields={fields} itemName="Artwork" />;
};

// Furniture Tab
const FurnitureTab = () => {
  const fields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'price', label: 'Price ($)', type: 'number', step: '0.01', required: true },
    { name: 'category', label: 'Category', type: 'select', required: true, options: [
      { value: 'antique', label: 'Antique' },
      { value: 'contemporary', label: 'Contemporary' },
      { value: 'export_quality', label: 'Export Quality' },
      { value: 'handcrafted_unique', label: 'Handcrafted Unique' },
    ]},
    { name: 'furniture_type', label: 'Type', type: 'select', required: true, options: [
      { value: 'wooden', label: 'Wooden' },
      { value: 'brass_metal', label: 'Brass/Metal' },
      { value: 'cane_rattan', label: 'Cane/Rattan' },
      { value: 'carved_decorative', label: 'Carved Decorative' },
    ]},
    { name: 'region', label: 'Market Region', type: 'select', required: true, options: [
      { value: 'local', label: 'Local (Sri Lanka)' },
      { value: 'asian', label: 'Asian Export' },
      { value: 'european', label: 'European Export' },
      { value: 'american', label: 'American Export' },
    ]},
    { name: 'origin', label: 'Country of Origin', type: 'text', required: true },
    { name: 'material', label: 'Material', type: 'text', required: true },
    { name: 'dimensions', label: 'Dimensions', type: 'text', required: true },
    { name: 'condition', label: 'Condition', type: 'select', options: [
      { value: 'excellent', label: 'Excellent' },
      { value: 'good', label: 'Good' },
      { value: 'fair', label: 'Fair' },
      { value: 'requires_restoration', label: 'Requires Restoration' },
    ]},
    { name: 'year_made', label: 'Year Made', type: 'number' },
    { name: 'images', label: 'Image URL', type: 'text' },
  ];

  return <ItemManager title="Furniture" apiEndpoint="furniture" fields={fields} itemName="Furniture" />;
};

// Auctions Tab  
const AuctionsTab = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch(`${API_URL}/api/artworks?is_auction=true&limit=50`);
        if (res.ok) {
          const data = await res.json();
          setAuctions(data.filter(a => a.is_auction));
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-heading text-[#0F3057] mb-8">Auctions</h1>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#E5A93C]" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F5F5F0]">
              <tr>
                <th className="text-left p-4 text-[#0F3057] font-medium">Artwork</th>
                <th className="text-left p-4 text-[#0F3057] font-medium">Current Bid</th>
                <th className="text-left p-4 text-[#0F3057] font-medium">Reserve</th>
                <th className="text-left p-4 text-[#0F3057] font-medium">Bids</th>
                <th className="text-left p-4 text-[#0F3057] font-medium">Ends</th>
              </tr>
            </thead>
            <tbody>
              {auctions.map((auction) => (
                <tr key={auction.id} className="border-t border-[#E5E5DF]">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={auction.images?.[0] || 'https://via.placeholder.com/50'} alt={auction.title} className="w-12 h-12 object-cover rounded" />
                      <p className="font-medium text-[#0F3057]">{auction.title}</p>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[#E5A93C]">${auction.current_bid?.toLocaleString() || '0'}</td>
                  <td className="p-4">${auction.reserve_price?.toLocaleString() || 'N/A'}</td>
                  <td className="p-4">{auction.bid_count || 0}</td>
                  <td className="p-4 text-sm">{auction.auction_end_date ? new Date(auction.auction_end_date).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {auctions.length === 0 && (
            <div className="p-12 text-center text-[#5C636A]">No active auctions</div>
          )}
        </div>
      )}
    </div>
  );
};

// Artists Tab
const ArtistsTab = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch(`${API_URL}/api/artists?limit=100`);
        if (res.ok) {
          const data = await res.json();
          setArtists(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-heading text-[#0F3057] mb-8">Artists</h1>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#E5A93C]" />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <div key={artist.id} className="bg-white p-6 rounded-lg shadow-sm">
              <img 
                src={artist.avatar || 'https://via.placeholder.com/100'} 
                alt={artist.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-heading text-lg text-[#0F3057] text-center">{artist.name}</h3>
              <p className="text-sm text-[#5C636A] text-center mb-2">{artist.specialty}</p>
              <p className="text-xs text-center text-[#E5A93C]">{artist.total_sales || 0} sales</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Admin Panel Component
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'artworks': return <ArtworksTab />;
      case 'furniture': return <FurnitureTab />;
      case 'auctions': return <AuctionsTab />;
      case 'artists': return <ArtistsTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminPanel;
