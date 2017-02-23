var app = angular.module("myShoppingList", []); 
app.controller("myCtrl", function($scope) {
   // $scope.productsIrregular = ["сіль", "сода", "оцет", "приправа до курки", "лавровий лист", "кориця", "розпушувач", "ваніль", "загущувач", "желе", "чорнослив", "курага", "мак", "пшениця", "засіб до вікон", "засіб до туалету", "бритви", "засіб для гоління", "швабра"];
    if (typeof(storage) !== "undefined") {
      $scope.products=JSON.parse(localStorage.getItem("items"));
      $scope.productsWeekly=JSON.parse(localStorage.getItem("itemsWeekly"));
      $scope.productsMonthly=JSON.parse(localStorage.getItem("itemsMonthly"));
      $scope.productsIrregular=JSON.parse(localStorage.getItem("itemsIrregular"));
    }

    $scope.addItem = function (listType) {
        $scope.errortext = "";
        switch (listType) {
          case 'd':{     
            if (!$scope.addMe) {return;}   
            if ($scope.products.indexOf($scope.addMe) == -1) {
                $scope.products.push($scope.addMe);
            } else {
                $scope.errortext = "The item is already in your daily shopping list."; 
            }
            break;
          }
          case 'w': {
            if (!$scope.addMeWeekly) {return;}   
            if ($scope.productsWeekly.indexOf($scope.addMeWeekly) == -1) {
                $scope.productsWeekly.push($scope.addMeWeekly);
            } else {
                $scope.errortext = "The item is already in your weekly shopping list."; 
            }
            break;
          }
          case 'm': {
            if (!$scope.addMeMonthly) {return;}   
            if ($scope.productsMonthly.indexOf($scope.addMeMonthly) == -1) {
                $scope.productsMonthly.push($scope.addMeMonthly);
            } else {
                $scope.errortext = "The item is already in your monthly shopping list."; 
            }
            break;
          }
          case 'i': {
            if (!$scope.addMeIrregular) {return;}   
            if ($scope.productsIrregular.indexOf($scope.addMeIrregular) == -1) {
                $scope.productsIrregular.push($scope.addMeIrregular);
            } else {
                $scope.errortext = "The item is already in your irregular shopping list."; 
            } 
            break; 
          } 
        }  // end switch
    }
    $scope.removeItem = function (x,listType) {
        $scope.errortext = ""; 
        switch (listType){
          case 'd': {
            $scope.products.splice(x, 1);
            break;
          }
          case 'w': {
            $scope.productsWeekly.splice(x, 1);
            break;
          }
          case 'm': {
            $scope.productsMonthly.splice(x, 1);
            break;
          }
          case 'i': {
            $scope.productsIrregular.splice(x, 1);
            break;
          }
        }  
    }
    $scope.saveItems = function() {
      if (typeof(storage) !== "undefined") {
        localStorage.setItem("items", JSON.stringify($scope.products));
        localStorage.setItem("itemsWeekly", JSON.stringify($scope.productsWeekly));
        localStorage.setItem("itemsMonthly", JSON.stringify($scope.productsMonthly));
        localStorage.setItem("itemsIrregular", JSON.stringify($scope.productsIrregular));
      }
    }
    $scope.show = function(listType) {
            document.getElementById("dailyList").style.visibility="hidden";
            document.getElementById("weeklyList").style.visibility="hidden";
            document.getElementById("monthlyList").style.visibility="hidden";
            document.getElementById("irregularList").style.visibility="hidden";
        switch (listType){
          case 'd': {
            document.getElementById("dailyList").style.visibility="visible";
            break;
          }
          case 'w': {
            document.getElementById("weeklyList").style.visibility="visible";
            break;
          }
          case 'm': {
            document.getElementById("monthlyList").style.visibility="visible";
            break;
          }
          case 'i': {
            document.getElementById("irregularList").style.visibility="visible";
            break;
          }
          case 'a': {
            document.getElementById("dailyList").style.visibility="visible";
            document.getElementById("weeklyList").style.visibility="visible";
            document.getElementById("monthlyList").style.visibility="visible";
            document.getElementById("irregularList").style.visibility="visible";
            break;
          }
        }  
    }
});