import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tileLayer, Map, LatLng, Marker, Popup } from 'leaflet';
import { PhamacyPointResponse } from './phamacy-point-response';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private map: Map;

  constructor(private http: HttpClient) { }

  onMapReady(map: Map) {
    this.map = map;
    this.getUserLocation();
  }

  /** 取得使用者位置 */
  private getUserLocation() {
    const geoLocation: Geolocation = navigator.geolocation;
    if (geoLocation) {
      geoLocation.getCurrentPosition(this.positionCallback.bind(this));
    } else {
      console.log('Geolocation is not supported.');
    }
  }

  private positionCallback(position: Position) {
    this.initMap(position.coords);
  }

  private initMap({ latitude, longitude }: Coordinates) {
    this.map.addLayer(tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }));
    this.map.setZoom(17);
    this.map.panTo(new LatLng(latitude, longitude));

    // 自己的位置
    const selfMark = new Marker(new LatLng(latitude, longitude));
    const selfPopup = new Popup({ closeButton: false }).setContent('<div style="text-align: center;">You</div>');
    selfMark.addTo(this.map);
    selfMark.bindPopup(selfPopup).openPopup();

    this.loadPhamacyData();
  }

  private loadPhamacyData() {
    this.http.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .subscribe((response: PhamacyPointResponse) => {
        console.log(response);
      });
  }
}
