import request from 'supertest';
import casual from 'casual';
import { ResteMongo } from '../hooks';
import { factory } from '../factory/factory';
import { createTestServer } from '../../src/utils/TestServer';

describe('UserResolver', () => {
    let server: Express.Application;

    beforeAll(async () => {
        // Creating the test server instance
        server = await createTestServer();
    });

    afterAll( async () =>{
        // Clearing the database and closing the server after the test
        ResteMongo();
    });

    it('Should create a new user', async () => {
        // Generating request body using random values from causal
        let body:any;
        const roleOptions= ['CUSTOMER', 'BUSINESS_OWNER', 'CARRIER', 'ADMINISTRATOR'];

        beforeEach(async () =>{
            body = {
                username: casual.username,
                email: casual.email,
                password: casual.password,
                randomRole: casual.random_element(roleOptions)
            }
        })
        
        const response = await request(server)
        .post('/graphql')
        .send({
          query: `
            mutation {
              signup(registerInput: {
                username: "${body.username}",
                email: "${body.email}",
                password: "${body.password}",
                role: "${body.randomRole}"
              }) {
                username
                email
                token
              }
            }
          `,
        });

        // Asserting the response data
        expect(response.status).toBe(200);
        expect(response.body.data.signup).toEqual({
            username: body.username,
            email: body.email,
            token: expect.any(String),
        });
    });
})



