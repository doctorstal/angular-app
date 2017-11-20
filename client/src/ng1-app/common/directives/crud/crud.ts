import { directivesCrudEditModule } from './edit';
import { directivesCrudButtonsModule } from './crudButtons';

export const directivesCrudModule = angular.module('directives.crud', [
    directivesCrudButtonsModule.name, 
    directivesCrudEditModule.name
]);
