/* VideoQR Studio runtime — preserves the original Stitch UI and adds real app behavior. */
(function () {
  const CFG = window.VIDEOQR_CONFIG || {};
  const KEY = 'videoqr-studio-records-v2';
  const SUPABASE_CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
  let supabaseClient = null;

  function records(){ try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]} }
  function save(rows){localStorage.setItem(KEY,JSON.stringify(rows))}
  function id(){return Math.random().toString(36).slice(2,6)+Date.now().toString(36).slice(-5)}
  function appUrl(){ return (CFG.appUrl || location.origin).replace(/\/$/,''); }
  function videoLink(videoId){ return `${appUrl()}/public_video_playback_videoqr_studio/code.html?v=${encodeURIComponent(videoId)}`; }
  function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

  async function getSupabase(){
    if(supabaseClient) return supabaseClient;
    if(!CFG.supabaseUrl || !CFG.supabaseAnonKey || CFG.supabaseUrl.includes('your-project')) return null;
    try { const {createClient}=await import(SUPABASE_CDN); supabaseClient=createClient(CFG.supabaseUrl,CFG.supabaseAnonKey); return supabaseClient; } catch(e){console.warn('Supabase unavailable',e);return null;}
  }

  async function createVideo(file, qrConfig={}){
    const sb=await getSupabase();
    const videoId=id();
    if(sb){
      const path=`public/${videoId}-${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;
      const up=await sb.storage.from(CFG.videoBucket||'videos').upload(path,file,{contentType:file.type||'video/mp4',upsert:false});
      if(up.error) throw up.error;
      const pub=sb.storage.from(CFG.videoBucket||'videos').getPublicUrl(path).data.publicUrl;
      const row={video_id:videoId,file_name:file.name,file_size:file.size,storage_path:path,public_url:pub,qr_config:qrConfig,views_count:0};
      const ins=await sb.from('videos').insert(row).select().single(); if(ins.error) throw ins.error;
      return {...row, id:ins.data?.id||videoId, link:videoLink(videoId)};
    }
    const localUrl=URL.createObjectURL(file);
    const row={id:videoId,video_id:videoId,file_name:file.name,file_size:file.size,storage_path:'local',public_url:localUrl,qr_config:qrConfig,views_count:0,created_at:new Date().toISOString(),link:videoLink(videoId),local:true};
    const all=records(); all.unshift(row); save(all); sessionStorage.setItem('videoqr-file-'+videoId,localUrl); return row;
  }

  async function getVideo(videoId){
    const sb=await getSupabase();
    if(sb){const r=await sb.from('videos').select('*').eq('video_id',videoId).maybeSingle(); if(r.error) throw r.error; return r.data;}
    return records().find(x=>x.video_id===videoId||x.id===videoId)||null;
  }
  async function listVideos(){
    const sb=await getSupabase();
    if(sb){const r=await sb.from('videos').select('*').order('created_at',{ascending:false}); if(r.error) throw r.error; return r.data||[];}
    return records();
  }
  async function incrementView(videoId){
    const sb=await getSupabase();
    if(sb){
      const r=await sb.rpc('increment_video_view',{p_video_id:videoId});
      if(r.error){const v=await getVideo(videoId); if(v) await sb.from('videos').update({views_count:(v.views_count||0)+1}).eq('video_id',videoId);}
      return;
    }
    const all=records(); const v=all.find(x=>x.video_id===videoId); if(v){v.views_count=(v.views_count||0)+1;save(all);}
  }
  async function removeVideo(videoId){
    const sb=await getSupabase();
    if(sb){const v=await getVideo(videoId); if(!v) return; await sb.storage.from(CFG.videoBucket||'videos').remove([v.storage_path]); const r=await sb.from('videos').delete().eq('video_id',videoId); if(r.error) throw r.error; return;}
    const all=records().filter(x=>x.video_id!==videoId); save(all); sessionStorage.removeItem('videoqr-file-'+videoId);
  }

  async function ensureQR(){ if(window.QRCode) return; await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s);}); }
  async function renderRealQR(container,url,opts={}){
    if(!container) return; await ensureQR(); container.innerHTML='';
    const holder=document.createElement('div'); holder.id='real-qr-code'; container.appendChild(holder);
    new QRCode(holder,{text:url,width:opts.size||280,height:opts.size||280,colorDark:opts.colorDark||'#111827',colorLight:opts.colorLight||'#ffffff',correctLevel:QRCode.CorrectLevel.H});
    return holder.querySelector('img')||holder.querySelector('canvas');
  }
  function downloadDataUrl(dataUrl,name){const a=document.createElement('a');a.href=dataUrl;a.download=name;document.body.appendChild(a);a.click();a.remove();}
  async function qrImageData(url,size=2048){
    const c=document.createElement('canvas');c.width=c.height=size;const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,size,size);
    await ensureQR(); const holder=document.createElement('div');holder.style.position='fixed';holder.style.left='-99999px';document.body.appendChild(holder); new QRCode(holder,{text:url,width:size,height:size,colorDark:'#111827',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.H}); await new Promise(r=>setTimeout(r,100)); const canvas=holder.querySelector('canvas'); if(canvas) ctx.drawImage(canvas,0,0,size,size); else {const img=holder.querySelector('img'); await new Promise((res,rej)=>{img.onload=()=>{ctx.drawImage(img,0,0,size,size);res()};img.onerror=rej});} holder.remove(); return c.toDataURL('image/png');
  }
  function toast(msg){ if(window.showToast) window.showToast(msg); else if(window.triggerToast) window.triggerToast(msg); else alert(msg); }
  window.VideoQR={CFG,records,save,appUrl,videoLink,createVideo,getVideo,listVideos,incrementView,removeVideo,renderRealQR,qrImageData,downloadDataUrl,toast};

  async function studio(){
    const input=document.getElementById('video-file-input'); if(!input) return;
    input.addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;if(!/^video\/(mp4|quicktime|webm)$/.test(file.type)&&!/\.(mp4|mov|webm)$/i.test(file.name)){toast('Please choose an MP4, MOV or WebM video.');return;} try{toast(`Uploading ${file.name}…`);const row=await createVideo(file,{version:1}); window.currentVideoQR=row; document.querySelectorAll('a[href*="videoqr.studio/video/a8f72c91"]').forEach(a=>{a.href=row.link;a.querySelector('span')&&(a.querySelector('span').textContent=row.link.replace(/^https?:\/\//,'') )}); const idEls=[...document.querySelectorAll('span')].filter(x=>x.textContent.trim()==='#a8f72c91');idEls.forEach(x=>x.textContent='#'+row.video_id); const linkEls=[...document.querySelectorAll('span')].filter(x=>x.textContent.includes('videoqr.studio/video/a8f72c91'));linkEls.forEach(x=>x.textContent=row.link.replace(/^https?:\/\//,'')); const qrc=document.getElementById('qr-canvas'); if(qrc){const staticSvg=qrc.querySelector('#qr-svg');if(staticSvg)staticSvg.style.display='none';let holder=document.getElementById('real-qr-holder');if(!holder){holder=document.createElement('div');holder.id='real-qr-holder';qrc.appendChild(holder);}await renderRealQR(holder,row.link,{size:280,colorDark:'#c0c1ff',colorLight:'#0e1321'});} const prog=document.getElementById('progress-indicator'),pct=document.getElementById('upload-percent'); if(prog)prog.style.width='100%';if(pct)pct.textContent='100%';toast('Video uploaded — your real QR is ready!','task_alt');}catch(err){console.error(err);toast('Upload failed: '+(err.message||err));}});
    const copy=document.getElementById('copy-link-btn');copy?.addEventListener('click',async()=>{const row=window.currentVideoQR;if(row) await navigator.clipboard?.writeText(row.link);});
    for(const [id,ext,mime] of [['dl-png-btn','png','image/png'],['dl-jpg-btn','jpg','image/jpeg']]) document.getElementById(id)?.addEventListener('click',async()=>{const row=window.currentVideoQR;if(!row){toast('Upload a video first.');return;}const d=await qrImageData(row.link,2048); if(ext==='jpg'){const img=new Image();img.onload=()=>{const c=document.createElement('canvas');c.width=c.height=2048;c.getContext('2d').drawImage(img,0,0);downloadDataUrl(c.toDataURL(mime,.92),`videoqr-${row.video_id}.jpg`)};img.src=d}else downloadDataUrl(d,`videoqr-${row.video_id}.png`);});
    document.getElementById('dl-svg-btn')?.addEventListener('click',async()=>{const row=window.currentVideoQR;if(!row){toast('Upload a video first.');return;}await ensureQR();const holder=document.createElement('div');holder.style.position='fixed';holder.style.left='-99999px';document.body.appendChild(holder);new QRCode(holder,{text:row.link,width:1024,height:1024});await new Promise(r=>setTimeout(r,100));const canvas=holder.querySelector('canvas');const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><rect width="1024" height="1024" fill="white"/><image href="${canvas.toDataURL()}" width="1024" height="1024"/></svg>`;holder.remove();downloadDataUrl('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg),`videoqr-${row.video_id}.svg`);});
  }

  async function dashboard(){
    if(!document.getElementById('searchInput'))return; try{const rows=await listVideos(); window.videoRows=rows; const cards=[...document.querySelectorAll('.video-card')]; if(rows.length && cards.length){const sample=cards[0];const parent=sample.parentElement;cards.forEach(c=>c.remove());rows.forEach(v=>{const c=sample.cloneNode(true);c.dataset.videoId=v.video_id;c.querySelectorAll('*').forEach(el=>{if(el.textContent?.trim()==='video.mp4')el.textContent=v.file_name;if(el.textContent?.includes('1,248'))el.textContent=(v.views_count||0).toLocaleString();if(el.textContent?.includes('#a8f72c91'))el.textContent='#'+v.video_id;});const watch=c.querySelector('a[href="#"]');if(watch)watch.href=videoLink(v.video_id);const copy=c.querySelector('button[data-action="copy"]');if(copy)copy.onclick=()=>navigator.clipboard?.writeText(videoLink(v.video_id));const del=c.querySelector('button[data-action="delete"]');if(del)del.onclick=()=>openDeleteModal(v.file_name,v.video_id);parent.appendChild(c);});} }catch(e){console.warn(e)}
  }

  async function player(){
    const params=new URLSearchParams(location.search);const vid=params.get('v')||params.get('id');if(!vid)return;try{const v=await getVideo(vid);if(!v){toast('Video not found or inactive.');return;}await incrementView(vid);const media=document.querySelector('video');if(media){media.src=v.public_url||sessionStorage.getItem('videoqr-file-'+vid)||'';media.load();}document.querySelectorAll('span').forEach(s=>{if(s.textContent.trim()==='#a8f72c91')s.textContent='#'+v.video_id;if(s.textContent.trim()==='Cinematic Sunset')s.textContent=v.file_name.replace(/\.[^.]+$/,'');});const copy=document.getElementById('copyUrlBtn');copy?.addEventListener('click',()=>navigator.clipboard?.writeText(videoLink(v.video_id)));const share=document.getElementById('copyLinkBtn');share?.addEventListener('click',()=>navigator.share?navigator.share({title:v.file_name,url:videoLink(v.video_id)}):navigator.clipboard?.writeText(videoLink(v.video_id)));}catch(e){console.error(e);toast('Could not load video.');}}

  if(location.pathname.includes('videoqr_studio_create_customize_qr'))studio();
  if(location.pathname.includes('videoqr_studio_dashboard_analytics'))dashboard();
  if(location.pathname.includes('public_video_playback_videoqr_studio'))player();
})();
