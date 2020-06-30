import request from 'supertest';
import app from '../app';

describe('API user Test', () => {
  it('get some user', async () => {
    const idRequestResult = await request(app).get('/api/user/1');
    expect(idRequestResult.status).toEqual(200);
    const someUser = idRequestResult.body;
    expect(someUser).toHaveProperty('name');
    const allRequestResult = await request(app).get('/api/user');
    expect(allRequestResult.status).toEqual(200);
    const allUser = allRequestResult.body;
    expect(allUser).toContainEqual(someUser);
  });
});

describe('API group Test', () => {
  it('get group', async () => {
    const res = await request(app).get('/api/group/DB1-4');
    expect(res.status).toEqual(200);
    expect(res.body).toBeTruthy();
  });
});

describe('API rank Test', () => {
  it('get rank', async () => {
    const res = await request(app).get('/api/rank?team=single');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('length');
    // expect(res.body).toContain()
  });
});

describe('API scores Test', () => {
  it('post scores', async () => {
    const res = await request(app).post('/api/scores').send({
      team: 'duo',
      scores: [
        { id: 1, team: 0, score: 67 },
        { id: 2, team: 4, score: 33 },
        { id: 3, team: 3, score: 0 },
        { id: 4, team: 1, score: 30 },
        { id: 5, team: 2, score: 15 },
        { id: 6, team: 4, score: 54 },
        { id: 7, team: 3, score: 40 },
        { id: 8, team: 0, score: 32 },
        { id: 9, team: 2, score: 22 },
        { id: 10, team: 1, score: 5 },
      ],
    });
    expect(res.status).toEqual(201);
  });
});
