const dayStartsDefault = "8:00 AM";//new Date("2015-11-15T08:00:00.00");
const dayEndsDefault = "8:00 PM";//new Date("2015-11-15T20:00:00.00");
const defaultPrice = 100

const initialState={
    dayStartsDefault:dayStartsDefault,
    dayEndsDefault:dayEndsDefault,
    defaultPrice: defaultPrice,
    availability:[{ id: "Sunday", name: "Sunday",customHours:'default' ,selected:false,order:1,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]},
    { id: "Monday", name: "Monday",customHours:'default' ,selected:false,order:2,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]},
    { id: "Wednesday", name: "Wednesday",customHours:'default',selected:false ,order:3,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]},
    { id: "Thursday", name: "Thursday",customHours:'default',selected:false ,order:4,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]},
    { id: "Friday", name: "Friday",customHours:'default',selected:false ,order:5,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]},
    { id: "Saturday", name: "Saturday",customHours:'default' ,selected:false ,order:6,price:0,hoursAvailability:[{starts:dayStartsDefault, ends:dayEndsDefault}],hoursPricing:[{starts:dayStartsDefault, ends:dayEndsDefault,price:defaultPrice}]}]
}

export default initialState
