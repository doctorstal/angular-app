/*
    Theese services are in better place now, so we need to provide mocks for them
*/
import { servicesNotificationsModule } from './ng1-app/common/services/notifications';

angular.module(servicesNotificationsModule)
    .factory('notifications', ()=>({
        getCurrent(){},
        pushSticky(){},
        remove(){},
    }));