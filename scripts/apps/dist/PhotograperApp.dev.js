"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PhotograperApp =
/*#__PURE__*/
function () {
  function PhotograperApp() {
    _classCallCheck(this, PhotograperApp);

    this.$photographerHeader = document.querySelector('.photographer-header');
    this.$mediasWrapper = document.querySelector('.medias-wrapper');
    this.$label = document.querySelector('.medias-wrapper .cartouche');
    this.$totalLikes = 0;
  }

  _createClass(PhotograperApp, [{
    key: "main",
    value: function main() {
      var _this = this;

      var photographerHeader, mediasData, Sorter, likes;
      return regeneratorRuntime.async(function main$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.params = new URLSearchParams(document.location.search);
              this.name = this.params.get("name");
              this.idPhotographer = parseInt(this.params.get("idPhotographer"));
              this.city = this.params.get("city");
              this.country = this.params.get("country");
              this.tagline = this.params.get("tagline");
              this.price = this.params.get("price");
              this.portrait = this.params.get("portrait");
              photographerHeader = "\n            <div class=\"photographer-cartridge\">\n                <h1><div class=\"photographer-name\">".concat(this.name, "</div></h1>\n                <div class=\"photographer-location\">").concat(this.city, ", ").concat(this.country, "</div>\n                <div class=\"photographer-tagline\">").concat(this.tagline, "</div>\n            </div>\n            <button type=\"button\" class=\"contact-button\" onclick=\"displayModal()\">Contactez-moi</button>\n            <div class=\"photographer-portrait\">\n                <img src=\"").concat(this.portrait, "\" alt=\"").concat(this.name, "\"/>\n            </div>\n        ");
              this.$photographerHeader.innerHTML = photographerHeader; // Ici je récupère les medias de mon fichier photographers.json

              _context.t0 = regeneratorRuntime;
              _context.next = 13;
              return regeneratorRuntime.awrap(fetch('/data/photographers.json'));

            case 13:
              _context.t1 = _context.sent.json();
              _context.next = 16;
              return _context.t0.awrap.call(_context.t0, _context.t1);

            case 16:
              _context.t2 = _context.sent;
              mediasData = [_context.t2][0].media;
              Sorter = new SorterForm(mediasData);
              Sorter.render();
              mediasData // Ici, je transforme mon tableau de données en un tableau de classe Factory
              .map(function (media) {
                return new PhotographerFactory(media, 'media');
              }).forEach(function (media) {
                if (media.photographerId === _this.idPhotographer) {
                  _this.$totalLikes = _this.$totalLikes + media.likes;
                  var Template = mediaCardWithPlayer(new MediaCard(media));

                  _this.$mediasWrapper.appendChild(Template.createMediaCard());
                }
              });
              likes = "\n                <span><div>".concat(this.$totalLikes, "</div> <em class=\"fa fa-heart\" aria-hidden=\"true\"></em></span>\n                <div>").concat(this.price, "\u20AC/jour</div>\n            ");
              this.$label.innerHTML = likes;

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return PhotograperApp;
}();

var photographerApp = new PhotograperApp();
photographerApp.main();