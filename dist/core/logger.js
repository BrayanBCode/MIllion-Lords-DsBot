"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize } = winston_1.format;
// Define colores personalizados para cada nivel de log
const customColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'cyan',
    debug: 'magenta',
};
// Agregar colores personalizados a winston
(0, winston_1.addColors)(customColors);
// Formato personalizado para los logs
const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [${level}] ${message}`;
});
// Configuración del logger
const logger = (0, winston_1.createLogger)({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    },
    level: "debug", // Cambia a 'info' en producción si quieres menos detalles
    format: combine(timestamp({ format: 'DD-MM-YYYY HH:mm' }), // " HH:mm:ss " para incluir segundos
    colorize({ all: true }), logFormat),
    transports: [
        new winston_1.transports.Console(), // Imprime en la consola con colores
        new winston_1.transports.File({ filename: 'logs/error.log' }), // Guarda errores en un archivo
        new winston_1.transports.File({ filename: 'logs/combined.log' }), // Guarda todos los logs
    ],
});
// Exporta el logger para usarlo en otras partes del proyecto
exports.default = logger;
