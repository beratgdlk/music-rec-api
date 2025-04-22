/**
 * Local Storage'dan veri alma
 * @param key - Local Storage anahtarı
 * @param defaultValue - Değer bulunamazsa dönecek varsayılan değer
 * @returns Saklanan veri veya varsayılan değer
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const storedValue = localStorage.getItem(key);
    
    if (storedValue === null) {
      return defaultValue;
    }
    
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Local Storage'dan "${key}" değeri alınırken hata oluştu:`, error);
    return defaultValue;
  }
}

/**
 * Local Storage'a veri kaydetme
 * @param key - Local Storage anahtarı
 * @param value - Kaydedilecek değer
 */
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Local Storage'a "${key}" değeri kaydedilirken hata oluştu:`, error);
  }
}

/**
 * Local Storage'dan veri silme
 * @param key - Silinecek anahtarlar
 */
export function removeLocalStorage(...keys: string[]): void {
  try {
    keys.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error(`Local Storage'dan değer silinirken hata oluştu:`, error);
  }
}

/**
 * Local Storage'da bir anahtarın varlığını kontrol etme
 * @param key - Kontrol edilecek anahtar
 * @returns Anahtar varsa true, yoksa false
 */
export function hasLocalStorage(key: string): boolean {
  return localStorage.getItem(key) !== null;
}

/**
 * Kullanıcı oturum bilgilerini Local Storage'da saklama
 * @param userData - Kullanıcı verileri
 */
export function saveUserSession(userData: { email: string, [key: string]: any }): void {
  setLocalStorage('user', userData);
}

/**
 * Kullanıcı oturum bilgilerini Local Storage'dan alma
 * @returns Kullanıcı verileri veya null
 */
export function getUserSession(): { email: string, [key: string]: any } | null {
  return getLocalStorage<{ email: string, [key: string]: any } | null>('user', null);
}

/**
 * Kullanıcı oturumunu sonlandırma
 */
export function clearUserSession(): void {
  removeLocalStorage('user');
} 