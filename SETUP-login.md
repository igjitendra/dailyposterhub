# Login System Setup (Email + Password)

Daily PosterHub me ab asli login/signup system hai — Cloudflare KV + signed-cookie sessions + PBKDF2 password hashing. Free/Pro plan har user ke record me store hota hai, aur aap manual (WhatsApp verify karke) Pro chalu kar sakte ho.

## Naye/updated files

```
functions/_auth.js                 # shared auth helpers (KV + session + hashing)
functions/api/auth/signup.js       # POST /api/auth/signup
functions/api/auth/login.js        # POST /api/auth/login
functions/api/auth/logout.js       # POST /api/auth/logout
functions/api/auth/me.js           # GET  /api/auth/me  -> { user }
functions/api/admin/set-plan.js    # POST /api/admin/set-plan (Pro activate)
src/pages/login.astro              # asli login/signup form (pehle dummy tha)
src/pages/account.astro            # /account -> plan, logout
src/pages/admin-users.astro        # /admin-users -> Pro manual chalu
```

## Step 1 — KV namespace banao

1. Cloudflare Dashboard > **Workers & Pages** > **KV**
2. **Create namespace** -> naam: `posterhub-users`
3. Ban-ne ke baad us namespace ki **ID** copy karo.

### wrangler.toml me ID daalo
`wrangler.toml` me ye block pehle se hai — sirf ID replace karo:

```toml
[[kv_namespaces]]
binding = "USERS"
id = "YAHAN_KV_NAMESPACE_ID_DAALO"
```

> Note: agar aap Pages ko **GitHub se** deploy karte ho aur build ke waqt binding chahiye, to Pages project me bhi bind karo:
> **Pages > Settings > Functions > KV namespace bindings** -> Variable name `USERS`, namespace `posterhub-users` (Production + Preview dono).

## Step 2 — Environment variables (secrets)

**Pages > Settings > Environment variables** (Production + Preview dono me):

| Name | Value |
|------|-------|
| `SESSION_SECRET` | koi lamba random string (40+ characters). Sessions isse sign hote hain. |
| `ADMIN_KEY` | wahi jo poster admin ke liye use ho raha hai (ya naya). `/admin-users` panel isse chalta hai. |

> `SESSION_SECRET` badalne par sab logged-in users logout ho jaayenge — normal baat hai.

## Step 3 — Deploy

GitHub par push karo (Cloudflare Pages auto-deploy karega), ya `wrangler pages deploy`.

Agar KV / SESSION_SECRET set nahi hai to login/signup API **501** deta hai aur page saaf message dikhata hai (site crash nahi hoti).

## Kaise chalta hai

- **/login** — user login ya “naya khaata” (signup) kar sakta hai. Success par `/account` par chala jaata hai.
- **/account** — user ka naam, email, plan (Free/Pro) aur logout. Free user ko “Pro le” button (-> /payment).
- Header ka **“लॉगिन”** button logged-in hone par khud **“मेरा खाता”** ban jaata hai.
- **/admin-users** — sirf aapke liye. Admin Key + user ka email daalo -> **Pro चालू करें**. (noindex nahi hai — chaho to isse chhupa kar rakho / secret URL ki tarah use karo.)

## Poora Pro flow

1. User `/login` par **signup** karta hai (plan = free).
2. `/payment` par UPI se pay karke WhatsApp par screenshot bhejta hai.
3. Aap WhatsApp par verify karte ho.
4. Aap **/admin-users** kholte ho -> user ka email daal kar **Pro चालू करें**.
5. User ke `/account` par ab **PRO** dikhta hai.

## Security notes

- Passwords kabhi plain store nahi hote — **PBKDF2 (100k iterations, SHA-256)** hash + random salt.
- Session ek **HMAC-SHA256 se signed cookie** hai (`ph_session`, HttpOnly, Secure, SameSite=Lax, 30 din).
- Plan hamesha KV se fresh padha jaata hai, isliye Pro chalu karte hi effect turant.
