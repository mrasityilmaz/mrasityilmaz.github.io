# devrasityilmaz.com — yayın kurulumu

Bu dosya sitenin nasıl yayında olduğunu ve nasıl güncelleneceğini anlatır. (İnceleme: 9 Ekim 2026.)

## Mimari

```
Tarayıcı
  │  devrasityilmaz.com / www.devrasityilmaz.com
  ▼
Cloudflare  (DNS + proxy + SSL)
  │  • Nameserver: arturo / simone.ns.cloudflare.com
  │  • Apex ve www "proxied" (turuncu bulut)
  │  • SSL/TLS modu: Full (strict değil)
  │  • http → https yönlendirmesini Cloudflare yapıyor
  ▼
GitHub Pages
  │  • Repo: github.com/mrasityilmaz/mrasityilmaz.github.io (public)
  │  • Custom domain: devrasityilmaz.com (doğrulanmış)
  │  • "Enforce HTTPS" kapalı — bu normal, HTTPS'i Cloudflare veriyor
  │  • www → apex yönlendirmesini GitHub yapıyor
  ▼
Statik site (bu repo, Astro ile derleniyor)
```

E-posta (info@devrasityilmaz.com) Google Workspace üzerinden çalışıyor. Cloudflare DNS'teki MX, SPF,
`google-site-verification`, DMARC, CAA ve `_github-pages-challenge-mrasityilmaz` kayıtlarına **dokunmayın**.

## Eskiden nasıldı

Eski site bir Flutter web uygulamasıydı (`dev_portfolio` reposu). `flutter build web` yerelde alınıyor, `build/web`
içeriği bu repoya kopyalanıp `main`'e push ediliyordu; GitHub Pages "Deploy from a branch" (legacy) moduyla
`main` dalının kökünü yayınlıyordu. Son yayın: 18 Eylül 2024. Eski build `legacy-flutter` dalında saklanabilir (aşağıda).

## Yeni akış

Kaynak kod bu repoda. `main`'e her push'ta `.github/workflows/deploy.yml`:

1. `npm ci` ve `npm run build` ile siteyi `dist/` klasörüne derler,
2. `dist/`'i GitHub Pages'e yükler,
3. (isteğe bağlı) Cloudflare önbelleğini temizler.

Yerelde çalıştırmak:

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ üretir
npm run preview  # derlenmiş siteyi önizler
```

İçerik nerede:

| Ne | Dosya |
| --- | --- |
| Uygulamalar (zaman çizelgesi) | `src/data/apps.ts` + görseller `src/assets/apps/<id>/` |
| Açık kaynak işler | `src/data/oss.ts` |
| İş deneyimi | `src/components/Experience.astro` |
| İletişim e-postası, sosyal linkler | `src/data/site.ts` |
| Sepello sayfası | `src/pages/sepello.astro` |

Yeni bir uygulama eklemek için `src/assets/apps/<id>/` altına `icon.png` (512px), telefonda görünecek ham ekranlar
için `screen-01.webp…`, mağaza görselleri için `store-01.webp…` koyun ve `apps.ts`'e bir kayıt ekleyin.

## İlk yayına alma (bir kez)

> Sıra önemli: Pages hâlâ "legacy" moddayken Astro kaynağı `main`'e giderse GitHub kaynağı Jekyll ile yayınlar ve site bozulur.

```bash
cd ~/Desktop/WORK/mrasityilmaz.github.io

# 0) v2'yi commit'le ve uzak main'i (3 web-arayüzü commit'i) v2 ağacını değiştirmeden birleştir
git switch v2
git add -A && git commit -m "Astro v2 site"
git fetch origin
git merge -s ours origin/main -m "Merge origin/main (keep v2)"
git status   # temiz olmalı

# 1) Geri dönüş noktası: canlı Flutter sürümünü ayrı bir dalda sakla + ayarları yedekle
gh api -X POST repos/mrasityilmaz/mrasityilmaz.github.io/git/refs \
  -f ref=refs/heads/legacy-flutter -f sha=a17f23db68a193faa86f45a72ff0f2948b496df8
gh api repos/mrasityilmaz/mrasityilmaz.github.io/pages > ~/pages-config-before.json

# 2) Pages kaynağını GitHub Actions'a çevir (custom domain korunur)
gh api -X PUT repos/mrasityilmaz/mrasityilmaz.github.io/pages -f build_type=workflow -f cname=devrasityilmaz.com

# 3) Hemen ardından gönder ve izle
git push origin v2:main
sleep 10 && gh run watch --repo mrasityilmaz/mrasityilmaz.github.io \
  $(gh run list --repo mrasityilmaz/mrasityilmaz.github.io --workflow deploy.yml -L1 --json databaseId -q '.[0].databaseId')

# 4) Kontrol
curl -sI https://devrasityilmaz.com | head -5
```

Yayından sonra Cloudflare'de **Caching → Purge Everything** yapın.

## Cloudflare kontrol listesi

- **SSL/TLS: Full.** Flexible yapmayın (yönlendirme döngüsü), Full (strict) yapmayın (GitHub bu domain için sertifika
  üretmediğinden 526 hatası verir).
- **Always Use HTTPS:** açık kalsın.
- **Rocket Loader:** kapalı olmalı (site modül script'leri kullanıyor).
- **Email Address Obfuscation:** açıksa `mailto:` linklerini bir kez kontrol edin.
- **Browser Cache TTL:** şu an 4 saat. "Respect Existing Headers" daha iyi; Astro'nun `_astro/` dosyaları zaten hash'li.
- Otomatik önbellek temizliği için: Cloudflare'de yalnızca bu zone için "Cache Purge" izinli bir API token oluşturun;
  repoya `CLOUDFLARE_API_TOKEN` secret'ı ve `CF_ZONE_ID` variable'ı ekleyin. Workflow gerisini yapar.

## Geri alma

- **Bozuk bir sürüm:** `git revert <commit>` + push, ya da Actions'ta eski başarılı run'ı yeniden çalıştırın.
- **Eski Flutter sitesine tam dönüş:** (`github-pages` ortamı yalnız `main` dalına izin veriyor; önce `legacy-flutter`'ı ekleyin)

  ```bash
  gh api -X POST repos/mrasityilmaz/mrasityilmaz.github.io/environments/github-pages/deployment-branch-policies \
    -f name=legacy-flutter -f type=branch
  gh api -X PUT repos/mrasityilmaz/mrasityilmaz.github.io/pages \
    -f build_type=legacy -f 'source[branch]=legacy-flutter' -f 'source[path]=/'
  gh api -X POST repos/mrasityilmaz/mrasityilmaz.github.io/pages/builds
  ```

  Ardından Cloudflare'de Purge Everything.

## Güvenlik notları

1. **Eski sitenin GitHub token'ını iptal edin.** Eski Flutter sitesi GitHub API'yi bir kişisel erişim token'ıyla
   çağırıyordu. GitHub → Settings → Developer settings → Personal access tokens bölümünden iptal edin; `dev_portfolio`
   reposundaki `TOKEN` ve kullanılmayan `SSH_PRIVATE_KEY` secret'larını da silin. `legacy-flutter` dalına geri dönüş
   ancak token iptal edildikten sonra güvenlidir.
2. **Eski service worker:** `public/flutter_service_worker.js` eski Flutter önbelleğini ziyaretçilerin tarayıcısından
   temizler. Birkaç ay yayında kalsın.
3. `devrasityilmaz.com/web.github.io/` yolu hâlâ 2022'den kalma bir demo yayınlıyor (`web.github.io` reposu).
   İstemiyorsanız: `gh api -X DELETE repos/mrasityilmaz/web.github.io/pages`.
