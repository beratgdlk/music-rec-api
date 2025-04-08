import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Veritabanı test verileri oluşturuluyor...');

  // Varolan verileri temizle
  await prisma.$transaction([
    prisma.likedSong.deleteMany(),
    prisma.songPlaylist.deleteMany(),
    prisma.wishlist.deleteMany(),
    prisma.rating.deleteMany(),
    prisma.review.deleteMany(),
    prisma.albumGenre.deleteMany(),
    prisma.artistGenre.deleteMany(),
    prisma.song.deleteMany(),
    prisma.album.deleteMany(),
    prisma.genre.deleteMany(),
    prisma.artist.deleteMany(),
    prisma.playlist.deleteMany(),
    prisma.friendship.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Kullanıcılar
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@spotify.com',
      username: 'admin',
      password: adminPassword,
      name: 'Admin User',
      isAdmin: true,
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    }
  });

  const user1 = await prisma.user.create({
    data: {
      email: 'user1@spotify.com',
      username: 'user1',
      password: userPassword,
      name: 'Test User 1',
      profileImage: 'https://randomuser.me/api/portraits/women/1.jpg'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@spotify.com',
      username: 'user2',
      password: userPassword,
      name: 'Test User 2',
      profileImage: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  });

  console.log('Kullanıcılar oluşturuldu...');

  // Türler
  const genres = await Promise.all([
    prisma.genre.create({ data: { name: 'Rock' } }),
    prisma.genre.create({ data: { name: 'Pop' } }),
    prisma.genre.create({ data: { name: 'Hip Hop' } }),
    prisma.genre.create({ data: { name: 'Electronic' } }),
    prisma.genre.create({ data: { name: 'Jazz' } }),
    prisma.genre.create({ data: { name: 'Classical' } }),
  ]);

  console.log('Türler oluşturuldu...');

  // Sanatçılar
  const artist1 = await prisma.artist.create({
    data: {
      name: 'Rock Star',
      bio: 'Ünlü rock sanatçısı',
      country: 'USA',
      profileImage: 'https://randomuser.me/api/portraits/men/10.jpg'
    }
  });

  const artist2 = await prisma.artist.create({
    data: {
      name: 'Pop Queen',
      bio: 'Ünlü pop sanatçısı',
      country: 'UK',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg'
    }
  });

  const artist3 = await prisma.artist.create({
    data: {
      name: 'Electro Master',
      bio: 'Ünlü elektronik müzik prodüktörü',
      country: 'Germany',
      profileImage: 'https://randomuser.me/api/portraits/men/11.jpg'
    }
  });

  // Sanatçı türleri
  await prisma.artistGenre.create({
    data: {
      artist: { connect: { id: artist1.id } },
      genre: { connect: { id: genres[0].id } } // Rock
    }
  });

  await prisma.artistGenre.create({
    data: {
      artist: { connect: { id: artist2.id } },
      genre: { connect: { id: genres[1].id } } // Pop
    }
  });

  await prisma.artistGenre.create({
    data: {
      artist: { connect: { id: artist3.id } },
      genre: { connect: { id: genres[3].id } } // Electronic
    }
  });

  console.log('Sanatçılar oluşturuldu...');

  // Albümler
  const album1 = await prisma.album.create({
    data: {
      title: 'Rock Classics',
      releaseYear: 2020,
      type: 'ALBUM',
      coverImage: 'https://picsum.photos/id/1/500/500',
      artist: { connect: { id: artist1.id } }
    }
  });

  const album2 = await prisma.album.create({
    data: {
      title: 'Pop Hits',
      releaseYear: 2021,
      type: 'ALBUM',
      coverImage: 'https://picsum.photos/id/2/500/500',
      artist: { connect: { id: artist2.id } }
    }
  });

  const album3 = await prisma.album.create({
    data: {
      title: 'Electronic Dreams',
      releaseYear: 2022,
      type: 'ALBUM',
      coverImage: 'https://picsum.photos/id/3/500/500',
      artist: { connect: { id: artist3.id } }
    }
  });

  // Albüm türleri
  await prisma.albumGenre.create({
    data: {
      album: { connect: { id: album1.id } },
      genre: { connect: { id: genres[0].id } } // Rock
    }
  });

  await prisma.albumGenre.create({
    data: {
      album: { connect: { id: album2.id } },
      genre: { connect: { id: genres[1].id } } // Pop
    }
  });

  await prisma.albumGenre.create({
    data: {
      album: { connect: { id: album3.id } },
      genre: { connect: { id: genres[3].id } } // Electronic
    }
  });

  console.log('Albümler oluşturuldu...');

  // Şarkılar
  const songs = [];

  // Rock albümü şarkıları
  for (let i = 1; i <= 5; i++) {
    const song = await prisma.song.create({
      data: {
        title: `Rock Song ${i}`,
        duration: 180 + i * 30, // saniye cinsinden
        trackNumber: i,
        audioUrl: `https://example.com/audio/rock${i}.mp3`,
        album: { connect: { id: album1.id } },
        artist: { connect: { id: artist1.id } }
      }
    });
    songs.push(song);
  }

  // Pop albümü şarkıları
  for (let i = 1; i <= 5; i++) {
    const song = await prisma.song.create({
      data: {
        title: `Pop Song ${i}`,
        duration: 180 + i * 20,
        trackNumber: i,
        audioUrl: `https://example.com/audio/pop${i}.mp3`,
        album: { connect: { id: album2.id } },
        artist: { connect: { id: artist2.id } }
      }
    });
    songs.push(song);
  }

  // Electronic albümü şarkıları
  for (let i = 1; i <= 5; i++) {
    const song = await prisma.song.create({
      data: {
        title: `Electronic Song ${i}`,
        duration: 180 + i * 40,
        trackNumber: i,
        audioUrl: `https://example.com/audio/electronic${i}.mp3`,
        album: { connect: { id: album3.id } },
        artist: { connect: { id: artist3.id } }
      }
    });
    songs.push(song);
  }

  console.log('Şarkılar oluşturuldu...');

  // Çalma listeleri
  const playlist1 = await prisma.playlist.create({
    data: {
      name: 'Favori Rock Şarkıları',
      description: 'En sevdiğim rock parçaları',
      coverImage: 'https://picsum.photos/id/10/500/500',
      owner: { connect: { id: user1.id } }
    }
  });

  const playlist2 = await prisma.playlist.create({
    data: {
      name: 'Pop Hitleri',
      description: 'En iyi pop şarkıları',
      coverImage: 'https://picsum.photos/id/11/500/500',
      owner: { connect: { id: user2.id } }
    }
  });

  // Çalma listelerine şarkı ekle
  let order = 1;
  // Rock şarkılarını playlist1'e ekle
  for (let i = 0; i < 5; i++) {
    await prisma.songPlaylist.create({
      data: {
        playlist: { connect: { id: playlist1.id } },
        song: { connect: { id: songs[i].id } },
        order: order++
      }
    });
  }

  order = 1;
  // Pop şarkılarını playlist2'ye ekle
  for (let i = 5; i < 10; i++) {
    await prisma.songPlaylist.create({
      data: {
        playlist: { connect: { id: playlist2.id } },
        song: { connect: { id: songs[i].id } },
        order: order++
      }
    });
  }

  console.log('Çalma listeleri oluşturuldu...');

  // Beğenilen şarkılar
  for (let i = 0; i < 5; i++) {
    await prisma.likedSong.create({
      data: {
        user: { connect: { id: user1.id } },
        song: { connect: { id: songs[i].id } }
      }
    });
  }

  for (let i = 5; i < 10; i++) {
    await prisma.likedSong.create({
      data: {
        user: { connect: { id: user2.id } },
        song: { connect: { id: songs[i].id } }
      }
    });
  }

  console.log('Beğenilen şarkılar oluşturuldu...');

  // Yorumlar
  await prisma.review.create({
    data: {
      content: 'Harika bir albüm!',
      user: { connect: { id: user1.id } },
      album: { connect: { id: album1.id } }
    }
  });

  await prisma.review.create({
    data: {
      content: 'Çok iyi şarkı, dinlemeye doyamıyorum!',
      user: { connect: { id: user2.id } },
      song: { connect: { id: songs[0].id } }
    }
  });

  // Puanlamalar
  await prisma.rating.create({
    data: {
      score: 5,
      user: { connect: { id: user1.id } },
      album: { connect: { id: album1.id } }
    }
  });

  await prisma.rating.create({
    data: {
      score: 4,
      user: { connect: { id: user2.id } },
      song: { connect: { id: songs[0].id } }
    }
  });

  console.log('Yorumlar ve puanlamalar oluşturuldu...');

  // Arkadaşlık
  await prisma.friendship.create({
    data: {
      user: { connect: { id: user1.id } },
      friend: { connect: { id: user2.id } },
      status: 'ACCEPTED'
    }
  });

  console.log('Test verileri başarıyla oluşturuldu!');
}

main()
  .catch((e) => {
    console.error('Hata oluştu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 