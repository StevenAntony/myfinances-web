export default function formatCurrency(number: number, currencyCode: string = 'PEN'): string {
    // Asegúrate de que la entrada sea un número válido
    if (typeof number !== 'number' || isNaN(number)) {
        return "Invalid Number";
    }

    // Objeto que mapea el código de moneda a su configuración regional (locale)
    // Utilizamos 'as const' para asegurar que el objeto sea inmutable y los literales de cadena sean inferidos correctamente.
    const currencyLocales = {
        'PEN': 'es-PE', // Soles Peruanos
        'USD': 'en-US', // Dólares Estadounidenses
        'EUR': 'es-ES', // Euros (España, puedes cambiar si prefieres otro país de la Eurozona)
        'GBP': 'en-GB', // Libras Esterlinas (Reino Unido)
        'JPY': 'ja-JP', // Yen Japonés
        'CAD': 'en-CA', // Dólar Canadiense
        'AUD': 'en-AU', // Dólar Australiano
        // Puedes agregar más monedas aquí según sea necesario
    } as const; // 'as const' hace que el objeto sea de solo lectura y tipado estrictamente.

    // Define un tipo para las claves válidas de currencyLocales.
    type CurrencyCode = keyof typeof currencyLocales;

    // Comprueba si el currencyCode proporcionado es una clave válida.
    // Si no lo es, se usará 'PEN' como valor predeterminado para el locale.
    const locale: string = (currencyCode in currencyLocales)
        ? currencyLocales[currencyCode as CurrencyCode] // Se hace un 'as CurrencyCode' para asegurar el tipo.
        : 'es-PE'; // Locale por defecto si la moneda no está mapeada.

    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    } catch (error) {
        // Manejo de errores si el currencyCode no es válido según Intl.NumberFormat
        console.error(`Error al formatear la moneda para ${currencyCode}:`, error);
        return `Error: Invalid Currency Code (${currencyCode})`;
    }
}