const { onRequestGet, onRequestPost } = require('./_reactions_loader');

// Mock for Response class if not available in the environment
global.Response = class {
    constructor(body, init) {
        this.body = body;
        this.init = init;
        this.status = init && init.status ? init.status : 200;
        this.headers = {
            get: (name) => this.init && this.init.headers ? this.init.headers[name] : null
        };
    }
    async json() {
        return JSON.parse(this.body);
    }
};

describe('Reactions API Validation', () => {
    let mockEnv;
    let mockContext;

    beforeEach(() => {
        mockEnv = {
            REACTIONS: {
                get: jest.fn(),
                put: jest.fn(),
            },
        };
    });

    describe('onRequestGet', () => {
        test('rejects missing slug', async () => {
            mockContext = {
                request: { url: 'https://example.com/api/reactions' },
                env: mockEnv,
            };
            const response = await onRequestGet(mockContext);
            expect(response.status).toBe(400);
            const data = await response.json();
            expect(data.error).toMatch(/Invalid or missing slug/);
        });

        test('should reject invalid slug characters', async () => {
            mockContext = {
                request: { url: 'https://example.com/api/reactions?slug=invalid_slug!' },
                env: mockEnv,
            };
            const response = await onRequestGet(mockContext);
            expect(response.status).toBe(400);
        });

        test('should reject too long slug', async () => {
            const longSlug = 'a'.repeat(101);
            mockContext = {
                request: { url: `https://example.com/api/reactions?slug=${longSlug}` },
                env: mockEnv,
            };
            const response = await onRequestGet(mockContext);
            expect(response.status).toBe(400);
        });

        test('should include security headers in response', async () => {
            mockContext = {
                request: { url: 'https://example.com/api/reactions?slug=test-slug' },
                env: mockEnv,
            };
            mockEnv.REACTIONS.get.mockResolvedValue({ likes: 5, dislikes: 2 });
            const response = await onRequestGet(mockContext);
            expect(response.status).toBe(200);

            expect(response.init.headers).toMatchObject({
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'DENY',
                'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none';",
                'Referrer-Policy': 'no-referrer',
                'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
                'Content-Type': 'application/json'
            });
        });
    });

    describe('onRequestPost', () => {
        test('should reject invalid slug in body', async () => {
            mockContext = {
                request: {
                    json: jest.fn().mockResolvedValue({
                        slug: 'invalid_slug!',
                        type: 'like'
                    }),
                },
                env: mockEnv,
            };
            const response = await onRequestPost(mockContext);
            expect(response.status).toBe(400);
        });
    });
});
