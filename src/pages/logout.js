export default async (req, res) => {
  // Clear cookie.
  const sessionCookie = req.cookies.session || '';
  res.clearCookie('session');
  // Revoke session too. Note this will revoke all user sessions.
  if (sessionCookie) {
    try {
      const decodecClaims = admin.auth().verifySessionCookie(sessionCookie, true);
      await admin.auth().revokeRefreshTokens(decodedClaims.sub);
      res.redirect('/login');
    } catch(e) {
      res.redirect('/login');
    }
  } else {
    // Redirect to login page when no session cookie available.
    res.redirect('/login');
  }
}