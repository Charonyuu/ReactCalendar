import React,{useEffect,useState} from 'react';
import '../css/weatherCard.css';
import { ReactComponent as RainyIcon } from '../images/humid.svg'
import { ReactComponent as WindyblowIcon } from '../images/windBlow.svg'
import { ReactComponent as CloudySunIcon } from '../images/CloudySun.svg'
import  SunnyIcon  from '../images/Sunny.png'
import  WindyIcon  from '../images/Windy.png'
import  SmallrainIcon  from '../images/Smallrain.png'
import  BigrainIcon  from '../images/Bigrain.png'
import  StormRainIcon  from '../images/StormRain.png'
import  CloudFogIcon  from '../images/CloudFog.png'
import useInterval from 'use-interval'


function WeatherCard() {
    const [location] = useState('臺北')
    const [currentWeather, setCurrentWeather] = useState({
        observationTime: '',
        locationName: '',
        description: '',
        temperature: 0,
        windSpeed: 0,
        humid: 0,
    });

    async function getWeatherData(){
        const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-25162921-ACAC-4203-BB32-55B333D26116&locationName=' + location
        console.log(url)
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data)
        // STEP 1：定義 `locationData` 把回傳的資料中會用到的部分取出來
        const locationData = data.records.location[0];
        
        // STEP 2：將風速（WDSD）、氣溫（TEMP）和濕度（HUMD）的資料取出
        const weatherElements = locationData.weatherElement.reduce(
            (neededElements, item) => {
            if (['WDSD', 'TEMP', 'HUMD','Weather'].includes(item.elementName)) {
                neededElements[item.elementName] = item.elementValue;
            }
            return neededElements;
            },
            
        );
    
        // STEP 3：要使用到 React 組件中的資料
        setCurrentWeather({
            observationTime: locationData.time.obsTime,
            locationName: locationData.locationName,
            description: weatherElements.Weather,
            temperature: weatherElements.TEMP,
            windSpeed: weatherElements.WDSD,
            humid: weatherElements.HUMD,
        });
    };

    useInterval(() => {
        // Your custom logic here
        getWeatherData()
        console.log(currentWeather)
        
      }, 600000);

    useEffect(()=>{
        
        getWeatherData()
        
        console.log(currentWeather)
        
    },[location])// eslint-disable-line react-hooks/exhaustive-deps

    
    
    
    return (
        <div className='weatherCardMenu'>
            <div className='weatherIcon'>
                { currentWeather.description === '晴'? <img src={SunnyIcon} alt="" />:
                  currentWeather.description === '多雲'? <img src={WindyIcon} alt="" />:
                  currentWeather.description === 3?<img src={SmallrainIcon} alt="" />:
                  currentWeather.description === 4?<img src={BigrainIcon} alt="" />:
                  currentWeather.description === 5?<img src={StormRainIcon} alt="" />:
                  currentWeather.description === '陰'?<img src={CloudFogIcon} alt="" />:<CloudySunIcon/>} 
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


