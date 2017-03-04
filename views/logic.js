var app = angular.module("myShoppingList", []); 
app.controller("myCtrl", function($scope) {
    $scope.isTemplates="false";
    $scope.isPreShopping="false";
    $scope.isShopping="false";
    $scope.isStartPage="true";    
    $scope.itemsDaily =[];
    $scope.itemsWeekly=[];
    $scope.itemsMonthly=[];
    $scope.itemsIrregular=[];
    $scope.itemsBuyNow = [];
    $scope.itemsBuyLater = [];
    $scope.listItemsPlain="";

    // load all lists from local storage
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
            $scope.addMeDaily="";
            break;
          }
          case 'w': {
            if (!$scope.addMeWeekly) {return;}   
            if ($scope.itemsWeekly.indexOf($scope.addMeWeekly) == -1) {
                $scope.itemsWeekly.push($scope.addMeWeekly);
            } else {
                $scope.errortext = "The item is already in your weekly shopping template list."; 
            }
            $scope.addMeWeekly="";
            break;
          }
          case 'm': {
            if (!$scope.addMeMonthly) {return;}   
            if ($scope.itemsMonthly.indexOf($scope.addMeMonthly) == -1) {
                $scope.itemsMonthly.push($scope.addMeMonthly);
            } else {
                $scope.errortext = "The item is already in your monthly shopping template list."; 
            }
            $scope.addMeMonthly="";
            break;
          }
          case 'i': {
            if (!$scope.addMeIrregular) {return;}   
            if ($scope.itemsIrregular.indexOf($scope.addMeIrregular) == -1) {
                $scope.itemsIrregular.push($scope.addMeIrregular);
            } else {
                $scope.errortext = "The item is already in your irregular shopping template list."; 
            } 
            $scope.addMeIrregular="";
            break; 
          }
          case 'n': {
            if (!$scope.addMeBuyNow) {return;}   
            if ($scope.itemsBuyNow.indexOf($scope.addMeBuyNow) == -1) {
                $scope.itemsBuyNow.push($scope.addMeBuyNow);
            } else {
                $scope.errortext = "The item is already in your 'buy now' shopping list."; 
            }
            $scope.addMeBuyNow=""; 
            break; 
          }  
          case 'l': {
            if (!$scope.addMeBuyLater) {return;}   
            if ($scope.itemsBuyLater.indexOf($scope.addMeBuyLater) == -1) {
                $scope.itemsBuyLater.push($scope.addMeBuyLater);
            } else {
                $scope.errortext = "The item is already in your 'buy later' shopping list."; 
            } 
            $scope.addMeBuyLater="";
            break; 
          }  
        }  // end switch
    }
    // edit item. step 1
    $scope.editItem = function (x, listType) {
      $scope.errortext = ""; 
      switch (listType){
        case 'd': {
          $scope.addMeDaily = $scope.itemsDaily[x];
          break;
        }
        case 'w': {
          $scope.addMeWeekly = $scope.itemsWeekly[x];
          break;
        }
        case 'm': {
          $scope.addMeMonthly = $scope.itemsMonthly[x];
          break;
        }
        case 'i': {
          $scope.addMeIrregular = $scope.itemsIrregular[x];
          break;
        }
        case 'n': {
          $scope.addMeBuyNow = $scope.itemsBuyNow[x];
          break;
        }
        case 'l': {
          $scope.addMeBuyLater = $scope.itemsBuyLater[x];
          break;
        }
      }
      this.removeItem(x, listType);
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
    // show easy to copy 'buy now' list
    $scope.showPlainList = function() {
      $scope.listItemsPlain=JSON.stringify($scope.itemsBuyNow).replace(/["\[\]]/gi, '').replace(",", ", ");
      document.getElementById("listItemsPlain").style.visibility="visible";
    }    
    // clear 'buy now' list and save both shopping lists to local storage
    $scope.finishShopping = function() {
      $scope.itemsBuyNow=[];
      if (typeof(storage) !== "undefined") {
        localStorage.setItem("itemsBuyNow", JSON.stringify($scope.itemsBuyNow));
        localStorage.setItem("itemsBuyLater", JSON.stringify($scope.itemsBuyLater));
      }
    }
    $scope.show = function(listType) {
        document.getElementById("allContent2").style.display="block";
        switch (listType){
          case 't': { // templates only
            $scope.isTemplates="true";
            $scope.isPreShopping="false";
            $scope.isShopping="false";
            $scope.isStartPage="false";
            //document.getElementById("headerTitle").innerHTML="Create or update templates";
            document.getElementById("headerTitle").innerHTML="Створити або відредагувати шаблони";
            document.getElementById("dailyItemActions").style.display="block";
            document.getElementById("weeklyItemActions").style.display="block";
            document.getElementById("monthlyItemActions").style.display="block";
            document.getElementById("irregularItemActions").style.display="block";
            document.getElementById("irregularList").style.display="block";
            document.getElementById("monthlyList").style.display="block";
            document.getElementById("weeklyList").style.display="block";
            document.getElementById("dailyList").style.display="block";
            document.getElementById("buyNowItemActions").style.display="none";
            document.getElementById("buyLaterItemActions").style.display="none";
            document.getElementById("listItemsPlain").style.display="none";
            break;
          }
          case 'p': { // pre-shopping
            $scope.isTemplates="false";
            $scope.isPreShopping="true";
            $scope.isShopping="false";
            $scope.isStartPage="false";
            //document.getElementById("headerTitle").innerHTML="Create pre-shopping lists";
            document.getElementById("headerTitle").innerHTML="Створити списки покупок";
            document.getElementById("buyNowItemActions").style.display="block";
            document.getElementById("buyLaterItemActions").style.display="block";
            document.getElementById("irregularList").style.display="block";
            document.getElementById("monthlyList").style.display="block";
            document.getElementById("weeklyList").style.display="block";
            document.getElementById("dailyList").style.display="block";
            document.getElementById("dailyItemActions").style.display="none";
            document.getElementById("weeklyItemActions").style.display="none";
            document.getElementById("monthlyItemActions").style.display="none";
            document.getElementById("irregularItemActions").style.display="none";
            document.getElementById("listItemsPlain").style.display="none";
            break;
          }
          case 's': { // shopping
            $scope.isTemplates="false";
            $scope.isPreShopping="false";
            $scope.isShopping="true";
            $scope.isStartPage="false";
            //document.getElementById("headerTitle").innerHTML="The shopping. Check or postpone";
            document.getElementById("headerTitle").innerHTML="Шопінг. Вибрати куплене або відкласти покупку";
            document.getElementById("buyNowItemActions").style.display="none";
            document.getElementById("buyLaterItemActions").style.display="none";
            document.getElementById("dailyItemActions").style.display="none";
            document.getElementById("weeklyItemActions").style.display="none";
            document.getElementById("monthlyItemActions").style.display="none";
            document.getElementById("irregularItemActions").style.display="none";
            document.getElementById("listItemsPlain").style.display="none";
            document.getElementById("irregularList").style.display="none";
            document.getElementById("monthlyList").style.display="none";
            document.getElementById("weeklyList").style.display="none";
            document.getElementById("dailyList").style.display="none";
            break;
          }
        }  
    }
});