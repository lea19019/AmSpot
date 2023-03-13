Server (Node.js with Express)
1. Install Dependencies
First, you need to install the required dependencies for OAuth 2.0 authentication in Node.js:

```console
npm install express express-session passport passport-google-oauth20 dotenv
```

2. Setup .env file
Create a .env file in the root directory of your project and add the following environment variables:

```makefile
CLIENT_ID=<your_google_client_id>
CLIENT_SECRET=<your_google_client_secret>
CALLBACK_URL=http://localhost:3000/auth/google/callback
SESSION_SECRET=<your_session_secret>
```

Make sure to replace <your_google_client_id>, <your_google_client_secret>, and <your_session_secret> with your own values.

3. Implement OAuth 2.0 Authentication
Create a new file server.ts in the root directory of your project and add the following code:

```ts
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // You can add your own implementation here
      console.log(profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to home page or wherever you want
    res.redirect('/');
  }
);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

This code sets up an Express server and configures Passport.js with the Google OAuth 2.0 strategy. The passport.use() method sets up the Google OAuth 2.0 strategy with the client ID, client secret, and callback URL from the .env file. The passport.serializeUser() and passport.deserializeUser() methods serialize and deserialize the user object to and from the session. Finally, the /auth/google and /auth/google/callback routes handle the authentication flow.

4. Start the Server
To start the server, run the following command:

```
npm run dev
```

This will start the server in development mode with nodemon.

Client (Vue 3)
1. Install Dependencies
First, you need to install the required dependencies for OAuth 2.0 authentication in Vue 3:

```
npm install axios vue-google-signin-button
```

2. Create a Google API Project and Get the Client ID
Go to the Google Cloud Console and create a new project. Then, go to the Credentials page and create a new OAuth client ID. Set the authorized JavaScript origins to http://localhost:8080 and the authorized redirect URIs to http://localhost:8080/auth/callback.

Copy the client ID and replace <your_google_client_id> in the code below with the copied client ID.

3. Implement OAuth 2.0 Authentication
Create a new file src/components/Login.vue in your Vue 3 project and add the following code:

```vue
<template>
  <div>
    <h1>Login</h1>
    <google-signin-button
      :params="googleSignInParams"
      @success="onGoogleSignInSuccess"
      @failure="onGoogleSignInFailure"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import GoogleSignInButton from 'vue-google-signin-button';

export default defineComponent({
  components: {
    GoogleSignInButton,
  },
  data() {
    return {
      googleSignInParams: {
        client_id: '<your_google_client_id>',
        scope: 'email profile',
      },
    };
  },
  methods: {
    async onGoogleSignInSuccess(googleUser: any) {
      try {
        const { id_token } = googleUser.getAuthResponse();
        const res = await axios.post('/auth/login', { id_token });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    },
    onGoogleSignInFailure(error: any) {
      console.error(error);
    },
  },
});
</script>
```

This code creates a Login component with a Google Sign-In button that uses the vue-google-signin-button package. The googleSignInParams object sets the client ID and the desired scopes for the authentication flow. The onGoogleSignInSuccess method gets called when the user successfully signs in with Google. It retrieves the id_token from the googleUser object and sends it to the server using an Axios POST request to /auth/login. The onGoogleSignInFailure method gets called when there is an error during the authentication flow.

4. Configure Axios to Send Cookies
To send cookies with Axios requests, create a new file src/plugins/axios.ts in your Vue 3 project and add the following code:

```ts
import axios from 'axios';

axios.defaults.withCredentials = true;
```

This code sets the withCredentials property of Axios to true, which allows Axios to send cookies with cross-origin requests.

5. Start the Client
To start the client, run the following command:

```
npm run serve
```

This will start the client in development mode with webpack-dev-server.

That's it! You should now be able to authenticate with Google OAuth 2.0 by clicking on the login button in the Login component.