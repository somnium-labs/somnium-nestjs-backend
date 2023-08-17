export enum OAuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  KAKAO = 'kakao',
  APPLE = 'apple',
  LINE = 'line',
}

export enum UserStatus {
  BEFORE_SIGNING_UP = 'before_signing_up',
  DEFAULT = 'default',
  DEACTIVATED = 'deactivated',
  WITHDRAWN = 'withdrawn',
  DELETED = 'deleted',
}

export enum AuthType {
  SOCIAL_LOGIN = 'social_login',
  EMAIL_PASSWORD = 'email_password',
}
