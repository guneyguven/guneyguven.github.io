Tema koruma yönergesi
=====================

Kısa amaç: PJAX geçişlerinde görülen "flaş" (tema/renk değişimi) sorununu tamamen engellemek için alınmış kararların korunması.

Korunması gerekenler:
- Erken tema ataması: HTML <head> içinde bulunan `id="theme-early"` scripti — bu script `document.documentElement.setAttribute('data-bs-theme', ...)` ile temayı paint öncesi ayarlar.
- Tema attribute: `data-bs-theme` (örn. `html[data-bs-theme="dark"]`) — tema CSS'si buna göre çalışır.
- Stil dosyaları: `css/theme-bs.css` ve `css/theme.css` — `theme-bs.css`'deki değişiklikler dikkatle yapılmalı.
- Tema yöneticisi: `js/theme.js` — toggle/set fonksiyonları `data-bs-theme` ile çalışır ve localStorage/cookie kullanımını sürdürür.
- PJAX davranışı: `js/pjax.js` içinde `#pjax-overlay`, `body.pjax-loading` ve `#pjax-container` swap mantığı korunmalı; `document.documentElement` veya `document.body` attribute'ları swap sırasında değiştirilmemeli.

Eğer ileride tema ile ilgili değişiklik yapılacaksa yapılması gerekenler:
1. `THEME_PRESERVE.md` dosyasını okuyun.
2. Değişiklik `theme-bs.css` veya `js/theme.js`'de ise önce local testlerde (yavaş ağ/soğuk önbellek) geçişler test edin.
3. `theme-early` scriptinde farklı bir yaklaşım gerekiyorsa, `data-bs-theme` atamasının paint öncesi yapıldığından kesinlikle emin olun.
4. Gerekirse `#pjax-overlay` görünürlüğü ve preloading timeout (şu an 700ms) ayarlanabilir; ancak overlay ve `pjax-loading` sınıfları kaldırılmamalıdır.

Sorumluluk: Bu dosya, tema flaşını tekrar getirebilecek değişikliklerin önüne geçmek için rehberdir. Değişiklik yaparken bu kuralları takip edin.
