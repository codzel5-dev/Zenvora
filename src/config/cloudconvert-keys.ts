/**
 * CloudConvert API Keys Configuration
 * 
 * ⚠️  THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD/REMOVE API KEYS
 *     File location: src/config/cloudconvert-keys.ts
 * 
 * Each key entry includes:
 *   - apiKey:       CloudConvert JWT API key (Bearer token)
 *   - clientId:     OAuth Client ID associated with this key
 *   - clientSecret: OAuth Client Secret associated with this key
 *   - redirectUrl:  OAuth Redirect URL for this application
 * 
 * When one key hits its daily limit (10 conversions/day),
 * the system automatically switches to the next key
 * ALONG WITH its corresponding Client ID and Client Secret.
 * 
 * To add a new key:
 *   1. Copy one of the existing entries below
 *   2. Replace the apiKey, clientId, clientSecret values
 *   3. Keep redirectUrl the same unless you have a different callback URL
 *   4. Save the file — the rotation system will pick it up automatically
 */

export interface CloudConvertKey {
  /** CloudConvert JWT API key (Bearer token for API calls) */
  apiKey: string;
  /** OAuth Client ID associated with this key */
  clientId: string;
  /** OAuth Client Secret associated with this key */
  clientSecret: string;
  /** OAuth Redirect URL */
  redirectUrl: string;
  /** Optional label for admin/monitoring purposes */
  label?: string;
}

/**
 * All CloudConvert API keys with their OAuth credentials.
 * 
 * Order matters: keys are used top-to-bottom.
 * When a key's daily quota (10 conversions) is exhausted,
 * the system moves to the next one automatically.
 */
export const CLOUDCONVERT_KEYS: CloudConvertKey[] = [
  {
    label: 'Key 1 (Primary)',
    apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTUxMTBkNWQ5NjBkYzUxY2Y3MjBjYzY3MWYwOGY0ODg4MGRhNjdmMzMwYjRlNGFiYjRjOWU3ZDQ0NDlhNzA5ZDEzNWZkODEyMTU0NTFkOTQiLCJpYXQiOjE3NzgyNzk4MTMuNTk4MDY3LCJuYmYiOjE3NzgyNzk4MTMuNTk4MDY4LCJleHAiOjQ5MzM5NTM0MTMuNTk0MDQ2LCJzdWIiOiI3NTQ3NDU0NyIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.d0-dRo33Jy4F-dXG--h46aprV1j4SplP67JcCX88w_PnEGnMjn-rTEH4GLCijqRi-bWKLshDuM1_2pVR4fXje0ykdSb55oNZGltTHTWPHtkGmcooaTp0WYFNX39eemJPJzRf3MeuUd0RnCdP1-BaSSrkUdH6XKo0NuD6G7ajQYD5xkDMlS8mploH1SQHi9cW0mcUMzGcaPVGZAaOw8wWOkRU3gxmTKcjMOjiTeVHT1rIVSShAbb24KP6VtqOZE8DRv8V7H4n85_RrXK0K8N9bzfK3Mx308vLViC2pIjzz_NaSUgG3MUKOL6lqKpl8x1cl7Yj9hcJv5l7JAesWIdi47HWqiM-GLBUFGyFQHf8iqKZ4neVbH3XBkyaIBYZX26BUe-oLxuGDjlAdSkwYfGnYEySMbiwzRVSteKSIbJAWdGY2wfwQwvHuNtdQMDAIejEwW84WKQqdOqjYXjRBsB7zeDPlaFYxmg9ZV5YZ2NFY-anPl0xlFENjaTSrZ9BKQ5f-0g8Zq2d3Eo6eTA0hRf_lmBrpRihXUZ0irJOKFN4KiP6WlZtNFR_qCMcNMzwkn9tFtCEY4BTYi4nj9hU2U1d0uw-DPbni8BJNnKwyBdHjjYBcFLqMOOxgDhK8v0JhL1ssmtTpMoBW1eqcRkzTBplF9ldlJfhkUEzHIVeS7qMtHU',
    clientId: '7481',
    clientSecret: 'MTg7MZ4O7FQeCV4RlzeeoyXoIKIxkYF4wa9aRCBs',
    redirectUrl: 'https://zenvoora.vercel.app/oauth/callback',
  },
  {
    label: 'Key 2',
    apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDk4N2MzMWMzMmRhZjBiOGJmYzM5OGMwZDMyZDc2YTY0MjdjOTRmNWI2Y2I0MjllY2FmNTNlZjFjMmMyODNmMjA1YTIyYmYzMmY1NTk1MTYiLCJpYXQiOjE3NzgyODI1ODkuODk2ODMzLCJuYmYiOjE3NzgyODI1ODkuODk2ODM0LCJleHAiOjQ5MzM5NTYxODkuODg3ODM0LCJzdWIiOiI3NTQ3NDY1MSIsInNjb3BlcyI6WyJ1c2VyLndyaXRlIiwidXNlci5yZWFkIiwidGFzay53cml0ZSIsInRhc2sucmVhZCIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.ev1b_FMkIhr8dffg4YSHBuIHZt3vLyDZcVw-oagHja2vZBYdZsS7BuukgOUEQqXMdh9lyBcphEZ_rMdh8Y9eVDCgxwsKdJZ5BzW36UrBVgK8D6F9wGSP5zhsvWv92Sk0wR_ONoQ8saqzkTR4lEpylhpk0krwcNiuxI3Jb-0WU6D6E1G6GbVGiqenRoGlAfWtKAXK51VBvr2hIDoSQ_4a1sJkU7MxNHKebGKtks6B7NJUf-PqQL-gXyh_0TlHK58Ch9We2-J2o1ALHkA3cS8ToMh8KnHMdReQc4cqg8AdBzCntcTmxRNq-6Np8ci4pJoqWqZ1DIdXol11qqS1wT-dV2pyEm7gPFf4dCVQAlqoR_vbyXsm8B7CBSVJt39d-FX3GnAYC2k7ZnzoYeNLs-cPc2D6ymi34KePcrgJyYYzII1MroUA7XC7SUEisFXgtNJh9TwgYi3WdupBlqhrgl5OvYlnCfKFX0qP-SsVafSQcTNigzw4mWON2IBKUbKeEwCjnTVOIAg-LfTuLkNcNtSq7bBzqBTtCw9RcCwuVG2n4l2LfXkBLEu6mmaEVpRwEfw3I7hkKLWPoSE_M5mUz3Bx-SASRzlIlh-9tqRvwZPGjujt-oZzQ6WG0X9tZ1wMLywoIg71fQCxrDUjBfVFrPduTPWlaTHqrOWv01x_dmyB3Qg',
    clientId: '7482',
    clientSecret: 'WdJUXxCDg9mkwwFl2CBl684TrC7BrpoMh7CXye3A',
    redirectUrl: 'https://zenvoora.vercel.app/oauth/callback',
  },
  // ─────────────────────────────────────────────────────────
  // ADD MORE KEYS BELOW — just copy the format above:
  //
  // {
  //   label: 'Key 3',
  //   apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGci...',
  //   clientId: 'XXXX',
  //   clientSecret: 'XXXXXXXXXXXXXXXXXXXX',
  //   redirectUrl: 'https://zenvoora.vercel.app/oauth/callback',
  // },
  // ─────────────────────────────────────────────────────────
];
