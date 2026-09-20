# VideoQR Studio — Original UI + Working Runtime

This package preserves the original Stitch screens and adds the missing runtime behavior instead of replacing the design.

## Screens retained
- Create & Customize QR
- Dashboard & Analytics
- Public Video Playback
- Mobile Customizer
- Logo / branding screen
- Original architecture/design documentation

## Real functionality added
- Video upload for MP4/MOV/WebM
- Supabase Storage upload when configured
- Supabase `videos` table records
- Unique video IDs and public playback links
- Real QR generation using QRCode.js
- PNG/JPG/SVG QR export
- Public video playback using the uploaded file
- View counter / analytics hook
- Dashboard data loading and deletion hooks
- Local browser fallback when Supabase credentials are empty

## Supabase setup
1. Create a Supabase project.
2. Run `supabase.sql` in Supabase SQL Editor.
3. Put your URL/key in `videoqr_config.js` (or replace it during deployment from your environment).
4. Host the whole folder on a static host.

The local fallback is for testing only. For a public production deployment, configure Supabase and a proper domain.
