const contentTemplates = {
    home: `
<section class="section title" id="joinus">

<div class="imagen-header">
</div></section>

<section class="section sobre-nosotros" id="about">

    
    <div class="contenido-texto">
        <h2>Sobre Nosaltres</h2>

        <p>La "Associació Bandolers de Piera" és una nova colla de trabucaires amb arrels a la Vila de Piera. La nostra passió i missió principal és reviure i mantenir vives les tradicions del nostre poble a través d'activitats i espectacles que ens caracteritzen com a trabucaires. </p>
        <p>Creiem fermament en la importància de conservar l'esperit i l'essència de poble que ens fa únics i, per això, busquem organitzar esdeveniments que uneixin a la comunitat i promoguin la nostra cultura.</p>
        <p>Us convidem a formar part d'aquesta família i acompanyar-nos en aquesta aventura!</p>
    </div>
    <div class="imagen-sobre-nosotros">
        <img src="static/escudo_con_mesa.svg" alt="Imagen ilustrativa de trabucaires">
    </div>
        
</section>

<section class="section" id="joinus">
    <h1>Qué cal per ser Trabucaire</h1>
    <p>Si estàs interessat a formar part de la associació i unir-te com Bandoler de Piera, pots contactar amb nosaltres via Instagram i/o Correu electrònic. De totes maneres, deixem alguns dels FAQ</p>
    
    <div class="faq-item">
        <input type="checkbox" id="faq1">
        <label for="faq1">És necessària una llicència d'armes?</label>
        <div class="faq-content">
            <p>Per a la tinença d'armes de foc d'avancarrega, com els trabucs, és necessari obtenir una Autorització Especial d'Armes (Llicència AE). Aquesta autorització és concedida per la Guàrdia Civil i té un cost de 11,68 €.</p>
        </div>
    </div>
    <div class="faq-item">
        <input type="checkbox" id="faq2">
        <label for="faq2">Hi ha quota per formar part de l'associació de Bandolers de Piera?</label>
        <div class="faq-content">
            <p>No. Actualment, no hi ha una quota fixa per formar part de l'associació. No obstant això, els membres hauran d'adquirir el seu equipament de trabucaire.</p>
        </div>
    </div>
    <div class="faq-item">
        <input type="checkbox" id="faq3">
        <label for="faq3">He d'adquirir jo el trabuc? Quant costa?</label>
        <div class="faq-content">
            <p>Degut als recursos de què disposa l'associació, actualment no podem ajudar en l'adquisició del trabuc i altres equipaments, pel que l'adquisició de l'equipament corre a compte dels trabucaires.</p>
            <p>A títol orientatiu, els trabucs oscil·len entre els 800 € i 1000 € de preu, tot i que es poden trobar de segona mà a preus més econòmics.</p>
        </div>
    </div>
    <div class="faq-item">
        <input type="checkbox" id="faq4">
        <label for="faq4">Sóc menor d'edat. Puc ser trabucaire?</label>
        <div class="faq-content">
            <p>Actualment, a causa de les condicions de l'asseguradora, no podem permetre joves trabucaires menors de 18 anys. No obstant això, posa't en contacte amb nosaltres perquè puguem estudiar alternatives.</p>
        </div>
    </div>
    
</section>
    `,
    news: `
    <section class="section" id="news">
        <h1>Noticies</h1>
        <div id="noticias-container"></div>
    </section>

    `,
    default: `
        <h1>404</h1>
        <p>Página no encontrada.</p>
    `,
};




document.addEventListener("DOMContentLoaded", function() {
    function loadPage(page) {
        const appContainer = document.getElementById("app");
        const contentTemplate = contentTemplates[page] || contentTemplates.default;
        appContainer.innerHTML = contentTemplate;
        if (page === 'news') {
            cargarNoticias();
        }
    }

    // Cargar página inicial
    loadPage('home');

    // Escuchar eventos de clic en enlaces de navegación
    document.querySelectorAll("nav a").forEach(function(link) {
        link.addEventListener("click", function(e) {
            // e.preventDefault();
            const page = e.target.getAttribute("data-page");
            if (page)
                loadPage(page);
        });
    });
});
const mobileMenuButton = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenuButton.addEventListener('click', () => {
    navList.classList.toggle('active');
});


// Función para convertir el texto en formato Markdown a HTML
function markdownToHTML(text) {
    // Este es un convertidor simple. Puedes usar bibliotecas como "marked" para un procesamiento más completo.
    return text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
}

// Función para cargar noticias desde el endpoint
function cargarNoticias() {
    const noticiasContainer = document.getElementById('noticias-container');

    fetch('./noticiasmockup.json') // Reemplaza 'URL_DEL_ENDPOINT' con la URL real de tu endpoint
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.noticias && data.noticias.length > 0) {

            data.noticias.forEach(noticia => {
                const noticiaItem = document.createElement('div');
                noticiaItem.classList.add('noticia-item');

                const imgElement = document.createElement('img');
                imgElement.src = noticia.foto;
                imgElement.alt = noticia.titulo;
                imgElement.classList.add('noticia-img');

                const textElement = document.createElement('div');
                textElement.classList.add('noticia-text');
                textElement.innerHTML = `
                    <i>${noticia.fecha}</i><h2>${noticia.titulo}</h2>
                    <p>${markdownToHTML(noticia.texto)}</p>
                `;

                noticiaItem.appendChild(imgElement);
                noticiaItem.appendChild(textElement);

                noticiasContainer.appendChild(noticiaItem);
            });
        } else {
            // Si no hay noticias disponibles
            noticiasContainer.innerHTML = `
                <p>Ara com ara no hi ha notícies disponibles. Segueix-nos en les nostres xarxes socials per a mantenir-te informat!</p>
            `;
        }
    })
    .catch(error => {
        console.error('Error al cargar las noticias:', error);
        noticiasContainer.innerHTML = `
        <p>Ara com ara no hi ha notícies disponibles. Segueix-nos en les nostres xarxes socials per a mantenir-te informat!</p>
    `;
    });
}