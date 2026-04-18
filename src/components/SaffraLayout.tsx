import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Utensils, Calendar, MapPin, Instagram, Facebook, Twitter, Menu as MenuIcon, X } from 'lucide-react';

const dishes = [
  {
    id: 1,
    name: "Heirloom Salad",
    description: "Freshly harvested seasonal greens and a citrus-saffron vinaigrette.",
    image: "https://res.cloudinary.com/dlc8ltxwz/image/upload/q_auto/f_auto/v1776325730/Gemini_Generated_Image_taps18taps18taps_w0uzjd.png"
  },
  {
    id: 4,
    name: "Wheat porridge",
    description: "a hot, soft, and thick food popular in many cultures.",
    image: "https://res.cloudinary.com/dlc8ltxwz/image/upload/q_auto/f_auto/v1776300757/Gemini_Generated_Image_se6zx0se6zx0se6z_wbvvgh.png"
  },
  {
    id: 2,
    name: "Truffle Risotto",
    description: "Creamy Arborio rice with wild forest mushrooms and aged Parmigiano-Reggiano.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Rice & Lentils ",
    description: "a classic, comforting, and nutritious Indian vegetarian dish",
    image: "https://res.cloudinary.com/dlc8ltxwz/image/upload/q_auto/f_auto/v1776298832/Gemini_Generated_Image_erbtiyerbtiyerbt_bpt57z.png"
  }
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reservations', href: '#reservation' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 transition-all duration-500 bg-white/70 backdrop-blur-lg border-b border-charcoal/5 ${
          isScrolled ? 'py-4' : 'py-4'
        }`}
        id="navbar"
      >
        <div className="text-xl md:text-2xl font-serif tracking-widest uppercase font-semibold" id="nav-logo">Saffra</div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-xs uppercase tracking-[0.2em] font-medium" id="nav-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-green transition-colors">{link.name}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#location"
            className="hidden sm:block px-6 py-2 border border-charcoal/20 text-[10px] md:text-xs uppercase tracking-widest hover:bg-green hover:border-green hover:text-champagne transition-all duration-300" 
            id="nav-cta"
          >
            LOCATION
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-champagne flex flex-col items-center justify-center p-8 md:hidden"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-charcoal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center space-y-8 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-3xl font-serif serif-italic hover:text-green transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#location"
                className="mt-4 px-10 py-4 bg-green text-champagne text-xs uppercase tracking-[0.2em] font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                LOCATION
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Hero = () => {
  const [currentDish, setCurrentDish] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDish((prev) => (prev + 1) % dishes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12" id="hero">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex items-center justify-center" id="hero-bg-text">
        <motion.h1 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-[40vw] md:text-[35vw] font-serif font-bold leading-none select-none"
        >
          SAFFRA
        </motion.h1>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-12 max-w-7xl mx-auto w-full" id="hero-content">
        <div className="flex-1 text-center md:text-left order-2 md:order-1" id="hero-text">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-green uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block"
          >
            Signature Selection
          </motion.span>
          <motion.h2 
            key={dishes[currentDish].name}
            initial={{ opacity: 0, y: 40, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif serif-italic mb-6 md:mb-8 leading-[0.9] tracking-tighter"
          >
            {dishes[currentDish].name}
          </motion.h2>
          <motion.p 
            key={dishes[currentDish].description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-charcoal/70 max-w-md mx-auto md:mx-0 mb-8 text-base md:text-lg leading-relaxed"
          >
            {dishes[currentDish].description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <a 
              href="#reservation"
              className="bg-charcoal text-champagne px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-xs uppercase tracking-widest hover:bg-green transition-colors duration-300 inline-block"
            >
              BOOK A TABLE
            </a>
            <a 
              href="#menu"
              className="border border-charcoal px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-xs uppercase tracking-widest hover:bg-green hover:border-green hover:text-champagne transition-all duration-300 inline-block"
            >
              VIEW MENU
            </a>
          </motion.div>
        </div>

        <div className="flex-1 relative flex items-center justify-center order-1 md:order-2" id="hero-image-container">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
            {/* Continuous rotating outer rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[1px] border-gold/20 rounded-full" 
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 md:inset-4 border-[1px] border-gold/10 rounded-full" 
            />
            
            {/* The Plate: Rotating container for the food */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 md:inset-8 rounded-full shadow-2xl border-4 md:border-8 border-champagne overflow-hidden bg-white"
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentDish}
                  src={dishes[currentDish].image}
                  alt={dishes[currentDish].name}
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              {/* Magical Shimmer Overlay */}
              <motion.div 
                key={`shimmer-${currentDish}`}
                initial={{ opacity: 0, x: "-100%", skewX: -20 }}
                animate={{ opacity: [0, 0.4, 0], x: "200%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/40 to-transparent pointer-events-none z-10"
              />
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-16 h-16 md:w-24 md:h-24 border-t border-r border-gold/30" />
          <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-16 h-16 md:w-24 md:h-24 border-b border-l border-gold/30" />
        </div>
      </div>
      
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.45, 1, 0.45], y: [0, 8, 0] }}
            exit={{ opacity: 0, y: 12 }}
            transition={{
              opacity: { delay: 1.2, duration: 2.2, repeat: Infinity, ease: "easeInOut" },
              y: { delay: 1.2, duration: 2.2, repeat: Infinity, ease: "easeInOut" },
              exit: { duration: 0.25 }
            }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            id="scroll-indicator"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">Explore</span>
            <motion.div
              animate={{ scaleY: [1, 0.65, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent origin-top"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const About = () => (
  <section className="py-24 px-8 bg-white overflow-hidden" id="about">
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center"
    >
      <div className="relative" id="about-image">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          src="https://res.cloudinary.com/dlc8ltxwz/image/upload/q_auto/f_auto/v1776339892/1776339621941_1_d3dum0.png" 
          alt="Chef at work" 
          className="w-full h-[400px] md:h-[600px] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute -bottom-5 -right-2 md:-bottom-6 md:-right-6 bg-champagne p-3 sm:p-4 md:p-5 shadow-xl max-w-[150px] sm:max-w-[190px] md:max-w-[220px]"
        >
          <p className="font-serif italic text-sm sm:text-base md:text-lg leading-snug text-charcoal/80">
            "Cooking is an art, but dining is a ritual. We honor both at Saffra."
          </p>
          <p className="mt-2 sm:mt-3 text-[9px] md:text-[10px] uppercase tracking-[0.18em] font-bold">— Chef Julian Saffra</p>
        </motion.div>
      </div>
      <div id="about-text">
        <span className="text-green uppercase tracking-[0.4em] text-xs font-semibold mb-4 block">Our Story</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Honest Ingredients, Unforgettable Flavors</h2>
        <p className="text-charcoal/70 mb-6 leading-relaxed">
          We’ve been doing what we love since 1994: turning fresh, local ingredients into meals you won’t forget.
        </p>
        <p className="text-charcoal/70 mb-8 leading-relaxed">
          We keep things simple by sourcing exclusively from organic farms. It’s not just dinner; it’s our way of sharing the best of the season with you.
        </p>
        <div className="grid grid-cols-2 gap-8" id="about-stats">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-3xl font-serif text-green">28</h4>
            <p className="text-[10px] uppercase tracking-widest text-charcoal/50">Years of Excellence</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-3xl font-serif text-green">3</h4>
            <p className="text-[10px] uppercase tracking-widest text-charcoal/50">Michelin Stars</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  </section>
);

const menuItems = [
  { category: "Starters", items: [
    { name: "Burrata & Stone Fruit", price: "$34", desc: "Creamy burrata with grilled peaches, basil oil, and aged balsamic." },
    { name: "Wild Mushroom Tart", price: "$42", desc: "Flaky pastry with forest mushrooms, thyme, and goat cheese mousse." },
    { name: "Roasted Beetroot", price: "$36", desc: "Goat cheese curd, honey-roasted walnuts, and sherry gastrique." },
    { name: "Scallop Crudo", price: "$48", desc: "Thinly sliced scallops, blood orange, and serrano pepper." }
  ]},
  { category: "Mains", items: [
    { name: "Truffle Gnocchi", price: "$85", desc: "Handmade potato gnocchi with black truffle cream and crispy sage." },
    { name: "Roasted Root Symphony", price: "$75", desc: "Seasonal root vegetables with honey glaze and smoked parsnip puree." },
    { name: "Wild Sea Bass", price: "$95", desc: "Pan-roasted with lemon-butter emulsion and confit potatoes." },
    { name: "Wagyu Ribeye", price: "$145", desc: "Grade A5 wagyu with red wine jus and bone marrow butter." }
  ]},
  { category: "Desserts", items: [
    { name: "Saffron Panna Cotta", price: "$28", desc: "Honey-poached pears and pistachio crumble." },
    { name: "Dark Chocolate Soufflé", price: "$32", desc: "Grand Marnier infusion and vanilla bean ice cream." },
    { name: "Apple Tatin", price: "$26", desc: "Caramelized apples with puff pastry and salted caramel gelato." },
    { name: "Artisanal Cheese Board", price: "$45", desc: "Selection of local and European cheeses with accompaniments." }
  ]}
];

export const Menu = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-24 px-8 bg-champagne overflow-hidden" id="menu">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="text-green uppercase tracking-[0.4em] text-xs font-semibold mb-4 block">The Collection</span>
          <h2 className="text-5xl font-serif">Seasonal Menu</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12" id="menu-grid">
          {menuItems.map((cat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: idx === 0 ? -30 : idx === 2 ? 30 : 0, y: idx === 1 ? 30 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="space-y-8" 
              id={`menu-cat-${idx}`}
            >
              <h3 className="text-xl uppercase tracking-[0.2em] font-semibold border-b border-charcoal/10 pb-4">{cat.category}</h3>
              <div className="space-y-8">
                {(showAll ? cat.items : cat.items.slice(0, 2)).map((item, i) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={item.name} 
                    className="group cursor-pointer" 
                    id={`menu-item-${idx}-${i}`}
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg font-serif group-hover:text-green transition-colors">{item.name}</h4>
                      <span className="text-sm font-medium">{item.price}</span>
                    </div>
                    <p className="text-xs text-charcoal/50 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="px-12 py-4 border border-charcoal text-xs uppercase tracking-widest hover:bg-charcoal hover:text-champagne transition-all duration-300"
          >
            {showAll ? "Show Signature Selection" : "View More Options"}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export const Reservation = () => {
  const [isReserved, setIsReserved] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    guests: '2 People',
    time: '18:00'
  });

  // Calculate min and max dates (today and 1 month from now)
  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const minDate = formatDate(today);
  const maxDate = formatDate(oneMonthFromNow);

  const isFormValid = formData.date !== '' && formData.guests !== '' && formData.time !== '';

  return (
    <section className="py-24 px-8 bg-charcoal relative overflow-hidden" id="reservation">
      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-16 items-center">
        <div className="text-champagne">
          <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">Secure Your <br /><span className="serif-italic">Private Table</span></h2>
          <p className="text-champagne/60 text-lg leading-relaxed mb-8 max-w-md">
            Experience the pinnacle of fine dining. We recommend booking at least two weeks in advance for weekend dinner services.
          </p>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-green" />
              <span className="uppercase tracking-widest">Dress Code: Formal</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-green" />
              <span className="uppercase tracking-widest">Valet Parking Available</span>
            </div>
          </div>
        </div>

        <div className="bg-champagne p-8 sm:p-10 md:p-16 shadow-[0_0_50px_rgba(45,90,39,0.15)] border border-green/10 relative">
          <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 bg-green text-white px-3 md:px-4 py-1 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold z-20">
            Priority Booking
          </div>
          
          <AnimatePresence mode="wait">
            {isReserved ? (
              <motion.div 
                key="reserved"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-green" />
                </div>
                <h3 className="text-2xl font-serif text-charcoal mb-4">seats are reserved pls try again later</h3>
                <p className="text-charcoal/60 text-sm mb-8">We apologize for the inconvenience, but we are currently at full capacity.</p>
                <button 
                  onClick={() => {
                    setIsReserved(false);
                    setFormData({ ...formData, date: '' });
                  }}
                  className="text-[10px] uppercase tracking-widest font-bold text-green border-b border-green pb-1"
                >
                  Try different dates
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6" 
                id="reservation-form"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-green" />
                    <input 
                      type="date" 
                      min={minDate}
                      max={maxDate}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-transparent border-b border-charcoal/20 py-3 pl-8 text-xs uppercase tracking-widest focus:outline-none focus:border-green transition-colors" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">Guests</label>
                  <div className="relative">
                    <Utensils className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-green" />
                    <select 
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-transparent border-b border-charcoal/20 py-3 pl-8 text-xs uppercase tracking-widest focus:outline-none focus:border-green transition-colors appearance-none"
                    >
                      <option>2 People</option>
                      <option>4 People</option>
                      <option>6 People</option>
                      <option>Private Event</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">Time</label>
                  <select 
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-transparent border-b border-charcoal/20 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-green transition-colors appearance-none"
                  >
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                  </select>
                </div>
                <button 
                  disabled={!isFormValid}
                  onClick={() => setIsReserved(true)}
                  className={`w-full py-5 text-xs uppercase tracking-widest font-bold transition-all duration-500 mt-8 ${
                    isFormValid 
                      ? 'bg-charcoal text-champagne hover:bg-green cursor-pointer' 
                      : 'bg-charcoal/20 text-charcoal/40 cursor-not-allowed'
                  }`}
                >
                  Check Availability
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export const Contact = () => (
  <section className="py-24 px-8 bg-white overflow-hidden" id="contact">
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="max-w-7xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-12"
        >
          <div>
            <span className="text-green uppercase tracking-[0.4em] text-xs font-semibold mb-4 block">Contact Us</span>
            <h2 className="text-5xl font-serif mb-6">Get in Touch</h2>
            <p className="text-charcoal/60 leading-relaxed max-w-md">
              Whether you have a question about our menu, want to book a private event, or simply want to say hello, we'd love to hear from you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-green">Inquiries</h4>
              <p className="text-sm">hello@saffra.com</p>
              <p className="text-sm">+44 (0) 20 7123 4567</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-green">Events</h4>
              <p className="text-sm">events@saffra.com</p>
              <p className="text-sm">+44 (0) 20 7123 4568</p>
            </div>
          </div>

          <div className="pt-8 border-t border-charcoal/5">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-green mb-6">Follow Our Journey</h4>
            <div className="flex gap-8">
              <a href="#" className="text-xs uppercase tracking-widest hover:text-green transition-colors">Instagram</a>
              <a href="#" className="text-xs uppercase tracking-widest hover:text-green transition-colors">Facebook</a>
              <a href="#" className="text-xs uppercase tracking-widest hover:text-green transition-colors">Twitter</a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative h-[350px] md:h-[500px] bg-champagne overflow-hidden group"
          id="location"
        >
          <img 
            src="https://res.cloudinary.com/dlc8ltxwz/image/upload/q_auto/f_auto/v1776343257/3a1a9e434a2cc6c9fb859242c5f9f66d_rchrke.jpg" 
            alt="Map placeholder" 
            className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white p-6 md:p-8 shadow-2xl text-center max-w-xs w-full">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-green mx-auto mb-4" />
              <h4 className="font-serif text-lg md:text-xl mb-2">Our Location</h4>
              <p className="text-[10px] md:text-xs text-charcoal/60 leading-relaxed uppercase tracking-widest">
                124 Mayfair Avenue,<br />London, W1J 8AJ
              </p>
              <button className="mt-4 md:mt-6 text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-green border-b border-green pb-1">
                Get Directions
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);


export const Footer = () => (
  <footer className="py-16 px-8 bg-white border-t border-charcoal/5" id="contact-footer">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-bold tracking-widest uppercase">Saffra</h3>
        <p className="text-xs text-charcoal/60 leading-relaxed">
          The pinnacle of fine dining. An experience that transcends the plate.
        </p>
        <div className="flex gap-4">
          <Instagram className="w-4 h-4 cursor-pointer hover:text-green transition-colors" />
          <Facebook className="w-4 h-4 cursor-pointer hover:text-green transition-colors" />
          <Twitter className="w-4 h-4 cursor-pointer hover:text-green transition-colors" />
        </div>
      </div>
      
      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-green">Location</h4>
        <div className="flex gap-3 items-start text-xs text-charcoal/70">
          <MapPin className="w-4 h-4 text-green shrink-0" />
          <p>124 Mayfair Avenue,<br />London, W1J 8AJ</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-green">Hours</h4>
        <div className="text-xs text-charcoal/70 space-y-2">
          <p>Mon - Fri: 18:00 - 23:00</p>
          <p>Sat - Sun: 12:00 - 23:30</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-green">Newsletter</h4>
        <div className="flex">
          <input type="email" placeholder="Your Email" className="bg-charcoal/5 border-b border-charcoal/20 py-2 text-xs w-full focus:outline-none focus:border-green" />
          <button className="ml-2 text-[10px] uppercase tracking-widest font-bold">Join</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[10px] uppercase tracking-widest text-charcoal/40">© 2024 Saffra Restaurant Group. All rights reserved.</p>
      <div className="flex gap-8 text-[10px] uppercase tracking-widest text-charcoal/40">
        <a href="#" className="hover:text-green">Privacy Policy</a>
        <a href="#" className="hover:text-green">Terms of Service</a>
      </div>
    </div>
  </footer>
);
