import { Duration } from 'moment-timezone';
import { ReportReason } from 'apps/hangout/enum/report-reason.enum';

export interface Punishment {
  expiresIn?: Duration | null; // 영구정지인 경우 null. 그 외엔 모든 징계 일자 합산
  reasons: Set<ReportReason>;
  extended: boolean; // 징계 중 추가 신고로 인해 징계 기간이 늘어났는지 여부
}
