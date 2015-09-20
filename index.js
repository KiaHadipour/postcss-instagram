'use strict';

var postcss = require('postcss');
module.exports = postcss.plugin('postcss-instagram', function () {
  return function (css) {

    // Filter: Kalvin
    var filterKalvin = function(decl) {
      var origRule = decl.parent,
        ruleSelectors = origRule.selectors,
        afterRuleSelectors,
        imgRuleSelectors,
        afterRule,
        kalvinRule;


          afterRuleSelectors = ruleSelectors.map(function(ruleSelector){
                return ruleSelector + ':after';
          }).join(',\n');

          imgRuleSelectors = ruleSelectors.map(function(ruleSelector){
                return ruleSelector + ' img';
          }).join(',\n');


        afterRule = origRule.cloneBefore({
          selector: afterRuleSelectors
        }).removeAll();

        kalvinRule = origRule.cloneBefore({
          selector: imgRuleSelectors
        }).removeAll();

        kalvinRule.append('filter:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="0.8179 0.23070000000000002 0.0567 0 0 0.10470000000000002 0.9058 0.050400000000000014 0 0 0.0816 0.1602 0.7393 0 0 0 0 0 1 0" /><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="1.9444000000000004 -0.858 -0.08640000000000002 0 0 -0.25560000000000005 1.3639999999999999 -0.08640000000000002 0 0 -0.25560000000000005 -0.858 2.1136000000000004 0 0 0 0 0 1 0" /><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="1.3" /><feFuncG type="linear" slope="1.3" /><feFuncB type="linear" slope="1.3" /></feComponentTransfer><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="1" intercept="0" /><feFuncG type="linear" slope="1" intercept="0" /><feFuncB type="linear" slope="1" intercept="0" /></feComponentTransfer></filter></svg>#filter\');filter:sepia(0.3) saturate(2.2) brightness(1.3) contrast(1);-webkit-filter:sepia(0.3) saturate(2.2) brightness(1.3) contrast(1)');

        afterRule.append('box-shadow:inset 0 0 3em #222;position:absolute;top:0;right:0;bottom:2px;left:0;z-index:1;content:\'\'');

        origRule.append('position:relative;display:inline-block');

        decl.remove();
      };


      css.walkDecls('filter', function(decl) {
        switch (decl.value) {
          case 'kalvin':
            filterKalvin(decl);
            break;
        }
      });
    };
  });
