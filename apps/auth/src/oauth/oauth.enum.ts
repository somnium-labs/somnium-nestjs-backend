export enum OAuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  KAKAO = 'kakao',
  APPLE = 'apple',
  LINE = 'line',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
  DELETED = 'deleted',
}

export enum AuthType {
  SOCIAL_LOGIN = 'social_login',
  EMAIL_PASSWORD = 'email_password',
}
