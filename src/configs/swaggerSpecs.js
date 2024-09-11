import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Stock Discussion Platform's API",
            version: "1.0.0",
            description: "API for managing resources",
            contact: {
                name: "API Support",
                email: "support@example.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/v1/api",
            },
        ],
        tags: [
            {
                name: "Users",
                description: "User Authentication and Management"
            },
            {
                name: "StockPosts",
                description: "Stock Post Management"
            },
            {
                name: "Comments",
                description: "Commenting System"
            },
            {
                name: "Likes",
                description: "Like System"
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        username: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        bio: { type: 'string' },
                        profilePicture: { type: 'string', format: 'url' },
                        password: { type: 'string'}
                    },
                    required: ['email', 'password', 'username']
                },
                LoginUser: {
                    type: 'object',
                    properties: {
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', required: true }
                    },
                    required: ['email', 'password']
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        details: { type: 'array', items: { type: 'string' } }
                    }
                },
                StockPost: {
                    type: 'object',
                    properties: {
                        stockSymbol: { type: 'string'},
                        title: { type: 'string'},
                        description: { type: 'string' },
                        tags: { type: 'array', items: { type: 'string' } },
                        likesCount: { type: 'integer',  },
                        createdAt: { type: 'string', format: 'date-time'}
                    },
                    required: ['title', 'stockSymbol', 'description']
                },
                Comment: {
                    type: 'object',
                    properties: {
                        commentId: { type: 'string' },
                        userId: { type: 'string'},
                        comment: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' }
                    },
                    required: ['comment', 'userId']
                },
                createPost: {
                    type: 'object',
                    properties:{
                        stockSymbol:{
                            type: 'string',
                            description: 'Stock symbol of the post',
                            minLength: 1
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the post',
                            minLength: 3,
                            maxLength: 45
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the post',
                            minLength: 5,
                            maxLength: 500
                        },
                        tags:{
                            type: 'array',
                            items:{
                                type: 'string',
                                description: 'Tags for the post (optional)'
                            }
                        },
                    },
                    required: ['stockSymbol', 'title', 'description']
                }
            }
        }
    },
    apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;