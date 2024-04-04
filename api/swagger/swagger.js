const swaggerdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'University Project API',
            version: '1.0.0',
            description: 'University Project use description.',
        },
    },
    apis: ['./api/swagger/*.yaml'],
};

const swaggerSpec = swaggerdoc(options);

module.exports = swaggerSpec;