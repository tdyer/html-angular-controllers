![General Assembly Logo](http://i.imgur.com/ke8USTq.png)

## Rails View Model

In Rails the notion of a Model is that it's a instance of a class that represents on Entity or Thing that is stored/persisted as a Row in a Database.

In Angular, a ViewModel is a way for a Controller and View to create, read, update and delete common data.

The analogy between Angular and Rails might be better described as how data is shared between Rails controllers and Rails views. 


Remember, data is shared by creating an instance variable in the Controller, e.g. @age. 

This will be accessable in the Rails view for that Action. Rails implements this using an hash named 'assigns' that scoops up all the instance variables in the Controller and creates entries for each in the assigns hash. This assigns hash acts as a ViewModel in Rails.


