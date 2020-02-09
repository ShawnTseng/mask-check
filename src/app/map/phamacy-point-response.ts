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
  id: string;
  name: string;
  phone: string;
  address: string;
  mask_adult: number;
  mask_child: number;
  updated: Date;
  available: string;
  note: string;
  custom_note: string;
  website: string;
}

export interface PhamacyPointGeometry {
  type: Type.Point;
  coordinates: Array<number>;
}
