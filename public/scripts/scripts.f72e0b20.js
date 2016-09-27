"use strict";
angular.module("ngLocale", [], ["$provide", function(a) {
    var b = {
        ZERO: "zero",
        ONE: "one",
        TWO: "two",
        FEW: "few",
        MANY: "many",
        OTHER: "other"
    };
    a.value("$locale", {
        DATETIME_FORMATS: {
            AMPMS: ["AM", "PM"],
            DAY: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
            ERANAMES: ["antes de Cristo", "depois de Cristo"],
            ERAS: ["a.C.", "d.C."],
            FIRSTDAYOFWEEK: 6,
            MONTH: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
            SHORTDAY: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
            SHORTMONTH: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
            STANDALONEMONTH: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
            WEEKENDRANGE: [5, 6],
            fullDate: "EEEE, d 'de' MMMM 'de' y",
            longDate: "d 'de' MMMM 'de' y",
            medium: "d 'de' MMM 'de' y HH:mm:ss",
            mediumDate: "d 'de' MMM 'de' y",
            mediumTime: "HH:mm:ss",
            short: "dd/MM/yy HH:mm",
            shortDate: "dd/MM/yy",
            shortTime: "HH:mm"
        },
        NUMBER_FORMATS: {
            CURRENCY_SYM: "R$",
            DECIMAL_SEP: ",",
            GROUP_SEP: ".",
            PATTERNS: [{
                gSize: 3,
                lgSize: 3,
                maxFrac: 3,
                minFrac: 0,
                minInt: 1,
                negPre: "-",
                negSuf: "",
                posPre: "",
                posSuf: ""
            }, {
                gSize: 3,
                lgSize: 3,
                maxFrac: 2,
                minFrac: 2,
                minInt: 1,
                negPre: "-¤",
                negSuf: "",
                posPre: "¤",
                posSuf: ""
            }]
        },
        id: "pt-br",
        localeID: "pt_BR",
        pluralCat: function(a, c) {
            return a >= 0 && a <= 2 && 2 != a ? b.ONE : b.OTHER
        }
    })
}]), angular.module("finansesApp", ["ngAnimate", "ngCookies", "ngResource", "ngRoute", "ngSanitize", "ngTouch", "angularFileUpload", "ui.bootstrap", "ngMask"]).config(["$routeProvider", "$locationProvider", function(a, b) {
    a.when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl",
        controllerAs: "main"
    }).when("/categorias", {
        templateUrl: "views/categories.html",
        controller: "CategoriesCtrl",
        controllerAs: "categories"
    }).when("/signup", {
        templateUrl: "views/signup.html",
        controller: "SignupCtrl",
        controllerAs: "signup"
    }).when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginCtrl",
        controllerAs: "login"
    }).when("/logout", {
        templateUrl: "views/logout.html",
        controller: "LogoutCtrl",
        controllerAs: "logout"
    }).otherwise({
        redirectTo: "/"
    }), b.html5Mode(!0)
}]).filter("money", function() {
    return function(a, b, c, d) {
        var e = String(a);
        if (c) {
            var f = e.split(""),
                g = f.splice(f.length - c);
            f = f.concat([d]), f = f.concat(g), e = f.join("")
        }
        return e = b ? b + e : "$" + e
    }
}).factory("UserInfoService", ["$cookies", function(a) {
    var b;
    return {
        get: function() {
            return b || a.get("userInfo") && (b = JSON.parse(a.get("userInfo"))), b
        },
        set: function(c) {
            b = c;
            var d = new Date;
            d.setMinutes(d.getMinutes() + 60), a.put("userInfo", JSON.stringify(b), {
                expires: d
            })
        },
        clear: function() {
            console.log("Clear!"), b = null, a.remove("userInfo")
        }
    }
}]).directive("rvgModal", function() {
    return {
        restrict: "E",
        replace: !0,
        templateUrl: function(a, b) {
            return "/" + b.templateUrl
        },
        scope: {
            control: "="
        },
        link: function(a, b, c) {
            a.internalControl = a.control || {}, a.opened = !1, a.internalControl.open = function() {
                a.opened = !0
            }, a.internalControl.close = function() {
                a.opened = !1, a.$emit("modalClose")
            }
        }
    }
}).directive("colorPicker", function() {
    return {
        restrict: "E",
        replace: !0,
        templateUrl: function(a, b) {
            return "/" + b.templateUrl
        },
        scope: {
            ngModel: "="
        },
        link: function(a, b, c, d) {
            a.showPallete = !1, a.colors = [{
                code: "rgb(128, 128, 128)"
            }, {
                code: "rgb(240, 240, 240)"
            }, {
                code: "rgb(255, 214, 214)"
            }, {
                code: "rgb(255, 214, 173)"
            }, {
                code: "rgb(255, 240, 225)"
            }, {
                code: "rgb(227, 243, 198)"
            }, {
                code: "rgb(163, 234, 194)"
            }, {
                code: "rgb(154, 222, 223)"
            }, {
                code: "rgb(221, 255, 255)"
            }, {
                code: "rgb(213, 214, 255)"
            }, {
                code: "rgb(255, 213, 255)"
            }, {
                code: "rgb(219, 223, 220)"
            }, {
                code: "rgb(255, 157, 157)"
            }, {
                code: "rgb(255, 189, 92)"
            }, {
                code: "rgb(254, 233, 183)"
            }, {
                code: "rgb(218, 238, 142)"
            }, {
                code: "rgb(130, 215, 172)"
            }, {
                code: "rgb(37, 213, 186)"
            }, {
                code: "rgb(82, 214, 255)"
            }, {
                code: "rgb(171, 172, 255)"
            }, {
                code: "rgb(255, 171, 255)"
            }, {
                code: "rgb(202, 207, 210)"
            }, {
                code: "rgb(255, 133, 133)"
            }, {
                code: "rgb(237, 152, 54)"
            }, {
                code: "rgb(251, 217, 133)"
            }, {
                code: "rgb(141, 212, 127)"
            }, {
                code: "rgb(75, 207, 153)"
            }, {
                code: "rgb(70, 193, 160)"
            }, {
                code: "rgb(57, 196, 255)"
            }, {
                code: "rgb(131, 132, 216)"
            }, {
                code: "rgb(215, 131, 215)"
            }, {
                code: "rgb(170, 183, 184)"
            }, {
                code: "rgb(245, 81, 66)"
            }, {
                code: "rgb(250, 135, 62)"
            }, {
                code: "rgb(255, 215, 25)"
            }, {
                code: "rgb(190, 222, 52)"
            }, {
                code: "rgb(41, 194, 135)"
            }, {
                code: "rgb(66, 181, 177)"
            }, {
                code: "rgb(0, 122, 193)"
            }, {
                code: "rgb(110, 96, 187)"
            }, {
                code: "rgb(205, 111, 206)"
            }, {
                code: "rgb(137, 149, 161)"
            }, {
                code: "rgb(222, 106, 103)"
            }, {
                code: "rgb(220, 118, 51)"
            }, {
                code: "rgb(252, 184, 19)"
            }, {
                code: "rgb(167, 203, 52)"
            }, {
                code: "rgb(158, 221, 148)"
            }, {
                code: "rgb(60, 193, 191)"
            }, {
                code: "rgb(108, 145, 200)"
            }, {
                code: "rgb(114, 106, 175)"
            }, {
                code: "rgb(175, 121, 198)"
            }, {
                code: "rgb(86, 101, 115)"
            }, {
                code: "rgb(225, 75, 70)"
            }, {
                code: "rgb(198, 97, 54)"
            }, {
                code: "rgb(216, 173, 87)"
            }, {
                code: "rgb(136, 181, 56)"
            }, {
                code: "rgb(72, 156, 111)"
            }, {
                code: "rgb(67, 139, 131)"
            }, {
                code: "rgb(95, 116, 176)"
            }, {
                code: "rgb(106, 99, 153)"
            }, {
                code: "rgb(137, 92, 169)"
            }, {
                code: "rgb(76, 86, 97)"
            }, {
                code: "rgb(171, 83, 73)"
            }, {
                code: "rgb(157, 75, 72)"
            }, {
                code: "rgb(174, 133, 90)"
            }, {
                code: "rgb(113, 154, 56)"
            }, {
                code: "rgb(67, 122, 88)"
            }, {
                code: "rgb(70, 124, 110)"
            }, {
                code: "rgb(48, 76, 143)"
            }, {
                code: "rgb(96, 87, 145)"
            }, {
                code: "rgb(112, 81, 140)"
            }], a.openPalette = function() {
                a.showPallete = !0
            }, a.selectColor = function(b) {
                a.showPallete = !1, a.ngModel = b.code
            }
        }
    }
}), angular.module("finansesApp").controller("MainCtrl", ["$scope", "$http", "$location", "UserInfoService", function(a, b, c, d) {
    if (a.currentUserInfo = d.get(), !a.currentUserInfo) return void c.path("/login");
    a.months = [{
        id: 1,
        name: "Janeiro"
    }, {
        id: 2,
        name: "Fevereiro"
    }, {
        id: 3,
        name: "Março"
    }, {
        id: 4,
        name: "Abril"
    }, {
        id: 5,
        name: "Maio"
    }, {
        id: 6,
        name: "Junho"
    }, {
        id: 7,
        name: "Julho"
    }, {
        id: 8,
        name: "Agosto"
    }, {
        id: 9,
        name: "Setembro"
    }, {
        id: 10,
        name: "Outubro"
    }, {
        id: 11,
        name: "Novembro"
    }, {
        id: 12,
        name: "Dezembro"
    }], a.years = [2011, 2012, 2013, 2014, 2015, 2016], a.modalControl = {}, a.transactions = [], a.selectedMonth = {
        id: (new Date).getMonth() + 1
    }, a.selectedYear = (new Date).getFullYear(), a.loadings = 0;
    var e = {
        Authorization: "Token token=" + a.currentUserInfo.token,
        Accept: "application/json;odata=verbose"
    };
    a.getCategories = function() {
        a.loadings++, b({
            method: "GET",
            url: "/api/categories",
            headers: e
        }).then(function(b) {
            a.loadings--, a.modalControl.categories = b.data.categories
        }, function(b) {
            a.loadings--, console.log(b)
        })
    }, a.getTransactions = function() {
        a.loadings++, b({
            method: "GET",
            url: "/api/transactions/period/" + a.selectedMonth.id + "/" + a.selectedYear,
            headers: e
        }).then(function(b) {
            a.loadings--, a.transactions = b.data.transactions
        }, function(b) {
            a.loadings--, console.log(b)
        })
    }, a.monthChange = function() {
        a.getTransactions()
    }, a.yearChange = function() {
        a.getTransactions()
    }, a.destroyTransaction = function(c) {
        confirm("Are you sure?") && b({
            method: "DELETE",
            url: "/api/transactions/" + c,
            headers: e
        }).then(function(b) {
            a.getTransactions()
        }, function(a) {
            console.log(a)
        })
    }, a.editTransaction = function(b) {
        a.modalControl.formData = {
            description: b.description,
            value: b.value,
            date: b.date,
            id: b.id
        }, a.modalControl.open()
    }, a.addTransaction = function() {
        a.modalControl.formData = {}, a.modalControl.formData.date = a.format(new Date, "dd/MM/yyyy"), a.modalControl.open()
    }, a.format = function(a, b) {
        var c = b,
            d = a.getDate();
        d < 10 && (d = "0" + d);
        var e = a.getMonth() + 1;
        return e < 10 && (e = "0" + e), c = c.replace("dd", d), c = c.replace("MM", e), c = c.replace("yyyy", a.getFullYear())
    }, a.modalControl.addTransaction = function() {
        var c;
        c = a.modalControl.formData.id > 0 ? "/api/transactions/edit/" + a.modalControl.formData.id : "/api/transactions", b({
            method: "POST",
            url: c,
            headers: e,
            data: {
                transaction: a.modalControl.formData
            }
        }).then(function(b) {
            a.modalControl.formData = {}, a.modalControl.close(), a.getTransactions()
        }, function(a) {
            console.log(a)
        })
    }, a.getCategories(), a.getTransactions()
}]), angular.module("finansesApp").controller("ImportersCtrl", ["$scope", "$http", "$location", "UserInfoService", "FileUploader", function(a, b, c, d, e) {
    if (a.currentUserInfo = d.get(), !a.currentUserInfo) return void c.path("/login");
    var f = a.uploader = new e({
            url: "/api/upload"
        }),
        g = {
            Authorization: "Token token=" + a.currentUserInfo.token,
            Accept: "application/json;odata=verbose"
        };
    a.importItem = function(c, d) {
        b({
            method: "POST",
            url: "/api/transactions",
            headers: g,
            data: {
                transaction: c.original
            }
        }).then(function(b) {
            a.importedTransactions.splice(d, 1)
        }, function(a) {
            console.log(a)
        })
    }, a.removeItem = function(b) {
        a.importedTransactions.splice(b, 1)
    }, f.onAfterAddingFile = function(a) {
        a.upload()
    }, f.onBeforeUploadItem = function(a) {
        a.headers = g
    }, f.onCompleteItem = function(b, c, d, e) {
        a.importedTransactions = c
    }
}]), angular.module("finansesApp").controller("SignupCtrl", ["$scope", "$http", "$location", "UserInfoService", function(a, b, c, d) {
    a.submit = function(e) {
        a.submitted = !0, e && b({
            method: "POST",
            url: "/api/users",
            data: a.formData
        }).then(function(b) {
            b.data.success ? (d.set(b.data.user), c.path("/transactions")) : a.serverMessage = "Email já cadastrado"
        }, function(a) {
            console.log(a)
        })
    }
}]), angular.module("finansesApp").controller("LogoutCtrl", ["$location", "UserInfoService", function(a, b) {
    b.clear(), a.path("/login")
}]), angular.module("finansesApp").controller("LoginCtrl", ["$scope", "$http", "$location", "UserInfoService", function(a, b, c, d) {
    var e = d.get();
    return e ? void c.path("/") : void(a.submit = function(e) {
        a.submitted = !0, e && b({
            method: "POST",
            url: "/api/users/login",
            data: {
                user: a.formData
            }
        }).then(function(b) {
            b.data.success ? (d.set(b.data.user), c.path("/")) : a.serverMessage = "Email ou senha inválidos"
        })
    })
}]), angular.module("finansesApp").controller("CategoriesCtrl", ["$scope", "$http", "$location", "UserInfoService", function(a, b, c, d) {
    var e = d.get();
    if (!e) return void c.path("/login");
    a.modalControl = {};
    var f = {
        Authorization: "Token token=" + e.token,
        Accept: "application/json;odata=verbose"
    };
    a.addCategory = function() {
        a.modalControl.open()
    }, a.getCategories = function() {
        b({
            method: "GET",
            url: "/api/categories",
            headers: f
        }).then(function(b) {
            a.categories = b.data.categories
        }, function(a) {
            console.log(a)
        })
    }, a.editCategory = function(b) {
        a.modalControl.formData = b, a.modalControl.open()
    }, a.destroyCategory = function(c) {
        b({
            method: "DELETE",
            url: "/api/categories/" + c,
            headers: f
        }).then(function(b) {
            a.getCategories()
        }, function(a) {
            console.log(a)
        })
    }, a.modalControl.addCategory = function() {
        var c, d;
        a.modalControl.formData.id > 0 ? (c = "/api/categories/" + a.modalControl.formData.id, d = "PATCH") : (c = "/api/categories", d = "POST"), b({
            method: d,
            url: c,
            headers: f,
            data: {
                category: a.modalControl.formData
            }
        }).then(function(b) {
            a.modalControl.formData = {}, a.modalControl.close(), a.getCategories()
        }, function(a) {
            console.log(a)
        })
    }, a.getCategories()
}]), angular.module("finansesApp").run(["$templateCache", function(a) {
    a.put("views/categories.html", '<div ng-include src="\'views/header.html\'"></div> <div class="row"> <div class="col-xs-3"> <div ng-include src="\'views/sidenav.html\'"></div> </div> <div class="col-xs-9"> <div class="content"> <div class="commands-wrapper"> <a class="btn btn-primary" ng-click="addCategory()">Adicionar</a> </div> <div class="categories-list"> <div class="item" ng-repeat="category in categories track by category.id"> <div class="row"> <div class="col-xs-1"> <div class="color-cicle" style="background-color: {{ category.color }}"></div> </div> <div class="col-xs-9"> <span>{{ category.name }}</span> </div> <div class="col-xs-2"> <a class="btn btn-success icon" ng-click="editCategory(category)"><i class="fa fa-pencil"></i></a> <a class="btn btn-danger icon" ng-click="destroyCategory(category.id)"><i class="fa fa-trash"></i></a> </div> </div> </div> </div> <div class="no-categories" ng-show="categories.length == 0"> <span>Nenhuma categoria cadastrada</span> </div> <rvg-modal control="modalControl" template-url="addCategoryTemplate.html"></rvg-modal> </div> </div> </div>'), a.put("views/header.html", '<header class="row"> <div class="logo col-xs-8"> <a class="" href="/">Finan$es</a> </div> <div class="user-info-wrapper col-xs-4"> <span>Olá </span><span>{{ currentUserInfo.name }}</span> <a class="btn btn-default pull-right" href="/logout">Sair</a> </div> </header>'), a.put("views/importers.html", '<div ng-include src="\'views/header.html\'"></div> <div class="row"> <div class="col-xs-3"> <div ng-include src="\'views/sidenav.html\'"></div> </div> <div class="col-xs-9"> <div class="content"> <input type="file" nv-file-select="" uploader="uploader"> <div class="col-md-9" style="margin-bottom: 40px"> <div> <div> Upload progress: <div class="progress" style=""> <div class="progress-bar" role="progressbar" ng-style="{ \'width\': uploader.progress + \'%\' }"></div> </div> </div> </div> <div class="imported-list"> <div class="item" ng-repeat="transaction in importedTransactions track by $index"> <div class="row"> <div class="col-xs-5"> <div> {{ transaction.original.description }} {{ transaction.original.value }} </div> <div> {{ transaction.original.date }} </div> </div> <div class="col-xs-2"> <a class="btn" title="Importar" ng-click="importItem(transaction, $index)"><i class="fa fa-check"></i></a> <a class="btn" title="Dispensar" ng-click="removeItem($index)"><i class="fa fa-close"></i></a> </div> <div class="col-xs-5"> <div ng-hide="transaction.found"> <span>Registro não encontrado no servidor</span> </div> <div ng-show="transaction.found"> <div> {{ transaction.found.description }} {{ transaction.found.value }} </div> <div> {{ transaction.found.date }} </div> </div> </div> </div> </div> </div> </div> </div> </div> </div>'), a.put("views/login.html", '<div class="form-container"> <div class="server-message" ng-show="serverMessage"> <span>{{ serverMessage }}</span> </div> <form name="loginForm" ng-submit="submit(loginForm.$valid)" novalidate> <div class="form-group" ng-class="{ \'has-error\' : loginForm.email.$invalid && submitted }"> <input type="email" name="email" class="form-control" placeholder="Email" ng-model="formData.email" required> <p ng-show="loginForm.email.$invalid && submitted" class="help-block">Email inválido</p> </div> <div class="form-group" ng-class="{ \'has-error\' : loginForm.email.$invalid && submitted }"> <input type="password" name="password" class="form-control" placeholder="Senha" ng-model="formData.password" required> <p ng-show="loginForm.password.$invalid && submitted" class="help-block">Senha inválida</p> </div> <button type="submit" class="btn btn-block btn-primary">Entrar</button> <div class="text-center"> <span>Não possui uma conta? </span> </div> <div class="text-center"> <a href="/signup">Cadastre-se gratuitamente</a> </div> </form> </div>'), a.put("views/logout.html", "<p>This is the logout view.</p>"), a.put("views/main.html", '<div ng-include src="\'views/header.html\'"></div> <div class="row"> <div class="col-xs-3"> <div ng-include src="\'views/sidenav.html\'"></div> </div> <div class="col-xs-9"> <div class="content"> <div class="row"> <div class="col-xs-2"> <div class="commands-wrapper"> <a class="btn btn-primary" ng-click="addTransaction()">Adicionar</a> </div> </div> <div class="col-xs-4"> <select class="form-control" ng-model="selectedMonth" ng-options="month as month.name for month in months track by month.id" ng-change="monthChange()"></select> </div> <div class="col-xs-4"> <select class="form-control" ng-model="selectedYear" ng-options="year as year for year in years track by year" ng-change="yearChange()"></select> </div> </div> <div class="transaction-list" ng-show="transactions.length > 0 && loadings == 0"> <div class="item" ng-repeat="transaction in transactions track by transaction.id"> <div class="row"> <div class="col-xs-6"> <div> {{ transaction.description }} </div> <div> {{ transaction.date }} </div> </div> <div class="col-xs-2"> {{ transaction.category.name }} </div> <div class="col-xs-2"> {{ transaction.value | money:"R$ ":"2":"," }} </div> <div class="col-xs-2"> <a class="btn btn-success icon" ng-click="editTransaction(transaction)"><i class="fa fa-pencil"></i></a> <a class="btn btn-success icon" ng-click="destroyTransaction(transaction.id)"><i class="fa fa-trash"></i></a> </div> </div> </div> </div> <div class="transactions-loader" ng-show="loadings > 0"> <div class="uil-finanses-css" style="-webkit-transform:scale(0.58)"> <div></div> <div></div> <div></div> </div> </div> <div ng-show="transactions.length == 0 && loadings == 0"> <span>Sem lançamentos no período.</span> </div> </div> </div> </div> <rvg-modal control="modalControl" template-url="modalTemplate.html"></rvg-modal>'), a.put("views/sidenav.html", '<aside class="side-nav"> <ul> <li class="active"><a href="/">Lançamentos</a></li> <li><a href="/importadores">Importadores</a></li> <li><a href="/categorias">Categorias</a></li> </ul> </aside>'), a.put("views/signup.html", '<div class="form-container"> <div class="server-message" ng-show="serverMessage"> <span>{{ serverMessage }}</span> </div> <form name="signupForm" ng-submit="submit(signupForm.$valid)" novalidate> <div class="form-group"> <input type="email" name="email" class="form-control" placeholder="Email" ng-model="formData.email"> <p ng-show="signupForm.email.$invalid && submitted" class="help-block">Email inválido</p> </div> <div class="form-group"> <input type="password" name="password" class="form-control" placeholder="Senha" ng-model="formData.password"> <p ng-show="signupForm.password.$invalid && submitted" class="help-block">Senha inválida</p> </div> <button type="submit" class="btn btn-block btn-primary">Cadastrar</button> <div class="text-center"> <span>Já possui uma conta? </span> </div> <div class="text-center"> <a href="/login">Faça login agora!</a> </div> </form> </div>')
}]);