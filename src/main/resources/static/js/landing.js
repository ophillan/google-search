angular.module('mainApp').controller('landingController', function ($scope, $http, $copyToClipboard) {
  $scope.clipboardLinks = [];
  $scope.searchResults = [];
  $scope.bla = "";

  $scope.scavengeResults = function () {
    $scope.clipboardLinks = [];
    $scope.searchResults = [];
    $http.get('/get-google-results?q=' + $scope.bla).then(
      function (result) {
        var resultUrls = result.data;
        for (var count = 0; count < resultUrls.length; count++) {
          var item = {};
          item.title = resultUrls[count].title;
          item.snippet = resultUrls[count].description;
          item.link = resultUrls[count].link;
          item.ctUrl = resultUrls[count].googleLink;
          $scope.searchResults.push(item);
        }
      },
      function (reason) {
        console.log(reason)
      });
  };

  $scope.pushToClipboard = function (ctUrl) {
    if ($scope.clipboardLinks.includes(ctUrl)) {
      console.log("Removing link");
      var index = $scope.clipboardLinks.indexOf(ctUrl);
      $scope.clipboardLinks.splice(index, 1);
    } else {
      console.log("Adding link");
      $scope.clipboardLinks.push(ctUrl);
    }
    if ($scope.clipboardLinks.length === 0) {
      $copyToClipboard.copy(" ").then(function () {
        console.log("Clipboard cleared!");
      })
    } else {
      $copyToClipboard.copy($scope.clipboardLinks.join("\n")).then(function () {
        console.log("Clipboard updated!");
      });
    }
  };

  /*
  // init google form submit listeners
  $timeout(function () {
    $(document).ready(function () {
      $(".gsc-search-button-v2").click(function () {
        console.log("Clicked on search button");
        console.log("BLA");
        $http.get('/get-google-results?q=jaanus')
          .then(function (result) {
            console.log(result);
            console.log(result.data);
          });
        $scope.scavengeResults();
      });
      $('input[type=text]').on('keydown', function (e) {
        if (e.keyCode === 13) {
          console.log("Event pressed in the input form");
          $scope.scavengeResults();
        }
      });
    });
  }, 500);
  */

  /*
  $scope.scavengeResults = function () {
    $scope.clipboardLinks = [];
    $scope.searchResults = [];
    $timeout(function () {
      jQuery(".gsc-results-wrapper-nooverlay").hide();
      $timeout(function () {
        var resultUrls = jQuery.find(".gsc-thumbnail-inside:hidden > .gs-title:not(.gsc-thumbnail-left):hidden > a:hidden");
        var resultSnippets = jQuery.find(".gs-bidi-start-align:hidden.gs-snippet:not(.gs-ellipsis):hidden");
        resultUrls.pop();
        resultSnippets.pop();
        var count;
        for (count = 0; count < resultUrls.length; count++) {
          var result = {};
          result.title = resultUrls[count].innerText;
          result.snippet = resultSnippets[count].innerText;
          result.link = resultUrls[count].dataset.ctorig;
          result.ctUrl = resultUrls[count].dataset.cturl;
          $scope.searchResults.push(result);
        }
      }, 750);
    })
  };
  */

  /*
  $scope.submitSearchForm = function () {
    $http.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyBIybB0yhkVlQI_X1_3ivD2-P5FnvrSMzM&cx=001899806741307848665:wx9o1smaxiw&lr=lang_et&q=" +
      $scope.searchInput)
      .then(function (response) {
        console.log(response.data);
        $scope.items = response.data.items
      });
  };
  */

  /*
  $scope.saveResult = function (item) {
    $scope.clipboardLinks.push(item.link);
    $http.post('/save-search' +
      '?title=' + item.title +
      '&cacheId=' + item.cacheId +
      '&description=' + item.snippet +
      '&link=' + item.link +
      '&googleLink=www.google.com').then(function (data) {
      console.log(data);
    })
  };
  */

  /* Items
  $scope.items = JSON.parse("[\n" +
    "    {\n" +
    "      \"kind\": \"customsearch#result\",\n" +
    "      \"title\": \"Lasteraamat - Apollo\",\n" +
    "      \"htmlTitle\": \"\u003cb\u003eLasteraamat\u003c/b\u003e - Apollo\",\n" +
    "      \"link\": \"https://www.apollo.ee/lasteraamat.html\",\n" +
    "      \"displayLink\": \"www.apollo.ee\",\n" +
    "      \"snippet\": \"Kus laps ka ei oleks, moodustab ta alati maailma naba. \\\"Lasteraamatu lapsed\\\" \\non pärit Plärtsanõlvalt, mis on seekordne maailma keskpunkt. Ilus ja vahva \\nlühijuttudest koosnev \\\"Lasteraamat\\\" Plärtsanõlva lastest. Priit Pärn on \\nraamatusse joonistanud toredad.\",\n" +
    "      \"htmlSnippet\": \"Kus laps ka ei oleks, moodustab ta alati maailma naba. &quot;\u003cb\u003eLasteraamatu\u003c/b\u003e lapsed&quot; \u003cbr\u003e\\non pärit Plärtsanõlvalt, mis on seekordne maailma keskpunkt. Ilus ja vahva \u003cbr\u003e\\nlühijuttudest koosnev &quot;\u003cb\u003eLasteraamat\u003c/b\u003e&quot; Plärtsanõlva lastest. Priit Pärn on \u003cbr\u003e\\nraamatusse joonistanud toredad.\",\n" +
    "      \"cacheId\": \"YatPiKoNSysJ\",\n" +
    "      \"formattedUrl\": \"https://www.apollo.ee/lasteraamat.html\",\n" +
    "      \"htmlFormattedUrl\": \"https://www.apollo.ee/\u003cb\u003elasteraamat\u003c/b\u003e.html\",\n" +
    "      \"pagemap\": {\n" +
    "        \"cse_thumbnail\": [\n" +
    "          {\n" +
    "            \"width\": \"182\",\n" +
    "            \"height\": \"278\",\n" +
    "            \"src\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBrKgaGF2aKekr04BhHK_t7zIXeUMvT_047NhmGznqhFnieT-7_p8WJIJ3\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"product\": [\n" +
    "          {\n" +
    "            \"name\": \"Lasteraamat\",\n" +
    "            \"description\": \"Kus laps ka ei oleks, moodustab ta alati maailma naba.\",\n" +
    "            \"image\": \"https://www.apollo.ee/media/catalog/product/cache/1/image/265x/17f82f742ffe127f42dca9de82fb58b1/r5/lasteraamat.jpg\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"metatags\": [\n" +
    "          {\n" +
    "            \"og:title\": \"Lasteraamat\",\n" +
    "            \"og:type\": \"product\",\n" +
    "            \"og:url\": \"https://www.apollo.ee/lasteraamat.html\",\n" +
    "            \"og:image\": \"https://www.apollo.ee/media/catalog/product/cache/1/image/265x/17f82f742ffe127f42dca9de82fb58b1/r5/lasteraamat.jpg\",\n" +
    "            \"og:site_name\": \"EST\",\n" +
    "            \"fb:admins\": \"1673142729\",\n" +
    "            \"og:description\": \"Kus laps ka ei oleks, moodustab ta alati maailma naba.\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"hproduct\": [\n" +
    "          {\n" +
    "            \"description\": \"Kus laps ka ei oleks, moodustab ta alati maailma naba.\",\n" +
    "            \"fn\": \"Lasteraamat\",\n" +
    "            \"photo\": \"https://www.apollo.ee/media/catalog/product/cache/1/image/265x/17f82f742ffe127f42dca9de82fb58b1/r5/lasteraamat.jpg\",\n" +
    "            \"currency\": \"EUR\",\n" +
    "            \"currency_iso4217\": \"978\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"cse_image\": [\n" +
    "          {\n" +
    "            \"src\": \"https://www.apollo.ee/media/catalog/product/cache/1/image/265x/17f82f742ffe127f42dca9de82fb58b1/r5/lasteraamat.jpg\"\n" +
    "          }\n" +
    "        ]\n" +
    "      }\n" +
    "    },\n" +
    "    {\n" +
    "      \"kind\": \"customsearch#result\",\n" +
    "      \"title\": \"Eesti Lastekirjanduse Keskus » Head lasteraamatud\",\n" +
    "      \"htmlTitle\": \"Eesti Lastekirjanduse Keskus » Head \u003cb\u003elasteraamatud\u003c/b\u003e\",\n" +
    "      \"link\": \"http://www.elk.ee/?page_id=1268\",\n" +
    "      \"displayLink\": \"www.elk.ee\",\n" +
    "      \"snippet\": \"Lastekaitse Liit valib kord aastas uudiskirjanduse hulgast välja häid \\nlasteraamatuid. Raamatuid hindavad lastekirjandusega igapäevaselt kokku \\npuutuvad inimesed Eesti Lastekirjanduse Keskusest, Eesti Lugemisühingust ning \\nmaakondade ja linnade keskraamatukogude lasteosakondadest. Loe lisaks \\nLastekaitse Liidu ...\",\n" +
    "      \"htmlSnippet\": \"Lastekaitse Liit valib kord aastas uudiskirjanduse hulgast välja häid \u003cbr\u003e\\n\u003cb\u003elasteraamatuid\u003c/b\u003e. Raamatuid hindavad lastekirjandusega igapäevaselt kokku \u003cbr\u003e\\npuutuvad inimesed Eesti Lastekirjanduse Keskusest, Eesti Lugemisühingust ning \u003cbr\u003e\\nmaakondade ja linnade keskraamatukogude lasteosakondadest. Loe lisaks \u003cbr\u003e\\nLastekaitse Liidu&nbsp;...\",\n" +
    "      \"cacheId\": \"L1Wc5_WBnrQJ\",\n" +
    "      \"formattedUrl\": \"www.elk.ee/?page_id=1268\",\n" +
    "      \"htmlFormattedUrl\": \"www.elk.ee/?page_id=1268\",\n" +
    "      \"pagemap\": {\n" +
    "        \"cse_thumbnail\": [\n" +
    "          {\n" +
    "            \"width\": \"261\",\n" +
    "            \"height\": \"193\",\n" +
    "            \"src\": \"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQOALDItk69GXkc5ysAF0tOi-PWokHPmHnTFq-j6ae3z3bu5S43Ye9MRVve\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"metatags\": [\n" +
    "          {\n" +
    "            \"og:image\": \"http://www.elk.ee/wp-content/uploads/elklogofb.jpg\",\n" +
    "            \"og:image:type\": \"image/jpeg\",\n" +
    "            \"og:image:width\": \"270\",\n" +
    "            \"og:image:height\": \"200\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"cse_image\": [\n" +
    "          {\n" +
    "            \"src\": \"http://www.elk.ee/wp-content/uploads/elklogofb.jpg\"\n" +
    "          }\n" +
    "        ]\n" +
    "      }\n" +
    "    },\n" +
    "    {\n" +
    "      \"kind\": \"customsearch#result\",\n" +
    "      \"title\": \"Lastekirjandus, lasteraamatud - Apollo\",\n" +
    "      \"htmlTitle\": \"Lastekirjandus, \u003cb\u003elasteraamatud\u003c/b\u003e - Apollo\",\n" +
    "      \"link\": \"https://www.apollo.ee/raamatud/eestikeelsed-raamatud/lastekirjandus\",\n" +
    "      \"displayLink\": \"www.apollo.ee\",\n" +
    "      \"snippet\": \"Apollost leiate alati parima valiku nii kohalike kui välisautorite lasteraamatuid. \\nTutvuge lastekirjanduse valikuga ka Apollo e-poes.\",\n" +
    "      \"htmlSnippet\": \"Apollost leiate alati parima valiku nii kohalike kui välisautorite \u003cb\u003elasteraamatuid\u003c/b\u003e. \u003cbr\u003e\\nTutvuge lastekirjanduse valikuga ka Apollo e-poes.\",\n" +
    "      \"cacheId\": \"LKvnzFJT5-QJ\",\n" +
    "      \"formattedUrl\": \"https://www.apollo.ee/raamatud/eestikeelsed-raamatud/lastekirjandus\",\n" +
    "      \"htmlFormattedUrl\": \"https://www.apollo.ee/raamatud/eestikeelsed-raamatud/lastekirjandus\",\n" +
    "      \"pagemap\": {\n" +
    "        \"cse_thumbnail\": [\n" +
    "          {\n" +
    "            \"width\": \"365\",\n" +
    "            \"height\": \"138\",\n" +
    "            \"src\": \"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTxorXDoVyOty5UmoQO-8DY4mjLqUUS5n7tRQ_1VWNDyDjxoDpQfShZ8H8\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"cse_image\": [\n" +
    "          {\n" +
    "            \"src\": \"https://www.apollo.ee/media/wysiwyg/Apollo_Tasuta_transport_700x265px_1.jpg\"\n" +
    "          }\n" +
    "        ]\n" +
    "      }\n" +
    "    },\n" +
    "    {\n" +
    "      \"kind\": \"customsearch#result\",\n" +
    "      \"title\": \"Lastekaitse Liit » 2016. aastal ilmunud head lasteraamatud\",\n" +
    "      \"htmlTitle\": \"Lastekaitse Liit » 2016. aastal ilmunud head \u003cb\u003elasteraamatud\u003c/b\u003e\",\n" +
    "      \"link\": \"https://www.lastekaitseliit.ee/2016-aastal-ilmunud-hea-lasteraamat/\",\n" +
    "      \"displayLink\": \"www.lastekaitseliit.ee\",\n" +
    "      \"snippet\": \"2016. aastal ilmunud raamatute hulgast valiti 15. veebruaril 2017.a välja tiitli Hea \\nlasteraamat nominendid. Eelmise aasta uudiskirjanduse hulgast selgus neliteist \\nraamatut, mille pidulik väljakuulutamine toimub 2. märtsil Eesti Lastekirjanduse \\nKeskuses (kutsetega). Juba märtsikuus tasub otsida nii maakondade ...\",\n" +
    "      \"htmlSnippet\": \"2016. aastal ilmunud raamatute hulgast valiti 15. veebruaril 2017.a välja tiitli Hea \u003cbr\u003e\\n\u003cb\u003elasteraamat\u003c/b\u003e nominendid. Eelmise aasta uudiskirjanduse hulgast selgus neliteist \u003cbr\u003e\\nraamatut, mille pidulik väljakuulutamine toimub 2. märtsil Eesti Lastekirjanduse \u003cbr\u003e\\nKeskuses (kutsetega). Juba märtsikuus tasub otsida nii maakondade&nbsp;...\",\n" +
    "      \"cacheId\": \"Arst18wtO40J\",\n" +
    "      \"formattedUrl\": \"https://www.lastekaitseliit.ee/2016-aastal-ilmunud-hea-lasteraamat/\",\n" +
    "      \"htmlFormattedUrl\": \"https://www.lastekaitseliit.ee/2016-aastal-ilmunud-hea-\u003cb\u003elasteraamat\u003c/b\u003e/\",\n" +
    "      \"pagemap\": {\n" +
    "        \"cse_thumbnail\": [\n" +
    "          {\n" +
    "            \"width\": \"212\",\n" +
    "            \"height\": \"238\",\n" +
    "            \"src\": \"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRrAT8pjVRkDPB5FFms274V_TdE7nPlOv8uwXdCbk4FS-KIr7jWwpJ9Ors\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"metatags\": [\n" +
    "          {\n" +
    "            \"viewport\": \"width=device-width, initial-scale=1\",\n" +
    "            \"author\": \"Lastekaitse Liit\",\n" +
    "            \"msapplication-tileimage\": \"https://www.lastekaitseliit.ee/wp-content/uploads/2015/10/cropped-favicon-300x300.png\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"Breadcrumb\": [\n" +
    "          {\n" +
    "            \"title\": \"Lastekaitse Liit\",\n" +
    "            \"url\": \"Lastekaitse Liit\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"title\": \"2016. aastal ilmunud head lasteraamatud\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"cse_image\": [\n" +
    "          {\n" +
    "            \"src\": \"http://www.lastekaitseliit.ee/wp-content/uploads/2017/02/Illipe-Sootak-Kiisu-aias-lehti-riisus-268x300.jpg\"\n" +
    "          }\n" +
    "        ]\n" +
    "      }\n" +
    "    },\n" +
    "    {\n" +
    "      \"kind\": \"customsearch#result\",\n" +
    "      \"title\": \"Selgusid head ja parimad lasteraamatud 2016! - Kirjandus - Kultuur\",\n" +
    "      \"htmlTitle\": \"Selgusid head ja parimad \u003cb\u003elasteraamatud\u003c/b\u003e 2016! - Kirjandus - Kultuur\",\n" +
    "      \"link\": \"https://kultuur.postimees.ee/4033703/selgusid-head-ja-parimad-lasteraamatud-2016\",\n" +
    "      \"displayLink\": \"kultuur.postimees.ee\",\n" +
    "      \"snippet\": \"3 mär. 2017 ... Lastekaitse Liidu eestvedamisel valisid lastekirjanduse eksperdid 2016. aastal \\nilmunud uudiskirjanduse hulgast välja «Head lasteraamatud». Eelmisel aastal \\nkirjastatud raamatutest parimad kuulutati välja 2. märtsil kell 14 Eesti \\nLastekirjanduse Keskuses toimunud lastekirjanduse aastakoosolekul.\",\n" +
    "      \"htmlSnippet\": \"3 mär. 2017 \u003cb\u003e...\u003c/b\u003e Lastekaitse Liidu eestvedamisel valisid lastekirjanduse eksperdid 2016. aastal \u003cbr\u003e\\nilmunud uudiskirjanduse hulgast välja «Head \u003cb\u003elasteraamatud\u003c/b\u003e». Eelmisel aastal \u003cbr\u003e\\nkirjastatud raamatutest parimad kuulutati välja 2. märtsil kell 14 Eesti \u003cbr\u003e\\nLastekirjanduse Keskuses toimunud lastekirjanduse aastakoosolekul.\",\n" +
    "      \"cacheId\": \"SXnFoQCH34wJ\",\n" +
    "      \"formattedUrl\": \"https://kultuur.postimees.ee/.../selgusid-head-ja-parimad-lasteraamatud-2016\",\n" +
    "      \"htmlFormattedUrl\": \"https://kultuur.postimees.ee/.../selgusid-head-ja-parimad-\u003cb\u003elasteraamatud\u003c/b\u003e-2016\",\n" +
    "      \"pagemap\": {\n" +
    "        \"cse_thumbnail\": [\n" +
    "          {\n" +
    "            \"width\": \"276\",\n" +
    "            \"height\": \"148\",\n" +
    "            \"src\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ298qOWVxViyEISRjoC8BT9brhTmECvh6ixqHy4r9yO--1lWu3Z7PHln8\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"metatags\": [\n" +
    "          {\n" +
    "            \"viewport\": \"width=1030\",\n" +
    "            \"theme-color\": \"#4dade9\",\n" +
    "            \"og:image\": \"https://f9.pmo.ee/ODSpMTjlwwmf2wUQ0BJ2AmZ2_Fk=/1200x630/filters:focal(14x243:450x663)/nginx/o/2017/03/03/6403467t1h3371.jpg\",\n" +
    "            \"og:title\": \"Selgusid head ja parimad lasteraamatud 2016!\",\n" +
    "            \"og:url\": \"https://kultuur.postimees.ee/4033703/selgusid-head-ja-parimad-lasteraamatud-2016\",\n" +
    "            \"og:site_name\": \"Kultuur\",\n" +
    "            \"og:description\": \"Lastekaitse Liidu eestvedamisel valisid lastekirjanduse eksperdid 2016. aastal ilmunud uudiskirjanduse hulgast välja «Head lasteraamatud». Eelmisel aastal kirjastatud raamatutest parimad kuulutati välja 2. märtsil kell 14 Eesti Lastekirjanduse Keskuses toimunud lastekirjanduse aastakoosolekul.\",\n" +
    "            \"og:type\": \"article\",\n" +
    "            \"article:section\": \"Kirjandus\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"newsarticle\": [\n" +
    "          {\n" +
    "            \"articlesection\": \"Kultuur\",\n" +
    "            \"headline\": \"Selgusid head ja parimad lasteraamatud 2016!\",\n" +
    "            \"name\": \"Selgusid head ja parimad lasteraamatud 2016!\",\n" +
    "            \"datepublished\": \"3. märts 2017, 14:48\",\n" +
    "            \"articlebody\": \"FOTO: Plakat Parimad lasteraamatud 2016 Lastekaitse Liidu eestvedamisel valisid lastekirjanduse eksperdid 2016. aastal ilmunud uudiskirjanduse hulgast välja «Head lasteraamatud». Eelmisel...\",\n" +
    "            \"description\": \"Lastekaitse Liidu eestvedamisel valisid lastekirjanduse eksperdid 2016. aastal ilmunud uudiskirjanduse hulgast välja «Head lasteraamatud». Eelmisel aastal kirjastatud raamatutest parimad...\",\n" +
    "            \"keywords\": \"hea indrek koff juhani püttsepp Kertu sillaste krokodill Kätlin Kaldmaa lastekaitse liit lastekirjandus lasteraamatud Leelo Tungal lumemees plakatid raamatud reeli reinaus tõnu poopuu wimberg\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375595/trumpi-skandaalse-raamatu-eestis-avaldamise-parast-kais-tihe-rebimine\",\n" +
    "            \"headline\": \"Trumpi skandaalse raamatu Eestis avaldamise pärast käis tihe rebimine\",\n" +
    "            \"name\": \"Trumpi skandaalse raamatu Eestis avaldamise pärast käis tihe rebimine\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4371389/lumehelbeke-ja-autist-teeseldud-maailmas\",\n" +
    "            \"headline\": \"Lumehelbeke ja autist teeseldud maailmas\",\n" +
    "            \"name\": \"Lumehelbeke ja autist teeseldud maailmas\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4372343/jan-kaus-mulle-on-kirjanikuna-oluline-oma-elutunnet-nii-tapselt-kui-voimalik-sonadesse-panna\",\n" +
    "            \"headline\": \"Jan Kaus: «Mulle on kirjanikuna oluline oma elutunnet nii täpselt kui võimalik sõnadesse panna.»\",\n" +
    "            \"name\": \"Jan Kaus: «Mulle on kirjanikuna oluline oma elutunnet nii täpselt kui võimalik sõnadesse panna.»\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4372357/vikerkaar-loeb-puhas-enter-uhe-voimaliku-poeetika-malestuseks\",\n" +
    "            \"headline\": \"Vikerkaar loeb: Puhas enter. Ühe võimaliku poeetika mälestuseks\",\n" +
    "            \"name\": \"Vikerkaar loeb: Puhas enter. Ühe võimaliku poeetika mälestuseks\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4371365/kui-oli-keskaeg-pime-elu-oli-sunge-ja-julm\",\n" +
    "            \"headline\": \"«Kui oli keskaeg pime, elu oli sünge ja julm...»\",\n" +
    "            \"name\": \"«Kui oli keskaeg pime, elu oli sünge ja julm...»\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4371093/vastandite-uhtsus-sisu-ja-vormi-harmoonia\",\n" +
    "            \"headline\": \"Vastandite ühtsus, sisu ja vormi harmoonia\",\n" +
    "            \"name\": \"Vastandite ühtsus, sisu ja vormi harmoonia\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4371069/pealpool-pilvi\",\n" +
    "            \"headline\": \"Pealpool pilvi\",\n" +
    "            \"name\": \"Pealpool pilvi\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4371039/gutenbergist-zuckerbergini-ehk-kuidas-kommunikatsioonitehnoloogiad-inimest-ja-uhiskonda-muudavad\",\n" +
    "            \"headline\": \"Gutenbergist Zuckerbergini ehk Kuidas kommunikatsioonitehnoloogiad inimest ja ühiskonda muudavad\",\n" +
    "            \"name\": \"Gutenbergist Zuckerbergini ehk Kuidas kommunikatsioonitehnoloogiad inimest ja ühiskonda muudavad\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4372247/edmund-burke-i-selts-esitleb-tana-oma-raamatusarja-esikteost\",\n" +
    "            \"headline\": \"Edmund Burke'i Selts esitleb täna oma raamatusarja esikteost\",\n" +
    "            \"name\": \"Edmund Burke'i Selts esitleb täna oma raamatusarja esikteost\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4370853/roomas-toimub-seminar-eesti-kunstist-ja-kirjandusest\",\n" +
    "            \"headline\": \"Roomas toimub seminar eesti kunstist ja kirjandusest\",\n" +
    "            \"name\": \"Roomas toimub seminar eesti kunstist ja kirjandusest\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4376595/reval-folk-alustab-aastat-eesti-flaami-duo-ja-folgijammiga\",\n" +
    "            \"headline\": \"Reval Folk alustab aastat Eesti-Flaami duo ja folgijämmiga\",\n" +
    "            \"name\": \"Reval Folk alustab aastat Eesti-Flaami duo ja folgijämmiga\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4376255/korfest-2018-koreograafiatudengite-vahetu-manifest\",\n" +
    "            \"headline\": \"KorFest 2018: koreograafiatudengite vahetu manifest\",\n" +
    "            \"name\": \"KorFest 2018: koreograafiatudengite vahetu manifest\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4376413/suri-ansambli-the-cranberries-laulja-dolores-o-riordan\",\n" +
    "            \"headline\": \"Suri ansambli The Cranberries laulja Dolores O’Riordan\",\n" +
    "            \"name\": \"Suri ansambli The Cranberries laulja Dolores O’Riordan\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4376377/ansambel-estonian-voices-tegi-usa-debuudi\",\n" +
    "            \"headline\": \"Ansambel Estonian Voices tegi USA debüüdi\",\n" +
    "            \"name\": \"Ansambel Estonian Voices tegi USA debüüdi\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375959/miljardid-esinevad-ema-galal-erinumbriga\",\n" +
    "            \"headline\": \"Miljardid esinevad EMA galal erinumbriga\",\n" +
    "            \"name\": \"Miljardid esinevad EMA galal erinumbriga\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"31 fotot\",\n" +
    "            \"headline\": \"See kütus, mis Kunila kultuurivedurit veab, pole raha\",\n" +
    "            \"name\": \"See kütus, mis Kunila kultuurivedurit veab, pole raha\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375773/maarja-nuut-annab-eesti-raadios-minikontserdi\",\n" +
    "            \"headline\": \"Maarja Nuut annab Eesti Raadios minikontserdi\",\n" +
    "            \"name\": \"Maarja Nuut annab Eesti Raadios minikontserdi\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375743/dicaprio-mangib-tarantino-filmis-mansonist-peaosa\",\n" +
    "            \"headline\": \"DiCaprio mängib Tarantino filmis Mansonist peaosa\",\n" +
    "            \"name\": \"DiCaprio mängib Tarantino filmis Mansonist peaosa\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"31 fotot\",\n" +
    "            \"headline\": \"Selgus Postimehe Kultuurivedur 2017\",\n" +
    "            \"name\": \"Selgus Postimehe Kultuurivedur 2017\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375595/trumpi-skandaalse-raamatu-eestis-avaldamise-parast-kais-tihe-rebimine\",\n" +
    "            \"headline\": \"Trumpi skandaalse raamatu Eestis avaldamise pärast käis tihe rebimine\",\n" +
    "            \"name\": \"Trumpi skandaalse raamatu Eestis avaldamise pärast käis tihe rebimine\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375539/komoodiastaar-rob-schneider-esineb-tallinnas\",\n" +
    "            \"headline\": \"Komöödiastaar Rob Schneider esineb Tallinnas\",\n" +
    "            \"name\": \"Komöödiastaar Rob Schneider esineb Tallinnas\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375473/urmas-ja-sohvi-viik-avavad-uhisnaituse\",\n" +
    "            \"headline\": \"Urmas ja Sohvi Viik avavad ühisnäituse\",\n" +
    "            \"name\": \"Urmas ja Sohvi Viik avavad ühisnäituse\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"16:12\",\n" +
    "            \"headline\": \"Otseülekanne: Kultuurivedur 2017\",\n" +
    "            \"name\": \"Otseülekanne: Kultuurivedur 2017\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375265/algab-konkurss-kultuurisober-2017\",\n" +
    "            \"headline\": \"Algab konkurss Kultuurisõber 2017\",\n" +
    "            \"name\": \"Algab konkurss Kultuurisõber 2017\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4372647/erkki-sven-tuur-sudamega-iga-noodi-taga\",\n" +
    "            \"headline\": \"Erkki-Sven Tüür – südamega iga noodi taga\",\n" +
    "            \"name\": \"Erkki-Sven Tüür – südamega iga noodi taga\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4374883/stalini-filmi-peaosas-on-hirm\",\n" +
    "            \"headline\": \"Stalini-filmi peaosas on hirm\",\n" +
    "            \"name\": \"Stalini-filmi peaosas on hirm\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375111/baltoscandali-passid-tulevad-tana-muuki\",\n" +
    "            \"headline\": \"Baltoscandali passid tulevad täna müüki\",\n" +
    "            \"name\": \"Baltoscandali passid tulevad täna müüki\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"26 fotot\",\n" +
    "            \"headline\": \"Galerii: Aasta muusik on Jaan-Eik Tulve\",\n" +
    "            \"name\": \"Galerii: Aasta muusik on Jaan-Eik Tulve\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"5 fotot\",\n" +
    "            \"headline\": \"Filmiarvustus: «Hinga». Sa nutad, kui seda filmi ei näe\",\n" +
    "            \"name\": \"Filmiarvustus: «Hinga». Sa nutad, kui seda filmi ei näe\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4370813/aja-auk-inimkonna-havitajad\",\n" +
    "            \"headline\": \"Aja auk. Inimkonna hävitajad\",\n" +
    "            \"name\": \"Aja auk. Inimkonna hävitajad\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"imageobject\": [\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Plakat\",\n" +
    "            \"caption\": \"Parimad lasteraamatud 2016\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"person\": [\n" +
    "          {\n" +
    "            \"image\": \"https://f10.pmo.ee/5MWpgsPm8ZqgJCxZ-Xr-9vLJGVQ=/40x40/smart/nginx/o/2016/12/08/6155619t1h52bd.jpg\",\n" +
    "            \"name\": \"Hendrik Alla\",\n" +
    "            \"jobtitle\": \"toimetaja\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"cse_image\": [\n" +
    "          {\n" +
    "            \"src\": \"https://f11.pmo.ee/BK9skN60YNikWPfPyZmn33yz0fs=/276x148/filters:focal(14x243:450x663)/nginx/o/2017/03/03/6403467t1h3371.jpg\"\n" +
    "          }\n" +
    "        ]\n" +
    "      }\n" +
    "    },\n" +
    "    {\n" +
    "      \"kind\": \"customsearch#result\",\n" +
    "      \"title\": \"Lastekirjandus, lasteraamatud - Raamatud | Rahva Raamat\",\n" +
    "      \"htmlTitle\": \"Lastekirjandus, \u003cb\u003elasteraamatud\u003c/b\u003e - Raamatud | Rahva Raamat\",\n" +
    "      \"link\": \"https://www.rahvaraamat.ee/c/lastekirjandus/1/2/41/et\",\n" +
    "      \"displayLink\": \"www.rahvaraamat.ee\",\n" +
    "      \"snippet\": \"Mõnusat lugemist pisipõnnidele ja kooliealistele! Rahva Raamatu e-poes parim \\nvalik lasteraamatuid ja lastekirjandust. Kohaletoimetamine alates 24h ja tasuta.\",\n" +
    "      \"htmlSnippet\": \"Mõnusat lugemist pisipõnnidele ja kooliealistele! Rahva Raamatu e-poes parim \u003cbr\u003e\\nvalik \u003cb\u003elasteraamatuid\u003c/b\u003e ja lastekirjandust. Kohaletoimetamine alates 24h ja tasuta.\",\n" +
    "      \"formattedUrl\": \"https://www.rahvaraamat.ee/c/lastekirjandus/1/2/41/et\",\n" +
    "      \"htmlFormattedUrl\": \"https://www.rahvaraamat.ee/c/lastekirjandus/1/2/41/et\",\n" +
    "      \"pagemap\": {\n" +
    "        \"cse_thumbnail\": [\n" +
    "          {\n" +
    "            \"width\": \"166\",\n" +
    "            \"height\": \"221\",\n" +
    "            \"src\": \"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8tqmJ2FGe8sauz5BA1vRpV27yuTqfn0aAX8-9RdZ1f8E8D2bNYztbPYE\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"metatags\": [\n" +
    "          {\n" +
    "            \"format-detection\": \"telephone=no\",\n" +
    "            \"viewport\": \"initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width, user-scalable=no\",\n" +
    "            \"apple-itunes-app\": \"app-id=1045018769\",\n" +
    "            \"og:title\": \"Lastekirjandus, lasteraamatud - Raamatud | Rahva Raamat\",\n" +
    "            \"og:description\": \"Mõnusat lugemist pisipõnnidele ja kooliealistele! Rahva Raamatu e-poes parim valik lasteraamatuid ja lastekirjandust. Kohaletoimetamine alates 24h ja tasuta.\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"cse_image\": [\n" +
    "          {\n" +
    "            \"src\": \"https://www.rahvaraamat.ee/images/products/000/011/281/thumbnails/slider/7ace0b2e7814d7397176f8ed1dfd9d04fc7bca5a/jussikese-seitse-s%C3%B5pra.jpg\"\n" +
    "          }\n" +
    "        ]\n" +
    "      }\n" +
    "    },\n" +
    "    {\n" +
    "      \"kind\": \"customsearch#result\",\n" +
    "      \"title\": \"Just need on head lasteraamatud! - Kultuur\",\n" +
    "      \"htmlTitle\": \"Just need on head \u003cb\u003elasteraamatud\u003c/b\u003e! - Kultuur\",\n" +
    "      \"link\": \"https://kultuur.postimees.ee/3605305/just-need-on-head-lasteraamatud\",\n" +
    "      \"displayLink\": \"kultuur.postimees.ee\",\n" +
    "      \"snippet\": \"3 mär. 2016 ... MTÜ Lastekaitse Liit eestvedamisel valisid lastekirjanduse eksperdid 2015. a \\nilmunud uudiskirjanduse hulgast juba seitsmendat aastat järjest välja Head \\nlasteraamatud. 2015. aastal parimateks valitud raamatud kuulutati pidulikult välja \\n3. märtsil Eesti Lastekirjanduse Keskuses toimunud lastekirjanduse ...\",\n" +
    "      \"htmlSnippet\": \"3 mär. 2016 \u003cb\u003e...\u003c/b\u003e MTÜ Lastekaitse Liit eestvedamisel valisid lastekirjanduse eksperdid 2015. a \u003cbr\u003e\\nilmunud uudiskirjanduse hulgast juba seitsmendat aastat järjest välja Head \u003cbr\u003e\\n\u003cb\u003elasteraamatud\u003c/b\u003e. 2015. aastal parimateks valitud raamatud kuulutati pidulikult välja \u003cbr\u003e\\n3. märtsil Eesti Lastekirjanduse Keskuses toimunud lastekirjanduse&nbsp;...\",\n" +
    "      \"cacheId\": \"SfCYiQxJqJ4J\",\n" +
    "      \"formattedUrl\": \"https://kultuur.postimees.ee/.../just-need-on-head-lasteraamatud\",\n" +
    "      \"htmlFormattedUrl\": \"https://kultuur.postimees.ee/.../just-need-on-head-\u003cb\u003elasteraamatud\u003c/b\u003e\",\n" +
    "      \"pagemap\": {\n" +
    "        \"cse_thumbnail\": [\n" +
    "          {\n" +
    "            \"width\": \"134\",\n" +
    "            \"height\": \"148\",\n" +
    "            \"src\": \"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQCV6VPNfFhpS2iwRzQjIW2UoI50gjrEgpWGmDpT-Vc9ym5wAjifCiaCFJj\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"metatags\": [\n" +
    "          {\n" +
    "            \"viewport\": \"width=1030\",\n" +
    "            \"theme-color\": \"#4dade9\",\n" +
    "            \"og:image\": \"https://f12.pmo.ee/img-CWNizrSKlYcgpSkdHy9I7JA=/1200x630/smart/nginx/o/2016/03/03/5119139t1hfa52.jpg\",\n" +
    "            \"og:title\": \"Just need on head lasteraamatud!\",\n" +
    "            \"og:url\": \"https://kultuur.postimees.ee/3605305/just-need-on-head-lasteraamatud\",\n" +
    "            \"og:site_name\": \"Kultuur\",\n" +
    "            \"og:description\": \"MTÜ Lastekaitse Liit eestvedamisel valisid lastekirjanduse eksperdid 2015. a ilmunud uudiskirjanduse hulgast juba seitsmendat aastat järjest välja Head lasteraamatud. 2015. aastal parimateks valitud raamatud kuulutati pidulikult välja 3. märtsil Eesti Lastekirjanduse Keskuses toimunud lastekirjanduse aastakoosolekul.\",\n" +
    "            \"og:type\": \"article\",\n" +
    "            \"article:section\": \"Kultuur\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"newsarticle\": [\n" +
    "          {\n" +
    "            \"articlesection\": \"Kultuur\",\n" +
    "            \"headline\": \"Just need on head lasteraamatud!\",\n" +
    "            \"name\": \"Just need on head lasteraamatud!\",\n" +
    "            \"datepublished\": \"3. märts 2016, 15:11\",\n" +
    "            \"articlebody\": \"FOTO: TAIRO LUTTER/PM/SCANPIX BALTICS Pildil Anti Saar MTÜ Lastekaitse Liit eestvedamisel valisid lastekirjanduse eksperdid 2015. a ilmunud uudiskirjanduse hulgast juba seitsmendat aastat...\",\n" +
    "            \"description\": \"MTÜ Lastekaitse Liit eestvedamisel valisid lastekirjanduse eksperdid 2015. a ilmunud uudiskirjanduse hulgast juba seitsmendat aastat järjest välja Head lasteraamatud. 2015. aastal parimateks...\",\n" +
    "            \"keywords\": \"ANDRUS Andrus Kivirähk anti saar chris contra edward eesti lastekirjanduse keskus grigori oster hea holm juhani juhani püttsepp KAIRI Kertu sillaste kirjanik kivirähk koer kojamees kuldkala...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4376255/korfest-2018-koreograafiatudengite-vahetu-manifest\",\n" +
    "            \"headline\": \"KorFest 2018: koreograafiatudengite vahetu manifest\",\n" +
    "            \"name\": \"KorFest 2018: koreograafiatudengite vahetu manifest\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4376413/suri-ansambli-the-cranberries-laulja-dolores-o-riordan\",\n" +
    "            \"headline\": \"Suri ansambli The Cranberries laulja Dolores O’Riordan\",\n" +
    "            \"name\": \"Suri ansambli The Cranberries laulja Dolores O’Riordan\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4376377/ansambel-estonian-voices-tegi-usa-debuudi\",\n" +
    "            \"headline\": \"Ansambel Estonian Voices tegi USA debüüdi\",\n" +
    "            \"name\": \"Ansambel Estonian Voices tegi USA debüüdi\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375959/miljardid-esinevad-ema-galal-erinumbriga\",\n" +
    "            \"headline\": \"Miljardid esinevad EMA galal erinumbriga\",\n" +
    "            \"name\": \"Miljardid esinevad EMA galal erinumbriga\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"31 fotot\",\n" +
    "            \"headline\": \"See kütus, mis Kunila kultuurivedurit veab, pole raha\",\n" +
    "            \"name\": \"See kütus, mis Kunila kultuurivedurit veab, pole raha\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375773/maarja-nuut-annab-eesti-raadios-minikontserdi\",\n" +
    "            \"headline\": \"Maarja Nuut annab Eesti Raadios minikontserdi\",\n" +
    "            \"name\": \"Maarja Nuut annab Eesti Raadios minikontserdi\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375743/dicaprio-mangib-tarantino-filmis-mansonist-peaosa\",\n" +
    "            \"headline\": \"DiCaprio mängib Tarantino filmis Mansonist peaosa\",\n" +
    "            \"name\": \"DiCaprio mängib Tarantino filmis Mansonist peaosa\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"31 fotot\",\n" +
    "            \"headline\": \"Selgus Postimehe Kultuurivedur 2017\",\n" +
    "            \"name\": \"Selgus Postimehe Kultuurivedur 2017\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375595/trumpi-skandaalse-raamatu-eestis-avaldamise-parast-kais-tihe-rebimine\",\n" +
    "            \"headline\": \"Trumpi skandaalse raamatu Eestis avaldamise pärast käis tihe rebimine\",\n" +
    "            \"name\": \"Trumpi skandaalse raamatu Eestis avaldamise pärast käis tihe rebimine\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375539/komoodiastaar-rob-schneider-esineb-tallinnas\",\n" +
    "            \"headline\": \"Komöödiastaar Rob Schneider esineb Tallinnas\",\n" +
    "            \"name\": \"Komöödiastaar Rob Schneider esineb Tallinnas\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375473/urmas-ja-sohvi-viik-avavad-uhisnaituse\",\n" +
    "            \"headline\": \"Urmas ja Sohvi Viik avavad ühisnäituse\",\n" +
    "            \"name\": \"Urmas ja Sohvi Viik avavad ühisnäituse\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"16:12\",\n" +
    "            \"headline\": \"Otseülekanne: Kultuurivedur 2017\",\n" +
    "            \"name\": \"Otseülekanne: Kultuurivedur 2017\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375265/algab-konkurss-kultuurisober-2017\",\n" +
    "            \"headline\": \"Algab konkurss Kultuurisõber 2017\",\n" +
    "            \"name\": \"Algab konkurss Kultuurisõber 2017\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4372647/erkki-sven-tuur-sudamega-iga-noodi-taga\",\n" +
    "            \"headline\": \"Erkki-Sven Tüür – südamega iga noodi taga\",\n" +
    "            \"name\": \"Erkki-Sven Tüür – südamega iga noodi taga\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4374883/stalini-filmi-peaosas-on-hirm\",\n" +
    "            \"headline\": \"Stalini-filmi peaosas on hirm\",\n" +
    "            \"name\": \"Stalini-filmi peaosas on hirm\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4375111/baltoscandali-passid-tulevad-tana-muuki\",\n" +
    "            \"headline\": \"Baltoscandali passid tulevad täna müüki\",\n" +
    "            \"name\": \"Baltoscandali passid tulevad täna müüki\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"26 fotot\",\n" +
    "            \"headline\": \"Galerii: Aasta muusik on Jaan-Eik Tulve\",\n" +
    "            \"name\": \"Galerii: Aasta muusik on Jaan-Eik Tulve\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"5 fotot\",\n" +
    "            \"headline\": \"Filmiarvustus: «Hinga». Sa nutad, kui seda filmi ei näe\",\n" +
    "            \"name\": \"Filmiarvustus: «Hinga». Sa nutad, kui seda filmi ei näe\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4370813/aja-auk-inimkonna-havitajad\",\n" +
    "            \"headline\": \"Aja auk. Inimkonna hävitajad\",\n" +
    "            \"name\": \"Aja auk. Inimkonna hävitajad\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"https://kultuur.postimees.ee/4370595/masinad-kuidas-nad-tootavad\",\n" +
    "            \"headline\": \"Masinad – kuidas nad töötavad?\",\n" +
    "            \"name\": \"Masinad – kuidas nad töötavad?\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"imageobject\": [\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: TAIRO LUTTER/PM/SCANPIX BALTICS\",\n" +
    "            \"caption\": \"Pildil Anti Saar\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: TAIRO LUTTER/PM/SCANPIX BALTICS\",\n" +
    "            \"caption\": \"Pildil Tänapäeva peatoimetaja Tauno Vahter.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Raamat\",\n" +
    "            \"caption\": \"Martin Baltscheit «Jänese kuld»\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Teet Malsroos\",\n" +
    "            \"caption\": \"Contra «Kõik on kõige targemad»\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Repro\",\n" +
    "            \"caption\": \"\\\"Oskar ja asjad\\\"\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Raamat\",\n" +
    "            \"caption\": \"Kairi Look „Piia Präänik kolib sisse“\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Repro\",\n" +
    "            \"caption\": \"\\\"Vallatu matemaatika\\\"\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Raamat\",\n" +
    "            \"caption\": \"Juhani Püttsepp „Gibraltari laevakoerte ühing“\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Raamat\",\n" +
    "            \"caption\": \"Piret Raud „Lugu Sandrist, Murist, tillukesest emmest ja nähtamatust Akslist“\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Raamat\",\n" +
    "            \"caption\": \"Kertu Sillaste „Ei ole nii!“\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Raamat\",\n" +
    "            \"caption\": \"Edward van de Vendel. Koer nimega Sam\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Raamat\",\n" +
    "            \"caption\": \"Drew Daywalt „Rasvakriitide mäss”\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Raamat\",\n" +
    "            \"caption\": \"Jennifer L. Holm „Kuldkala number 14”\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Raamat\",\n" +
    "            \"caption\": \"Chris Riddell „Ada Goot ja kummitushiir”\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"creator\": \"FOTO: Raamat\",\n" +
    "            \"caption\": \"Anti Saar „Kojamees Urmas”\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"person\": [\n" +
    "          {\n" +
    "            \"image\": \"https://f7.pmo.ee/RYNGL4fnHAf5G-JUyD5SEXL73DU=/40x40/smart/nginx/o/2014/11/25/3552393t1h8c98.jpg\",\n" +
    "            \"name\": \"Heili Sibrits\",\n" +
    "            \"jobtitle\": \"kultuuritoimetuse juhataja\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"cse_image\": [\n" +
    "          {\n" +
    "            \"src\": \"http://f12.pmo.ee/2TsTUS-rIHx65h-qFb8WYVPQ_YQ=/134x148/smart/nginx/o/2015/04/09/3946603t1h45a9.jpg\"\n" +
    "          }\n" +
    "        ]\n" +
    "      }\n" +
    "    },\n" +
    "    {\n" +
    "      \"kind\": \"customsearch#result\",\n" +
    "      \"title\": \"Ott Arder - Vikipeedia, vaba entsüklopeedia\",\n" +
    "      \"htmlTitle\": \"Ott Arder - Vikipeedia, vaba entsüklopeedia\",\n" +
    "      \"link\": \"https://et.wikipedia.org/wiki/Ott_Arder\",\n" +
    "      \"displayLink\": \"et.wikipedia.org\",\n" +
    "      \"snippet\": \"Lasteraamatud ja luulekogud[muuda | muuda lähteteksti]. \\\"Bumerang\\\" (1980); \\\"\\nÜks kõiksus\\\" (1982); \\\"Koer poiss sõitis jänest\\\" (1982); \\\"Mine metsa\\\" (1986); \\\"\\nTasakaalukeeled\\\" (1988); \\\"Valge raamat\\\" (1989); \\\"Tähetolgus. Tähe(d) tolmus\\\" (\\n2001); \\\"Metsapoolne\\\" (2002); \\\"Puupeatus\\\" (2004); \\\"Luule sünnib kus sünnib kui \\nsünnib\\\" ...\",\n" +
    "      \"htmlSnippet\": \"\u003cb\u003eLasteraamatud\u003c/b\u003e ja luulekogud[muuda | muuda lähteteksti]. &quot;Bumerang&quot; (1980); &quot;\u003cbr\u003e\\nÜks kõiksus&quot; (1982); &quot;Koer poiss sõitis jänest&quot; (1982); &quot;Mine metsa&quot; (1986); &quot;\u003cbr\u003e\\nTasakaalukeeled&quot; (1988); &quot;Valge raamat&quot; (1989); &quot;Tähetolgus. Tähe(d) tolmus&quot; (\u003cbr\u003e\\n2001); &quot;Metsapoolne&quot; (2002); &quot;Puupeatus&quot; (2004); &quot;Luule sünnib kus sünnib kui \u003cbr\u003e\\nsünnib&quot;&nbsp;...\",\n" +
    "      \"cacheId\": \"ExWALH21yjoJ\",\n" +
    "      \"formattedUrl\": \"https://et.wikipedia.org/wiki/Ott_Arder\",\n" +
    "      \"htmlFormattedUrl\": \"https://et.wikipedia.org/wiki/Ott_Arder\",\n" +
    "      \"pagemap\": {\n" +
    "        \"cse_thumbnail\": [\n" +
    "          {\n" +
    "            \"width\": \"182\",\n" +
    "            \"height\": \"277\",\n" +
    "            \"src\": \"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSWLzKYfWsOZrFl2WdmDoQTDsW4ov7z7a_9zZXf0uaHaKV18WFsEqJFSi9F\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"metatags\": [\n" +
    "          {\n" +
    "            \"referrer\": \"origin-when-cross-origin\",\n" +
    "            \"og:image\": \"https://upload.wikimedia.org/wikipedia/commons/0/01/Ott_Arder_2004.jpg\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"cse_image\": [\n" +
    "          {\n" +
    "            \"src\": \"https://upload.wikimedia.org/wikipedia/commons/0/01/Ott_Arder_2004.jpg\"\n" +
    "          }\n" +
    "        ]\n" +
    "      }\n" +
    "    },\n" +
    "    {\n" +
    "      \"kind\": \"customsearch#result\",\n" +
    "      \"title\": \"lasteraamat - Postimees: Värsked uudised Eestist ja välismaalt\",\n" +
    "      \"htmlTitle\": \"\u003cb\u003elasteraamat\u003c/b\u003e - Postimees: Värsked uudised Eestist ja välismaalt\",\n" +
    "      \"link\": \"https://www.postimees.ee/term/31546/lasteraamat\",\n" +
    "      \"displayLink\": \"www.postimees.ee\",\n" +
    "      \"snippet\": \"Postimees: Värsked uudised Eestist ja välismaalt. Loe lähemalt.\",\n" +
    "      \"htmlSnippet\": \"Postimees: Värsked uudised Eestist ja välismaalt. Loe lähemalt.\",\n" +
    "      \"cacheId\": \"ZoRwK8hJ3-sJ\",\n" +
    "      \"formattedUrl\": \"https://www.postimees.ee/term/31546/lasteraamat\",\n" +
    "      \"htmlFormattedUrl\": \"https://www.postimees.ee/term/31546/\u003cb\u003elasteraamat\u003c/b\u003e\",\n" +
    "      \"pagemap\": {\n" +
    "        \"cse_thumbnail\": [\n" +
    "          {\n" +
    "            \"width\": \"259\",\n" +
    "            \"height\": \"194\",\n" +
    "            \"src\": \"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS163gZ1jHmFd0EcHnEmY1aNvROrrGwp4ZQrXKkZpm3lC2eawiqbs5UDW0\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"metatags\": [\n" +
    "          {\n" +
    "            \"og:image\": \"https://f7.pmo.ee/o8L5ljNhnutpP8uit9evYPzs7Uk=/640x480/filters:focal(434x189:512x243)/nginx/o/2017/09/18/7114853t1h7bdc.jpg\",\n" +
    "            \"og:title\": \"lasteraamat - Postimees\",\n" +
    "            \"og:url\": \"https://www.postimees.ee/term/31546/lasteraamat\",\n" +
    "            \"og:site_name\": \"Postimees\",\n" +
    "            \"og:description\": \"Postimees: Värsked uudised Eestist ja välismaalt. Loe lähemalt\",\n" +
    "            \"og:type\": \"website\",\n" +
    "            \"fb:app_id\": \"355558204596855\",\n" +
    "            \"theme-color\": \"#4dade9\",\n" +
    "            \"msapplication-config\": \"/public/img/favicon/81/browserconfig.xml\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"newsarticle\": [\n" +
    "          {\n" +
    "            \"url\": \"Armastatud lasteraamatute kunstnik tähistab 90. sünnipäeva\",\n" +
    "            \"headline\": \"Armastatud lasteraamatute kunstnik tähistab 90. sünnipäeva\",\n" +
    "            \"name\": \"Armastatud lasteraamatute kunstnik tähistab 90. sünnipäeva\",\n" +
    "            \"description\": \"Täna tähistab oma 90. sünnipäeva armastatud lasteraamatute «Muna» ja «Meil maal» kunstnik Lilian Härm Viljandis. 60+ tervitab sünnipäevalist ning sel puhul on paslik meenutada, mida...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Sodoomia, lingvistika, Soome ja Kivirähk. Mis on neil ühist? HeadRead!\",\n" +
    "            \"headline\": \"Sodoomia, lingvistika, Soome ja Kivirähk. Mis on neil ühist? HeadRead!\",\n" +
    "            \"name\": \"Sodoomia, lingvistika, Soome ja Kivirähk. Mis on neil ühist? HeadRead!\",\n" +
    "            \"description\": \"Alustame teise (25.05.2017) kirjandusfestivali päeva ülevaatega. Kõik kolm üritust toimusid järjepannu Kirjanike maja saalis, kirjelduste peale aega ei raiska, see oli täna sama ilus...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Põhjamaade raamatukunstnike turnee Baltikumis algas Eestist\",\n" +
    "            \"headline\": \"Põhjamaade raamatukunstnike turnee Baltikumis algas Eestist\",\n" +
    "            \"name\": \"Põhjamaade raamatukunstnike turnee Baltikumis algas Eestist\",\n" +
    "            \"description\": \"Eesti koole ja raamatukogusid külastavad neil päevil Põhjamaade tuntud ja tunnustatud raamatuillustraatorid Linda Bondestam ja Jenny Lucander. Ringreis viib Soomest pärit kunstnikud kohtuma...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Tiia Selli üllitas lasteraamatu\",\n" +
    "            \"headline\": \"Tiia Selli üllitas lasteraamatu\",\n" +
    "            \"name\": \"Tiia Selli üllitas lasteraamatu\",\n" +
    "            \"description\": \"Rakveres elav kirjanik Tiia Selli, kes varem on kirjutanud nii lastele, täiskasvanutele kui ka teatritekste, üllitas äsja lasteraamatu ‟Pelle parim päev”. Kirjanik rääkis, et Pelle...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Galerii: Merle Liivak esitles pöörast lasteraamatut\",\n" +
    "            \"headline\": \"Galerii: Merle Liivak esitles pöörast lasteraamatut\",\n" +
    "            \"name\": \"Galerii: Merle Liivak esitles pöörast lasteraamatut\",\n" +
    "            \"description\": \"Eelmisel laupäeval, 8. aprillil, esitles ajakirjanik ja kolme lapse ema Merle Liivak oma pere pöörasel kogemusel põhineva looga lasteraamatut «Kukesupp». Saalitäis väikeste ja suurte...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Nipinurk! Kuidas ära tunda tõeliselt hea lasteraamat?\",\n" +
    "            \"headline\": \"Nipinurk! Kuidas ära tunda tõeliselt hea lasteraamat?\",\n" +
    "            \"name\": \"Nipinurk! Kuidas ära tunda tõeliselt hea lasteraamat?\",\n" +
    "            \"description\": \"Möödunud aastal ilmus Eestis pea 800 lasteraamatut ning et selles suures kirjandusdžunglis orienteeruda valib Lastekaitse Liit koostöös lastekirjanduskeskusega välja need raamatud, mis...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Mitmesugused lood ja pildid\",\n" +
    "            \"headline\": \"Mitmesugused lood ja pildid\",\n" +
    "            \"name\": \"Mitmesugused lood ja pildid\",\n" +
    "            \"description\": \"Tiia Toometi kirjutatud lasteraamatute arv on muljet avaldav. Vahele mahub ka teist laadi teoseid, nagu «Maagilise väega nukud», mis on pigem etnograafiline ülevaade eri rahvaste nukkudest,...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Tartus esitletakse täna esimest eestikeelset kogelusteemalist lasteraamatut\",\n" +
    "            \"headline\": \"Tartus esitletakse täna esimest eestikeelset kogelusteemalist lasteraamatut\",\n" +
    "            \"name\": \"Tartus esitletakse täna esimest eestikeelset kogelusteemalist lasteraamatut\",\n" +
    "            \"description\": \"Täna, 18. jaanuari õhtul kell 18 esitleb Eesti kogelejate ühing (EKÜ) Tartu kaubamaja Apollo raamatupoes esimest eestikeelset kogelusteemalist lasteraamatut «Ke-ke-kes teeb u-u-uhhuu?».\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Evelin Ilves teab, et lasteraamatud on palju paremad kui eneseabiõpikud\",\n" +
    "            \"headline\": \"Evelin Ilves teab, et lasteraamatud on palju paremad kui eneseabiõpikud\",\n" +
    "            \"name\": \"Evelin Ilves teab, et lasteraamatud on palju paremad kui eneseabiõpikud\",\n" +
    "            \"description\": \"Evelin Ilves esitles eile Abja raamatupoes oma värsket muinasjuturaamatut «Linnu lood», mis põhineb tema ja Toomas Hendrik Ilvese tütre Kadri Keiu suureks kasvamise sündmustel.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Evelin Ilves teab, et lasteraamatud on palju paremad kui eneseabiõpikud\",\n" +
    "            \"headline\": \"Evelin Ilves teab, et lasteraamatud on palju paremad kui eneseabiõpikud\",\n" +
    "            \"name\": \"Evelin Ilves teab, et lasteraamatud on palju paremad kui eneseabiõpikud\",\n" +
    "            \"description\": \"Evelin Ilves esitles eile Abja raamatupoes oma värsket muinasjuturaamatut «Linnu lood», mis põhineb tema ja Toomas Hendrik Ilvese tütre Kadri Keiu suureks kasvamise sündmustel.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Elu24 otseülekanne! Stig Rästa lastelaulude kogumiku «Tõeline Muinasjutt» esmaesitlus! JÄRELVAADATAV!\",\n" +
    "            \"headline\": \"Elu24 otseülekanne! Stig Rästa lastelaulude kogumiku «Tõeline Muinasjutt» esmaesitlus!\",\n" +
    "            \"name\": \"Elu24 otseülekanne! Stig Rästa lastelaulude kogumiku «Tõeline Muinasjutt» esmaesitlus!\",\n" +
    "            \"description\": \"Pühapäeval, 11. detsembril kell 13:00 toimub Solarise Apollos Stig Rästa maagilise lastelaulude kogumiku «Tõeline Muinasjutt» esmaesitlus.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Galerii: Evelin esitles oma uut lasteraamatut Kristiine keskuses\",\n" +
    "            \"headline\": \"Galerii: Evelin esitles oma uut lasteraamatut Kristiine keskuses\",\n" +
    "            \"name\": \"Galerii: Evelin esitles oma uut lasteraamatut Kristiine keskuses\",\n" +
    "            \"description\": \"Täna ilmus ekspresidendiproua Evelin Ilvese muinasjuturaamat «Linnu lood», mida esitleti Kristiine keskuse Apollo raamatupoes.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Otseülekanne Postimehe veebis: täna toimub Evelin Ilvese muinasjuturaamatu esitlus\",\n" +
    "            \"headline\": \"Otseülekanne Postimehe veebis: täna toimub Evelin Ilvese muinasjuturaamatu esitlus\",\n" +
    "            \"name\": \"Otseülekanne Postimehe veebis: täna toimub Evelin Ilvese muinasjuturaamatu esitlus\",\n" +
    "            \"description\": \"Täna ilmub ekspresidendiproua Evelin Ilvese muinasjuturaamat «Linnu lood», mille pidulik esitlus toimub kell 20.00 Kristiine keskuse Apollo raamatupoes, millest teeb otseülekande ka Postimees...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Evelin Ilvese värske raamatu inspiratsiooniks on tema tütar\",\n" +
    "            \"headline\": \"Evelin Ilvese värske raamatu inspiratsiooniks on tema tütar\",\n" +
    "            \"name\": \"Evelin Ilvese värske raamatu inspiratsiooniks on tema tütar\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"OSCE uueks eesistujaks saanud Itaalia kutsus täitma Minski leppeid\",\n" +
    "            \"headline\": \"OSCE uueks eesistujaks saanud Itaalia kutsus täitma Minski leppeid\",\n" +
    "            \"name\": \"OSCE uueks eesistujaks saanud Itaalia kutsus täitma Minski leppeid\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"President Kaljulaid kutsub noori Eestile sünnipäevakõnet kirjutama\",\n" +
    "            \"headline\": \"President Kaljulaid kutsub noori Eestile sünnipäevakõnet kirjutama\",\n" +
    "            \"name\": \"President Kaljulaid kutsub noori Eestile sünnipäevakõnet kirjutama\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Täna ajaloos 2.01: Päikesesüsteemi keskpaigast leiti väidetav uus planeet\",\n" +
    "            \"headline\": \"Täna ajaloos 2.01: Päikesesüsteemi keskpaigast leiti väidetav uus planeet\",\n" +
    "            \"name\": \"Täna ajaloos 2.01: Päikesesüsteemi keskpaigast leiti väidetav uus planeet\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Brasiilia vanglarahutustes sai surma vähemalt 9, kannatada 14 inimest\",\n" +
    "            \"headline\": \"Brasiilia vanglarahutustes sai surma vähemalt 9, kannatada 14 inimest\",\n" +
    "            \"name\": \"Brasiilia vanglarahutustes sai surma vähemalt 9, kannatada 14 inimest\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Pence'i kantselei: USA asepresidendi visiit Iisraeli on endiselt jõus\",\n" +
    "            \"headline\": \"Pence'i kantselei: USA asepresidendi visiit Iisraeli on endiselt jõus\",\n" +
    "            \"name\": \"Pence'i kantselei: USA asepresidendi visiit Iisraeli on endiselt jõus\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"EL kutsus Iraani tagama inimeste õigus meelt avaldada\",\n" +
    "            \"headline\": \"EL kutsus Iraani tagama inimeste õigus meelt avaldada\",\n" +
    "            \"name\": \"EL kutsus Iraani tagama inimeste õigus meelt avaldada\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Grupp inimesi kogunes südaööl Vabaduse väljakule hümni laulma\",\n" +
    "            \"headline\": \"Grupp inimesi kogunes südaööl Vabaduse väljakule hümni laulma\",\n" +
    "            \"name\": \"Grupp inimesi kogunes südaööl Vabaduse väljakule hümni laulma\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Abbas taunis Iisraeli võimupartei Läänekalda-hääletust\",\n" +
    "            \"headline\": \"Abbas taunis Iisraeli võimupartei Läänekalda-hääletust\",\n" +
    "            \"name\": \"Abbas taunis Iisraeli võimupartei Läänekalda-hääletust\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"«Ärapanija» klipp lööb Soome meedias laineid Lisatud video\",\n" +
    "            \"headline\": \"«Ärapanija» klipp lööb Soome meedias laineid\",\n" +
    "            \"name\": \"«Ärapanija» klipp lööb Soome meedias laineid\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Tšehhid ja slovakid tähistavad «sametlahutuse» 25. aastapäeva\",\n" +
    "            \"headline\": \"Tšehhid ja slovakid tähistavad «sametlahutuse» 25. aastapäeva\",\n" +
    "            \"name\": \"Tšehhid ja slovakid tähistavad «sametlahutuse» 25. aastapäeva\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Nestor keskendus enda uusaastatervituses kodutundele\",\n" +
    "            \"headline\": \"Nestor keskendus enda uusaastatervituses kodutundele\",\n" +
    "            \"name\": \"Nestor keskendus enda uusaastatervituses kodutundele\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Venemaal Orenburgi oblastis sai majapõlengus surma seitse inimest\",\n" +
    "            \"headline\": \"Venemaal Orenburgi oblastis sai majapõlengus surma seitse inimest\",\n" +
    "            \"name\": \"Venemaal Orenburgi oblastis sai majapõlengus surma seitse inimest\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Shiffrin jõudis oma iidoliga samale pulgale\",\n" +
    "            \"headline\": \"Shiffrin jõudis oma iidoliga samale pulgale\",\n" +
    "            \"name\": \"Shiffrin jõudis oma iidoliga samale pulgale\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Video: ETV+ näitas «Puutini» uusaastatervitust\",\n" +
    "            \"headline\": \"Video: ETV+ näitas «Puutini» uusaastatervitust\",\n" +
    "            \"name\": \"Video: ETV+ näitas «Puutini» uusaastatervitust\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Postimehe video: Cologna võit, venelased poodiumil, Sundby alles kuues\",\n" +
    "            \"headline\": \"Postimehe video: Cologna võit, venelased poodiumil, Sundby alles kuues\",\n" +
    "            \"name\": \"Postimehe video: Cologna võit, venelased poodiumil, Sundby alles kuues\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"NBA-s klubita jäänud leedukas leidis uue töökoha Euroliigast\",\n" +
    "            \"headline\": \"NBA-s klubita jäänud leedukas leidis uue töökoha Euroliigast\",\n" +
    "            \"name\": \"NBA-s klubita jäänud leedukas leidis uue töökoha Euroliigast\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Fotod: Assamalla bussipeatuses konutab nukker lömmisõidetud mersu\",\n" +
    "            \"headline\": \"Fotod: Assamalla bussipeatuses konutab nukker lömmisõidetud mersu\",\n" +
    "            \"name\": \"Fotod: Assamalla bussipeatuses konutab nukker lömmisõidetud mersu\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Assad vahetas välja Süüria kaitseministri\",\n" +
    "            \"headline\": \"Assad vahetas välja Süüria kaitseministri\",\n" +
    "            \"name\": \"Assad vahetas välja Süüria kaitseministri\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Aino Pervikult uus raamat\",\n" +
    "            \"headline\": \"Aino Pervikult uus raamat\",\n" +
    "            \"name\": \"Aino Pervikult uus raamat\",\n" +
    "            \"description\": \"Ilmunud on Aino Perviku lasteraamat «Hädaoru kuningas».\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Eesti kirjanike raamatud pälvisid rahvusvahelise tunnustuse\",\n" +
    "            \"headline\": \"Eesti kirjanike raamatud pälvisid rahvusvahelise tunnustuse\",\n" +
    "            \"name\": \"Eesti kirjanike raamatud pälvisid rahvusvahelise tunnustuse\",\n" +
    "            \"description\": \"Suurim rahvusvaheline laste- ja noortekirjanduse raamatukogu maailmas, Internationale Jugendbibliothek, on oma seekordsesse lasteraamatute kataloogi «The White Ravens 2016» valinud kaks Eesti...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Rait Kapp: arvad, et oled eriline?\",\n" +
    "            \"headline\": \"Rait Kapp: arvad, et oled eriline?\",\n" +
    "            \"name\": \"Rait Kapp: arvad, et oled eriline?\",\n" +
    "            \"description\": \"Hiljuti lugesin ühte lihtsat raamatut, Trina Pauluse «Hope for the flowers», mis oli välimuselt ja sisult nagu lasteraamat, aga siiski õpetlik. Lühidalt rääkis see kahest röövikust,...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Evald Okase Muuseumis avatakse Eesti kaasaegse maalikunsti näitus «Suur maalritöö»\",\n" +
    "            \"headline\": \"Evald Okase Muuseumis avatakse Eesti kaasaegse maalikunsti näitus «Suur maalritöö»\",\n" +
    "            \"name\": \"Evald Okase Muuseumis avatakse Eesti kaasaegse maalikunsti näitus «Suur maalritöö»\",\n" +
    "            \"description\": \"Ellen Niidu tekstide ja Edgar Valteri piltidega legendaarne lasteraamat «Suur maalritöö» (1971) ilmus ajal, mil kunstnikele oli antud ametlik voli ühiskonna kujundamises kaasa lüüa ning...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Lendur huulepulgaga: unustatud Eesti esimese naislenduri värvikad seiklused üle ilma\",\n" +
    "            \"headline\": \"Lendur huulepulgaga: unustatud Eesti esimese naislenduri värvikad seiklused üle ilma\",\n" +
    "            \"name\": \"Lendur huulepulgaga: unustatud Eesti esimese naislenduri värvikad seiklused üle ilma\",\n" +
    "            \"commentcount\": \"2\",\n" +
    "            \"description\": \"Eesti esimesel naislenduril Elvy Kalepil oli tormiline elu. Tema isiksus oli seejuures särav ja väga köitev. Vahva naise kreedoks oli: elu tuleb võtta suure lusikaga.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Kolm korda elagu Karu! (Kes? Ei saa aru?)\",\n" +
    "            \"headline\": \"Kolm korda elagu Karu! (Kes? Ei saa aru?)\",\n" +
    "            \"name\": \"Kolm korda elagu Karu! (Kes? Ei saa aru?)\",\n" +
    "            \"description\": \"Ühel varakevadisel päeval astus Haapsalu lasteraamatukogu uksest sisse väljapeetud moega härrasmees ja küsis raamatut maailma suurimast filosoofist. No nüüd paneb proovile! Mõtlesin...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Vaataja lüüakse rahapaki ja arvutianimatsiooniga uimaseks\",\n" +
    "            \"headline\": \"Vaataja lüüakse rahapaki ja arvutianimatsiooniga uimaseks\",\n" +
    "            \"name\": \"Vaataja lüüakse rahapaki ja arvutianimatsiooniga uimaseks\",\n" +
    "            \"description\": \"«Alice peeglitagusel maal», 2016 Režissöör James Bobin, osatäitjad: Johnny Depp, Mia Wasikowska, Anne Hathaway, Helena Bonham Carter, Sacha Baron Cohen jt -------------\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Tallinn tähistab trammiprojekti lõppu lasteraamatuga\",\n" +
    "            \"headline\": \"Tallinn tähistab trammiprojekti lõppu lasteraamatuga\",\n" +
    "            \"name\": \"Tallinn tähistab trammiprojekti lõppu lasteraamatuga\",\n" +
    "            \"description\": \"Tallinna Linnatranspordi AS (TLT) tutvustab 20 uue CAF Urbos trammi linlaste käsutusse jõudmise puhul Raekojas korraldatud vastuvõtul lasteraamatut «Tramm nimega Moonika».\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Armastatud lapsepõlvekangelaste välismaine peidus pool\",\n" +
    "            \"headline\": \"Armastatud lapsepõlvekangelaste välismaine peidus pool\",\n" +
    "            \"name\": \"Armastatud lapsepõlvekangelaste välismaine peidus pool\",\n" +
    "            \"description\": \"Milline on õige Sammalhabe? Kas Sipsik võib olla pruun? Kuidas kujutab brasiilia kunstnik «Kevade» saunaskäiku, kui Kiire tagumik külmast naks ja naks lavalaudade külge kinni jäi? Eesti...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Evelin Ilves paljastas tulevikuplaane: hakkan ka ise järgima neid nõuandeid, mida teistele annan\",\n" +
    "            \"headline\": \"Evelin Ilves paljastas tulevikuplaane: hakkan ka ise järgima neid nõuandeid, mida teistele annan\",\n" +
    "            \"name\": \"Evelin Ilves paljastas tulevikuplaane: hakkan ka ise järgima neid nõuandeid, mida teistele annan\",\n" +
    "            \"description\": \"Üheksa aastat tagasi võttis tollane presidendi\u00adproua missiooniks rää\u00adkida tervislikkuse teemal. Üleeile ütles Evelin Ilves Tapal toimunud loengul, et nüüd on see tema töö.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Just need on head lasteraamatud!\",\n" +
    "            \"headline\": \"Just need on head lasteraamatud!\",\n" +
    "            \"name\": \"Just need on head lasteraamatud!\",\n" +
    "            \"description\": \"MTÜ Lastekaitse Liit eestvedamisel valisid lastekirjanduse eksperdid 2015. a ilmunud uudiskirjanduse hulgast juba seitsmendat aastat järjest välja Head lasteraamatud. 2015. aastal parimateks...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Heljo Mänd: ema ja abikaasa armastus tegid minust kirjaniku\",\n" +
    "            \"headline\": \"Heljo Mänd: ema ja abikaasa armastus tegid minust kirjaniku\",\n" +
    "            \"name\": \"Heljo Mänd: ema ja abikaasa armastus tegid minust kirjaniku\",\n" +
    "            \"description\": \"Elutööpreemiale on sel aastal esitatud lausa kolm lastekirjanikku: Aino Pervik, Ira Lember ja Heljo Mänd. Ehkki kolmest prouast kaks võivad peagi tähistada (Mänd veebruaris, Lember mais...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Lasteraamat selgitab hiljutise lumepuuduse tagamaid\",\n" +
    "            \"headline\": \"Lasteraamat selgitab hiljutise lumepuuduse tagamaid\",\n" +
    "            \"name\": \"Lasteraamat selgitab hiljutise lumepuuduse tagamaid\",\n" +
    "            \"description\": \"Lettidele jõudis lasteraamat «Timbu-Limbu õukond ja lumemöldrid», mis on müügil ka Valgamaalase toimetuses.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Piret Raud kõige popim lastekirjanik\",\n" +
    "            \"headline\": \"Piret Raud kõige popim lastekirjanik\",\n" +
    "            \"name\": \"Piret Raud kõige popim lastekirjanik\",\n" +
    "            \"description\": \"Veebruari alguses ilmus Prantsuse kirjastuselt Éditions du Rouergue Jeunesse Piret Raua lasteraamat «Emily et tout un tas de choses». Tegemist on Eesti kirjanduselus haruldase sündmusega,...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Elustiili soovitused: mida teha jõuluajal?\",\n" +
    "            \"headline\": \"Elustiili soovitused: mida teha jõuluajal?\",\n" +
    "            \"name\": \"Elustiili soovitused: mida teha jõuluajal?\",\n" +
    "            \"description\": \"Mida teha kaunil jõuluajal? Elustiil soovitab!\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Lustlike tegelastega lasteraamat\",\n" +
    "            \"headline\": \"Lustlike tegelastega lasteraamat\",\n" +
    "            \"name\": \"Lustlike tegelastega lasteraamat\",\n" +
    "            \"description\": \"Muusikuna tuntud viljandlannalt Farištamo Susilt on ilmunud esimene ilukirjanduslik katsetus, lasteraamat «Niru, Vääks ja sõbrad».\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Selgusid Soome kirjandusauhinna võitjad\",\n" +
    "            \"headline\": \"Selgusid Soome kirjandusauhinna võitjad\",\n" +
    "            \"name\": \"Selgusid Soome kirjandusauhinna võitjad\",\n" +
    "            \"description\": \"Soome Rahvusteatris kuuluati pidulikult välja tänavune Finlandia auhind. Soome tähtsaima kirjandusauhinna pälvis Laura Lindstedt romaani „Oneiron“ eest. Selgusid ka Finlandia Juniori...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Postimees teeb ülekande Kivirähki uue lasteraamatu esitlusest\",\n" +
    "            \"headline\": \"Postimees teeb ülekande Kivirähki uue lasteraamatu esitlusest\",\n" +
    "            \"name\": \"Postimees teeb ülekande Kivirähki uue lasteraamatu esitlusest\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Pharrell Williams esitles lasteraamatut “Happy”!\",\n" +
    "            \"headline\": \"Pharrell Williams esitles lasteraamatut “Happy”!\",\n" +
    "            \"name\": \"Pharrell Williams esitles lasteraamatut “Happy”!\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Tarmo Tuule jutustab ülemeelikuid lugusid\",\n" +
    "            \"headline\": \"Tarmo Tuule jutustab ülemeelikuid lugusid\",\n" +
    "            \"name\": \"Tarmo Tuule jutustab ülemeelikuid lugusid\",\n" +
    "            \"description\": \"Tarmo Tuule «Tattnokk ehk lapsed pole milleski süüdi» Pildid joonistas Piia Maiste Kanavere, 2014\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Lood on need, mis loevad\",\n" +
    "            \"headline\": \"Lood on need, mis loevad\",\n" +
    "            \"name\": \"Lood on need, mis loevad\",\n" +
    "            \"description\": \"Pealkiri ja eeslehe kujundusena kasutatud maakaart lubavad teadja moega noogutada – ahah, taas üks väikelasteraamat, mis tutvustab maid ja rahvaid.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Epp Petrone esitleb lasteraamatut\",\n" +
    "            \"headline\": \"Epp Petrone esitleb lasteraamatut\",\n" +
    "            \"name\": \"Epp Petrone esitleb lasteraamatut\",\n" +
    "            \"description\": \"Kirjastaja Epp Petronel ilmus lasteraamat «Leena peenar», mille esitlus on pühapäeval kell 13 Viljandi Centrumi keskuses Rahva Raamatu kaupluses.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Video! Jaagup Kreem: valmimas on musavideo ja raamat\",\n" +
    "            \"headline\": \"Video! Jaagup Kreem: valmimas on musavideo ja raamat\",\n" +
    "            \"name\": \"Video! Jaagup Kreem: valmimas on musavideo ja raamat\",\n" +
    "            \"description\": \"Eilse TV3 vestlussaate «Õhtu» külaline Jaagup Kreem rääkis, et bändiga on on neil valmimas muusikavideo ning lisaks on temal endal pooleli lasteraamatu kirjutamine.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Kultuslik papiraamat „Muna” läks uuele ringile\",\n" +
    "            \"headline\": \"Kultuslik papiraamat „Muna” läks uuele ringile\",\n" +
    "            \"name\": \"Kultuslik papiraamat „Muna” läks uuele ringile\",\n" +
    "            \"description\": \"Vähe on neid 30. ja 40. eluaastates eestlasi, kelle lapsepõlves poleks koduses raamaturiiulis või mänguasjakastis leidunud tugevast papist raamatukest lakoonilise pealkirjaga „Muna“....\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Moskvas avati Eesti lasteraamatute illustratsioonide ülevaatenäitus\",\n" +
    "            \"headline\": \"Moskvas avati Eesti lasteraamatute illustratsioonide ülevaatenäitus\",\n" +
    "            \"name\": \"Moskvas avati Eesti lasteraamatute illustratsioonide ülevaatenäitus\",\n" +
    "            \"description\": \"19. märtsil Avati Moskvas A. Gribojedovi nimelises lasteraamatukogus näitus «Südamega tehtud. Eesti lasteraamatute illustratsioonid».\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Andrus Kivirähk esitles uut lasteraamatut\",\n" +
    "            \"headline\": \"Andrus Kivirähk esitles uut lasteraamatut\",\n" +
    "            \"name\": \"Andrus Kivirähk esitles uut lasteraamatut\",\n" +
    "            \"description\": \"Andrus Kivirähki (suurel pildil noore lugejaga vestlemas) populaarne lasteraamat «Kaka ja kevad» sai järje.\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"Uhkuse ja südamega lastekirjanik\",\n" +
    "            \"headline\": \"Uhkuse ja südamega lastekirjanik\",\n" +
    "            \"name\": \"Uhkuse ja südamega lastekirjanik\",\n" +
    "            \"description\": \"Täna, 11. veebruaril ilmub Prantsuse kirjastuselt Éditions du Rouergue Jeunesse Piret Raua lasteraamat «Emily et tout un tas de choses». Tegemist on Eesti kirjanduselus haruldase sündmusega,...\"\n" +
    "          },\n" +
    "          {\n" +
    "            \"url\": \"«Kaka ja kevad» saab järje\",\n" +
    "            \"headline\": \"«Kaka ja kevad» saab järje\",\n" +
    "            \"name\": \"«Kaka ja kevad» saab järje\",\n" +
    "            \"description\": \"Kirjastuse Varrak väljaandel ilmub veebruaris Andrus Kivirähki uus lasteraamat «Karneval ja kartulisalat».\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"cse_image\": [\n" +
    "          {\n" +
    "            \"src\": \"https://f7.pmo.ee/o8L5ljNhnutpP8uit9evYPzs7Uk=/640x480/filters:focal(434x189:512x243)/nginx/o/2017/09/18/7114853t1h7bdc.jpg\"\n" +
    "          }\n" +
    "        ]\n" +
    "      }\n" +
    "    },\n" +
    "    {\n" +
    "      \"kind\": \"customsearch#result\",\n" +
    "      \"title\": \"Edgar Valter - Vikipeedia, vaba entsüklopeedia\",\n" +
    "      \"htmlTitle\": \"Edgar Valter - Vikipeedia, vaba entsüklopeedia\",\n" +
    "      \"link\": \"https://et.wikipedia.org/wiki/Edgar_Valter\",\n" +
    "      \"displayLink\": \"et.wikipedia.org\",\n" +
    "      \"snippet\": \"Vabakutselise kunstnikuna illustreeris ta umbes 250 raamatut, enamik neist \\nlasteraamatud. Tema karikatuure on avaldanud paljud ajakirjad ja ajalehed. \\nEsimene karikatuur ilmus 1944 aastal \\\"Õhtulehes\\\", ajakirjas \\\"Pikker\\\" selle \\nilmumisest alates (1957) oli selle väljaande pidev kaastöötaja. Edgar Valter on \\nteinud kaastööd ...\",\n" +
    "      \"htmlSnippet\": \"Vabakutselise kunstnikuna illustreeris ta umbes 250 raamatut, enamik neist \u003cbr\u003e\\n\u003cb\u003elasteraamatud\u003c/b\u003e. Tema karikatuure on avaldanud paljud ajakirjad ja ajalehed. \u003cbr\u003e\\nEsimene karikatuur ilmus 1944 aastal &quot;Õhtulehes&quot;, ajakirjas &quot;Pikker&quot; selle \u003cbr\u003e\\nilmumisest alates (1957) oli selle väljaande pidev kaastöötaja. Edgar Valter on \u003cbr\u003e\\nteinud kaastööd&nbsp;...\",\n" +
    "      \"cacheId\": \"sAWpYGDkR7cJ\",\n" +
    "      \"formattedUrl\": \"https://et.wikipedia.org/wiki/Edgar_Valter\",\n" +
    "      \"htmlFormattedUrl\": \"https://et.wikipedia.org/wiki/Edgar_Valter\",\n" +
    "      \"pagemap\": {\n" +
    "        \"cse_thumbnail\": [\n" +
    "          {\n" +
    "            \"width\": \"220\",\n" +
    "            \"height\": \"165\",\n" +
    "            \"src\": \"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTFX989O6AjHtZIoXOwZWqc0QW67hBKog9emvn8BlhM4jmUdHAzwcLD8zs\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"metatags\": [\n" +
    "          {\n" +
    "            \"referrer\": \"origin-when-cross-origin\"\n" +
    "          }\n" +
    "        ],\n" +
    "        \"cse_image\": [\n" +
    "          {\n" +
    "            \"src\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pokumaa_hooned.JPG/220px-Pokumaa_hooned.JPG\"\n" +
    "          }\n" +
    "        ]\n" +
    "      }\n" +
    "    }\n" +
    "  ]"
  )
  */
});
