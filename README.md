# leafletで地理院地図を描画しマーカー設置

地図描画ライブラリleafletと国土地理院の地理院地図、もしくはOpenStreerMapを連携させてGISブラウザアプリケーションを作ってみるサンプルです。 地理院地図はAPIキーの登録などが不要なのでとてもお手軽で、なおかつ日本政府が管理しているので地図情報ソースとしてはとても安心感があります。

※個人的にはOpenStreerMapのほうが色合いがきれいな気がする。

## サンプルコード

### index.html

~~~ html
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

~~~ javascript


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
  const dataId = "pale";
  // 地図タイルレイヤーを作成:

  // これは国土地理院のちず
  // const layer = L.tileLayer(`https://cyberjapandata.gsi.go.jp/xyz/${dataId}/{z}/{x}/{y}.png`, {
  //   attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
  // });

  // これはOpenStreerMap
  const layer = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    attribution: "© <a href='https://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors"
  });

  // 地図タイルレイヤーをマップへ追加:
  layer.addTo(map);
  // 北海道の中心(北緯43.31216722473616, 東経142.86726950000002)を地図の中心に。ズームレベルは8。
  map.setView([43.31216722473616, 142.86726950000002], 8);
  // // 地図タイルレイヤーを削除したいときはこのようにします:
  // map.removeLayer(layer);

  //
  // 地図クリックイベントハンドラをセット
  //
  // @see: https://leafletjs.com/reference-1.5.0.html#map-event
  //

  //
  // 特定地点にマーカーを置く
  //

  // CRM札幌・札幌・メディカル札幌
  const crms = L.marker([43.06185899999999, 141.352265]);
  crms.addTo(map);
  // マーカーに吹き出しを設定:
  crms.bindPopup('北海道札幌市中央区北1条西3-2 井門札幌ビル 9F<br><br>【コールセンター・オフィス事務系】<br>CRM札幌支店<br>TEL : 011-219-7625<br><a class="btn btn-primary btn-sm rounded-0 text-white" href="#" >無料登録会予約</a><br><br>【販売・接客・軽作業・食品製造・配送等】<br>札幌支店<br>TEL : 011-210-1189<br><a class="btn btn-primary btn-sm rounded-0 text-white" href="#" >無料登録会予約</a><br><br>【医療・介護・調理師・保育士等】<br>メディカル札幌支店<br>TEL : 011-798-9531<br><a class="btn btn-primary btn-sm rounded-0 text-white" href="#" >無料登録会予約</a>');

  // カテプリお仕事窓口（新札幌支店）
  const shins = L.marker([43.03793899999999, 141.47218899999996]);
  shins.addTo(map);
  // マーカーに吹き出しを設定:
  shins.bindPopup('<h5>カテプリお仕事窓口（新札幌支店）</h5>北海道札幌市厚別区中央2条5-7 カテプリ 2F<br>TEL : 011-890-8633<br><a class="btn btn-primary btn-sm rounded-0 text-white" href="#" >無料登録会予約</a>');

  // 旭川支店
  const asahi = L.marker([43.76403900000002, 142.36074099999996]);
  asahi.addTo(map);
  // マーカーに吹き出しを設定:
  asahi.bindPopup('<h5>旭川支店</h5>北海道旭川市宮下通9-780-1 旭川駅前第一ビル 4F<br>TEL : 0166-26-7214<br><a class="btn btn-primary btn-sm rounded-0 text-white" href="#" >無料登録会予約</a>');

  // 千歳支店
  const chitose = L.marker([42.82547799999999, 141.64725899999996]);
  chitose.addTo(map);
  // マーカーに吹き出しを設定:
  chitose.bindPopup('<h5>千歳支店</h5>北海道千歳市千代田町4-14 千歳第一ビルディング 3F<br>TEL : 0123-23-6833<br><a class="btn btn-primary btn-sm rounded-0 text-white" href="#" >無料登録会予約</a>');

  // 北見支店
  const kitami = L.marker([43.79499000000001, 143.88560099999995]);
  kitami.addTo(map);
  // マーカーに吹き出しを設定:
  kitami.bindPopup('<h5>北見支店</h5>北海道北見市常盤町4-16-3 トキワビレッジ 2F<br>TEL : 0157-31-2403<br><a class="btn btn-primary btn-sm rounded-0 text-white" href="#" >無料登録会予約</a>');

  // 道東支店
  const kushiro = L.marker([42.98772000000004, 144.38227400000005]);
  kushiro.addTo(map);
  // マーカーに吹き出しを設定:
  kushiro.bindPopup('<h5>道東支店</h5>北海道釧路市黒金町11丁目2番1号 黒金町MFビル 4F<br>TEL : 0154-25-9263<br><a class="btn btn-primary btn-sm rounded-0 text-white" href="#" >無料登録会予約</a>');

  //
  // 地図：マップをクリックした後にのみズーム
  //

  map.scrollWheelZoom.disable();
  map.on('focus', () => { map.scrollWheelZoom.enable(); });
  map.on('blur', () => { map.scrollWheelZoom.disable(); });

  ~~~

## 実行結果

[githubPAGE](https://nak-244.github.io/tips_map_leaflet/)


## ファイルを自前で揃えた方がいろいろと安心
itemsフォルダの内容をすべてアップロードして、下記2つのファイルにリンク設定。

~~~ html
<link rel="stylesheet" href="/path/to/leaflet.css" />
<script src="/path/to/leaflet.js"></script>
~~~

items内のapp.jsを編集するところに変更はなし。
