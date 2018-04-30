var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// inspiration: https://dribbble.com/shots/3003823-Notification-Dropdown

var _React = React,
    Component = _React.Component;
var _ReactMotion = ReactMotion,
    Motion = _ReactMotion.Motion,
    StaggeredMotion = _ReactMotion.StaggeredMotion,
    spring = _ReactMotion.spring,
    presets = _ReactMotion.presets;

var Media = function (_Component) {
  _inherits(Media, _Component);

  function Media() {
    _classCallCheck(this, Media);

    return _possibleConstructorReturn(this, (Media.__proto__ || Object.getPrototypeOf(Media)).apply(this, arguments));
  }

  _createClass(Media, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var cls = "nav__notifications__list__item" + (this.props.new ? " nav__notifications__list__item--new" : "");
      return React.createElement(
        "li",
        { style: this.props.style, className: cls },
        React.createElement(
          "div",
          { className: "nav__notifications__list__item__display" },
          React.createElement(
            Motion,
            { defaultStyle: { x: 0.6 }, style: { x: spring(this.props.open ? 1 : 0.6, presets.wobbly) } },
            function (interp) {
              return React.createElement("img", { src: _this2.props.imageURL, className: "nav__notifications__list__item__photo", style: { transform: "scale(" + interp.x + ")" } });
            }
          )
        ),
        React.createElement(
          "div",
          { className: "nav__notifications__list__item__desc" },
          React.createElement(
            Motion,
            { defaultStyle: { x: 0 }, style: { x: spring(this.props.open ? 0 : 1, presets.wobbly) } },
            function (interp) {
              return React.createElement(
                "div",
                { style: { transform: "translateZ(0) translateY(" + -15 * interp.x + "px)", opacity: 1 - interp.x } },
                React.createElement(
                  "em",
                  null,
                  _this2.props.name
                ),
                " ",
                _this2.props.action,
                " ",
                React.createElement(
                  "em",
                  null,
                  " ",
                  _this2.props.content
                ),
                "."
              );
            }
          )
        )
      );
    }
  }]);

  return Media;
}(Component);

var NotificationsBar = function (_Component2) {
  _inherits(NotificationsBar, _Component2);

  function NotificationsBar(props) {
    _classCallCheck(this, NotificationsBar);

    var _this3 = _possibleConstructorReturn(this, (NotificationsBar.__proto__ || Object.getPrototypeOf(NotificationsBar)).call(this, props));

    _this3.state = {
      media: [{ imgURL: 'https://randomuser.me/api/portraits/men/74.jpg',
        name: 'Gerlald Thompson',
        action: 'approved your request to',
        content: 'become friends',
        new: true }, { imgURL: 'https://randomuser.me/api/portraits/women/32.jpg',
        name: 'Dana Newman',
        action: 'liked',
        content: 'your photo',
        new: true }, { imgURL: 'https://randomuser.me/api/portraits/men/93.jpg',
        name: 'Dan Ingrid',
        action: 'also commented on',
        content: 'your status',
        new: true }, { imgURL: 'https://randomuser.me/api/portraits/women/16.jpg',
        name: 'Lena Direlson',
        action: 'checked in at',
        content: 'Greenstreet Pub',
        new: false }, { imgURL: 'https://randomuser.me/api/portraits/men/78.jpg',
        name: 'Dan Witherson',
        action: 'also commented on',
        content: 'your status',
        new: false }]
    };
    return _this3;
  }

  _createClass(NotificationsBar, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var media = this.state.media;

      var motionParams = media.map(function (_) {
        return Object.assign({}, { h: 0 });
      });

      return React.createElement(
        Motion,
        { defaultStyle: { opacity: 0 }, style: { opacity: spring(this.props.open ? 1 : 0, presets.stiff) } },
        function (interpOuter) {
          return React.createElement(
            "div",
            { style: interpOuter, className: "nav__notification_bar" },
            React.createElement(
              Motion,
              { defaultStyle: { x: 0 }, style: { x: spring(_this4.props.open ? 0 : -5, presets.stiff) } },
              function (interp) {
                return React.createElement(
                  "h3",
                  { style: { transform: "translateY(" + interp.x + "px)" } },
                  "Notifications"
                );
              }
            ),
            React.createElement(
              StaggeredMotion,
              { defaultStyles: motionParams, styles: function styles(prevInterpolatedStyles) {
                  return prevInterpolatedStyles.map(function (_, i) {
                    return i === 0 ? { h: spring(_this4.props.open ? 100 : 0, presets.wobbly) } : { h: spring(prevInterpolatedStyles[i - 1].h) };
                  });
                } },
              function (interps) {
                return React.createElement(
                  "ul",
                  { className: "nav__notifications__list" },
                  interps.map(function (style, i) {
                    return React.createElement(Media, { key: i, style: { height: style.h }, imageURL: media[i].imgURL, name: media[i].name, action: media[i].action, content: media[i].content, open: _this4.props.open, "new": media[i].new });
                  })
                );
              }
            )
          );
        }
      );
    }
  }]);

  return NotificationsBar;
}(Component);

var Notifications = function (_Component3) {
  _inherits(Notifications, _Component3);

  function Notifications(props) {
    _classCallCheck(this, Notifications);

    var _this5 = _possibleConstructorReturn(this, (Notifications.__proto__ || Object.getPrototypeOf(Notifications)).call(this, props));

    _this5.toggleNotificationBar = _this5.toggleNotificationBar.bind(_this5);
    _this5.count = 0;
    return _this5;
  }

  _createClass(Notifications, [{
    key: "toggleNotificationBar",
    value: function toggleNotificationBar() {
      this.props.toggleNotificationsBar();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "nav__notification" },
        React.createElement("span", { className: "nav__notification__icon", onClick: this.toggleNotificationBar }),
        React.createElement(
          Motion,
          { defaultStyle: { x: 0 }, style: { x: spring(this.props.open ? 0 : 1, presets.stiff) } },
          function (interp) {
            return React.createElement(
              "span",
              { className: "nav__notification__num", style: { transform: "translateZ(0) scale(" + interp.x, opacity: interp.x } },
              "3"
            );
          }
        ),
        React.createElement(NotificationsBar, { open: this.props.open })
      );
    }
  }]);

  return Notifications;
}(Component);

var NavBar = function (_Component4) {
  _inherits(NavBar, _Component4);

  function NavBar(props) {
    _classCallCheck(this, NavBar);

    var _this6 = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

    _this6.state = {
      isNotificationsOpen: false
    };
    _this6.toggleNotificationsBar = _this6.toggleNotificationsBar.bind(_this6);
    _this6.closeNotificationsBar = _this6.closeNotificationsBar.bind(_this6);
    return _this6;
  }

  _createClass(NavBar, [{
    key: "toggleNotificationsBar",
    value: function toggleNotificationsBar() {
      this.setState(_extends({}, this.state, { isNotificationsOpen: !this.state.isNotificationsOpen }));
    }
  }, {
    key: "closeNotificationsBar",
    value: function closeNotificationsBar() {
      if (!this.state.isNotificationsOpen) return;
      this.setState(_extends({}, this.state, { isNotificationsOpen: false }));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "nav",
        { tabIndex: "0", onBlur: this.closeNotificationsBar },
        React.createElement(Notifications, { toggleNotificationsBar: this.toggleNotificationsBar, open: this.state.isNotificationsOpen })
      );
    }
  }]);

  return NavBar;
}(Component);

ReactDOM.render(React.createElement(NavBar, null), document.body);