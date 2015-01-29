app.directive("paginate", ['$http', '$state', '$rootScope',
    function ($http, $state, $rootScope) {

        return {
            templateUrl: "scripts/directives/angular-paginate/angular.paginate.html",
            restrict: "E",
            replace: true,
            transclude: true,
            scope: {
                list: "=",
                elements: "=",
                config: "@"
            },

            controller: function($scope){

                console.log('paginate');
            },

            link: function (scope, elm, attrs) {
                scope.pagination = [];
                scope.controls = [];

                scope.config = JSON.parse(scope.config);
                
                // scope.list = JSON.parse(scope.list); // it takes to much time to copy

                var n = scope.list.length;
                var control_length = scope.config.width;

                scope.current = {};
                scope.current.page = 0;

                var first = 0;
                var last = 0;

                var interval = scope.config.interval;
                scope.interval = interval;

                scope.elements = [];

                // on select of page
                function process(index) {
                    
                    // do not update elements if selected current page
                    // TODO: remove first bootstrap on 0 index
                    if (index === scope.current.page && index !== 0) {
                        return;
                    }

                    // avoid of incorrect index use
                    if (index < 0 || index >= scope.pagination.length) {
                        return;
                    }

                    scope.current.page = index;

                    var findIndex = scope.pagination.map(function(e) {
                        return e.index;
                    }).indexOf(scope.current.page);

                    if (findIndex !== -1) {
                        var page = scope.pagination[findIndex];
                        scope.elements = scope.list.slice(page.begin, page.end);

                        controlify();
                    }
                }

                scope.page = process;

                // main function to paginate through list
                function paginate() {

                  scope.pagination = [];

                  var index = 0;
                  for (var i = 0; i < n; i += scope.interval) {
                    var page = {};
                    page.begin = i;
                    page.end = i + scope.interval;
                    page.index = index++;

                    scope.pagination.push(page);
                  }

                  controlify();

                  process(scope.current.page);
                }

                // controls' visual for selection
                function controlify(n) {
                  if ( scope.current.page >= 0 && scope.current.page < (control_length * 3) / 4 ) {
                    first = 0;

                    if (n < control_length) {
                      last = n;
                    }
                    else {
                      last = control_length;
                    }
                  }
                  else {
                    last = scope.current.page + control_length / 2;

                    while ( last > (n-1) ) {
                      last--;
                    }

                    first = last - control_length;
                    while ( first < 0 ) {
                      first++;
                    }
                  }

                  scope.controls = scope.pagination.slice(first, last);
                }

                paginate();
            }
        };
    }
]);
