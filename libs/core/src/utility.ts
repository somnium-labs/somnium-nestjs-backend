export function convertTimeToMilliseconds(timeString: string): number {
  const timeRegex = /^(\d+)([dhms])$/; // 정규식으로 시간 문자열 분석
  const match = timeString.match(timeRegex);

  if (!match) {
    throw new Error(
      'Invalid time string format. Use format: [number][d|h|m|s]',
    );
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 'd':
      return value * 24 * 60 * 60 * 1000; // 일(day)을 밀리초로 변환
    case 'h':
      return value * 60 * 60 * 1000; // 시간(hour)을 밀리초로 변환
    case 'm':
      return value * 60 * 1000; // 분(minute)을 밀리초로 변환
    case 's':
      return value * 1000; // 초(second)를 밀리초로 변환
    default:
      throw new Error('Invalid time unit. Use one of [d, h, m, s]');
  }
}
