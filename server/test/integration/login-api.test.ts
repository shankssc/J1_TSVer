import request from 'supertest';
import casual from 'casual';
import { ResteMongo } from '../hooks';
import { factory } from '../factory/factory';
import { createTestServer } from '../../src/utils/TestServer';

describe('UserResolver', async () => {
    let server: Express.Application;
    const roleOptions= ['CUSTOMER', 'BUSINESS_OWNER', 'CARRIER', 'ADMINISTRATOR'];

    beforeAll(async () => {
        // Creating the test server instance
        server = await createTestServer();
    });

    afterAll( async () =>{
        // Clearing the database and closing the server after the test
        ResteMongo();
    });

    // Seeding data for creating an existing user
    const username = casual.username;
    const email = casual.email;
    const password = casual.password;
    const role = casual.random_element(roleOptions);

    const existingUser = await factory.create('user', {username,email,password,role});

    it('Should successfully log in a user with valid credentials', async () => {
        // Generating the Body
        let body:any;

        beforeEach(async () => {
            body = {
                username: username,
                password: password
            }
        })

        const response = await request(server)
        .post('/graphql')
        .send({
            query: `
                mutation {
                    signin(signInInput: {
                        username: "${body.username}",
                        password: "${body.password}"
                    }) {
                        username,
                        email,
                        token
                    }
                }
            `,
        });

        // Asserting the response data
        expect(response.status).toBe(200);
        expect(response.body.data.signin).toEqual({
            username: body.username,
            email: body.email,
            token: expect.any(String),
        });
    })
})