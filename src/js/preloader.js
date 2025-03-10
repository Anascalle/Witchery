window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");
    const progress = document.querySelector(".progress");

    let width = 0;
    let interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval); // Detiene el intervalo cuando la barra llega al 100%
            
            // Esperar un poco para la animación final
            setTimeout(() => {
                preloader.style.opacity = "0"; // Efecto de desvanecimiento
                setTimeout(() => {
                    preloader.style.display = "none"; // Oculta el preloader
                    content.classList.remove("hidden"); // Muestra el contenido
                }, 200); // Tiempo extra para la opacidad
            }, 300);
            
        } else {
            width += 2; // Aumenta la barra en un 5% en cada intervalo
            progress.style.width = width + "%";
        }
    }, 200);
});
