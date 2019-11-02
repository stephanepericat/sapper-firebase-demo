import admin from "firebase-admin";

export default async (req, res) => {
  const { idToken, csrfToken } = req.body;
  const { NODE_ENV } = process.env;
  const dev = NODE_ENV === 'development';

  if (!req.cookies || csrfToken !== req.cookies.csrfToken) {
    res.status(401).send('Unauthorized.');
    return;
  }

  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // We could also choose to enforce that the ID token auth_time is recent.
  try {
    const decodedClaims = await admin.auth().verifyIdToken(idToken);
    
    if (new Date().getTime() / 1000 - decodedClaims.auth_time < 5 * 60) {
      const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn: expiresIn });
      const options = { maxAge: expiresIn, httpOnly: true, secure: !dev };
      res.cookie('session', sessionCookie, options);
      res.json({ sessionCookie });
    }
  } catch(e) {
    res.status(401).send('Unauthorized.');
  }
}