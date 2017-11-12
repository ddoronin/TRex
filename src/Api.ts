import ServiceLocator from './di/ServiceLocator';

//locator.bind<IWeatherController>('IWeatherController').to(new AccuWeatherController());

const apiLocator: ServiceLocator = new ServiceLocator();
export default  apiLocator;
