(function () {
    'use strict';

    angular
        .module('web')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                abstract: true,
                templateUrl : 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .state('main.homepage', {
                url: '',
                parent: 'main',
                templateUrl: 'app/templates/homepage.html'
            })
            .state('main.profile', {
                url: 'my-profile',
                parent: 'main',
                templateUrl: 'app/templates/userProfile/indexUserProfile.html',
                controller: 'UserProfileController',
                controllerAs: 'userProfile',
                data: {
                    permissions: {
                      except: ['guest'],
                      redirectTo: 'main.homepage'
                    }
                }
            })
            .state('main.register', {
                url: 'register',
                parent: 'main',
                templateUrl: 'app/templates/register/register.html',
                controller: 'RegisterController',
                controllerAs: 'register',
                data: {
                    permissions: {
                      only: ['guest'],
                      redirectTo: 'main.homepage'
                    }
                }
            })
            .state('main.ingredients-dashboard', {
                url: 'ingredients-dashboard',
                parent: 'main',
                templateUrl: 'app/templates/ingredientsDashboard/ingredientsDashboard.html',
                controller: 'IngredientsDashboardController',
                controllerAs: 'ingredientDashboard',
                data: {
                    permissions: {
                      except: ['guest'],
                      redirectTo: 'main.homepage'
                    }
                }
            })
            .state('main.create-ingredient', {
                url: 'create-ingredient',
                parent: 'main',
                templateUrl: 'app/templates/createIngredient/createIngredient.html',
                controller: 'CreateIngredientController',
                controllerAs: 'createIngredient',
                data: {
                    permissions: {
                      except: ['guest'],
                      redirectTo: 'main.homepage'
                    }
                }
            })
            .state('main.ingredient-page', {
                url: 'ingredient/:id',
                parent: 'main',
                templateUrl: 'app/templates/ingredientPage/ingredientPage.html',
                controller: 'IngredientPageController',
                controllerAs: 'ingredientPage',
                data: {
                    permissions: {
                      except: ['guest'],
                      redirectTo: 'main.homepage'
                    }
                }
            })
            .state('main.recipe-page', {
                  url: 'recipe/:id',
                  parent: 'main',
                  templateUrl: 'app/templates/recipePage/recipePage.html',
                  controller: 'RecipePageController',
                  controllerAs: 'recipePage',
                  data: {
                      permissions: {
                        except: ['guest'],
                        redirectTo: 'main.homepage'
                      }
                  }
              })
            .state('main.recipes-dashboard', {
                url: 'recipes-dashboard',
                parent: 'main',
                templateUrl: 'app/templates/recipesDashboard/recipesDashboard.html',
                controller: 'RecipesDashboardController',
                controllerAs: 'recipesDashboard',
                data: {
                    permissions: {
                      except: ['guest'],
                      redirectTo: 'main.homepage'
                    }
                }
            })
            .state('main.create-recipe', {
                url: 'create-recipe',
                parent: 'main',
                templateUrl: 'app/templates/createRecipe/createRecipe.html',
                controller: 'CreateRecipeController',
                controllerAs: 'createRecipe',
                data: {
                    permissions: {
                      except: ['guest'],
                      redirectTo: 'main.homepage'
                    }
                  }
                })
            .state('main.create-group', {
                url: 'group/create',
                parent: 'main',
                templateUrl: 'app/templates/createGroup/createGroup.html',
                controller: 'CreateGroupController',
                controllerAs: 'createGroup',
                data: {
                    permissions: {
                        except: ['guest'],
                        redirectTo: 'main.homepage'
                    }
                }
            })
            .state('main.group-page', {
                url: 'group/:id',
                parent: 'main',
                templateUrl: 'app/templates/groupPage/groupPage.html',
                controller: 'GroupPageController',
                controllerAs: 'groupPage',
                data: {
                    permissions: {
                        except: ['guest'],
                        redirectTo: 'main.homepage'
                    }
                }
            })
            .state('main.groups-dashboard', {
                url: 'groups-dashboard',
                parent: 'main',
                templateUrl: 'app/templates/groupsDashboard/groupsDashboard.html',
                controller: 'GroupsDashboardController',
                controllerAs: 'groupsDashboard',
                data: {
                    permissions: {
                      except: ['guest'],
                      redirectTo: 'main.homepage'
                    }
                }
            })
            .state('main.logout', {
                url: 'logout',
                parent: 'main',
                controller: 'LogoutController',
                controllerAs: 'logout',
                data: {
                    permissions: {
                      except: ['guest'],
                      redirectTo: 'main.homepage'
                    }
                }
            })
            .state('main.login', {
                url: 'login',
                parent: 'main',
                templateUrl: 'app/templates/login-logout/login.html',
                controller: 'LoginController',
                controllerAs: 'login',
                data: {
                    permissions: {
                      only: ['guest'],
                      redirectTo: 'main.homepage'
                    }
                }
            });

        $urlRouterProvider.otherwise( function($injector) {
          var $state = $injector.get("$state");
          $state.go('main.homepage');
        });
    }

})();
