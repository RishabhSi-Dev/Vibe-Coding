const menuItems = [
    { name: 'Veg Burger',    price: 80,  emoji: '🍔' },
    { name: 'Masala Dosa',   price: 70,  emoji: '🫓' },
    { name: 'Paneer Roll',   price: 90,  emoji: '🌯' },
    { name: 'French Fries',  price: 60,  emoji: '🍟' },
    { name: 'Veg Fried Rice',price: 100, emoji: '🍚' },
    { name: 'Pasta',         price: 120, emoji: '🍝' },
    { name: 'Cold Coffee',   price: 80,  emoji: '☕' },
    { name: 'Fresh Juice',   price: 60,  emoji: '🧃' },
    { name: 'Samosa (2 pcs)',price: 30,  emoji: '🥟' },
    { name: 'Idli Sambar',   price: 50,  emoji: '🍽' },
  ];
const grid = document.getElementById('food-grid');
menuItems.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'food-item';
    div.id = `food-${i}`;
    div.innerHTML = `
      <input type="checkbox" id="cb-${i}" value="${item.price}" data-name="${item.name}">
      <span class="food-emoji">${item.emoji}</span>
      <div class="food-name">${item.name}</div>
      <div class="food-price">₹${item.price}</div>
      <div class="food-check">✓</div>
    `;
    div.addEventListener('click', () => {
      const cb = document.getElementById(`cb-${i}`);
      cb.checked = !cb.checked;
      div.classList.toggle('selected', cb.checked);
    });
    grid.appendChild(div);
});
document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const msg = document.getElementById('delivery-msg');
      msg.textContent = `✅ You selected ${this.value}.`;
      msg.style.animation = 'none';
      void msg.offsetWidth;
      msg.style.animation = 'fadeUp 0.3s ease';
    });
});
window.onload = () => {
    document.getElementById('customer-name').focus();
};
document.getElementById('place-order-btn').addEventListener('click', function() {
    const name = document.getElementById('customer-name').value.trim();
    if (!name) {
      document.getElementById('customer-name').focus();
      document.getElementById('customer-name').style.borderColor = '#e8640c';
      setTimeout(() => document.getElementById('customer-name').style.borderColor = '', 1200);
      return;
    }
    const delivery = document.querySelector('input[name="delivery"]:checked');
    const checkboxes = document.querySelectorAll('#food-grid input[type="checkbox"]');
    let total = 0;
    let selectedNames = [];
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        total += parseInt(checkboxes[i].value);
        selectedNames.push(checkboxes[i].dataset.name);
      }
    }
    if (selectedNames.length === 0) {
      const fdMsg = document.getElementById('free-drink-msg');
      fdMsg.className = 'show more';
      fdMsg.textContent = '⚠️ Please select at least one food item!';
      return;
    }
    const fdMsg = document.getElementById('free-drink-msg');
    let freeDrinkText = '';
    if (total > 300) {
      fdMsg.className = 'show win';
      fdMsg.textContent = '🥤 You get a free drink!';
      freeDrinkText = '🥤 You get a free drink!';
    } else {
      fdMsg.className = 'show more';
      fdMsg.textContent = `➕ Add more items for a free drink! (₹${300 - total} more needed)`;
      freeDrinkText = '';
    }
    document.getElementById('p-name').textContent = name;
    document.getElementById('p-delivery').textContent = delivery ? delivery.value : 'Not selected';
    document.getElementById('p-items').textContent = selectedNames.join(', ');
    document.getElementById('p-total').textContent = `₹${total}`;
    document.getElementById('p-freedrink').textContent = freeDrinkText;
    const overlay = document.getElementById('popup-overlay');
    overlay.classList.add('show');
});
function closePopup() {
    document.getElementById('popup-overlay').classList.remove('show');
}
document.getElementById('popup-overlay').addEventListener('click', function(e) {
    if (e.target === this) closePopup();
});
function resetForm() {
    document.getElementById('customer-name').value = '';
    document.querySelectorAll('input[name="delivery"]').forEach(r => r.checked = false);
    document.getElementById('delivery-msg').textContent = '';
    document.querySelectorAll('#food-grid input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('.food-item').forEach(fi => fi.classList.remove('selected'));
    const fdMsg = document.getElementById('free-drink-msg');
    fdMsg.className = '';
    fdMsg.textContent = '';
    document.getElementById('customer-name').focus();
}