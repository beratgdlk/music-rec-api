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

## Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd music-rec-api
```

2. Install PostgreSQL if not installed:
   - Download from [PostgreSQL Official Website](https://www.postgresql.org/download/)
   - During installation, set the password for 'postgres' user
   - Default port should be 5432

3. Create a PostgreSQL database:
```bash
# Connect to PostgreSQL
psql -U postgres

# In PostgreSQL shell
CREATE DATABASE music_api;
\q
```

4. Install dependencies:
```bash
npm install
```

5. Create `.env` file in the root directory with the following content:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/music_api?schema=public"
JWT_SECRET="your-super-secret-key-here"
PORT=3001
```
Note: Replace 'postgres' in the DATABASE_URL with your actual PostgreSQL password if different.

6. Push the database schema:
```bash
npx prisma db push
```

7. Seed the database with sample data:
```bash
npm run seed
```

8. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## Common Issues

1. Port already in use:
   - Change the PORT in `.env` file
   - Or stop the process using port 3001

2. Database connection issues:
   - Make sure PostgreSQL is running
   - Check if database credentials are correct in `.env`
   - Verify that the database exists

3. Prisma issues:
   - Try regenerating Prisma client: `npx prisma generate`
   - Reset database if needed: `npx prisma db push --force-reset`

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

## Kurulum Adımları

1. Repository'yi klonlayın:
```bash
git clone <repository-url>
cd music-rec-api
```

2. PostgreSQL kurulu değilse kurun:
   - [PostgreSQL Resmi Websitesi](https://www.postgresql.org/download/)'nden indirin
   - Kurulum sırasında 'postgres' kullanıcısı için şifre belirleyin
   - Varsayılan port 5432 olmalıdır

3. PostgreSQL veritabanı oluşturun:
```bash
# PostgreSQL'e bağlanın
psql -U postgres

# PostgreSQL kabuğunda
CREATE DATABASE music_api;
\q
```

4. Bağımlılıkları yükleyin:
```bash
npm install
```

5. Kök dizinde `.env` dosyası oluşturun ve içeriğini şu şekilde düzenleyin:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/music_api?schema=public"
JWT_SECRET="your-super-secret-key-here"
PORT=3001
```
Not: DATABASE_URL'deki 'postgres' şifresini, farklıysa kendi PostgreSQL şifrenizle değiştirin.

6. Veritabanı şemasını yükleyin:
```bash
npx prisma db push
```

7. Örnek verileri yükleyin:
```bash
npm run seed
```

8. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

API `http://localhost:3001` adresinde çalışmaya başlayacaktır.

## Sık Karşılaşılan Sorunlar

1. Port kullanımda hatası:
   - `.env` dosyasında PORT değerini değiştirin
   - Ya da 3001 portunu kullanan işlemi durdurun

2. Veritabanı bağlantı sorunları:
   - PostgreSQL'in çalıştığından emin olun
   - `.env` dosyasındaki veritabanı bilgilerinin doğru olduğunu kontrol edin
   - Veritabanının oluşturulduğunu doğrulayın

3. Prisma sorunları:
   - Prisma istemcisini yeniden oluşturun: `npx prisma generate`
   - Gerekirse veritabanını sıfırlayın: `npx prisma db push --force-reset`

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

## API Rotaları

### Kimlik Doğrulama

- `POST /api/auth/register`