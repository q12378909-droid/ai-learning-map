// A single map is the entry point; supporting tools stay available on demand.
(() => {
 const one=s=>document.querySelector(s);
 const remove=s=>document.querySelectorAll(s).forEach(n=>n.remove());
 one('.hero').innerHTML='<div class="eyebrow">iPAS 中級 · REVIEW AT YOUR PACE</div><h1>把每次複習，<span>連成理解。</span></h1><p>選一個單元，讀懂概念、看圖說明，再用自己的話教一次。</p><div class="review-steps"><span>01 選擇科目</span><b>→</b><span>02 理解與圖解</span><b>→</b><span>03 自我檢核</span></div>';
 one('header nav').innerHTML='<a href="#map">學習地圖</a><a href="#lab">練習工具</a><a href="#sources">參考資源</a>';
 remove('.orientation,.upgrade-note,.field-note,.errata,.external-resources,.source-note');
 one('#map .section-head .eyebrow').textContent='YOUR STUDY MAP';
 one('#map h2').textContent='今天，複習哪一科？';
 const pythonEntry=document.createElement('p');pythonEntry.className='map-intro';pythonEntry.innerHTML='<a href="python.html"><strong>Python 實作教學 →</strong></a>　16 節費曼教學 · 程式範例與下載 · 延伸學習';one('#map .section-head').after(pythonEntry);
 const tabs=one('.toolbar .tabs');
 tabs.innerHTML='<button data-route="all" aria-pressed="true">全部科目</button><button data-route="21" aria-pressed="false">科目一 · AI 規劃</button><button data-route="22" aria-pressed="false">科目二 · 數據分析</button><button data-route="23" aria-pressed="false">科目三 · 機器學習</button>';
 tabs.querySelectorAll('button').forEach(b=>b.onclick=()=>{route=b.dataset.route;tabs.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));render();});
 one('#search').placeholder='搜尋代碼、概念或圖卡主題';
 one('#map .section-head').after(one('.study-tools'));
 const info=document.createElement('p');info.className='map-intro';info.textContent='L21 為共同考科；L22、L23 為選考方向。圖解與 Google Drive 原圖都收在對應單元內。';one('.toolbar').before(info);
 function fold(section,title,description){const details=document.createElement('details');details.className='resource-fold';details.id=section.id;const summary=document.createElement('summary');summary.innerHTML=`<span>${title}<small>${description}</small></span><span aria-hidden="true">＋</span>`;details.append(summary);const body=document.createElement('div');body.className='fold-body';while(section.firstChild)body.append(section.firstChild);details.append(body);section.replaceWith(details);return body;}
 const labs=one('.labs');one('#threshold').closest('article').remove();
 const calc=one('.ml-calculator');if(calc)labs.append(calc);
 const cases=document.createElement('div');cases.className='case-actions';
 document.querySelectorAll('[data-project],#mlCase').forEach(b=>{b.textContent=b.id==='mlCase'?'科目三：顧客流失預測推演 →':'科目一：客服 AI 導入推演 →';cases.append(b);});
 remove('#workbook,#ml-workbook,[data-lab-unit],#mlRead');
 one('#lab').append(cases);one('#lab').querySelectorAll(':scope > .eyebrow,:scope > h2,:scope > p').forEach(n=>n.remove());
 fold(one('#lab'),'練習工具與綜合案例','4 個互動工具 · 2 個實務推演，按需展開');
 one('#sources').querySelectorAll(':scope > .eyebrow,:scope > h2').forEach(n=>n.remove());
 const quiz=document.createElement('a');quiz.href='https://crabtsai.github.io/IPS-AI-Application-Planner-middle-level-Exam-Questions/';quiz.target='_blank';quiz.rel='noopener noreferrer';quiz.textContent='中級刷題網站 ↗';one('#sourceLinks').prepend(quiz);
 fold(one('#sources'),'官方指引與刷題資源','官方學習指引、勘誤與外部題庫，集中在這裡');
 document.querySelectorAll('header nav a').forEach(a=>a.addEventListener('click',()=>{const target=one(a.getAttribute('href'));if(target?.tagName==='DETAILS')target.open=true;}));
 // Keep old bookmarks useful after merging the separate galleries into the map.
 function restoreAnchor(){let hash;try{hash=decodeURIComponent(location.hash);}catch{return;}if(hash.startsWith('#drive-card-index')||hash.startsWith('#map，')){history.replaceState(null,'','#map');one('#map').scrollIntoView();}const target=document.getElementById(location.hash.slice(1));if(target?.tagName==='DETAILS')target.open=true;}
 window.addEventListener('hashchange',restoreAnchor);restoreAnchor();render();
})();

window.organizeReader=function(u){
 const root=document.querySelector('#lessonContent');
 const nav=root.querySelector('.reader-nav');
 // Chapter navigation already exists below the lesson; avoid a second list here.
 nav.querySelectorAll('button,hr').forEach(n=>n.remove());
 [...nav.querySelectorAll('strong')].slice(1).forEach(n=>n.remove());
 const toc=document.createElement('details');toc.className='reader-toc';toc.open=false;toc.innerHTML='<summary>本節目錄<span class="toc-hint" aria-hidden="true"></span></summary>';nav.replaceWith(toc);toc.append(nav);nav.querySelector('strong')?.remove();
 const cards=root.querySelector('#read-drive-cards');
 if(cards){const list=cards.querySelector('.drive-list');if(list){const fold=document.createElement('details');fold.id=cards.id;fold.className='drive-card-block';fold.innerHTML='<summary>補充圖卡 · '+list.querySelectorAll('li').length+' 張 Google Drive 原圖</summary>';cards.removeAttribute('id');cards.replaceWith(fold);fold.append(cards);const items=document.createElement('div');items.className='drive-list';items.append(list.querySelector('ol'));list.replaceWith(items);}else{cards.remove();nav.querySelector('[href="#read-drive-cards"]')?.remove();}}
 const sources=root.querySelector('#read-sources');const fold=document.createElement('details');fold.id=sources.id;fold.className='reading-block unit-sources';fold.innerHTML='<summary>查核與延伸來源</summary>';sources.removeAttribute('id');sources.querySelector('h3')?.remove();sources.replaceWith(fold);fold.append(sources);
 root.querySelector('#backChapter').textContent='回到學習地圖';root.querySelector('#backChapter').onclick=()=>document.querySelector('#lesson').close();
};
