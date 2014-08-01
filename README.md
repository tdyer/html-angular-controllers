## Angular Expressions, Directives and Filters

We are going to dive into Angular Controllers. Later we will see how views fit into the Angular architecture. 

## Objectives

![Angular Overview](AngularComponentOverview1.png)

Just Controllers for now.

## Demo 

#### Setup

We have a js directory that will contain the Angular javascript, angular.js.

#### ViewModel, $scope

In Angular there is an implementation of a design pattern named _ViewModel_. The ViewModel is shared between a Controller and a View. __Use $scope to access the ViewModel__

* The Controller can add or change a property in the $scope. 

Rails hides the mechanism that allows you to share attributes/variables between Controllers and Views. In Rails all one needs to do is create an instance variable in the Controller, @foo, and it becomes available to the View.

In Angular, one must _explicitly_ set a property/attribute on the ViewModel, $scope, in the Controller for it to become available in the View.


#### Simple Controller

Let's refactor what we've done in the previous lesson about Views and Directives. And use a Controller.


__Let's start with this code in directives_last.html from the previous View/Directives lesson.__

```
<!document html>
<html ng-app>
  <head>
    <script type='text/javascript' src='js/angular.js'></script>
  </head>
  <body ng-init="customers=[{joined: '2000-12-02', name:'John', city:'Chandler', orderTotal: 9.9956}, {joined: '1965-01-25',name:'Zed', city:'Las Vegas', orderTotal: 19.99},{joined: '1944-06-15',name:'Tina', city:'New York', orderTotal:44.99}, {joined: '1995-03-28',name:'Dave', city:'Seattle', orderTotal:101.50}]">
    <h3>Customers</h3>
    Filter: <input type="text" ng-model="customerFilter.name"/>
    <br/>
    <br/>
    <table>
      <tr>
        <th ng-click="sortBy='name';reverse=!reverse">Name</th>
        <th ng-click="sortBy='city';reverse=!reverse">City</th>
        <th ng-click="sortBy='orderTotal';reverse=!reverse">Order Total</th>
        <th ng-click="sortBy='joined';reverse=!reverse">Joined</th>
      </tr>
      <tr ng-repeat="cust in customers | filter: customerFilter | orderBy:sortBy:reverse">
        <!-- <tr ng-repeat="cust in customers"> -->
        <td>{{ cust.name }}</td>
        <td>{{ cust.city}}</td>
        <td>{{ cust.orderTotal | currency }}</td>
        <td>{{ cust.joined | date}}</td>
      </tr>
    </table>
  </body>
</html>

```

We are going to:  
1. Create a directory, app/controllers, that will contain all the Angular Controllers.  
	``mkdir -p app/controllers``  
2. Create a Controller file and add code, _see below_.  
3. Move the customers Array definition out of the the View, ng-init, and define it as a property on the $scope in the Controller. _Eventually, this data will come from the backend_.  
4. Move the sort click handlers from the view into the Controller.  


__Add this to app/controllers/customersController.js__

```
function CustomersController($scope){
  // 3. Define customers data in the ViewModel customers property
  $scope.customers = [{joined: '2000-12-02', name:'John', city:'Chandler', orderTotal: 9.9956}, {joined: '1965-01-25',name:'Zed', city:'Las Vegas', orderTotal: 19.99},{joined: '1944-06-15',name:'Tina', city:'New York', orderTotal:44.99}, {joined: '1995-03-28',name:'Dave', city:'Seattle', orderTotal:101.50}];

  $scope.sortBy = name;
  $scope.reverse = false;

  // 4. Define a sort click handlers
  $scope.doSort = function(propName){
    $scope.sortBy = propName;
    $scope.reverse = $scope.!reverse;
  };
}

```

__Completed html is in controllers1.html.__  

```
 ...
    <!-- 2. Move code into a Controller. -->
    <script type='text/javascript' src='app/controllers/customersController.js'></script>
    
 ...
   <!-- 3. Removed customers data from ng-init into the Controller -->
  <body>
 ...
   <!-- 4. Use the sort click handler from the Controller\
 -->
        <th ng-click="doSort('name')">Name</th>
        <th ng-click="doSort('city')">City</th>
        <th ng-click="doSort('orderTotal')">Order Total</th>
        <th ng-click="doSort('joined')">Joined</th>    
```


## Lab 1

Add input fields for email and age that have bindings to attributes. Show these attributes using expressions.

## Demo


### ng-hide, ng-click directives.

Lets please HTML validators and use _data-ng-_ directives.

__Create a file directives2.html.__

```
<html data-ng-app>
  <head>
    <script type="text/javascript" src='js/angular.js'> </script>
  </head>
  <!-- initialize name attribute to the value 'James' -->
  <body data-ng-init="name='James'">

    <!-- Bind hide to isHidden -->
    <div data-ng-hide="isHidden">
      <input type='text' data-ng-model="name" placeholder="Enter name"/>
      <p> Name's value is: {{name}}</p>
    </div>

    <!-- Toggle the isHidden property between true and false -->
    Hide: <input type='checkbox' data-ng-model="isHidden"/>
    <br/>
    <!-- Set the name property to Mortimer -->
    <button data-ng-click="name='Mortimer'">Change Name</button>

    <script type='text/javascript' src='js/angular.js'></script>
  </body>
</html>
```

Now we see a couple of new directives. 

* ng-hide - Shows or hides the HTML element depending on the value of the isHidden attribute.  
* ng-init - Evaluates expression, ``name='James'``, in the current scope.  Creates and initializes the name attribute.
* ng-click - Evaluates the expression, `` name='Mortimer` ``. Changes the name attribute's value to 'Mortimer'  

In the Chrome debugger notice how the div surrounding the input field gets the class ng-hide when one clicks the checkbox.



### ng-switch, ng-show directives.


__Create a file directives3.html.__

```
<!doctype html>
<html data-ng-app>
  <head>
    <title>More on Directives</title>
    <link href='css/styles.css' rel="stylesheet" type='text/css'/>
    <script type='text/javascript' src='js/angular.js'></script>
  </head>
  <!-- Set the initial model property, data.    -->
  <body data-ng-init="data={name:'James', isVisible: true, loggedIn: false,   status: 'red'}">
    <div data-ng-switch on="data.loggedIn">
      <div data-ng-switch-when="true">
        Welcome {{data.name}}
      </div>
      <div data-ng-switch-default data-ng-class="data.status">Login</div>
    </div>
    <br/>
    <div data-ng-show="data.isVisible">
      Name: <input type='text' data-ng-model="data.name" />
      {{ data.name }}
    </div>
  </body>
</html>

```

This will create an object literal, data, that is seen in the view. The data.name is shown if you are logged in. Otherwise show a red login.

## Lab 2

Change the _"data"__ object literal so that:  
* Input fields are hidden.  
* User is logged in.  


## Demo

### ng-repeat

This will create an Array of people that contains an object literal for each person. _This will emulate an Array that we get from an API using Ajax_.

We want to iterate over this people Array and __repeat__ some markup that will show each person.

__Create a file directives_repeat.html.__

```
<!document html>
<html ng-app>
  <head>
    <script type='text/javascript' src='js/angular.js'></script>
  </head>
  <body>
    <div ng-init="people=[{name: 'Tom', city:'Groton'}, {name: 'Mike',
    city: 'Tewksbury'}, {name: 'Joe', city: 'Derry'}, {name: 'Ed',city:'Portland'}]">
      <h3>Iterating through data with ng-repeat</h3>
      <ul>
        <li ng-repeat="person in people">{{person.name}} lives in {{person.city}}</li>
      </ul>
      <table>
        <tr>
          <th>Name</th>
          <th>City</th>
        </tr>
        <tr ng-repeat="person in people">
          <td>{{ person.name }}</td>
          <td>{{ person.city}}</td>
        </tr>
      </table>
    </div>
  </body>
</html>

```

* ng-repeat - Add ng-repeat directive to the HTML element you want to repeat. Once for each member of a collection.

Here we are repeating a list element and a table row for each person in the people Array.


## Lab 
Create  a list of products and generate a table for each product. 

## Demo

#### Filters

Filters can be used to format data, convert it to json, limit the number of items to show, upcase or lower case a string or order data in a collection.




## Documentation

[AngularJS](https://angularjs.org/)

[API Documentation](https://docs.angularjs.org/api)

This is like the $.ajax in JQuery.  
[Ajax HTTP Service](https://docs.angularjs.org/api/ng/service/$http) 