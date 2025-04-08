/**
 * JWT token oluşturma ve doğrulama test betiği
 */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

// .env dosyasını yükle - tam yol belirterek
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Ortam değişkenlerini göster
console.log('Ortam değişkenleri:');
console.log(`JWT_SECRET mevcut: ${process.env.JWT_SECRET ? 'Evet' : 'Hayır'}`);
console.log(`DATABASE_URL mevcut: ${process.env.DATABASE_URL ? 'Evet' : 'Hayır'}`);
console.log(`PORT mevcut: ${process.env.PORT ? 'Evet' : 'Hayır'}`);

// Test verisi
const payload = { userId: 999, role: 'admin' };

// Kullanılacak secret değerini burada tanımlayalım
const secretKey = process.env.JWT_SECRET || 'fallback-secret-key';
console.log(`\nKullanılan JWT_SECRET (ilk 10 karakter): ${secretKey.substring(0, 10)}...`);

// JWT imzalama
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
console.log('\nOluşturulan Token:');
console.log(token);

// Token doğrulama
try {
  const decoded = jwt.verify(token, secretKey);
  console.log('\nToken Doğrulama Başarılı:');
  console.log(decoded);
} catch (err) {
  console.error('\nToken Doğrulama Hatası:', err instanceof Error ? err.message : err);
}

// Yanlış anahtarla doğrulama testi
try {
  const wrongSecret = 'wrong-secret-key';
  const decoded = jwt.verify(token, wrongSecret);
  console.log('\nHatalı Test Başarısız (Bu mesajı görmemeli):', decoded);
} catch (err) {
  console.log('\nYanlış Anahtar Testi Başarılı (Beklenen Hata):');
  console.log(err instanceof Error ? err.message : err);
} 