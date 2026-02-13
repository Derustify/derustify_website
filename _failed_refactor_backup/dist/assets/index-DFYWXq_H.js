(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}})();class u{constructor(){this.locale="en",this.translations={}}async load(){console.log(`🌐 i18n: Attempting to load ${this.locale}.json...`);try{const e=await fetch(`locales/${this.locale}.json?t=${Date.now()}`,{cache:"no-store",headers:{"Cache-Control":"no-cache",Pragma:"no-cache"}});if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);this.translations=await e.json(),console.log("✅ i18n: Translations loaded successfully:",this.translations),this.apply(),document.body.classList.add("i18n-ready")}catch(e){console.error("❌ i18n: Failed to load translations:",e),console.warn("💡 Tip: If you are seeing a CORS error, you must use a local server (like Live Server) rather than opening the file directly.")}}apply(e=document){if(e.querySelectorAll("[data-i18n]").forEach(i=>{const s=i.getAttribute("data-i18n"),t=this.getNestedValue(this.translations,s);t&&(i.tagName==="INPUT"||i.tagName==="TEXTAREA"?i.placeholder=t:i.innerHTML=t)}),e.querySelectorAll("[data-i18n-alt]").forEach(i=>{const s=i.getAttribute("data-i18n-alt"),t=this.getNestedValue(this.translations,s);t&&(i.alt=t)}),e.querySelectorAll("[data-i18n-title]").forEach(i=>{const s=i.getAttribute("data-i18n-title"),t=this.getNestedValue(this.translations,s);t&&(i.title=t)}),e===document){const i=this.getNestedValue(this.translations,"Global.Meta.Title");i&&(document.title=i);const s=this.getNestedValue(this.translations,"Global.Meta.Description");if(s){const t=document.querySelector('meta[name="description"]');t&&t.setAttribute("content",s)}}}getNestedValue(e,i){return i.split(".").reduce((s,t)=>s?s[t]:null,e)}}const v=new u;class f{constructor(){this.btn=document.querySelector(".mobile-menu-btn"),this.nav=document.querySelector(".nav-links"),this.cta=document.querySelector(".nav-cta"),this.isOpen=!1,this.btn&&this.init()}init(){this.btn.addEventListener("click",()=>this.toggle()),document.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",()=>this.close())})}toggle(){this.isOpen=!this.isOpen,this.isOpen?(this.nav.style.display="flex",this.nav.style.flexDirection="column",this.nav.style.position="absolute",this.nav.style.top="100%",this.nav.style.left="0",this.nav.style.right="0",this.nav.style.background="var(--bg-elevated)",this.nav.style.padding="1rem",this.nav.style.borderRadius="0 0 var(--radius-lg) var(--radius-lg)",this.nav.style.boxShadow="var(--shadow-lg)",this.cta&&(this.cta.style.display="flex",this.cta.style.marginTop="1rem")):this.close()}close(){this.isOpen=!1,this.nav.style="",this.cta&&(this.cta.style="")}}function g(){document.querySelectorAll('a[href^="#"]').forEach(o=>{o.addEventListener("click",function(e){const i=this.getAttribute("href");if(i==="#"||!i.startsWith("#"))return;e.preventDefault();const s=document.querySelector(i);if(s){const t=document.querySelector(".header"),a=t?t.offsetHeight:0,n=s.getBoundingClientRect().top+window.pageYOffset-a-20;window.scrollTo({top:n,behavior:"smooth"})}})})}function m(){const o=document.querySelector(".header");o&&window.addEventListener("scroll",()=>{o.classList.toggle("scrolled",window.scrollY>20)})}const r={render:()=>`
    <header class="header">
      <div class="header-inner">
        <a href="#" class="logo">
          <img src="assets/icons/logo_transparent.webp" alt="Derustify Logo" data-i18n-alt="Global.LogoAlt">
          <span data-i18n="Global.Brand">Derustify</span>
        </a>
        
        <nav class="nav">
          <ul class="nav-links">
            <li><a href="#features" class="nav-link" data-i18n="Navigation.Features">Why Derustify?</a></li>
            <li><a href="#showcase" class="nav-link" data-i18n="Navigation.Showcase">Gallery</a></li>
            <li><a href="#faq" class="nav-link" data-i18n="Navigation.FAQ">Common Questions</a></li>
          </ul>
          
          <div class="nav-cta">
            <a href="#download" class="btn btn-primary" data-i18n="Navigation.Download">Get Started</a>
          </div>
          
          <button class="mobile-menu-btn" aria-label="Toggle menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  `,init:()=>{new f,m()}};class p{constructor(e){this.container=e,this.handle=e.querySelector(".comparison-handle"),this.beforeImg=e.querySelector(".comparison-img-before"),this.beforeLabel=e.querySelector(".comparison-label-before"),this.afterLabel=e.querySelector(".comparison-label-after"),this.position=50,this.isDragging=!1,this.init()}init(){this.updatePosition(50),this.container.addEventListener("mousedown",e=>this.startDrag(e)),document.addEventListener("mousemove",e=>this.onDrag(e)),document.addEventListener("mouseup",()=>this.endDrag()),this.container.addEventListener("touchstart",e=>this.startDrag(e),{passive:!0}),document.addEventListener("touchmove",e=>this.onDrag(e),{passive:!0}),document.addEventListener("touchend",()=>this.endDrag()),this.container.setAttribute("tabindex","0"),this.container.setAttribute("role","slider"),this.container.setAttribute("aria-valuenow","50"),this.container.setAttribute("aria-valuemin","0"),this.container.setAttribute("aria-valuemax","100"),this.container.setAttribute("aria-label","Before and after comparison"),this.container.addEventListener("keydown",e=>this.onKeydown(e))}startDrag(e){this.isDragging=!0,this.container.style.cursor="grabbing",this.onDrag(e)}endDrag(){this.isDragging=!1,this.container.style.cursor="ew-resize"}onDrag(e){if(!this.isDragging)return;const i=this.container.getBoundingClientRect(),t=(e.touches?e.touches[0].clientX:e.clientX)-i.left,a=Math.max(0,Math.min(100,t/i.width*100));this.updatePosition(a)}onKeydown(e){e.key==="ArrowLeft"?(e.preventDefault(),this.updatePosition(Math.max(0,this.position-5))):e.key==="ArrowRight"&&(e.preventDefault(),this.updatePosition(Math.min(100,this.position+5)))}updatePosition(e){this.position=e,this.container.style.setProperty("--slider-pos",`${e}%`),this.container.style.setProperty("--clip-pos",`${100-e}%`),this.container.setAttribute("aria-valuenow",Math.round(e)),this.beforeLabel&&this.beforeLabel.classList.toggle("hidden",e<=10),this.afterLabel&&this.afterLabel.classList.toggle("hidden",e>=90)}}class y{constructor(e){this.container=e,this.slides=e.querySelectorAll(".hero-slide"),this.dots=e.querySelectorAll(".showcase-dot"),this.currentIndex=0,this.interval=null,this.sliders=[],this.init()}init(){this.slides.forEach((e,i)=>{const s=e.querySelector(".comparison-slider");s&&(this.sliders[i]=new p(s))}),this.dots.forEach((e,i)=>{e.addEventListener("click",()=>{this.goTo(i),this.startAutoCycle()})}),this.startAutoCycle()}goTo(e){e!==this.currentIndex&&(this.slides[this.currentIndex].classList.remove("active"),this.dots[this.currentIndex].classList.remove("active"),this.currentIndex=e,this.slides[this.currentIndex].classList.add("active"),this.dots[this.currentIndex].classList.add("active"),this.sliders[this.currentIndex]&&this.sliders[this.currentIndex].updatePosition(50))}next(){const e=(this.currentIndex+1)%this.slides.length;this.goTo(e)}startAutoCycle(){this.interval&&clearInterval(this.interval),this.interval=setInterval(()=>this.next(),6e3)}}const l={render:()=>`
    <section class="hero section">
      <div class="container hero-inner">
        <div class="hero-content fade-in">
          <div class="hero-badge" data-i18n="Hero.Badge">
            No Subscriptions · No Cloud · Just Yours
          </div>
          
          <h1 class="heading-xl hero-title" data-i18n="Hero.Title">
            Strip away the rust.<br>Reveal the memory.
          </h1>
          
          <p class="hero-description" data-i18n="Hero.Description">
            Stop paying monthly fees to big tech just to see your own photos. Derustify is the professional-grade photo restorer that runs 100% on your hardware. One payment. Yours forever.
          </p>
          
          <div class="hero-buttons">
            <a href="#" class="btn btn-primary">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5v-17c0-.84 1.01-1.28 1.62-.7l12.01 8.5c.5.35.5 1.05 0 1.4l-12 8.5c-.62.58-1.63.14-1.63-.7z"/>
              </svg>
              <span data-i18n="Hero.Buttons.GooglePlay">Android App</span>
            </a>
            <a href="#" class="btn btn-secondary">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                <path d="M8 21h8"></path>
                <path d="M12 17v4"></path>
              </svg>
              <span data-i18n="Hero.Buttons.Windows">Windows</span>
            </a>
          </div>
        </div>
        
        <div class="hero-visual fade-in">
          <div class="hero-showcase" id="hero-showcase">
            <!-- Slides are rendered here -->
            <div class="hero-slide active">
              <div class="comparison-slider" data-hero-slider>
                <img class="comparison-img comparison-img-after" src="assets/images/plain_Audrey Hepburn.png" alt="Restored photo of Audrey Hepburn" data-i18n-alt="Hero.Slides.Audrey.Alt">
                <img class="comparison-img comparison-img-before" src="assets/images/Audrey Hepburn.jpg" alt="Original photo of Audrey Hepburn" data-i18n-alt="Hero.Slides.Audrey.AltBefore">
                <div class="comparison-handle"><div class="comparison-grip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15,18 9,12 15,6"></polyline></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9,18 15,12 9,6"></polyline></svg></div></div>
                <div class="comparison-label comparison-label-before" data-i18n="Hero.Comparison.Original">Aged Photo</div>
                <div class="comparison-label comparison-label-after" data-i18n="Hero.Comparison.Restored">Derustified</div>
              </div>
            </div>

            <div class="hero-slide">
              <div class="comparison-slider" data-hero-slider>
                <img class="comparison-img comparison-img-after" src="assets/images/color_New York Riverfront December 15, 1931.png" alt="Restored photo of New York Riverfront 1931" data-i18n-alt="Hero.Slides.Riverfront.Alt">
                <img class="comparison-img comparison-img-before" src="assets/images/New York Riverfront December 15, 1931.jpg" alt="Original photo of New York Riverfront 1931" data-i18n-alt="Hero.Slides.Riverfront.AltBefore">
                <div class="comparison-handle"><div class="comparison-grip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15,18 9,12 15,6"></polyline></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9,18 15,12 9,6"></polyline></svg></div></div>
                <div class="comparison-label comparison-label-before" data-i18n="Hero.Comparison.Original">Aged Photo</div>
                <div class="comparison-label comparison-label-after" data-i18n="Hero.Comparison.Restored">Derustified</div>
              </div>
            </div>

            <div class="hero-slide">
              <div class="comparison-slider" data-hero-slider>
                <img class="comparison-img comparison-img-after" src="assets/images/plain_old-man-thinking_1122-444.png" alt="Restored photo of an old man thinking" data-i18n-alt="Hero.Slides.OldMan.Alt">
                <img class="comparison-img comparison-img-before" src="assets/images/old-man-thinking_1122-444.jpg" alt="Original photo of an old man thinking" data-i18n-alt="Hero.Slides.OldMan.AltBefore">
                <div class="comparison-handle"><div class="comparison-grip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15,18 9,12 15,6"></polyline></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9,18 15,12 9,6"></polyline></svg></div></div>
                <div class="comparison-label comparison-label-before" data-i18n="Hero.Comparison.Original">Aged Photo</div>
                <div class="comparison-label comparison-label-after" data-i18n="Hero.Comparison.Restored">Derustified</div>
              </div>
            </div>

            <div class="hero-slide">
              <div class="comparison-slider" data-hero-slider>
                <img class="comparison-img comparison-img-after" src="assets/images/color_children_depression.png" alt="Restored photo of children during the depression" data-i18n-alt="Hero.Slides.Children.Alt">
                <img class="comparison-img comparison-img-before" src="assets/images/children_depression.png" alt="Original photo of children during the depression" data-i18n-alt="Hero.Slides.Children.AltBefore">
                <div class="comparison-handle"><div class="comparison-grip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15,18 9,12 15,6"></polyline></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9,18 15,12 9,6"></polyline></svg></div></div>
                <div class="comparison-label comparison-label-before" data-i18n="Hero.Comparison.Original">Aged Photo</div>
                <div class="comparison-label comparison-label-after" data-i18n="Hero.Comparison.Restored">Derustified</div>
              </div>
            </div>

            <div class="showcase-dots">
              <div class="showcase-dot active" data-slide="0"></div>
              <div class="showcase-dot" data-slide="1"></div>
              <div class="showcase-dot" data-slide="2"></div>
              <div class="showcase-dot" data-slide="3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,init:()=>{const o=document.getElementById("hero-showcase");o&&new y(o)}},w={render:()=>`
    <section class="features section" id="features">
      <div class="container">
        <div class="section-header fade-in">
          <h2 class="heading-lg" data-i18n="FeatureSection.Header.Title">Built for your memories, not for profit.</h2>
          <p data-i18n="FeatureSection.Header.Subtitle">Most apps rent you your own photos. We give you the tools to own them.</p>
        </div>
        
        <div class="features-grid stagger-children">
          <div class="feature-card fade-in">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 3v18"></path>
                <path d="M3 12h18"></path>
                <circle cx="12" cy="12" r="9"></circle>
              </svg>
            </div>
            <h3 data-i18n="FeatureSection.Cards.Denoising.Title">Wipe away the grain</h3>
            <p data-i18n="FeatureSection.Cards.Denoising.Description">Remove decades of digital 'rust' and 'sandiness' instantly. We make blurry faces crisp again so you can see the person, not the pixels.</p>
          </div>
          
          <div class="feature-card fade-in">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2"></path>
                <path d="M12 21v2"></path>
                <path d="M4.22 4.22l1.42 1.42"></path>
                <path d="M18.36 18.36l1.42 1.42"></path>
                <path d="M1 12h2"></path>
                <path d="M21 12h2"></path>
                <path d="M4.22 19.78l1.42-1.42"></path>
                <path d="M18.36 5.64l1.42-1.42"></path>
              </svg>
            </div>
            <h3 data-i18n="FeatureSection.Cards.Colorization.Title">Vibrant, lifelike color</h3>
            <p data-i18n="FeatureSection.Cards.Colorization.Description">Breathe life back into black-and-white family history. Our AI understands your photos and adds colors that look real, not painted.</p>
          </div>
          
          <div class="feature-card fade-in">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <h3 data-i18n="FeatureSection.Cards.Batch.Title">Revive your entire album</h3>
            <p data-i18n="FeatureSection.Cards.Batch.Description">Don't do it one-by-one. Drop in a folder of 500 photos and let the app work through the night. Your computer does the work, you get the results.</p>
          </div>
          
          <div class="feature-card fade-in">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 data-i18n="FeatureSection.Cards.Privacy.Title">Absolute Privacy</h3>
            <p data-i18n="FeatureSection.Cards.Privacy.Description">Your family photos never leave your device. We don't have servers. We don't have accounts. Your private moments stay exactly where they belong: with you.</p>
          </div>
          
          <div class="feature-card fade-in">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 data-i18n="FeatureSection.Cards.Performance.Title">Native Speed</h3>
            <p data-i18n="FeatureSection.Cards.Performance.Description">Built with high-performance technology that won't slow you down. No long uploads, no waiting lists. Just instant results on your screen.</p>
          </div>
          
          <div class="feature-card fade-in">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <h3 data-i18n="FeatureSection.Cards.Safety.Title">Your originals are safe</h3>
            <p data-i18n="FeatureSection.Cards.Safety.Description">We never touch your original files. Compare, tweak, and experiment freely knowing that your digital heirlooms are perfectly preserved.</p>
          </div>
        </div>
      </div>
    </section>
  `,init:()=>{}},c={render:()=>`
    <section class="section" id="showcase">
      <div class="container">
        <div class="section-header fade-in">
          <h2 class="heading-lg" data-i18n="ShowcaseSection.Header.Title">See the magic unfold</h2>
          <p data-i18n="ShowcaseSection.Header.Subtitle">Drag the slider to see how we peel back the years from these historic moments.</p>
        </div>
        
        <div class="showcase-grid stagger-children">
          <div class="showcase-item fade-in">
            <div class="comparison-slider" data-slider>
              <img class="comparison-img comparison-img-after" src="assets/images/color_Louis Armstrong practicing in his dressing room, ca 1946.png" alt="Restored photo of Louis Armstrong" data-i18n-alt="ShowcaseSection.Items.Louis.Alt">
              <img class="comparison-img comparison-img-before" src="assets/images/Louis Armstrong practicing in his dressing room, ca 1946.jpg" alt="Original photo of Louis Armstrong" data-i18n-alt="ShowcaseSection.Items.Louis.AltBefore">
              <div class="comparison-handle">
                <div class="comparison-grip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15,18 9,12 15,6"></polyline></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9,18 15,12 9,6"></polyline></svg>
                </div>
              </div>
              <div class="comparison-label comparison-label-before" data-i18n="Hero.Comparison.Original">Aged Photo</div>
              <div class="comparison-label comparison-label-after" data-i18n="Hero.Comparison.Restored">Derustified</div>
            </div>
            <div class="showcase-caption">
              <h3 data-i18n="ShowcaseSection.Items.Louis.Title">Legendary Clarity</h3>
              <p data-i18n="ShowcaseSection.Items.Louis.Caption">Louis Armstrong's 1946 dressing room, restored for today.</p>
            </div>
          </div>
          
          <div class="showcase-item fade-in">
            <div class="comparison-slider" data-slider>
              <img class="comparison-img comparison-img-after" src="assets/images/color_Broadway at the United States Hotel Saratoga Springs, N.Y. ca 1900-1915.png" alt="Restored photo of Broadway, N.Y." data-i18n-alt="ShowcaseSection.Items.Broadway.Alt">
              <img class="comparison-img comparison-img-before" src="assets/images/Broadway at the United States Hotel Saratoga Springs, N.Y. ca 1900-1915.jpg" alt="Original photo of Broadway, N.Y." data-i18n-alt="ShowcaseSection.Items.Broadway.AltBefore">
              <div class="comparison-handle">
                <div class="comparison-grip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15,18 9,12 15,6"></polyline></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9,18 15,12 9,6"></polyline></svg>
                </div>
              </div>
              <div class="comparison-label comparison-label-before" data-i18n="Hero.Comparison.Original">Aged Photo</div>
              <div class="comparison-label comparison-label-after" data-i18n="Hero.Comparison.Restored">Derustified</div>
            </div>
            <div class="showcase-caption">
              <h3 data-i18n="ShowcaseSection.Items.Broadway.Title">A Walk through Time</h3>
              <p data-i18n="ShowcaseSection.Items.Broadway.Caption">Bringing 1931 New York back in vivid, accurate color.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,init:()=>{document.querySelectorAll(".comparison-slider:not([data-hero-slider])").forEach(o=>{new p(o)})}};class b{constructor(e){this.container=e,this.items=e.querySelectorAll(".faq-item"),this.init()}init(){this.items.forEach(e=>{e.querySelector(".faq-question").addEventListener("click",()=>{const s=e.classList.contains("open");this.items.forEach(t=>t.classList.remove("open")),s||e.classList.add("open")})})}}const d={render:()=>`
    <section class="section" id="faq">
      <div class="container">
        <div class="section-header fade-in">
          <h2 class="heading-lg" data-i18n="FAQSection.Header.Title">The honest truth</h2>
          <p data-i18n="FAQSection.Header.Subtitle">Everything you need to know about how we're different from the giants.</p>
        </div>
        
        <div class="faq-list fade-in">
          <div class="faq-item">
            <button class="faq-question">
              <span data-i18n="FAQSection.Questions.Q1.Q">Why is there no subscription?</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <div class="faq-answer">
              <p data-i18n="FAQSection.Questions.Q1.A">Because you shouldn't have to 'rent' software to look at your own photos. Modern companies use subscriptions to cover expensive cloud processing. Since Derustify runs on YOUR computer or phone, we have no server costs to pass on to you. You buy it, you own it. Period.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <button class="faq-question">
              <span data-i18n="FAQSection.Questions.Q2.Q">Is it really private?</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <div class="faq-answer">
              <p data-i18n="FAQSection.Questions.Q2.A">Yes. 100%. We physically cannot see your photos. All the AI magic happens inside your device's memory. No internet connection is required to restore images.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <button class="faq-question">
              <span data-i18n="FAQSection.Questions.Q3.Q">Will it work on my device?</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <div class="faq-answer">
              <p data-i18n="FAQSection.Questions.Q3.A">Derustify is built for modern Windows (10/11) and Android (8.0+). If you have a decent phone or a computer with a graphics card, it will be incredibly fast. If your device is older, it still works—it just takes a few extra seconds to 'clean' each photo.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <button class="faq-question">
              <span data-i18n="FAQSection.Questions.Q4.Q">What's the catch with the Free version?</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <div class="faq-answer">
              <p data-i18n="FAQSection.Questions.Q4.A">The free version has all the power of the Pro version. We just add a small watermark to the corner of your exported images. Upgrading to Pro removes the watermark and unlocks batch processing for those large boxes of family photos in the attic.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <button class="faq-question">
              <span data-i18n="FAQSection.Questions.Q5.Q">Can I use it as a gift?</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <div class="faq-answer">
              <p data-i18n="FAQSection.Questions.Q5.A">Absolutely. It's the perfect gift for the family historian. Purchase it once, install it on the family PC, and spend an afternoon rescuing the family archives together.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question">
              <span data-i18n="FAQSection.Questions.Q6.Q">Are the recolored images historically accurate?</span>
              <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <div class="faq-answer">
              <p data-i18n="FAQSection.Questions.Q6.A">No, the recolored images may have historical inaccuracies. The AI models are trained to restore color or to upscale images based on large samples of training data and often succeeds in correct output. Inaccurecies or inadequate coloring of images may occur, and Derustify does not gurarantee perfect results for all images.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,init:()=>{const o=document.querySelector(".faq-list");o&&new b(o)}},S={render:()=>`
    <section class="cta section" id="download">
      <div class="container">
        <h2 class="heading-lg fade-in" data-i18n="CTASection.Title">Don't let your memories fade away.</h2>
        <p class="fade-in" data-i18n="CTASection.Subtitle">Download Derustify today. Own the technology. Keep the memories.</p>
        <div class="cta-buttons fade-in">
          <a href="#" class="btn btn-secondary">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.84 1.01-1.28 1.62-.7l12.01 8.5c.5.35.5 1.05 0 1.4l-12 8.5c-.62.58-1.63.14-1.63-.7z"/>
            </svg>
            <span data-i18n="CTASection.Buttons.GooglePlay">Download for Android</span>
          </a>
          <a href="#" class="btn btn-secondary">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2"></rect>
              <path d="M8 21h8"></path>
              <path d="M12 17v4"></path>
            </svg>
            <span data-i18n="CTASection.Buttons.Windows">Download for Windows</span>
          </a>
        </div>
      </div>
    </section>
  `,init:()=>{}},A={render:()=>`
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-links">
          <a href="privacy.html" class="footer-link" data-i18n="Footer.Links.Privacy">Privacy Policy</a>
          <a href="terms.html" class="footer-link" data-i18n="Footer.Links.Terms">Terms of Service</a>
          <a href="mailto:contact@derustify.com" class="footer-link" data-i18n="Footer.Links.Contact">Contact Support</a>
        </div>
        <p class="footer-copy" data-i18n="Footer.Copy">© 2026 Derustify. A product of passion and privacy.</p>
      </div>
    </footer>
  `,init:()=>{}};class x{constructor(){this.elements=document.querySelectorAll(".fade-in"),"IntersectionObserver"in window?this.init():this.elements.forEach(e=>e.classList.add("visible"))}init(){const e={root:null,rootMargin:"0px 0px -50px 0px",threshold:.1},i=new IntersectionObserver(s=>{s.forEach(t=>{t.isIntersecting&&(t.target.classList.add("visible"),i.unobserve(t.target))})},e);this.elements.forEach(s=>i.observe(s))}}const h={render:()=>`
      <div id="app-content">
        ${r.render()}
        <main>
          ${l.render()}
          ${w.render()}
          ${c.render()}
          ${d.render()}
          ${S.render()}
        </main>
        ${A.render()}
      </div>
    `,init:async()=>{await v.load(),r.init(),l.init(),c.init(),d.init(),new x,g(),console.log("✨ App: Modular Refactor initialized successfully.")}},k=async()=>{const o=document.querySelector("body");o.innerHTML=h.render(),await h.init()};k();
