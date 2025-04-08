# Music API Backend

This project provides a backend API for a Spotify-like application that recommends music and playlists.

## Features

- User management (registration, login, profile management)
- Creating and managing playlists
- Song search and details display
- Liking songs and maintaining a liked songs list
- Adding comments to songs
- And more...

## Technology Stack

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Authentication with JSON Web Token (JWT)
- Password hashing with BCrypt

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Edit the `.env` file and enter your database connection information
4. Create the database and synchronize the Prisma schema:

```bash
npx prisma db push
```

5. Start the development server:

```bash
npm run dev
```

## API Routes

### Authentication

- `POST /api/auth/register` - New user registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Users

- `GET /api/users` - List all users
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/:id` - Update user information
- `DELETE /api/users/:id` - Delete a user

### Playlists

- `POST /api/playlists` - Create a new playlist
- `GET /api/playlists` - Get all playlists
- `GET /api/playlists/:id` - Get a specific playlist
- `PUT /api/playlists/:id` - Update a playlist
- `DELETE /api/playlists/:id` - Delete a playlist
- `POST /api/playlists/:id/songs` - Add a song to a playlist
- `DELETE /api/playlists/:id/songs/:songId` - Remove a song from a playlist

### Songs

- `GET /api/tracks` - Get all songs
- `GET /api/tracks/search` - Search for songs
- `GET /api/tracks/:id` - Get a specific song
- `POST /api/tracks/:id/like` - Like a song
- `DELETE /api/tracks/:id/like` - Remove a like from a song
- `GET /api/tracks/user/liked` - Get liked songs
- `POST /api/tracks/:id/reviews` - Add a comment to a song
- `GET /api/tracks/:id/reviews` - Get song comments

## License

This project is licensed under the MIT license.

---

# Spotify API Backend (Türkçe)

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