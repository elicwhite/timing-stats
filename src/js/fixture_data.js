module.exports = [
  {
    id: 1,
    stages: [{
      stage: 'npm',
      start: 1467842086560,
      end: 1467842232944
    },
    {
      stage: 'deps',
      start: 1467842086560,
      end: 1467842086565
    },
    {
      stage: 'create-tmp-dirs',
      start: 1467842086561,
      end: 1467842086589
    },
    {
      stage: 'update-config-properties',
      start: 1467842086561,
      end: 1467842086853
    },
    {
      stage: 'check-invalid-chars',
      start: 1467842086562,
      end: 1467842086585
    },
    {
      stage: 'check-escaping',
      start: 1467842086562,
      end: 1467842086621
    },
    {
      stage: 'clear-results',
      start: 1467842086562,
      end: 1467842086575
    },
    {
      stage: 'check-line-length',
      start: 1467842086563,
      end: 1467842086613
    },
    {
      stage: 'ruby',
      start: 1467842086580,
      end: 1467842086703
    },
    {
      stage: 'bundler',
      start: 1467842086707,
      end: 1467842098137
    },
    {
      stage: 'jstest',
      start: 1467842232947,
      end: 1467842630299
    },
    {
      stage: 'npm-run-build-stubs',
      start: 1467842232947,
      end: 1467842237697
    },
    {
      stage: 'check-console',
      start: 1467842232948,
      end: 1467842233032
    },
    {
      stage: 'rubocop',
      start: 1467842237702,
      end: 1467842281596
    },
    {
      stage: 'test-prod',
      start: 1467842237710,
      end: 1467842283407
    },
    {
      stage: 'test-parallel',
      start: 1467842237710,
      end: 1467842736927
    },
    {
      stage: 'check-queries',
      start: 1467842237714,
      end: 1467842279463
    }]
  },
  {
    id: 2,
    stages: [{
      stage: 'check-escaping',
      start: 1467844880138,
      end: 1467844880698
    },
    {
      stage: 'update-config-properties',
      start: 1467844880138,
      end: 1467844880333
    },
    {
      stage: 'deps',
      start: 1467844880138,
      end: 1467844880150
    },
    {
      stage: 'clear-results',
      start: 1467844880138,
      end: 1467844880166
    },
    {
      stage: 'create-tmp-dirs',
      start: 1467844880140,
      end: 1467844880362
    },
    {
      stage: 'npm',
      start: 1467844880140,
      end: 1467845033766
    },
    {
      stage: 'check-line-length',
      start: 1467844880140,
      end: 1467844880703
    },
    {
      stage: 'check-invalid-chars',
      start: 1467844880142,
      end: 1467844880703
    },
    {
      stage: 'ruby',
      start: 1467844880170,
      end: 1467844880516
    },
    {
      stage: 'bundler',
      start: 1467844880520,
      end: 1467844911389
    },
    {
      stage: 'jstest',
      start: 1467845033770,
      end: 1467845513003
    },
    {
      stage: 'npm-run-build-stubs',
      start: 1467845033770,
      end: 1467845039150
    },
    {
      stage: 'check-console',
      start: 1467845033770,
      end: 1467845034582
    },
    {
      stage: 'rubocop',
      start: 1467845039155,
      end: 1467845889402
    },
    {
      stage: 'test-parallel',
      start: 1467845039156,
      end: 1467845611028
    },
    {
      stage: 'check-queries',
      start: 1467845039157,
      end: 1467845084396
    },
    {
      stage: 'test-prod',
      start: 1467845039158,
      end: 1467845088452
    }]
  }
];

console.log('foo');
console.log(JSON.stringify(module.exports));
