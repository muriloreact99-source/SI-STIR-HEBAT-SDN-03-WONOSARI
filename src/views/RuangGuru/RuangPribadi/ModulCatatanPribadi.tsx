import React, { useState } from 'react';
import { Lock, Plus, Search, Trash2 } from 'lucide-react';
import { HomeroomTeacher, PrivateNote } from '../../../types';
import { INITIAL_PRIVATE_NOTES } from '../../../data/mockData';
import { StatusChip } from '../../../components/StatusChip';
import { DataContohBadge } from '../../../components/DataContohBadge';

interface ModulCatatanPribadiProps {
  teacher: HomeroomTeacher;
  onShowToast: (msg: string) => void;
}

export const ModulCatatanPribadi: React.FC<ModulCatatanPribadiProps> = ({
  teacher,
  onShowToast,
}) => {
  const [notes, setNotes] = useState<PrivateNote[]>(INITIAL_PRIVATE_NOTES);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<'ide_mengajar' | 'pengingat' | 'refleksi' | 'bahan_rapat'>('ide_mengajar');

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      onShowToast('Judul dan isi catatan belum diisi.');
      return;
    }

    const newNote: PrivateNote = {
      id: `pn-${Date.now()}`,
      title,
      body,
      category,
      updatedAt: 'Baru saja',
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setBody('');
    setShowAddForm(false);
    onShowToast('Catatan pribadi berhasil disimpan (Lapis Hanya Anda).');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    onShowToast('Catatan dihapus.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-[#12383A]">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#FF8C52]" />
            <h2 className="text-2xl font-extrabold text-[#12383A]">
              Catatan Pribadi Guru (Kelas {teacher.grade})
            </h2>
            <StatusChip status="Hanya Anda" size="sm" />
            <DataContohBadge />
          </div>
          <p className="text-xs sm:text-sm text-[#12383A]/80 font-medium mt-1">
            Buku catatan privat guru. Tidak ada orang lain yang dapat membaca catatan ini termasuk Kepala Sekolah dan Admin.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="tactile-btn px-4 py-2 rounded-full bg-[#FF8C52] text-white text-xs font-extrabold flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Catatan Baru</span>
        </button>
      </div>

      {/* Teks Peringatan Privasi (Sesuai Bagian 5.J DESIGN.md) */}
      <div className="p-3.5 rounded-2xl bg-[#CFEFEC] border-2 border-[#12383A] shadow-tactile-mini flex items-center justify-between text-xs font-bold text-[#12383A]">
        <span>
          🛡️ Privasi Terlindungi: Hindari menulis data kesehatan terperinci atau nomor identitas kependudukan di sini.
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#12383A]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari ide mengajar, refleksi, atau bahan rapat..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-[#12383A] bg-white text-xs text-[#12383A]"
          />
        </div>
      </div>

      {/* Add Note Modal/Form */}
      {showAddForm && (
        <div className="tactile-card p-6 bg-[#FFFAE6] border-2 border-[#12383A] shadow-tactile-card space-y-4">
          <div className="flex justify-between items-center pb-2 border-b-2 border-[#12383A]">
            <h3 className="font-extrabold text-base text-[#12383A]">
              Tulis Catatan Pribadi Baru
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="w-7 h-7 rounded-full bg-white border border-[#12383A] text-xs font-extrabold"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSaveNote} className="space-y-3">
            <div>
              <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                Kategori Catatan
              </label>
              <div className="flex flex-wrap gap-2">
                {(['ide_mengajar', 'pengingat', 'refleksi', 'bahan_rapat'] as const).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border-2 border-[#12383A] transition-all ${
                      category === cat
                        ? 'bg-[#12383A] text-[#FFF0C5] shadow-tactile-mini'
                        : 'bg-white text-[#12383A]'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                Judul Catatan
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Gagasan Proyek Menanam Biji Jagung..."
                className="w-full p-2.5 rounded-xl border-2 border-[#12383A] bg-white text-xs text-[#12383A]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#12383A] mb-1">
                Isi Catatan Privat
              </label>
              <textarea
                rows={4}
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tuliskan gagasan, refleksi, atau poin pengingat Anda di sini..."
                className="w-full p-3 rounded-2xl border-2 border-[#12383A] bg-white text-xs text-[#12383A]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-full border-2 border-[#12383A] bg-white text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="tactile-btn px-6 py-2 rounded-full bg-[#359FA0] text-white text-xs font-extrabold"
              >
                Simpan Catatan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid Catatan */}
      {filteredNotes.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border-2 border-dashed border-[#12383A] bg-[#FFFAE6]">
          <p className="text-sm font-bold text-[#12383A] mb-2">
            Belum ada catatan. Hanya Anda yang bisa membacanya.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="tactile-btn px-4 py-2 rounded-full bg-[#FF8C52] text-white text-xs font-bold"
          >
            Tulis Catatan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="tactile-card p-5 bg-white border-2 border-[#12383A] shadow-tactile-card flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFFAE6] text-[#12383A] text-[10px] font-extrabold uppercase border border-[#12383A]">
                    {note.category.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-[#12383A]/60 font-semibold">
                    {note.updatedAt}
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-[#12383A] mb-1">
                  {note.title}
                </h4>
                <p className="text-xs text-[#12383A]/85 font-medium leading-relaxed">
                  {note.body}
                </p>
              </div>

              <div className="pt-3 border-t border-[#12383A]/20 mt-3 flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#12383A]/60">
                  Lapis 1 • Hanya Anda
                </span>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="p-1 text-[#ba1a1a] hover:bg-[#FFD9C2] rounded-lg transition-colors"
                  title="Hapus Catatan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
