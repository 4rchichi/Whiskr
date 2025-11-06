const scrollContainer = document.querySelector('.scroll-container');

let scrollTimeout;

scrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault();


    clearTimeout(scrollTimeout);


    scrollContainer.scrollBy({
        left: e.deltaY,
        behavior: 'auto'
    });


    scrollTimeout = setTimeout(() => {
        scrollContainer.style.scrollBehavior = 'smooth';
        setTimeout(() => {
            scrollContainer.style.scrollBehavior = 'auto';
        }, 50);
    }, 50);

}, { passive: false });


const imageWrappers = document.querySelectorAll('.image-wrapper');
const modal = document.getElementById('breedModal');
const modalImage = document.getElementById('modalImage');
const modalBreedName = document.getElementById('modalBreedName');
const modalBreedDescription = document.getElementById('modalBreedDescription');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');


const breedData = {
    'ragdoll': {
        name: 'Ragdoll',
        description: 'The Ragdoll is an affectionate cat breed known for its striking blue eyes and silky coat. Developed in California in the 1960s, these gentle giants are famous for going limp when picked up, hence their name. They are docile, calm, and love being around people, making them perfect family pets.',
        image: '../../images/ragdoll2.jpg'
    },
    'persian': {
        name: 'Persian',
        description: 'Persian cats are one of the oldest cat breeds, originating from ancient Persia (modern-day Iran). Known for their long, luxurious coats and flat faces, they are calm, gentle, and make excellent indoor companions. They require daily grooming to maintain their beautiful fur.',
        image: '../../images/persian2.jpg'
    },
    'siamese': {
        name: 'Siamese',
        description: 'Originating from Thailand (formerly Siam), Siamese cats are highly social and vocal. They feature distinctive pointed coloration, bright blue almond-shaped eyes, and sleek bodies. Known for their intelligence and strong bonds with humans, they are often described as dog-like in their loyalty.',
        image: '../../images/siamese2.jpg'
    },
    'scottishfold': {
        name: 'Scottish Fold',
        description: 'The Scottish Fold originated in Scotland in 1961 from a barn cat named Susie. Their unique folded ears give them an owl-like appearance. They are sweet-natured, adaptable, and enjoy being around people and other pets. Their round faces and folded ears make them one of the most recognizable breeds.',
        image: '../../images/scottishfold2.jpg'
    },
    'sphynx': {
        name: 'Sphynx',
        description: 'The Sphynx breed began in Toronto, Canada in 1966. Despite appearing hairless, they have a fine layer of downy fuzz. These warm, energetic cats are extremely affectionate and love attention from their human companions. They require regular bathing to remove oil buildup on their skin.',
        image: '../../images/sphynx2.jpg'
    },
    'britishshorthair': {
        name: 'British Shorthair',
        description: 'One of Britain\'s oldest breeds, the British Shorthair is known for its chunky body, dense coat, and round face. They are calm, easygoing, and independent while still being affectionate with their families. The breed gained fame as the inspiration for the Cheshire Cat in Alice in Wonderland.',
        image: '../../images/britishshorthair2.jpg'
    },
    'burmese': {
        name: 'Burmese',
        description: 'The Burmese cat originated in Burma (now Myanmar) and was brought to the West in the 1930s. These medium-sized cats have solid, muscular builds and silky coats. They are playful, people-oriented, and maintain kitten-like energy throughout their lives. They form strong bonds with their owners.',
        image: '../../images/burmese2.jpg'
    },
    'mainecoon': {
        name: 'Maine Coon',
        description: 'Native to Maine, USA, the Maine Coon is one of the largest domestic cat breeds. With their shaggy coats, tufted ears, and bushy tails, they\'re well-adapted to harsh winters. Despite their size, they\'re gentle, friendly, and excellent mousers. Known as "gentle giants" of the cat world.',
        image: '../../images/mainecoon2.jpg'
    }
};


imageWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', function () {

        const breedNameElement = this.querySelector('.breed-name');
        const breedName = breedNameElement.textContent.trim().toLowerCase().replace(/\s+/g, '');


        const breed = breedData[breedName];

        if (breed) {

            modalImage.src = breed.image;
            modalImage.alt = breed.name;
            modalBreedName.textContent = breed.name;
            modalBreedDescription.textContent = breed.description;


            modal.classList.add('active');


            document.body.style.overflow = 'hidden';
        }
    });
});


modalClose.addEventListener('click', closeModal);


modalOverlay.addEventListener('click', closeModal);


document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalImage.src = "images/loading.png";
}
