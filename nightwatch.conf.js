module.exports = {
  src_folders: [],

  test_workers: {
    enabled: true,
    workers: 'auto',
  },

  test_settings: {
    default: {
      launch_url: 'https://nightwatchjs.org',
    },

    selenium: {
      selenium: {
        start_process: true,
        port: 4444,
        server_path: require('selenium-server').path,
        cli_args: {
          'webdriver.chrome.driver': require('chromedriver').path,
        },
      },
      webdriver: {
        start_process: false,
      },
    },

    chrome: {
      extends: 'selenium',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          w3c: false,
        },
      },
    },
  },
};
