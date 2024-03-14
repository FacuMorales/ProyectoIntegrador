const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe("Test de RUTAS", ()=>{

    describe("GET /rickandmorty/character/:id", ()=>{
        it("Responde con status: 200", async()=>{
            const response = await agent.get('/rickandmorty/character/1');
            expect(response.statusCode).toEqual(200);
        });
        it("Responde un objeto con las propiedades: id, name, species, gender, status, origin e image", async()=>{
            const response = await agent.get('/rickandmorty/character/1');
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("name");
            expect(response.body).toHaveProperty("species");
            expect(response.body).toHaveProperty("gender");
            expect(response.body).toHaveProperty("status");
            expect(response.body).toHaveProperty("origin");
            expect(response.body).toHaveProperty("image");
        });
        it("Si hay un error responde con status: 500", async()=>{
            const response = await agent.get('/rickandmorty/character/999');
            expect(response.statusCode).toEqual(500);
        });
    });

    describe("GET /rickandmorty/login", ()=>{
        it("Debe obtener {access:TRUE} pasandole el email y password correctos", async()=>{
            const response = await agent.get('/rickandmorty/login?email=facu44515119@gmail.com&password=facu14');
            expect(response.body).toEqual({access:true});
        });
        it("Debe obtener {access:FALSE} pasandole el email y password incorrectos", async()=>{
            const response = await agent.get('/rickandmorty/login?email=hola123@gmail.com&password=hola14');
            expect(response.body).toEqual({access:false});
        });
    });

    describe("POST /rickandmorty/fav", ()=>{
        it("Debe devolver un array por body", async()=>{
            const character = await agent.get('/rickandmorty/character/1');
            const response = await agent.post('/rickandmorty/fav').send(character.body);
            expect(response.body).toBeInstanceOf(Array);
        });
        it("Debe conservar characters enviados anteriormente", async()=>{
            const character = await agent.get('/rickandmorty/character/1');
            const character2 = await agent.get('/rickandmorty/character/2');
            const response = await agent.post('/rickandmorty/fav').send(character2.body);
            expect(response.body.length).toBe(2);
            expect(response.body[0]).toEqual(character.body);
        });
    });

    describe("DELETE /rickandmorty/fav/:id", ()=>{
        it("En caso de enviar un id que NO corresponda a ningun fav, devuelve un array sin modificar",async()=>{
            const response = await agent.delete('/rickandmorty/fav/5');
            expect(response.body.length).toBe(2);
        });
        it("En caso de enviar un id que SI corresponda a un fav, devuelve un array con el character eliminado",async()=>{
            const response = await agent.delete('/rickandmorty/fav/2');
            expect(response.body.length).toEqual(1)
            expect(response.body).not.toContainEqual(expect.objectContaining({ id: 2 }));
        });
    });
});