# leafletで地理院地図を描画しマーカー設置

地図描画ライブラリleafletと国土地理院の地理院地図を連携させてGISブラウザアプリケーションを作ってみるサンプルです。 地理院地図はAPIキーの登録などが不要なのでとてもお手軽で、なおかつ日本政府が管理しているので地図情報ソースとしてはとても安心感があります。

## サンプルコード

### index.html

~~~html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <!-- leafletをロード -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script>
  <!-- leaflet用にスタイルを定義 (地図要素を画面一杯に引き延ばす) -->
  <style type="text/css">
  body {
    margin: 0px;
  }
  #map {
    height: 100vh;
  }
  </style>
</head>
<body>
  <!-- 地図格納要素 (ここに地図を描画) -->
  <div id="map"></div>
  <!-- スクリプトロード -->
  <script src="app.js"></script>
</body>
</html>
~~~

### app.js

~~~javascript

  //
  // まずは普通に地図を描画
  //

  // mapオブジェクトを取得:
  const map = L.map('map');
  //
  // データID (地図表示のタイプ)
  //
  // - "std": 標準地図 (普通)
  // - "pale": 淡色地図 (軽量)
  // - "blank": 白地図 (超軽量)
  // - "seamlessphoto": 写真 (重い)
  //
  // @see: https://maps.gsi.go.jp/development/ichiran.html
  //
  const dataId = "std";
  // 地図タイルレイヤーを作成:
  const layer = L.tileLayer(`https://cyberjapandata.gsi.go.jp/xyz/${dataId}/{z}/{x}/{y}.png`, {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
  });
  // 地図タイルレイヤーをマップへ追加:
  layer.addTo(map);
  // 皇居(北緯35.6825, 東経139.752778)を地図の中心に。ズームレベルは5。
  map.setView([35.6825, 139.752778], 5);
  // // 地図タイルレイヤーを削除したいときはこのようにします:
  // map.removeLayer(layer);

  //
  // 地図クリックイベントハンドラをセット
  //
  // @see: https://leafletjs.com/reference-1.5.0.html#map-event
  //

  // 地図がクリックされたらクリック位置の座標アラートを出す:
  map.on('click', function(e) {
    //クリック位置経緯度取得
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    //経緯度表示
    alert("クリックされた地点のlat,lng(緯度,経度)は、\n" + lat + ", " + lng);
  });

  //
  // 特定地点にマーカーを置く
  //

  // 皇居(北緯35.6825, 東経139.752778)にマーカー:
  const mark = L.marker([35.6825, 139.752778]);
  mark.addTo(map);
  // マーカーに吹き出しを設定:
  mark.bindPopup('<h2>皇居</h2>こちらが<a href="https://tools.wmflabs.org/geohack/geohack.php?language=ja&pagename=%E7%9A%87%E5%B1%85&params=35_40_57_N_139_45_10_E_type:landmark_region:JP" target="_blank">皇居</a>です。');
  // 吹き出しをポップアップ:
  mark.openPopup();

  // 札幌駅(北緯43.068611, 東経141.350778)にもマーカー:
  const sapMark = L.marker([43.068611, 141.350778]);
  sapMark.addTo(map);
  // マーカーに吹き出しを設定:
  sapMark.bindPopup('<h2>札幌駅</h2>こちらは<b>札幌駅</b>です。');
  // // 札幌駅のマーカーを削除したいときはこのようにします:
  // map.removeLayer(sappMark);

  //
  // 地図上に円を描く
  //

  // 札幌駅を中心に半径20,000メートルの赤っぽい円を描画:
  const circle = L.circle([43.068611, 141.350778], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 20000, // 20Km
  }).addTo(map);

  //
  // 地図上の地点を線で結ぶ
  //

  // 札幌駅, 皇居, 博多駅を緑色の線で結合:
  const latlngs = [
    [43.068611, 141.350778], // 札幌駅
    [35.6825, 139.752778], // 皇居
    [33.59, 130.420611], // 博多駅
  ];
  const polyline = L.polyline(latlngs, { color: 'green' }).addTo(map);

  //
  // 特定地点にマーカーを置く (GeoJSON版)
  //

  // 博多駅にマーカー:
  const gjson = {
    "type": "Feature",
    "properties": {
      "name": "博多駅",
      "content": "こちらは<b>博多駅</b>です。(GeoJSONで作成)"
    },
    "geometry": {
      "type": "Point",
      // 博多駅(北緯33.59, 東経130.420611):
      "coordinates": [130.420611, 33.59], // NOTE: [経度,緯度]の順なので注意！
    }
  };
  const hktMark = L.geoJson(gjson).addTo(map);
  hktMark.bindPopup(function(data) {
    console.log(data.feature.properties.popupContent)
    return '<h2>'+ data.feature.properties.name + '</h2>' + data.feature.properties.content;
  });
  ~~~
  
