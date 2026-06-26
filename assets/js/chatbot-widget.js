/* =========================================================
   UNIVERSITY OF OKARA — Chatbot widget controller
   Depends on chatbot-data.js (window.UO_CHATBOT)
   ========================================================= */
(function(){
  "use strict";
  var launcher = document.querySelector('.chatbot-launcher');
  var panel = document.querySelector('.chatbot-panel');
  var closeBtn = document.querySelector('.chat-close');
  var body = document.querySelector('.chat-body');
  var form = document.querySelector('.chat-input');
  var input = form ? form.querySelector('input') : null;
  var chipsWrap = document.querySelector('.chat-chips');

  if(!launcher || !panel || !body) return;

  function scrollDown(){ body.scrollTop = body.scrollHeight; }

  function addMsg(text, who, linkObj){
    var div = document.createElement('div');
    div.className = 'msg ' + who;
    div.innerHTML = text;
    if(linkObj){
      var a = document.createElement('a');
      a.href = linkObj.href;
      a.textContent = linkObj.text;
      div.appendChild(document.createElement('br'));
      div.appendChild(a);
    }
    body.appendChild(div);
    scrollDown();
  }

  function respond(query){
    var data = window.UO_CHATBOT;
    if(!data) return;
    var hit = data.match(query);
    setTimeout(function(){
      if(hit){ addMsg(hit.reply, 'bot', hit.link); }
      else{ addMsg(data.FALLBACK, 'bot', null); }
    }, 380);
  }

  function buildChips(){
    if(!chipsWrap || !window.UO_CHATBOT) return;
    chipsWrap.innerHTML = '';
    window.UO_CHATBOT.SUGGESTIONS.forEach(function(s){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = s;
      b.addEventListener('click', function(){
        addMsg(s, 'user', null);
        respond(s);
      });
      chipsWrap.appendChild(b);
    });
  }

  function openPanel(){
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden','false');
    input && input.focus();
  }
  function closePanel(){
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden','true');
  }

  launcher.addEventListener('click', function(){
    panel.classList.contains('is-open') ? closePanel() : openPanel();
  });
  closeBtn && closeBtn.addEventListener('click', closePanel);

  form && form.addEventListener('submit', function(e){
    e.preventDefault();
    var val = (input.value || '').trim();
    if(!val) return;
    addMsg(val, 'user', null);
    respond(val);
    input.value = '';
  });

  buildChips();
})();
