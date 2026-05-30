/**
 * Helper format output untuk tools Aljam3 MCP
 */

export function formatAuthor(a) {
  const lines = [
    `✍️  ${a.name || '—'}  (author_id: ${a.id})`,
    a.bio              ? `📖 ${a.bio}`              : null,
    a.books_count      ? `📚 Jumlah kitab: ${a.books_count}` : null,
  ];
  return lines.filter(Boolean).join('\n');
}

export function formatBook(b) {
  const lines = [
    `📖 ${b.title || '—'}  (book_id: ${b.id})`,
    b.author?.name || b.author_name
      ? `✍️  Pengarang: ${b.author?.name || b.author_name}`
      : null,
    b.category?.name || b.category_name
      ? `🏷️  Kategori: ${b.category?.name || b.category_name}`
      : null,
    b.library?.name
      ? `🏛️  Perpustakaan: ${b.library?.name}`
      : null,
    b.pages_count
      ? `📄 Halaman: ${b.pages_count}`
      : null,
    b.description
      ? `💬 ${b.description}`
      : null,
  ];
  return lines.filter(Boolean).join('\n');
}

export function formatBookList(data, label = 'Hasil') {
  if (!data || !data.data?.length) return `ℹ️ ${label}: tidak ada hasil.`;

  const p = data.pagination || {};
  const header = `📚 ${label} — ${p.total ?? data.data.length} total | hal. ${p.page ?? 1}/${p.total_pages ?? 1}\n`;
  const items = data.data.map((b, i) => `[${i + 1}] ${formatBook(b)}`).join('\n\n');
  return header + '\n' + items;
}

export function formatAuthorList(data, label = 'Pengarang') {
  if (!data || !data.data?.length) return `ℹ️ ${label}: tidak ada hasil.`;

  const p = data.pagination || {};
  const header = `✍️  ${label} — ${p.total ?? data.data.length} total | hal. ${p.page ?? 1}/${p.total_pages ?? 1}\n`;
  const items = data.data.map((a, i) => `[${i + 1}] ${formatAuthor(a)}`).join('\n\n');
  return header + '\n' + items;
}

export function formatSearchResults(data, query) {
  if (!data || !data.data?.length) return `🔍 Pencarian "${query}": tidak ada hasil.`;

  const p = data.pagination || {};
  const header = `🔍 Hasil pencarian "${query}" — ${p.total ?? data.data.length} total | hal. ${p.page ?? 1}/${p.total_pages ?? 1}\n`;

  const items = data.data.map((r, i) => {
    const lines = [
      `[${i + 1}] 📖 ${r.book?.title || r.book_title || '—'}  (book_id: ${r.book_id || r.book?.id || '—'})`,
      r.book?.author?.name || r.author_name
        ? `    ✍️  ${r.book?.author?.name || r.author_name}`
        : null,
      r.page_number
        ? `    📄 Halaman: ${r.page_number}`
        : null,
      r.content || r.text || r.snippet
        ? `    💬 ${(r.content || r.text || r.snippet).replace(/<[^>]+>/g, '').trim()}`
        : null,
    ];
    return lines.filter(Boolean).join('\n');
  });

  return header + '\n' + items.join('\n\n');
}

export function formatCategory(c, withBooks = false) {
  const lines = [
    `🏷️  ${c.name || '—'}  (category_id: ${c.id})`,
    c.books_count ? `📚 Jumlah kitab: ${c.books_count}` : null,
  ];
  const base = lines.filter(Boolean).join('\n');
  if (withBooks && c.books?.data?.length) {
    const buku = c.books.data.map((b, i) => `  [${i + 1}] ${b.title} (id: ${b.id})`).join('\n');
    return base + '\n\nKoleksi Kitab:\n' + buku;
  }
  return base;
}

export function formatLibrary(lib, withBooks = false) {
  const lines = [
    `🏛️  ${lib.name || '—'}  (library_id: ${lib.id})`,
    lib.description ? `💬 ${lib.description}` : null,
    lib.books_count ? `📚 Jumlah kitab: ${lib.books_count}` : null,
  ];
  const base = lines.filter(Boolean).join('\n');
  if (withBooks && lib.books?.data?.length) {
    const buku = lib.books.data.map((b, i) => `  [${i + 1}] ${b.title} (id: ${b.id})`).join('\n');
    return base + '\n\nKoleksi Kitab:\n' + buku;
  }
  return base;
}

export function formatFile(f, withPages = false) {
  const lines = [
    `📁 File ID: ${f.id}`,
    f.format        ? `📄 Format: ${f.format}`                 : null,
    f.pages_count   ? `📑 Jumlah halaman: ${f.pages_count}`     : null,
    f.pdf_url       ? `🔗 PDF: ${f.pdf_url}`                    : null,
    f.txt_url       ? `🔗 TXT: ${f.txt_url}`                    : null,
  ];
  const base = lines.filter(Boolean).join('\n');
  if (withPages && f.pages?.data?.length) {
    const halaman = f.pages.data
      .slice(0, 5)
      .map((p, i) => `  [${i + 1}] Hal. ${p.number}: ${(p.content || '').slice(0, 100)}…`)
      .join('\n');
    return base + '\n\nPratinjau 5 Halaman Pertama:\n' + halaman;
  }
  return base;
}
