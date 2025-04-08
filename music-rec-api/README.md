# Spotify API Backend

Bu proje, müzik ve müzik listeleri öneren bir Spotify benzeri uygulama için backend API'sini sağlar.

## Özellikler

- Kullanıcı yönetimi (kayıt, giriş, profil yönetimi)
- Çalma listeleri oluşturma ve yönetme
- Şarkı arama ve detayları görüntüleme
- Şarkı beğenme ve beğenilen şarkılar listesi
- Şarkılar için yorum ekleme
- Ve daha fazlası...

## Teknoloji Yığını

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JSON Web Token (JWT) ile kimlik doğrulama
- BCrypt ile şifre hashleme

## Kurulum

1. Repository'yi klonlayın
2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. `.env` dosyasını düzenleyin ve veritabanı bağlantı bilgilerinizi girin
4. Veritabanını oluşturun ve Prisma şemasını senkronize edin:

```bash
npx prisma db push
```

5. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

## API Rotaları

### Kimlik Doğrulama

- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/auth/profile` - Kullanıcı profili alma

### Kullanıcılar

- `GET /api/users` - Tüm kullanıcıları listele
- `GET /api/users/:id` - Belirli bir kullanıcıyı getir
- `PUT /api/users/:id` - Kullanıcı bilgilerini güncelle
- `DELETE /api/users/:id` - Kullanıcıyı sil

### Çalma Listeleri

- `POST /api/playlists` - Yeni çalma listesi oluştur
- `GET /api/playlists` - Tüm çalma listelerini getir
- `GET /api/playlists/:id` - Belirli bir çalma listesini getir
- `PUT /api/playlists/:id` - Çalma listesini güncelle
- `DELETE /api/playlists/:id` - Çalma listesini sil
- `POST /api/playlists/:id/songs` - Çalma listesine şarkı ekle
- `DELETE /api/playlists/:id/songs/:songId` - Çalma listesinden şarkı çıkar

### Şarkılar

- `GET /api/tracks` - Tüm şarkıları getir
- `GET /api/tracks/search` - Şarkı ara
- `GET /api/tracks/:id` - Belirli bir şarkıyı getir
- `POST /api/tracks/:id/like` - Şarkıyı beğen
- `DELETE /api/tracks/:id/like` - Şarkı beğenisini kaldır
- `GET /api/tracks/user/liked` - Beğenilen şarkıları getir
- `POST /api/tracks/:id/reviews` - Şarkıya yorum ekle
- `GET /api/tracks/:id/reviews` - Şarkı yorumlarını getir

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 