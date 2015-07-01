## Angular Controllers, ViewModel and Modules.

We are going to dive into Angular Controllers, ViewModels and Modules. 

## Objectives

* Implement a Controller.
* Share data between a Controller and a View.
* Implement an Angular Module to namespace and contain Angular components.
* Show how Module dependencies can be defined.


## Overview

Few important features of AngularJS are:  

* two-way data binding _(Done)_  
* separation of concerns _(In this lesson)_  
* testability  
* abstraction _(Some in this lesson. More later)_  

![Angular Overview](AngularComponentOverview1.png)

We will be looking at Controllers, Views and Modules in this lesson. We covered Views and directives in the last lesson, [Angular Views and Directives](https://github.com/ga-wdi-boston/wdi_9_angular_demo_directives)

## Demo 

#### Setup

Get AngularJS libraries.

```bower install```

At the end of the lesson we will have an app/controllers directory where the the controllers are defined.

#### ViewModel and $scope

![ViewModel](ViewModel.png)



#####In Angular there are **TWO** ways to share data between an Controller and a View. First, and preferred is use the Controller 'this'. Second is to use $scope.

### Using Controller 'this'

This is the recommended way to to share data.

**Create a pets.html**

```html
<!document html>
<html ng-app>
  <head>
     <script type='text/javascript' src='bower_components/angular/angular.js'></script>
  </head>
  <body>
  </body>
</html>
```
**Create a app/app.js**

```javascript
angular.module('petsApp', []);
```

**Add the application name/module to the ng-app directive in the pets.html**

```html
...
<html ng-app='petsApp'>
...
```

This will name the Angular application, provide a namespace for it, 'petsApp', and a top level module. *We'll learn about modules later.*

**Add a Controller file, app/controllers/petsController.js**

```javascript
(ƒ(angular){

  // Constructor Function                                                                                         
  function PetsController(){
    this.pets = [{name: 'Rover', species: 'Dog', age: 7},{name: 'Milo', species: 'Horse', age: 3}, {name: 'Sh*tCa\
t', species: 'Cat', age: 11}, {name: 'Mertle', species: 'Turtle', age: 123 } ];

  }
 
  // The Controller is part of the module.                                                                        
  angular.module('petsApp').controller('PetsController', PetsController);

})(angular);
```

Lots of stuff here. 

We are creating a Controller for pets. It's really just a Javascript Constructor Function. *Later, we'll use it to create ONE instance of a PetsController.*

Then we create an array of object literals, each one holding data about a pet. *The controller instance we create in the view will have it's 'pets' property set to this array of pets.*

Notice that we put all the code in an IIFE that get's passed the *global* angular variable. *We do this so we can put private variables in this scope that will NOT pollute the global namespace. 
*We haven't yet created any private variables, but we may as time goes on*

**Update the pets.html to use this controller**

```html
  ...
  <head>
  <script type='text/javascript' src='app/pets_app_done.js'></script>
  <script type='text/javascript' src='app/controllers/petsController_done.js'></script>
  </head>

  <body ng-controller="PetsController as petsCtrl">
    <h3>Pets</h3>
    <br/>
    <table>
      <tr>
        <th>Name</th>
        <th>Species</th>
	<th>Age</th>
      </tr>
      <tr ng-repeat="pet in petsCtrl.pets">
	<td>{{ pet.name }}</td>
        <td>{{ pet.species}}</td>
        <td>{{ pet.age }}</td>
      </tr>
    </table>
  </body>
```

Open this pets.html in the browser. You should see a table of pets.

First, we included the javascript files for the app, app.js, and the controller, app/controllers/pets_controller.js.

Then in the ``body`` tag we created a ``ng-controller`` attribute. We set this attribute to have a value that will make the one *instance* of the PetsController avaialble in the View. The name will be 'petsCtrl' in the view will refer to this ONE instance of the PetsController.


**Add this to the PetsController, right above the angular.module line. **

```javascript
... 
PetsController.prototype.totalPets = ƒ(pet){
    return this.pets.length;
  };

  PetsController.prototype.oldestPet = ƒ(){
    var candidatePet = this.pets[0];

    this.pets.forEach(ƒ(pet){
      if (pet.age > candidatePet.age) {
	candidatePet = pet;
      }
    });

    return candidatePet;
  };

... 
```

Here we create to methods on the controller. 


**Add this to the pets.html**

```html
 <br/>
    <span>Oldest pet: {{ petsCtrl.oldestPet().name }}</span><br/>
    <span>Total number of pets: {{ petsCtrl.totalPets() }}</span>
```

This will use these two Controller methods in the View.


### Using $scope (OPTIONAL)
The second way uses an implementation of a design pattern named _ViewModel_. The ViewModel is shared between a Controller and a View. __In Angular, $scope is the ViewModel.__

* The ViewModel, ``$scope``, is injected into the Controller.
* The Controller can add or change a properties in the $scope and make them visible to the View.


In Angular, one must _explicitly_ set a property on the ViewModel, $scope, in the Controller for it to become available in the View. 

For example, in order to share a property between a Controller and a View one __must__ set this property on the ViewModel, $scope.

In the Controller:  

```javascript
$scope.pet = {name: 'Rover', species: 'Dog', age: 7};

```

Is made available in the View:


```html
 <p> {{pet.name} is only {{pet.age}</p>
```


## Lab: Customer's Controller

Let's refactor the code we've used in the previous lesson about Views and Directives into an Angular Controller.


1. Start with the code from the last directives lesson, directives_last.html.
2. Rename this html file to customers.html.
3. Create a application module for this customer's app in app/customers.js
5. Update the ng-app directive in the customers.html, ya know in the html tag. 
4. Create a controller in the app/controllers/customersController.js
	4.1 Create an array of customers in the controller, *hint move it from the ng-init.*  
	4.2 Create controller properties for ``sortBy`` and ``reverse``.  
5. Update the body tag so we will create one instance of the CustomersController for the view. The view will refer to this instance ``as`` customersCtrl.
6. Invoke the CustomersController.doSort method where needed. *Yes, you must create this controller method.*  
7. Invoke the CustomersController.numOfCustomers method where needed. *Yes, you must create this controller method.* 

**The customers_done.html file will have the finished template.**

## Documentation

[AngularJS](https://angularjs.org/)

[API Documentation](https://docs.angularjs.org/api)

This is like the $.ajax in JQuery.  
[Ajax HTTP Service](https://docs.angularjs.org/api/ng/service/$http) 