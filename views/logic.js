var app = angular.module("myShoppingList", []); 
app.controller("myCtrl", function($scope) {
    $scope.isTemplates="false";
    $scope.isPreShopping="true";
    $scope.isShopping="false";
    $scope.itemsDaily =[];
    $scope.itemsWeekly=[];
    $scope.itemsMonthly=[];
    $scope.itemsIrregular=[];
    $scope.itemsBuyNow = [];
    $scope.itemsBuyLater = [];

    // load 6 lists from local storage
    if (typeof(storage) !== "undefined") {
      $scope.itemsDaily=JSON.parse(localStorage.getItem("itemsDaily"));
      $scope.itemsWeekly=JSON.parse(localStorage.getItem("itemsWeekly"));
      $scope.itemsMonthly=JSON.parse(localStorage.getItem("itemsMonthly"));
      $scope.itemsIrregular=JSON.parse(localStorage.getItem("itemsIrregular"));
      $scope.itemsBuyNow=JSON.parse(localStorage.getItem("itemsBuyNow"));
      $scope.itemsBuyLater=JSON.parse(localStorage.getItem("itemsBuyLater"));
    }
    // add item to some list
    $scope.addItem = function (listType) {
        $scope.errortext = "";
        switch (listType) {
          case 'd':{     
            if (!$scope.addMeDaily) {return;}   
            if ($scope.itemsDaily.indexOf($scope.addMeDaily) == -1) {
                $scope.itemsDaily.push($scope.addMeDaily);
            } else {
                $scope.errortext = "The item is already in your daily shopping template list."; 
            }
            break;
          }
          case 'w': {
            if (!$scope.addMeWeekly) {return;}   
            if ($scope.itemsWeekly.indexOf($scope.addMeWeekly) == -1) {
                $scope.itemsWeekly.push($scope.addMeWeekly);
            } else {
                $scope.errortext = "The item is already in your weekly shopping template list."; 
            }
            break;
          }
          case 'm': {
            if (!$scope.addMeMonthly) {return;}   
            if ($scope.itemsMonthly.indexOf($scope.addMeMonthly) == -1) {
                $scope.itemsMonthly.push($scope.addMeMonthly);
            } else {
                $scope.errortext = "The item is already in your monthly shopping template list."; 
            }
            break;
          }
          case 'i': {
            if (!$scope.addMeIrregular) {return;}   
            if ($scope.itemsIrregular.indexOf($scope.addMeIrregular) == -1) {
                $scope.itemsIrregular.push($scope.addMeIrregular);
            } else {
                $scope.errortext = "The item is already in your irregular shopping template list."; 
            } 
            break; 
          }
          case 'n': {
            if (!$scope.addMeBuyNow) {return;}   
            if ($scope.itemsBuyNow.indexOf($scope.addMeBuyNow) == -1) {
                $scope.itemsBuyNow.push($scope.addMeBuyNow);
            } else {
                $scope.errortext = "The item is already in your 'buy now' shopping list."; 
            } 
            break; 
          }  
          case 'l': {
            if (!$scope.addMeBuyLater) {return;}   
            if ($scope.itemsBuyLater.indexOf($scope.addMeBuyLater) == -1) {
                $scope.itemsBuyLater.push($scope.addMeBuyLater);
            } else {
                $scope.errortext = "The item is already in your 'buy later' shopping list."; 
            } 
            break; 
          }  
        }  // end switch
    }
    // clear all items from some list
    $scope.clearItems = function (listType) {
        $scope.errortext = ""; 
        switch (listType){
          case 'd': {
            $scope.itemsDaily=[];
            break;
          }
          case 'w': {
            $scope.itemsWeekly=[];
            break;
          }
          case 'm': {
            $scope.itemsMonthly=[];
            break;
          }
          case 'i': {
            $scope.itemsIrregular=[];
            break;
          }
          case 'n': {
            $scope.itemsBuyNow=[];
            break;
          }
          case 'l': {
            $scope.itemsBuyLater=[];
            break;
          }
        }  
    }
    // remove item from some list
    $scope.removeItem = function (x,listType) {
        $scope.errortext = ""; 
        switch (listType){
          case 'd': {
            $scope.itemsDaily.splice(x, 1);
            break;
          }
          case 'w': {
            $scope.itemsWeekly.splice(x, 1);
            break;
          }
          case 'm': {
            $scope.itemsMonthly.splice(x, 1);
            break;
          }
          case 'i': {
            $scope.itemsIrregular.splice(x, 1);
            break;
          }
          case 'n': {
            $scope.itemsBuyNow.splice(x, 1);
            break;
          }
          case 'l': {
            $scope.itemsBuyLater.splice(x, 1);
            break;
          }
        }  
    }
    // move item from one list to some other list
    $scope.moveItem = function (x,listTypeFrom, listTypeTo) {
        if (listTypeTo == "n") {
          $scope.errortext = ""; 
          switch (listTypeFrom){
            case 'd': {
              $scope.addMeBuyNow = $scope.itemsDaily[x];
              break;
            }
            case 'w': {
              $scope.addMeBuyNow = $scope.itemsWeekly[x];
              break;
            }
            case 'm': {
              $scope.addMeBuyNow = $scope.itemsMonthly[x];
              break;
            }
            case 'i': {
              $scope.addMeBuyNow = $scope.itemsIrregular[x];
              break;
            }
            case 'l': {
              $scope.addMeBuyNow = $scope.itemsBuyLater[x];
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
              $scope.addMeBuyLater = $scope.itemsDaily[x];
              break;
            }
            case 'w': {
              $scope.addMeBuyLater = $scope.itemsWeekly[x];
              break;
            }
            case 'm': {
              $scope.addMeBuyLater = $scope.itemsMonthly[x];
              break;
            }
            case 'i': {
              $scope.addMeBuyLater = $scope.itemsIrregular[x];
              break;
            }
            case 'n': {
              $scope.addMeBuyLater = $scope.itemsBuyNow[x];
              break;
            }
          }           
          this.removeItem(x, listTypeFrom);          
          this.addItem ('l');  
        }
    }
    // save templates to local storage
    $scope.saveTemplateItems = function() {
      if (typeof(storage) !== "undefined") {
        localStorage.setItem("itemsDaily", JSON.stringify($scope.itemsDaily));
        localStorage.setItem("itemsWeekly", JSON.stringify($scope.itemsWeekly));
        localStorage.setItem("itemsMonthly", JSON.stringify($scope.itemsMonthly));
        localStorage.setItem("itemsIrregular", JSON.stringify($scope.itemsIrregular));
      }
    }
    // save shopping lists to local storage
    $scope.saveShoppingItems = function() {
      if (typeof(storage) !== "undefined") {
        localStorage.setItem("itemsBuyNow", JSON.stringify($scope.itemsBuyNow));
        localStorage.setItem("itemsBuyLater", JSON.stringify($scope.itemsBuyLater));
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
          case 't': { // templates only
            $scope.isTemplates="true";
            $scope.isPreShopping="false";
            $scope.isShopping="false";
            document.getElementById("dailyList").style.visibility="visible";
            document.getElementById("weeklyList").style.visibility="visible";
            document.getElementById("monthlyList").style.visibility="visible";
            document.getElementById("irregularList").style.visibility="visible";
            document.getElementById("saveTemplateItemsButton").style.visibility="visible";
            document.getElementById("saveShoppingItemsButton").style.visibility="hidden";
            var cartImages = document.getElementsByClassName('cart');
            if (cartImages.length > 0) {
              for (i=0; i< cartImages.length; i++) {
                cartImages[i].style.visibility = "hidden";
              }
            }
            var clockImages = document.getElementsByClassName('clock');
            if (clockImages.length >0) {
              for (i=0; i< clockImages.length; i++) {
                clockImages[i].style.visibility = "hidden";
              }
            }
            var binImages = document.getElementsByClassName('bin');
            if (binImages.length > 0) {
              for (i=0; i< binImages.length; i++) {
                binImages[i].style.visibility = "visible";
              }
            }
            document.getElementById("headerTitle").innerHTML="Create or update your own shopping template lists";
            document.getElementById("addNowInput").style.visibility="hidden";
            break;
          }
          case 'p': { // pre-shopping
            $scope.isTemplates="false";
            $scope.isPreShopping="true";
            $scope.isShopping="false";
            document.getElementById("dailyList").style.visibility="visible";
            document.getElementById("weeklyList").style.visibility="visible";
            document.getElementById("monthlyList").style.visibility="visible";
            document.getElementById("irregularList").style.visibility="visible";
            document.getElementById("buyNowList").style.visibility="visible";
            document.getElementById("buyLaterList").style.visibility="visible";
            document.getElementById("addNowInput").style.visibility="visible";
            document.getElementById("saveTemplateItemsButton").style.visibility="hidden";
            document.getElementById("saveShoppingItemsButton").style.visibility="visible";
            var cartImages = document.getElementsByClassName('cart');
            if (cartImages.length > 0) {
              for (i=0; i< cartImages.length; i++) {
                cartImages[i].style.visibility = "visible";
              }
            }
            var clockImages = document.getElementsByClassName('clock');
            if (clockImages.length >0) {
              for (i=0; i< clockImages.length; i++) {
                clockImages[i].style.visibility = "visible";
              }
            }
            var binImages = document.getElementsByClassName('bin');
            if (binImages.length > 0) {
              for (i=0; i< binImages.length; i++) {
                binImages[i].style.visibility = "hidden";
              }
            }
            var checkboxes = document.getElementsByClassName('buyNowItemCheckbox');
            if (checkboxes.length > 0) {
              for (i=0; i< checkboxes.length; i++) {
                checkboxes[i].style.visibility = "hidden";
              }
            }
            var noCheckboxes = document.getElementsByClassName('buyNowItem');
            if (noCheckboxes.length > 0) {
              for (i=0; i< noCheckboxes.length; i++) {
                noCheckboxes[i].style.visibility = "visible";
              }
            }
            document.getElementById("headerTitle").innerHTML="Create pre-shopping lists";
            break;
          }
          case 's': { // shopping
            $scope.isTemplates="false";
            $scope.isPreShopping="false";
            $scope.isShopping="true";
            document.getElementById("buyNowList").style.visibility="visible";
            document.getElementById("saveTemplateItemsButton").style.visibility="hidden";
            document.getElementById("saveShoppingItemsButton").style.visibility="hidden";
            document.getElementById("headerTitle").innerHTML="The shopping. Remove items already bought";
            var cartImages = document.getElementsByClassName('cart');
            if (cartImages.length > 0) {
              for (i=0; i< cartImages.length; i++) {
                cartImages[i].style.visibility = "hidden";
              }
            }
            var clockImages = document.getElementsByClassName('clock');
            if (clockImages.length >0) {
              for (i=0; i< clockImages.length; i++) {
                clockImages[i].style.visibility = "hidden"; // should be visible for 'n' list
              }
            }
            var binImages = document.getElementsByClassName('bin');  
            if (binImages.length > 0) {
              for (i=0; i< binImages.length; i++) {
                binImages[i].style.visibility = "hidden";
              }
            }
            var checkboxes = document.getElementsByClassName('buyNowItemCheckbox');
            if (checkboxes.length > 0) {
              for (i=0; i< checkboxes.length; i++) {
                checkboxes[i].style.visibility = "visible";
              }
            }
            var noCheckboxes = document.getElementsByClassName('buyNowItem');
            if (noCheckboxes.length > 0) {
              for (i=0; i< noCheckboxes.length; i++) {
                noCheckboxes[i].style.visibility = "hidden";
              }
            }
            document.getElementById("addNowInput").style.visibility="hidden";
            break;
          }
        }  
    }
});