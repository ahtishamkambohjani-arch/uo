/* =========================================================
   UNIVERSITY OF OKARA — site-wide interactivity (vanilla JS)
   ========================================================= */
(function(){
  "use strict";

  /* ---------- Header scroll shadow + pin (collapses topbar cleanly) ---------- */
  var header = document.querySelector('.site-header');
  var headerWrap = document.querySelector('.header-wrap');
  function onScroll(){
    if(!header) return;
    var scrolled = window.scrollY > 8;
    header.classList.toggle('is-scrolled', scrolled);
    headerWrap && headerWrap.classList.toggle('is-pinned', window.scrollY > 30);
    var backTop = document.querySelector('.back-top');
    if(backTop){ backTop.classList.toggle('is-visible', window.scrollY > 480); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- Mobile drawer ---------- */
  var menuToggle = document.querySelector('.menu-toggle');
  var drawer = document.querySelector('.mobile-drawer');
  var backdrop = document.querySelector('.drawer-backdrop');
  var drawerClose = document.querySelector('.drawer-close');
  function openDrawer(){
    drawer && drawer.classList.add('is-open');
    backdrop && backdrop.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeDrawer(){
    drawer && drawer.classList.remove('is-open');
    backdrop && backdrop.classList.remove('is-open');
    document.documentElement.style.overflow = '';
  }
  menuToggle && menuToggle.addEventListener('click', openDrawer);
  drawerClose && drawerClose.addEventListener('click', closeDrawer);
  backdrop && backdrop.addEventListener('click', closeDrawer);

  /* ---------- Desktop dropdown: click support for touch/keyboard ---------- */
  document.querySelectorAll('.main-nav > ul > li').forEach(function(li){
    var link = li.querySelector('.nav-link');
    var panel = li.querySelector('.dropdown, .mega');
    if(!panel || !link) return;
    link.addEventListener('click', function(e){
      if(window.matchMedia('(hover: none)').matches){
        e.preventDefault();
        var wasOpen = li.classList.contains('is-open');
        document.querySelectorAll('.main-nav > ul > li').forEach(function(o){ o.classList.remove('is-open'); });
        if(!wasOpen) li.classList.add('is-open');
      }
    });
  });
  document.addEventListener('click', function(e){
    if(!e.target.closest('.main-nav')){
      document.querySelectorAll('.main-nav > ul > li').forEach(function(o){ o.classList.remove('is-open'); });
    }
    if(!e.target.closest('.login-quick')){
      document.querySelectorAll('.login-quick').forEach(function(o){ o.classList.remove('is-open'); });
    }
  });

  /* ---------- Login quick dropdown (sits outside .main-nav) ---------- */
  var loginQuick = document.querySelector('.login-quick');
  if(loginQuick){
    var loginBtn = loginQuick.querySelector('.login-btn');
    loginBtn && loginBtn.addEventListener('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      loginQuick.classList.toggle('is-open');
    });
  }

  /* ---------- Hero carousel ---------- */
  var slides = document.querySelectorAll('.hero-slide');
  if(slides.length){
    var dotsWrap = document.querySelector('.hero-dots');
    var idx = 0, timer;
    function go(n){
      slides[idx].classList.remove('is-active');
      if(dotsWrap) dotsWrap.children[idx].classList.remove('is-active');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('is-active');
      if(dotsWrap) dotsWrap.children[idx].classList.add('is-active');
    }
    function next(){ go(idx+1); }
    function prev(){ go(idx-1); }
    function restart(){ clearInterval(timer); timer = setInterval(next, 3000); }
    if(dotsWrap){
      slides.forEach(function(_, i){
        var b = document.createElement('button');
        if(i===0) b.classList.add('is-active');
        b.setAttribute('aria-label','Slide ' + (i+1));
        b.addEventListener('click', function(){ go(i); restart(); });
        dotsWrap.appendChild(b);
      });
    }
    var nextBtn = document.querySelector('[data-hero="next"]');
    var prevBtn = document.querySelector('[data-hero="prev"]');
    nextBtn && nextBtn.addEventListener('click', function(){ next(); restart(); });
    prevBtn && prevBtn.addEventListener('click', function(){ prev(); restart(); });
    restart();
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if(counters.length && 'IntersectionObserver' in window){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1400, start = null;
        function step(ts){
          if(!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var val = Math.floor(target * p);
          el.textContent = val.toLocaleString() + suffix;
          if(p < 1){ requestAnimationFrame(step); }
          else{ el.textContent = target.toLocaleString() + suffix; }
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, {threshold:.4});
    counters.forEach(function(c){ obs.observe(c); });
  }

  /* ---------- Generic Tabs ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function(group){
    var btns = group.querySelectorAll('.tab-btn');
    var groupName = group.getAttribute('data-tabs');
    var panels = document.querySelectorAll('[data-tab-panel="' + groupName + '"]');
    btns.forEach(function(btn){
      btn.addEventListener('click', function(){
        var key = btn.getAttribute('data-tab');
        btns.forEach(function(b){ b.classList.toggle('is-active', b===btn); });
        panels.forEach(function(p){
          var show = key === 'all' || p.getAttribute('data-cat') === key || p.getAttribute('data-key') === key;
          p.style.display = show ? '' : 'none';
        });
        if(history.pushState){ history.pushState(null,'', '#' + key); }
      });
    });
  });

  /* ---------- Accordion (Faculties) ---------- */
  document.querySelectorAll('.fac-trigger').forEach(function(trigger){
    trigger.addEventListener('click', function(){
      var item = trigger.closest('.fac-item');
      var panel = item.querySelector('.fac-panel');
      var isOpen = item.classList.contains('is-open');
      item.classList.toggle('is-open', !isOpen);
      panel.style.maxHeight = isOpen ? '0px' : panel.scrollHeight + 'px';
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.closest('.faq-item');
      var ans = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('is-open');
      item.classList.toggle('is-open', !isOpen);
      ans.style.maxHeight = isOpen ? '0px' : ans.scrollHeight + 'px';
    });
  });

  /* ---------- Video modal ---------- */
  var modal = document.querySelector('.modal-backdrop');
  document.querySelectorAll('[data-video]').forEach(function(card){
    card.addEventListener('click', function(){
      if(!modal) return;
      var title = card.getAttribute('data-video');
      var titleEl = modal.querySelector('[data-modal-title]');
      if(titleEl) titleEl.textContent = title;
      modal.classList.add('is-open');
    });
  });
  modal && modal.addEventListener('click', function(e){
    if(e.target === modal || e.target.closest('.modal-close')){ modal.classList.remove('is-open'); }
  });

  /* ---------- Back to top ---------- */
  var backTopBtn = document.querySelector('.back-top');
  backTopBtn && backTopBtn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });

  /* ---------- Toast ---------- */
  window.showToast = function(msg){
    var toast = document.querySelector('.toast');
    if(!toast) return;
    toast.querySelector('span').textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(function(){ toast.classList.remove('is-visible'); }, 3200);
  };

  /* ---------- Demo form intercept (frontend-only, no backend) ---------- */
  document.querySelectorAll('form[data-demo-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(typeof form.reportValidity === 'function' && !form.reportValidity()) return;
      var label = form.getAttribute('data-demo-form');
      window.showToast(label || 'Submitted — this is a frontend demo, connect a backend to go live.');
      form.reset();
    });
  });

  /* ---------- Role tabs (login page) ---------- */
  document.querySelectorAll('.role-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      var role = tab.getAttribute('data-role');
      document.querySelectorAll('.role-tab').forEach(function(t){ t.classList.toggle('is-active', t===tab); });
      document.querySelectorAll('.role-panel').forEach(function(p){
        p.classList.toggle('is-active', p.getAttribute('data-role-panel') === role);
      });
    });
  });

  /* ---------- Quick-links filter on hash load ---------- */
  if(location.hash){
    var key = location.hash.replace('#','');
    var btn = document.querySelector('.tab-btn[data-tab="' + key + '"]');
    if(btn) btn.click();
  }

  /* ---------- Deep-link into faculty/department accordion ---------- */
  if(location.hash && document.querySelector('.fac-accordion')){
    var targetId = location.hash.replace('#','');
    var targetEl = document.getElementById(targetId);
    if(targetEl){
      var facItem = targetEl.closest('.fac-item');
      if(facItem){
        facItem.classList.add('is-open');
        var panel = facItem.querySelector('.fac-panel');
        if(panel) panel.style.maxHeight = panel.scrollHeight + 'px';
        setTimeout(function(){ targetEl.scrollIntoView({behavior:'smooth', block:'center'}); }, 250);
      }
    }
  }

})();
