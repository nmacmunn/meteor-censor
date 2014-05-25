Package.describe({
  summary: "Lets you transform published documents"
});

Package.on_use(function (api, where) {
  api.add_files('censor.js', ['server']);
});

Package.on_test(function (api) {
  api.use('censor');
  api.add_files('censor_tests.js', ['server']);
});
