////////////////////////////////////////////////////////////
//                        Angular                         //
////////////////////////////////////////////////////////////
var app = angular.module('app', ['ngRoute']);

////////////////////////////////////////////////////////////
//                        Routes                          //
////////////////////////////////////////////////////////////
app.config(function ($routeProvider) {
    $routeProvider
    .when('/',{
        templateUrl: 'partials/index.html',
        controller: 'MainController'     
    })  
    .when('/new',{
        templateUrl: 'partials/new.html',
        controller: 'MainController'     
    })
    .when('/new_question',{
        templateUrl: 'partials/question.html',
        controller: 'MainController'     
    })  
    .when('/lets_play',{
        templateUrl: 'partials/play.html',
        controller: 'MainController'     
    })
    .when('/logout',{
        templateUrl: 'partials/new.html',
        controller: 'MainController'     
    })
    .otherwise({
        redirectTo: '/new'
    });
});
////////////////////////////////////////////////////////////
//                        Factories                       //
////////////////////////////////////////////////////////////
app.factory('QuestionFactory', function($http) {
    var factory = {user:""};

    factory.index = function(callback) {
        $http.get('/questions').then(function(response) {
            callback(response.data);
        })
    }
    factory.create = function(new_question, callback) {
        $http.post('/questions', new_question).then(function(response) {
            // console.log('Create Method', response);
            callback(response.data);
        })
    }
    factory.getUser = function(){
        if (factory.user){
            return factory.user;
        }
    }

    return factory;
})
app.factory('AnswerFactory', function($http) {
    var factory = {};

    factory.index = function(callback) {
        $http.get('/answers').then(function(response) {
            callback(response.data);
        })
    }
    factory.create = function(new_answer, callback) {
        $http.post('/answers', new_answer).then(function(response) {
            // console.log('Create Method', response);
            callback(response.data);
        })
    }

    return factory;
})
////////////////////////////////////////////////////////////
//                        Controller                       //
////////////////////////////////////////////////////////////
app.controller('MainController', function($scope, QuestionFactory, AnswerFactory, $location) {
    console.log('Main Controller loaded');

    QuestionFactory.index(function(data) {
        console.log('all questions',data);
        $scope.questions = data;
    });
    AnswerFactory.index(function(data) {
        console.log('all scores',data);
        $scope.answers = data;
    });
    // $scope.createPerson = function() {
    //     $scope.errors = {};
    //     console.log('Creating a person: Angular Controller');
    //     QuestionFactory.create($scope.new_person, function(data) {
    //         if (data.errors) {
    //             console.log(data.errors);
    //             $scope.errors = data.errors;
    //         } else {
    //             QuestionFactory.index(function(data) {
    //                 $scope.people = data;

    //                 $scope.new_person = {};
    //             });
    //         }
    //     })
    // }
    $scope.submitAnswers = function() {
        $scope.errors = {};
        console.log($scope.new_answer)
        // console.log(`answers are: ${$scope.new_answer.question1},${$scope.new_answer.question2},${$scope.new_answer.question3}`);
        if (!$scope.new_answer){
            $scope.new_answer = {}
        }
        if (!$scope.new_answer.question1){
            $scope.errors.q1 = "You must answer question 1!";
        };
        if (!$scope.new_answer.question2){
            $scope.errors.q2 = "You must answer question 2!";
        };
        if (!$scope.new_answer.question3){
            $scope.errors.q3 = "You must answer question 3!";
        };
        var percentage = 0;
        var sum = Number($scope.new_answer.question1)+Number($scope.new_answer.question2)+Number($scope.new_answer.question3);
        console.log(sum)
        console.log('Submitting a score: Angular Controller');
        if (sum == 3){
            var percentage = 100;
        } else if (sum == 2){
            var percentage = 66.7;
        } else if (sum == 1){
            var percentage = 33.3;
        }
        var new_score = {
            name: $scope.username,
            score: sum,
            percentage: percentage
        };
        AnswerFactory.create(new_score, function(data) {
            if (data.errors) {
                console.log(data.errors);
                $scope.errors = data.errors;
            } else {
                // $scope.success = data.success;
                AnswerFactory.index(function(data) {
                    // console.log('data after index',data)
                    $scope.answers = data;
                    $scope.new_answer = {};
                    $location.url('/');
                });
            }
        })
    }
    $scope.createScore = function() {
        $scope.errors = {};
        var percentage = 0;
        console.log($scope.score.score,$scope.score.name)
        console.log('Creating a score: Angular Controller');
        if ($scope.score.score == 3){
            var percentage = 100;
        } else if ($scope.score.score == 2){
            var percentage = 66.7;
        } else if ($scope.score.score == 1){
            var percentage = 33.3;
        }
        var new_score = {
            name: $scope.username,
            score: $scope.score.score,
            percentage: percentage
        };
        AnswerFactory.create(new_score, function(data) {
            if (data.errors) {
                console.log(data.errors);
                $scope.errors = data.errors;
            } else {
                // HOW DO I GET THE MESSAGE ON HOME PAGE?
                console.log('success message after create',data.success);
                // $scope.success = data.success;
                AnswerFactory.index(function(data) {
                    // console.log('data after index',data)
                    $scope.answers = data;
                    $scope.score = {};
                    $location.url('/');
                });
            }
        })
    }

    $scope.createQuestion = function() {
        $scope.errors = {};
        $scope.success = {};
        console.log('Creating a question: Angular Controller');
        QuestionFactory.create($scope.new_question, function(data) {
            if (data.errors) {
                console.log(data.errors);
                $scope.errors = data.errors;
            } else {
                // HOW DO I GET THE MESSAGE ON HOME PAGE?
                // $scope.success = data.success;
                QuestionFactory.index(function(data) {
                    // console.log('data after index',data)
                    $scope.questions = data;
                    $scope.new_question = {};
                    $scope.success_msg = 'Question added successfully!';
                    console.log($scope.success_msg)
                    // $scope.success = data.success
                    $location.url('/');
                });
            }
        })
    }
    $scope.storeUser = function() {
        console.log($scope.user)
        QuestionFactory.user = $scope.user;
        console.log(QuestionFactory.user)
        $location.url('/');
    }

    $scope.scores = [{name: 'alex', score: 2, percentage:66.7}, {name: 'phil', score: 1, percentage:33.3},{name: 'george', score: 3, percentage:100}];
    $scope.username = QuestionFactory.getUser();
    // $scope.fields = { 
    //     field1: {
    //       choices: ["red", "blue", "black"],
    //       selected: "red"
    //     },
    //     field2: {
    //       choices: ["big", "small", "medium"],
    //       selected: "big"
    //     },
    //     field3: {
    //       choices: ["1", "2", "3"],
    //       selected: "1"
    //     }
    // }
})
