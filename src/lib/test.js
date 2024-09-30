require('dotenv').config();
const { Client } = require('@googlemaps/google-maps-services-js');
const ClientModel = require('../models/client.model'); // Importa tu modelo
const connectDB = require('../../db'); // Importa tu función de conexión a la base de datos

// Conexión a la base de datos
connectDB();

// API Key de Google
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// Inicializa el cliente de Google Maps
const googleMapsClient = new Client({});

// Función para buscar el ID del lugar y luego obtener sus detalles
async function findPlaceAndSave(query) {
    try {
        // Primera solicitud: Buscar el lugar por texto y obtener el place_id
        const findPlaceResponse = await googleMapsClient.findPlaceFromText({
            params: {
                input: query,
                inputtype: 'textquery',
                fields: ['place_id'],
                key: apiKey
            },
            timeout: 1000, // tiempo máximo en milisegundos
        });

        console.log('Respuesta completa de Google Places (place_id):', findPlaceResponse.data);

        if (findPlaceResponse.data.status !== 'OK') {
            console.log('Error de la API:', findPlaceResponse.data.status);
            return;
        }

        // Obtener el place_id del primer resultado
        const placeId = findPlaceResponse.data.candidates[0]?.place_id;

        if (!placeId) {
            console.log('No se encontraron lugares.');
            return;
        }

        console.log('place_id obtenido:', placeId);

        // Segunda solicitud: Obtener detalles del lugar con el place_id
        const placeDetailsResponse = await googleMapsClient.placeDetails({
            params: {
                place_id: placeId,
                fields: ['place_id', 'name', 'geometry', 'formatted_address', 'rating', 'photos', 'editorial_summary'],
                key: apiKey
            },
            timeout: 1000,
        });

        console.log('Respuesta completa de Google Places (detalles):', placeDetailsResponse.data);

        if (placeDetailsResponse.data.status !== 'OK') {
            console.log('Error de la API al obtener detalles:', placeDetailsResponse.data.status);
            return;
        }

        // Si se obtienen detalles del lugar
        const result = placeDetailsResponse.data.result;

        // Guarda el lugar en la base de datos
        const newClient = new ClientModel({
            name: result.name,
            googlePlaceId: result.place_id,
            location: {
                address: result.formatted_address,
                coordinates: [result.geometry.location.lng, result.geometry.location.lat] // Formato correcto: [lng, lat]
            },
            rating: result.rating,
            priceLevel: result.price_level || null, // Si hay información sobre el nivel de precio
            photos: result.photos ? result.photos.slice(0, 3).map(photo => ({
                photoReference: photo.photo_reference,
                width: photo.width,
                height: photo.height
            })) : [],
            editorialSummary: result.editorial_summary?.overview || 'No disponible' // Verifica si existe el campo editorial_summary
        });

        await newClient.save();
        console.log('Lugar guardado en la base de datos:', newClient);
    } catch (error) {
        console.error('Error al consultar Google Places API o guardar en la base de datos:', error);
    }
}

module.exports = findPlaceAndSave;