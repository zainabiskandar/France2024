// France trip photo data - using Pexels stock photos of France
const photos = [
  {
    url: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Eiffel Tower at sunset',
    location: 'Paris, France'
  },
  {
    url: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Arc de Triomphe',
    location: 'Paris, France'
  },
  {
    url: 'https://images.pexels.com/photos/2097616/pexels-photo-2097616.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Louvre Museum',
    location: 'Paris, France'
  },
  {
    url: 'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Seine River',
    location: 'Paris, France'
  },
  {
    url: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Montmartre streets',
    location: 'Paris, France'
  },
  {
    url: 'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'French countryside',
    location: 'Provence, France'
  },
  {
    url: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Lavender fields',
    location: 'Provence, France'
  },
  {
    url: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Notre-Dame Cathedral',
    location: 'Paris, France'
  },
  {
    url: 'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Versailles Palace',
    location: 'Versailles, France'
  },
  {
    url: 'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'French Riviera',
    location: 'Nice, France'
  },
  {
    url: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Château views',
    location: 'Loire Valley, France'
  },
  {
    url: 'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Wine vineyards',
    location: 'Bordeaux, France'
  }
];

class GalleryManager {
  constructor() {
    this.container = document.getElementById('gallery-container');
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.querySelector('.lightbox-image');
    this.lightboxCaption = document.querySelector('.lightbox-caption');
    this.lightboxClose = document.querySelector('.lightbox-close');

    this.init();
  }

  init() {
    this.createGallery();
    this.setupLightbox();
    this.setupScrollAnimation();
  }

  createGallery() {
    const groupSize = 6;
    const groups = [];

    for (let i = 0; i < photos.length; i += groupSize) {
      groups.push(photos.slice(i, i + groupSize));
    }

    groups.forEach((group, groupIndex) => {
      const section = document.createElement('div');
      section.className = 'gallery-section';
      section.dataset.group = groupIndex;

      const stack = document.createElement('div');
      stack.className = 'card-stack';

      group.forEach((photo, index) => {
        const card = this.createCard(photo, index, group.length);
        stack.appendChild(card);
      });

      section.appendChild(stack);
      this.container.appendChild(section);
    });
  }

  createCard(photo, index, total) {
    const card = document.createElement('div');
    card.className = 'card';

    const angle = (index / total) * 180 - 90;
    const radius = 350;
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const z = Math.sin(angle * Math.PI / 180) * radius - 200;
    const rotateY = angle * 0.5;

    card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`;

    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = photo.caption;

    const info = document.createElement('div');
    info.className = 'card-info';
    info.textContent = photo.location;

    const caption = document.createElement('div');
    caption.className = 'card-caption';
    caption.textContent = photo.caption;

    info.appendChild(caption);

    card.appendChild(img);
    card.appendChild(info);

    card.addEventListener('click', () => {
      this.openLightbox(photo);
    });

    return card;
  }

  setupLightbox() {
    this.lightboxClose.addEventListener('click', () => {
      this.closeLightbox();
    });

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
        this.closeLightbox();
      }
    });
  }

  openLightbox(photo) {
    this.lightboxImage.src = photo.url;
    this.lightboxImage.alt = photo.caption;
    this.lightboxCaption.textContent = `${photo.caption} - ${photo.location}`;
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  setupScrollAnimation() {
    const sections = document.querySelectorAll('.gallery-section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stack = entry.target.querySelector('.card-stack');
          stack.style.transform = 'rotateY(0deg)';
        }
      });
    }, {
      threshold: 0.2
    });

    sections.forEach(section => {
      observer.observe(section);
    });

    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const stack = section.querySelector('.card-stack');

          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrollProgress = 1 - (rect.top / window.innerHeight);
            const rotation = (scrollProgress - 0.5) * 20;
            stack.style.transform = `rotateY(${rotation}deg)`;
          }
        });
      }, 10);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GalleryManager();
});
