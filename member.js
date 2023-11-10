function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'modules/skilss/views/member.html',
        controller: 'skillsMemberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }
    };
}