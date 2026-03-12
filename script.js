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
        image: "pics/pinklily.png", 
        colors: [
            { hex: "#e190e3", img: "pics/pinklily.png" }
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
        image: "pics/rosekeychain.png", 
        colors: [
            { hex: "#d9270f", img: "pics/rosekeychain.png" }
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
        image: "pics/bluocto.png", 
        colors: [
            { hex: "#3c90cc", img: "pics/bluocto.png" }
        ] 
    },
    { 
        id: 4, 
        name: "Floral scrunchie", 
        category: "hair accessories", 
        price: 100,
        mrp: 120,
        offerNote: "",
        customizable: true,
        image: "pics/scr5.png", 
        colors: [
            { hex: ["#3ba8e2", "#1049bc"], img: "pics/scr5.png" }
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
        image: "pics/rose.png", 
        colors: [
            { hex: "#d9270f", img: "pics/rose.png" }
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
        image: "pics/sunflower.png", 
        colors: [
            { hex: "#fdf509", img: "pics/sunflower.png" }
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
        image: "pics/miffy.png", 
        colors: [
            { hex: "#9d8ac2", img: "pics/miffy.png" }
        ] 
    },

    {id: 8, 
        name: "Mesh Bow Hair Clip", 
        category: "hair accessories", 
        price: 170,
        mrp: 170,
        offerNote: "",
        customizable: false,
        image: "pics/bow.png", 
        colors: [
            { hex: "#9d8ac2", img: "pics/bow.png" }
        ]
    },
    {id: 9, 
        name: "Pearl Bow Hair Clip", 
        category: "hair accessories", 
        price: 150,
        mrp: 150,
        offerNote: "",
        customizable: true,
        image: "pics/texbow.png", 
        colors: [
            { hex: "#e37edc", img: "pics/texbow.png" }
        ]
    },
    {id: 10, 
        name: "Bloom Hair Tie", 
        category: "hair accessories", 
        price: 70,
        mrp: 80,
        offerNote: "",
        customizable: true,
        image: "pics/rub4.png", 
        colors: [
            { hex: ["#faf32c"], img: "pics/rub.png"},
            {  hex: ["#8660d8"], img: "pics/rub1.png"},
            {  hex: ["#e276c4"], img: "pics/rub2.png"},
            {  hex: ["#43b0ec"], img: "pics/rub3.png"},
            {  hex: ["#ffffff"], img: "pics/rub4.png"}
        ]
    },
    {id: 11, 
        name: "Tulip Hair Clip", 
        category: "hair accessories", 
        price: 70,
        mrp: 70,
        offerNote: "",
        customizable: true,
        image: "pics/clip.png", 
        colors: [
            { hex: "#ffffff", img: "pics/clip.png" }
        ]
    },
    {id: 12, 
        name: "Scrunchie", 
        category: "hair accessories", 
        price: 150,
        mrp: 150,
        offerNote: "",
        customizable: true,
        image: "pics/scr2.png", 
        colors: [
            { hex: "#A52A2A", img: "pics/scr2.png" },
            { hex: "#f0f330", img: "pics/scr3.png" },
            { hex: ["#e6282b","#ffffff"], img: "pics/scr4.png" }
        ]
    },

    
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
        const dotFill = document.createElement('span');
        dotFill.className = 'color-dot-fill';
        const colorHexes = Array.isArray(c.hex) ? c.hex : [c.hex];
        if (colorHexes.length === 1) {
            dotFill.style.background = colorHexes[0];
        } else {
            dotFill.style.background =
                `linear-gradient(90deg, ${colorHexes[0]} 50%, ${colorHexes[1]} 50%)`;
        }
        dot.appendChild(dotFill);

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
