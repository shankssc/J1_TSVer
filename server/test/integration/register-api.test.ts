import request from 'supertest';
import casual from 'casual';
import { ResteMongo } from '../hooks';
import { factory } from '../factory/factory';
import { createTestServer } from '../../src/utils/TestServer';
import { RegisteringUserInput } from '@api/user';

describe('UserResolver', () => {
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

    it('Should create a new user', async () => {
        // Generating request body using random values from causal
        let body:any;
        
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

    it('Should throw an error if a user is already registered with the same email', async () => {
        
      // Seeding data for creating an existing user
      const username = casual.username;
      const email = casual.email;
      const password = casual.password;
      const role = casual.random_element(roleOptions);

      const existingUser = await factory.create('user', {username,email,password,role});

      // Generating request body using random values from casual
      const body: any = {
          username: casual.username,
          email: email,
          password: casual.password,
          randomRole: casual.random_element(roleOptions)
      }

      // Registering a user with the same email 
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
        expect(response.body.errors.length).toBeGreaterThan(0);
        expect(response.body.errors[0].message).toBe(
          `A user is already registered with the email ${email}`
        );
    })

    
})



