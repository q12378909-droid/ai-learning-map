(()=>{
const cards=[...document.querySelectorAll('.py-card')],select=document.querySelector('#cardTopic'),more=document.querySelector('#moreCards');let limit=6;
function render(){const matches=cards.filter(c=>select.value==='all'||c.dataset.topic===select.value);cards.forEach(c=>c.hidden=true);matches.slice(0,limit).forEach(c=>c.hidden=false);document.querySelector('#cardCount').textContent=`顯示${Math.min(limit,matches.length)}／${matches.length}張`;more.hidden=limit>=matches.length;}
select.addEventListener('change',()=>{limit=6;render();});more.addEventListener('click',()=>{limit+=6;render();});
document.querySelectorAll('[data-topic-link]').forEach(a=>a.addEventListener('click',()=>{select.value=a.dataset.topicLink;limit=6;render();}));
cards.forEach(c=>c.querySelector('img').addEventListener('error',()=>{c.querySelector('.card-fallback').hidden=false;}));
const dialog=document.querySelector('#cardReader'),picture=document.querySelector('#readerImage');
document.querySelectorAll('[data-enlarge]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#cardReaderTitle').textContent=b.dataset.title;picture.alt=b.dataset.title+'：Google Drive原圖';picture.src='https://drive.google.com/thumbnail?id='+b.dataset.enlarge+'&sz=w2000';document.querySelector('#readerSource').href='https://drive.google.com/file/d/'+b.dataset.enlarge+'/view';dialog.showModal();}));
document.querySelector('#closeCard').addEventListener('click',()=>dialog.close());
render();
})();
