const butterflies = [
    {
        id: 1,
        name: 'Monarch Butterfly',
        fact: 'Renowned for their incredible 3,000-mile migration from Canada to Mexico. These orange-and-black butterflies lay eggs exclusively on milkweed plants, making them crucial pollinators. Lifespan: 6-8 months.',
        image: 'images/butterfly1.png',
        source: '#'
    },
    {
        id: 2,
        name: 'Swallowtail',
        fact: 'Features distinctive tail-like extensions on hindwings. The Eastern Tiger Swallowtail can reach 5.5" wingspans. Females exhibit dark morphs to mimic poisonous Pipevine Swallowtails.',
        image: 'images/butterfly2.png',
        source: '#'
    },
    {
        id: 3,
        name: 'Blue Morpho',
        fact: 'Iridescent blue wings result from light refraction through microscopic scales. Found in Central/South American rainforests. Wingspan: 5-8". Males are more vibrant to attract mates.',
        image: 'images/butterfly3.jpg',
        source: '#'
    },
    {
        id: 4,
        name: 'Painted Lady',
        fact: 'Most widespread butterfly species (found on all continents except Antarctica). Migrates up to 9,000 miles. Caterpillars spin silk tents on host plants like thistles.',
        image: 'images/butterfly4.jpg',
        source: '#'
    },
    {
        id: 5,
        name: 'Atlas Moth',
        fact: 'Though technically a moth, has the largest wing surface area (62 sq in). Found in Southeast Asia. Adults don\'t eat - survive on fat stored during caterpillar stage.',
        image: 'images/butterfly5.jpg',
        source: '#'
    },
    {
        id: 6,
        name: 'Glasswing',
        fact: 'Transparent wings provide camouflage. Found in Central America. Toxins from flower nectar make them unpalatable to predators. Wingspan: 2.2-2.4".',
        image: 'images/butterfly6.png',
        source: '#'
    },
    {
        id: 7,
        name: 'Owl Butterfly',
        fact: 'Large eye spots resemble owl eyes to scare predators. Active at dusk. Feeds on fermented fruit. Native to South/Central American rainforests.',
        image: 'images/butterfly7.png',
        source: '#'
    },
    {
        id: 8,
        name: 'Ulysses',
        fact: 'Brilliant blue Australian butterfly. Males are territorial. Endangered due to habitat loss. Official emblem of Queensland tourism.',
        image: 'images/butterfly8.png',
        source: '#'
    },
    {
        id: 9,
        name: 'Red Admiral',
        fact: 'Aggressive fliers that chase intruders. Migrates from North Africa to Europe. Feeds on fermenting fruit. Wingspan: 2.75-3".',
        image: 'images/butterfly9.png',
        source: '#'
    },
    {
        id: 10,
        name: 'Peacock',
        fact: 'Vivid eye-spots ward off predators. Hibernates during winter. Common in European gardens. Larvae feed on nettles.',
        image: 'images/butterfly10.png',
        source: '#'
    },
    {
        id: 11,
        name: 'Zebra Longwing',
        fact: 'Florida\'s state butterfly. Eats pollen (unusual for butterflies). Lives up to 6 months. Black-and-yellow striped pattern warns predators.',
        image: 'images/butterfly11.png',
        source: '#'
    },
    {
        id: 12,
        name: 'Cabbage White',
        fact: 'First butterfly species found in North America (1600s). Considered agricultural pest. Males have one black wing spot, females two.',
        image: 'images/butterfly12.png',
        source: '#'
    },
    {
        id: 13,
        name: 'Mourning Cloak',
        fact: 'Lives 10-11 months - longest North American species. Hibernates under bark. Feeds on tree sap. Wing edges resemble mourning veils.',
        image: 'images/butterfly13.png',
        source: '#'
    },
    {
        id: 14,
        name: 'Common Buckeye',
        fact: 'Multiple large eyespots confuse predators. Prefers open areas. Host plants include snapdragons. Migrates south for winter.',
        image: 'images/butterfly14.png',
        source: '#'
    },
    {
        id: 15,
        name: 'Viceroy',
        fact: 'Famous for mimicking Monarchs (Batesian mimicry). Has black line across hindwings to distinguish from Monarchs. Eats willow leaves.',
        image: 'images/butterfly15.png',
        source: '#'
    }
];
// System Variables
let currentScene = 'jungle';
let collected = JSON.parse(localStorage.getItem('collected')) || [];
let spawnInterval;
const butterflyElements = new Set();

// Butterfly Creation
function createButterfly(butterfly) {
    const elem = document.createElement('img');
    elem.src = butterfly.image;
    elem.className = 'butterfly';
    elem.dataset.id = butterfly.id;
    elem.style.left = `${Math.random() * 85 + 5}%`;
    elem.style.top = `${Math.random() * 85 + 5}%`;
    
    // Random flight pattern
    elem.style.setProperty('--float-height', `${Math.random() * 50 + 25}px`);
    elem.style.animation = `float ${Math.random() * 2 + 3}s infinite ease-in-out`;

    elem.addEventListener('click', () => handleButterflyClick(butterfly, elem));
    return elem;
}

// Click Handler
function handleButterflyClick(butterfly, elem) {
    if (!collected.some(b => b.id === butterfly.id)) {
        collected.push(butterfly);
        localStorage.setItem('collected', JSON.stringify(collected));
        updateCollectionModal();
    }
    
    elem.style.opacity = '0';
    setTimeout(() => elem.remove(), 500);
    butterflyElements.delete(elem);
}

// Spawning System
function spawnButterfly() {
    if (butterflyElements.size >= 10) return;
    
    const butterfly = butterflies[Math.floor(Math.random() * butterflies.length)];
    const elem = createButterfly(butterfly);
    document.getElementById('butterfly-container').appendChild(elem);
    butterflyElements.add(elem);

    // Auto-remove after 45 seconds
    setTimeout(() => {
        if (elem.parentElement) {
            elem.style.opacity = '0';
            setTimeout(() => elem.remove(), 500);
            butterflyElements.delete(elem);
        }
    }, 45000);
}

// Scene Management
document.getElementById('toggle-scene').addEventListener('click', () => {
    currentScene = currentScene === 'jungle' ? 'plains' : 'jungle';
    document.getElementById('jungle-scene').style.display = currentScene === 'jungle' ? 'block' : 'none';
    document.getElementById('plains-scene').style.display = currentScene === 'plains' ? 'block' : 'none';
});

// Collection Modal
function updateCollectionModal() {
    const content = document.getElementById('collected-butterflies');
    content.innerHTML = collected.map(b => `
        <div class="collection-item">
            <img src="${b.image}" alt="${b.name}" width="120">
            <h3>${b.name}</h3>
            <p>${b.fact}</p>
            ${b.source ? `<small><a href="${b.source}" target="_blank">Image Source</a></small>` : ''}
        </div>
    `).join('');
}

document.getElementById('open-book').addEventListener('click', () => {
    const modal = document.getElementById('book-modal');
    modal.style.display = 'block';
    updateCollectionModal();
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('book-modal').style.display = 'none';
});

window.onclick = (e) => {
    if (e.target === document.getElementById('book-modal')) {
        document.getElementById('book-modal').style.display = 'none';
    }
};

// Initialize
function init() {
    // Start spawner
    spawnInterval = setInterval(spawnButterfly, 8000);
    // Initial spawn
    setTimeout(() => {
        spawnButterfly();
        spawnButterfly();
    }, 1000);
}

// Start the experience
init();