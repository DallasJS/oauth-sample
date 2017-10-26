'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = withAuth;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _app = require('../../lib/app');

var _app2 = _interopRequireDefault(_app);

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/alexisabril/Projects/oauth-sample/component/auth/index.js';
function withAuth(AuthComponent) {
	return function (_Component) {
		(0, _inherits3.default)(Authenticated, _Component);

		function Authenticated(props) {
			(0, _classCallCheck3.default)(this, Authenticated);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Authenticated.__proto__ || (0, _getPrototypeOf2.default)(Authenticated)).call(this, props));

			_this.state = {
				authenticated: false
			};
			return _this;
		}

		(0, _createClass3.default)(Authenticated, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				_app2.default.authenticate().then(function () {
					_this2.setState({ authenticated: true });
				}).catch(function () {
					_index2.default.replace('/login');
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement('div', {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 25
					}
				}, this.state.authenticated && _react2.default.createElement(AuthComponent, (0, _extends3.default)({}, this.props, {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 27
					}
				})));
			}
		}]);

		return Authenticated;
	}(_react.Component);
};