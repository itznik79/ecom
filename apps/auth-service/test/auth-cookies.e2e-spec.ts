import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthController } from './../src/modules/auth/auth.controller';
import { AuthService } from './../src/modules/auth/auth.service';
import * as cookieParser from 'cookie-parser';

describe('Auth Cookies', () => {
    let app: INestApplication;
    const mockAuthService = {
        login: jest.fn().mockResolvedValue({
            access_token: 'mock_access_token',
            refresh_token: 'mock_refresh_token',
        }),
        refreshToken: jest.fn().mockResolvedValue({
            access_token: 'mock_new_access_token',
            refresh_token: 'mock_new_refresh_token',
        }),
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService, // Provide the class itself or the token used for injection
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(cookieParser());
        await app.init();
    });

    it('/auth/login (POST) should set cookies', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'test@example.com', password: 'password123' })
            .expect(201);

        const cookies = response.headers['set-cookie'];
        expect(cookies).toBeDefined();
        // Check for access_token cookie
        expect(cookies.some(c => c.includes('access_token=mock_access_token'))).toBeTruthy();
        // Check for refresh_token cookie
        expect(cookies.some(c => c.includes('refresh_token=mock_refresh_token'))).toBeTruthy();
        // Check for HttpOnly flag
        expect(cookies.some(c => c.includes('HttpOnly'))).toBeTruthy();
    });

    it('/auth/refresh (POST) should set cookies', async () => {
        const response = await request(app.getHttpServer())
            .post('/auth/refresh')
            .send({ refreshToken: 'some_refresh_token' })
            .expect(201);

        const cookies = response.headers['set-cookie'];
        expect(cookies).toBeDefined();
        expect(cookies.some(c => c.includes('access_token=mock_new_access_token'))).toBeTruthy();
        expect(cookies.some(c => c.includes('refresh_token=mock_new_refresh_token'))).toBeTruthy();
    });

    afterAll(async () => {
        await app.close();
    });
});
