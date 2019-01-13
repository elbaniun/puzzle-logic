angular.module("proyecto").config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/perfil");
    return $stateProvider.state("dashboard", {
        url: "/dashboard",
        templateUrl: "templates/dashboard.html"
    })
        .state("perfil", {
        url: "/perfil",
        templateUrl: "templates/perfil.html"
    })
        .state("settings", {
        url: "/settings",
        templateUrl: "templates/settings.html"
    })
        .state("score", {
        url: "/score",
        templateUrl: "templates/score.html"
    })
        .state("perfil_curso", {
        url: "/perfil_curso",
        templateUrl: "templates/perfil_curso.html"
    })
        .state("login", {
        url: "/login",
        templateUrl: "templates/login.html"
    })
        .state("register", {
        url: "/register",
        templateUrl: "templates/register.html"
    })
        .state("register_2", {
        url: "/register_2",
        templateUrl: "templates/register_2.html"
    })
        .state("register_3", {
        url: "/register_3",
        templateUrl: "templates/register_3.html"
    });
});
