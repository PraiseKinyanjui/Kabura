/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { 
  Instagram, 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Star, 
  Menu, 
  X,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Configuration for easy editing
const SITE_CONFIG = {
  brandName: "Kabura’s Desserts",
  tagline: "Indulge in premium homemade desserts",
  whatsappNumber: "254790811627",
  phoneNumber: "+254 790 811 627",
  instagramHandle: "mskabura",
  location: "Athi River",
  workingHours: "Monday - Friday: 8am – 6pm",
  colors: {
    burgundy: "#800020",
    cream: "#FAF9F6",
  }
};

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Cinnamon Rolls",
    price: "Ksh 250",
    description: "Soft, fluffy rolls with a rich cinnamon filling and signature cream cheese frosting.",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Gourmet Pecan Rolls",
    price: "Ksh 350",
    description: "Our signature cinnamon rolls topped with toasted pecans and caramel glaze.",
    image: "https://images.unsplash.com/photo-1620921515833-060216244370?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Chocolate Swirl Rolls",
    price: "Ksh 300",
    description: "For the chocolate lovers - rich cocoa filling with dark chocolate drizzle.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
  }
];

const TESTIMONIALS = [
  {
    name: "Sarah W.",
    role: "Student, Daystar University",
    text: "The best cinnamon rolls I've ever had in Athi River! Perfectly sweet and so fresh.",
    rating: 5
  },
  {
    name: "James K.",
    role: "Local Resident",
    text: "Kabura's desserts are my go-to for every special occasion. The quality is unmatched.",
    rating: 5
  },
  {
    name: "Anita M.",
    role: "Student",
    text: "The cream cheese frosting is out of this world. Highly recommend!",
    rating: 5
  }
];

const GALLERY = [
  "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?auto=format&fit=crop&q=80&w=800"
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reviews, setReviews] = useState(TESTIMONIALS);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrder = (productName: string) => {
    const message = encodeURIComponent(`Hello, I would like to order ${productName}`);
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setReviews([{ ...newReview, role: "Verified Customer" }, ...reviews]);
      setNewReview({ name: '', text: '', rating: 5 });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen selection:bg-burgundy selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <a href="#" className="font-serif text-lg sm:text-2xl font-bold tracking-tighter text-burgundy flex-shrink-0 mr-2">
            {SITE_CONFIG.brandName}
          </a>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-sm font-medium hover:text-burgundy transition-colors">Home</a>
            <a href="#products" className="text-sm font-medium hover:text-burgundy transition-colors">Products</a>
            <a href="#gallery" className="text-sm font-medium hover:text-burgundy transition-colors">Gallery</a>
            <a href="#contact" className="text-sm font-medium hover:text-burgundy transition-colors">Contact</a>
            <button 
              onClick={() => handleOrder("Cinnamon Rolls")}
              className="bg-burgundy text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-burgundy-dark transition-all transform hover:scale-105"
            >
              Order Now
            </button>
          </div>

          <button className="md:hidden text-burgundy" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Home</a>
                <a href="#products" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Products</a>
                <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Gallery</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Contact</a>
                <button 
                  onClick={() => {
                    handleOrder("Cinnamon Rolls");
                    setIsMenuOpen(false);
                  }}
                  className="bg-burgundy text-white py-3 rounded-xl font-medium"
                >
                  Order Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Bakery background"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl text-white font-bold mb-6 tracking-tight">
              {SITE_CONFIG.brandName}
            </h1>
            <p className="text-xl md:text-2xl text-cream/90 font-light mb-10 italic serif">
              “{SITE_CONFIG.tagline}”
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-burgundy text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-burgundy-dark transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Order Now <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-all"
              >
                View Gallery
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-burgundy">Our Signature Treats</h2>
            <div className="w-24 h-1 bg-burgundy mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">Handcrafted with love using only the finest ingredients. Our cinnamon rolls are baked fresh daily to ensure the perfect indulgence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PRODUCTS.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-cream rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-burgundy font-bold shadow-sm">
                    {product.price}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-burgundy transition-colors">{product.name}</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  <button 
                    onClick={() => handleOrder(product.name)}
                    className="w-full bg-black text-white py-4 rounded-2xl font-medium hover:bg-burgundy transition-colors flex items-center justify-center gap-2"
                  >
                    Order on WhatsApp <MessageCircle size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-burgundy mb-2">Visual Indulgence</h2>
              <p className="text-gray-600">A glimpse into our kitchen and creations.</p>
            </div>
            <a 
              href={`https://instagram.com/${SITE_CONFIG.instagramHandle}`}
              target="_blank"
              className="flex items-center gap-2 text-burgundy font-medium hover:underline"
            >
              Follow us on Instagram <Instagram size={20} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {GALLERY.map((img, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative rounded-3xl overflow-hidden group ${index === 0 ? 'col-span-2 row-span-2 h-[400px] md:h-[600px]' : 'h-[200px] md:h-[288px]'}`}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${index}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-burgundy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-burgundy">Sweet Words from Our Customers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {reviews.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-cream p-10 rounded-[40px] relative"
              >
                <div className="flex gap-1 mb-6 text-burgundy">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic mb-8 text-gray-700">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-burgundy">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-burgundy/5 rounded-full -z-10" />
              </motion.div>
            ))}
          </div>

          {/* Review Form */}
          <div className="max-w-2xl mx-auto bg-cream p-8 md:p-12 rounded-[40px] shadow-sm">
            <h3 className="text-2xl font-bold text-burgundy mb-6 text-center">Share Your Experience</h3>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border-none bg-white focus:ring-2 focus:ring-burgundy transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select 
                    value={newReview.rating}
                    onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 rounded-2xl border-none bg-white focus:ring-2 focus:ring-burgundy transition-all"
                  >
                    <option value="5">5 Stars - Excellent</option>
                    <option value="4">4 Stars - Very Good</option>
                    <option value="3">3 Stars - Good</option>
                    <option value="2">2 Stars - Fair</option>
                    <option value="1">1 Star - Poor</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea 
                  required
                  rows={4}
                  value={newReview.text}
                  onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl border-none bg-white focus:ring-2 focus:ring-burgundy transition-all resize-none"
                  placeholder="Tell us what you loved about our desserts..."
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-burgundy text-white py-5 rounded-2xl font-bold text-lg hover:bg-burgundy-dark transition-all shadow-lg shadow-burgundy/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Post Review"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-cream">Get in Touch</h2>
              <p className="text-cream/60 mb-12 text-lg">Have a question or want to place a custom order? We're here to help you satisfy your sweet cravings.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-burgundy rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Location</h4>
                    <p className="text-cream/70">{SITE_CONFIG.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-burgundy rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                    <p className="text-cream/70">{SITE_CONFIG.workingHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-burgundy rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <p className="text-cream/70">{SITE_CONFIG.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <a href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`} className="bg-white text-black p-4 rounded-2xl hover:bg-burgundy hover:text-white transition-all">
                  <MessageCircle size={24} />
                </a>
                <a href={`https://instagram.com/${SITE_CONFIG.instagramHandle}`} className="bg-white text-black p-4 rounded-2xl hover:bg-burgundy hover:text-white transition-all">
                  <Instagram size={24} />
                </a>
                <a href={`tel:${SITE_CONFIG.whatsappNumber}`} className="bg-white text-black p-4 rounded-2xl hover:bg-burgundy hover:text-white transition-all">
                  <Phone size={24} />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-burgundy/20 p-8 rounded-[60px] border border-burgundy/30">
                <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10">
                  <h3 className="text-2xl font-bold mb-6">Quick Order</h3>
                  <p className="text-cream/60 mb-8">Click below to start your order instantly via WhatsApp.</p>
                  <button 
                    onClick={() => handleOrder("Cinnamon Rolls")}
                    className="w-full bg-burgundy text-white py-5 rounded-2xl font-bold text-lg hover:bg-burgundy-dark transition-all shadow-lg shadow-burgundy/20 flex items-center justify-center gap-3"
                  >
                    Order on WhatsApp <ChevronRight size={20} />
                  </button>
                  <p className="mt-6 text-center text-sm text-cream/40">Response time: Usually within 15 mins</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-burgundy/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-burgundy/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10 text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-2xl font-bold text-burgundy mb-4">{SITE_CONFIG.brandName}</h2>
          <p className="text-cream/40 text-sm mb-8">© {new Date().getFullYear()} {SITE_CONFIG.brandName}. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-cream/60">
            <a href="#" className="hover:text-burgundy transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-burgundy transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleOrder("Cinnamon Rolls")}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#128C7E] transition-colors"
      >
        <MessageCircle size={32} />
      </motion.button>
    </div>
  );
}
