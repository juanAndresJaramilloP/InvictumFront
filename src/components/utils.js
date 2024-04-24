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


export const linkVideo = (data, nombre) => {
    
    for (let i = 0; i < data.length; i++) {
      const hijos = data[i].hijos;
      
      for (let j = 0; j < hijos.length; j++) {
       
        if (hijos[j].nombre === nombre) {
          return hijos[j].link;
        }
      }
    }

    return null;
  };

  export const IdVideo = (link) => {

    const patrones = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/
    ];
    
    
    for (let patron of patrones) {

      const coincidencia = link.match(patron);
      if (coincidencia && coincidencia.length >= 2) {
        return coincidencia[1];
      }
    }


    return null;
  };

  
export const conseguirData= () => {
    const URL = "https://raw.githubusercontent.com/davidzamora9aSyC/datosAprendizaje/main/aprendizajev2.json";
    fetch(URL)
      .then(data => data.json())
      .then(data => {
        // Función para transformar la estructura JSON en un formato manejable
        const transformData = (items) => {
          return items.map(item => {
            if (item.hijos && item.hijos.length) {
              return {
                nombre: item.nombre,
                hijos: transformData(item.hijos) // Llamada recursiva para los hijos
              };
            } else {

              return {
                nombre: item.nombre,
                link: item.link ? item.link : undefined,

              };
            }
          });
        };
        const transformedData = transformData(data);
         return transformedData;
      });}