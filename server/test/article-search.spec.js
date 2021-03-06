import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';


chai.use(chaiHttp);
describe('GET /api/v1/articles/search', () => {
  it('should return 200 for search query successfully run', async () => {
    const res = await chai.request(app)
      .get('/api/v1/articles/search?title=The wonderful world of insects');
    expect(res).to.have.status(200);
    expect(res.body.data.rows).to.be.an('array');
    expect(res.body.data.rows[0].title).to.eql('The wonderful world of insects');
    expect(res.body.data.count).to.eql(1);
  });

  it('should return 404 for search query for no item found', async () => {
    const res = await chai.request(app)
      .get('/api/v1/articles/search?tag=cow');
    expect(res).to.have.status(404);
    expect(res.body.message).to.eql('Search result not found');
  });

  it('should return 400 for search query for no query item passed', async () => {
    const res = await chai.request(app)
      .get('/api/v1/articles/search?author=&tag=&title=');
    expect(res).to.have.status(422);
    expect(res.body.message).to.eql('No search parameters inputted');
  });

  it('should return 422 when special characters are passed', async () => {
    const res = await chai.request(app)
      .get('/api/v1/articles/search?author=!!');
    expect(res).to.have.status(422);
    expect(res.body.message).to.eql('Special characters not allowed');
  });
});
