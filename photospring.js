(function () {
    angular.module('Photospring', []).controller("PhotospringCtrl", ["$scope", "$http", function ($scope, $http) {
		$scope.oembeds = [];
        $scope.loadFeed = function (e) {
			var url = 'https://alpha-api.app.net/stream/0/users/@hand_picd/posts?include_post_annotations=1';
            var r = $http.get(url);
            r.then(function (res) {
				console.log(res);
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
