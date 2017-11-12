import Api from './Api';
import ServiceLocator from "./di/ServiceLocator";

export const inject = function(api: ServiceLocator){
    //Api.bind<IWeatherController>('IWeatherController').to(new AccuWeatherController());
};