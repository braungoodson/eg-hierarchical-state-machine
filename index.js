angular
	.module('app',['eg.hsm'])
	.provider('appProvider',[function(){this.$get=[function(){return new appProvider();}];function appProvider(){}}])
	.service('appService',[function(){return{};}])
	.factory('appFactory',[function(){return{};}])
	.directive('appDirective',[function(){return{};}])
;

angular
  .module('eg.hsm',[
    'ui.router'
  ])
;
