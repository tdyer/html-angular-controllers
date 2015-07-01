(function(angular){

  // Constructor Function
  function PetsController(){
    this.pets = [{name: 'Rover', species: 'Dog', age: 7},{name: 'Milo', species: 'Horse', age: 3}, {name: 'Sh*tCat', species: 'Cat', age: 11}, {name: 'Mertle', species: 'Turtle', age: 123 } ];

  }

  PetsController.prototype.totalPets = function(pet){
    return this.pets.length;
  };

  PetsController.prototype.oldestPet = function(){
    var candidatePet = this.pets[0];

    this.pets.forEach(function(pet){
      if (pet.age > candidatePet.age) {
        candidatePet = pet;
      }
    });

    return candidatePet;
  };

  // The Controller is part of the module.
  angular.module('petsApp').controller('PetsController', PetsController);

})(angular);
