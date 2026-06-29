// ============ NAVBAR SCROLL ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(13,13,26,0.98)';
  } else {
    navbar.style.background = 'rgba(13,13,26,0.85)';
  }
});

// ============ HAMBURGER ============
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// ============ REVEAL ON SCROLL ============
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ============ SKILL BAR ANIMATION ============
const skillBars = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width = target.dataset.w;
      setTimeout(() => {
        target.style.width = width + '%';
      }, 200);
      barObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

// ============ Image Modal ============
function openImage(img){
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  modal.style.display = "flex";
  modalImg.src = img.src;
}

function closeImage(){
  document.getElementById("imageModal").style.display = "none";
}

// ============ COUNTER ANIMATION ============
function animateCounter(el, target, suffix) {
  let current = 0;
  const duration = 1500;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
  }, stepTime);
}

const statCards = document.querySelectorAll('.stat-card h2');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const numMatch = text.match(/[\d.]+/);
      const suffix = text.replace(/[\d.]+/, '');
      if (numMatch) {
        const num = parseFloat(numMatch[0]);
        animateCounter(el, num, suffix);
      }
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statCards.forEach(el => statObserver.observe(el));

// ============ CONTACT FORM SUBMISSION ============

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(e){

e.preventDefault();

const data = new FormData(form);

const response = await fetch(form.action,{
method:"POST",
body:data,
headers:{
'Accept':'application/json'
}
});

if(response.ok){

document.getElementById("formSuccess").style.display="block";

form.reset();

}else{

alert("Something went wrong. Please try again.");

}

});

// ============ ACTIVE NAV ============
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  
  // Custom logic to handle both clean URLs and regular paths
  const cleanHref = href.replace(/^\//, '').replace(/\.html$/, '');
  const cleanCurrent = currentPath.replace(/\.html$/, '');
  
  const isBlogMatch = (cleanCurrent.includes('blog') && cleanHref === 'blog');
  const isDirectMatch = (cleanHref === cleanCurrent || href === currentPath);
  
  if (isDirectMatch || isBlogMatch) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

const slider = document.querySelector(".testi-slider");
const dots = document.querySelectorAll(".dot");

if (slider && dots.length > 0) {
  let index = 0;

  function updateSlider() {
    slider.style.transform = `translateX(-${index * 400}px)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index % 3].classList.add("active");
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      updateSlider();
    });
  });

  /* Auto slide */
  setInterval(() => {
    index++;
    if (index > 2) index = 0;
    updateSlider();
  }, 4000);
}

// ============ BLOG SEARCH & FILTERING ============
document.addEventListener('DOMContentLoaded', () => {
  const blogGrid = document.querySelector('.blog-grid');
  if (blogGrid) {
    const filterBtns = document.querySelectorAll('.blog-filter-btn');
    const searchInput = document.getElementById('blogSearch');
    const blogCards = document.querySelectorAll('.blog-card');
    const noResults = document.getElementById('blogNoResults');
    
    let activeCategory = 'all';
    let searchQuery = '';

    function filterBlogPosts() {
      let visibleCount = 0;
      blogCards.forEach(card => {
        const category = card.dataset.category || '';
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        
        const matchesCategory = activeCategory === 'all' || category === activeCategory;
        const matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery);
        
        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
          visibleCount++;
          card.classList.add('visible');
        } else {
          card.style.display = 'none';
        }
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeCategory = this.dataset.filter;
        filterBlogPosts();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function() {
        searchQuery = this.value.toLowerCase().trim();
        filterBlogPosts();
      });
    }
  }
});