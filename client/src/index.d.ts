import { IModule } from 'angular';
import * as ng from 'angular';


declare global {
    interface IAngularStatic {
        module(
            name: string,
            requires?: string[],
            configFn?: any[]): IModule;
    }
    // This types merge should be automatic, should not it?
    const angular: IAngularStatic & typeof ng;
}