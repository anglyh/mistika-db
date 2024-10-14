// const mongoose = require("mongoose");

// const restaurantSchema = new mongoose.Schema(
//   {
//     title: { type: String, maxLength: 100, required: true },  // Título del restaurante
//     description: { type: String, maxLength: 500, required: true },  // Descripción del restaurante
//     location: {
//       address: { type: String, required: true },  // Dirección del restaurante
//       coordinates: {
//         type: [Number],  // Coordenadas geográficas (latitud, longitud)
//         required: true,
//         index: "2dsphere",  // Índice geoespacial para consultas de cercanía
//       },
//     },
//     imageUri: { type: String, required: true },  // URL de la imagen del restaurante
//     reviews: [
//       {
//         user: { type: String, required: true },  // Nombre del usuario que deja la reseña
//         comment: { type: String, maxLength: 500 },  // Comentario del usuario
//         rating: { type: Number, min: 1, max: 5, required: true },  // Calificación del restaurante (1 a 5 estrellas)
//       }
//     ],
//     menu: [
//       {
//         dishName: { type: String, required: true },  // Nombre del platillo
//         price: { type: Number, required: true },  // Precio del platillo
//         description: { type: String, maxLength: 300 },  // Descripción del platillo (opcional)
//       }
//     ],
//   },
//   { timestamps: true }  // Registra las fechas de creación y actualización
// );

// module.exports = mongoose.model("Restaurant", restaurantSchema);
