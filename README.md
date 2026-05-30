# Aljam3 MCP Server

MCP Server untuk **aljam3.com** — akses perpustakaan kitab Islam digital langsung dari Claude.

Dibangun dengan pola yang sama persis dengan [Turath MCP Server](https://turath-production.up.railway.app):
- Node.js + Express
- `@modelcontextprotocol/sdk` StreamableHTTP transport
- Deploy ke Railway via nixpacks

---

## Tools

| # | Tool | Fungsi |
|---|------|--------|
| 1 | `list_authors` | Daftar / cari pengarang |
| 2 | `get_author` | Detail pengarang + kitabnya |
| 3 | `list_books` | Daftar / cari kitab |
| 4 | `get_book` | Detail kitab + filenya |
| 5 | `list_categories` | Semua kategori ilmu |
| 6 | `get_category` | Detail kategori + kitabnya |
| 7 | `list_libraries` | Semua perpustakaan |
| 8 | `get_library` | Detail perpustakaan + koleksinya |
| 9 | `get_file` | Detail file (PDF/TXT) + halamannya |
| 10 | `search` | Cari teks di seluruh halaman kitab |

---

## 🚀 Deploy ke Railway (sama persis dengan turath)

### Langkah 1 — Push ke GitHub

```bash
# Buat repo baru di github.com, lalu:
git init
git add .
git commit -m "init: aljam3 mcp server"
git remote add origin https://github.com/USERNAME/aljam3-mcp.git
git push -u origin main
```

### Langkah 2 — Deploy di Railway

1. Buka [railway.app](https://railway.app) → Login
2. Klik **New Project → Deploy from GitHub repo**
3. Pilih repo `aljam3-mcp` yang baru dibuat
4. Railway otomatis detect `railway.toml` dan jalankan `npm start`
5. Tunggu beberapa menit → Railway beri URL seperti:
   ```
   https://aljam3-mcp-production.up.railway.app
   ```

### Langkah 3 — Verifikasi

Buka URL Railway di browser, seharusnya tampil:
```json
{
  "status": "ok",
  "service": "Aljam3 MCP Server",
  "version": "1.0.0",
  "mcp_endpoint": "/mcp",
  "tools": ["list_authors", "get_author", ...]
}
```

---

## 🔌 Connect ke Claude.ai Web

1. Buka **claude.ai** → klik avatar profil kanan atas
2. Pilih **Settings → Integrations**
3. Klik **Add Integration**
4. Isi:
   - **Name**: `Aljam3 Digital Library`
   - **URL**: `https://aljam3-mcp-production.up.railway.app/mcp`
     *(ganti dengan URL Railway Anda, tambahkan `/mcp` di akhir)*
5. Klik **Save**
6. Mulai gunakan!

---

## 💬 Contoh Penggunaan di Claude

```
Cari kitab tentang "الفقه" di Aljam3
```

```
Tampilkan semua kategori ilmu di perpustakaan Aljam3
```

```
Cari pengarang "النووي" di Aljam3 dan tampilkan kitab-kitabnya
```

```
Cari teks "إنما الأعمال بالنيات" di database Aljam3
```

---

## Struktur Project

```
aljam3-mcp/
├── src/
│   ├── server.js    ← MCP server utama (StreamableHTTP + Express)
│   ├── api.js       ← HTTP client ke aljam3.com API
│   └── format.js    ← Helper format output
├── package.json
├── railway.toml     ← Konfigurasi Railway deployment
└── .gitignore
```

---

## Lokal (Development)

```bash
npm install
npm run dev        # auto-reload saat ada perubahan
# atau
npm start
```

Server jalan di `http://localhost:3000`

---

## API yang Digunakan

Server ini memanggil API publik aljam3.com:

- `GET /api/v1/authors` — daftar pengarang
- `GET /api/v1/authors/:id` — detail pengarang
- `GET /api/v1/books` — daftar kitab
- `GET /api/v1/books/:id` — detail kitab
- `GET /api/v1/categories` — daftar kategori
- `GET /api/v1/categories/:id` — detail kategori
- `GET /api/v1/libraries` — daftar perpustakaan
- `GET /api/v1/libraries/:id` — detail perpustakaan
- `GET /api/v1/files/:id` — detail file
- `GET /api/v1/search` — pencarian teks
