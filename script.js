// --- Product Database ---
// Each color now has its own specific image URL to show when selected.
const products = [
    { 
        id: 1, 
        name: "Lily of Valley", 
        category: "bagcharms", 
        price: 160, 
        image: "pinklily.png", 
        colors: [
            { hex: "#ca4dcc", img: "pinklily.png" }
        ]
        },
        { 
        id: 2, 
        name: "Rose", 
        category: "keychains", 
        price: 130, 
        image: "rosekeychain.png", 
        colors: [
            { hex: "#d9270f", img: "rose.png" }
            
        ] 
    },
    { 
        id: 3, 
        name: "Mini Octopus", 
        category: "keychains", 
        price: 120, 
        image: "bluocto.png", 
        colors: [
            { hex: "#1b87d3", img: "bluocto.png" }
        ] 
    },
   
    { 
        id: 4, 
        name: "Floral scrunchie", 
        category: "hair accessories", 
        price: 120, 
        image: "scr.png", 
        colors: [
            { hex: "#d9270f", img: "scr.png" }
            
        ] 
    },

    { 
        id: 5, 
        name: "Rose clip", 
        category: "hair accessories", 
        price: 120, 
        image: "rose.png", 
        colors: [
            { hex: "#d9270f", img: "rose.png" }
            
        ] 
    },

    { 
        id: 6, 
        name: "Sunflower", 
        category: "keychains", 
        price: 130, 
        image: "sunflower.png", 
        colors: [
            { hex: "#fdf509", img: "sunflower.png" }
            
        ] 
    }


];

let currentFilter = 'all';

// --- Rendering Functions ---

function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    container.innerHTML = '';
    
    const filtered = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openModal(p);
        card.innerHTML = `
            <div class="product-img-wrap">
                <span class="product-badge">${p.category}</span>
                <img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/600x600?text=Product+Image'">
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <div class="product-price">₹${p.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- Modal Logic ---

function openModal(p) {
    const modalImgContainer = document.getElementById('modal-img-container');
    modalImgContainer.innerHTML = `<img src="${p.colors[0].img}" alt="${p.name}" id="main-modal-img" onerror="this.src='https://placehold.co/600x600?text=Product+Image'">`;
    
    document.getElementById('modal-cat').textContent = p.category;
    document.getElementById('modal-name').textContent = p.name;
    document.getElementById('modal-price').textContent = `₹${p.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    document.getElementById('modal-desc').textContent = p.desc;
    
    // --- WhatsApp Link Logic ---
    const phoneNumber = "917696054649"; // Added country code (91 for India)
    const message = encodeURIComponent(`Hi! I'm interested in the ${p.name} (${p.category}) priced at ₹${p.price}. Could you provide more details?`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    const inquireBtn = document.getElementById('modal-whatsapp');
    inquireBtn.href = whatsappUrl;
    // ----------------------------

    const colorBox = document.getElementById('modal-colors');
    colorBox.innerHTML = '';
    
    p.colors.forEach((c, i) => {
        const dot = document.createElement('div');
        dot.className = `color-dot ${i === 0 ? 'selected' : ''}`;
        dot.style.backgroundColor = c.hex;
        
        dot.onclick = (e) => {
            e.stopPropagation();
            document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
            dot.classList.add('selected');
            
            const mainImg = document.getElementById('main-modal-img');
            if (mainImg) {
                mainImg.src = c.img;
            }
        };
        colorBox.appendChild(dot);
    });

    document.getElementById('product-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderProducts();

    // Filter Button Clicks
    const filterContainer = document.getElementById('category-filters');
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentFilter = e.target.dataset.cat;
                renderProducts();
            }
        });
    }

    // Escape Key to Close Modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});