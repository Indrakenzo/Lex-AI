# Lex-AI: Konsultan Hukum Virtual

Lex-AI adalah antarmuka web modern yang berfungsi sebagai asisten konsultan hukum virtual. Proyek ini mengimplementasikan arsitektur Serverless dengan backend Vercel secara aman tanpa mengekspos API Key di sisi pengguna.

## Fitur Utama
- **Fokus Hukum**: Antarmuka interaktif khusus ranah Hukum Pidana, Perdata, Bisnis, dan Ketenagakerjaan (menggunakan logo ⚖️).
- **Multi-Model AI**: Menyediakan opsi AI dari AgentRouter (Claude, Deepseek, ChatGPT) dan OpenRouter (Gemma series).
- **Keamanan Tinggi**: Input API Key manual di frontend telah dihapus. Seluruh routing dan kredensial diamankan di Vercel Backend.

## Cara Melakukan Deployment (Vercel)
1. **Push** seluruh repositori ini ke GitHub Anda.
2. Buka [Vercel](https://vercel.com) dan buat proyek baru (*Import* repositori ini).
3. **Sangat Penting:** Buka menu **Environment Variables** di Vercel **sebelum** mengklik tombol *Deploy*.
4. Tambahkan dua variabel berikut beserta API Key Anda yang valid di kolom *Value*:
   - `AGENTROUTER_API_KEY`
   - `OPENROUTER_API_KEY`
5. Klik **Deploy**. 
6. Website Lex-AI Anda sudah siap digunakan!
