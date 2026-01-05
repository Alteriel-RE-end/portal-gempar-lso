import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  BookOpen, 
  PenTool, 
  Mic, 
  CheckCircle, 
  Clock, 
  Search, 
  Menu, 
  X, 
  BarChart3,
  Award,
  ArrowRight,
  Info
} from 'lucide-react';

// --- MOCK DATA (Simulasi Database) ---
const INITIAL_SUBMISSIONS = [
  {
    id: 1,
    title: "Refleksi Pergerakan di Era 5.0",
    author: "Sahabat Ahmad",
    rayon: "Rayon FIP",
    category: "Akademik",
    status: "published",
    date: "2024-01-15",
    type: "Esai",
    likes: 45
  },
  {
    id: 2,
    title: "Sholawat Burdah Cover",
    author: "Sahabati Rina",
    rayon: "Rayon Sastra",
    category: "Seni",
    status: "published",
    date: "2024-01-18",
    type: "Video",
    likes: 82
  },
  {
    id: 3,
    title: "Fiqh Wanita Modern",
    author: "Sahabat Budi",
    rayon: "Rayon Ekonomi",
    category: "Agama",
    status: "review",
    date: "2024-01-20",
    type: "Artikel",
    likes: 0
  }
];

// --- COMPONENTS ---

const Navbar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('home')}>
            {/* UPDATE LOGO: Memanggil file logo.png dari folder public */}
            <img 
              src="/logo.png" 
              alt="Logo PMII" 
              className="w-10 h-10 object-contain bg-white rounded-full p-0.5 shadow-md"
              onError={(e) => {
                // Fallback jika gambar tidak ditemukan/rusak
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback Element (Muncul jika logo gagal load) */}
            <div className="hidden w-10 h-10 bg-yellow-400 rounded-full items-center justify-center text-blue-900 font-bold border-2 border-white">L</div>
            
            <span className="font-bold text-xl tracking-wider">LSO AN-NASHIH</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['Home', 'Gallery', 'Submit', 'Statistik'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActivePage(item.toLowerCase())}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activePage === item.toLowerCase() 
                      ? 'bg-blue-800 text-yellow-400' 
                      : 'hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-blue-800">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-900 px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-blue-800">
          {['Home', 'Gallery', 'Submit', 'Statistik'].map((item) => (
            <button
              key={item}
              onClick={() => {
                setActivePage(item.toLowerCase());
                setIsOpen(false);
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 w-full text-left"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const HeroSection = ({ setActivePage }) => (
  <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4 relative overflow-hidden">
    {/* Background Watermark Logo (Optional) */}
    <div className="absolute top-0 right-0 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
       <img src="/logo.png" className="w-96 h-96 grayscale" alt="" />
    </div>

    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className="inline-block px-4 py-1 bg-yellow-500 text-blue-900 rounded-full font-bold text-sm mb-6 animate-pulse">
        🔥 Program Unggulan: GEMPAR
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
        Gerakan Mengumpulkan Karya <br/>
        <span className="text-yellow-400">Komisariat Sunan Kalijaga</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
        Wadah eksklusif untuk kader menyalurkan bakat di bidang Agama, Akademik, dan Seni. 
        Kirim karyamu, biarkan dunia melihat potensimu.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={() => setActivePage('submit')}
          className="px-8 py-4 bg-yellow-400 text-blue-900 rounded-lg font-bold hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-400/20"
        >
          <Upload size={20} />
          Kirim Karya Sekarang
        </button>
        <button 
          onClick={() => setActivePage('gallery')}
          className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <BookOpen size={20} />
          Lihat Galeri
        </button>
      </div>
    </div>
  </div>
);

const StatsCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-900 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase">{label}</p>
        <h3 className={`text-3xl font-bold mt-1 ${color}`}>{value}</h3>
      </div>
      <div className={`p-3 rounded-full bg-gray-50 text-blue-900`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

const StatisticsPage = ({ submissions }) => {
  const totalWorks = submissions.length;
  const publishedWorks = submissions.filter(s => s.status === 'published').length;
  const categories = {
    Agama: submissions.filter(s => s.category === 'Agama').length,
    Akademik: submissions.filter(s => s.category === 'Akademik').length,
    Seni: submissions.filter(s => s.category === 'Seni').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <BarChart3 className="text-blue-900" />
        Data Kuantitatif GEMPAR
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard icon={Upload} label="Total Karya Masuk" value={totalWorks} color="text-blue-900" />
        <StatsCard icon={CheckCircle} label="Terpublikasi" value={publishedWorks} color="text-green-600" />
        <StatsCard icon={Clock} label="Dalam Kurasi" value={totalWorks - publishedWorks} color="text-orange-500" />
        <StatsCard icon={Award} label="Target Periode" value="5+" color="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Distribusi Kategori</h3>
          <div className="space-y-4">
            {Object.entries(categories).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">{key}</span>
                  <span className="text-gray-500">{val} Karya</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-900 h-2.5 rounded-full" 
                    style={{ width: `${totalWorks > 0 ? (val / totalWorks) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Info size={20}/> Insight LSO
          </h3>
          <p className="text-gray-700 mb-4">
            Berdasarkan data saat ini, kategori <strong>{Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b)}</strong> memiliki jumlah kontribusi tertinggi.
          </p>
          <p className="text-gray-700">
            Disarankan untuk melakukan <em>Talent Scouting</em> lebih intensif pada kategori lain untuk menyeimbangkan output karya.
          </p>
        </div>
      </div>
    </div>
  );
};

const SubmissionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    rayon: '',
    category: 'Agama',
    type: '',
    link: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    alert("Karya berhasil dikirim ke dapur redaksi LSO! Pantau status kurasi.");
    setFormData({ name: '', rayon: '', category: 'Agama', type: '', link: '', description: '' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-900 px-8 py-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <PenTool /> Formulir Open Submission
          </h2>
          <p className="text-blue-100 mt-2">Kirimkan karya terbaikmu. Pastikan orisinal dan tidak mengandung SARA.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Nama Sahabat/i"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asal Rayon</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.rayon}
                onChange={e => setFormData({...formData, rayon: e.target.value})}
              >
                <option value="">Pilih Rayon...</option>
                <option value="Rayon FIP">Rayon FIP</option>
                <option value="Rayon Sastra">Rayon Sastra</option>
                <option value="Rayon Ekonomi">Rayon Ekonomi</option>
                <option value="Rayon FIS">Rayon FIS</option>
                <option value="Rayon MIPA">Rayon MIPA</option>
                <option value="Rayon Teknik">Rayon Teknik</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Karya (Pilar LSO)</label>
            <div className="grid grid-cols-3 gap-4">
              {['Agama', 'Akademik', 'Seni'].map((cat) => (
                <div 
                  key={cat}
                  onClick={() => setFormData({...formData, category: cat})}
                  className={`cursor-pointer border rounded-lg p-4 text-center transition-all ${
                    formData.category === cat 
                      ? 'border-blue-900 bg-blue-50 text-blue-900 font-bold' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Karya</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Contoh: Esai, Video Cover, Desain Poster"
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link File Karya (GDrive/YouTube/Cloud)</label>
            <input 
              required
              type="url" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://..."
              value={formData.link}
              onChange={e => setFormData({...formData, link: e.target.value})}
            />
            <p className="text-xs text-gray-500 mt-1">*Pastikan akses link sudah dibuka (Public/Anyone with link)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Singkat</label>
            <textarea 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
              placeholder="Jelaskan sedikit tentang karyamu..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition-colors shadow-md"
          >
            Kirim Karya Untuk Dikurasi
          </button>
        </form>
      </div>
    </div>
  );
};

const GalleryPage = ({ submissions }) => {
  const published = submissions.filter(s => s.status === 'published');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Etalase Karya</h2>
          <p className="text-gray-500">Karya terbaik kader Komisariat Sunan Kalijaga</p>
        </div>
        <div className="mt-4 md:mt-0 relative">
          <input 
            type="text" 
            placeholder="Cari karya..." 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none w-64"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {published.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 group">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              {/* Placeholder for actual image/video thumbnail */}
              <div className="absolute inset-0 bg-blue-900/10 flex items-center justify-center text-blue-900 group-hover:scale-110 transition-transform duration-500">
                {item.category === 'Seni' ? <Mic size={48} /> : item.category === 'Akademik' ? <BookOpen size={48} /> : <Award size={48} />}
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-900 shadow-sm">
                {item.category}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">{item.type}</span>
                <span className="text-xs text-gray-400">{item.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-900">
                  {item.author.charAt(0)}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{item.author}</span>
                  <span className="mx-1">•</span>
                  <span className="text-xs">{item.rayon}</span>
                </div>
              </div>
              <button className="w-full py-2 border border-blue-900 text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                Lihat Karya <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);

  const handleNewSubmission = (data) => {
    const newId = submissions.length + 1;
    const newSubmission = {
      id: newId,
      title: "Karya Baru (Menunggu Kurasi)",
      author: data.name,
      rayon: data.rayon,
      category: data.category,
      status: 'review', // Default status
      date: new Date().toLocaleDateString(),
      type: data.type,
      likes: 0
    };
    setSubmissions([newSubmission, ...submissions]);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <HeroSection setActivePage={setActivePage} />
            <div className="py-12 px-4 max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Alur Program GEMPAR</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">Sistem terintegrasi mulai dari penjaringan, kurasi, hingga apresiasi karya.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Upload, title: "1. Submission / Scouting", desc: "Kirim karyamu secara mandiri atau melalui undangan tim Talent Scouting." },
                  { icon: Search, title: "2. Kurasi & Quality Control", desc: "Tim LSO memverifikasi orisinalitas, muatan materi, dan kelayakan tayang." },
                  { icon: Award, title: "3. Publikasi & Reward", desc: "Karya terpilih dipublikasikan di kanal resmi dan berpeluang mendapat insentif." }
                ].map((step, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:border-blue-200 transition-colors">
                    <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <step.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'submit':
        return <SubmissionForm onSubmit={handleNewSubmission} />;
      case 'gallery':
        return <GalleryPage submissions={submissions} />;
      case 'statistik':
        return <StatisticsPage submissions={submissions} />;
      default:
        return <HeroSection setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {renderContent()}
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
             {/* Footer Logo: Memanggil logo.png juga */}
             <img 
              src="/logo.png" 
              alt="Logo PMII" 
              className="w-8 h-8 object-contain bg-white rounded-full p-0.5"
            />
             <p className="font-bold text-lg">LSO AN-NASHIH</p>
          </div>
          <p className="text-blue-200 text-sm">PMII Komisariat Sunan Kalijaga - Universitas Negeri Malang</p>
          <div className="mt-4 pt-4 border-t border-blue-800 text-xs text-blue-300">
            &copy; 2024 Gerakan Mengumpulkan Karya (GEMPAR). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;