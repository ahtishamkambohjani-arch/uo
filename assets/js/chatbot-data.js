/* =========================================================
   UNIVERSITY OF OKARA — Rule-based FAQ Chatbot
   Pure frontend keyword matching. No backend / no API calls.
   Replace BASE_PATH-relative links below if you move pages.
   ========================================================= */
(function(){
  "use strict";

  var FAQ = [
    {
      keys:["admission","admissions","apply","application","how to apply"],
      reply:"Admissions open for Undergraduate, Postgraduate and Skill Training programs each Fall &amp; Spring. You can see open programs and apply online here:",
      link:{href:"admissions.html", text:"Go to Admissions →"}
    },
    {
      keys:["fee","fees","tuition","cost","dues","challan"],
      reply:"Fee structures vary by program and faculty. The Admissions Office publishes the current fee schedule alongside each program listing.",
      link:{href:"admissions.html#apply-online", text:"View Admissions →"}
    },
    {
      keys:["merit","merit list","cutoff","aggregate"],
      reply:"Merit lists are published on the Admissions page after each entry test cycle.",
      link:{href:"admissions.html#merit-list", text:"Check Merit List →"}
    },
    {
      keys:["faculty","faculties","department","departments","program","programs offered","subjects"],
      reply:"University of Okara has 7 faculties spread across 60+ departments — from Computing and Sciences to Life Sciences and Education.",
      link:{href:"faculties.html", text:"Browse Faculties →"}
    },
    {
      keys:["computer science","software engineering","data science","it department","computing"],
      reply:"Computer Science, Software Engineering, Information Technology and Data Science all sit within the Faculty of Computing.",
      link:{href:"faculties.html#faculty-of-computing", text:"View Faculty of Computing →"}
    },
    {
      keys:["vc","vice chancellor","chancellor"],
      reply:"You can read a welcome note from the Vice Chancellor on our About page.",
      link:{href:"about.html#vc-message", text:"Read VC Message →"}
    },
    {
      keys:["about","history","established","founded","mission","vision"],
      reply:"University of Okara was established in 2016 at Renala Khurd, Okara, Punjab. Our About page covers the full story, mission and vision.",
      link:{href:"about.html", text:"About the University →"}
    },
    {
      keys:["transport","bus","route","shuttle"],
      reply:"University transport covers Okara city and nearby towns with scheduled pickup points. Full route timing is on the Transport page.",
      link:{href:"transport.html", text:"View Transport Routes →"}
    },
    {
      keys:["hostel","accommodation","residence","dorm"],
      reply:"On-campus hostel facilities are available for outstation students, subject to availability. Contact Student Affairs for current allocation.",
      link:{href:"contact.html", text:"Contact Student Affairs →"}
    },
    {
      keys:["research","oric","publication","journal"],
      reply:"Our faculties run active research programs across sciences, agriculture, social sciences and computing.",
      link:{href:"research.html", text:"Explore Research →"}
    },
    {
      keys:["qec","quality","accreditation"],
      reply:"The Quality Enhancement Cell (QEC) oversees academic quality assurance and accreditation support across departments.",
      link:{href:"qec.html", text:"Visit QEC →"}
    },
    {
      keys:["contact","phone","email","address","location","where is","reach"],
      reply:"University of Okara — 2 KM Multan Road, Renala Khurd Bypass, Okara, Punjab. Phone: 044-2636060 · Email: info@uo.edu.pk",
      link:{href:"contact.html", text:"Full Contact Details →"}
    },
    {
      keys:["login","portal","student portal","sign in","lms"],
      reply:"Students, parents, teachers, admin staff and the VC office each have a dedicated login tab.",
      link:{href:"login.html", text:"Go to Login →"}
    },
    {
      keys:["news","event","events","achievement","achievements"],
      reply:"All the latest announcements, events and achievements are collected on one page with filters.",
      link:{href:"news.html", text:"See News & Events →"}
    },
    {
      keys:["scholarship","financial aid","need based"],
      reply:"Need-based and merit scholarships are coordinated through the Admissions Office — ask there for the current cycle.",
      link:{href:"admissions.html", text:"Admissions Office →"}
    },
    {
      keys:["hi","hello","hey","salam","assalam"],
      reply:"Hello! 👋 I can help with admissions, faculties, transport, hostels or contact details. What would you like to know?",
      link:null
    },
    {
      keys:["thanks","thank you","shukriya"],
      reply:"You're welcome! Feel free to ask anything else about University of Okara.",
      link:null
    }
  ];

  var FALLBACK = "I'm a simple FAQ assistant for this demo site, so I might not have that answer yet. Try asking about admissions, faculties, fees, transport, hostels or contact details — or use a quick suggestion below.";
  var SUGGESTIONS = ["Admissions process","Faculties & departments","Transport routes","Contact details"];

  function match(text){
    var t = text.toLowerCase();
    for(var i=0;i<FAQ.length;i++){
      var item = FAQ[i];
      for(var j=0;j<item.keys.length;j++){
        if(t.indexOf(item.keys[j]) !== -1){ return item; }
      }
    }
    return null;
  }

  window.UO_CHATBOT = { match: match, FALLBACK: FALLBACK, SUGGESTIONS: SUGGESTIONS };
})();
