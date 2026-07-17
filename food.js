// Each product card has its own .decrease, .count, .increase buttons.
// We loop over every card and wire up its buttons individually,
// instead of relying on getElementById (which only ever finds the FIRST match).

document.querySelectorAll('.product-card').forEach(card => {
    const countDisplay = card.querySelector('.count');
    const increaseBtn = card.querySelector('.increase');
    const decreaseBtn = card.querySelector('.decrease');

    let count = 0;

    function updateDisplay() {
        countDisplay.textContent = count;
        updateTotal();
    }

    increaseBtn.addEventListener('click', () => {
        count++;
        updateDisplay();
    });

    decreaseBtn.addEventListener('click', () => {
        if (count > 0) {
            count--;
            updateDisplay();
        }
    });
});


function updateTotal() {
    const cards = document.querySelectorAll('.product-card');

    const total = Array.from(cards).reduce((sum, card) => {
        const price = Number(card.dataset.price);
        const count = Number(card.querySelector('.count').textContent);
        return sum + price * count;
    }, 0);

    const totalItems = Array.from(cards).reduce((sum, card) => {
        return sum + Number(card.querySelector('.count').textContent);
    }, 0);

    document.getElementById('total-price').textContent = `$${total}`;

    const totalSection = document.getElementById('total-section');
    if (totalItems > 0) {
        totalSection.classList.remove('hidden');
    } else {
        totalSection.classList.add('hidden');
    }
}

// Copying state without mutating it (huge in React, but applies anywhere)