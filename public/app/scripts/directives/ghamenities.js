'use strict';

/**
 * @ngdoc directive
 * @name waoApp.directive:ghAmenities
 * @description
 * # ghAmenities
 */
angular.module('waoApp')
  .directive('ghAmenities', [function() {
    return {
      templateUrl: 'views/gh-amenities.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.check = {
          'FLAT': false,
          'ROOM': false,
          'PG': false
        };

        $scope.showAll = true;
      }],

      link: function(scope, element, attrs) {

        if (attrs.showall === 'false') {
          scope.showAll = false;
        }

        scope.$watchCollection('listingInfo', function(newValue) {
          if (newValue && newValue !== null) {
            var containsInArray = function(arr, prop, val) {
              try {
                var splittedProp = prop.split('.');
                return (splittedProp.length <= 1 ? AmenitiesRef[arr][prop] : AmenitiesRef[arr][splittedProp[0]][splittedProp[1]]).indexOf(val) >= 0;
              } catch (err) {

              }
            };

            var data = newValue.details || newValue[0].details;
            scope.check[data.category.toUpperCase()] = true;
            var isPg = scope.check.PG;
            var AmenitiesRef = data;

            scope.amenities = {
              'blocks': [{
                'head': isPg ? 'PG SERVICES' : 'BUILDING AMENITIES',
                'arr': 'buildingAmenities',
                'class': 'a-item',
                'show': true
              }, {
                'head': isPg ? 'PG AMENITIES' : 'HOUSE AMENITIES',
                'arr': 'houseAmenities',
                'class': 'a-item',
                'show': true
              }, {
                'head': 'PG RULES',
                'arr': 'pgRules',
                'class': 'pg-item',
                'show': scope.check.PG && scope.showAll
              }, {
                'head': 'FOOD SERVICES',
                'arr': 'foodServices',
                'class': 'pg-item fo-item',
                'show': scope.check.PG && scope.showAll
              }],
              'buildingAmenities': [{
                'name': 'Parking',
                'show': true,
                'isNotAvailable': false,
                'class': 'parking-',
                'avail': containsInArray('amenities', 'building', 'Parking')
              }, {
                'name': 'Security',
                'show': true,
                'isNotAvailable': false,
                'class': 'security-',
                'avail': containsInArray('amenities', 'building', 'Security')
              }, {
                'name': 'Laundry',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'laundry-',
                'avail': containsInArray('amenities', 'building', 'Laundry')
              }, {
                'name': 'House Keeping',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'house-keeping-',
                'avail': containsInArray('amenities', 'building', 'House Keeping')
              }, {
                'name': 'Pool',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'pool-',
                'avail': containsInArray('amenities', 'building', 'pool')
              }, {
                'name': 'Elevator',
                'show': true,
                'isNotAvailable': false,
                'class': 'elevator-',
                'avail': containsInArray('amenities', 'building', 'Elevator')
              }, {
                'name': 'Clubhouse',
                'show': true,
                'isNotAvailable': false,
                'class': 'clubhouse-',
                'avail': containsInArray('amenities', 'building', 'Clubhouse')
              }, {
                'name': 'Gym',
                'show': true,
                'isNotAvailable': false,
                'class': 'gym-',
                'avail': containsInArray('amenities', 'building', 'Gym')
              }, {
                'name': 'Owner on premises',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'owneronpremises-',
                'avail': containsInArray('amenities', 'building', 'Owneronpremises')
              }, {
                'name': 'Power back up',
                'show': true,
                'isNotAvailable': false,
                'class': 'powerbackup-',
                'avail': containsInArray('amenities', 'building', 'powerbackup')
              }, {
                'name': '24 Hours Water Supply',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'water-24-',
                'avail': containsInArray('amenities', 'building', '24 Hours Water Supply')
              }, {
                'name': 'CCTV',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'cctv-',
                'avail': containsInArray('amenities', 'building', 'CCTV')
              }],
              'houseAmenities': [{
                'name': 'Cupboard',
                'show': true,
                'isNotAvailable': false,
                'class': 'cupboard-',
                'avail': containsInArray('amenities', 'property', 'Cupboard')
              }, {
                'name': 'Refrigerator',
                'show': true,
                'isNotAvailable': false,
                'class': 'fridge-',
                'avail': containsInArray('amenities', 'property', 'Fridge')
              }, {
                'name': 'AC',
                'show': true,
                'isNotAvailable': false,
                'class': 'ac-',
                'avail': containsInArray('amenities', 'property', 'AC')
              }, {
                'name': 'Bed',
                'show': true,
                'isNotAvailable': false,
                'class': 'bed-',
                'avail': containsInArray('amenities', 'property', 'Bed')
              }, {
                'name': 'Shoerack',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'shoerack-',
                'avail': containsInArray('amenities', 'property', 'Shoerack')
              }, {
                'name': 'Gas stove',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'gas-stove-',
                'avail': containsInArray('amenities', 'property', 'Gas Stove')
              }, {
                'name': 'Microwave',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'microwave-',
                'avail': containsInArray('amenities', 'property', 'Microwave')
              }, {
                'name': 'Sofa',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'sofa-',
                'avail': containsInArray('amenities', 'property', 'Sofa')
              }, {
                'name': 'Internet (Wifi)',
                'show': true,
                'isNotAvailable': false,
                'class': 'wifi-',
                'avail': containsInArray('amenities', 'property', 'WIFI')
              }, {
                'name': 'Fan',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'fan-',
                'avail': containsInArray('amenities', 'property', 'Fan')
              }, {
                'name': 'TV',
                'show': true,
                'isNotAvailable': isPg ? true : false,
                'class': 'television-',
                'avail': containsInArray('amenities', 'property', 'Television')
              }, {
                'name': 'Geyser',
                'show': true,
                'isNotAvailable': isPg ? true : false,
                'class': 'geyser-',
                'avail': containsInArray('amenities', 'property', 'Geyser')
              }, {
                'name': 'Washing Machine',
                'show': true,
                'isNotAvailable': isPg ? true : false,
                'class': 'washing-machine-',
                'avail': containsInArray('amenities', 'property', 'Washing Machine')
              }, {
                'name': 'Western Toilet',
                'show': true,
                'isNotAvailable': false,
                'class': 'western-',
                'avail': containsInArray('amenities', 'property', 'Western Toilet')
              }, {
                'name': 'Modular Kitchen',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'modular-kitchen-',
                'avail': containsInArray('amenities', 'property', 'Modular Kitchen')
              }, {
                'name': 'Water purifier',
                'show': true,
                'isNotAvailable': false,
                'class': 'water-purifier-',
                'avail': containsInArray('amenities', 'property', 'Water purifier')
              }, {
                'name': 'Table',
                'show': true,
                'isNotAvailable': false,
                'class': 'table-',
                'avail': containsInArray('amenities', 'property', 'Table')
              }, {
                'name': 'Chair',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'table-',
                'avail': containsInArray('amenities', 'property', 'Chair')
              }, {
                'name': 'Dining Table',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'table-',
                'avail': containsInArray('amenities', 'property', 'Diningtable')
              }, {
                'name': 'Attached Toilet',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'western-',
                'avail': containsInArray('amenities', 'property', 'attached toilet')
              }, {
                'name': 'Cooking Allowed',
                'show': isPg,
                'isNotAvailable': false,
                'class': 'utensils-',
                'avail': containsInArray('amenities', 'property', 'cookingallowed')
              }],
              'pgRules': [{
                'name': (containsInArray('pgInfo', 'rules', 'Girls allowed') && data.gender[0] === "Female") ? 'Boys not allowed' : (containsInArray('pgInfo', 'rules', 'Girls allowed') ? 'Girls allowed' : 'Girls not allowed'),
                'show': true,
                'isNotAvailable': false,
                'class': 'girls-entry-',
                'avail': containsInArray('pgInfo', 'rules', 'Girls allowed')
              }, {
                'name': 'Entry 11:00 PM',
                'show': containsInArray('pgInfo', 'rules', 'Entry 11:00 PM'),
                'isNotAvailable': false,
                'class': 'entrytime-',
                'avail': containsInArray('pgInfo', 'rules', 'Entry 11:00 PM')
              }, {
                'name': containsInArray('pgInfo', 'rules', 'Guardian entry') ? 'Guardian allowed' : 'Guardian not allowed',
                'show': true,
                'isNotAvailable': false,
                'class': 'guardian-',
                'avail': containsInArray('pgInfo', 'rules', 'Guardian entry')
              }, {
                'name': containsInArray('pgInfo', 'rules', 'Drinking') ? 'Drinking allowed' : 'Drinking not allowed',
                'show': true,
                'isNotAvailable': false,
                'class': 'drinking-',
                'avail': containsInArray('pgInfo', 'rules', 'Drinking')
              }, {
                'name': containsInArray('pgInfo', 'rules', 'Smoking') ? 'Smoking allowed' : 'Smoking not allowed',
                'show': true,
                'isNotAvailable': false,
                'class': 'smoking-',
                'avail': containsInArray('pgInfo', 'rules', 'Smoking')
              }, {
                'name': 'Document proof',
                'show': containsInArray('pgInfo', 'rules', 'Document proof'),
                'isNotAvailable': false,
                'class': 'document-',
                'avail': containsInArray('pgInfo', 'rules', 'Document proof')
              }],
              'foodServices': [{
                'name': 'Breakfast',
                'show': containsInArray('pgInfo', 'service.food', 'Breakfast'),
                'isNotAvailable': false,
                'class': 'breakfast-',
                'avail': containsInArray('pgInfo', 'service.food', 'Breakfast')
              }, {
                'name': 'Lunch',
                'show': containsInArray('pgInfo', 'service.food', 'Lunch'),
                'isNotAvailable': false,
                'class': 'lunch-',
                'avail': containsInArray('pgInfo', 'service.food', 'Lunch')
              }, {
                'name': 'Dinner',
                'show': containsInArray('pgInfo', 'service.food', 'Dinner'),
                'isNotAvailable': false,
                'class': 'dinner-',
                'avail': containsInArray('pgInfo', 'service.food', 'Dinner')
              }, {
                'name': 'Food options not available.',
                'show': data.pgInfo.service.food.length <= 0,
                'isNotAvailable': false,
                'class': 'dinner-',
                'avail': containsInArray('pgInfo', 'service.food', 'Dinner')
              }]
            };
          }
        });
      }

    };
  }]);
