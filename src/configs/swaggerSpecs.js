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
                        firstName: { type: 'string', default: 'jane' },
                        lastName: { type: 'string', default: 'pane' },
                        username: { type: 'string', default: 'jane_pane' },
                        email: { type: 'string', format: 'email', default: 'jane@example.com' },
                        bio: { type: 'string', default: 'From Earth' },
                        profilePicture: { type: 'string', format: 'url', default: 'https://bucket.aws.com/' },
                        password: { type: 'string', default: 'abc123' }
                    },
                    required: ['email', 'password', 'username']
                },
                LoginUser: {
                    type: 'object',
                    properties: {
                        email: { type: 'string', format: 'email', default: 'jane@example.com' },
                        password: { type: 'string', default: 'abc123', required: true }
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
                        stockSymbol: { type: 'string', default: 'AAPL' },
                        title: { type: 'string', default: 'Apple Stock Discussion' },
                        description: { type: 'string', default: 'Discussion about Apple stock performance' },
                        tags: { type: 'array', items: { type: 'string' }, default: ['tech', 'stocks'] },
                        likesCount: { type: 'integer', default: 0 },
                        createdAt: { type: 'string', format: 'date-time', default: '2023-10-01T12:00:00Z' }
                    },
                    required: ['title', 'stockSymbol', 'description']
                },
                Comment: {
                    type: 'object',
                    properties: {
                        commentId: { type: 'string', default: '1234567890' },
                        userId: { type: 'string', default: '1234567890' },
                        comment: { type: 'string', default: 'Great discussion!' },
                        createdAt: { type: 'string', format: 'date-time', default: '2023-10-01T12:00:00Z' }
                    },
                    required: ['comment', 'userId']
                },
                createPost: {
                    type: 'object',
                    properties:{
                        stockSymbol:{
                            type: 'string',
                            description: 'Stock symbol of the post',
                            default: 'AAPL',
                            minLength: 1
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the post',
                            default: 'Title Heading',
                            minLength: 3,
                            maxLength: 45
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the post',
                            default: 'Description of the post',
                            minLength: 5,
                            maxLength: 500
                        },
                        tags:{
                            type: 'array',
                            items:{
                                type: 'string',
                                default: ['Tech','Stock'],
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