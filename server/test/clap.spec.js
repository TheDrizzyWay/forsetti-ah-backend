import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
let userToken;

describe('Clap routes', () => {
  before(async () => {
    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'melanie@dara.com',
        password: 'soldier123'
      });

    userToken = userResponse.body.data.token;
  });

  describe('POST /api/v1/', () => {
    it('should successfullly clap for an article', async () => {
      const res = await chai.request(app)
        .post('/api/v1/articles/8ec9d2a8-89c0-4af5-9406-240eb9fc1746/claps')
        .set({ Authorization: `Bearer ${userToken}` });
      expect(res).to.have.status(201);
      const { clap } = res.body.data;
      expect(res.body).to.have.property('message').eql('Clap successfully created');
      expect(clap).to.have.property('id');
      expect(clap).to.have.property('articleId');
      expect(clap).to.have.property('userId');
    });
  });
});
