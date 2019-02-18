/* eslint-disable no-undef */
/* eslint-disable camelcase */

// Customize webpack output public path on runtime
// needs to be set before other webpack imports
// https://github.com/webpack/webpack/issues/443#issuecomment-54113862
// https://webpack.js.org/guides/public-path/

__webpack_public_path__ = window.networkBundlePath || '/';
