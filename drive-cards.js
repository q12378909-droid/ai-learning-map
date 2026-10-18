const driveSubjects={
 L21:{name:'科目一',cards:window.DRIVE_CARDS,folder:'https://drive.google.com/drive/folders/1nVo33tjfyS0nb20SBO2yRWkNHMvSw1hu',index:'drive-card-index',total:123},
 L23:{name:'科目三',cards:window.DRIVE_CARDS_L23,folder:'https://drive.google.com/drive/folders/1QGRSZkUntNFx8sVoMD6qfONZSp_Q8wDf',index:'drive-card-index-l23',total:81}
};
function driveSubject(u){return driveSubjects[u.id.slice(0,3)];}
function driveCardBlock(u){
 const s=driveSubject(u);if(!s)return '';
 const cards=s.cards.filter(c=>c.unit===u.id);
 const intro=cards.length?`<p>已對應 ${cards.length} 張雲端原圖。點「查看原圖」直接在本頁閱讀；檔號是原始檔名尾號，與圖片內編號可能不同。</p><div id="drivePreview" class="drive-preview" hidden></div><details class="drive-list" open><summary>本單元 ${cards.length} 張圖卡清單（點此收合）</summary><ol>${cards.map(c=>`<li><div><strong>${esc(c.title)}</strong><small>檔號 ${c.n}${c.duplicates.length?' · 已合併相同檔案 '+c.duplicates.map(d=>d.n).join('、'):''}</small></div><div class="drive-card-actions"><button type="button" data-drive-preview="${c.id}">查看原圖 · 頁內預覽</button><a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">Google Drive 原圖 ↗</a></div></li>`).join('')}</ol></details>`:
 `<p>目前這個雲端資料夾沒有直接對應「${esc(u.title)}」的專屬圖卡，請先閱讀本單元教材。</p>${u.id==='L21104'?'<p>文字與影像模態可延伸閱讀以下圖卡，但不取代本單元的融合、對齊與評估內容。</p><div class="drive-card-actions"><button data-drive-unit="L21101">NLP 圖卡 →</button><button data-drive-unit="L21102">電腦視覺圖卡 →</button></div>':''}`;
 return `<section id="read-drive-cards" class="drive-card-block"><div class="eyebrow">GOOGLE DRIVE / ${s.name}補充圖卡</div><h3>你的雲端圖卡，對照本單元一起讀。</h3>${intro}<p class="editorial">依圖卡標題與主題整理；使用者提供的補充教材，非官方教材認證或逐句審校。圖片中的考點與實驗結果不代表官方保證；公式、法規及版本請搭配教材來源查核。原圖沿用雲端權限；無法預覽時可開啟原圖並登入有權限的帳號。</p><a href="${s.folder}" target="_blank" rel="noopener noreferrer">查看${s.name}整個圖卡資料夾 ↗</a></section>`;
}
function showDriveCard(id){
 const c=Object.values(driveSubjects).flatMap(s=>s.cards).find(c=>c.id===id),host=$('#drivePreview');if(!c||!host)return;
 host.hidden=false;host.innerHTML=`<div class="drive-preview-heading"><strong>${esc(c.title)} · 檔號 ${c.n}</strong><button type="button" id="closeDrivePreview">關閉圖卡預覽</button></div><p><a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">預覽空白或要求登入？開啟 Google Drive 原圖 ↗</a></p><iframe title="${esc(c.title)}：Google Drive 圖卡預覽" src="https://drive.google.com/file/d/${c.id}/preview" referrerpolicy="no-referrer" allow="fullscreen"></iframe>`;
 host.scrollIntoView({block:'start',behavior:'smooth'});
 $('#closeDrivePreview').onclick=()=>{host.innerHTML='';host.hidden=true;document.querySelector(`[data-drive-preview="${c.id}"]`)?.focus();};
}
document.addEventListener('click',e=>{
 const preview=e.target.closest('[data-drive-preview]');if(preview){showDriveCard(preview.dataset.drivePreview);return;}
 const unit=e.target.closest('[data-drive-unit]');if(unit){openUnit(unit.dataset.driveUnit);const block=$('#read-drive-cards');if(block)block.scrollIntoView({block:'start'});}
 const result=e.target.closest('[data-drive-result]');if(result){const c=Object.values(driveSubjects).flatMap(s=>s.cards).find(c=>c.id===result.dataset.driveResult);if(c){openUnit(c.unit);showDriveCard(c.id);}}
});
let driveIndexAnchor=$('#map');
Object.entries(driveSubjects).forEach(([prefix,s])=>{
 const index=document.createElement('section');index.id=s.index;index.className='drive-card-index';
 const mapped=new Set(s.cards.map(c=>c.unit)).size;
 index.innerHTML=`<div class="eyebrow">${prefix} / 教材與雲端原圖對照</div><h2>${s.name}補充圖卡，跟著單元讀。</h2><p>${s.total} 個雲端檔案整理成 ${s.cards.length} 張圖卡，對應 ${mapped} 個單元。${s.total>s.cards.length?'完全相同的檔案已合併顯示。':''}點選單元即可看到圖卡清單；沒有直接對應的單元會明確標示。</p><div class="drive-unit-grid">${units.filter(u=>u.id.startsWith(prefix)).map(u=>{const n=s.cards.filter(c=>c.unit===u.id).length;return `<button data-drive-unit="${u.id}"><small>${u.id} · ${n?n+' 張圖卡':'暫無專屬圖卡'}</small><strong>${esc(u.title)}</strong><span>教材與圖卡 →</span></button>`;}).join('')}</div><label class="drive-search">找${s.name}圖卡主題或原始檔號<input id="driveCardSearch-${prefix}" type="search" placeholder="例如：${prefix==='L21'?'RAG、資料洩漏、117':'PCA、梯度、77'}"></label><div class="drive-card-results" aria-live="polite"></div><p class="editorial">對照整理日期：2026-10-18。圖卡主題對應不代表每段內容都經查核，正式範圍仍以官方指引與勘誤為準。</p>`;
 driveIndexAnchor.after(index);driveIndexAnchor=index;
 index.querySelector('input').addEventListener('input',e=>{
  const q=e.target.value.trim().toLowerCase(),host=index.querySelector('.drive-card-results');if(!q){host.innerHTML='';return;}
  const numeric=/^\d+$/.test(q),matches=s.cards.filter(c=>numeric?[c.n,...c.duplicates.map(d=>d.n)].includes(Number(q)):(c.title+' '+c.unit+' '+c.file).toLowerCase().includes(q));
  host.innerHTML=`<p>找到 ${matches.length} 張圖卡</p><ul>${matches.map(c=>`<li><strong>${esc(c.title)}</strong> <small>檔號 ${c.n} · ${c.unit}</small><div class="drive-card-actions"><button data-drive-result="${c.id}">查看圖卡與對應教材 →</button><a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">開啟原圖 ↗</a></div></li>`).join('')}</ul>`;
 });
});
