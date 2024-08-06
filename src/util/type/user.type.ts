export type User =
  | {
      uid: string;
      email: string;
      emailVerified: boolean;
      displayName: string;
      isAnonymous: boolean;
      providerData: [
        {
          providerId: string;
          uid: string;
          displayName: string;
          email: string;
          phoneNumber: string;
          photoURL: string;
        }
      ];
      stsTokenManager: {
        refreshToken: string;
        accessToken: string;
        expirationTime: number;
      };
      createdAt: string;
      lastLoginAt: string;
      apiKey: string;
      appName: string;
    }
  | undefined
  | null;
