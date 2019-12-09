# leafletで地理院地図を描画しマーカー設置

地図描画ライブラリleafletと国土地理院の地理院地図を連携させてGISブラウザアプリケーションを作ってみるサンプルです。 地理院地図はAPIキーの登録などが不要なのでとてもお手軽で、なおかつ日本政府が管理しているので地図情報ソースとしてはとても安心感があります。

## サンプルコード
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
