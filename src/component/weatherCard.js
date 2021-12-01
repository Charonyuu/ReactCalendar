import React,{useEffect,useState} from 'react';
import '../css/weatherCard.css';
import { ReactComponent as RainyIcon } from '../images/humid.svg'
import { ReactComponent as WindyblowIcon } from '../images/windy.svg'
import { ReactComponent as CloudyWeatherIcon } from '../images/CloudyWeather.svg'

function WeatherCard(props) {
    const [currentWeather, setCurrentWeather] = useState({
        observationTime: '',
        locationName: '',
        description: '',
        temperature: 0,
        windSpeed: 0,
        humid: 0,
    });
    const [updateWeather] = useState(props.update)
    useEffect(()=>{
        async function getWeatherData(){
            const response = await fetch(
              'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-25162921-ACAC-4203-BB32-55B333D26116&locationName=臺北'
            )
            const data = await response.json()
            // console.log(data)
            // STEP 1：定義 `locationData` 把回傳的資料中會用到的部分取出來
            const locationData = data.records.location[0];
    
            // STEP 2：將風速（WDSD）、氣溫（TEMP）和濕度（HUMD）的資料取出
            const weatherElements = locationData.weatherElement.reduce(
                (neededElements, item) => {
                if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
                    neededElements[item.elementName] = item.elementValue;
                }
                return neededElements;
                },
                
            );
    
            // STEP 3：要使用到 React 組件中的資料
            setCurrentWeather({
                observationTime: locationData.time.obsTime,
                locationName: locationData.locationName,
                description: '多雲時晴',
                temperature: weatherElements.TEMP,
                windSpeed: weatherElements.WDSD,
                humid: weatherElements.HUMD,
            });
            
        };
        
        getWeatherData()
        console.log(currentWeather)
        
    },[])

    
    
    
    return (
        <div className='weatherCardMenu'>
            <div className='weatherIcon'>
                <CloudyWeatherIcon/>
            </div>
            <div className='locationName'>
                {currentWeather.locationName}
            </div>
            <div className='description'>
                {currentWeather.description}
            </div>
            <div className='temperature'>
              {Math.round(currentWeather.temperature)}°C
            </div>
            <div className='windSpeed'>
                <WindyblowIcon/>{currentWeather.windSpeed}m/h 
            </div>
            <div className='humid'>
                <RainyIcon/>{currentWeather.humid}%
            </div>
            <div className='observationTime'>
                最後觀測時間：
                {currentWeather.observationTime}
            </div>
        
        
        </div>
    );
}

export default WeatherCard;