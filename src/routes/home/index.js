import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './style.module.css';
import Modal from '../../components/Modal';
import { loadGalleryImages } from '../../utils/galleryLoader';
import homepageSettings from '../../../content/settings/homepage.json';

// Import gallery images (fallback for static imports)
import client01 from '../../assets/client-01.jpg';
import client02 from '../../assets/client-02.jpg';
import client03 from '../../assets/client-03.jpg';
import client04 from '../../assets/client-04.jpg';
import client05 from '../../assets/client-05.jpg';
import client06 from '../../assets/client-06.jpg';
import client07 from '../../assets/client-07.jpg';
import client08 from '../../assets/client-08.jpg';
import client09 from '../../assets/client-09.jpg';
import client10 from '../../assets/client-10.jpg';

// Import service icons
import haircutIcon from '../../assets/icons/service-haircut.svg';
import haircutBeardIcon from '../../assets/icons/service-haircut-beard.svg';

// Import About Me images (fallback)
import profileImageFg from '../../assets/robert-davis-profile.png';
import profileImageBg from '../../assets/icons/logo-black.svg';

// Fallback gallery data
const fallbackGallery = [
  { image: client01, title: 'Client 1', order: 1 },
  { image: client02, title: 'Client 2', order: 2 },
  { image: client03, title: 'Client 3', order: 3 },
  { image: client04, title: 'Client 4', order: 4 },
  { image: client05, title: 'Client 5', order: 5 },
  { image: client06, title: 'Client 6', order: 6 },
  { image: client07, title: 'Client 7', order: 7 },
  { image: client08, title: 'Client 8', order: 8 },
  { image: client09, title: 'Client 9', order: 9 },
  { image: client10, title: 'Client 10', order: 10 },
];

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState(fallbackGallery);
  const [aboutImages, setAboutImages] = useState({
    foreground: profileImageFg,
    background: profileImageBg,
  });

  /**
   * Netlify CMS's accept invite link land on home page.
   * This redirection takes it to the right place(/admin).
   */

  useEffect(() => {
    if (
      window !== undefined &&
      window.location.href.includes('#invite_token')
    ) {
      const { href } = window.location;
      window.location.href = `${href.substring(0, href.indexOf('#'))}admin${href.substring(href.indexOf('#'))}`;
    }

    // Load gallery images from CMS
    try {
      const cmsGallery = loadGalleryImages();
      if (cmsGallery && cmsGallery.length > 0) {
        // Map CMS data to gallery format with image imports
        const mappedGallery = cmsGallery.map((item, index) => {
          // Extract filename from image path
          const imageName = item.image?.split('/').pop()?.replace('.jpg', '');
          // Use static import as fallback
          const staticImage =
            fallbackGallery[index]?.image || fallbackGallery[0]?.image;

          return {
            ...item,
            imageUrl: staticImage, // Use static import for now
            alt: item.caption || item.title || `Gallery image ${index + 1}`,
          };
        });
        setGalleryImages(mappedGallery);
      }
    } catch (error) {
      console.warn('Could not load CMS gallery, using fallback:', error);
    }

    // Load About Me images from CMS
    try {
      if (homepageSettings.about_image_foreground) {
        setAboutImages({
          foreground: homepageSettings.about_image_foreground || profileImageFg,
          background: homepageSettings.about_image_background || profileImageBg,
        });
      }
    } catch (error) {
      console.warn(
        'Could not load About Me images from CMS, using fallback:',
        error
      );
    }
  }, []);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main class={style.home} role="main">
      {/* Hero Section */}
      <section id="hero" class={style.hero}>
        <div class={style.heroOverlay}>
          <h1 class={style.heroLogo}>CUSTOM FADES</h1>
          <div class={style.heroActions}>
            <button
              class={style.heroButton}
              onClick={() => scrollToSection('services')}
            >
              Let's Get Started!
            </button>
            <button
              class={style.scrollButton}
              onClick={() => scrollToSection('services')}
              aria-label="Scroll to services"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 2 L12 18 M7 13 L12 18 L17 13" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        class={style.services}
        aria-labelledby="services-heading"
      >
        <h2 id="services-heading" class={style.servicesTitle}>
          Services
        </h2>
        <p class={style.servicesIntro}>
          Let's get you right! Select your haircut.
        </p>
        <div class={style.servicesGrid}>
          <div class={style.serviceCard}>
            <img
              src={haircutIcon}
              alt="Haircut service"
              class={style.serviceIcon}
              onClick={handleModalToggle}
              tabIndex={0}
              role="button"
              aria-label="Book haircut appointment"
            />
            <h3 class={style.serviceTitle}>Haircut</h3>
            <button class={style.bookButton} onClick={handleModalToggle}>
              Book Now
            </button>
          </div>
          <div class={style.serviceCard}>
            <img
              src={haircutBeardIcon}
              alt="Haircut and beard service"
              class={style.serviceIcon}
              onClick={handleModalToggle}
              tabIndex={0}
              role="button"
              aria-label="Book haircut and beard appointment"
            />
            <h3 class={style.serviceTitle}>Haircut + Beard</h3>
            <button class={style.bookButton} onClick={handleModalToggle}>
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" class={style.about} aria-labelledby="about-heading">
        <div class={style.aboutContent}>
          <div class={style.aboutText}>
            <h2 id="about-heading" class={style.aboutTitle}>
              About Me
            </h2>
            <p>
              Yo, it's Custom Fades – beyond cuts, it's a whole vibe! I'm Rob,
              more than a barber, I'm family. In our shop, we celebrate black
              excellence, blending tradition with trends. Every cut tells YOUR
              story. From classic fades to unique designs, I'm your architect of
              style. Step in for an experience, not just a cut. 🔥💈
              #CustomFades
            </p>
            <p>Let's get you cleaned up!</p>
            <button
              class={style.appointmentButton}
              onClick={() => scrollToSection('services')}
            >
              Set Appointment
            </button>
          </div>
          <div class={style.aboutImage}>
            <div
              class={style.profileImage}
              style={`background-image: url(${aboutImages.foreground})${aboutImages.background ? `, url(${aboutImages.background})` : ''}`}
              role="img"
              aria-label="Rob from Custom Fades"
            />
          </div>
        </div>
      </section>

      {/* Wall of Fades Gallery */}
      <section
        id="gallery"
        class={style.gallery}
        aria-labelledby="gallery-heading"
      >
        <h2 id="gallery-heading" class={style.galleryTitle}>
          Wall of Fades
        </h2>
        <p class={style.gallerySubtitle}>You're up next!</p>
        <div class={style.galleryGrid}>
          {galleryImages.map((item, index) => (
            <div
              key={`gallery-${item.order || index}`}
              class={style.galleryItem}
              style={`background-image: url(${item.imageUrl || item.image})`}
              role="img"
              aria-label={
                item.alt || item.caption || `Gallery image ${index + 1}`
              }
              title={item.caption || item.title || ''}
            />
          ))}
        </div>
      </section>

      {/* Find Me / Contact Section */}
      <section
        id="contact"
        class={style.contact}
        aria-labelledby="contact-heading"
      >
        <div class={style.contactContent}>
          <div class={style.contactInfo}>
            <h2 class={style.contactTitle}>Find Me</h2>
            <p class={style.contactAddress}>
              Working Location: 5146 E 42nd St, Ste 1A-102, Odessa, TX 79762
            </p>
            <p class={style.contactNote}>Studio Appointment</p>
          </div>
          <div class={style.contactForm}>
            <h2 class={style.contactTitle}>Contact</h2>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              action="/contact/success"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                class={style.formInput}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                class={style.formInput}
              />
              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                class={style.formTextarea}
              />
              <button type="submit" class={style.submitButton}>
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleModalToggle}>
        <iframe
          class="booking"
          title="Book an appointment"
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2C18CQWGd0iJPrxcw5B7lACsoutodekVzDYIDHxKwlaH9uKf5pt-4DCNPUn2MYhUad7umefWAv?gv=true"
          width="100%"
          height="700"
          frameBorder="0"
        />
      </Modal>
    </main>
  );
};

export default Home;
