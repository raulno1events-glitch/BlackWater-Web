'use strict';
// Screensaver mode is enabled by the macOS .saver bundle: it hides every UI control.
const saverMode=!!window.__BLACKWATER_SAVER__||new URLSearchParams(location.search).has('saver');
const previewMode=!!window.__BLACKWATER_PREVIEW__;
if(saverMode)document.documentElement.classList.add('saver');
const languages = {
 es: ['Fibra', 'Telecom.', 'Legal.', 'Torres', 'Campo', 'Energía', 'Network', 'Conectividad', 'Infraestructura', 'Banda ancha', '5G', 'Satélite', 'Datos', 'Ingeniería', 'Innovación', 'Cobertura', 'Redes ópticas', 'Despliegue', 'Operaciones', 'Mantenimiento', 'Seguridad', 'Transmisión', 'Antenas', 'Enlaces', 'Nube', 'Conexiones'],
 en: ['Fiber', 'Telecom.', 'Legal.', 'Towers', 'Field', 'Energy', 'Network', 'Connectivity', 'Infrastructure', 'Broadband', '5G', 'Satellite', 'Data', 'Engineering', 'Innovation', 'Coverage', 'Optical networks', 'Deployment', 'Operations', 'Maintenance', 'Security', 'Transmission', 'Antennas', 'Links', 'Cloud', 'Connections'],
 fr: ['Fibre', 'Télécom.', 'Juridique', 'Tours', 'Terrain', 'Énergie', 'Réseau', 'Connectivité', 'Infrastructure', 'Haut débit', '5G', 'Satellite', 'Données', 'Ingénierie', 'Innovation', 'Couverture', 'Réseaux optiques', 'Déploiement', 'Opérations', 'Maintenance', 'Sécurité', 'Transmission', 'Antennes', 'Liaisons', 'Cloud', 'Connexions'],
 de: ['Glasfaser', 'Telekom.', 'Recht', 'Türme', 'Außendienst', 'Energie', 'Netzwerk', 'Konnektivität', 'Infrastruktur', 'Breitband', '5G', 'Satellit', 'Daten', 'Ingenieurwesen', 'Innovation', 'Abdeckung', 'Optische Netze', 'Netzausbau', 'Betrieb', 'Wartung', 'Sicherheit', 'Übertragung', 'Antennen', 'Verbindungen', 'Cloud', 'Anschlüsse'],
 pt: ['Fibra', 'Telecom.', 'Jurídico', 'Torres', 'Campo', 'Energia', 'Rede', 'Conectividade', 'Infraestrutura', 'Banda larga', '5G', 'Satélite', 'Dados', 'Engenharia', 'Inovação', 'Cobertura', 'Redes ópticas', 'Implantação', 'Operações', 'Manutenção', 'Segurança', 'Transmissão', 'Antenas', 'Enlaces', 'Nuvem', 'Conexões'],
 ar: ['ألياف', 'اتصالات', 'قانون', 'أبراج', 'ميدان', 'طاقة', 'شبكة', 'ترابط', 'بنية تحتية', 'نطاق عريض', '5G', 'أقمار صناعية', 'بيانات', 'هندسة', 'ابتكار', 'تغطية', 'شبكات ضوئية', 'نشر الشبكات', 'عمليات', 'صيانة', 'أمن', 'إرسال', 'هوائيات', 'روابط', 'سحابة', 'اتصالات شبكية']
};
Object.assign(languages,{
 it:['Fibra','Telecom.','Legale','Torri','Campo','Energia','Rete','Connettività','Infrastruttura','Banda larga','5G','Satellite','Dati','Ingegneria','Innovazione','Copertura','Reti ottiche','Implementazione','Operazioni','Manutenzione','Sicurezza','Trasmissione','Antenne','Collegamenti','Cloud','Connessioni'],
 nl:['Glasvezel','Telecom.','Juridisch','Torens','Buitendienst','Energie','Netwerk','Connectiviteit','Infrastructuur','Breedband','5G','Satelliet','Data','Techniek','Innovatie','Dekking','Optische netwerken','Uitrol','Operaties','Onderhoud','Beveiliging','Transmissie','Antennes','Verbindingen','Cloud','Aansluitingen'],
 tr:['Fiber','Telekom.','Hukuk','Kuleler','Saha','Enerji','Ağ','Bağlantı','Altyapı','Geniş bant','5G','Uydu','Veri','Mühendislik','İnovasyon','Kapsama','Optik ağlar','Kurulum','Operasyonlar','Bakım','Güvenlik','İletim','Antenler','Bağlantılar','Bulut','Bağlantılar'],
 hi:['फाइबर','दूरसंचार','कानूनी','टावर','क्षेत्र','ऊर्जा','नेटवर्क','कनेक्टिविटी','बुनियादी ढाँचा','ब्रॉडबैंड','5G','उपग्रह','डेटा','अभियांत्रिकी','नवाचार','कवरेज','ऑप्टिकल नेटवर्क','तैनाती','संचालन','रखरखाव','सुरक्षा','प्रसारण','एंटीना','लिंक','क्लाउड','कनेक्शन'],
 zh:['光纤','电信','法务','通信塔','现场','能源','网络','互联','基础设施','宽带','5G','卫星','数据','工程','创新','覆盖','光网络','部署','运营','维护','安全','传输','天线','链路','云端','连接'],
 ja:['光ファイバー','通信','法務','通信塔','現場','エネルギー','ネットワーク','接続性','インフラ','ブロードバンド','5G','衛星','データ','エンジニアリング','革新','カバレッジ','光ネットワーク','展開','運用','保守','セキュリティ','伝送','アンテナ','リンク','クラウド','接続'],
 ko:['광섬유','통신','법무','통신탑','현장','에너지','네트워크','연결성','인프라','광대역','5G','위성','데이터','엔지니어링','혁신','커버리지','광 네트워크','구축','운영','유지보수','보안','전송','안테나','링크','클라우드','연결']
});
Object.assign(languages,{
 ru:['Оптоволокно','Телеком','Право','Башни','На объектах','Энергия','Сеть','Связность','Инфраструктура','Широкополосный доступ','5G','Спутник','Данные','Инженерия','Инновации','Покрытие','Оптические сети','Развёртывание','Эксплуатация','Обслуживание','Безопасность','Передача','Антенны','Каналы связи','Облако','Соединения'],
 pl:['Światłowód','Telekom.','Prawo','Wieże','Teren','Energia','Sieć','Łączność','Infrastruktura','Internet szerokopasmowy','5G','Satelita','Dane','Inżynieria','Innowacje','Zasięg','Sieci optyczne','Wdrożenie','Operacje','Konserwacja','Bezpieczeństwo','Transmisja','Anteny','Łącza','Chmura','Połączenia'],
 sv:['Fiber','Telekom.','Juridik','Master','Fält','Energi','Nätverk','Anslutning','Infrastruktur','Bredband','5G','Satellit','Data','Ingenjörskonst','Innovation','Täckning','Optiska nät','Utbyggnad','Drift','Underhåll','Säkerhet','Överföring','Antenner','Länkar','Moln','Förbindelser'],
 id:['Serat optik','Telekom.','Hukum','Menara','Lapangan','Energi','Jaringan','Konektivitas','Infrastruktur','Pita lebar','5G','Satelit','Data','Rekayasa','Inovasi','Cakupan','Jaringan optik','Penerapan','Operasi','Pemeliharaan','Keamanan','Transmisi','Antena','Tautan','Awan','Koneksi'],
 el:['Οπτική ίνα','Τηλεπικοινωνίες','Νομικά','Πύργοι','Πεδίο','Ενέργεια','Δίκτυο','Συνδεσιμότητα','Υποδομή','Ευρυζωνικότητα','5G','Δορυφόρος','Δεδομένα','Μηχανική','Καινοτομία','Κάλυψη','Οπτικά δίκτυα','Ανάπτυξη','Λειτουργία','Συντήρηση','Ασφάλεια','Μετάδοση','Κεραίες','Ζεύξεις','Νέφος','Συνδέσεις']
});
const additionalTerms={
 "es": "Enrutamiento|Conmutación|Ancho de banda|Latencia|Red troncal|Última milla|Centros de datos|Internet de las cosas|Redundancia|Escalabilidad",
 "en": "Routing|Switching|Bandwidth|Latency|Backbone|Last mile|Data centers|Internet of Things|Redundancy|Scalability",
 "fr": "Routage|Commutation|Bande passante|Latence|Réseau dorsal|Dernier kilomètre|Centres de données|Internet des objets|Redondance|Évolutivité",
 "de": "Routing|Vermittlung|Bandbreite|Latenz|Kernnetz|Letzte Meile|Rechenzentren|Internet der Dinge|Redundanz|Skalierbarkeit",
 "pt": "Roteamento|Comutação|Largura de banda|Latência|Rede principal|Última milha|Centros de dados|Internet das coisas|Redundância|Escalabilidade",
 "ar": "توجيه|تبديل|عرض النطاق|زمن الاستجابة|شبكة أساسية|الميل الأخير|مراكز البيانات|إنترنت الأشياء|تكرار احتياطي|قابلية التوسع",
 "it": "Instradamento|Commutazione|Larghezza di banda|Latenza|Rete dorsale|Ultimo miglio|Centri dati|Internet delle cose|Ridondanza|Scalabilità",
 "nl": "Routering|Schakeling|Bandbreedte|Vertraging|Kernnetwerk|Laatste mijl|Datacenters|Internet der dingen|Redundantie|Schaalbaarheid",
 "tr": "Yönlendirme|Anahtarlama|Bant genişliği|Gecikme|Omurga ağı|Son kilometre|Veri merkezleri|Nesnelerin interneti|Yedeklilik|Ölçeklenebilirlik",
 "hi": "रूटिंग|स्विचिंग|बैंडविड्थ|विलंबता|बैकबोन नेटवर्क|अंतिम मील|डेटा केंद्र|इंटरनेट ऑफ थिंग्स|अतिरिक्त व्यवस्था|विस्तार क्षमता",
 "zh": "路由|交换|带宽|时延|骨干网|最后一公里|数据中心|物联网|冗余|可扩展性",
 "ja": "ルーティング|スイッチング|帯域幅|遅延|バックボーン|ラストワンマイル|データセンター|モノのインターネット|冗長性|拡張性",
 "ko": "라우팅|스위칭|대역폭|지연 시간|백본망|라스트 마일|데이터 센터|사물인터넷|이중화|확장성",
 "ru": "Маршрутизация|Коммутация|Пропускная способность|Задержка|Магистральная сеть|Последняя миля|Центры обработки данных|Интернет вещей|Резервирование|Масштабируемость",
 "pl": "Routing|Przełączanie|Przepustowość|Opóźnienie|Sieć szkieletowa|Ostatnia mila|Centra danych|Internet rzeczy|Redundancja|Skalowalność",
 "sv": "Routning|Växling|Bandbredd|Latens|Stamnät|Sista milen|Datacenter|Sakernas internet|Redundans|Skalbarhet",
 "id": "Perutean|Penyakelaran|Lebar pita|Latensi|Jaringan inti|Mil terakhir|Pusat data|Internet untuk segala|Redundansi|Skalabilitas",
 "el": "Δρομολόγηση|Μεταγωγή|Εύρος ζώνης|Καθυστέρηση|Δίκτυο κορμού|Τελευταίο μίλι|Κέντρα δεδομένων|Διαδίκτυο των πραγμάτων|Πλεονασμός|Κλιμάκωση"
};
for(const [code,terms] of Object.entries(additionalTerms))languages[code].push(...terms.split("|"));
languages.he=['סיבים אופטיים','תקשורת','משפט','מגדלים','שטח','אנרגיה','רשת','קישוריות','תשתיות','פס רחב','5G','לוויין','נתונים','הנדסה','חדשנות','כיסוי','רשתות אופטיות','פריסה','תפעול','תחזוקה','אבטחה','תמסורת','אנטנות','קישורים','ענן','חיבורים','ניתוב','מיתוג','רוחב פס','השהיה','רשת ליבה','המייל האחרון','מרכזי נתונים','האינטרנט של הדברים','יתירות','יכולת הרחבה'];
for(const [code,name] of Object.entries({it:'Italiano',nl:'Nederlands',tr:'Türkçe',hi:'हिन्दी',zh:'中文',ja:'日本語',ko:'한국어',ru:'Русский',pl:'Polski',sv:'Svenska',id:'Bahasa Indonesia',el:'Ελληνικά',he:'עברית'})){
 const option=document.createElement('option');option.value=code;option.textContent=name;document.querySelector('#language').append(option);
}
const codes=Object.keys(languages);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const background=window.createGhostFibers(document.querySelector('.ghost-fibers-container'),{
 glowColor:'#8b9fe8',lineColor:'#e0edff',secondaryColor:'#625b9e',
 layers:previewMode?2:3,threads:previewMode?40:72,fiberStyle:'dots',depthOfField:.85,twist:1.2,
 speed:.3,flow:.25,rollSpeed:.12,rotation:18,particles:.35,sparkle:.25,
 glow:.8,brightness:.8,grain:.025,vignette:.3,intro:false,
 mouseInteraction:!saverMode,pulseOnClick:false,dpr:previewMode?1:1.4,paused:reduced.matches
});
if(!background)document.querySelector('#message').textContent='The fiber effect requires WebGL 2. Text animation is still available.';
let width=0,height=0,time=0,last=0,paused=reduced.matches&&!saverMode,mode='all',raf=0;
// Reserved positions surround a clear central stage for the logo.
const positions=[.15,.74,.26,.85,.34,.63].flatMap(y=>[.18,.50,.82].map(x=>[x,y]));
const mobilePositions=[.17,.72,.25,.82,.33,.64].flatMap(y=>[.18,.50,.82].map(x=>[x,y]));
const words=positions.slice(0,11).map((p,i)=>{
 const el=document.createElement('span');el.className='word';
 const front=document.createElement('span'),back=document.createElement('span');
 front.className=back.className='word-face';const glow=document.createElement('span');glow.className='word-glow';el.append(glow,front,back);
 document.querySelector('.words').append(el);
 return {el,glow,p,slot:i,targetSlot:i,index:i<7?i:26+i-7,lang:'es',front,back,nextAt:8+i*.85,transition:null,changes:0};
});
const logoWord=document.querySelector('.brand .cls-5');
// The brand wording never participates in translations.
logoWord.textContent='NETWORK';logoWord.setAttribute('lang','en');
const logoVisual=document.querySelector('.brand svg');
const entranceDuration=7;
let introEnabled=!reduced.matches;

function resize(){width=innerWidth;height=innerHeight;if(paused)draw();}
function setFace(face,index,lang){
 const text=languages[lang][index].toUpperCase();
 face.classList.remove('shine');face.dataset.shone='';
 const letters=typeof Intl.Segmenter==='function'?[...new Intl.Segmenter(lang,{granularity:'grapheme'}).segment(text)].map(part=>part.segment):Array.from(text);
 face.replaceChildren(...letters.map((letter,i)=>{const span=document.createElement('span');span.className='letter';span.textContent=letter;span.style.setProperty('--shine-delay',`${i*Math.min(.025,.65/letters.length)}s`);return span;}));
 face.setAttribute('data-text',text);face.setAttribute('lang',lang);face.setAttribute('dir',(lang==='ar'||lang==='he')?'rtl':'ltr');
}
function nextLanguage(previous){return mode==='all'?codes[(codes.indexOf(previous)+1+Math.floor(Math.random()*(codes.length-1)))%codes.length]:mode;}
function beginChange(w){
 // Introduce a fresh concept on each independent transition.
 const occupied=new Set(words.map(other=>other.index));
 {
  const available=languages.es.map((_,i)=>i).filter(i=>!occupied.has(i));
  w.index=available[Math.floor(Math.random()*available.length)];
 }
 w.lang=nextLanguage(w.lang);w.changes++;
 const reserved=new Set(words.flatMap(other=>[other.slot,other.targetSlot]));
 const free=positions.map((_,i)=>i).filter(i=>!reserved.has(i));
 w.targetSlot=free.length?free[Math.floor(Math.random()*free.length)]:w.slot;
 setFace(w.back,w.index,w.lang);w.transition={start:time,duration:4.6+Math.random()*.8};
}
function faceStyle(face,opacity,y,blur,smoke=0,light=0){
 face.style.opacity=opacity;
 if(opacity<.1||blur>=3){face.dataset.shone='';face.classList.remove('shine');}
 if(opacity>.7&&blur<3&&!face.dataset.shone){face.dataset.shone='yes';face.classList.add('shine');}face.style.transform=`translate(-50%,calc(-50% + ${y}px))`;
 face.style.filter=`blur(${blur}px)`;
 face.style.setProperty('--smoke',smoke);
 face.style.setProperty('--smoke-opacity',Math.sin(smoke*Math.PI)*.65);
 face.style.setProperty('--light',light);
 face.style.textShadow=`0 -1px 0 rgba(255,255,255,.7), 0 1px 0 #526882, 0 2px 0 #314158, 0 3px 5px rgba(0,0,0,.8), 0 0 ${20+light*40}px rgba(190,222,255,${.35+light*.9})`;
}
function updateWords(){
 words.forEach(w=>{
  if(!w.transition&&time>=w.nextAt)beginChange(w);
  if(!w.transition)return;
  const progress=Math.min(1,(time-w.transition.start)/w.transition.duration);
  const outgoing=smooth(progress/.44),incoming=smooth((progress-.56)/.44);
  // Relocate only in the fully invisible interval: no visible jump or crossing the logo.
  if(progress>=.5)w.slot=w.targetSlot;
  faceStyle(w.front,1-outgoing,-outgoing*27,outgoing*10,outgoing);
  const light=Math.sin(incoming*Math.PI);
  faceStyle(w.back,incoming,(1-incoming)*14,(1-incoming)*9,0,light);
  w.glow.style.opacity=(1-outgoing+incoming)*.5+light*1.1;
  w.glow.style.transform=`translate(-50%,-50%) scale(${.7+incoming*.65})`;
  if(progress===1){
   [w.front,w.back]=[w.back,w.front];w.transition=null;
   // Each word has its own uncorrelated hold; there is no shared reset.
   w.nextAt=time+2+Math.random()*2;
  }
 });
}

function smooth(x){x=Math.max(0,Math.min(1,x));return x*x*x*(x*(x*6-15)+10);}
function draw(){
 const entrance=!introEnabled?1:smooth(time/entranceDuration);
 logoVisual.style.opacity=entrance;
 logoVisual.style.transform=`translateY(${(1-entrance)*18}px) scale(${.94+.06*entrance})`;
 logoVisual.style.filter=`blur(${(1-entrance)*16}px) drop-shadow(0 0 ${24+(1-entrance)*40}px #a9cfff30)`;
 document.querySelector('.ghost-fibers-container').style.opacity=.25+.75*(!introEnabled?1:smooth(time/8));
 updateWords();
 words.forEach((w,i)=>{
  const p=(width<650?mobilePositions:positions)[w.slot];
  const drift=Math.sin(time*.075+i)*.65;
  w.el.style.left=(p[0]*100+drift)+'%';w.el.style.top=(p[1]*100+Math.cos(time*.065+i)*.5)+'%';
  const appear=!introEnabled?1:smooth((time-3.2-i*.55)/3.5);
  w.el.style.opacity=(.82+(i%3)*.06)*appear;
  if(w.changes===0&&!w.transition){
   const light=Math.sin(appear*Math.PI);
   w.glow.style.opacity=appear*.5+light*1.1;
   faceStyle(w.front,1,(1-appear)*14,(1-appear)*9,0,light);
  }
 });
}
function frame(now){raf=0;if(paused||document.hidden)return;if(last)time+=Math.min((now-last)/1000,.08);last=now;draw();raf=requestAnimationFrame(frame);}
function start(){last=0;if(!raf&&!paused&&!document.hidden)raf=requestAnimationFrame(frame);}
function updatePause(){background?.setPaused(paused);document.body.classList.toggle('paused',paused);document.querySelector('#pause').textContent=paused?'Play':'Pause';document.querySelector('#pause').setAttribute('aria-pressed',String(paused));}
function togglePause(){paused=!paused;if(!paused&&time===0)introEnabled=true;updatePause();if(paused){cancelAnimationFrame(raf);raf=0;}else start();}
// Hooks the macOS .saver bundle calls when the screen saver starts and stops.
window.__BLACKWATER_RESUME__=()=>{if(paused)togglePause();};
window.__BLACKWATER_SUSPEND__=()=>{if(!paused)togglePause();};
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{document.querySelector('#message').textContent='Use your browser’s full-screen command (F11).';}}
document.querySelector('#pause').addEventListener('click',togglePause);
document.querySelector('#fullscreen').addEventListener('click',fullscreen);
document.addEventListener('fullscreenchange',()=>document.querySelector('#fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen');
document.querySelector('#language').addEventListener('change',e=>{
 mode=e.target.value;
 words.forEach((w,i)=>{
  if(paused){w.lang=nextLanguage(w.lang);setFace(w.front,w.index,w.lang);faceStyle(w.front,1,0,0);faceStyle(w.back,0,10,6);w.slot=w.targetSlot;w.transition=null;w.glow.style.opacity=.3;}
  w.nextAt=time+.5+i*1.7;
 });
 draw();
});
document.addEventListener('keydown',e=>{if(e.target.matches('button,select'))return;if(e.code==='Space'){e.preventDefault();togglePause();}if(e.key.toLowerCase()==='f')fullscreen();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else start();});
let idleTimer;function showControls(){if(saverMode){document.body.classList.add('idle');return;}document.body.classList.remove('idle');clearTimeout(idleTimer);idleTimer=setTimeout(()=>{if(!document.querySelector('.controls').contains(document.activeElement))document.body.classList.add('idle');},4000);}
['pointermove','pointerdown','keydown','focusin'].forEach(event=>document.addEventListener(event,showControls));
addEventListener('resize',resize);reduced.addEventListener('change',e=>{if(e.matches&&!paused&&!saverMode)togglePause();});
words.forEach(w=>{setFace(w.front,w.index,w.lang);faceStyle(w.front,1,0,0);faceStyle(w.back,0,10,6);});
resize();updatePause();showControls();start();




// Keep gestures on the animation from invoking browser zoom, selection or menus.
for(const name of ['contextmenu','selectstart','dragstart'])document.addEventListener(name,e=>e.preventDefault());
for(const name of ['gesturestart','gesturechange','gestureend'])document.addEventListener(name,e=>e.preventDefault(),{passive:false});
document.addEventListener('touchmove',e=>{if(e.touches.length>1)e.preventDefault();},{passive:false});
document.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey)e.preventDefault();},{passive:false});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&['+','=','-','_','0','Add','Subtract'].includes(e.key))e.preventDefault();},{capture:true});
