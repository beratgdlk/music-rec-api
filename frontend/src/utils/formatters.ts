/**
 * Saniye cinsinden süreyi mm:ss formatına dönüştürür
 * @param seconds - Saniye cinsinden süre
 * @returns Biçimlendirilmiş süre (örn: 3:45)
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Büyük sayıları kısaltılmış formata dönüştürür
 * @param num - Sayı
 * @returns Kısaltılmış sayı (örn: 1.2K, 3.5M)
 */
export function formatNumber(num: number): string {
  if (isNaN(num)) return '0';
  
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  
  return num.toString();
}

/**
 * Verilen tarihi gösterile formata dönüştürür
 * @param dateString - Tarih string'i veya Date nesnesi
 * @returns Formatlanmış tarih (örn: 10 Ocak 2023)
 */
export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return '';
  }
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString('tr-TR', options);
}

/**
 * Göreceli zaman formatı (örn: 3 saat önce, 2 gün önce)
 * @param dateString - Tarih string'i veya Date nesnesi
 * @returns Göreceli zaman
 */
export function timeAgo(dateString: string | Date): string {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return '';
  }
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Saniye
  if (diffInSeconds < 60) {
    return `${diffInSeconds} saniye önce`;
  }
  
  // Dakika
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} dakika önce`;
  }
  
  // Saat
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} saat önce`;
  }
  
  // Gün
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} gün önce`;
  }
  
  // Ay
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ay önce`;
  }
  
  // Yıl
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} yıl önce`;
} 