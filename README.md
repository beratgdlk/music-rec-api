# Müzik Öneri ve Yayın Platformu

## Proje Özeti
Bu proje, Spotify benzeri bir müzik öneri ve yayın platformudur. Kullanıcıların şarkıları keşfetmesine, çalma listeleri oluşturmasına, sosyal etkileşimde bulunmasına ve kişiselleştirilmiş müzik önerileri almasına olanak tanır.

## İçerik Dizini
- [Teknoloji Yığını](#teknoloji-yığını)
- [Mimari Yapı](#mimari-yapı)
- [Backend API](#backend-api)
- [Frontend Uygulaması](#frontend-uygulaması)
- [Veritabanı Modelleri](#veritabanı-modelleri)
- [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)
- [Arayüz Tasarım Rehberi](#arayüz-tasarım-rehberi)

## Teknoloji Yığını

### Backend
- **Node.js ve Express**: Sunucu taraflı API
- **TypeScript**: Tip güvenliği için
- **PostgreSQL**: Ana veritabanı
- **Prisma ORM**: Veritabanı erişimi için
- **JWT**: Kimlik doğrulama ve yetkilendirme
- **Helmet**: Güvenlik başlıkları
- **Rate limiting**: API hız sınırlaması
- **bcrypt**: Şifre hashleme

### Frontend
- **React**: Kullanıcı arayüzü kütüphanesi
- **React Router**: Sayfa yönlendirme
- **Zustand**: Durum yönetimi
- **TailwindCSS**: Stil ve tasarım
- **Vite**: Yapı aracı ve geliştirme sunucusu
- **TypeScript**: Tip güvenliği

## Mimari Yapı

### Backend Mimarisi
Backend, RESTful API prensiplerini takip eden katmanlı bir mimari kullanmaktadır:

```
src/
├── config/        # Yapılandırma ayarları ve ortam değişkenleri
├── controllers/   # İstek işleyicileri
├── middlewares/   # Ara yazılımlar (auth, error handling, logging)
├── models/        # Model tanımlamaları
├── routes/        # API yönlendirmeleri
├── services/      # İş mantığı katmanı
├── types/         # TypeScript tip tanımlamaları
├── utils/         # Yardımcı fonksiyonlar
├── validators/    # Veri doğrulama şemaları
└── server.ts      # Ana uygulama giriş noktası
```

### Frontend Mimarisi
Frontend, bileşen tabanlı bir yapı kullanarak modern React best practice'lerini takip eder:

```
src/
├── assets/        # Statik dosyalar (resimler, fontlar)
├── components/    # Yeniden kullanılabilir UI bileşenleri
├── pages/         # Sayfa bileşenleri
├── services/      # API istek işlemleri
├── stores/        # Zustand durum yönetimi
├── App.tsx        # Ana uygulama bileşeni
└── main.tsx       # Giriş noktası
```

## Backend API

### Ana Özellikler
- **Kimlik Doğrulama ve Kullanıcı Yönetimi**
  - Kayıt, giriş, JWT ile kimlik doğrulama
  - Kullanıcı profil yönetimi
  - Şifre sıfırlama

- **Müzik Kütüphanesi**
  - Şarkılar, albümler ve sanatçılar için CRUD işlemleri
  - Tür bazlı arama ve filtreleme
  - En popüler içeriklerin listelenmesi

- **Çalma Listeleri**
  - Çalma listesi oluşturma, düzenleme ve silme
  - Şarkı ekleme/çıkarma
  - Ortak çalma listelerini paylaşma

- **Sosyal Özellikler**
  - Arkadaş ekleme ve yönetme
  - Müzik paylaşma
  - Kullanıcı takip etme

- **Değerlendirmeler ve Yorumlar**
  - Şarkı ve albüm puanlama
  - Yorum ekleme ve görüntüleme

- **Öneri Sistemi**
  - Dinleme geçmişine dayalı kişiselleştirilmiş öneriler
  - Tür bazlı öneriler
  - Trend olan içerikler

### API Endpoint'leri
- `/api/auth`: Kimlik doğrulama işlemleri
- `/api/users`: Kullanıcı yönetimi
- `/api/tracks`: Şarkı işlemleri
- `/api/playlists`: Çalma listesi işlemleri

## Frontend Uygulaması

### Ana Sayfalar
- **Ana Sayfa**: Öne çıkan içerikler, trend olan şarkılar
- **Giriş/Kayıt**: Kullanıcı kimlik doğrulama
- **Profil**: Kullanıcı bilgilerini gösterme ve düzenleme
- **Öneriler**: Kişiselleştirilmiş müzik önerileri
- **Favoriler**: Beğenilen şarkılar ve oluşturulan çalma listeleri
- **Arama**: Şarkı, sanatçı ve albüm arama

### Ana Bileşenler
- **Navbar**: Gezinme ve arama
- **MusicPlayer**: Şarkı yürütme kontrolü
- **SongCard**: Şarkı gösterimi
- **PlaylistCard**: Çalma listesi gösterimi
- **SearchBar**: Arama arayüzü

## Veritabanı Modelleri

### Ana Modeller
- **User**: Kullanıcı verileri ve kimlik bilgileri
- **Artist**: Sanatçı bilgileri
- **Album**: Albüm bilgileri ve meta verileri
- **Song**: Şarkı verileri ve ses dosyası bağlantıları
- **Playlist**: Kullanıcı çalma listeleri
- **Genre**: Müzik türleri
- **Review**: Kullanıcı yorumları
- **Rating**: Puanlamalar
- **Friendship**: Kullanıcı ilişkileri

## Kurulum ve Çalıştırma

### Backend Kurulumu
```bash
cd music-rec-api
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### Frontend Kurulumu
```bash
cd music-rec-frontend
npm install
npm run dev
```

## Arayüz Tasarım Rehberi

### Renk Paleti
- **Ana Renk**: #3b82f6 (Mavi)
- **Vurgu Rengi**: #8b5cf6 (Mor)
- **Arka Plan**: Siyah-gri gradient (#111827 - #000000)
- **Metin**: Beyaz ve gri tonları

### Tipografi
- **Ana Font**: Inter, sans-serif
- **Başlık Font Boyutu**: 1.5rem - 2.5rem
- **Gövde Metin Boyutu**: 0.875rem - 1rem

### UI Bileşenleri
- Modern cam morfizm (glassmorphism) efektleri
- Yumuşak gölgeler ve hafif bulanıklık
- Dairesel profil resimleri ve albüm kapakları
- Gradient vurgular

### Duyarlı Tasarım
- Mobil öncelikli yaklaşım
- Tablet ve masaüstü için esnek düzen
- Gezinme çubuğu: mobilde altta, masaüstünde solda

---

Bu projeyi geliştirmeye katkıda bulunmak istiyorsanız, lütfen fork oluşturun ve değişiklik isteği (pull request) gönderin. Sorunlar için GitHub'daki Issues bölümünü kullanabilirsiniz.
