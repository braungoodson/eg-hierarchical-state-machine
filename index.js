angular
	.module('app',['eg.hsm'])
	.provider('appProvider',[function(){this.$get=[function(){return new appProvider();}];function appProvider(){}}])
	.service('appService',[function(){return{};}])
	.factory('appFactory',[function(){return{};}])
	.directive('appDirective',[function(){return{};}])
;

angular
  .module('eg.hsm',[
    'eg.hsm.root',
    'ui.router'
  ])
;

angular.module('eg.hsm.root',['ui.router'])
  .config($EgHsmRootConfig)
  .run($EgHsmRootRunner)
;

$EgHsmRootConfig.$inject = ['$stateProvider','$urlRouterProvider'];
function $EgHsmRootConfig($stateProvider,$urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/root')
  ;
  $stateProvider
    .state('root',{
      url: '/root',
      controller: function($scope,$state) {
        $scope.submit = function($event) {
          var action = angular
            .element($event.srcElement)
            .attr('data-eg-action')
          ;
          $state.go('root.child',{p0:$scope.p0});
        }
      },
      templateProvider: ['$q','$http',function($q,$http){
        var d = $q.defer();
        d.notify('GET /views/root.html');
        $http
          .get('/views/root.html')
          .success(function(response){
            d.resolve(response);
          })
          .error(function(error){
            d.reject(error);
            throw new Error(error);
          })
        ;
        return d.promise;
      }]
    })
    .state('root.child',{
      url: '^/root/child?p0',
      templateProvider: ['$q','$http','$stateParams',function($q,$http,$stateParams){
        var d = $q.defer();
        d.notify('POST /root/child');
        $http
          .post('/root/child',$stateParams)
          .success(function(response){
            d.resolve(response);
          })
          .error(function(error){
            d.reject(error);
            throw new Error(error);
          })
        ;
        return d.promise;
      }]
    })
  ;
}

$EgHsmRootRunner.$inject = ['$rootScope','$state','$stateParams'];
function $EgHsmRootRunner($rootScope,$state,$stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}
