export default function formatDateTime(
    dateString: string,
    targetLocale: string = 'es-PE',
    timeZone: string = 'America/Lima' // Zona horaria de Perú
): string {
    // 1. Crear un objeto Date a partir de la cadena de fecha ISO
    const date = new Date(dateString);

    // 2. Validar si la fecha es válida
    if (isNaN(date.getTime())) {
        return "Fecha inválida";
    }

    // 3. Opciones de formato para Intl.DateTimeFormat
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',    // "Lunes"
        year: 'numeric',    // "2025"
        month: 'long',      // "marzo"
        day: 'numeric',     // "23"
        timeZone: timeZone, // La zona horaria deseada
        // Puedes añadir opciones para la hora si las necesitas, por ejemplo:
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit',
        // hour12: false // Formato de 24 horas
    };

    // 4. Formatear la fecha usando Intl.DateTimeFormat
    return new Intl.DateTimeFormat(targetLocale, options).format(date);
}