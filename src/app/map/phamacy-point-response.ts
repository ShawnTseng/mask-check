enum Type {
  FeatureCollection = 'FeatureCollection',
  Feature = 'Feature',
  Point = 'Point'
}

export interface PhamacyPointResponse {
  type: Type.FeatureCollection;
  features: Array<PhamacyPoint>;
}

export interface PhamacyPoint {
  type: Type.Feature;
  properties: PhamacyPointProperty;
  geometry: PhamacyPointGeometry;
}

export interface PhamacyPointProperty {
  /** 醫事機構代碼 */
  id: string;

  /** 醫事機構名稱 */
  name: string;

  /** 醫事機構電話 */
  phone: string;

  /** 醫事機構地址 */
  address: string;

  /** 成人口罩總剩餘數 */
  mask_adult: number;

  /** 兒童口罩剩餘數 */
  mask_child: number;

  /** 來源資料時間	 */
  updated: Date;

  /** 固定看診時段 */
  available: string;

  /** 備註 */
  note: string;

  /** 口罩銷售提醒 */
  custom_note: string;

  /** 網站 */
  website: string;
}

export interface PhamacyPointGeometry {
  type: Type.Point;
  coordinates: Array<number>;
}
