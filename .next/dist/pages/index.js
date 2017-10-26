'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _app = require('../lib/app');

var _app2 = _interopRequireDefault(_app);

var _auth = require('../component/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/alexisabril/Projects/oauth-sample/pages/index.js?entry';


var Index = function (_Component) {
	(0, _inherits3.default)(Index, _Component);

	function Index(props) {
		(0, _classCallCheck3.default)(this, Index);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Index.__proto__ || (0, _getPrototypeOf2.default)(Index)).call(this, props));

		_this.state = {
			messages: [],
			message: ''
		};

		_this.setMessage = _this.setMessage.bind(_this);
		_this.postMessage = _this.postMessage.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(Index, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			_app2.default.service('messages').find().then(function (messages) {
				_this2.setState({ messages: messages });
			});

			_app2.default.service('messages').on('created', function (message) {
				_this2.setState({
					messages: _this2.state.messages.concat([message])
				});
			});
		}
	}, {
		key: 'setMessage',
		value: function setMessage(ev) {
			this.setState({ message: ev.target.value });
		}
	}, {
		key: 'postMessage',
		value: function postMessage(ev) {
			ev.preventDefault();
			_app2.default.service('messages').create({ text: this.state.message });
			this.setState({ message: '' });
		}
	}, {
		key: 'render',
		value: function render() {
			var messages = this.state.messages.map(function (message) {
				return _react2.default.createElement('li', { key: message.id, __source: {
						fileName: _jsxFileName,
						lineNumber: 41
					}
				}, _react2.default.createElement('em', {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 41
					}
				}, message.user), ': ', message.text);
			});

			return _react2.default.createElement('div', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 44
				}
			}, _react2.default.createElement('input', { value: this.state.message, onChange: this.setMessage, __source: {
					fileName: _jsxFileName,
					lineNumber: 45
				}
			}), _react2.default.createElement('input', { type: 'button', value: 'Send Message', onClick: this.postMessage, __source: {
					fileName: _jsxFileName,
					lineNumber: 46
				}
			}), _react2.default.createElement('ul', {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 48
				}
			}, messages));
		}
	}]);

	return Index;
}(_react.Component);

exports.default = (0, _auth2.default)(Index);