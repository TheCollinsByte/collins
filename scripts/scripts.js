document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');
  
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  if (defaultTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      if (newTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
      } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
      }
      
      localStorage.setItem('theme', newTheme);
    });
  }

  const typewriter = document.querySelectorAll('.typewriter');
  
  typewriter.forEach(el => {
    const toRotate = JSON.parse(el.getAttribute('data-type'));
    const period = parseInt(el.getAttribute('data-period'), 10) || 2000;
    let loopNum = 0;
    let txt = '';
    let isDeleting = false;
    
    function tick() {
      const i = loopNum % toRotate.length;
      const fullTxt = toRotate[i];
      
      if (isDeleting) {
        txt = fullTxt.substring(0, txt.length - 1);
      } else {
        txt = fullTxt.substring(0, txt.length + 1);
      }
      
      el.innerHTML = '<span class="wrap">' + txt + '</span>';
      
      let delta = 150 - Math.random() * 100;
      if (isDeleting) delta /= 2;
      
      if (!isDeleting && txt === fullTxt) {
        delta = period;
        isDeleting = true;
      } else if (isDeleting && txt === '') {
        isDeleting = false;
        loopNum++;
        delta = 500;
      }
      
      setTimeout(tick, delta);
    }
    
    tick();
  });

  const style = document.createElement('style');
  style.textContent = '.typewriter > .wrap { border-right: 0.1em solid #1688f0; }';
  document.head.appendChild(style);

  document.querySelector('html').classList.remove('no-js');

  document.querySelectorAll('header a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.classList.contains('no-scroll')) return;
      
      e.preventDefault();
      const heading = link.getAttribute('href');
      const target = document.querySelector(heading);
      if (!target) return;
      
      const scrollDistance = target.offsetTop;
      
      window.scrollTo({
        top: scrollDistance,
        behavior: 'smooth'
      });

      if (document.querySelector('header').classList.contains('active')) {
        document.querySelector('header').classList.remove('active');
        document.body.classList.remove('active');
      }
    });
  });

  const toTop = document.getElementById('to-top');
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const leadDown = document.getElementById('lead-down');
  if (leadDown) {
    leadDown.querySelector('span').addEventListener('click', () => {
      const lead = document.getElementById('lead');
      const nextSection = lead.nextElementSibling;
      if (nextSection) {
        window.scrollTo({
          top: nextSection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }

  const timeline = document.getElementById('experience-timeline');
  if (timeline) {
    const userContent = timeline.querySelectorAll(':scope > div');
    
    userContent.forEach(content => {
      content.classList.add('vtimeline-content');
      
      const wrapper = document.createElement('div');
      wrapper.className = 'vtimeline-point';
      wrapper.innerHTML = '<div class="vtimeline-block"></div>';
      content.parentNode.insertBefore(wrapper, content);
      wrapper.appendChild(content);
    });

    timeline.querySelectorAll('.vtimeline-point').forEach(point => {
      const icon = document.createElement('div');
      icon.className = 'vtimeline-icon';
      icon.innerHTML = '<i class="fa fa-map-marker"></i>';
      point.prepend(icon);
    });

    timeline.querySelectorAll('.vtimeline-content').forEach(content => {
      const date = content.getAttribute('data-date');
      if (date) {
        const dateSpan = document.createElement('span');
        dateSpan.className = 'vtimeline-date';
        dateSpan.textContent = date;
        const point = content.closest('.vtimeline-point');
        if (point) point.prepend(dateSpan);
      }
    });
  }

  const mobileMenuOpen = document.getElementById('mobile-menu-open');
  if (mobileMenuOpen) {
    mobileMenuOpen.addEventListener('click', () => {
      document.querySelector('header').classList.add('active');
      document.body.classList.add('active');
    });
  }

  const mobileMenuClose = document.getElementById('mobile-menu-close');
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
      document.querySelector('header').classList.remove('active');
      document.body.classList.remove('active');
    });
  }
});
