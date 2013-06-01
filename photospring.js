(function () {
    angular.module('Photospring', []).controller("PhotospringCtrl", ["$scope", "$http", function ($scope, $http) {
		$scope.photos = [];
        $scope.loadFeed = function (e) {
            var url = 'https://alpha-api.app.net/feed/rss/users/@hand_picd/posts';
            var r = $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
            r.then(function (res) {
				console.log(res);
				var entries = res.data.responseData.feed.entries;
				$scope.photos = _.map(entries, function (entry) {
					return entry.content;
				});
            });
        };
    }]);
})();
