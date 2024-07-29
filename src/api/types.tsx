export interface iLocationsProps {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    Country: {
      ID: string;
      LocalizedName: string;
    };
    AdministrativeArea: {
      ID: string;
      LocalizedName: string;
    };
  }

export interface iCityProps {
    LocalizedName: string;
    Key: string;
  }
  
  export interface iWeatherProps {
    LocalObservationDateTime: string;
    EpochTime: number;
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType: string | null;
    IsDayTime: boolean;
    Temperature: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
    MobileLink: string;
    Link: string;
  }
  
  export interface iDailyForecastProps {
    Date: string;
    EpochDate: number;
    Temperature: {
      Minimum: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Maximum: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
    Day: {
      Icon: number;
      IconPhrase: string;
      HasPrecipitation: boolean;
    };
    Night: {
      Icon: number;
      IconPhrase: string;
      HasPrecipitation: boolean;
    };
  }
  
  export interface iForecastProps {
    Headline: {
      EffectiveDate: string;
      EffectiveEpochDate: number;
      Severity: number;
      Text: string;
      Category: string;
      EndDate: string;
      EndEpochDate: number;
      MobileLink: string;
      Link: string;
    };
    DailyForecasts: iDailyForecastProps[];
  }
  