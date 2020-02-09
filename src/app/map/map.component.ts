import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tileLayer, Map, LatLng, Marker, Popup } from 'leaflet';
import { PhamacyPointResponse } from './phamacy-point-response';
import 'leaflet.markercluster';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  /** 藥局位置叢聚 */
  markerCluster: Array<Marker> = [];

  /** 主地圖 */
  private map: Map;

  constructor(private http: HttpClient) { }

  onMapReady(map: Map) {
    this.initMap(map);
    this.getUserLocation();
    this.loadPhamacyData();
  }

  private initMap(map: Map) {
    this.map = map;
    // 加入地圖資料
    this.map.addLayer(tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }));
  }

  /** 取得使用者位置 */
  private getUserLocation() {
    const geoLocation: Geolocation = navigator.geolocation;
    if (geoLocation) {
      geoLocation.getCurrentPosition(this.initPanToUserPosition.bind(this), this.initPanToDafault.bind(this));
    } else {
      console.log('Geolocation is not supported.');
    }
  }

  /** 定位使用者位置 */
  private initPanToUserPosition({ coords: { latitude, longitude } }: Position) {
    const selfMark = new Marker(new LatLng(latitude, longitude));
    const selfPopup = new Popup({ closeButton: false }).setContent('<div style="text-align: center;">You</div>');
    selfMark.bindPopup(selfPopup).openPopup();
    selfMark.addTo(this.map);
    this.map.setZoom(17);
    this.map.panTo(new LatLng(latitude, longitude));
  }

  /** 使用者定位失敗, 預設定位台灣 */
  private initPanToDafault() {
    this.map.setZoom(7);
    this.map.panTo(new LatLng(23.5311922, 120.7534645));
  }

  /** 載入藥局位置 */
  private loadPhamacyData() {
    this.http.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .subscribe((response: PhamacyPointResponse) => {
        this.markerCluster = [];
        response.features.forEach(phamacyPoint => {
          const name = phamacyPoint.properties.name;
          const longitude = phamacyPoint.geometry.coordinates[0];
          const latitude = phamacyPoint.geometry.coordinates[1];

          const marker = new Marker(new LatLng(latitude, longitude));
          const popup = new Popup({ closeButton: false }).setContent(`<div style="text-align: center;">${name}</div>`);
          marker.bindPopup(popup);
          this.markerCluster.push(marker);
        });
      });
  }
}
