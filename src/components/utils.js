export function calcularVideosAnteriorSiguiente(informacion, nombreActual) {
    let videoAnterior = null;
    let videoSiguiente = null;
    let encontrado = false;

    for (let cIndex = 0; cIndex < informacion.length; cIndex++) {
        const categoria = informacion[cIndex];
        for (let vIndex = 0; vIndex < categoria.hijos.length; vIndex++) {
            const video = categoria.hijos[vIndex];
            if (video.nombre === nombreActual) {
                encontrado = true;
                // Si no es el primer video, el anterior es el inmediatamente previo en la misma categoría
                if (vIndex > 0) {
                    videoAnterior = categoria.hijos[vIndex - 1].nombre;
                } else if (cIndex > 0) {
                    // Si es el primer video, pero no la primera categoría, el anterior es el último de la categoría anterior
                    const categoriaAnterior = informacion[cIndex - 1];
                    videoAnterior = categoriaAnterior.hijos[categoriaAnterior.hijos.length - 1].nombre;
                }

                // Si no es el último video, el siguiente es el inmediatamente siguiente en la misma categoría
                if (vIndex < categoria.hijos.length - 1) {
                    videoSiguiente = categoria.hijos[vIndex + 1].nombre;
                } else if (cIndex < informacion.length - 1) {
                    // Si es el último video de la categoría pero no la última categoría, el siguiente es el primero de la siguiente categoría
                    videoSiguiente = informacion[cIndex + 1].hijos[0].nombre;
                }

                // Si se encontró el video, no es necesario seguir buscando
                break;
            }
        }
        // Si se encontró el video, no es necesario seguir buscando
        if (encontrado) break;
    }

    // Manejar el caso en el que es el último video de la última categoría
    if (!videoAnterior && !videoSiguiente && encontrado) {
        videoAnterior = nombreActual;
        videoSiguiente = nombreActual;
    }
    // Si uno de los dos es nulo, asignarle el valor actual
    if (!videoAnterior || !videoSiguiente) {
        videoAnterior = videoAnterior || nombreActual;
        videoSiguiente = videoSiguiente || nombreActual;
    }

    return { videoAnterior, videoSiguiente };
}
