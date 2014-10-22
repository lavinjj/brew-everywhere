angular.module('brew-everywhere').constant('constants',{
    mongodb: {
        database: 'brew_everywhere',
        adjunctCollection: 'adjuncts',
        brewerCollection: 'brewers',
        brewingHistoryCollection: 'brewingHistory',
        equipmentCollection: 'equipment',
        fermentableCollection: 'fermentables',
        hopCollection: 'hops',
        mashProfileCollection: 'mashProfiles',
        recipeCollection: 'recipes',
        styleCollection: 'styles',
        waterProfileCollection: 'waterProfiles',
        yeastCollection: 'yeast'
    }
});