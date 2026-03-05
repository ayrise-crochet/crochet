// ===============================
// PRODUCT DATABASE
// ===============================

const products = [
    { 
        id: 1, 
        name: "Lily of Valley", 
        category: "bagcharms", 
        price: 160,
        mrp: 200,
        offerNote: "",
        customizable: true,
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
        mrp: 160,
        offerNote: "",
        customizable: false,
        image: "rosekeychain.png", 
        colors: [
            { hex: "#d9270f", img: "rosekeychain.png" }
        ] 
    },
    { 
        id: 3, 
        name: "Mini Octopus", 
        category: "keychains", 
        price: 120,
        mrp: 120,
        offerNote: "",
        customizable: true,
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
        mrp: 120,
        offerNote: "",
        customizable: true,
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
        mrp: 150,
        offerNote: "",
        customizable: false,
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
        mrp: 160,
        offerNote: "",
        customizable: false,
        image: "sunflower.png", 
        colors: [
            { hex: "#fdf509", img: "sunflower.png" }
        ] 
    },
    { 
        id: 7, 
        name: "Miffy Keychain", 
        category: "keychains", 
        price: 170,
        mrp: 200,
        offerNote: "",
        customizable: true,
        image: "miffy.png", 
        colors: [
            { hex: "#8660d8", img: "miffy.png" }
        ] 
    }
];

let currentFilter = 'all';


// ===============================
// DISCOUNT CALCULATION
// ===============================

function calculateDiscount(mrp, price) {
    if (!mrp || mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
}


// ===============================
// RENDER PRODUCTS
// ===============================

function renderProducts() {

    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';

    const filtered = currentFilter === 'all'
        ? products
        : products.filter(p => p.category === currentFilter);

    filtered.forEach(p => {

        const discount = calculateDiscount(p.mrp, p.price);

        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openModal(p);

        card.innerHTML = `
            <div class="product-img-wrap">
                <span class="product-badge">${p.category}</span>
                <img src="${p.image}" alt="${p.name}"
                onerror="this.src='https://placehold.co/600x600?text=Product+Image'">
            </div>

            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>

                ${p.customizable 
                    ? `<div class="custom-badge">Customization Available</div>` 
                    : ''
                }

                <div class="product-price">
                    ${discount > 0 
                        ? `<span class="old-price">₹${p.mrp.toLocaleString('en-IN')}</span>` 
                        : ''
                    }
                    <span class="new-price">₹${p.price.toLocaleString('en-IN')}</span>
                    ${discount > 0 
                        ? `<span class="discount-text">${discount}% OFF</span>` 
                        : ''
                    }
                </div>

                ${p.offerNote 
                    ? `<div class="offer-note">${p.offerNote}</div>` 
                    : ''
                }
            </div>
        `;

        container.appendChild(card);
    });
}


// ===============================
// MODAL LOGIC
// ===============================

function openModal(p) {

    const discount = calculateDiscount(p.mrp, p.price);

    const modalImgContainer = document.getElementById('modal-img-container');
    modalImgContainer.innerHTML = `
        <img src="${p.colors[0].img}" 
        alt="${p.name}" 
        id="main-modal-img"
        onerror="this.src='https://placehold.co/600x600?text=Product+Image'">
    `;

    document.getElementById('modal-cat').textContent = p.category;
    document.getElementById('modal-name').textContent = p.name;

    // Remove old customization badge if exists
    const existingCustom = document.querySelector('.modal-custom');
    if (existingCustom) existingCustom.remove();

    // Add customization badge in modal
    if (p.customizable) {
        document.getElementById('modal-name')
            .insertAdjacentHTML('afterend',
            `<div class="modal-custom">Customization Available</div>`);
    }

    // Price section
    document.getElementById('modal-price').innerHTML = discount > 0
        ? `<span class="old-price">₹${p.mrp.toLocaleString('en-IN')}</span>
           <span class="new-price">₹${p.price.toLocaleString('en-IN')}</span>
           <span class="modal-discount">${discount}% OFF</span>`
        : `₹${p.price.toLocaleString('en-IN')}`;

    document.getElementById('modal-desc').textContent = p.desc || '';

    // WhatsApp Link
    const phoneNumber = "917696054649";
    const message = encodeURIComponent(
        `Hi! I'm interested in the ${p.name} (${p.category}) priced at ₹${p.price}. Could you provide more details?`
    );

    document.getElementById('modal-whatsapp').href =
        `https://wa.me/${phoneNumber}?text=${message}`;

    // Color Selection
    const colorBox = document.getElementById('modal-colors');
    colorBox.innerHTML = '';

    p.colors.forEach((c, i) => {

        const dot = document.createElement('div');
        dot.className = `color-dot ${i === 0 ? 'selected' : ''}`;
        dot.style.backgroundColor = c.hex;

        dot.onclick = (e) => {
            e.stopPropagation();
            document.querySelectorAll('.color-dot')
                .forEach(d => d.classList.remove('selected'));
            dot.classList.add('selected');

            const mainImg = document.getElementById('main-modal-img');
            if (mainImg) mainImg.src = c.img;
        };

        colorBox.appendChild(dot);
    });

    document.getElementById('product-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}


// ===============================
// CLOSE MODAL
// ===============================

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
    document.body.style.overflow = 'auto';
}


// ===============================
// EVENT LISTENERS
// ===============================

document.addEventListener('DOMContentLoaded', () => {

    renderProducts();

    const filterContainer = document.getElementById('category-filters');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {

            if (e.target.classList.contains('filter-btn')) {

                document.querySelectorAll('.filter-btn')
                    .forEach(b => b.classList.remove('active'));

                e.target.classList.add('active');
                currentFilter = e.target.dataset.cat;

                renderProducts();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});