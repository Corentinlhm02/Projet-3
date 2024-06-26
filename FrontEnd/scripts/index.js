let arrayData = [];
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    arrayData = data;
    console.log("Données récupérées :", arrayData);

    // Appel de la fonction pour afficher toutes les images
    displayAllImages();
  })
  .catch((err) => console.log(err));

    const sectionGallery = document.querySelector(".gallery");
    const sectionButtons = document.querySelector(".filterButtons");

    // création des boutons
    const buttonTexts = ['Tous', 'Objets', 'Appartements', 'Hotels & restaurants'];
    const buttonClasses = ['btn-tous', 'btn-objets', 'btn-appartements', 'btn-hotels-restaurants'];

    buttonTexts.forEach((text, index) => {
        const button = document.createElement('button');
        button.innerText = text;
        button.classList.add(buttonClasses[index]);
        button.id = 'btnFilter'
        sectionButtons.appendChild(button);
    });

    // fonction pour afficher toutes les images
    function displayAllImages() {
        sectionGallery.innerHTML = '';
        arrayData.forEach(project => {
            const projectContainer = document.createElement('div');
            const projectImage = document.createElement('img');
            projectImage.src = project.imageUrl;
            const projectName = document.createElement('h3');
            projectName.innerText = project.title;
            projectContainer.appendChild(projectImage);
            projectContainer.appendChild(projectName);
            sectionGallery.appendChild(projectContainer);
        });
    }

    // fonction pour filtrer les images par catégorie
    function filterImagesByCategory(category) {
        sectionGallery.innerHTML = '';
        arrayData.forEach(project => {
            if (project.category.name === category) {
                const projectContainer = document.createElement('div');
                const projectImage = document.createElement('img');
                projectImage.src = project.imageUrl;
                const projectName = document.createElement('h3');
                projectName.innerText = project.title;
                projectContainer.appendChild(projectImage);
                projectContainer.appendChild(projectName);
                sectionGallery.appendChild(projectContainer);
            }
        });
    }

    // gestionnaire d'événement pour le bouton "Tous"
    const btnTous = document.querySelector('.btn-tous');
    btnTous.addEventListener('click', displayAllImages);

    // gestionnaire d'événement pour les autres boutons
    const btnObjets = document.querySelector('.btn-objets');
    const btnAppartements = document.querySelector('.btn-appartements');
    const btnHotelsRestaurants = document.querySelector('.btn-hotels-restaurants');

    btnObjets.addEventListener('click', () => filterImagesByCategory('Objets'));
    btnAppartements.addEventListener('click', () => filterImagesByCategory('Appartements'));
    btnHotelsRestaurants.addEventListener('click', () => filterImagesByCategory('Hotels & restaurants'));

