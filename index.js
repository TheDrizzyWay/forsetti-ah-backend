import express from 'express';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import passport from 'passport';
import session from 'express-session';
import logger from './server/utils/logger.util';
import router from './server/routes';
import { facebookStrategy, twitterStrategy, googleStrategy } from './server/services/passport-strategies.service';
import { appPort, sessionSecret } from './server/config/variables';

const app = express();
const port = appPort || 5000;
const swaggerDocument = YAML.load(path.join(process.cwd(), './swagger.yml'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: true }));

passport.use(facebookStrategy);
passport.use(twitterStrategy);
passport.use(googleStrategy);
app.use(passport.initialize());

app.use('/api/v1', router);

app.listen(port, () => {
  logger.log('info', `Listening on port ${port}`);
});

export default app;
