// Reading support and original cross-topic projects.
function handbookBlock(u){const h=u.handbook;if(!h)return '';return `<section class="reading-block"><h3>技術比較與選擇依據</h3><div class="table-scroll"><table><thead><tr>${h.table.heads.map(t=>`<th scope="col">${esc(t)}</th>`).join('')}</tr></thead><tbody>${h.table.rows.map(r=>`<tr>${r.map(t=>`<td>${esc(t)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="editorial">技術文件延伸整理，非官方指定工具或考題。</p></section><section class="practice-block"><h3>讀完後，試著不看筆記說明</h3><ul>${h.check.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><p>若有一項說不清楚，沿著本節目錄回顧，再用自己的例子解釋一次。</p></section>`;}
function teachingFigure(u){const p=u.teachingImage;if(!p)return '';return `<figure class="teaching-figure"><a href="${p.src}" target="_blank" rel="noopener" aria-label="開啟大圖：${esc(p.title)}"><img src="${p.src}" alt="${esc(p.alt)}" loading="lazy" decoding="async"></a><figcaption><strong>${esc(p.title)}</strong><ol>${p.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ol><small>${esc(p.limit)} 點擊圖片可開啟大圖。</small></figcaption></figure>`;}
function practiceBlock(u){const p=u.practice;if(!p)return '';return `<section class="practice-block" id="read-practice"><span class="eyebrow">TRY IT / 先思考，再看推導</span><h3>把概念用一次</h3><p>${esc(p.task)}</p><details><summary>展開逐步解法與判讀</summary><ol>${p.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><p class="practice-answer">${esc(p.answer)}</p></details><small>原創自我練習，不計入選擇題答題分數；建議先在紙上作答。</small></section>`;}
const projects=[
  {
    "id": "service",
    "title": "從客服需求到 RAG 試營運",
    "tag": "L21 · 綜合實作",
    "intro": "把「做一個客服機器人」拆成資料、系統、品質與成本四個可以驗證的問題。",
    "units": [
      "L21103",
      "L21201",
      "L21202",
      "L21203",
      "L21302"
    ],
    "steps": [
      [
        "01 定義邊界",
        "情境：電商每月有 6,000 件客服詢問，政策文件分散在不同系統。第一階段只回答一般商品及退貨政策，不執行退款、不修改訂單。先抽樣分類詢問，確認哪些可由文件回答、哪些必須查訂單、哪些需要人工判斷。將範圍寫清楚，才能避免展示時什麼都能聊，上線時卻無法承擔責任。"
      ],
      [
        "02 建立題組與現況",
        "建立 100 題示例測試：60 題一般規則、20 題時間或商品例外、10 題資料不足、10 題越權或誘導內容。這是本案例自行設計的比例，不是通用標準。每題記錄可接受答案、必要證據與應轉人工的條件。用人工現況或既有搜尋作基準，避免只和「什麼都沒有」比較。"
      ],
      [
        "03 整理文件而不是只上傳文件",
        "為文件加上版本、生效日、負責人與可見範圍。把規則與例外保留在可理解的段落中，再決定切塊和索引。若同一問題有兩份衝突文件，先由業務釐清，不要期望模型自行猜哪份正確。過期內容應有停用或適用時間標記。"
      ],
      [
        "04 設計失敗路徑",
        "查不到證據時明確說明不足，不能生成政策。查詢訂單前需驗證身分；涉及款項的工具由程式授權並設人工確認。檢索結果中的指令只視為文件文字，不得改變系統權限。記錄查到哪份文件、使用哪個模型版本及最後結果，以便追查。"
      ],
      [
        "05 把評估拆成三層",
        "文件層：需要的內容是否存在且有效？檢索層：問題是否找到了適用段落？回答層：答案是否忠於證據，且沒有遺漏限制？假設 100 題有 80 題取回正確文件，其中 60 題回答通過，則檢索成功率 80%、有正確檢索時的回答通過率 75%。其餘 20 題若全部不通過，端到端為 60%。這能幫助選擇下一個改善環節。"
      ],
      [
        "06 算淨節省，不只算生成速度",
        "假設每件原本人工 5 分鐘，新流程含複核平均 3 分鐘，每月節省 6,000×2/60＝200 小時。以每小時 300 元估值為 60,000 元；若每月新增系統成本 40,000 元，簡化淨效益為 20,000 元。若實際只節省 1 分鐘，估值變 30,000 元，淨效益為 −10,000 元。真正要量的是完整工作流程。"
      ],
      [
        "07 設定試點與退出條件",
        "先在少量可控流量試行，追蹤錯誤承諾、人工複核、顧客滿意度、延遲與成本。指定文件更新人與事件負責人，演練回退到人工或舊版流程。是否擴大由預先約定的品質和效益門檻決定，不由展示的印象決定。"
      ]
    ],
    "deliverable": "交付一頁方案：需求邊界、文件清單、測試題組、分層指標、成本假設、責任人與回退條件。",
    "question": "如果模型回答很快，但人工要花更久找出錯誤，這個 PoC 算成功嗎？",
    "answer": "不能只依推論速度判斷。應比較含查核、修正和例外處理的端到端時間，同時檢查品質與風險。這正是技術指標需要連回業務指標的原因。"
  }
];
function openProject(id){const p=projects.find(x=>x.id===id);if(!p)return;$('#lessonContent').innerHTML=`<div class="eyebrow">INTEGRATED WORKBOOK / 原創綜合案例</div><h2 id="lessonTitle">${esc(p.title)}</h2><p class="lesson-lead">${esc(p.intro)}</p><p class="editorial">教學用假設數據，非真實企業績效；案例與解答為本站原創，非官方考題。</p>${p.steps.map(([t,b])=>`<section class="reading-block"><h3>${esc(t)}</h3><p>${esc(b)}</p></section>`).join('')}<div class="callout"><strong>你可以交付什麼？</strong><p>${esc(p.deliverable)}</p></div><section class="practice-block"><h3>最後問自己</h3><p>${esc(p.question)}</p><details><summary>展開判讀</summary><p>${esc(p.answer)}</p></details></section><section class="reading-block"><h3>回到相關單元查來源</h3><div class="project-links">${p.units.map(id=>`<button data-project-unit="${id}">${id} ${esc(unitMap.get(id).title)} →</button>`).join('')}</div><small>各單元附官方章節與技術來源；整合案例的數據與流程為編輯教學設計。</small></section>`;document.querySelectorAll('[data-project-unit]').forEach(b=>b.onclick=()=>openUnit(b.dataset.projectUnit));showDialog();}
const glossary=[
  [
    "Token／Embedding",
    "Token 是模型處理的文字單位；Embedding 是把內容表示成數值向量。詞被切成幾個 Token，與向量有幾個維度，是不同問題。",
    "L21101"
  ],
  [
    "RAG／微調",
    "RAG 在回答時加入外部檢索證據；微調透過訓練改變參數。新知識、輸出風格、權限與成本是不同選型考量。",
    "L21103"
  ],
  [
    "PoC／試營運",
    "PoC 驗證關鍵可行性假設；試營運在受控真實流程中驗證品質、成本及維運。能展示不等於已具備正式服務條件。",
    "L21202"
  ],
  [
    "分類／偵測／分割",
    "分類回答整張圖屬於哪類；偵測提供矩形框；分割提供像素區域。選擇依下游要做的決策和標註成本而定。",
    "L21102"
  ],
  [
    "資料漂移／概念漂移",
    "資料漂移是輸入分布改變；概念漂移是輸入與目標的關係改變。告警要先調查，不代表每次都應重新訓練。",
    "L21302"
  ],
  [
    "雲端／地端／邊緣",
    "比較延遲、連線、資源、資料流向與維護能力。部署位置本身不保證安全、低成本或高品質。",
    "L21302"
  ]
];
const workbook=document.createElement('section');workbook.id='workbook';workbook.innerHTML=`<div class="eyebrow">READ · APPLY · CONNECT</div><h2>科目一綜合案例：從想法走到試營運。</h2><p>讀完科目一後，用七個步驟完成客服 AI 導入推演：需求、資料、系統、評估、成本與風險一起考慮。</p><div class="project-grid">${projects.map(p=>`<article><span class="tag">${p.tag}</span><h3>${esc(p.title)}</h3><p>${esc(p.intro)}</p><button data-project="${p.id}">開始七步推演 →</button></article>`).join('')}</div><h3 class="glossary-heading">6 組科目一容易混淆的概念，隨時翻回來看。</h3><div class="glossary-grid">${glossary.map(([t,b,id])=>`<details><summary>${esc(t)}</summary><p>${esc(b)}</p><button data-glossary="${id}">讀完整單元 ${id} →</button></details>`).join('')}</div>`;$('#sources').before(workbook);document.querySelectorAll('[data-project]').forEach(b=>b.onclick=()=>openProject(b.dataset.project));document.querySelectorAll('[data-glossary]').forEach(b=>b.onclick=()=>openUnit(b.dataset.glossary));
const visual=document.createElement('section');visual.className='visual-library';visual.innerHTML=`<div class="eyebrow">VISUAL LESSONS / 先看圖，再深入</div><h2>把抽象概念，放進看得見的情境。</h2><div class="project-grid">${units.filter(u=>u.teachingImage).map(u=>`<article><button class="visual-card" data-visual="${u.id}"><img src="${u.teachingImage.src}" alt="${esc(u.teachingImage.alt)}" loading="lazy"><span>${u.id}</span><strong>${esc(u.teachingImage.title)}</strong><small>開啟圖解、閱讀重點與完整單元 →</small></button></article>`).join('')}</div><p class="editorial">圖庫圖片以 AI 生成，作為概念示意；精確公式、限制與解題步驟以單元文字及來源為準。</p>`;$('#map').before(visual);document.querySelectorAll('[data-visual]').forEach(b=>b.onclick=()=>openUnit(b.dataset.visual));
