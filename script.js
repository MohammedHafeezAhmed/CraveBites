// --- SUPABASE DATABASE CONNECTION ---
const supabaseUrl = 'https://fkpjtjsaoqimhdkudcpj.supabase.co';
const supabaseKey = 'sb_publishable_a-G7SNvFqJIgkUTW0Ux1nA_R7yu0rIW';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// --- 1. MOCK MENU DATA (EXACTLY 40 Items, 6 Restaurants) ---
const rawMenuData = [
    // Truffles
    { id: 1, res: "Truffles", dist: 2, name: "Cheese Burger", price: 220, measure: "1 pc", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
    { id: 2, res: "Truffles", dist: 2, name: "Peri Fries", price: 150, measure: "200g", img: "https://cdn.uengage.io/uploads/64261/image-591513-1754044989.jpeg" },
    { id: 3, res: "Truffles", dist: 2, name: "Cold Coffee", price: 130, measure: "350ml", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
    { id: 4, res: "Truffles", dist: 2, name: "Chicken Steak", price: 310, measure: "1 plate", img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80" },
    { id: 5, res: "Truffles", dist: 2, name: "Brownie Bomb", price: 180, measure: "1 pc", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80" },
    { id: 6, res: "Truffles", dist: 2, name: "Penne Pasta", price: 240, measure: "400g", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80" },
    { id: 7, res: "Truffles", dist: 2, name: "Loaded Nachos", price: 190, measure: "1 plate", img: "https://images.unsplash.com/photo-1513442542250-854d436a73f2?w=400&q=80" },

    // Meghana
    { id: 8, res: "Meghana", dist: 4, name: "Chicken Biryani", price: 350, measure: "1 kg", img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&q=80" },
    { id: 9, res: "Meghana", dist: 4, name: "Paneer 65", price: 240, measure: "250g", img: "https://spoorthycuisine.com/wp-content/uploads/2020/09/Adobe-premier-project-matar-paneer.png" },
    { id: 10, res: "Meghana", dist: 4, name: "Mutton Biryani", price: 450, measure: "1 kg", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80" },
    { id: 11, res: "Meghana", dist: 4, name: "Chilli Chicken", price: 280, measure: "300g", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80" },
    { id: 12, res: "Meghana", dist: 4, name: "Lemon Soda", price: 80, measure: "300ml", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80" },
    { id: 13, res: "Meghana", dist: 4, name: "Chicken Tikka", price: 310, measure: "6 pcs", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTuEVgyCoQuyOy1TmMJAyScneGDyRxhVaX8g&s" },
    { id: 14, res: "Meghana", dist: 4, name: "Fish Fry", price: 380, measure: "2 pcs", img: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&q=80" },

    // Leon
    { id: 15, res: "Leon", dist: 7, name: "Jumbo Wrap", price: 180, measure: "1 pc", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEBSM6KKQIPFaimb12OKaPIJW107Jz4i96Nw&s" },
    { id: 16, res: "Leon", dist: 7, name: "Doner Kebab", price: 210, measure: "1 pc", img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80" },
    { id: 17, res: "Leon", dist: 7, name: "Fried Wings", price: 260, measure: "6 pcs", img: "https://images.unsplash.com/photo-1562967914-01efa7e87832?w=400&q=80" },
    { id: 18, res: "Leon", dist: 7, name: "Spicy Wedges", price: 140, measure: "200g", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" },
    { id: 19, res: "Leon", dist: 7, name: "Choco Shake", price: 150, measure: "400ml", img: "https://sugarbowlbakery.com/cdn/shop/articles/browniemilkshake3_719x.png?v=1653508260" },
    { id: 20, res: "Leon", dist: 7, name: "Chicken Popcorn", price: 160, measure: "250g", img: "https://images.unsplash.com/photo-1562967914-01efa7e87832?w=400&q=80" },
    { id: 21, res: "Leon", dist: 7, name: "Grilled Salad", price: 190, measure: "1 bowl", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },

    // Dominos
    { id: 22, res: "Dominos", dist: 3, name: "Margherita Pizza", price: 250, measure: "Medium", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80" },
    { id: 23, res: "Dominos", dist: 3, name: "Pepperoni Pizza", price: 390, measure: "Large", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
    { id: 24, res: "Dominos", dist: 3, name: "Garlic Bread", price: 140, measure: "4 pcs", img: "https://pbs.twimg.com/media/E5H6esFUYAATwXN.png" },
    { id: 25, res: "Dominos", dist: 3, name: "Choco Lava", price: 110, measure: "1 pc", img: "https://static.wixstatic.com/media/965697_839b240814d3434d9f7d1d7e7200fcbd~mv2.png/v1/fill/w_555,h_394,al_c,q_85,enc_avif,quality_auto/965697_839b240814d3434d9f7d1d7e7200fcbd~mv2.png" },
    { id: 26, res: "Dominos", dist: 3, name: "Cheese Dip", price: 30, measure: "50g", img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&q=80" },
    { id: 27, res: "Dominos", dist: 3, name: "Veg Extravaganza", price: 450, measure: "Large", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&q=80" },
    { id: 28, res: "Dominos", dist: 3, name: "Zingy Parcel", price: 60, measure: "1 pc", img: "https://www.jagranimages.com/images/newimg/11052025/11_05_2025-zingy_parcel_23935665.webp" },

    // KFC
    { id: 29, res: "KFC", dist: 8, name: "Zinger Burger", price: 190, measure: "1 pc", img: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=400&q=80" },
    { id: 30, res: "KFC", dist: 8, name: "Chicken Bucket", price: 550, measure: "8 pcs", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80" },
    { id: 31, res: "KFC", dist: 8, name: "Popcorn Chicken", price: 160, measure: "Medium", img: "https://images.unsplash.com/photo-1562967914-01efa7e87832?w=400&q=80" },
    { id: 32, res: "KFC", dist: 8, name: "Krushers", price: 120, measure: "350ml", img: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&q=80" },
    { id: 33, res: "KFC", dist: 8, name: "Chicken Strips", price: 210, measure: "4 pcs", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThh91w1glOYO_gke9JDA_ZdExlOudWTF6UkQ&s" },
    { id: 34, res: "KFC", dist: 8, name: "Rice Bowl", price: 180, measure: "1 bowl", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrB3RWPhrJt9DBuXbJpXzMkejiHxyZ8azFIA&s" },

    // Subway
    { id: 35, res: "Subway", dist: 6, name: "Paneer Tikka Sub", price: 210, measure: "6 inch", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Yugtr0lbUPugLBukHXDzBuROm9Vf_qwbcQ&s" },
    { id: 36, res: "Subway", dist: 6, name: "Chicken Slice Sub", price: 250, measure: "Footlong", img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80" },
    { id: 37, res: "Subway", dist: 6, name: "Veggie Salad", price: 180, measure: "1 bowl", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
    { id: 38, res: "Subway", dist: 6, name: "Oatmeal Cookie", price: 50, measure: "1 pc", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80" },
    { id: 39, res: "Subway", dist: 6, name: "Diet Coke", price: 60, measure: "300ml", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
    { id: 40, res: "Subway", dist: 6, name: "Aloo Patty Sub", price: 160, measure: "6 inch", img: "https://t3.ftcdn.net/jpg/07/58/35/20/360_F_758352039_Xd31bsIdDaVXoyZjBe8EoKD9FdxxvLeb.jpg" }
];

let currentMenu = [...rawMenuData];
let isLocationDetected = false;

// Cart remains in local storage temporarily until checkout
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cart = cart.filter(item => item.price && item.quantity > 0 && !isNaN(item.price)); 
if (cart.length === 0) localStorage.removeItem('cart');

let userDetails = JSON.parse(localStorage.getItem('userDetails')) || { name: "", address: "" };

// --- 2. INITIALIZATION ---
window.onload = () => { 
    injectBrandLogos();
    renderMenu(); 
    updateCartUI(); 
    updateUserUI();
    updateDatabaseView(); 
};

function navigate(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    updateDatabaseView();
}

function showToast(msg, isError = false) {
    const t = document.getElementById('toast');
    t.innerText = msg; t.className = `toast show ${isError ? 'error' : ''}`;
    setTimeout(() => t.className = 'toast hidden', 3000);
}

// Transparent Backgrounds Logos
function injectBrandLogos() {
    const reliableLogos = [
        "https://cdn.worldvectorlogo.com/logos/kfc-2.svg",
        "https://cdn.worldvectorlogo.com/logos/domino-s-pizza-3.svg",
        "https://cdn.worldvectorlogo.com/logos/subway-12.svg",
        "https://cdn.worldvectorlogo.com/logos/pizza-hut.svg",
        "https://cdn.worldvectorlogo.com/logos/mcdonalds-7.svg",
        "https://cdn.worldvectorlogo.com/logos/burger-king-4.svg",
        "https://cdn.worldvectorlogo.com/logos/tacobell.svg",
        "https://www.vectorlogo.zone/logos/starbucks/starbucks-ar21.svg"
    ];
    
    const container = document.getElementById('brand-logos-container');
    const allLogos = [...reliableLogos, ...reliableLogos, ...reliableLogos]; 
    
    let html = '';
    allLogos.forEach(url => {
        html += `<div class="brand-image-box"><img src="${url}" alt="Brand Logo"></div>`;
    });
    container.innerHTML = html;
}

// --- 3. LOCATION SHUFFLING ---
function requestLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            () => {
                userDetails.address = "Indiranagar, Bengaluru, Karnataka";
                localStorage.setItem('userDetails', JSON.stringify(userDetails));
                updateUserUI();
                
                const locSpan = document.getElementById('detected-location-span');
                locSpan.style.display = 'inline-block';
                locSpan.innerText = "📍 Detected: Indiranagar, Bengaluru";
                
                isLocationDetected = true;
                currentMenu = [...rawMenuData].sort(() => Math.random() - 0.5);
                document.getElementById('proximity-badge').classList.remove('hidden');
                
                renderMenu();
                showToast("Location detected! Showing restaurants within 5km.");
            },
            () => showToast("Location access denied.", true)
        );
    }
}

// --- 4. USER DETAILS ---
function openAddressModal() {
    document.getElementById('user-name').value = userDetails.name;
    document.getElementById('user-address').value = userDetails.address;
    document.getElementById('address-modal').classList.remove('hidden');
}

function closeAddressModal() { document.getElementById('address-modal').classList.add('hidden'); }

function saveAddress() {
    const name = document.getElementById('user-name').value.trim();
    const address = document.getElementById('user-address').value.trim();
    if(!name || !address) return showToast("Please fill all fields", true);
    userDetails = { name, address };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    updateUserUI(); closeAddressModal(); showToast("Address saved!");
}

function updateUserUI() {
    document.getElementById('nav-address-text').innerText = userDetails.address ? userDetails.address.substring(0, 15) + "..." : "Add Address";
    document.getElementById('checkout-name').innerText = userDetails.name || "Not provided";
    document.getElementById('checkout-address').innerText = userDetails.address || "Not provided";
    updateDatabaseView();
}

// --- 5. MENU & QUANTITY LOGIC ---
function renderMenu() {
    const filter = document.getElementById('restaurant-select').value;
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    
    let displayMenu = currentMenu;
    if (isLocationDetected) displayMenu = displayMenu.filter(m => m.dist <= 5);
    if (filter !== 'all') displayMenu = displayMenu.filter(m => m.res === filter);
    
    displayMenu.forEach(item => {
        const cartItem = cart.find(c => c.id === item.id);
        const qty = cartItem ? cartItem.quantity : 0;

        let btnHTML = qty > 0 
            ? `<div class="qty-controls">
                 <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                 <strong style="font-size:1.1rem; width:20px;">${qty}</strong>
                 <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
               </div>`
            : `<button class="primary-btn" style="width:100%" onclick="updateQty(${item.id}, 1)">ADD TO CART</button>`;

        container.innerHTML += `
            <div class="menu-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="menu-info">
                    <div class="menu-text">
                        <span class="measure-badge">${item.measure}</span> <small style="color:#666;">${item.res}</small>
                        <h3>${item.name}</h3>
                        <p class="price">₹${item.price}</p>
                    </div>
                    ${btnHTML}
                </div>
            </div>`;
    });
}

function updateQty(id, delta) {
    let itemIndex = cart.findIndex(c => c.id === id);
    if (itemIndex === -1 && delta > 0) {
        let baseItem = rawMenuData.find(m => m.id === id);
        cart.push({...baseItem, quantity: 1});
    } else if (itemIndex !== -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    renderMenu(); 
}

// --- 6. CART & CHECKOUT UI ---
function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length; 
    const cartDiv = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p style="color:#666; text-align:center;">Your cart is empty.</p>';
        document.getElementById('bill-subtotal').innerText = "0";
        document.getElementById('bill-delivery').innerText = "0";
        document.getElementById('bill-gst').innerText = "0";
        document.getElementById('cart-total').innerText = "0";
        return;
    }

    let html = '', subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        html += `
            <div class="cart-item-row">
                <div>
                    <p><b>${item.name}</b></p>
                    <small>${item.res} | ₹${item.price} x ${item.quantity}</small>
                </div>
                <div class="cart-qty-ctrl">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                    <strong style="width:50px; text-align:right;">₹${itemTotal}</strong>
                </div>
            </div>`;
        subtotal += itemTotal;
    });
    
    const deliveryFee = 40; 
    const gst = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + deliveryFee + gst;

    cartDiv.innerHTML = html;
    
    document.getElementById('bill-subtotal').innerText = subtotal;
    document.getElementById('bill-delivery').innerText = deliveryFee;
    document.getElementById('bill-gst').innerText = gst;
    document.getElementById('cart-total').innerText = grandTotal;
    
    document.getElementById('qr-image').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=cravebites@upi&pn=CraveBites&am=${grandTotal}`;
    updateDatabaseView();
}

let isPaid = false;
function togglePaymentUI() {
    const method = document.getElementById('payment-method').value;
    isPaid = false;
    document.getElementById('payment-status').innerText = "Awaiting Scan...";
    document.getElementById('payment-status').style.color = "#f59e0b";
    document.getElementById('upi-section').classList.toggle('hidden', method !== 'upi');
}

function simulateScan() {
    if (cart.length === 0) return;
    const status = document.getElementById('payment-status');
    status.innerText = "Processing scan...";
    setTimeout(() => { status.innerText = "✅ Payment Successful!"; status.style.color = "#10b981"; isPaid = true; }, 1500);
}

// --- 7. LIVE DATABASE INSERTS (SUPABASE API) ---
async function placeOrder() {
    if (cart.length === 0) return showToast("Cart is empty!", true);
    if (!userDetails.name || !userDetails.address) { showToast("Please provide delivery details!", true); return openAddressModal(); }
    const method = document.getElementById('payment-method').value;
    if (method === 'upi' && !isPaid) return showToast("Please click QR to simulate payment.", true);

    const btn = document.getElementById('place-order-btn');
    btn.innerText = "Writing to Database...";
    btn.disabled = true;

    const grandTotal = parseInt(document.getElementById('cart-total').innerText);
    const generatedOrderId = "CB" + Date.now().toString().slice(-6);

    try {
        // Step 1: Insert User into DB (Columns forced lowercase to match Postgres defaults)
        const { data: userData, error: userError } = await supabaseClient
            .from('users')
            .insert([{ fullname: userDetails.name, address: userDetails.address }])
            .select();
        if (userError) throw userError;
        
        const currentUserId = userData[0].userid;

        // Step 2: Insert Order into DB
        const { error: orderError } = await supabaseClient
            .from('orders')
            .insert([{
                orderid: generatedOrderId,
                userid: currentUserId,
                totalamount: grandTotal,
                paymentmethod: method.toUpperCase(),
                paymentstatus: method === 'upi' ? 'PAID' : 'PENDING'
            }]);
        if (orderError) throw orderError;

        // Step 3: Insert Cart Items into OrderDetails DB
        const orderDetailsArray = cart.map(item => ({
            orderid: generatedOrderId,
            itemid: item.id,
            quantity: item.quantity
        }));
        
        const { error: detailsError } = await supabaseClient
            .from('orderdetails')
            .insert(orderDetailsArray);
        if (detailsError) throw detailsError;

        // Clean up UI on Success
        cart = []; localStorage.removeItem('cart');
        updateCartUI(); renderMenu(); togglePaymentUI();
        
        document.getElementById('success-name').innerText = userDetails.name;
        document.getElementById('success-modal').classList.remove('hidden');
        setTimeout(() => { document.getElementById('success-modal').classList.add('hidden'); navigate('home'); }, 4000);

    } catch (dbError) {
        console.error("Supabase Error:", dbError);
        showToast("Database connection failed. Check console.", true);
    } finally {
        btn.innerText = "Confirm Order";
        btn.disabled = false;
    }
}

// --- 8. LIVE DATABASE VIEWER ---
async function updateDatabaseView() {
    document.getElementById('db-user-output').innerText = userDetails.name ? JSON.stringify(userDetails, null, 4) : "No user data.";
    document.getElementById('db-cart-output').innerText = cart.length ? JSON.stringify(cart, null, 4) : "No active session.";

    // Fetch live orders directly from Supabase to prove backend connectivity
    document.getElementById('db-orders-output').innerText = "Fetching live from Supabase...";
    
    try {
        const { data: dbOrders, error } = await supabaseClient.from('orders').select('*');
        if (error) throw error;
        
        if (dbOrders && dbOrders.length > 0) {
            document.getElementById('db-orders-output').innerText = JSON.stringify(dbOrders, null, 4);
        } else {
            document.getElementById('db-orders-output').innerText = "Database connected. No orders placed yet.";
        }
    } catch (err) {
        document.getElementById('db-orders-output').innerText = "Error fetching live database: Check console or API Keys.";
    }
}

function clearDatabase() {
    localStorage.clear(); cart = []; userDetails = {name: "", address: ""};
    document.getElementById('detected-location-span').style.display = 'none';
    isLocationDetected = false; currentMenu = [...rawMenuData];
    updateCartUI(); updateUserUI(); renderMenu(); showToast("Local Session Cleared", true);
}
