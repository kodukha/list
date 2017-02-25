var app = angular.module("myShoppingList", []); 
app.controller("myCtrl", function($scope) {
    $scope.productsBuyNow = [];
    $scope.productsBuyLater = [];
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
          case 'n': {
            if (!$scope.addMeBuyNow) {return;}   
            if ($scope.productsBuyNow.indexOf($scope.addMeBuyNow) == -1) {
                $scope.productsBuyNow.push($scope.addMeBuyNow);
            } else {
                $scope.errortext = "The item is already in your 'buy now' shopping list."; 
            } 
            break; 
          }  
          case 'l': {
            if (!$scope.addMeBuyLater) {return;}   
            if ($scope.productsBuyLater.indexOf($scope.addMeBuyLater) == -1) {
                $scope.productsBuyLater.push($scope.addMeBuyLater);
            } else {
                $scope.errortext = "The item is already in your 'buy later' shopping list."; 
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
          case 'n': {
            $scope.productsBuyNow.splice(x, 1);
            break;
          }
          case 'l': {
            $scope.productsBuyLater.splice(x, 1);
            break;
          }
        }  
    }
    $scope.moveItem = function (x,listTypeFrom, listTypeTo) {
        if (listTypeTo == "n") {
          $scope.errortext = ""; 
          switch (listTypeFrom){
            case 'd': {
              $scope.addMeBuyNow = $scope.productsDaily[x];
              break;
            }
            case 'w': {
              $scope.addMeBuyNow = $scope.productsWeekly[x];
              break;
            }
            case 'm': {
              $scope.addMeBuyNow = $scope.productsMonthly[x];
              break;
            }
            case 'i': {
              $scope.addMeBuyNow = $scope.productsIrregular[x];
              break;
            }
          }           
          this.removeItem(x, listTypeFrom);          
          this.addItem ('n');  
        }
        else if (listTypeTo == "l") {
          $scope.errortext = ""; 
          switch (listTypeFrom){
            case 'd': {
              $scope.addMeBuyLater = $scope.productsDaily[x];
              break;
            }
            case 'w': {
              $scope.addMeBuyLater = $scope.productsWeekly[x];
              break;
            }
            case 'm': {
              $scope.addMeBuyLater = $scope.productsMonthly[x];
              break;
            }
            case 'i': {
              $scope.addMeBuyLater = $scope.productsIrregular[x];
              break;
            }
          }           
          this.removeItem(x, listTypeFrom);          
          this.addItem ('l');  
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
            document.getElementById("buyNowList").style.visibility="hidden";
            document.getElementById("buyLaterList").style.visibility="hidden";
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
            document.getElementById("buyNowList").style.visibility="visible";
            document.getElementById("buyLaterList").style.visibility="visible";
            document.getElementById("headerTitle").innerHTML="Create pre-shopping lists";
            break;
          }
          case 's': { // shopping
            document.getElementById("buyNowList").style.visibility="visible";
            document.getElementById("headerTitle").innerHTML="The shopping. Remove items already bought";
            break;
          }
        }  
    }
});