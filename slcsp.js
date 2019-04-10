const csvFilePath='slcsp.csv'
const zipsFilePath='zips.csv'
const plansFilePath='plans.csv'

const csv=require('csvtojson')
const _=require('lodash');

const fs = require('fs')
const { Parser } = require('json2csv');

var slcpJson, zipJson, plansJson;

app = {}

app.slcspCalc = function (plans){
    plans.sort((a, b) => (Number(a.rate) > Number(b.rate)) ? 1 : -1)
    if(_.isEmpty(plans)){
        return ''
    } else if (plans.length == 1) {
        return Number(plans[0].rate).toFixed(2)
    } else {
            if (Number(plans[1].rate) > Number(plans[0].rate)) {
                return Number(plans[1].rate).toFixed(2)
            } else if (Number(plans[2].rate) > Number(plans[1].rate)) {
                return Number(plans[2].rate).toFixed(2)                
            } else {
                //figure out later...
                return ''
            }
    }
}

app.slcspRates = function (inputPlans, rateArea, rateState) {
    var plans = _.filter(inputPlans, {rate_area: rateArea, state: rateState, metal_level: 'Silver'});
    return app.slcspCalc(plans);
}

app.slcspZip = function (slcpJson) {
    _.each(slcpJson, function (line) {
        var rates = _.filter(zipJson, {zipcode: line.zipcode})
        if (!_.isEmpty(rates))
            var rateArea = []
        var rateState;
        _.each(rates, function (rate) {
            rateArea.push(rate.rate_area)
            rateState = rate.state;
        })
        var rateArea = _.uniq(rateArea);
        if (rateArea.length == 1){
            line.rate = app.slcspRates(plansJson, rateArea[0], rateState)
        } else {
            line.rate = '';
        }
    })
    return slcpJson
}

app.slcsp = function () {
    csv().fromFile(zipsFilePath).then(function (jsonObj) {
        zipJson = jsonObj;
        csv().fromFile(plansFilePath).then(function (jsonObj) {
            plansJson = jsonObj;
            csv().fromFile(csvFilePath).then(function (jsonObj) {
                slcpJson = jsonObj;
                var outjson = app.slcspZip(slcpJson);
                const json2csvParser = new Parser({outjson, quote: '', defaultValue: ''});
                const outputcsv = json2csvParser.parse(outjson);

                console.log(outputcsv);
            })
        })
    })
}

module.exports = app

app.slcsp();




