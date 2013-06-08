(function () {
    angular.module('Photospring', ['ui']).controller("PhotospringCtrl", ["$scope", "$http", function ($scope, $http) {
        $scope.loadFeed = function (e) {
			$scope.oembeds = [];
			var username = $('input[name="username"]').val();
			var url = 'https://alpha-api.app.net/stream/0/users/@' + username + '/posts?include_post_annotations=1&count=50';
            var r = $http.get(url);
            r.then(function (res) {
				//console.log(res);
				var entries = res.data.data;
				_.each(entries, function (entry) {
					if (entry.repost_of) {
						entry = entry.repost_of
					}
					// just fetch the first annotation here
					var oembed = _.find(entry.annotations, function (annotation) {
						return annotation.type === 'net.app.core.oembed' && annotation.value.type === 'photo' && annotation.value.url;
					});
					if (oembed) {
						$scope.oembeds.push(oembed);
					}
				});
				console.log($scope.oembeds);
            });
        };
    }]);
})();
