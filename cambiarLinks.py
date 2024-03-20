import json

# La ruta al archivo JSON en tu PC
archivo_json = r'C:\Users\USUARIO\Downloads\aprendizaje.json'

# Suponiendo que tienes una lista de nuevos enlaces
nuevos_enlaces = [
    "https://www.youtube.com/watch?v=KNtJGQkC-WI&list=PL4fGSI1pDJn77aK7sAW2AT0oOzo5inWY8&index=1",
    "https://www.youtube.com/watch?v=Kzq15y2J4UM",
    "https://www.youtube.com/watch?v=1lyu1KKwC74",
    "https://www.youtube.com/watch?v=RVmG_d3HKBA",
    "https://www.youtube.com/watch?v=r7qovpFAGrQ",
    "https://www.youtube.com/watch?v=Kt-tLuszKBA",
    "https://www.youtube.com/watch?v=sDcRCHXQ9gs&t=2042s",
    "https://www.youtube.com/watch?v=qIOYw9Yx0N8",
    "https://www.youtube.com/watch?v=cD5T1Y4b7wA",
    "https://www.youtube.com/watch?v=ZA7ZKB8Mo9k",
    "https://www.youtube.com/watch?v=MwpMEbgC7DA",
    "https://www.youtube.com/watch?v=2-0BTCemezo",
    "https://www.youtube.com/watch?v=WC5eZbGGqZ4",
    "https://www.youtube.com/watch?v=9Sc-ir2UwGU",
    "https://www.youtube.com/watch?v=1G4isv_Fylg",
    "https://www.youtube.com/watch?v=jGflUbPQfW8",
    "https://www.youtube.com/watch?v=EkHTsc9PU2A",
    "https://www.youtube.com/watch?v=FTQbiNvZqaY",
    "https://www.youtube.com/watch?v=djV11Xbc914",
    "https://www.youtube.com/watch?v=ilw-qmqZ5zY",

]

# Función para reemplazar los enlaces en el JSON, con manejo adecuado del índice i
def reemplazar_enlaces(datos, nuevos_links):
    i = 0  # Índice para iterar sobre los nuevos enlaces
    if not nuevos_links:
        print("La lista de nuevos enlaces está vacía.")
        return

    for item in datos:
        if 'hijos' in item:
            for hijo in item['hijos']:
                hijo['link'] = nuevos_links[i % len(nuevos_links)]
                i += 1
        else:
            print("Formato no esperado en el JSON.")
            return
    print("Todos los enlaces han sido reemplazados exitosamente, reiniciando con el primer enlace si es necesario.")



try:
    # Intentar leer el archivo JSON original
    with open(archivo_json, 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Reemplazar los enlaces
    reemplazar_enlaces(data, nuevos_enlaces)

    # Guardar el archivo JSON con los enlaces actualizados en aprendizajev2.json
    with open('aprendizajev2.json', 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)

    print("Archivo 'aprendizajev2.json' guardado con éxito.")
except Exception as e:
    print(f"Error al abrir o trabajar con el archivo: {e}")