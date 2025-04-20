import { generateUniqueId, validateNoteInput } from './date.js';
import notesData from './dataDummy.js';

// 1. Inisialisasi Data
let notes = notesData;
let searchQuery = '';

// Load dari localStorage jika ada
const savedNotes = localStorage.getItem('notes');
if (savedNotes) {
  notes = JSON.parse(savedNotes);
}

// 2. Fungsi Filter Catatan
function filterNotes() {
  return notes.filter(note => 
    !note.archived && (
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.body.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
}

// 3. Fungsi Render Catatan
function renderNotes() {
  const noteListElement = document.querySelector('note-list');
  if (!noteListElement || !noteListElement.shadowRoot) return;

  const gridContainer = noteListElement.shadowRoot.querySelector('.notes-grid');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  const activeNotes = filterNotes();

  if (activeNotes.length === 0) {
    gridContainer.innerHTML = `
      <div class="empty-state">
        <p>${searchQuery ? 'Hasil pencarian tidak ditemukan' : 'Tidak ada catatan'}</p>
      </div>
    `;
    return;
  }

  activeNotes.forEach(note => {
    const noteCard = document.createElement('note-card');
    noteCard.setAttribute('id', note.id);
    noteCard.setAttribute('title', note.title);
    noteCard.setAttribute('body', note.body);
    noteCard.setAttribute('created-at', note.createdAt);
    gridContainer.appendChild(noteCard);
  });
}

// 4. Fungsi Tambah Catatan
function addNote(title, body) {
  try {
    validateNoteInput(title, body);

    const newNote = {
      id: generateUniqueId(),
      title: title.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
      archived: false
    };

    notes.unshift(newNote); // Tambahkan di awal array
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
  } catch (error) {
    alert(error.message);
  }
}

// 5. Fungsi Hapus Catatan
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
  showToast('Catatan dihapus!');
}

// 6. Fungsi Arsip Catatan
function archiveNote(id) {
  const note = notes.find(n => n.id === id);
  if (note) {
    note.archived = true;
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    showToast('Catatan diarsipkan!');
  }
}

// 7. Fungsi Bantu (Toast Notification)
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// 8. Inisialisasi Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Render awal
  renderNotes();

  // Search
  document.addEventListener('search', (e) => {
    searchQuery = e.detail.query;
    renderNotes();
  });

  // Add Note
  document.addEventListener('submit-note', (e) => {
    addNote(e.detail.title, e.detail.body);
  });

  // Delete Note
  document.addEventListener('delete-note', (e) => {
    if (confirm('Yakin ingin menghapus catatan ini?')) {
      deleteNote(e.detail.id);
    }
  });

  // Archive Note
  document.addEventListener('archive-note', (e) => {
    archiveNote(e.detail.id);
  });
});