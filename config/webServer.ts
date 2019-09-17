export default {
    allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(' '),
    port: 8000
}