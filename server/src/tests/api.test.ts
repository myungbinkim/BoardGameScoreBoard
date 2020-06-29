import request from 'supertest';
import app from '../app';
import { User } from 'user';

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
  it('pose scores', async () => {
    const res = await request(app).post('/api/scores?date=20200601').send({
      'team-list': [
        { members: ['주현', '숭'] },
        { members: ['성우', '상현'] },
        { members: ['명빈', '태윤'] },
        { members: ['희정', '주호'] },
        { members: ['우진', '종찬'] },
      ],
      'score-list': [
        { name: '주현', score: 67 },
        { name: '숭', score: 33 },
        { name: '성우', score: 0 },
        { name: '상현', score: 30 },
        { name: '명빈', score: 15 },
        { name: '태윤', score: 54 },
        { name: '희정', score: 40 },
        { name: '주호', score: 32 },
        { name: '우진', score: 22 },
        { name: '종찬', score: 5 },
      ],
    });
    expect(res.status).toEqual(201);
  });
});
