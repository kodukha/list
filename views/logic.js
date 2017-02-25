var app = angular.module("myShoppingList", []); 
app.controller("myCtrl", function($scope) {
    $scope.productsShopping = [];
    if (typeof(storage) !== "undefined") {
      $scope.productsDaily=JSON.parse(localStorage.getItem("items"));
      $scope.productsWeekly=JSON.parse(localStorage.getItem("itemsWeekly"));
      $scope.productsMonthly=JSON.parse(localStorage.getItem("itemsMonthly"));
      $scope.productsIrregular=JSON.parse(localStorage.getItem("itemsIrregular"));
    }

    $scope.addItem = function (listType) {
        $scope.errortext = "";
        switch (listType) {
          case 'd':{     
            if (!$scope.addMeDaily) {return;}   
            if ($scope.productsDaily.indexOf($scope.addMeDaily) == -1) {
                $scope.productsDaily.push($scope.addMeDaily);
            } else {
                $scope.errortext = "The item is already in your daily shopping template list."; 
            }
            break;
          }
          case 'w': {
            if (!$scope.addMeWeekly) {return;}   
            if ($scope.productsWeekly.indexOf($scope.addMeWeekly) == -1) {
                $scope.productsWeekly.push($scope.addMeWeekly);
            } else {
                $scope.errortext = "The item is already in your weekly shopping template list."; 
            }
            break;
          }
          case 'm': {
            if (!$scope.addMeMonthly) {return;}   
            if ($scope.productsMonthly.indexOf($scope.addMeMonthly) == -1) {
                $scope.productsMonthly.push($scope.addMeMonthly);
            } else {
                $scope.errortext = "The item is already in your monthly shopping template list."; 
            }
            break;
          }
          case 'i': {
            if (!$scope.addMeIrregular) {return;}   
            if ($scope.productsIrregular.indexOf($scope.addMeIrregular) == -1) {
                $scope.productsIrregular.push($scope.addMeIrregular);
            } else {
                $scope.errortext = "The item is already in your irregular shopping template list."; 
            } 
            break; 
          }
          case 's': {
            if (!$scope.addMeShopping) {return;}   
            if ($scope.productsShopping.indexOf($scope.addMeShopping) == -1) {
                $scope.productsShopping.push($scope.addMeShopping);
            } else {
                $scope.errortext = "The item is already in your shopping list."; 
            } 
            break; 
          }  
        }  // end switch
    }
    $scope.removeItem = function (x,listType) {
        $scope.errortext = ""; 
        switch (listType){
          case 'd': {
            $scope.productsDaily.splice(x, 1);
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
    $scope.moveItem = function (x,listTypeFrom, listTypeTo) {
        if (listTypeTo == "s") {
          $scope.errortext = ""; 
          switch (listTypeFrom){
            case 'd': {
              $scope.addMeShopping = $scope.productsDaily[x];
              break;
            }
            case 'w': {
              $scope.addMeShopping = $scope.productsWeekly[x];
              break;
            }
            case 'm': {
              $scope.addMeShopping = $scope.productsMonthly[x];
              break;
            }
            case 'i': {
              $scope.addMeShopping = $scope.productsIrregular[x];
              break;
            }
          }           
          this.removeItem(x, listTypeFrom);          
          this.addItem ('s');  
        }
    }
    $scope.saveItems = function() {
      if (typeof(storage) !== "undefined") {
        localStorage.setItem("itemsDaily", JSON.stringify($scope.productsDaily));
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
            document.getElementById("shoppingList").style.visibility="hidden";
        switch (listType){
  /*        case 'd': { // daily Template only
            document.getElementById("dailyList").style.visibility="visible";
            break;
          }
          case 'w': { // weekly template only
            document.getElementById("weeklyList").style.visibility="visible";
            break;
          }
          case 'm': { // monthly template only
            document.getElementById("monthlyList").style.visibility="visible";
            break;
          }
          case 'i': { // irregular template only
            document.getElementById("irregularList").style.visibility="visible";
            break;
          }
          case 'a': { // all templates
            document.getElementById("dailyList").style.visibility="visible";
            document.getElementById("weeklyList").style.visibility="visible";
            document.getElementById("monthlyList").style.visibility="visible";
            document.getElementById("irregularList").style.visibility="visible";
            break;
          }*/
          case 't': { // templates only
            document.getElementById("dailyList").style.visibility="visible";
            document.getElementById("weeklyList").style.visibility="visible";
            document.getElementById("monthlyList").style.visibility="visible";
            document.getElementById("irregularList").style.visibility="visible";
            document.getElementById("headerTitle").innerHTML="Create or update your own shopping template lists";
            break;
          }
          case 'p': { // pre-shopping
            document.getElementById("dailyList").style.visibility="visible";
            document.getElementById("weeklyList").style.visibility="visible";
            document.getElementById("monthlyList").style.visibility="visible";
            document.getElementById("irregularList").style.visibility="visible";
            document.getElementById("shoppingList").style.visibility="visible";
            document.getElementById("headerTitle").innerHTML="Create pre-shopping lists";
            break;
          }
          case 's': { // shopping
            document.getElementById("shoppingList").style.visibility="visible";
            document.getElementById("headerTitle").innerHTML="The shopping. Remove items already bought";
            break;
          }
        }  
    }
});