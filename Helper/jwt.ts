import expressjwt from 'express-jwt';

export function ExpressJwt() {
  const secret: any = process.env.SECRET_KEY;
  const api = process.env.API_URL;

  return expressjwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/public\/Image(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/users(.*)/, methods: ['PUT', 'OPTIONS'] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });

  async function isRevoked(req:any, payload:any, done:any){
    if(!payload.isAdmin){
      return done(null, true);
    }
    done();
  }
}
