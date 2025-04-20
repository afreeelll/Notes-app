// Fungsi untuk memformat tanggal
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        mont: 'long',
        day: 'numeric'
    });
}

// Fungsi generate unique ID
export function generateUniqueId() {
    return `notes-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Fungsi validasi input
export function validateNoteInput(title, body) {
    if (!title || title.trim() === '') {
        throw new Error('Judul catatan tidak boleh kosong');
    }

    if (!body || body.trim() === '') {
        throw new Error('Isi catatan tidak boleh kosong');
    }

    if (title.length > 40) {
        throw new Error('Judul catatan maksimal 40 karakter');
    }

    if (body.length > 1000) {
        throw new Error('Isi catatan maksumal 1000 karakter');
    }

    return true;
}