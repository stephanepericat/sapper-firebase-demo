# sapper-firebase-demo

This demo app demonstrates how to use Firebase authentication in a [Sapper](https://sapper.svelte.dev/) application.

## Configuring the demo app

Create your project in the [Firebase
Console](https://console.firebase.google.com).

[Add Firebase to your app](https://firebase.google.com/docs/web/setup).

Enable the **Google** sign-in provider in the
**Authentication > SIGN-IN METHOD** tab.

In the root folder `./src`, create a `init.js` file.

Copy and paste the Web snippet code configuration found in the console to the `init.js` file.
You can find the snippet by clicking the "Web setup" button in the Firebase Console
Authentication page.

Ensure the application authorized domain is also whitelisted. `localhost` should already be set
as an authorized OAuth domain.

Since the application is using the Firebase Admin SDK, service account credentials will be
required. Learn more on how to [add the Firebase Admin SDK to your
server](https://firebase.google.com/docs/admin/setup).

After you generate a new private key, save it in the root folder `./src` as
`serviceAccountKeys.json`.
Make sure to keep these credentials secret and never expose them in public.

## Running the demo app

To run the demo app, run:
```bash
npm run dev
```

This will launch a local server using port 3000.
To access the app, go to [http://localhost:3000/login](http://localhost:3000/login)