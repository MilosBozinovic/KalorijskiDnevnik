//  CONTOLLER MODULE
var CALORIEController = (function() {
    var Calorie = function(id, meal, calorie) {
        this.id = id;
        this.meal = meal;
        this.calorie = calorie;
    }
    var data = {
        meal: [],
        currentItem: null,
        total: 0
    }
    return {
        returnTotal: function() {
            var sum = 0;
            data.meal.forEach(function(obj) {
                sum += obj.calorie;
            });
            return data.total = parseInt(sum);
        },
        currentItemvalue: function() {
            return data.currentItem;
        },
        updateCurrentItem: function(UpdateObj) {
            var found = null;
            data.meal.forEach(function(obj) {
                if (obj.id == data.currentItem.id) {
                    obj.meal = UpdateObj.meal;
                    obj.calorie = parseInt(UpdateObj.calorie);
                    found = obj;
                }
            });
            return found;
        },
        getEditItemId: function(id) {
            var found = null;
            data.meal.forEach(function(current) {
                if (current.id == id) {
                    found = current;
                }
            });
            data.currentItem = found;
            return found;
        },
        addItem: function(meal, calorie) {
            var newItem, ID;
            if (data.meal.length > 0) {
                ID = data.meal[data.meal.length - 1].id + 1;
            } else {
                ID = 0;
            }
            newItem = new Calorie(ID, meal, calorie);
            data.meal.push(newItem);
            return newItem;
        },
        deleteMeal: function(id) {
            //alert(typeof id)
            var ids, index;
            ids = data.meal.map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);
            if (index !== -1) {
                data.meal.splice(index, 1)
            }
        },
        testing: function() {
            console.log(data)
        }
    }
})();


//  UI MODULE
var UIController = (function() {
    var DOMString = {
        mealName: '#meal-name',
        calorieName: '#calorie-name',
        addMealBtn: '#addMeal',
        itemlist: '#item-list',
        nodelist: '#item-list li',
        updateMeal: '#updateMeal',
        backBtn: '#backBtn',
        totalSelector: '#totalCalories'
    }
    return {
        getInput: function() {
            return {
                meal: document.querySelector(DOMString.mealName).value,
                calorie: parseInt(document.querySelector(DOMString.calorieName).value)
            }
        },
        totalInUI: function(totalValue) {
            document.querySelector(DOMString.totalSelector).innerHTML = totalValue;
            //console.log(totalValue)
        },
        addItem: function(obj) {
            var html
            html = ' <li  id="' + obj.id + '" class="collection-item"><strong><span class="meal">' + obj.meal + '</span>:</strong> <span class="calorie">' + obj.calorie + '</span> Kalorije <a href="# "  class="secondry-content"><a href="# " class="secondry-content"><img class="fa-pencil" src="/images/edit.svg" width="25px" height="25px"></img></a></a>  <a href="#"  class="secondry-content pull-right"><a href="# " class="secondry-content"><img class="fa-remove" src="/images/trash.svg" width="25px" height="25px"></img></a></a></li>';

            //create html with placeholder
            /* html = ' <li  id="' + obj.id + '" class="collection-item">' + obj.meal + ': ' + obj.calorie + ' Calorie</li>'; */
            //insert in DOM
            document.querySelector(DOMString.itemlist).insertAdjacentHTML('beforeend', html);
        },
        showCleartState: function() {
            document.querySelector(DOMString.updateMeal).style.display = 'none';
            document.querySelector(DOMString.backBtn).style.display = 'none';
        },
        showEditState: function() {
            document.querySelector(DOMString.updateMeal).style.display = 'inline';
            document.querySelector(DOMString.backBtn).style.display = 'inline';
        },
        clearFields: function() {
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMString.mealName + ',' + DOMString.calorieName);
            fieldsArray = Array.prototype.slice.call(fields);
            //console.log(fieldsArray)
            fieldsArray.forEach(function(current) {
                current.value = "";
            });
            fieldsArray[0].focus();
        },
        deleteMealList: function(deleteId) {
            document.getElementById(deleteId).remove();
        },
        setCurrentItem: function(currentObj) {
            document.querySelector(DOMString.mealName).value = currentObj.meal;
            document.querySelector(DOMString.calorieName).value = parseInt(currentObj.calorie);
        },
        getUpdateValue: function() {
            return {
                meal: document.querySelector(DOMString.mealName).value,
                calorie: document.querySelector(DOMString.calorieName).value
            }
        },
        UpdateUiValue: function() {
            var updatedData, lists, id;
            updatedData = CALORIEController.currentItemvalue();
            //alert(typeof updatedData.calorie)
            //console.log(updatedData)
            //console.log(updatedData.id)
            lists = document.querySelectorAll(DOMString.nodelist);
            //console.log(lists)
            lists = Array.from(lists);
            //console.log(lists)
            lists.forEach(function(list) {
                    id = parseInt(list.getAttribute('id'));
                    if (id === updatedData.id) {
                        //alert(typeof updatedData.calorie)
                        document.getElementById(updatedData.id).innerHTML = ' ' + updatedData.meal + ': ' + updatedData.calorie + ' Kalorije'
                    }
                })
                //console.log(test)
        },
        getDOMStrings: function() {
            return DOMString;
        }
    }
})();
//  APP MODULE
var APPController = (function(CalorieCtrl, UICtrl) {
    var setUpEventListner = function() {
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.addMealBtn).addEventListener('click', ctrAddItem)
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrAddItem();
            }
        });
        document.querySelector(DOM.itemlist).addEventListener('click', ctrEditItem);
        document.querySelector(DOM.itemlist).addEventListener('click', ctrDeleteItem);
        document.querySelector(DOM.backBtn).addEventListener('click', normalState);
        document.querySelector(DOM.updateMeal).addEventListener('click', ctrUpdateItem);
    }
    var updateUI = function() {
        UICtrl.UpdateUiValue();
        Materialize.toast('Meals update succssfully.', 4000);
    }
    var ctrUpdateItem = function() {
        var inputUpdateValue;
        inputUpdateValue = UICtrl.getUpdateValue();
        CALORIEController.updateCurrentItem(inputUpdateValue);
        //UICtrl.UpdateUiValue();
        updateUI();
        var total = CALORIEController.returnTotal();
        UICtrl.totalInUI(total);
    }
    var normalState = function() {
        UICtrl.showCleartState();
        UICtrl.clearFields();
    }
    var ctrEditItem = function(event) {
        //console.log(event.target);
        if (event.target.classList.contains('fa-pencil')) {
            var EditId, id;
            id = event.target.parentNode.parentNode.id;
            //console.log((parseInt(EditId));
            var currentObj = CalorieCtrl.getEditItemId(id);
            UICtrl.setCurrentItem(currentObj);
            UICtrl.showEditState();
        }
    }
    var ctrAddItem = function() {
        //alert('add item')
        var input, newMeal;
        //Get input data from UIController
        input = UICtrl.getInput();
        if (input.meal !== "" && input.calorie !== "") {
            //console.log(input)
            // Add data into CALORIEController
            newMeal = CalorieCtrl.addItem(input.meal, input.calorie)
                //console.log(test)
            UICtrl.addItem(newMeal);
            //Clear fields
            var total = CALORIEController.returnTotal();
            //alert(typeof total)
            UICtrl.totalInUI(total);
            UICtrl.clearFields();
            Materialize.toast('Meals added succssfully.', 4000);
        } else {
            Materialize.toast('All fields are required.', 4000);
        }
    }
    var ctrDeleteItem = function(event) {
        if (event.target.classList.contains('fa-remove')) {
            var mealId;
            mealId = event.target.parentNode.parentNode.id;
            var retVal = confirm("Are you sure you want to delete this item ?");
            if (retVal == true) {
                if (mealId) {
                    //prompt()
                    CalorieCtrl.deleteMeal(parseInt(mealId));
                    UICtrl.deleteMealList(mealId);
                    Materialize.toast('Meals deleted succssfully.', 4000);
                }
            } else {
                return false;
            }
            var total = CALORIEController.returnTotal();
            //alert(typeof total)
            UICtrl.totalInUI(total);
        }
    };
    return {
        init: function() {
            setUpEventListner();
            UICtrl.showCleartState();
            console.log('App Started...')
        }
    }
})(CALORIEController, UIController);
APPController.init();